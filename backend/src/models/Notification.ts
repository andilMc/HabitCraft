// backend/src/models/Notification.ts
import mongoose, { Schema, Document, Types } from 'mongoose';

export interface INotification extends Document {
    userId: Types.ObjectId;
    title: string;
    message: string;
    read: boolean;
    createdAt: Date;
}

const NotificationSchema = new Schema<INotification>(
    {
        userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
        title: { type: String, required: true },
        message: { type: String, required: true },
        read: { type: Boolean, default: false },
    },
    { timestamps: true }
);

export const Notification = mongoose.model<INotification>('Notification', NotificationSchema);
