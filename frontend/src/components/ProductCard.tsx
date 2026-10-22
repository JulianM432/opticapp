import { useCallback, useState, type CSSProperties } from 'react';
import { Link, useViewTransitionState } from 'react-router-dom';
import { HugeiconsIcon } from '@hugeicons/react';
import ArrowRight01Icon from '@hugeicons/core-free-icons/ArrowRight01Icon';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
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
  /** Off when the grid was already on screen (back navigation, cached page). */
  animateEntrance?: boolean;
};

export function ProductCard({
  product,
  staggerIndex = 0,
  animateEntrance = true,
}: ProductCardProps) {
  const href = `/products/${product.id}`;
  // Only the card being opened (or returned to) shares its image with the detail page.
  const isTransitioning = useViewTransitionState(href);
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
      className={cn('h-full', animateEntrance && 'catalog-grid-enter')}
      style={{ '--stagger': staggerIndex } as CSSProperties}
    >
      <Link
        className="group block h-full rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        to={href}
        viewTransition
      >
        <Card className="h-full gap-3 pt-0 transition-shadow group-hover:shadow-md">
          <div className="overflow-hidden bg-muted">
            <AspectRatio ratio={1}>
              <img
                alt=""
                className={cn(
                  'size-full object-contain p-4 transition-[transform,opacity] duration-250 ease-out group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100',
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
                  viewTransitionName: isTransitioning
                    ? productViewTransitionName(product.id)
                    : 'none',
                }}
              />
            </AspectRatio>
          </div>

          <CardHeader className="gap-1">
            <CardDescription className="flex min-w-0 items-baseline justify-between gap-3">
              <span className="max-w-[65%] shrink-0 truncate">
                {product.brand}
              </span>
              <span className="min-w-0 flex-1 truncate text-right">
                {product.color}
              </span>
            </CardDescription>
            <CardTitle className="line-clamp-2 text-foreground">
              {product.model}
            </CardTitle>
          </CardHeader>

          <CardFooter className="mt-auto">
            <span className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground transition-colors group-hover:text-foreground group-focus-visible:text-foreground">
              Ver modelo
              <HugeiconsIcon
                aria-hidden="true"
                className="size-3.5 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none"
                icon={ArrowRight01Icon}
                strokeWidth={2}
              />
            </span>
          </CardFooter>
        </Card>
      </Link>
    </div>
  );
}
