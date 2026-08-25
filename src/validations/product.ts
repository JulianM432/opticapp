import { z } from 'zod';

export const MATERIAL_VALUES = [
  'acetate',
  'metal',
  'tr90',
  'titanium',
  'mixed',
  'other',
] as const;

export const materialEnum = z.enum(MATERIAL_VALUES, {
  error: 'El material no es válido',
});

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

const requiredTrimmedString = (label: string) =>
  z
    .string({ error: `${label} es obligatorio` })
    .trim()
    .min(1, { error: `${label} es obligatorio` });

const booleanFromForm = z.preprocess(
  (value) => {
    if (value === 'true' || value === true) {
      return true;
    }

    if (value === 'false' || value === false) {
      return false;
    }

    return false;
  },
  z.boolean(),
);

const optionalBooleanFromForm = z.preprocess(
  (value) => {
    if (value === undefined || value === '') {
      return undefined;
    }

    if (value === 'true' || value === true) {
      return true;
    }

    if (value === 'false' || value === false) {
      return false;
    }

    return value;
  },
  z.boolean({ error: 'isPublished debe ser true o false' }).optional(),
);

export const createProductSchema = z.object({
  brand: requiredTrimmedString('La marca'),
  model: requiredTrimmedString('El modelo'),
  color: requiredTrimmedString('El color'),
  material: materialEnum,
  description: z.string().trim().optional(),
  isPublished: booleanFromForm.default(false),
});

export const updateProductSchema = z.object({
  brand: requiredTrimmedString('La marca').optional(),
  model: requiredTrimmedString('El modelo').optional(),
  color: requiredTrimmedString('El color').optional(),
  material: materialEnum.optional(),
  description: z.string().trim().optional(),
  isPublished: optionalBooleanFromForm,
});

export type CreateProductInput = z.infer<typeof createProductSchema>;
export type UpdateProductInput = z.infer<typeof updateProductSchema>;
