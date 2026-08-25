export interface ProductPublic {
  id: string;
  brand: string;
  model: string;
  color: string;
  material: string;
  description?: string;
  images: string[];
}

export interface ProductAdmin {
  id: string;
  brand: string;
  model: string;
  color: string;
  material: string;
  description?: string;
  images: string[];
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedProducts {
  items: ProductPublic[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ProductFormValues {
  brand: string;
  model: string;
  color: string;
  material: string;
  description: string;
  isPublished: boolean;
}
