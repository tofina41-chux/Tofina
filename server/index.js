const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Expose the uploads folder statically to the web
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const uploadDir = './uploads';
if (!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir);
}

// ========================================================
// 1. SMART MULTER STORAGE CONFIGURATION
// ========================================================
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); 
  },
  filename: (req, file, cb) => {
    if (file.fieldname === 'profileImage') {
      cb(null, 'avatar.jpg');
    } else if (file.fieldname === 'resumeFile') {
      cb(null, 'Cynthia_Wafula_CV.pdf'); // Locked name for the download anchor
    } else {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
  }
});

const upload = multer({ 
  storage: storage,
  fileFilter: (req, file, cb) => {
    // 💡 FIXED: Allow PDFs for the CV uploader, and images for everything else!
    if (file.fieldname === 'resumeFile') {
      if (file.mimetype === 'application/pdf') {
        cb(null, true);
      } else {
        cb(new Error('Only PDF files are allowed for your CV!'), false);
      }
    } else {
      if (file.mimetype.startsWith('image/')) {
        cb(null, true);
      } else {
        cb(new Error('Only image files are allowed!'), false);
      }
    }
  }
});

// ========================================================
// 2. AUTHENTICATION MIDDLEWARE RULE (Moved UP to avoid ReferenceErrors)
// ========================================================
const verifyAdmin = (req, res, next) => {
  const adminSecret = req.headers['x-admin-auth'];
  if (adminSecret !== process.env.ADMIN_SECRET_KEY) {
    return res.status(401).json({ success: false, message: "⚠️ Unauthorized Access Key." });
  }
  next();
};

// ========================================================
// 3. FILE SYSTEM STORAGE PATHS (JSON Databases)
// ========================================================
const BLOG_FILE = path.join(__dirname, 'blogPosts.json');
const PROJECTS_FILE = path.join(__dirname, 'projects.json');

const readData = (filePath, initialSeed) => {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify(initialSeed, null, 2));
    return initialSeed;
  }
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
};

// ========================================================
// 4. --- API ROUTES ---
// ========================================================

// 📄 Protected CV Upload Route (Now completely safe)
app.post('/api/upload-cv', verifyAdmin, upload.single('resumeFile'), (req, res) => {
  if (!req.file) return res.status(400).json({ success: false, message: "No document uploaded." });
  res.status(200).json({ 
    success: true, 
    cvUrl: `http://localhost:5000/uploads/Cynthia_Wafula_CV.pdf?t=${Date.now()}` 
  });
});

// Profile Photo Route
app.post('/api/upload-profile', verifyAdmin, upload.single('profileImage'), (req, res) => {
  if (!req.file) return res.status(400).json({ success: false, message: "No file uploaded." });
  res.status(200).json({ success: true, imageUrl: `http://localhost:5000/uploads/avatar.jpg?t=${Date.now()}` });
});

// Blog Endpoints
app.get('/api/blog', (req, res) => {
  res.status(200).json(readData(BLOG_FILE, []));
});

app.post('/api/blog', verifyAdmin, upload.single('blogImage'), (req, res) => {
  const { title, excerpt, category } = req.body;
  if (!title || !excerpt || !category) {
    return res.status(400).json({ success: false, message: "Missing required fields." });
  }

  const posts = readData(BLOG_FILE, []);
  const newPost = {
    id: Date.now(),
    title,
    category,
    excerpt,
    date: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
    imageUrl: req.file ? `http://localhost:5000/uploads/${req.file.filename}` : null
  };

  posts.unshift(newPost);
  fs.writeFileSync(BLOG_FILE, JSON.stringify(posts, null, 2));
  res.status(200).json({ success: true, posts });
});

// Project Endpoints
app.get('/api/projects', (req, res) => {
  res.status(200).json(readData(PROJECTS_FILE, []));
});

app.post('/api/projects', verifyAdmin, upload.single('projectImage'), (req, res) => {
  const { title, description, tags, liveLink, githubLink } = req.body;
  if (!title || !description || !tags) {
    return res.status(400).json({ success: false, message: "Missing core project metrics." });
  }

  const projects = readData(PROJECTS_FILE, []);
  const newProject = {
    id: Date.now(),
    title,
    description,
    liveLink: liveLink || '#',
    githubLink: githubLink || '#',
    tags: tags.split(',').map(tag => tag.trim()), 
    imageUrl: req.file ? `http://localhost:5000/uploads/${req.file.filename}` : 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800'
  };

  projects.unshift(newProject);
  fs.writeFileSync(PROJECTS_FILE, JSON.stringify(projects, null, 2));
  res.status(200).json({ success: true, projects });
});

// Contact Routing Logic
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
});

app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;
  const mailOptions = {
    from: email,
    to: process.env.EMAIL_USER,
    subject: `New Portfolio Message from ${name}`,
    text: `From: ${name} (${email})\n\nMessage: ${message}`,
  };
  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: "✅ Email sent successfully!" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));