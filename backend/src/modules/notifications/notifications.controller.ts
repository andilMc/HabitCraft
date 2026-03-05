import { Response, NextFunction } from 'express';
import { notificationsService } from './notifications.service';
import { AuthRequest } from '../../middleware/auth.middleware';

export const notificationsController = {
    async send(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const { userId, title, message } = req.body;
            const notification = await notificationsService.send(userId, title, message);
            res.status(201).json(notification);
        } catch (err) { next(err); }
    },

    async sendBulk(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const { userIds, title, message } = req.body;
            const notifications = await notificationsService.sendBulk(userIds, title, message);
            res.status(201).json(notifications);
        } catch (err) { next(err); }
    },

    async getByUser(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const notifications = await notificationsService.getByUser(req.user!.userId);
            res.json(notifications);
        } catch (err) { next(err); }
    },

    async getAll(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const notifications = await notificationsService.getAll();
            res.json(notifications);
        } catch (err) { next(err); }
    },

    async markAsRead(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const notification = await notificationsService.markAsRead(req.params.id as string);
            res.json(notification);
        } catch (err) { next(err); }
    },
};
