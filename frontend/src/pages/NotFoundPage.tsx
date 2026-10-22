import { Link } from 'react-router-dom';
import { HugeiconsIcon } from '@hugeicons/react';
import ArrowLeft01Icon from '@hugeicons/core-free-icons/ArrowLeft01Icon';
import GlassesIcon from '@hugeicons/core-free-icons/GlassesIcon';
import { Button } from '@/components/ui/button';
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty';

export function NotFoundPage() {
  return (
    <section className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-12 sm:px-6 sm:py-16">
      <Empty className="border border-dashed border-border/80 py-16">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <HugeiconsIcon icon={GlassesIcon} strokeWidth={2} />
          </EmptyMedia>
          <EmptyTitle aria-level={1} role="heading">
            Esta página no está en la vidriera
          </EmptyTitle>
          <EmptyDescription>
            Puede que el enlace haya cambiado o que la página ya no exista. Te
            ayudamos a volver a ver los armazones.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent className="flex-row flex-wrap justify-center">
          <Button asChild className="max-sm:h-11">
            <Link to="/catalogo" viewTransition>
              Ver el catálogo
            </Link>
          </Button>
          <Button asChild className="max-sm:h-11" variant="outline">
            <Link to="/" viewTransition>
              <HugeiconsIcon
                icon={ArrowLeft01Icon}
                strokeWidth={2}
                data-icon="inline-start"
              />
              Volver al inicio
            </Link>
          </Button>
        </EmptyContent>
      </Empty>
    </section>
  );
}
