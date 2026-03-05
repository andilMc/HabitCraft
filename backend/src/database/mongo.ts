// backend/src/database/mongo.ts
import mongoose from 'mongoose';
import { config } from '../config/env';

export const connectMongo = async (): Promise<void> => {
    try {
        await mongoose.connect(config.mongoUri);
        console.log('✅ MongoDB connected');
    } catch (error) {
        console.error('❌ MongoDB connection error:', error);
        process.exit(1);
    }
};
