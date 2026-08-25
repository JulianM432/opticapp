import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';

export function ProductDetailSkeleton() {
  return (
    <article
      aria-busy="true"
      aria-label="Cargando armazón"
      className="grid gap-8 lg:grid-cols-2 lg:gap-12"
    >
      <div className="flex flex-col gap-3">
        <Skeleton className="specimen-field aspect-square w-full rounded-xl" />
        <div className="flex gap-2">
          <Skeleton className="size-16 rounded-md" />
          <Skeleton className="size-16 rounded-md" />
          <Skeleton className="size-16 rounded-md" />
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-10 w-3/4" />
          <Skeleton className="h-6 w-1/2" />
        </div>

        <Separator />

        <dl className="flex flex-col gap-4">
          <div className="flex justify-between gap-4">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-24" />
          </div>
          <div className="flex justify-between gap-4">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-5 w-16 rounded-full" />
          </div>
        </dl>

        <Skeleton className="h-20 w-full" />
      </div>
    </article>
  );
}
