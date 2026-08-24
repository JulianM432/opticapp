import { Router } from 'express';
import { authController } from '../controllers/auth.js';

const router = Router();

router.post('/auth/login', authController.login);
router.post('/auth/logout', authController.logout);
router.get('/auth/me', authController.me);

export { router as authRouter };
