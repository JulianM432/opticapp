import type { CookieOptions } from 'express';
import type { NextFunction, Request, Response } from 'express';
import { AppError } from '../errors/AppError.js';
import { authService } from '../services/auth.js';
import { loginSchema } from '../validations/auth.js';

const getZodMessage = (message: string | undefined): string =>
  message ?? 'Datos inválidos';

const getCookieName = (): string => process.env.COOKIE_NAME ?? 'token';

const getCookieOptions = (): CookieOptions => ({
  httpOnly: true,
  sameSite: 'lax',
  path: '/',
  secure: process.env.NODE_ENV === 'production',
  maxAge: 24 * 60 * 60 * 1000,
});

export const authController = {
  login: async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const parsed = loginSchema.safeParse(req.body);

      if (!parsed.success) {
        throw new AppError(
          getZodMessage(parsed.error.issues[0]?.message),
          400,
        );
      }

      const { user, token } = await authService.login(parsed.data);

      res.cookie(getCookieName(), token, getCookieOptions());
      res.json(user);
    } catch (err) {
      next(err);
    }
  },

  logout: async (
    _req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      res.clearCookie(getCookieName(), getCookieOptions());
      res.json({ message: 'Sesión cerrada' });
    } catch (err) {
      next(err);
    }
  },

  me: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      if (!req.user?.id) {
        throw new AppError('No autenticado', 401);
      }

      const user = await authService.me(req.user.id);
      res.json(user);
    } catch (err) {
      next(err);
    }
  },
};
