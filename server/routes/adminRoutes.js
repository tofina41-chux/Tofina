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
const PROFILE_FILE = path.join(__dirname, '../profile.json');

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

  // If no service role key is configured, skip Supabase and write locally for development
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    try {
      const uploadsDir = path.join(__dirname, '../uploads');
      if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });
      const localPath = path.join(uploadsDir, filePath);
      fs.writeFileSync(localPath, file.buffer);
      const host = process.env.HOST || 'http://localhost';
      const port = process.env.PORT || 5000;
      return `${host}:${port}/uploads/${filePath}`;
    } catch (fsErr) {
      console.error('Local dev write failed:', fsErr && fsErr.message ? fsErr.message : fsErr);
      throw fsErr;
    }
  }

  try {
    const { data, error } = await supabase.storage
      .from(bucketName)
      .upload(filePath, file.buffer, {
        contentType: file.mimetype,
        upsert: true
      });

    if (error) {
      console.error('Supabase upload error:', error);
      throw error;
    }

    const { data: publicUrlData, error: publicUrlError } = await supabase.storage
      .from(bucketName)
      .getPublicUrl(filePath);

    if (publicUrlError) {
      console.error('Supabase getPublicUrl error:', publicUrlError);
      throw publicUrlError;
    }

    return publicUrlData.publicUrl;
  } catch (err) {
    console.error('uploadToSupabaseBucket failed:', err && err.message ? err.message : err);
    // Fallback: write file to local uploads directory so the app still works without Supabase keys
    try {
      const uploadsDir = path.join(__dirname, '../uploads');
      if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });
      const localPath = path.join(uploadsDir, filePath);
      fs.writeFileSync(localPath, file.buffer);
      const host = process.env.HOST || 'http://localhost';
      const port = process.env.PORT || 5000;
      const publicUrl = `${host}:${port}/uploads/${filePath}`;
      console.warn(`Supabase upload failed; saved file locally at ${localUrlOrPath(localPath)} and returning ${publicUrl}`);
      return publicUrl;
    } catch (fsErr) {
      console.error('Local fallback write failed:', fsErr && fsErr.message ? fsErr.message : fsErr);
      throw err; // rethrow original Supabase error for upstream handling
    }
  }
};

// Helper to shorten long local paths in logs
function localUrlOrPath(p) {
  try { return p; } catch { return String(p); }
}

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
    fs.writeFileSync(PROFILE_FILE, JSON.stringify({ imageUrl }, null, 2));
    return res.status(200).json({ success: true, imageUrl });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

/* --- PROFILE IMAGE ROUTE --- */
router.get('/profile-image', (req, res) => {
  const profileData = readData(PROFILE_FILE, { imageUrl: 'http://localhost:5000/uploads/avatar.jpg' });
  return res.status(200).json({ success: true, imageUrl: profileData.imageUrl || 'http://localhost:5000/uploads/avatar.jpg' });
});

/* --- PROJECT ENDPOINTS LOOP --- */
router.get('/projects', (req, res) => {
  const projects = readData(PROJECTS_FILE, []).map(project => ({
    ...project,
    liveLink: project.liveLink || '',
    githubLink: project.githubLink || ''
  }));
  res.status(200).json(projects);
});

router.post('/projects', verifyAdmin, upload.single('image'), async (req, res) => {
  try {
    const { title, description, technologies, launchLiveApp, viewCodeBase } = req.body;
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
      imageUrl,
      liveLink: launchLiveApp || '',
      githubLink: viewCodeBase || ''
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


/* =========================================================================
   NEW ENDPOINT: DELETE A PROJECT ENTRY (Database + Supabase Cloud Asset)
   ========================================================================= */
router.delete('/projects/:id', verifyAdmin, async (req, res) => {
  try {
    const targetId = parseInt(req.params.id);
    const projects = readData(PROJECTS_FILE, []);
    
    // Find the item profile to remove
    const projectToDelete = projects.find(p => p.id === targetId);
    if (!projectToDelete) {
      return res.status(404).json({ success: false, message: "Project entry data node not found." });
    }

    // If the image lives on Supabase, parse its unique path out and delete it
    if (projectToDelete.imageUrl && projectToDelete.imageUrl.includes('supabase.co/storage/v1/object/public/')) {
      try {
        // Extracts everything after the public/bucket-name/ token stream path
        const urlParts = projectToDelete.imageUrl.split('/portfolio-assets/');
        if (urlParts.length > 1) {
          const cloudFilePath = urlParts[1];
          await supabase.storage.from('portfolio-assets').remove([cloudFilePath]);
          console.log(`🧼 Cleared asset from cloud bucket path: ${cloudFilePath}`);
        }
      } catch (storageErr) {
        console.error("⚠️ Non-blocking warning: Failed to strip image resource from bucket storage drawer.", storageErr.message);
      }
    }

    // Filter out the record from your JSON file matrix
    const updatedProjects = projects.filter(p => p.id !== targetId);
    fs.writeFileSync(PROJECTS_FILE, JSON.stringify(updatedProjects, null, 2));

    return res.status(200).json({ success: true, message: "Project removed successfully.", projects: updatedProjects });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

/* =========================================================================
   NEW ENDPOINT: DELETE A BLOG/INSIGHT POST
   ========================================================================= */
router.delete('/blog/:id', verifyAdmin, async (req, res) => {
  try {
    const targetId = parseInt(req.params.id);
    const posts = readData(BLOG_FILE, []);
    
    const postToDelete = posts.find(p => p.id === targetId);
    if (!postToDelete) {
      return res.status(404).json({ success: false, message: "Insight entry node not found." });
    }

    // Strip image block if it exists inside the storage bucket space
    if (postToDelete.imageUrl && postToDelete.imageUrl.includes('supabase.co/storage/v1/object/public/')) {
      try {
        const urlParts = postToDelete.imageUrl.split('/portfolio-assets/');
        if (urlParts.length > 1) {
          const cloudFilePath = urlParts[1];
          await supabase.storage.from('portfolio-assets').remove([cloudFilePath]);
        }
      } catch (storageErr) {
        console.error("⚠️ Failed to remove blog image asset from cloud bucket.", storageErr.message);
      }
    }

    const updatedPosts = posts.filter(p => p.id !== targetId);
    fs.writeFileSync(BLOG_FILE, JSON.stringify(updatedPosts, null, 2));

    return res.status(200).json({ success: true, message: "Insight entry wiped successfully.", posts: updatedPosts });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});


export default router;