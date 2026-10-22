import { cn } from '@/lib/utils';

/**
 * Inline version of /public/logo.svg: the lenses keep the brand color and the
 * brow line follows `currentColor`, so the mark reads on light and dark themes.
 */
export function StoreLogo({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={cn('shrink-0', className)}
      fill="none"
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g className="stroke-primary" strokeWidth={4}>
        <circle cx="18" cy="32" r="12" />
        <circle cx="46" cy="32" r="12" />
        <path d="M30 32h4" strokeLinecap="round" />
      </g>
      <g stroke="currentColor" strokeLinecap="round" strokeWidth={3}>
        <path d="M6 30c4-8 10-12 18-12" />
        <path d="M58 30c-4-8-10-12-18-12" />
      </g>
    </svg>
  );
}
