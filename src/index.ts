import 'dotenv/config';
import { createApp } from './configs/app.js';
import { connectDb } from './configs/db.js';
import { errorHandler } from './middlewares/errorHandler.js';

const port = Number(process.env.PORT ?? 5000);
const app = createApp();

app.use(errorHandler);

const start = async (): Promise<void> => {
  try {
    await connectDb();
    console.log('MongoDB connected');
  } catch (error) {
    console.warn('MongoDB connection failed:', error);
  }

  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
    // console.log(`Server running on http://192.168.0.100:${port}`);
  });
};

void start();
