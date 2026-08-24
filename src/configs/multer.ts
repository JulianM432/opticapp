import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import type { Request } from 'express';
import multer, { type FileFilterCallback } from 'multer';
import { AppError } from '../errors/AppError.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const uploadsRoot = path.join(__dirname, '..', '..', 'uploads');
export const anteojosDir = path.join(uploadsRoot, 'anteojos');

const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024;

const ALLOWED_MIME_TYPES = new Map<string, string>([
  ['image/jpeg', '.jpg'],
  ['image/png', '.png'],
  ['image/webp', '.webp'],
  ['image/gif', '.gif'],
]);

const pad = (value: number): string => String(value).padStart(2, '0');

export const formatUploadDatetime = (date: Date): string => {
  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());

  return `${year}${month}${day}${hours}${minutes}${seconds}`;
};

const getExtension = (file: Express.Multer.File): string => {
  return ALLOWED_MIME_TYPES.get(file.mimetype) ?? '.jpg';
};

export const productImageStorage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    fs.mkdirSync(anteojosDir, { recursive: true });
    cb(null, anteojosDir);
  },
  filename: (req: Request, file, cb) => {
    const productId = req.params.id ?? 'new';
    const datetime = formatUploadDatetime(new Date());
    cb(null, `${productId}_${datetime}${getExtension(file)}`);
  },
});

const imageFileFilter = (
  _req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback,
): void => {
  if (!ALLOWED_MIME_TYPES.has(file.mimetype)) {
    cb(
      new AppError(
        'El archivo debe ser una imagen (jpeg, png, webp o gif)',
        400,
      ),
    );
    return;
  }

  cb(null, true);
};

export const multerUpload = multer({
  storage: productImageStorage,
  limits: { fileSize: MAX_FILE_SIZE_BYTES },
  fileFilter: imageFileFilter,
});
