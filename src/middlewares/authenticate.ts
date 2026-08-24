import type { NextFunction, Request, Response } from 'express';
import { AppError } from '../errors/AppError.js';
import { isProtectedRoute } from '../helpers/routeMatch.js';
import { authService } from '../services/auth.js';

const getCookieName = (): string => process.env.COOKIE_NAME ?? 'token';

export const authenticate = (
  req: Request,
  _res: Response,
  next: NextFunction,
): void => {
  try {
    if (!isProtectedRoute(req.path, req.method)) {
      next();
      return;
    }

    const token = req.cookies?.[getCookieName()];

    if (!token || typeof token !== 'string') {
      throw new AppError('No autenticado', 401);
    }

    req.user = authService.verifyToken(token);
    next();
  } catch (err) {
    next(err);
  }
};
