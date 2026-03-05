import { Notification } from '../../models/Notification';
import { redisClient } from '../../database/redis';

export const notificationsService = {
    async send(userId: string, title: string, message: string) {
        const notification = await Notification.create({ userId, title, message });

        // Publish to Redis channel for real-time delivery
        await redisClient.publish('notifications', JSON.stringify({
            userId,
            notificationId: notification._id,
            title,
            message,
        }));

        return notification;
    },

    async sendBulk(userIds: string[], title: string, message: string) {
        const notifications = await Notification.insertMany(
            userIds.map(userId => ({ userId, title, message }))
        );

        // Publish each to Redis
        for (const userId of userIds) {
            await redisClient.publish('notifications', JSON.stringify({ userId, title, message }));
        }

        return notifications;
    },

    async getByUser(userId: string) {
        return Notification.find({ userId }).sort({ createdAt: -1 }).lean();
    },

    async getAll() {
        return Notification.find()
            .populate('userId', 'name email')
            .sort({ createdAt: -1 })
            .lean();
    },

    async markAsRead(notificationId: string) {
        return Notification.findByIdAndUpdate(notificationId, { read: true }, { new: true });
    },
};
