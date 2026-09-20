import fs from 'node:fs';
import path from 'node:path';
import type { NextFunction, Request, Response } from 'express';
import { anteojosDir } from '../configs/multer.js';
import { AppError } from '../errors/AppError.js';
import { productService } from '../services/product.js';
import {
  createProductSchema,
  objectIdSchema,
  paginationQuerySchema,
  updateProductSchema,
} from '../validations/product.js';

const getZodMessage = (message: string | undefined): string =>
  message ?? 'Datos inválidos';

const getUploadsBaseUrl = (): string =>
  process.env.UPLOADS_BASE_URL ?? 'http://localhost:5000/uploads';

const getUploadedFiles = (req: Request): Express.Multer.File[] => {
  if (!req.files || !Array.isArray(req.files)) {
    return [];
  }

  return req.files;
};

const filesToUrls = (files: Express.Multer.File[]): string[] =>
  files.map((file) => `${getUploadsBaseUrl()}/anteojos/${file.filename}`);

const cleanupUploadedFiles = (files: Express.Multer.File[]): void => {
  for (const file of files) {
    fs.unlink(path.join(anteojosDir, file.filename), () => {});
  }
};

export const productController = {
  getPublished: async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const parsed = paginationQuerySchema.safeParse(req.query);

      if (!parsed.success) {
        throw new AppError(
          getZodMessage(parsed.error.issues[0]?.message),
          400,
        );
      }

      const { page, limit } = parsed.data;
      const result = await productService.getPublishedPaginated(page, limit);
      res.json(result);
    } catch (err) {
      next(err);
    }
  },

  getPublishedById: async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const parsed = objectIdSchema.safeParse(req.params.id);

      if (!parsed.success) {
        throw new AppError(
          getZodMessage(parsed.error.issues[0]?.message),
          400,
        );
      }

      const product = await productService.getPublishedById(parsed.data);
      res.json(product);
    } catch (err) {
      next(err);
    }
  },

  getAllAdmin: async (
    _req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const products = await productService.getAllAdmin();
      res.json(products);
    } catch (err) {
      next(err);
    }
  },

  create: async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    const files = getUploadedFiles(req);

    try {
      const parsed = createProductSchema.safeParse(req.body);

      if (!parsed.success) {
        throw new AppError(
          getZodMessage(parsed.error.issues[0]?.message),
          400,
        );
      }

      if (!req.productId) {
        throw new AppError('Error interno del servidor', 500);
      }

      const product = await productService.create(
        req.productId,
        parsed.data,
        filesToUrls(files),
      );
      res.status(201).json(product);
    } catch (err) {
      cleanupUploadedFiles(files);
      next(err);
    }
  },

  update: async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    const files = getUploadedFiles(req);

    try {
      const idParsed = objectIdSchema.safeParse(req.params.id);

      if (!idParsed.success) {
        throw new AppError(
          getZodMessage(idParsed.error.issues[0]?.message),
          400,
        );
      }

      const parsed = updateProductSchema.safeParse(req.body);

      if (!parsed.success) {
        throw new AppError(
          getZodMessage(parsed.error.issues[0]?.message),
          400,
        );
      }

      const product = await productService.update(
        idParsed.data,
        parsed.data,
        filesToUrls(files),
      );
      res.json(product);
    } catch (err) {
      cleanupUploadedFiles(files);
      next(err);
    }
  },

  softDelete: async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const parsed = objectIdSchema.safeParse(req.params.id);

      if (!parsed.success) {
        throw new AppError(
          getZodMessage(parsed.error.issues[0]?.message),
          400,
        );
      }

      await productService.softDelete(parsed.data);
      res.json({ message: 'Producto eliminado' });
    } catch (err) {
      next(err);
    }
  },
};
