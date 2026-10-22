import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/** Resets scroll on route changes; hash-only changes keep native anchor scroll. */
export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
