import type { PaginatedProducts, ProductPublic } from '@/types/product';

// In-memory, per-tab cache. It lets a revisited page and a product opened
// from a card render on the first frame, which is what the view transition
// needs to morph the image instead of falling back to a crossfade.
const pages = new Map<string, PaginatedProducts>();
const products = new Map<string, ProductPublic>();

function pageKey(page: number, limit: number): string {
  return `${page}:${limit}`;
}

export function getCachedPage(
  page: number,
  limit: number,
): PaginatedProducts | undefined {
  return pages.get(pageKey(page, limit));
}

export function setCachedPage(
  page: number,
  limit: number,
  data: PaginatedProducts,
): void {
  pages.set(pageKey(page, limit), data);
  for (const product of data.items) {
    products.set(product.id, product);
  }
}

export function getCachedProduct(id: string): ProductPublic | undefined {
  return products.get(id);
}

export function setCachedProduct(product: ProductPublic): void {
  products.set(product.id, product);
}
