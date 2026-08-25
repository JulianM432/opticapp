import { useState, type CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { getMaterialLabel } from '@/constants/materials';
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

  return (
    <div
      className="catalog-grid-enter h-full"
      style={{ '--stagger': staggerIndex } as CSSProperties}
    >
      <Link
        className="group block h-full rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        to={`/products/${product.id}`}
        viewTransition
      >
        <Card className="h-full overflow-hidden py-0 transition-[box-shadow,transform] duration-300 group-hover:-translate-y-0.5 group-hover:shadow-md group-hover:ring-primary/25">
          <div className="specimen-field relative overflow-hidden">
            <AspectRatio ratio={1}>
              <img
                alt={`${product.brand} ${product.model}`}
                className={cn(
                  'size-full object-cover transition-[transform,opacity] duration-500 group-hover:scale-[1.04]',
                  isLoaded ? 'opacity-100' : 'opacity-0',
                )}
                decoding="async"
                loading="lazy"
                onError={() => {
                  if (imageSrc !== PRODUCT_PLACEHOLDER_IMAGE) {
                    setImageSrc(PRODUCT_PLACEHOLDER_IMAGE);
                  }
                }}
                onLoad={() => setIsLoaded(true)}
                src={imageSrc}
                style={{
                  viewTransitionName: productViewTransitionName(product.id),
                }}
              />
            </AspectRatio>
          </div>

          <CardHeader className="gap-1 pb-0">
            <p className="text-label text-[0.6rem] font-medium text-muted-foreground">
              {product.brand}
            </p>
            <CardTitle className="text-display text-base font-semibold tracking-tight">
              {product.model}
            </CardTitle>
          </CardHeader>

          <CardContent className="pt-0">
            <p className="text-xs text-muted-foreground">{product.color}</p>
          </CardContent>

          <CardFooter className="pt-0 pb-4">
            <Badge variant="secondary">
              {getMaterialLabel(product.material)}
            </Badge>
          </CardFooter>
        </Card>
      </Link>
    </div>
  );
}
