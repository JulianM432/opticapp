import { Outlet } from 'react-router-dom';

export function PublicLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b bg-background/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center px-4">
          <img
            alt="Opticapp"
            className="h-8 w-8"
            src="/logo.svg"
          />
          <span className="ml-3 text-lg font-semibold tracking-tight">
            Opticapp
          </span>
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="border-t">
        <div className="mx-auto max-w-6xl px-4 py-6 text-sm text-muted-foreground">
          {/* Footer vacío en bootstrap */}
        </div>
      </footer>
    </div>
  );
}
