import { HugeiconsIcon } from '@hugeicons/react';
import CallIcon from '@hugeicons/core-free-icons/CallIcon';
import SunglassesIcon from '@hugeicons/core-free-icons/SunglassesIcon';
import WhatsappIcon from '@hugeicons/core-free-icons/WhatsappIcon';
import { Button } from '@/components/ui/button';
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty';
import { STORE_PHONE_HREF } from '@/constants/store';
import { buildWhatsAppContactUrl } from '@/helpers/whatsapp';

type CatalogErrorProps = {
  onRetry: () => void;
};

/** Failed catalog load: a way back in (retry) and a way around it (ask the shop directly). */
export function CatalogError({ onRetry }: CatalogErrorProps) {
  const whatsAppHref = buildWhatsAppContactUrl();

  return (
    <Empty className="border border-dashed border-border/80 py-16">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <HugeiconsIcon icon={SunglassesIcon} strokeWidth={2} />
        </EmptyMedia>
        <EmptyTitle>No pudimos mostrar los armazones</EmptyTitle>
        <EmptyDescription>
          Probá de nuevo en un rato, o escribinos y te contamos qué modelos
          tenemos.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent className="flex-row flex-wrap justify-center gap-3">
        <Button className="max-sm:h-11" onClick={onRetry} type="button">
          Reintentar
        </Button>
        <Button asChild className="max-sm:h-11" variant="outline">
          {whatsAppHref ? (
            <a href={whatsAppHref} rel="noopener noreferrer" target="_blank">
              <HugeiconsIcon
                icon={WhatsappIcon}
                strokeWidth={2}
                data-icon="inline-start"
              />
              Escribinos
            </a>
          ) : (
            <a href={STORE_PHONE_HREF}>
              <HugeiconsIcon
                icon={CallIcon}
                strokeWidth={2}
                data-icon="inline-start"
              />
              Llamanos
            </a>
          )}
        </Button>
      </EmptyContent>
    </Empty>
  );
}
