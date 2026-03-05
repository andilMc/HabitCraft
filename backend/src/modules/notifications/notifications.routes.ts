import { Router } from 'express';
import { notificationsController } from './notifications.controller';
import { authenticate, requireRole } from '../../middleware/auth.middleware';

const router = Router();

router.use(authenticate);

router.get('/', notificationsController.getByUser);
router.get('/all', requireRole('admin'), notificationsController.getAll);
router.post('/', requireRole('admin'), notificationsController.send);
router.post('/bulk', requireRole('admin'), notificationsController.sendBulk);
router.patch('/:id/read', notificationsController.markAsRead);

export default router;
