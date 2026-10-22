import { cn } from '@/lib/utils';

/**
 * Store logo. Decorative: every usage sits next to the store name, which
 * already labels the link.
 */
export function StoreLogo({ className }: { className?: string }) {
  return (
    <img
      alt=""
      className={cn('shrink-0 rounded-full', className)}
      src="/images/logo.png"
    />
  );
}
