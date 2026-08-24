import fs from 'node:fs';
import path from 'node:path';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { anteojosDir, formatUploadDatetime } from '../configs/multer.js';
import { connectDb } from '../configs/db.js';
import { Product } from '../models/product.js';
import type { Material } from '../models/product.js';

dotenv.config({ quiet: true });

const PNG_1X1 = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==',
  'base64',
);

const uploadsBaseUrl =
  process.env.UPLOADS_BASE_URL ?? 'http://localhost:3000/uploads';

interface SeedProduct {
  brand: string;
  model: string;
  color: string;
  material: Material;
  description: string;
}

const seedCatalog: SeedProduct[] = [
  {
    brand: 'Ray-Ban',
    model: 'Aviator',
    color: 'Gold',
    material: 'metal',
    description: 'Armazón aviador clásico de metal.',
  },
  {
    brand: 'Oakley',
    model: 'Holbrook',
    color: 'Matte Black',
    material: 'acetate',
    description: 'Armazón de acetato con frente rectangular.',
  },
  {
    brand: 'Vogue',
    model: 'VO5334',
    color: 'Havana',
    material: 'tr90',
    description: 'Armazón liviano de TR90.',
  },
  {
    brand: 'Persol',
    model: 'PO0714',
    color: 'Terra di Siena',
    material: 'acetate',
    description: 'Armazón italiano de acetato.',
  },
  {
    brand: 'Silhouette',
    model: 'Titan Minimal',
    color: 'Silver',
    material: 'titanium',
    description: 'Armazón de titanio de perfil fino.',
  },
];

const writePlaceholderImage = (productId: string): string => {
  fs.mkdirSync(anteojosDir, { recursive: true });
  const filename = `${productId}_${formatUploadDatetime(new Date())}.png`;
  fs.writeFileSync(path.join(anteojosDir, filename), PNG_1X1);
  return `${uploadsBaseUrl}/anteojos/${filename}`;
};

const seed = async (): Promise<void> => {
  await connectDb();

  await Product.deleteMany({
    $or: seedCatalog.map((item) => ({
      brand: item.brand,
      model: item.model,
      color: item.color,
    })),
  });

  const docs = seedCatalog.map((item) => {
    const id = new mongoose.Types.ObjectId();
    const imageUrl = writePlaceholderImage(id.toString());

    return {
      _id: id,
      ...item,
      images: [imageUrl],
      isPublished: true,
      deletedAt: null,
    };
  });

  await Product.insertMany(docs);
  console.log(`Seeded ${docs.length} published products`);

  await mongoose.disconnect();
};

seed().catch((error: unknown) => {
  console.error('Product seed failed:', error);
  process.exitCode = 1;
});
