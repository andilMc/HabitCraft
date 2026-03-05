// backend/src/config/env.ts
import dotenv from 'dotenv';

dotenv.config();

export const config = {
    port: parseInt(process.env.PORT || '4000', 10),
    mongoUri: process.env.MONGO_URI || 'mongodb://admin:password@mongodb:27017/habitcraft?authSource=admin',
    redis: {
        host: process.env.REDIS_HOST || 'redis',
        port: parseInt(process.env.REDIS_PORT || '6379', 10),
    },
    jwtSecret: process.env.JWT_SECRET || 'supersecret',
};
