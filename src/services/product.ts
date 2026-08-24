import { Product, type ProductPublic } from '../models/product.js';
import { mapDocument } from '../utils/mapDocument.js';
import { AppError } from '../errors/AppError.js';

const publishedFilter = { isPublished: true, deletedAt: null } as const;

type MappedProduct = {
  brand: string;
  model: string;
  color: string;
  material: ProductPublic['material'];
  description?: string;
  images: string[];
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
};
