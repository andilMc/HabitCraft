import { Router } from 'express';
import { habitsController } from './habits.controller';
import { authenticate } from '../../middleware/auth.middleware';

const router = Router();

router.use(authenticate);

router.post('/', habitsController.create);
router.get('/', habitsController.getAll);
router.get('/:id', habitsController.getById);
router.put('/:id', habitsController.update);
router.delete('/:id', habitsController.delete);
router.post('/:id/complete', habitsController.complete);

export default router;
