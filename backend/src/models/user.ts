import mongoose, { Schema } from 'mongoose';

export interface AuthUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'admin';
}

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: true },
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    role: {
      type: String,
      required: true,
      enum: ['admin'],
      default: 'admin',
    },
  },
  { timestamps: true },
);

export const User = mongoose.model('User', userSchema);
