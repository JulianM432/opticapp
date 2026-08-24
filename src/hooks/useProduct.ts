import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { getApiErrorMessage, getApiErrorStatus } from '@/api/client';
import { productApi } from '@/api/product';
import type { ProductPublic } from '@/types/product';

export function useProduct(id: string | undefined) {
  const [product, setProduct] = useState<ProductPublic | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isNotFound, setIsNotFound] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
        const result = await productApi.getProductById(id);
        if (!cancelled) {
          setProduct(result);
        }
      } catch (err) {
        const message = getApiErrorMessage(err);
        if (!cancelled) {
          setProduct(null);
          setIsNotFound(getApiErrorStatus(err) === 404);
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
  }, [id]);

  return { product, isLoading, isNotFound, error };
}
