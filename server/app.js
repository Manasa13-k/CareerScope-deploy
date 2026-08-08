import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

import authRoutes from './routes/authRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import careerRoutes from './routes/careerRoutes.js';
import bookmarkRoutes from './routes/bookmarkRoutes.js';

// Load environment variables
dotenv.config();

const app = express();


// Global Middlewares
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true,
}));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploads static folder
app.use('/uploads', express.static('uploads'));

// Register modular API routes
app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/careers', careerRoutes);
app.use('/api/bookmarks', bookmarkRoutes);

// Basic Health Check Route
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'CareerScope API is running successfully',
    timestamp: new Date(),
    env: process.env.NODE_ENV,
  });
});

// Error Handling Middlewares
app.use(notFound);
app.use(errorHandler);

export default app;
