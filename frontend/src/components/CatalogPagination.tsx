import type { MouseEvent, ReactNode } from 'react';
import {
  useHref,
  useLinkClickHandler,
  useSearchParams,
  type To,
} from 'react-router-dom';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { getPageSearch, getPaginationItems } from '@/helpers/pagination';
import { cn } from '@/lib/utils';

type CatalogPaginationProps = {
  currentPage: number;
  totalPages: number;
};

type PageLinkKind = 'page' | 'previous' | 'next';

type CatalogPageLinkProps = {
  kind: PageLinkKind;
  to: To | null;
  isActive?: boolean;
  children?: ReactNode;
};

const LINK_LABELS: Record<Exclude<PageLinkKind, 'page'>, string> = {
  previous: 'Ir a la página anterior',
  next: 'Ir a la página siguiente',
};

function scrollToGrid() {
  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)',
  ).matches;

  document.getElementById('catalog-grid')?.scrollIntoView({
    behavior: prefersReducedMotion ? 'auto' : 'smooth',
    block: 'start',
  });
}

function CatalogPageLink({
  kind,
  to,
  isActive,
  children,
}: CatalogPageLinkProps) {
  const href = useHref(to ?? {});
  const handleLinkClick = useLinkClickHandler(to ?? {});
  const isDisabled = to === null;

  const linkProps = isDisabled
    ? {
        'aria-disabled': true,
        role: 'link',
      }
    : {
        href,
        onClick: (event: MouseEvent<HTMLAnchorElement>) => {
          if (isActive) {
            event.preventDefault();
            return;
          }

          handleLinkClick(event);
          if (event.defaultPrevented) {
            scrollToGrid();
          }
        },
      };

  if (kind === 'page') {
    return (
      <PaginationLink
        className="size-11 sm:size-8"
        isActive={isActive}
        {...linkProps}
      >
        {children}
      </PaginationLink>
    );
  }

  const Component = kind === 'previous' ? PaginationPrevious : PaginationNext;

  return (
    <Component
      aria-label={LINK_LABELS[kind]}
      className={cn(
        'h-11 min-w-11 sm:h-8 sm:min-w-0',
        isDisabled && 'pointer-events-none opacity-50',
      )}
      text={kind === 'previous' ? 'Anterior' : 'Siguiente'}
      {...linkProps}
    />
  );
}

export function CatalogPagination({
  currentPage,
  totalPages,
}: CatalogPaginationProps) {
  const [searchParams] = useSearchParams();
  const pageItems = getPaginationItems(currentPage, totalPages);

  if (totalPages <= 1) {
    return null;
  }

  const toPage = (page: number): To | null =>
    page < 1 || page > totalPages
      ? null
      : { search: getPageSearch(searchParams, page) };

  const pageStatus = `Página ${currentPage} de ${totalPages}`;

  return (
    <Pagination
      aria-label="Páginas del catálogo"
      className="items-center sm:justify-between"
    >
      <p className="hidden text-sm text-muted-foreground sm:block">
        {pageStatus}
      </p>

      <PaginationContent className="w-full justify-between sm:w-auto sm:justify-end">
        <PaginationItem>
          <CatalogPageLink kind="previous" to={toPage(currentPage - 1)} />
        </PaginationItem>

        <PaginationItem className="text-sm text-muted-foreground sm:hidden">
          {pageStatus}
        </PaginationItem>

        {pageItems.map((item, index) =>
          item === 'ellipsis' ? (
            <PaginationItem
              className="hidden sm:block"
              key={`ellipsis-${index}`}
            >
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem className="hidden sm:block" key={item}>
              <CatalogPageLink
                isActive={item === currentPage}
                kind="page"
                to={toPage(item)}
              >
                {item}
              </CatalogPageLink>
            </PaginationItem>
          ),
        )}

        <PaginationItem>
          <CatalogPageLink kind="next" to={toPage(currentPage + 1)} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
