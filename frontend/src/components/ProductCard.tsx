import { useCallback, useState, type CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import {
  getProductImageSrc,
  PRODUCT_PLACEHOLDER_IMAGE,
} from '@/helpers/productImage';
import { productViewTransitionName } from '@/helpers/viewTransition';
import { cn } from '@/lib/utils';
import type { ProductPublic } from '@/types/product';

type ProductCardProps = {
  product: ProductPublic;
  staggerIndex?: number;
};

export function ProductCard({ product, staggerIndex = 0 }: ProductCardProps) {
  const [imageSrc, setImageSrc] = useState(() =>
    getProductImageSrc(product.images),
  );
  const [isLoaded, setIsLoaded] = useState(false);

  const handleImageLoad = useCallback(() => {
    setIsLoaded(true);
  }, []);

  const handleImageRef = useCallback(
    (node: HTMLImageElement | null) => {
      if (node?.complete && node.naturalWidth > 0) {
        handleImageLoad();
      }
    },
    [handleImageLoad],
  );

  return (
    <div
      className="catalog-grid-enter h-full"
      style={{ '--stagger': staggerIndex } as CSSProperties}
    >
      <Link
        className="group flex h-full flex-col gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        to={`/products/${product.id}`}
        viewTransition
      >
        <div className="overflow-hidden bg-muted">
          <AspectRatio ratio={1}>
            <img
              alt={`${product.brand} ${product.model}`}
              className={cn(
                'size-full object-contain p-4 transition-[transform,opacity] duration-500 group-hover:scale-[1.03]',
                isLoaded ? 'opacity-100' : 'opacity-0',
              )}
              decoding="async"
              loading="lazy"
              onError={() => {
                if (imageSrc !== PRODUCT_PLACEHOLDER_IMAGE) {
                  setImageSrc(PRODUCT_PLACEHOLDER_IMAGE);
                }
              }}
              onLoad={handleImageLoad}
              ref={handleImageRef}
              src={imageSrc}
              style={{
                viewTransitionName: productViewTransitionName(product.id),
              }}
            />
          </AspectRatio>
        </div>

        <div className="flex flex-col gap-1.5">
          <div className="flex items-baseline justify-between gap-2">
            <p className="truncate text-xs text-muted-foreground">
              {product.brand}
            </p>
            <p className="shrink-0 text-xs text-muted-foreground">
              {product.color}
            </p>
          </div>
          <p className="text-label text-sm font-semibold text-foreground">
            {product.model}
          </p>
        </div>

        <span className="text-label mt-auto inline-flex h-9 w-full items-center justify-center bg-foreground text-[0.65rem] font-medium text-background transition-colors group-hover:bg-foreground/90">
          Ver modelo
        </span>
      </Link>
    </div>
  );
}
