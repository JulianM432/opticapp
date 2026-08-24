import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ProductCard } from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
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
  const { data, isLoading } = useProducts(page);

  const totalPages = data?.totalPages ?? 0;
  const canGoPrevious = page > 1 && (totalPages === 0 || page <= totalPages);
  const canGoNext = totalPages > 0 && page < totalPages;

  const goToPage = (nextPage: number) => {
    setSearchParams(nextPage <= 1 ? {} : { page: String(nextPage) });
  };

  useEffect(() => {
    if (!data) {
      return;
    }

    if (data.totalPages > 0 && page > data.totalPages) {
      setSearchParams(
        data.totalPages <= 1 ? {} : { page: String(data.totalPages) },
      );
    }
  }, [data, page, setSearchParams]);

  return (
    <section className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">Catálogo</h1>
        <p className="text-muted-foreground">
          Armazones publicados de la óptica.
        </p>
      </div>

      {isLoading && (
        <p className="text-muted-foreground">Cargando catálogo...</p>
      )}

      {!isLoading && data && data.total === 0 && (
        <p className="text-muted-foreground">No hay armazones publicados.</p>
      )}

      {!isLoading && data && data.items.length > 0 && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {data.items.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {!isLoading && data && data.totalPages > 0 && (
        <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            Página {Math.min(page, data.totalPages)} de {data.totalPages}
          </p>
          <div className="flex gap-2">
            <Button
              disabled={!canGoPrevious}
              onClick={() => goToPage(page - 1)}
              type="button"
              variant="outline"
            >
              Anterior
            </Button>
            <Button
              disabled={!canGoNext}
              onClick={() => goToPage(page + 1)}
              type="button"
              variant="outline"
            >
              Siguiente
            </Button>
          </div>
        </div>
      )}
    </section>
  );
}
