import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { HugeiconsIcon } from '@hugeicons/react';
import AlertCircleIcon from '@hugeicons/core-free-icons/AlertCircleIcon';
import ArrowLeft01Icon from '@hugeicons/core-free-icons/ArrowLeft01Icon';
import SunglassesIcon from '@hugeicons/core-free-icons/SunglassesIcon';
import { ProductDetailSkeleton } from '@/components/ProductDetailSkeleton';
import { ProductGallery } from '@/components/ProductGallery';
import { Badge } from '@/components/ui/badge';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { getMaterialLabel } from '@/constants/materials';
import { STORE_INFO } from '@/constants/store';
import { useProduct } from '@/hooks/useProduct';

// Breadcrumb links get a 44px touch target on mobile; desktop keeps the compact row.
const BREADCRUMB_LINK_CLASSES = 'inline-flex min-h-11 items-center sm:min-h-0';

function useProductDocumentTitle(brand?: string, model?: string) {
  useEffect(() => {
    if (!brand || !model) {
      return;
    }

    const previousTitle = document.title;
    document.title = `${brand} ${model} — ${STORE_INFO.name}`;

    return () => {
      document.title = previousTitle;
    };
  }, [brand, model]);
}

export function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { product, isLoading, isNotFound, error, refetch } = useProduct(id);

  useProductDocumentTitle(product?.brand, product?.model);

  return (
    <section className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-8 sm:px-6 sm:py-10">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild className={BREADCRUMB_LINK_CLASSES}>
              <Link to="/" viewTransition>
                Inicio
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild className={BREADCRUMB_LINK_CLASSES}>
              <Link to="/catalogo" viewTransition>
                Catálogo
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            {isLoading ? (
              <Skeleton aria-hidden className="h-3 w-28" />
            ) : product ? (
              <BreadcrumbPage>
                {product.brand} {product.model}
              </BreadcrumbPage>
            ) : (
              <BreadcrumbPage>Detalle</BreadcrumbPage>
            )}
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div aria-live="polite">
        {isLoading && <ProductDetailSkeleton />}

        {!isLoading && isNotFound && (
          <Empty className="border border-dashed border-border/80 py-16">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <HugeiconsIcon icon={SunglassesIcon} strokeWidth={2} />
              </EmptyMedia>
              <EmptyTitle>No encontramos este armazón</EmptyTitle>
              <EmptyDescription>
                El producto no existe o ya no está publicado.
              </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <Button asChild className="max-sm:h-11" variant="outline">
                <Link to="/catalogo" viewTransition>
                  <HugeiconsIcon
                    icon={ArrowLeft01Icon}
                    strokeWidth={2}
                    data-icon="inline-start"
                  />
                  Volver al catálogo
                </Link>
              </Button>
            </EmptyContent>
          </Empty>
        )}

        {!isLoading && !product && !isNotFound && error && (
          <Alert variant="destructive">
            <HugeiconsIcon icon={AlertCircleIcon} strokeWidth={2} />
            <AlertTitle>Error al cargar el armazón</AlertTitle>
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

        {!isLoading && product && (
          <article className="grid gap-8 lg:grid-cols-2 lg:gap-12">
            <ProductGallery
              alt={`${product.brand} ${product.model}`}
              key={product.id}
              images={product.images}
              productId={product.id}
            />

            <div className="flex flex-col gap-6">
              <header className="flex flex-col gap-2">
                <p className="text-label text-eyebrow font-medium text-foreground">
                  {product.brand}
                </p>
                <h1 className="text-display font-heading text-3xl font-semibold tracking-tight text-balance wrap-anywhere sm:text-4xl">
                  {product.model}
                </h1>
              </header>

              <Separator />

              <dl className="flex flex-col gap-4 text-sm">
                <div className="flex items-center justify-between gap-4">
                  <dt className="text-muted-foreground">Color</dt>
                  <dd className="font-medium">{product.color}</dd>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <dt className="text-muted-foreground">Material</dt>
                  <dd>
                    <Badge variant="secondary">
                      {getMaterialLabel(product.material)}
                    </Badge>
                  </dd>
                </div>
              </dl>

              {product.description && (
                <>
                  <Separator />
                  <div className="flex flex-col gap-2">
                    <h2 className="text-label text-eyebrow font-medium text-muted-foreground">
                      Descripción
                    </h2>
                    <p className="max-w-prose text-sm/relaxed text-muted-foreground">
                      {product.description}
                    </p>
                  </div>
                </>
              )}

              <Separator />

              <p className="text-sm/relaxed text-muted-foreground">
                Consultá precio y disponibilidad, y vení a probártelo a la
                óptica.
              </p>

              {/*
                Mobile: sticky bottom bar. It is a direct child of this column so
                it sticks while the product is on screen, stays in the flow (no
                content hidden behind it) and never covers the footer.
                sm+: a regular button right under its supporting line.
              */}
              <div className="sticky bottom-0 -mx-4 -mt-3 border-t border-border/60 bg-background px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:static sm:mx-0 sm:border-0 sm:bg-transparent sm:p-0">
                <WhatsAppButton
                  brand={product.brand}
                  className="w-full sm:w-auto"
                  color={product.color}
                  model={product.model}
                />
              </div>
            </div>
          </article>
        )}
      </div>
    </section>
  );
}
