import { Link, Outlet } from 'react-router-dom';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Separator } from '@/components/ui/separator';
import { STORE_INFO } from '@/constants/store';

export function PublicLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <a
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:bg-background focus:px-3 focus:py-2 focus:ring-2 focus:ring-ring"
        href="#contenido-principal"
      >
        Saltar al contenido
      </a>

      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md supports-backdrop-filter:bg-background/70">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
          <Link
            className="flex items-center gap-3 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            to="/"
          >
            <img alt="" className="size-8" src="/logo.svg" />
            <span className="font-heading text-base font-semibold tracking-tight">
              {STORE_INFO.name}
            </span>
          </Link>
          <ThemeToggle />
        </div>
      </header>

      <main className="flex-1" id="contenido-principal">
        <Outlet />
      </main>

      <footer className="border-t border-border/60 bg-muted/30">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-10 sm:px-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex flex-col gap-2">
              <Link
                className="flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                to="/"
              >
                <img alt="" className="size-7" src="/logo.svg" />
                <span className="font-heading text-sm font-semibold tracking-tight">
                  {STORE_INFO.name}
                </span>
              </Link>
              <p className="max-w-sm text-xs/relaxed text-muted-foreground">
                Vidriera de armazones seleccionados. Visitá la óptica para
                probarte los modelos.
              </p>
            </div>

            <div className="flex flex-col gap-2 text-sm">
              <a
                className="text-muted-foreground transition-colors hover:text-foreground"
                href={`https://maps.google.com/?q=${encodeURIComponent(STORE_INFO.address)}`}
                rel="noopener noreferrer"
                target="_blank"
              >
                <span className="text-label text-[0.65rem] text-muted-foreground/80">
                  Dirección
                </span>
                <span className="mt-0.5 block text-foreground">
                  {STORE_INFO.address}
                </span>
              </a>
              <a
                className="text-muted-foreground transition-colors hover:text-foreground"
                href={`tel:${STORE_INFO.phone}`}
              >
                <span className="text-label text-[0.65rem] text-muted-foreground/80">
                  Teléfono
                </span>
                <span className="mt-0.5 block text-foreground">
                  {STORE_INFO.phone}
                </span>
              </a>
            </div>
          </div>

          <Separator />

          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} {STORE_INFO.name}. Catálogo sin
            precios — consultá en local.
          </p>
        </div>
      </footer>
    </div>
  );
}
