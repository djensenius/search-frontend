import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import path from 'path';
import { searchRouter } from './routes/search';
import { healthRouter } from './routes/health';
import { indexRouter } from './routes/index';
import { adminRouter } from './routes/admin';
import { errorHandler } from './middleware/errorHandler';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Security middleware
app.use(helmet());

// CORS configuration
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));

// Logging
app.use(morgan('combined'));

// Body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use('/api/health', healthRouter);
app.use('/api/search', searchRouter);
app.use('/api/index', indexRouter);
app.use('/api/admin', adminRouter);

// Serve static files from the frontend build directory in production
if (process.env.NODE_ENV === 'production') {
  const frontendDistPath = path.join(__dirname, '../../frontend/dist');
  app.use(express.static(frontendDistPath));
  
  // Handle React Router (return index.html for all non-API routes)
  app.get('*', (_req, res) => {
    res.sendFile(path.join(frontendDistPath, 'index.html'));
  });
} else {
  // Development mode - 404 handler for non-existent routes
  app.use('*', (_req, res) => {
    res.status(404).json({ error: 'Route not found' });
  });
}

// Error handling
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Dachshund.dev backend server running on port ${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔗 Search API URL: ${process.env.SEARCH_API_URL || 'http://localhost:3000'}`);
});

export default app;
