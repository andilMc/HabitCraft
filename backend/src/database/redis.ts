// backend/src/database/redis.ts
import { createClient, type RedisClientType } from 'redis';
import { config } from '../config/env';

export const redisClient: RedisClientType = createClient({
    url: `redis://${config.redis.host}:${config.redis.port}`,
});

redisClient.on('error', (err) => console.error('❌ Redis error:', err));

export const connectRedis = async (): Promise<void> => {
    try {
        await redisClient.connect();
        console.log('✅ Redis connected');
    } catch (error) {
        console.error('❌ Redis connection error:', error);
        process.exit(1);
    }
};
