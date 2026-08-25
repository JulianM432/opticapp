import { Card, CardContent, CardFooter } from '@/components/ui/card';
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
        <Card className="overflow-hidden py-0 ring-0" key={index}>
          <Skeleton className="aspect-square w-full rounded-none bg-muted" />
          <CardContent className="flex flex-col gap-2 pt-4">
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </CardContent>
          <CardFooter className="pb-4">
            <Skeleton className="h-9 w-full rounded-md" />
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
