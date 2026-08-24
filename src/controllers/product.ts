import type { NextFunction, Request, Response } from 'express';
import { AppError } from '../errors/AppError.js';
import { productService } from '../services/product.js';
import {
  objectIdSchema,
  paginationQuerySchema,
} from '../validations/product.js';

const getZodMessage = (message: string | undefined): string =>
  message ?? 'Datos inválidos';

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
};
