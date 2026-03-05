import { Response, NextFunction } from 'express';
import { aiService } from './ai.service';
import { AuthRequest } from '../../middleware/auth.middleware';

export const aiController = {
    async create(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const rec = await aiService.create(req.body);
            res.status(201).json(rec);
        } catch (err) { next(err); }
    },

    async getByUser(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const recs = await aiService.getByUser(req.user!.userId);
            res.json(recs);
        } catch (err) { next(err); }
    },

    async getAll(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const recs = await aiService.getAll();
            res.json(recs);
        } catch (err) { next(err); }
    },

    async delete(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            await aiService.delete(req.params.id as string);
            res.json({ message: 'Recommendation deleted' });
        } catch (err) { next(err); }
    },
};
