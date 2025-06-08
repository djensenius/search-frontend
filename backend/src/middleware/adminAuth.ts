import { Request, Response, NextFunction } from 'express';
import { ErrorResponse } from '../types/api';

/**
 * Middleware to authenticate admin endpoints using X-Admin-Key header
 */
export const adminAuth = (
  req: Request,
  res: Response<ErrorResponse>,
  next: NextFunction
): void => {
  const adminKey = process.env.ADMIN_API_KEY;
  
  // If no admin key is configured, reject all admin requests
  if (!adminKey) {
    res.status(401).json({
      error: 'Unauthorized',
      message: 'Admin API key not configured',
      status: 401
    });
    return;
  }

  const providedKey = req.headers['x-admin-key'];
  
  // Check if admin key header is provided and matches
  if (!providedKey || providedKey !== adminKey) {
    res.status(401).json({
      error: 'Unauthorized',
      message: 'Invalid or missing admin API key',
      status: 401
    });
    return;
  }

  next();
};