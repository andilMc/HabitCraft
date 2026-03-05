import { Request, Response, NextFunction } from 'express';
import { authService } from './auth.service';
import { AuthRequest } from '../../middleware/auth.middleware';

export const authController = {
    async register(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password, name } = req.body;
            if (!email || !password || !name) {
                res.status(400).json({ error: 'Email, password, and name are required' });
                return;
            }
            const result = await authService.register(email, password, name);
            res.status(201).json(result);
        } catch (err) { next(err); }
    },

    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                res.status(400).json({ error: 'Email and password are required' });
                return;
            }
            const result = await authService.login(email, password);
            res.json(result);
        } catch (err) { next(err); }
    },

    async refresh(req: Request, res: Response, next: NextFunction) {
        try {
            const { refreshToken } = req.body;
            if (!refreshToken) {
                res.status(400).json({ error: 'Refresh token is required' });
                return;
            }
            const result = await authService.refresh(refreshToken);
            res.json(result);
        } catch (err) { next(err); }
    },

    async logout(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            await authService.logout(req.user!.userId);
            res.json({ message: 'Logged out successfully' });
        } catch (err) { next(err); }
    },
};
