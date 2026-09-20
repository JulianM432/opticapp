import { apiClient } from './client';
import type {
  PaginatedProducts,
  ProductAdmin,
  ProductFormValues,
  ProductPublic,
} from '@/types/product';

function buildProductFormData(
  values: ProductFormValues,
  files: File[],
): FormData {
  const formData = new FormData();
  formData.append('brand', values.brand);
  formData.append('model', values.model);
  formData.append('color', values.color);
  formData.append('material', values.material);
  formData.append('description', values.description);
  formData.append('isPublished', String(values.isPublished));

  for (const file of files) {
    formData.append('images', file);
  }

  return formData;
}

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

  getAdminProducts: async (): Promise<ProductAdmin[]> => {
    const { data } = await apiClient.get<ProductAdmin[]>('/admin/products');
    return data;
  },

  create: async (
    values: ProductFormValues,
    files: File[],
  ): Promise<ProductAdmin> => {
    const formData = buildProductFormData(values, files);
    const { data } = await apiClient.post<ProductAdmin>('/products', formData);
    return data;
  },

  update: async (
    id: string,
    values: ProductFormValues,
    files: File[],
  ): Promise<ProductAdmin> => {
    const formData = buildProductFormData(values, files);
    const { data } = await apiClient.put<ProductAdmin>(
      `/products/${id}`,
      formData,
    );
    return data;
  },

  softDelete: async (id: string): Promise<{ message: string }> => {
    const { data } = await apiClient.delete<{ message: string }>(
      `/products/${id}`,
    );
    return data;
  },
};
