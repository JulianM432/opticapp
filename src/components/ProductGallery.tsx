import { useCallback, useEffect, useState } from 'react';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { cn } from '@/lib/utils';
import {
  PRODUCT_PLACEHOLDER_IMAGE,
  resolveProductImageUrl,
} from '@/helpers/productImage';
import { productViewTransitionName } from '@/helpers/viewTransition';

type ProductGalleryProps = {
  alt: string;
  images: string[];
  productId: string;
};

export function ProductGallery({
  alt,
  images,
  productId,
}: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [failedImages, setFailedImages] = useState<Record<number, boolean>>({});
  const [isLoaded, setIsLoaded] = useState(false);

  const galleryImages =
    images.length > 0 ? images : [PRODUCT_PLACEHOLDER_IMAGE];

  useEffect(() => {
    setActiveIndex(0);
    setFailedImages({});
    setIsLoaded(false);
  }, [images, productId]);

  const getImageSrc = useCallback(
    (image: string, index: number) => {
      if (image === PRODUCT_PLACEHOLDER_IMAGE || failedImages[index]) {
        return PRODUCT_PLACEHOLDER_IMAGE;
      }

      return resolveProductImageUrl(image);
    },
    [failedImages],
  );

  const markImageFailed = (index: number) => {
    setFailedImages((current) =>
      current[index] ? current : { ...current, [index]: true },
    );
  };

  const activeSrc = getImageSrc(galleryImages[activeIndex], activeIndex);

  return (
    <div className="flex flex-col gap-3">
      <div className="specimen-field overflow-hidden rounded-xl ring-1 ring-foreground/10">
        <AspectRatio ratio={1}>
          <img
            alt={alt}
            className={cn(
              'size-full object-cover transition-opacity duration-300',
              isLoaded ? 'opacity-100' : 'opacity-0',
            )}
            decoding="async"
            key={activeSrc}
            onError={() => markImageFailed(activeIndex)}
            onLoad={() => setIsLoaded(true)}
            src={activeSrc}
            style={{
              viewTransitionName: productViewTransitionName(productId),
            }}
          />
        </AspectRatio>
      </div>

      {galleryImages.length > 1 && (
        <div
          aria-label="Miniaturas del producto"
          className="flex gap-2 overflow-x-auto pb-1"
          role="list"
        >
          {galleryImages.map((image, index) => {
            const thumbSrc = getImageSrc(image, index);
            const isActive = index === activeIndex;

            return (
              <button
                aria-current={isActive ? 'true' : undefined}
                aria-label={`Ver imagen ${index + 1}`}
                className={cn(
                  'specimen-field size-16 shrink-0 overflow-hidden rounded-md ring-1 transition-[ring-color,opacity] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                  isActive
                    ? 'ring-primary opacity-100'
                    : 'ring-foreground/10 opacity-70 hover:opacity-100',
                )}
                key={`${image}-${index}`}
                onClick={() => {
                  setActiveIndex(index);
                  setIsLoaded(false);
                }}
                role="listitem"
                type="button"
              >
                <img
                  alt=""
                  className="size-full object-cover"
                  onError={() => markImageFailed(index)}
                  src={thumbSrc}
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
