import { Router } from 'express';
import { getMongoStatus } from '../configs/db.js';

const router = Router();

router.get('/health', (_req, res) => {
  const mongodb = getMongoStatus();
  const status = mongodb === 'connected' ? 'ok' : 'degraded';

  res.json({ status, mongodb });
});

export default router;
