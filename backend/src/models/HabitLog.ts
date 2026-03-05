// backend/src/models/HabitLog.ts
import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IHabitLog extends Document {
    habitId: Types.ObjectId;
    date: Date;
    completed: boolean;
}

const HabitLogSchema = new Schema<IHabitLog>(
    {
        habitId: { type: Schema.Types.ObjectId, ref: 'Habit', required: true, index: true },
        date: { type: Date, required: true },
        completed: { type: Boolean, default: false },
    },
    { timestamps: true }
);

export const HabitLog = mongoose.model<IHabitLog>('HabitLog', HabitLogSchema);
