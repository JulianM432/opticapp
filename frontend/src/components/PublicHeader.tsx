import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ThemeToggle } from '@/components/ThemeToggle';
import { cn } from '@/lib/utils';
import { STORE_INFO } from '@/constants/store';

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
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link
          className={cn(
            'flex items-center gap-3 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
            isTransparent && 'text-white',
          )}
          to="/"
        >
          <img
            alt=""
            className={cn('size-8', isTransparent && 'brightness-0 invert')}
            src="/logo.svg"
          />
          <span className="font-heading text-base font-semibold tracking-tight">
            {STORE_INFO.name}
          </span>
        </Link>

        <nav
          aria-label="Principal"
          className="flex items-center gap-3 sm:gap-4"
        >
          <Link
            className={cn(
              'text-label rounded-md px-2 py-1 text-[0.65rem] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
              isTransparent
                ? 'text-white/90 hover:text-white'
                : 'text-muted-foreground hover:text-foreground',
            )}
            to="/catalogo"
          >
            Catálogo
          </Link>
          <ThemeToggle variant={isTransparent ? 'ghost-light' : 'default'} />
        </nav>
      </div>
    </header>
  );
}
