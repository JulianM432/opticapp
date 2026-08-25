import { cn } from "@/lib/utils"
import { HugeiconsIcon } from "@hugeicons/react"
import { Loading03Icon } from "@hugeicons/core-free-icons"

function Spinner({ className }: { className?: string }) {
  return (
    <HugeiconsIcon
      aria-label="Loading"
      className={cn('size-4 animate-spin', className)}
      data-slot="spinner"
      icon={Loading03Icon}
      role="status"
      strokeWidth={2}
    />
  );
}

export { Spinner }
