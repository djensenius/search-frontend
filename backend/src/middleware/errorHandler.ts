import { Request, Response, NextFunction } from 'express';
import { ErrorResponse } from '../types/api';

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response<ErrorResponse>,
  _next: NextFunction
): void => {
  console.error('Error:', err.message);
  console.error('Stack:', err.stack);

  // Default error response
  const errorResponse: ErrorResponse = {
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'production' ? 'Something went wrong' : err.message,
    status: 500
  };

  // Send error response
  res.status(500).json(errorResponse);
};