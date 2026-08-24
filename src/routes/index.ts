import { Router } from 'express';
import { getMongoStatus } from '../configs/db.js';
import { productRouter } from './product.js';

const router = Router();

router.get('/health', (_req, res) => {
  const mongodb = getMongoStatus();
  const status = mongodb === 'connected' ? 'ok' : 'degraded';

  res.json({ status, mongodb });
});

router.use(productRouter);

export default router;
