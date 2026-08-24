import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  getProductImageSrc,
  PRODUCT_PLACEHOLDER_IMAGE,
} from '@/helpers/productImage';
import type { ProductPublic } from '@/types/product';

type ProductCardProps = {
  product: ProductPublic;
};

export function ProductCard({ product }: ProductCardProps) {
  const [imageSrc, setImageSrc] = useState(() =>
    getProductImageSrc(product.images),
  );

  return (
    <Link
      className="group block overflow-hidden rounded-lg border bg-card shadow-sm transition-colors hover:border-primary/40"
      to={`/products/${product.id}`}
    >
      <article>
        <div className="aspect-square overflow-hidden bg-muted">
          <img
            alt={`${product.brand} ${product.model}`}
            className="h-full w-full object-cover transition-transform group-hover:scale-[1.02]"
            onError={() => {
              if (imageSrc !== PRODUCT_PLACEHOLDER_IMAGE) {
                setImageSrc(PRODUCT_PLACEHOLDER_IMAGE);
              }
            }}
            src={imageSrc}
          />
        </div>
        <div className="space-y-1 p-4">
          <h2 className="font-medium tracking-tight">{product.brand}</h2>
          <p className="text-sm text-muted-foreground">{product.model}</p>
          <p className="text-sm text-muted-foreground">{product.color}</p>
        </div>
      </article>
    </Link>
  );
}
