import { Response, NextFunction } from 'express';
import { analyticsService } from './analytics.service';
import { AuthRequest } from '../../middleware/auth.middleware';

export const analyticsController = {
    async getUserStats(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const stats = await analyticsService.getUserStats(req.user!.userId);
            res.json(stats);
        } catch (err) { next(err); }
    },

    async getAdminStats(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const stats = await analyticsService.getAdminStats();
            res.json(stats);
        } catch (err) { next(err); }
    },
};
