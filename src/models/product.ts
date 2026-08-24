import mongoose, { Schema } from 'mongoose';
import {
  MATERIAL_VALUES,
  type Material,
} from '../validations/product.js';

export type { Material };

export interface ProductPublic {
  id: string;
  brand: string;
  model: string;
  color: string;
  material: Material;
  description?: string;
  images: string[];
}

const productSchema = new Schema(
  {
    brand: { type: String, required: true, trim: true },
    model: { type: String, required: true, trim: true },
    color: { type: String, required: true, trim: true },
    material: {
      type: String,
      required: true,
      enum: MATERIAL_VALUES,
    },
    description: { type: String, trim: true },
    images: { type: [String], default: [] },
    isPublished: { type: Boolean, required: true, default: false },
    deletedAt: { type: Date, default: null },
  },
  { timestamps: true },
);

productSchema.index(
  { brand: 1, model: 1, color: 1 },
  { unique: true, partialFilterExpression: { deletedAt: null } },
);

productSchema.index({ isPublished: 1, deletedAt: 1, brand: 1 });

export const Product = mongoose.model('Product', productSchema);
