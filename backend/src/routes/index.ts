import { Router, Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { SearchService } from '../services/searchService';
import { IndexResponse, ErrorResponse } from '../types/api';

const router = Router();
const searchService = new SearchService();

// Validation schema for index request
const indexRequestSchema = z.object({
  domains: z.array(z.string().min(1, 'Domain name is required')).min(1, 'At least one domain is required')
});

router.post('/', async (req: Request, res: Response<IndexResponse | ErrorResponse>, next: NextFunction): Promise<void> => {
  try {
    // Validate request body
    const validatedRequest = indexRequestSchema.parse(req.body);

    // Submit domains for indexing
    const indexResult = await searchService.indexDomains(validatedRequest);

    res.json(indexResult);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errorMessage = error.errors.map(e => `${e.path.join('.')}: ${e.message}`).join(', ');
      res.status(400).json({
        error: 'Invalid request body',
        message: errorMessage
      });
      return;
    }
    
    next(error);
  }
});

export { router as indexRouter };