import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config/env';

export interface AuthRequest extends Request {
    user?: { userId: string; role: string };
}

export const authenticate = (req: AuthRequest, res: Response, next: NextFunction): void => {
    const header = req.headers.authorization;
    if (!header || !header.startsWith('Bearer ')) {
        res.status(401).json({ error: 'Unauthorized', message: 'No token provided' });
        return;
    }

    try {
        const token = header.split(' ')[1];
        const decoded = jwt.verify(token, config.jwtSecret) as { userId: string; role: string };
        req.user = decoded;
        next();
    } catch {
        res.status(401).json({ error: 'Unauthorized', message: 'Invalid or expired token' });
    }
};

export const requireRole = (...roles: string[]) => {
    return (req: AuthRequest, res: Response, next: NextFunction): void => {
        if (!req.user || !roles.includes(req.user.role)) {
            res.status(403).json({ error: 'Forbidden', message: 'Insufficient permissions' });
            return;
        }
        next();
    };
};
