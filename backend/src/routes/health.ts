import { Router, Request, Response } from 'express';
import { HealthResponse } from '../types/api';

const router = Router();

router.get('/', (_req: Request, res: Response<HealthResponse>) => {
  const healthResponse: HealthResponse = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'dachshund-search-backend'
  };

  res.json(healthResponse);
});

export { router as healthRouter };