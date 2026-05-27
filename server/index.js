const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

// 1. INITIALIZE the app FIRST 🚀
const app = express();

// 2. NOW you can use middleware features safely
app.use(cors());
app.use(express.json());

// 3. Expose the uploads folder statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Ensure the local upload folder exists
const uploadDir = './uploads';
if (!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir);
}

// 4. Configure Multer Disk Storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); 
  },
  filename: (req, file, cb) => {
    cb(null, 'avatar.jpg');
  }
});

const upload = multer({ 
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  }
});

// Protected Upload Route
app.post('/api/upload-profile', (req, res) => {
  // Check for the secret token BEFORE processing the file
  const adminSecret = req.headers['x-admin-auth'];
  
  if (adminSecret !== process.env.ADMIN_SECRET_KEY) {
    return res.status(401).json({ success: false, message: "⚠️ Intruder Alert: Invalid Admin Key." });
  }

  // If the key is valid, run the multer upload processor dynamically
  upload.single('profileImage')(req, res, (err) => {
    if (err) return res.status(400).json({ success: false, error: err.message });
    if (!req.file) return res.status(400).json({ success: false, message: "No file uploaded." });

    res.status(200).json({ 
      success: true, 
      imageUrl: `http://localhost:5000/uploads/avatar.jpg?t=${Date.now()}` 
    });
  });
});


// --- DYNAMIC BLOG / INSIGHTS STORAGE SYSTEM ---
const BLOG_FILE = path.join(__dirname, 'blogPosts.json');

// Helper function to read posts safely from disk
const readBlogPosts = () => {
  if (!fs.existsSync(BLOG_FILE)) {
    // Initial placeholder seeds if the file doesn't exist yet
    const initialSeed = [
      {
        id: 1,
        title: "My AWS Journey: From Localhost to Cloud Deployments",
        date: "May 2026",
        excerpt: "Transitioning traditional systems into AWS S3 storage buckets and EC2 architectures. Here is my performance review...",
        category: "AWS / Cloud"
      }
    ];
    fs.writeFileSync(BLOG_FILE, JSON.stringify(initialSeed, null, 2));
    return initialSeed;
  }
  const data = fs.readFileSync(BLOG_FILE, 'utf-8');
  return JSON.parse(data);
};

// 1. Public Endpoint: Fetch all insights for the landing page
app.get('/api/blog', (req, res) => {
  try {
    const posts = readBlogPosts();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 2. Protected Endpoint: Publish a new post from the Admin panel
app.post('/api/blog', express.json(), (req, res) => {
  const adminSecret = req.headers['x-admin-auth'];
  
  // Reuse your secure environment variable passphrase
  if (adminSecret !== process.env.ADMIN_SECRET_KEY) {
    return res.status(401).json({ success: false, message: "⚠️ Unauthorized System Input." });
  }

  const { title, excerpt, category } = req.body;
  if (!title || !excerpt || !category) {
    return res.status(400).json({ success: false, message: "Missing required post parameters." });
  }

  try {
    const currentPosts = readBlogPosts();
    
    const newPost = {
      id: Date.now(), // Unique structural identifier
      title,
      date: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
      excerpt,
      category
    };

    // Push new posts to the top of the array so they appear first in your feed
    currentPosts.unshift(newPost);
    fs.writeFileSync(BLOG_FILE, JSON.stringify(currentPosts, null, 2));

    res.status(200).json({ success: true, posts: currentPosts });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// --- Your Existing Contact Routing Logic ---
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
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
    console.error("❌ Nodemailer Error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));