import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import nodemailer from 'nodemailer';
import { upload } from '../middleware/upload.js';
import { supabase } from '../config/supabase.js';

const router = express.Router();

// ES Module fallback replacements for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ========================================================
// 1. AUTHENTICATION MIDDLEWARE RULE
// ========================================================
const verifyAdmin = (req, res, next) => {
  const adminSecret = req.headers['x-admin-auth'];
  if (adminSecret !== process.env.ADMIN_SECRET_KEY) {
    return res.status(401).json({ success: false, message: "⚠️ Unauthorized Access Key Key Token Rejected." });
  }
  next();
};

// ========================================================
// 2. FILE SYSTEM STORAGE PATHS (JSON Database Engines)
// ========================================================
const BLOG_FILE = path.join(__dirname, '../blogPosts.json');
const PROJECTS_FILE = path.join(__dirname, '../projects.json');

const readData = (filePath, initialSeed) => {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify(initialSeed, null, 2));
    return initialSeed;
  }
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
};

// HELPER PIPELINE: Pushes RAM memory buffers directly to public Supabase bucket
const uploadToSupabaseBucket = async (file, bucketName, customFileName) => {
  const fileExtension = file.originalname.split('.').pop();
  const filePath = `${customFileName}_${Date.now()}.${fileExtension}`;

  const { data, error } = await supabase.storage
    .from(bucketName)
    .upload(filePath, file.buffer, {
      contentType: file.mimetype,
      upsert: true
    });

  if (error) throw error;

  const { data: publicUrlData } = supabase.storage
    .from(bucketName)
    .getPublicUrl(filePath);

  return publicUrlData.publicUrl;
};

// ========================================================
// 3. --- SYSTEM ENDPOINTS MATRIX ---
// ========================================================

/* --- SECURE PORTFOLIO CV PDF SYNC --- */
router.post('/upload-cv', verifyAdmin, upload.single('cv'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ success: false, message: "No document chunk received." });
    
    const cvUrl = await uploadToSupabaseBucket(req.file, 'portfolio-assets', 'cynthia_wafula_cv');
    return res.status(200).json({ success: true, cvUrl });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

/* --- DYNAMIC PROFILE AVATAR PHOTO FLIPPER --- */
router.post('/upload-profile', verifyAdmin, upload.single('profileImage'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ success: false, message: "No picture binary received." });
    
    const imageUrl = await uploadToSupabaseBucket(req.file, 'portfolio-assets', 'avatar_display');
    return res.status(200).json({ success: true, imageUrl });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

/* --- PROJECT ENDPOINTS LOOP --- */
router.get('/projects', (req, res) => {
  res.status(200).json(readData(PROJECTS_FILE, []));
});

router.post('/projects', verifyAdmin, upload.single('image'), async (req, res) => {
  try {
    const { title, description, technologies } = req.body;
    if (!title || !description || !technologies) {
      return res.status(400).json({ success: false, message: "Missing core project metrics info data." });
    }

    let imageUrl = 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800';
    if (req.file) {
      imageUrl = await uploadToSupabaseBucket(req.file, 'portfolio-assets', 'project_mockup');
    }

    const projects = readData(PROJECTS_FILE, []);
    const newProject = {
      id: Date.now(),
      title,
      description,
      tags: technologies.split(',').map(tag => tag.trim()), 
      imageUrl
    };

    projects.unshift(newProject);
    fs.writeFileSync(PROJECTS_FILE, JSON.stringify(projects, null, 2));
    res.status(200).json({ success: true, projects });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

/* --- BLOG POST ENDPOINTS LOOP --- */
router.get('/blog', (req, res) => {
  res.status(200).json(readData(BLOG_FILE, []));
});

router.post('/blog', verifyAdmin, upload.single('blogImage'), async (req, res) => {
  try {
    const { title, excerpt, category } = req.body;
    if (!title || !excerpt || !category) {
      return res.status(400).json({ success: false, message: "Missing required content parameters." });
    }

    let imageUrl = null;
    if (req.file) {
      imageUrl = await uploadToSupabaseBucket(req.file, 'portfolio-assets', 'blog_frame');
    }

    const posts = readData(BLOG_FILE, []);
    const newPost = {
      id: Date.now(),
      title,
      category,
      excerpt,
      date: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
      imageUrl
    };

    posts.unshift(newPost);
    fs.writeFileSync(BLOG_FILE, JSON.stringify(posts, null, 2));
    res.status(200).json({ success: true, posts });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

/* --- OUTBOUND CONTACT NODEMAILER FLOW --- */
router.post('/contact', async (req, res) => {
  const { name, email, message } = req.body;
  
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
  });

  const mailOptions = {
    from: email,
    to: process.env.EMAIL_USER,
    subject: `New Portfolio Message from ${name}`,
    text: `From: ${name} (${email})\n\nMessage: ${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: "✅ Message delivered cleanly directly to admin inbox." });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;