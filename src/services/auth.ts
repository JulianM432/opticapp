import jwt, { type SignOptions } from 'jsonwebtoken';
import { comparePassword } from '../helpers/hashPassword.js';
import { User, type AuthUser } from '../models/user.js';
import { mapDocument } from '../utils/mapDocument.js';
import { AppError } from '../errors/AppError.js';
import type { LoginInput } from '../validations/auth.js';

interface JwtPayload {
  id: string;
  role: string;
}

type MappedUser = {
  email: string;
  firstName: string;
  lastName: string;
  role: AuthUser['role'];
};

const toAuthUser = (doc: InstanceType<typeof User>): AuthUser => {
  const mapped = mapDocument<MappedUser>(doc);

  return {
    id: mapped.id,
    email: mapped.email,
    firstName: mapped.firstName,
    lastName: mapped.lastName,
    role: mapped.role,
  };
};

const getJwtSecret = (): string => {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new AppError('JWT_SECRET no está configurado', 500);
  }

  return secret;
};

const getJwtExpiresIn = (): SignOptions['expiresIn'] => {
  return (process.env.JWT_EXPIRES_IN ?? '1d') as SignOptions['expiresIn'];
};

const getTokenExpiresAt = (token: string): number => {
  const payload = jwt.decode(token);

  if (
    typeof payload !== 'object' ||
    payload === null ||
    typeof payload.exp !== 'number'
  ) {
    throw new AppError('No se pudo determinar la expiración del token', 500);
  }

  return payload.exp * 1000;
};

export const authService = {
  login: async (
    input: LoginInput,
  ): Promise<{ user: AuthUser; token: string; expiresAt: number }> => {
    const user = await User.findOne({
      email: input.email.toLowerCase().trim(),
    });

    if (!user || !(await comparePassword(input.password, user.password))) {
      throw new AppError('Credenciales inválidas', 401);
    }

    const token = jwt.sign(
      { id: user._id.toString(), role: user.role },
      getJwtSecret(),
      { expiresIn: getJwtExpiresIn() },
    );

    return {
      user: toAuthUser(user),
      token,
      expiresAt: getTokenExpiresAt(token),
    };
  },

  me: async (userId: string): Promise<AuthUser> => {
    const user = await User.findById(userId);

    if (!user) {
      throw new AppError('Sesión inválida', 401);
    }

    return toAuthUser(user);
  },

  verifyToken: (token: string): JwtPayload => {
    try {
      const payload = jwt.verify(token, getJwtSecret());

      if (
        typeof payload !== 'object' ||
        payload === null ||
        !('id' in payload) ||
        !('role' in payload) ||
        typeof payload.id !== 'string' ||
        typeof payload.role !== 'string'
      ) {
        throw new AppError('Token inválido', 401);
      }

      return { id: payload.id, role: payload.role };
    } catch (err) {
      if (err instanceof AppError) {
        throw err;
      }

      throw new AppError('Token inválido o expirado', 401);
    }
  },
};
