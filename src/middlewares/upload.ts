import type { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import { multerUpload } from '../configs/multer.js';

export const assignProductId = (
  req: Request,
  _res: Response,
  next: NextFunction,
): void => {
  const paramId = req.params.id;
  const routeId = typeof paramId === 'string' ? paramId : paramId?.[0];

  req.productId = routeId ?? new mongoose.Types.ObjectId().toString();
  next();
};

export const uploadProductImages = [
  assignProductId,
  multerUpload.array('images'),
];
