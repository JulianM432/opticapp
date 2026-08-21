import mongoose from 'mongoose';

export const connectDb = async (): Promise<void> => {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error('MONGODB_URI is not defined');
  }

  await mongoose.connect(uri);
};

export const getMongoStatus = (): 'connected' | 'disconnected' => {
  return mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
};
