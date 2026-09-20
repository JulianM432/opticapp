import { Link, useParams } from 'react-router-dom';
import { HugeiconsIcon } from '@hugeicons/react';
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
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { getMaterialLabel } from '@/constants/materials';
import { useProduct } from '@/hooks/useProduct';

export function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { product, isLoading, isNotFound, error, refetch } = useProduct(id);

  return (
    <section className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-8 sm:px-6 sm:py-10">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/" viewTransition>
                Inicio
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/catalogo" viewTransition>
                Catálogo
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            {product ? (
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
              <Button asChild variant="outline">
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
              images={product.images}
              productId={product.id}
            />

            <div className="flex flex-col gap-6">
              <header className="flex flex-col gap-2">
                <p className="text-label text-[0.65rem] font-medium text-primary">
                  {product.brand}
                </p>
                <h1 className="text-display font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
                  {product.model}
                </h1>
                <p className="text-base text-muted-foreground">
                  {product.color}
                </p>
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
                    <h2 className="text-label text-[0.65rem] font-medium text-muted-foreground">
                      Descripción
                    </h2>
                    <p className="max-w-prose text-sm/relaxed text-muted-foreground">
                      {product.description}
                    </p>
                  </div>
                </>
              )}

              <Separator />

              <p className="text-xs text-muted-foreground">
                Consultá disponibilidad y probátelo en la óptica.
              </p>
            </div>
          </article>
        )}
      </div>
    </section>
  );
}
