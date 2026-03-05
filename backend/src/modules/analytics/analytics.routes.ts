import { Router } from 'express';
import { analyticsController } from './analytics.controller';
import { authenticate, requireRole } from '../../middleware/auth.middleware';

const router = Router();

router.use(authenticate);

router.get('/user', analyticsController.getUserStats);
router.get('/admin', requireRole('admin'), analyticsController.getAdminStats);

export default router;
