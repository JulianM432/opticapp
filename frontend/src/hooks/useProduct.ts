import { useCallback, useEffect, useState } from 'react';
import { getApiErrorMessage, getApiErrorStatus } from '@/api/client';
import { productApi } from '@/api/product';
import { getCachedProduct, setCachedProduct } from '@/helpers/productCache';
import type { ProductPublic } from '@/types/product';

export function useProduct(id: string | undefined) {
  const [product, setProduct] = useState<ProductPublic | null>(() =>
    id ? (getCachedProduct(id) ?? null) : null,
  );
  const [isLoading, setIsLoading] = useState(
    () => !id || !getCachedProduct(id),
  );
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
      // A product seen in the catalog renders right away and refreshes in the background.
      const cached = getCachedProduct(id);
      setError(null);
      setIsNotFound(false);

      if (cached) {
        setProduct(cached);
        setIsLoading(false);
      } else {
        setIsLoading(true);
      }

      try {
        const result = await productApi.getProductById(id);
        setCachedProduct(result);
        if (!cancelled) {
          setProduct(result);
        }
      } catch (err) {
        const message = getApiErrorMessage(err);
        const notFound = getApiErrorStatus(err) === 404;
        // Keep showing the cached product on a transient failure; a 404 means it was unpublished.
        if (!cancelled && (!cached || notFound)) {
          setProduct(null);
          setIsNotFound(notFound);
          setError(message);
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
