import { Card, CardFooter, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

type ProductGridSkeletonProps = {
  count?: number;
};

export function ProductGridSkeleton({ count = 8 }: ProductGridSkeletonProps) {
  return (
    <div
      aria-busy="true"
      aria-label="Cargando catálogo"
      className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-5 xl:grid-cols-4 xl:gap-6"
    >
      {Array.from({ length: count }, (_, index) => (
        <Card className="h-full gap-3 pt-0" key={index}>
          <Skeleton className="aspect-square w-full rounded-none" />
          <CardHeader className="gap-1">
            <div className="flex items-center justify-between gap-3 py-0.5">
              <Skeleton className="h-3 w-16" />
              <Skeleton className="h-3 w-12" />
            </div>
            <Skeleton className="h-4 w-3/4" />
          </CardHeader>
          <CardFooter className="mt-auto">
            <Skeleton className="h-3 w-20" />
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
