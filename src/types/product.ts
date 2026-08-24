export interface ProductPublic {
  id: string;
  brand: string;
  model: string;
  color: string;
  material: string;
  description?: string;
  images: string[];
}

export interface PaginatedProducts {
  items: ProductPublic[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
