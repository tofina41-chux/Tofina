import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import adminRouter from './routes/adminRoutes.js';

dotenv.config();

const app = express();

// Global Middlewares
app.use(cors());
app.use(express.json());

// ⚡ Mount your modular router under the base path
app.use('/api', adminRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Persistent Full-Stack Server executing live on port ${PORT}`);
});