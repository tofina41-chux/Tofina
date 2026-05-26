const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Dynamic Blog Storage in server/index.js
let blogPosts = [
  {
    title: "My AWS Journey: From Localhost to Cloud Deployments",
    date: "May 2026",
    excerpt: "Transitioning traditional systems into AWS S3 storage buckets and EC2 architectures. Here is my performance review...",
    category: "AWS / Cloud"
  },
  {
    title: "Optimizing High-Fidelity Asset Vetting Systems",
    date: "April 2026",
    excerpt: "Building high-speed curation interfaces for creators. A look into vetting mechanisms and automated messaging queues.",
    category: "Full-Stack Automation"
  }
];

// Endpoint to fetch insights dynamically
app.get('/api/blog', (req, res) => {
  res.status(200).json(blogPosts);
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
    console.error("❌ Nodemailer Error:", error); // This tells us EXACTLY what's wrong
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));