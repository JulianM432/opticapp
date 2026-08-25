import { Link } from 'react-router-dom';
import { HugeiconsIcon } from '@hugeicons/react';
import { AlertCircleIcon, SunglassesIcon } from '@hugeicons/core-free-icons';
import { ProductCard } from '@/components/ProductCard';
import { ProductGridSkeleton } from '@/components/ProductGridSkeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty';
import { useProducts } from '@/hooks/useProducts';

export function CatalogPreview() {
  const { data, isLoading, error, refetch } = useProducts(1, 4);

  return (
    <section
      aria-labelledby="catalog-preview-heading"
      className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-12 sm:px-6 sm:py-16"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <h2
          className="text-display font-heading text-2xl font-semibold tracking-tight sm:text-3xl"
          id="catalog-preview-heading"
        >
          Nuestro catálogo
        </h2>
        <Button asChild className="w-fit" variant="outline">
          <Link to="/catalogo" viewTransition>
            Ver todos
          </Link>
        </Button>
      </div>

      <div aria-live="polite" className="min-h-64">
        {isLoading && <ProductGridSkeleton count={4} />}

        {!isLoading && error && (
          <Alert variant="destructive">
            <HugeiconsIcon icon={AlertCircleIcon} strokeWidth={2} />
            <AlertTitle>No pudimos cargar el catálogo</AlertTitle>
            <AlertDescription className="flex flex-col gap-3">
              <span>{error}</span>
              <Button
                className="w-fit"
                onClick={refetch}
                size="sm"
                type="button"
                variant="outline"
              >
                Reintentar
              </Button>
            </AlertDescription>
          </Alert>
        )}

        {!isLoading && data && data.total === 0 && (
          <Empty className="border border-dashed border-border/80 py-16">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <HugeiconsIcon icon={SunglassesIcon} strokeWidth={2} />
              </EmptyMedia>
              <EmptyTitle>Sin armazones publicados</EmptyTitle>
              <EmptyDescription>
                Todavía no hay modelos en la vidriera. Volvé pronto para ver las
                novedades.
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        )}

        {!isLoading && data && data.items.length > 0 && (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-5 xl:grid-cols-4 xl:gap-6">
            {data.items.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                staggerIndex={index}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
