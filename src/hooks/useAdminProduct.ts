import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { getApiErrorMessage } from '@/api/client';
import { productApi } from '@/api/product';
import type { ProductAdmin } from '@/types/product';

export function useAdminProduct(id: string | undefined) {
  const [product, setProduct] = useState<ProductAdmin | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isNotFound, setIsNotFound] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [refetchKey, setRefetchKey] = useState(0);

  const refetch = useCallback(() => {
    setRefetchKey((current) => current + 1);
  }, []);

  useEffect(() => {
    if (!id) {
      setProduct(null);
      setIsNotFound(true);
      setIsLoading(false);
      setError(null);
      return;
    }

    let cancelled = false;

    const load = async () => {
      setIsLoading(true);
      setError(null);
      setIsNotFound(false);

      try {
        const products = await productApi.getAdminProducts();
        const found = products.find((item) => item.id === id);

        if (!cancelled) {
          if (found) {
            setProduct(found);
          } else {
            setProduct(null);
            setIsNotFound(true);
          }
        }
      } catch (err) {
        const message = getApiErrorMessage(
          err,
          'No se pudo cargar el producto',
        );
        if (!cancelled) {
          setProduct(null);
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
  }, [id, refetchKey]);

  return { product, isLoading, isNotFound, error, refetch };
}
