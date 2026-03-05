import { Router } from 'express';
import { aiController } from './ai.controller';
import { authenticate, requireRole } from '../../middleware/auth.middleware';

const router = Router();

router.use(authenticate);

router.get('/recommendations', aiController.getByUser);
router.get('/recommendations/all', requireRole('admin'), aiController.getAll);
router.post('/recommendations', requireRole('admin'), aiController.create);
router.delete('/recommendations/:id', requireRole('admin'), aiController.delete);

export default router;
