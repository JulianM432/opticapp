import { Link } from 'react-router-dom';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { CATALOG_BANNER } from '@/constants/hero';

export function CatalogPageBanner() {
  return (
    <div className="flex flex-col">
      <div className="mx-auto w-full max-w-7xl px-4 pt-6 sm:px-6">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link
                  className="inline-flex min-h-11 items-center sm:min-h-0"
                  to="/"
                  viewTransition
                >
                  Inicio
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Catálogo</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <section
        aria-labelledby="catalog-banner-title"
        className="relative mt-4 h-48 overflow-hidden sm:h-56 md:h-64"
      >
        <img
          alt={CATALOG_BANNER.alt}
          className="size-full object-cover"
          decoding="async"
          src={CATALOG_BANNER.src}
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-linear-to-r from-black/50 to-black/20"
        />
        <div className="absolute inset-0 flex items-end">
          <div className="mx-auto w-full max-w-7xl px-4 pb-6 sm:px-6">
            <h1
              className="text-display font-heading text-3xl font-semibold tracking-tight text-balance text-on-media sm:text-4xl"
              id="catalog-banner-title"
            >
              Catálogo
            </h1>
          </div>
        </div>
      </section>
    </div>
  );
}
