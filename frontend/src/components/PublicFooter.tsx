import { Link } from 'react-router-dom';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  CallIcon,
  Location01Icon,
} from '@hugeicons/core-free-icons';
import { Separator } from '@/components/ui/separator';
import { STORE_INFO } from '@/constants/store';

export function PublicFooter() {
  return (
    <footer className="bg-foreground text-background">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-4 py-12 sm:px-6 sm:py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          <div className="flex flex-col gap-4">
            <Link
              className="flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-background/40"
              to="/"
            >
              <img
                alt=""
                className="size-7 brightness-0 invert"
                src="/logo.svg"
              />
              <span className="font-heading text-sm font-semibold tracking-tight">
                {STORE_INFO.name}
              </span>
            </Link>
            <p className="max-w-xs text-sm/relaxed text-background/70">
              Vidriera de armazones seleccionados. Visitá la óptica para
              probarte los modelos.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="text-label text-[0.65rem] font-medium text-background/60">
              Catálogo
            </h2>
            <Link
              className="text-sm text-background/80 transition-colors hover:text-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-background/40"
              to="/catalogo"
            >
              Ver todos los armazones
            </Link>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="text-label text-[0.65rem] font-medium text-background/60">
              Visitanos
            </h2>
            <a
              className="flex items-start gap-2 text-sm text-background/80 transition-colors hover:text-background"
              href={`https://maps.google.com/?q=${encodeURIComponent(STORE_INFO.address)}`}
              rel="noopener noreferrer"
              target="_blank"
            >
              <HugeiconsIcon icon={Location01Icon} strokeWidth={2} />
              <span>{STORE_INFO.address}</span>
            </a>
            <a
              className="flex items-center gap-2 text-sm text-background/80 transition-colors hover:text-background"
              href={`tel:${STORE_INFO.phone}`}
            >
              <HugeiconsIcon icon={CallIcon} strokeWidth={2} />
              <span>{STORE_INFO.phone}</span>
            </a>
          </div>
        </div>

        <Separator className="bg-background/20" />

        <p className="text-center text-xs text-background/60">
          © {new Date().getFullYear()} {STORE_INFO.name}. Todos los derechos
          reservados.
        </p>
      </div>
    </footer>
  );
}
