import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel';
import { Button } from '@/components/ui/button';
import { HugeiconsIcon } from '@hugeicons/react';
import ArrowLeft01Icon from '@hugeicons/core-free-icons/ArrowLeft01Icon';
import ArrowRight01Icon from '@hugeicons/core-free-icons/ArrowRight01Icon';
import CallIcon from '@hugeicons/core-free-icons/CallIcon';
import MonitorPauseIcon from '@hugeicons/core-free-icons/MonitorPauseIcon';
import MonitorPlayIcon from '@hugeicons/core-free-icons/MonitorPlayIcon';
import WhatsappIcon from '@hugeicons/core-free-icons/WhatsappIcon';
import { HERO_COPY, HERO_SLIDES } from '@/constants/hero';
import { STORE_PHONE_HREF } from '@/constants/store';
import { buildWhatsAppContactUrl } from '@/helpers/whatsapp';
import { cn } from '@/lib/utils';

// 44px hit area for the carousel controls.
const CONTROL_CLASSES = 'size-11';
const CTA_CLASSES = 'h-11 gap-2 px-5 text-sm';

export function HomeHero() {
  const whatsAppHref = buildWhatsAppContactUrl();
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [isPlaying, setIsPlaying] = useState(
    () => !window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );

  const onSelect = useCallback(() => {
    if (!api) {
      return;
    }
    setCurrent(api.selectedScrollSnap());
  }, [api]);

  useEffect(() => {
    if (!api) {
      return;
    }

    onSelect();
    api.on('select', onSelect);
    return () => {
      api.off('select', onSelect);
    };
  }, [api, onSelect]);

  useEffect(() => {
    if (!api || !isPlaying) {
      return;
    }

    const interval = window.setInterval(() => {
      api.scrollNext();
    }, 6000);

    return () => window.clearInterval(interval);
  }, [api, isPlaying]);

  return (
    <section
      aria-label="Destacados"
      className="relative -mt-16 flex min-h-[min(85vh,720px)] flex-col"
    >
      <div className="relative flex-1">
        <Carousel
          className="relative h-full"
          opts={{ loop: true }}
          setApi={setApi}
        >
          <CarouselContent className="ml-0 h-full">
            {HERO_SLIDES.map((slide, index) => (
              <CarouselItem className="pl-0" key={slide.src}>
                <div className="relative h-[min(85vh,720px)] w-full">
                  <img
                    alt={slide.alt}
                    className="size-full object-cover"
                    decoding="async"
                    fetchPriority={index === 0 ? 'high' : 'auto'}
                    loading={index === 0 ? 'eager' : 'lazy'}
                    src={slide.src}
                  />
                  {/* Scrim: darkest where the copy sits, light at the top for the header. */}
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-linear-to-t from-black/75 via-black/30 to-black/30"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {/* Copy stays put while the slides change; only the CTAs take pointer events so swipe still works. */}
        <div className="pointer-events-none absolute inset-0 flex items-end">
          <div className="mx-auto flex w-full max-w-7xl flex-col items-start gap-4 px-4 pb-10 sm:px-6 sm:pb-14">
            <h1 className="text-display max-w-2xl font-heading text-4xl font-semibold tracking-tight text-balance text-on-media sm:text-5xl lg:text-6xl">
              {HERO_COPY.title}
            </h1>
            <p className="max-w-xl text-base/relaxed text-pretty text-on-media/90 sm:text-lg/relaxed">
              {HERO_COPY.description}
            </p>
            <div className="pointer-events-auto mt-2 flex flex-wrap gap-3">
              <Button asChild className={CTA_CLASSES} size="lg">
                <Link to="/catalogo" viewTransition>
                  Ver catálogo
                  <HugeiconsIcon
                    icon={ArrowRight01Icon}
                    strokeWidth={2}
                    data-icon="inline-end"
                  />
                </Link>
              </Button>
              <Button
                asChild
                className={cn(
                  CTA_CLASSES,
                  'border-on-media/30 bg-on-media/10 text-on-media hover:bg-on-media/20 hover:text-on-media dark:bg-on-media/10 dark:hover:bg-on-media/20',
                )}
                size="lg"
                variant="outline"
              >
                {whatsAppHref ? (
                  <a
                    href={whatsAppHref}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
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
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center gap-1 border-b border-border/60 bg-background px-4 py-2">
        <Button
          aria-label="Imagen anterior"
          className={CONTROL_CLASSES}
          onClick={() => api?.scrollPrev()}
          size="icon-lg"
          type="button"
          variant="ghost"
        >
          <HugeiconsIcon icon={ArrowLeft01Icon} strokeWidth={2} />
        </Button>

        <div className="flex items-center">
          {HERO_SLIDES.map((slide, index) => (
            <button
              aria-current={current === index ? 'true' : undefined}
              aria-label={`Ir a la imagen ${index + 1}`}
              className="group/dot flex size-11 items-center justify-center rounded-full outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
              key={slide.src}
              onClick={() => api?.scrollTo(index)}
              type="button"
            >
              <span
                aria-hidden
                className={cn(
                  'size-2 rounded-full transition-colors',
                  current === index
                    ? 'bg-foreground'
                    : 'bg-muted-foreground/40 group-hover/dot:bg-muted-foreground',
                )}
              />
            </button>
          ))}
        </div>

        <Button
          aria-label="Imagen siguiente"
          className={CONTROL_CLASSES}
          onClick={() => api?.scrollNext()}
          size="icon-lg"
          type="button"
          variant="ghost"
        >
          <HugeiconsIcon icon={ArrowRight01Icon} strokeWidth={2} />
        </Button>

        <Button
          aria-label={isPlaying ? 'Pausar carrusel' : 'Reanudar carrusel'}
          className={CONTROL_CLASSES}
          onClick={() => setIsPlaying((playing) => !playing)}
          size="icon-lg"
          type="button"
          variant="ghost"
        >
          <HugeiconsIcon
            icon={isPlaying ? MonitorPauseIcon : MonitorPlayIcon}
            strokeWidth={2}
          />
        </Button>
      </div>
    </section>
  );
}
