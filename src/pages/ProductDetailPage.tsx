import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { getMaterialLabel } from '@/constants/materials';
import {
  PRODUCT_PLACEHOLDER_IMAGE,
  resolveProductImageUrl,
} from '@/helpers/productImage';
import { useProduct } from '@/hooks/useProduct';

export function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { product, isLoading, isNotFound, error } = useProduct(id);
  const [failedImages, setFailedImages] = useState<Record<number, boolean>>({});

  useEffect(() => {
    setFailedImages({});
  }, [id]);

  const markImageFailed = (index: number) => {
    setFailedImages((current) =>
      current[index] ? current : { ...current, [index]: true },
    );
  };

  return (
    <section className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8">
      <div>
        <Button asChild variant="ghost">
          <Link to="/">Volver al catálogo</Link>
        </Button>
      </div>

      {isLoading && (
        <p className="text-muted-foreground">Cargando armazón...</p>
      )}

      {!isLoading && isNotFound && (
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight">
            No encontramos este armazón
          </h1>
          <p className="text-muted-foreground">
            El producto no existe o ya no está publicado.
          </p>
        </div>
      )}

      {!isLoading && !product && !isNotFound && error && (
        <p className="text-muted-foreground">{error}</p>
      )}

      {!isLoading && product && (
        <article className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-3">
            {product.images.length === 0 && (
              <img
                alt={`${product.brand} ${product.model}`}
                className="w-full rounded-lg border bg-muted object-cover"
                src={PRODUCT_PLACEHOLDER_IMAGE}
              />
            )}

            {product.images.map((image, index) => {
              const src = failedImages[index]
                ? PRODUCT_PLACEHOLDER_IMAGE
                : resolveProductImageUrl(image);

              return (
                <img
                  alt={`${product.brand} ${product.model}`}
                  className="w-full rounded-lg border bg-muted object-cover"
                  key={`${image}-${index}`}
                  onError={() => markImageFailed(index)}
                  src={src}
                />
              );
            })}
          </div>

          <div className="space-y-4">
            <div className="space-y-1">
              <h1 className="text-3xl font-semibold tracking-tight">
                {product.brand}
              </h1>
              <p className="text-lg text-muted-foreground">{product.model}</p>
            </div>

            <dl className="grid gap-3 text-sm">
              <div className="flex justify-between gap-4 border-b py-2">
                <dt className="text-muted-foreground">Color</dt>
                <dd className="font-medium">{product.color}</dd>
              </div>
              <div className="flex justify-between gap-4 border-b py-2">
                <dt className="text-muted-foreground">Material</dt>
                <dd className="font-medium">
                  {getMaterialLabel(product.material)}
                </dd>
              </div>
            </dl>

            {product.description && (
              <p className="text-muted-foreground">{product.description}</p>
            )}
          </div>
        </article>
      )}
    </section>
  );
}
