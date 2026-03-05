import { Router } from 'express';
import { authController } from './auth.controller';
import { authenticate } from '../../middleware/auth.middleware';

const router = Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/refresh', authController.refresh);
router.post('/logout', authenticate, authController.logout);

export default router;
