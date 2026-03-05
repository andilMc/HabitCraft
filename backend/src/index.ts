import express from 'express';
import cors from 'cors';
import { config } from './config/env';
import { connectMongo } from './database/mongo';
import { connectRedis } from './database/redis';
import { seedAdmin } from './database/seed';
import { errorHandler } from './middleware/error.middleware';
import routes from './routes';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use(routes);

// Error handler (must be last)
app.use(errorHandler);

// Bootstrap
const start = async (): Promise<void> => {
  await connectMongo();
  await connectRedis();
  await seedAdmin();

  app.listen(config.port, () => {
    console.log(`✅ Server running on http://localhost:${config.port}`);
  });
};

start().catch((err) => {
  console.error('❌ Failed to start server:', err);
  process.exit(1);
});