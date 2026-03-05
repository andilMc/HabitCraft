// backend/src/routes/health.routes.ts
import { Router, Request, Response } from 'express';
import mongoose from 'mongoose';
import { redisClient } from '../database/redis';

const router = Router();

router.get('/health', async (_req: Request, res: Response) => {
    const mongoStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';

    let redisStatus = 'disconnected';
    try {
        const pong = await redisClient.ping();
        if (pong === 'PONG') {
            redisStatus = 'connected';
        }
    } catch {
        redisStatus = 'disconnected';
    }

    const allConnected = mongoStatus === 'connected' && redisStatus === 'connected';

    res.status(allConnected ? 200 : 503).json({
        status: allConnected ? 'ok' : 'degraded',
        services: {
            mongodb: { status: mongoStatus },
            redis: { status: redisStatus },
        },
    });
});

export default router;
