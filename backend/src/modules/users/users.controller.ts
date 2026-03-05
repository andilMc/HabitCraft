import { Response, NextFunction } from 'express';
import { usersService } from './users.service';
import { AuthRequest } from '../../middleware/auth.middleware';

export const usersController = {
    async getAll(_req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const users = await usersService.getAll();
            res.json(users);
        } catch (err) { next(err); }
    },

    async getById(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const user = await usersService.getById(req.params.id as string);
            res.json(user);
        } catch (err) { next(err); }
    },

    async updateRole(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const user = await usersService.updateRole(req.params.id as string, req.body.role);
            res.json(user);
        } catch (err) { next(err); }
    },

    async delete(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const result = await usersService.delete(req.params.id as string);
            res.json(result);
        } catch (err) { next(err); }
    },
};
