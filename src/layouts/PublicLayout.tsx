import { Link, Outlet } from 'react-router-dom';
import { ThemeToggle } from '@/components/ThemeToggle';
import { STORE_INFO } from '@/constants/store';

export function PublicLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b bg-background/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4">
          <Link className="flex items-center" to="/">
            <img alt="Opticapp" className="h-8 w-8" src="/logo.svg" />
            <span className="ml-3 text-lg font-semibold tracking-tight">
              {STORE_INFO.name}
            </span>
          </Link>
          <ThemeToggle />
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="border-t">
        <div className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-6 text-sm text-muted-foreground">
          <p>
            <span className="font-medium text-foreground">Dirección: </span>
            {STORE_INFO.address}
          </p>
          <p>
            <span className="font-medium text-foreground">Teléfono: </span>
            {STORE_INFO.phone}
          </p>
        </div>
      </footer>
    </div>
  );
}
