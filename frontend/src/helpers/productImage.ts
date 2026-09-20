export const PRODUCT_PLACEHOLDER_IMAGE = '/images/not-found.png';

export function resolveProductImageUrl(url: string): string {
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }

  const apiUrl = import.meta.env.VITE_API_URL ?? 'http://localhost:5000';
  const base = apiUrl.replace(/\/$/, '');
  const path = url.startsWith('/') ? url : `/${url}`;
  return `${base}${path}`;
}

export function getProductImageSrc(images: string[]): string {
  const first = images[0];
  if (!first) {
    return PRODUCT_PLACEHOLDER_IMAGE;
  }

  return resolveProductImageUrl(first);
}
