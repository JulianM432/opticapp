import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { StoreLogo } from '@/components/StoreLogo';
import { cn } from '@/lib/utils';
import { STORE_INFO } from '@/constants/store';

const navLinkClassName =
  'inline-flex h-11 items-center rounded-md px-2 text-sm font-medium transition-colors sm:px-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring';

export function PublicHeader() {
  const { pathname } = useLocation();
  const isHome = pathname === '/';
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    if (!isHome) {
      setIsScrolled(true);
      return;
    }

    setIsScrolled(window.scrollY > 48);

    const onScroll = () => {
      setIsScrolled(window.scrollY > 48);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [isHome]);

  const isTransparent = isHome && !isScrolled;

  return (
    <header
      className={cn(
        'sticky top-0 z-40 transition-[background-color,border-color,backdrop-filter] duration-300',
        isTransparent
          ? 'border-b border-transparent bg-transparent'
          : 'border-b border-border/60 bg-background/80 backdrop-blur-md supports-backdrop-filter:bg-background/70',
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-2 px-4 sm:gap-4 sm:px-6">
        <Link
          className={cn(
            'flex min-h-11 min-w-0 items-center gap-3 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
            isTransparent && 'text-on-media',
          )}
          to="/"
        >
          <StoreLogo className="size-8" />
          <span className="truncate font-heading text-base font-semibold tracking-tight">
            {STORE_INFO.name}
          </span>
        </Link>

        <nav
          aria-label="Principal"
          className="flex shrink-0 items-center gap-1"
        >
          <NavLink
            className={({ isActive }) =>
              cn(
                navLinkClassName,
                isTransparent
                  ? 'text-on-media/90 hover:text-on-media'
                  : isActive
                    ? 'text-foreground'
                    : 'text-muted-foreground hover:text-foreground',
              )
            }
            to="/catalogo"
          >
            Catálogo
          </NavLink>
          <a
            className={cn(
              navLinkClassName,
              isTransparent
                ? 'text-on-media/90 hover:text-on-media'
                : 'text-muted-foreground hover:text-foreground',
            )}
            href="#contacto"
          >
            Contacto
          </a>
        </nav>
      </div>
    </header>
  );
}
