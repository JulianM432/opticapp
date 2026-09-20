import {
  Product,
  type ProductAdmin,
  type ProductPublic,
} from '../models/product.js';
import { mapDocument } from '../utils/mapDocument.js';
import { AppError } from '../errors/AppError.js';
import type {
  CreateProductInput,
  UpdateProductInput,
} from '../validations/product.js';

const publishedFilter = { isPublished: true, deletedAt: null } as const;
const activeFilter = { deletedAt: null } as const;

const DUPLICATE_PRODUCT_MESSAGE =
  'Ya existe un producto con la misma marca, modelo y color';

type MappedProduct = {
  brand: string;
  model: string;
  color: string;
  material: ProductPublic['material'];
  description?: string;
  images: string[];
};

type MappedProductAdmin = MappedProduct & {
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
};

const isDuplicateKeyError = (err: unknown): boolean => {
  return (
    typeof err === 'object' &&
    err !== null &&
    'code' in err &&
    err.code === 11000
  );
};

const toIsoString = (value: Date | string): string => {
  return value instanceof Date ? value.toISOString() : value;
};

const toProductPublic = (doc: InstanceType<typeof Product>): ProductPublic => {
  const mapped = mapDocument<MappedProduct>(doc);
  const product: ProductPublic = {
    id: mapped.id,
    brand: mapped.brand,
    model: mapped.model,
    color: mapped.color,
    material: mapped.material,
    images: mapped.images ?? [],
  };

  if (mapped.description) {
    product.description = mapped.description;
  }

  return product;
};

const toProductAdmin = (doc: InstanceType<typeof Product>): ProductAdmin => {
  const mapped = mapDocument<MappedProductAdmin>(doc);
  const product: ProductAdmin = {
    id: mapped.id,
    brand: mapped.brand,
    model: mapped.model,
    color: mapped.color,
    material: mapped.material,
    images: mapped.images ?? [],
    isPublished: mapped.isPublished,
    createdAt: toIsoString(mapped.createdAt),
    updatedAt: toIsoString(mapped.updatedAt),
  };

  if (mapped.description) {
    product.description = mapped.description;
  }

  return product;
};

export interface PaginatedProducts {
  items: ProductPublic[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export const productService = {
  getPublishedPaginated: async (
    page: number,
    limit: number,
  ): Promise<PaginatedProducts> => {
    const [docs, total] = await Promise.all([
      Product.find(publishedFilter)
        .sort({ brand: 1 })
        .skip((page - 1) * limit)
        .limit(limit),
      Product.countDocuments(publishedFilter),
    ]);

    return {
      items: docs.map(toProductPublic),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  },

  getPublishedById: async (id: string): Promise<ProductPublic> => {
    const doc = await Product.findOne({ _id: id, ...publishedFilter });

    if (!doc) {
      throw new AppError('Producto no encontrado', 404);
    }

    return toProductPublic(doc);
  },

  getAllAdmin: async (): Promise<ProductAdmin[]> => {
    const docs = await Product.find(activeFilter).sort({ brand: 1, model: 1 });
    return docs.map(toProductAdmin);
  },

  create: async (
    id: string,
    input: CreateProductInput,
    imageUrls: string[],
  ): Promise<ProductAdmin> => {
    try {
      const doc = await Product.create({
        _id: id,
        brand: input.brand,
        model: input.model,
        color: input.color,
        material: input.material,
        description: input.description,
        images: imageUrls,
        isPublished: input.isPublished,
        deletedAt: null,
      });

      return toProductAdmin(doc);
    } catch (err) {
      if (isDuplicateKeyError(err)) {
        throw new AppError(DUPLICATE_PRODUCT_MESSAGE, 409);
      }

      throw err;
    }
  },

  update: async (
    id: string,
    input: UpdateProductInput,
    newImageUrls: string[],
  ): Promise<ProductAdmin> => {
    const doc = await Product.findOne({ _id: id, ...activeFilter });

    if (!doc) {
      throw new AppError('Producto no encontrado', 404);
    }

    if (input.brand !== undefined) {
      doc.set('brand', input.brand);
    }

    if (input.model !== undefined) {
      doc.set('model', input.model);
    }

    if (input.color !== undefined) {
      doc.set('color', input.color);
    }

    if (input.material !== undefined) {
      doc.set('material', input.material);
    }

    if (input.description !== undefined) {
      doc.set('description', input.description);
    }

    if (input.isPublished !== undefined) {
      doc.set('isPublished', input.isPublished);
    }

    if (newImageUrls.length > 0) {
      doc.images = [...doc.images, ...newImageUrls];
    }

    try {
      await doc.save();
      return toProductAdmin(doc);
    } catch (err) {
      if (isDuplicateKeyError(err)) {
        throw new AppError(DUPLICATE_PRODUCT_MESSAGE, 409);
      }

      throw err;
    }
  },

  softDelete: async (id: string): Promise<void> => {
    const doc = await Product.findOneAndUpdate(
      { _id: id, ...activeFilter },
      { deletedAt: new Date() },
      { new: true },
    );

    if (!doc) {
      throw new AppError('Producto no encontrado', 404);
    }
  },
};
