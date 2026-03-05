// backend/src/models/Habit.ts
import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IHabit extends Document {
    title: string;
    description: string;
    frequency: 'daily' | 'weekly' | 'monthly';
    userId: Types.ObjectId;
    createdAt: Date;
}

const HabitSchema = new Schema<IHabit>(
    {
        title: { type: String, required: true, trim: true },
        description: { type: String, default: '' },
        frequency: { type: String, enum: ['daily', 'weekly', 'monthly'], default: 'daily' },
        userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    },
    { timestamps: true }
);

export const Habit = mongoose.model<IHabit>('Habit', HabitSchema);
