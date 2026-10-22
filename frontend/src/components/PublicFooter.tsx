import { Link } from 'react-router-dom';
import { HugeiconsIcon } from '@hugeicons/react';
import CallIcon from '@hugeicons/core-free-icons/CallIcon';
import Location01Icon from '@hugeicons/core-free-icons/Location01Icon';
import { StoreLogo } from '@/components/StoreLogo';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Separator } from '@/components/ui/separator';
import { STORE_INFO, STORE_PHONE_HREF } from '@/constants/store';

const FOOTER_LINK_CLASS =
  'inline-flex min-h-11 items-center gap-2 rounded-md text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:min-h-8';

export function PublicFooter() {
  return (
    <footer className="border-t bg-muted/50 text-foreground">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-4 py-12 sm:px-6 sm:py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          <div className="flex flex-col gap-4">
            <Link
              className="flex min-h-11 w-fit items-center gap-2 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              to="/"
            >
              <StoreLogo className="size-7" />
              <span className="font-heading text-sm font-semibold tracking-tight">
                {STORE_INFO.name}
              </span>
            </Link>
            <p className="max-w-xs text-sm/relaxed text-muted-foreground">
              Vidriera de armazones seleccionados. Visitá la óptica para
              probarte los modelos.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <h2 className="text-label text-eyebrow font-medium text-muted-foreground">
              Catálogo
            </h2>
            <Link className={FOOTER_LINK_CLASS} to="/catalogo" viewTransition>
              Ver todos los armazones
            </Link>
          </div>

          <section
            aria-labelledby="contacto-heading"
            className="flex scroll-mt-24 flex-col gap-2"
            id="contacto"
          >
            <h2
              className="text-label text-eyebrow font-medium text-muted-foreground"
              id="contacto-heading"
            >
              Visitanos
            </h2>
            <a
              className={FOOTER_LINK_CLASS}
              href={`https://maps.google.com/?q=${encodeURIComponent(STORE_INFO.address)}`}
              rel="noopener noreferrer"
              target="_blank"
            >
              <HugeiconsIcon icon={Location01Icon} strokeWidth={2} />
              <span className="min-w-0 break-words">{STORE_INFO.address}</span>
              <span className="sr-only">(abre Google Maps)</span>
            </a>
            <a className={FOOTER_LINK_CLASS} href={STORE_PHONE_HREF}>
              <HugeiconsIcon icon={CallIcon} strokeWidth={2} />
              <span>{STORE_INFO.phoneDisplay}</span>
            </a>
          </section>
        </div>

        <Separator />

        <div className="flex flex-col-reverse items-center gap-4 sm:flex-row sm:justify-between">
          <p className="text-center text-xs text-muted-foreground sm:text-left">
            © {new Date().getFullYear()} {STORE_INFO.name}. Todos los derechos
            reservados.
          </p>
          <ThemeToggle align="end" />
        </div>
      </div>
    </footer>
  );
}
