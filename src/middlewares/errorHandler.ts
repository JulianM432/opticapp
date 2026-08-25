import type { NextFunction, Request, Response } from 'express';
import multer from 'multer';
import { AppError } from '../errors/AppError.js';

const isJsonParseError = (
  err: unknown,
): err is SyntaxError & { status: number; type: string } =>
  err instanceof SyntaxError &&
  'status' in err &&
  err.status === 400 &&
  'type' in err &&
  err.type === 'entity.parse.failed';

export const errorHandler = (
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({ message: err.message });
    return;
  }

  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      res.status(400).json({
        message: 'El archivo excede el tamaño máximo permitido (5 MB)',
      });
      return;
    }

    res.status(400).json({ message: 'Error al subir el archivo' });
    return;
  }

  if (isJsonParseError(err)) {
    res.status(400).json({ message: 'JSON inválido' });
    return;
  }

  console.error(err);
  res.status(500).json({ message: 'Error interno del servidor' });
};
