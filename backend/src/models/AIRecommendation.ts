// backend/src/models/AIRecommendation.ts
import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IAIRecommendation extends Document {
    userId: Types.ObjectId;
    habitId: Types.ObjectId;
    recommendation: string;
    confidence: number;
    createdAt: Date;
}

const AIRecommendationSchema = new Schema<IAIRecommendation>(
    {
        userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
        habitId: { type: Schema.Types.ObjectId, ref: 'Habit', required: true },
        recommendation: { type: String, required: true },
        confidence: { type: Number, required: true, min: 0, max: 1 },
    },
    { timestamps: true }
);

export const AIRecommendation = mongoose.model<IAIRecommendation>('AIRecommendation', AIRecommendationSchema);
