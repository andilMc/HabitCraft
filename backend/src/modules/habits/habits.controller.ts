import { Response, NextFunction } from 'express';
import { habitsService } from './habits.service';
import { AuthRequest } from '../../middleware/auth.middleware';

export const habitsController = {
    async create(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const habit = await habitsService.create(req.user!.userId, req.body);
            res.status(201).json(habit);
        } catch (err) { next(err); }
    },

    async getAll(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const habits = await habitsService.getAll(req.user!.userId);
            res.json(habits);
        } catch (err) { next(err); }
    },

    async getById(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const habit = await habitsService.getById(req.params.id as string, req.user!.userId);
            res.json(habit);
        } catch (err) { next(err); }
    },

    async update(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const habit = await habitsService.update(req.params.id as string, req.user!.userId, req.body);
            res.json(habit);
        } catch (err) { next(err); }
    },

    async delete(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const result = await habitsService.delete(req.params.id as string, req.user!.userId);
            res.json(result);
        } catch (err) { next(err); }
    },

    async complete(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const result = await habitsService.complete(req.params.id as string, req.user!.userId);
            res.json(result);
        } catch (err) { next(err); }
    },
};
