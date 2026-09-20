import { HugeiconsIcon } from '@hugeicons/react';
import CallIcon from '@hugeicons/core-free-icons/CallIcon';
import { Button } from '@/components/ui/button';
import { buildWhatsAppUrl } from '@/helpers/whatsapp';

interface WhatsAppButtonProps {
  brand: string;
  model: string;
  color: string;
}

export function WhatsAppButton({ brand, model, color }: WhatsAppButtonProps) {
  const href = buildWhatsAppUrl(brand, model, color);

  if (!href) {
    return null;
  }

  return (
    <Button asChild className="w-full sm:w-auto" size="lg">
      <a href={href} rel="noopener noreferrer" target="_blank">
        <HugeiconsIcon icon={CallIcon} strokeWidth={2} data-icon="inline-start" />
        Consultar precio
      </a>
    </Button>
  );
}
