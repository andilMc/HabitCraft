// backend/src/models/User.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
    email: string;
    password: string;
    name: string;
    role: 'user' | 'admin';
    refreshToken?: string;
    createdAt: Date;
}

const UserSchema = new Schema<IUser>(
    {
        email: { type: String, required: true, unique: true, lowercase: true, trim: true },
        password: { type: String, required: true },
        name: { type: String, required: true, trim: true },
        role: { type: String, enum: ['user', 'admin'], default: 'user' },
        refreshToken: { type: String, default: null },
    },
    { timestamps: true }
);

export const User = mongoose.model<IUser>('User', UserSchema);
