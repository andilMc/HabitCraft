import { Router } from 'express';
import { usersController } from './users.controller';
import { authenticate, requireRole } from '../../middleware/auth.middleware';

const router = Router();

router.use(authenticate, requireRole('admin'));

router.get('/', usersController.getAll);
router.get('/:id', usersController.getById);
router.patch('/:id/role', usersController.updateRole);
router.delete('/:id', usersController.delete);

export default router;
