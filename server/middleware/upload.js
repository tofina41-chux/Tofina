// server/middleware/upload.js
import multer from 'multer';

// Configure multer to hold the file temporarily in RAM memory instead of local disk space
const storage = multer.memoryStorage();

export const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // Cap file size execution at 5MB maximum
  },
  fileFilter: (req, file, cb) => {
    // Rigid type checking to ensure only valid assets hit your buckets
    if (file.mimetype.startsWith('image/') || file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Invalid file format. Only images and PDFs are accepted.'), false);
    }
  }
});