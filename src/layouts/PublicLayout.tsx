import { Outlet } from 'react-router-dom';
import { PublicFooter } from '@/components/PublicFooter';
import { PublicHeader } from '@/components/PublicHeader';

export function PublicLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <a
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:bg-background focus:px-3 focus:py-2 focus:ring-2 focus:ring-ring"
        href="#contenido-principal"
      >
        Saltar al contenido
      </a>

      <PublicHeader />

      <main className="flex-1" id="contenido-principal">
        <Outlet />
      </main>

      <PublicFooter />
    </div>
  );
}
