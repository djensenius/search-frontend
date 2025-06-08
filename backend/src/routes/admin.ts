import { Router, Request, Response, NextFunction } from 'express';
import { SearchService } from '../services/searchService';
import { statsService } from '../services/statsService';
import { 
  AdminStatsResponse, 
  AdminTopQueriesResponse, 
  AdminForceIndexResponse,
  ErrorResponse 
} from '../types/api';
import { adminAuth } from '../middleware/adminAuth';

const router = Router();
const searchService = new SearchService();

// Apply admin authentication to all routes
router.use(adminAuth);

// GET /admin/stats - Get search statistics
router.get('/stats', async (_req: Request, res: Response<AdminStatsResponse | ErrorResponse>, next: NextFunction): Promise<void> => {
  try {
    const stats = statsService.getStats();
    res.json(stats);
  } catch (error) {
    next(error);
  }
});

// GET /admin/top-queries - Get top search queries
router.get('/top-queries', async (_req: Request, res: Response<AdminTopQueriesResponse | ErrorResponse>, next: NextFunction): Promise<void> => {
  try {
    const topQueries = statsService.getTopQueries();
    res.json(topQueries);
  } catch (error) {
    next(error);
  }
});

// POST /admin/force-index - Force start indexing
router.post('/force-index', async (_req: Request, res: Response<AdminForceIndexResponse | ErrorResponse>, next: NextFunction): Promise<void> => {
  try {
    const result = await searchService.forceIndex();
    res.json(result);
  } catch (error) {
    next(error);
  }
});

export { router as adminRouter };