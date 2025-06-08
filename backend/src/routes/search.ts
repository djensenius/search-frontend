import { Router, Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { SearchService } from '../services/searchService';
import { statsService } from '../services/statsService';
import { SearchResponse, ErrorResponse } from '../types/api';

const router = Router();
const searchService = new SearchService();

// Validation schema for search query
const searchQuerySchema = z.object({
  q: z.string().min(1, 'Query is required').max(500, 'Query too long'),
  limit: z.coerce.number().int().min(1).max(50).optional().default(10),
  offset: z.coerce.number().int().min(0).optional().default(0)
});

router.get('/', async (req: Request, res: Response<SearchResponse | ErrorResponse>, next: NextFunction): Promise<void> => {
  let validatedQuery;
  let startTime = Date.now();
  
  try {
    // Validate query parameters
    validatedQuery = searchQuerySchema.parse(req.query);

    // Record start time for performance tracking
    startTime = Date.now();

    // Perform search
    const searchResult = await searchService.search(validatedQuery);

    // Calculate search time
    const searchTimeMs = Date.now() - startTime;

    // Record search statistics
    statsService.recordSearch({
      query: validatedQuery.q,
      queryNormalized: validatedQuery.q.toLowerCase().trim(),
      resultCount: searchResult.results.length,
      searchTimeMs: searchTimeMs,
      userIp: req.ip
    });

    res.json(searchResult);
  } catch (error) {
    // Record failed search statistics if we have a valid query
    if (validatedQuery) {
      const searchTimeMs = Date.now() - startTime;
      statsService.recordSearch({
        query: validatedQuery.q,
        queryNormalized: validatedQuery.q.toLowerCase().trim(),
        resultCount: 0, // Failed search
        searchTimeMs: searchTimeMs,
        userIp: req.ip
      });
    }

    if (error instanceof z.ZodError) {
      const errorMessage = error.errors.map(e => `${e.path.join('.')}: ${e.message}`).join(', ');
      res.status(400).json({
        error: 'Invalid query parameters',
        message: errorMessage
      });
      return;
    }
    
    next(error);
  }
});

router.get('/health', async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const isHealthy = await searchService.healthCheck();
    res.json({
      search_api_healthy: isHealthy,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    next(error);
  }
});

export { router as searchRouter };