import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { HugeiconsIcon } from '@hugeicons/react';
import AlertCircleIcon from '@hugeicons/core-free-icons/AlertCircleIcon';
import SunglassesIcon from '@hugeicons/core-free-icons/SunglassesIcon';
import { CatalogPageBanner } from '@/components/CatalogPageBanner';
import { CatalogPagination } from '@/components/CatalogPagination';
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

function parsePage(value: string | null): number {
  const page = Number(value ?? '1');
  if (!Number.isInteger(page) || page < 1) {
    return 1;
  }
  return page;
}

export function CatalogPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parsePage(searchParams.get('page'));
  const { data, isLoading, error, refetch } = useProducts(page);

  useEffect(() => {
    if (!data) {
      return;
    }

    if (data.totalPages > 0 && page > data.totalPages) {
      setSearchParams(
        (current) => {
          const next = new URLSearchParams(current);
          if (data.totalPages <= 1) {
            next.delete('page');
          } else {
            next.set('page', String(data.totalPages));
          }
          return next;
        },
        { replace: true },
      );
    }
  }, [data, page, setSearchParams]);

  return (
    <>
      <CatalogPageBanner />

      <section
        aria-labelledby="catalog-grid-heading"
        className="mx-auto flex max-w-7xl scroll-mt-16 flex-col gap-8 px-4 py-8 sm:px-6 sm:py-10"
        id="catalog-grid"
      >
        <h2 className="sr-only" id="catalog-grid-heading">
          Armazones disponibles
        </h2>

        <div className="flex min-h-8 items-center justify-end border-b border-border/60 pb-4">
          {!isLoading && data && data.total > 0 && (
            <p className="text-label text-eyebrow font-medium text-muted-foreground tabular-nums">
              {data.total}{' '}
              {data.total === 1 ? 'producto' : 'productos'}
            </p>
          )}
        </div>

        <div aria-live="polite" className="min-h-80">
          {isLoading && <ProductGridSkeleton />}

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
                  Todavía no hay modelos en la vidriera. Volvé pronto para ver
                  las novedades.
                </EmptyDescription>
              </EmptyHeader>
            </Empty>
          )}

          {!isLoading && data && data.items.length > 0 && (
            <div className="flex flex-col gap-10">
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-5 xl:grid-cols-4 xl:gap-6">
                {data.items.map((product, index) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    staggerIndex={index}
                  />
                ))}
              </div>

              <CatalogPagination
                currentPage={Math.min(page, data.totalPages)}
                totalPages={data.totalPages}
              />
            </div>
          )}
        </div>
      </section>
    </>
  );
}
