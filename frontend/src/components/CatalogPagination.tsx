import { useCallback } from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { getPaginationItems } from '@/helpers/pagination';

type CatalogPaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export function CatalogPagination({
  currentPage,
  totalPages,
  onPageChange,
}: CatalogPaginationProps) {
  const pageItems = getPaginationItems(currentPage, totalPages);

  const goToPage = useCallback(
    (page: number) => {
      if (page < 1 || page > totalPages || page === currentPage) {
        return;
      }

      onPageChange(page);
      document.getElementById('catalog-grid')?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    },
    [currentPage, onPageChange, totalPages],
  );

  if (totalPages <= 1) {
    return null;
  }

  return (
    <Pagination className="justify-center sm:justify-between">
      <p className="hidden text-sm text-muted-foreground sm:block">
        Página {currentPage} de {totalPages}
      </p>

      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            aria-disabled={currentPage <= 1}
            className={
              currentPage <= 1 ? 'pointer-events-none opacity-50' : undefined
            }
            href="#"
            onClick={(event) => {
              event.preventDefault();
              goToPage(currentPage - 1);
            }}
            text="Anterior"
          />
        </PaginationItem>

        {pageItems.map((item, index) =>
          item === 'ellipsis' ? (
            <PaginationItem key={`ellipsis-${index}`}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={item}>
              <PaginationLink
                href="#"
                isActive={item === currentPage}
                onClick={(event) => {
                  event.preventDefault();
                  goToPage(item);
                }}
              >
                {item}
              </PaginationLink>
            </PaginationItem>
          ),
        )}

        <PaginationItem>
          <PaginationNext
            aria-disabled={currentPage >= totalPages}
            className={
              currentPage >= totalPages
                ? 'pointer-events-none opacity-50'
                : undefined
            }
            href="#"
            onClick={(event) => {
              event.preventDefault();
              goToPage(currentPage + 1);
            }}
            text="Siguiente"
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
