import type { NextFunction, Request, Response } from 'express';
import { AppError } from '../errors/AppError.js';
import { hasPermission, isProtectedRoute } from '../helpers/routeMatch.js';

export const authorize = (
  req: Request,
  _res: Response,
  next: NextFunction,
): void => {
  try {
    if (!isProtectedRoute(req.path, req.method)) {
      next();
      return;
    }

    if (!req.user) {
      throw new AppError('No autenticado', 401);
    }

    if (!hasPermission(req.user.role, req.path, req.method)) {
      throw new AppError('No tenés permiso para realizar esta acción', 403);
    }

    next();
  } catch (err) {
    next(err);
  }
};
