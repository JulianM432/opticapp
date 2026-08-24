import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string({ error: 'El email es obligatorio' })
    .trim()
    .min(1, { error: 'El email es obligatorio' })
    .email({ error: 'El email no es válido' }),
  password: z
    .string({ error: 'La contraseña es obligatoria' })
    .min(1, { error: 'La contraseña es obligatoria' }),
});

export type LoginInput = z.infer<typeof loginSchema>;
