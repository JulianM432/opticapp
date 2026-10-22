import { useCallback, useEffect, useState } from 'react';
import { getApiErrorMessage } from '@/api/client';
import { productApi } from '@/api/product';
import { getCachedPage, setCachedPage } from '@/helpers/productCache';
import type { PaginatedProducts } from '@/types/product';

const DEFAULT_LIMIT = 12;

export function useProducts(page: number, limit = DEFAULT_LIMIT) {
  const [data, setData] = useState<PaginatedProducts | null>(
    () => getCachedPage(page, limit) ?? null,
  );
  const [isLoading, setIsLoading] = useState(() => !getCachedPage(page, limit));
  // True when the current data was already on hand, so the grid skips its entrance.
  const [isFromCache, setIsFromCache] = useState(() =>
    Boolean(getCachedPage(page, limit)),
  );
  const [error, setError] = useState<string | null>(null);
  const [refetchKey, setRefetchKey] = useState(0);

  const refetch = useCallback(() => {
    setRefetchKey((current) => current + 1);
  }, []);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      const cached = getCachedPage(page, limit);
      setError(null);
      setIsFromCache(Boolean(cached));

      // Cached pages render right away and refresh in the background.
      if (cached) {
        setData(cached);
        setIsLoading(false);
      } else {
        setIsLoading(true);
      }

      try {
        const result = await productApi.getProducts(page, limit);
        setCachedPage(page, limit, result);
        if (!cancelled) {
          setData(result);
        }
      } catch (err) {
        const message = getApiErrorMessage(err);
        if (!cancelled && !cached) {
          setData(null);
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
  }, [page, limit, refetchKey]);

  return { data, isLoading, isFromCache, error, refetch };
}
