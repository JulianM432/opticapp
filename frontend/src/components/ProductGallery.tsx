import { useCallback, useState } from 'react';
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
  // State resets per product through the parent's `key`, not an effect: an effect
  // keyed on `images` also fires on background refreshes and would hide an image
  // that already loaded (same src, so onLoad never fires again).
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [failedImages, setFailedImages] = useState<Record<number, boolean>>({});
  const [isLoaded, setIsLoaded] = useState(false);

  const galleryImages =
    images.length > 0 ? images : [PRODUCT_PLACEHOLDER_IMAGE];
  // A background refresh can return fewer images than the thumbnail picked.
  const activeIndex = Math.min(selectedIndex, galleryImages.length - 1);

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

  const handleMainImageLoad = useCallback(() => {
    setIsLoaded(true);
  }, []);

  const handleMainImageRef = useCallback(
    (node: HTMLImageElement | null) => {
      if (node?.complete && node.naturalWidth > 0) {
        handleMainImageLoad();
      }
    },
    [handleMainImageLoad],
  );

  return (
    <div className="flex flex-col gap-3">
      <div className="specimen-field overflow-hidden rounded-xl ring-1 ring-foreground/10">
        <AspectRatio ratio={1}>
          <img
            alt={alt}
            className={cn(
              'size-full object-cover transition-opacity duration-300 ease-out',
              isLoaded ? 'opacity-100' : 'opacity-0',
            )}
            decoding="async"
            onError={() => markImageFailed(activeIndex)}
            onLoad={handleMainImageLoad}
            ref={handleMainImageRef}
            src={activeSrc}
            style={{
              viewTransitionName: productViewTransitionName(productId),
            }}
          />
        </AspectRatio>
      </div>

      {galleryImages.length > 1 && (
        <ul
          aria-label="Miniaturas del producto"
          className="flex gap-2 overflow-x-auto pb-1"
        >
          {galleryImages.map((image, index) => {
            const thumbSrc = getImageSrc(image, index);
            const isActive = index === activeIndex;

            return (
              <li className="shrink-0" key={`${image}-${index}`}>
                <button
                  aria-current={isActive ? 'true' : undefined}
                  aria-label={`Ver imagen ${index + 1}`}
                  className={cn(
                    'specimen-field size-16 shrink-0 overflow-hidden rounded-md ring-1 transition-[ring-color,opacity] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                    isActive
                      ? 'ring-primary opacity-100'
                      : 'ring-foreground/10 opacity-70 hover:opacity-100',
                  )}
                  // Same <img>, new src: the current image stays up until the next one loads, no blank flash.
                  onClick={() => setSelectedIndex(index)}
                  type="button"
                >
                  <img
                    alt=""
                    className="size-full object-cover"
                    onError={() => markImageFailed(index)}
                    src={thumbSrc}
                  />
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
