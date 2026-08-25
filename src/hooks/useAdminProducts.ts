import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { getApiErrorMessage } from '@/api/client';
import { productApi } from '@/api/product';
import type { ProductAdmin } from '@/types/product';

export function useAdminProducts() {
  const [products, setProducts] = useState<ProductAdmin[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refetchKey, setRefetchKey] = useState(0);

  const refetch = useCallback(() => {
    setRefetchKey((current) => current + 1);
  }, []);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const result = await productApi.getAdminProducts();
        if (!cancelled) {
          setProducts(result);
        }
      } catch (err) {
        const message = getApiErrorMessage(
          err,
          'No se pudieron cargar los productos',
        );
        if (!cancelled) {
          setProducts([]);
          setError(message);
          toast.error(message);
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    void load();

    return () => {
      cancelled = true;
    };
  }, [refetchKey]);

  const deleteProduct = useCallback(
    async (id: string) => {
      try {
        const result = await productApi.softDelete(id);
        toast.success(result.message);
        refetch();
      } catch (err) {
        const message = getApiErrorMessage(
          err,
          'No se pudo eliminar el producto',
        );
        toast.error(message);
        throw err;
      }
    },
    [refetch],
  );

  return { products, isLoading, error, refetch, deleteProduct };
}
