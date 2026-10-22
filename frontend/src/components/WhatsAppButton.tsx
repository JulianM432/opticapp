import { HugeiconsIcon } from '@hugeicons/react';
import CallIcon from '@hugeicons/core-free-icons/CallIcon';
import WhatsappIcon from '@hugeicons/core-free-icons/WhatsappIcon';
import { Button } from '@/components/ui/button';
import { STORE_PHONE_HREF } from '@/constants/store';
import { buildWhatsAppUrl } from '@/helpers/whatsapp';
import { cn } from '@/lib/utils';

interface WhatsAppButtonProps {
  brand: string;
  model: string;
  color: string;
  className?: string;
}

// Taller and larger than `size="lg"` so the main action reads as the main action.
const CTA_SIZE_CLASSES =
  "h-12 gap-2 px-6 text-[0.9375rem] has-data-[icon=inline-start]:pl-5 [&_svg:not([class*='size-'])]:size-5";

export function WhatsAppButton({
  brand,
  model,
  color,
  className,
}: WhatsAppButtonProps) {
  const href = buildWhatsAppUrl(brand, model, color);

  if (!href) {
    return (
      <Button asChild className={cn(CTA_SIZE_CLASSES, className)} size="lg">
        <a href={STORE_PHONE_HREF}>
          <HugeiconsIcon
            icon={CallIcon}
            strokeWidth={2}
            data-icon="inline-start"
          />
          Llamanos para consultar
        </a>
      </Button>
    );
  }

  return (
    <Button
      asChild
      className={cn(CTA_SIZE_CLASSES, className)}
      size="lg"
      variant="whatsapp"
    >
      <a href={href} rel="noopener noreferrer" target="_blank">
        <HugeiconsIcon
          icon={WhatsappIcon}
          strokeWidth={2}
          data-icon="inline-start"
        />
        Consultar por WhatsApp
      </a>
    </Button>
  );
}
