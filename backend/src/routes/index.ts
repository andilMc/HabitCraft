import { Router } from 'express';
import healthRoutes from './health.routes';
import authRoutes from '../modules/auth/auth.routes';
import habitsRoutes from '../modules/habits/habits.routes';
import aiRoutes from '../modules/ai/ai.routes';
import notificationsRoutes from '../modules/notifications/notifications.routes';
import analyticsRoutes from '../modules/analytics/analytics.routes';
import usersRoutes from '../modules/users/users.routes';

const router = Router();

// Health check
router.use(healthRoutes);

// API routes
router.use('/api/auth', authRoutes);
router.use('/api/habits', habitsRoutes);
router.use('/api/ai', aiRoutes);
router.use('/api/notifications', notificationsRoutes);
router.use('/api/analytics', analyticsRoutes);
router.use('/api/users', usersRoutes);

export default router;
