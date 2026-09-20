import { useCallback, useState } from 'react';
import { toast } from 'sonner';
import { getApiErrorMessage } from '@/api/client';
import { productApi } from '@/api/product';
import type { ProductAdmin, ProductFormValues } from '@/types/product';

export function useSaveProduct() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const createProduct = useCallback(
    async (values: ProductFormValues, files: File[]): Promise<ProductAdmin> => {
      setIsSubmitting(true);

      try {
        const product = await productApi.create(values, files);
        toast.success('Producto creado correctamente');
        return product;
      } catch (err) {
        const message = getApiErrorMessage(
          err,
          'No se pudo crear el producto',
        );
        toast.error(message);
        throw err;
      } finally {
        setIsSubmitting(false);
      }
    },
    [],
  );

  const updateProduct = useCallback(
    async (
      id: string,
      values: ProductFormValues,
      files: File[],
    ): Promise<ProductAdmin> => {
      setIsSubmitting(true);

      try {
        const product = await productApi.update(id, values, files);
        toast.success('Producto actualizado correctamente');
        return product;
      } catch (err) {
        const message = getApiErrorMessage(
          err,
          'No se pudo actualizar el producto',
        );
        toast.error(message);
        throw err;
      } finally {
        setIsSubmitting(false);
      }
    },
    [],
  );

  return { isSubmitting, createProduct, updateProduct };
}
