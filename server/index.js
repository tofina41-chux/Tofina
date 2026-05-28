import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import adminRouter from './routes/adminRoutes.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Global Middlewares
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.originalUrl}`);
  next();
});

// Serve local uploads folder for development fallback
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ⚡ Mount your modular router under the base path
app.use('/api', adminRouter);
console.log('Loaded API routes:', adminRouter.stack.filter(layer => layer.route).map(layer => `${Object.keys(layer.route.methods).join(',').toUpperCase()} ${layer.route.path}`));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Persistent Full-Stack Server executing live on port ${PORT}`);
});