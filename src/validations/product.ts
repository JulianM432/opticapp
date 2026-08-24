import { z } from 'zod';

export const MATERIAL_VALUES = [
  'acetate',
  'metal',
  'tr90',
  'titanium',
  'mixed',
  'other',
] as const;

export const materialEnum = z.enum(MATERIAL_VALUES);

export type Material = z.infer<typeof materialEnum>;

export const objectIdSchema = z
  .string({ error: 'El id no es válido' })
  .regex(/^[a-fA-F0-9]{24}$/, { error: 'El id no es válido' });

export const paginationQuerySchema = z.object({
  page: z.coerce
    .number({ error: 'El parámetro page debe ser un número' })
    .int({ error: 'El parámetro page debe ser un entero' })
    .min(1, { error: 'El parámetro page debe ser mayor o igual a 1' })
    .default(1),
  limit: z.coerce
    .number({ error: 'El parámetro limit debe ser un número' })
    .int({ error: 'El parámetro limit debe ser un entero' })
    .min(1, { error: 'El parámetro limit debe ser mayor o igual a 1' })
    .default(12),
});
