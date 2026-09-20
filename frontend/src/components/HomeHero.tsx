import { useCallback, useEffect, useState } from 'react';
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
import MonitorPauseIcon from '@hugeicons/core-free-icons/MonitorPauseIcon';
import MonitorPlayIcon from '@hugeicons/core-free-icons/MonitorPlayIcon';
import { HERO_SLIDES } from '@/constants/hero';
import { cn } from '@/lib/utils';

export function HomeHero() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

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
      <Carousel
        className="relative flex-1"
        opts={{ loop: true }}
        setApi={setApi}
      >
        <CarouselContent className="ml-0 h-full">
          {HERO_SLIDES.map((slide) => (
            <CarouselItem className="pl-0" key={slide.src}>
              <div className="relative h-[min(85vh,720px)] w-full">
                <img
                  alt={slide.alt}
                  className="size-full object-cover"
                  decoding="async"
                  fetchPriority="high"
                  src={slide.src}
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-linear-to-t from-black/50 via-black/10 to-black/20"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="flex items-center justify-center gap-4 border-b border-border/60 bg-background px-4 py-4">
        <Button
          aria-label="Slide anterior"
          onClick={() => api?.scrollPrev()}
          size="icon-sm"
          type="button"
          variant="ghost"
        >
          <HugeiconsIcon icon={ArrowLeft01Icon} strokeWidth={2} />
        </Button>

        <div className="flex items-center gap-2">
          {HERO_SLIDES.map((slide, index) => (
            <button
              aria-current={current === index ? 'true' : undefined}
              aria-label={`Ir al slide ${index + 1}`}
              className={cn(
                'size-2 rounded-full transition-colors',
                current === index ? 'bg-foreground' : 'bg-muted-foreground/40',
              )}
              key={slide.src}
              onClick={() => api?.scrollTo(index)}
              type="button"
            />
          ))}
        </div>

        <Button
          aria-label="Slide siguiente"
          onClick={() => api?.scrollNext()}
          size="icon-sm"
          type="button"
          variant="ghost"
        >
          <HugeiconsIcon icon={ArrowRight01Icon} strokeWidth={2} />
        </Button>

        <Button
          aria-label={isPlaying ? 'Pausar carrusel' : 'Reanudar carrusel'}
          aria-pressed={isPlaying}
          onClick={() => setIsPlaying((playing) => !playing)}
          size="icon-sm"
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
