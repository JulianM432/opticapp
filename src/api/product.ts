import { apiClient } from './client';
import type { PaginatedProducts, ProductPublic } from '@/types/product';

export const productApi = {
  getProducts: async (
    page: number,
    limit: number,
  ): Promise<PaginatedProducts> => {
    const { data } = await apiClient.get<PaginatedProducts>('/products', {
      params: { page, limit },
    });
    return data;
  },

  getProductById: async (id: string): Promise<ProductPublic> => {
    const { data } = await apiClient.get<ProductPublic>(`/products/${id}`);
    return data;
  },
};
