import path from 'node:path';
import { fileURLToPath } from 'node:url';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { type Express } from 'express';
import routes from '../routes/index.js';
import { authenticate } from '../middlewares/authenticate.js';
import { authorize } from '../middlewares/authorize.js';
import { requestLogger } from '../middlewares/requestLogger.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const createApp = (): Express => {
  const app = express();
  const clientUrl = process.env.CLIENT_URL ?? 'http://localhost:5173';
  app.use(express.json());
  app.use(
    cors({
      origin: clientUrl,
      credentials: true,
    }),
  );
  app.use(cookieParser());
  app.use(requestLogger);
  app.use(authenticate);
  app.use(authorize);
  app.use(
    '/uploads',
    express.static(path.join(__dirname, '..', '..', 'uploads')),
  );
  app.use(routes);

  return app;
};
