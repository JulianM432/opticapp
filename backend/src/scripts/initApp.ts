import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { connectDb } from '../configs/db.js';
import { hashPassword } from '../helpers/hashPassword.js';
import { User } from '../models/user.js';

dotenv.config({ quiet: true });

const requireEnv = (name: string): string => {
  const value = process.env[name];

  if (!value) {
    throw new Error(`${name} is not defined`);
  }

  return value;
};

const initApp = async (): Promise<void> => {
  const email = requireEnv('ADMIN_EMAIL').toLowerCase().trim();
  const password = requireEnv('ADMIN_PASSWORD');
  const firstName = requireEnv('ADMIN_FIRST_NAME');
  const lastName = requireEnv('ADMIN_LAST_NAME');

  try {
    await connectDb();

    const existing = await User.findOne({ email });

    if (existing) {
      console.log(`Admin already exists: ${email}`);
      return;
    }

    const hashedPassword = await hashPassword(password);

    await User.create({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      role: 'admin',
    });

    console.log(`Admin created: ${email}`);
  } finally {
    await mongoose.disconnect();
  }
};

initApp().catch((error: unknown) => {
  console.error('initApp failed:', error);
  process.exitCode = 1;
});
