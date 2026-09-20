import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { getApiErrorMessage } from '@/api/client';
import { productApi } from '@/api/product';
import type { PaginatedProducts } from '@/types/product';

const DEFAULT_LIMIT = 12;

export function useProducts(page: number, limit = DEFAULT_LIMIT) {
  const [data, setData] = useState<PaginatedProducts | null>(null);
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
        const result = await productApi.getProducts(page, limit);
        if (!cancelled) {
          setData(result);
        }
      } catch (err) {
        const message = getApiErrorMessage(err);
        if (!cancelled) {
          setData(null);
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
  }, [page, limit, refetchKey]);

  return { data, isLoading, error, refetch };
}
