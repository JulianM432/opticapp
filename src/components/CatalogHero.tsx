import { HugeiconsIcon } from '@hugeicons/react';
import { Location01Icon, SunglassesIcon } from '@hugeicons/core-free-icons';
import { Separator } from '@/components/ui/separator';
import { STORE_INFO } from '@/constants/store';

export function CatalogHero() {
  return (
    <section
      aria-labelledby="catalog-hero-title"
      className="relative overflow-hidden border-b border-border/60 bg-muted/20"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_80%_at_20%_0%,oklch(0.588_0.158_241.966/0.08),transparent_60%)]"
      />

      <div className="relative mx-auto flex max-w-7xl flex-col gap-6 px-4 py-10 sm:px-6 sm:py-14 lg:py-16">
        <div className="flex flex-col gap-4 lg:max-w-2xl">
          <p className="text-label text-[0.65rem] font-medium text-primary">
            Óptica local
          </p>
          <h1
            className="text-display font-heading text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl"
            id="catalog-hero-title"
          >
            Armazones seleccionados para tu estilo
          </h1>
          <p className="max-w-xl text-sm/relaxed text-muted-foreground sm:text-base/relaxed">
            Explorá nuestra vidriera de anteojos. Cada modelo está disponible
            para probarte en {STORE_INFO.name}.
          </p>
        </div>

        <Separator className="max-w-xl bg-border/60" />

        <dl className="flex flex-col gap-4 sm:flex-row sm:gap-8">
          <div className="flex items-start gap-3">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
              <HugeiconsIcon icon={SunglassesIcon} strokeWidth={2} />
            </div>
            <div className="flex flex-col gap-0.5">
              <dt className="text-label text-[0.65rem] text-muted-foreground">
                Catálogo
              </dt>
              <dd className="text-sm font-medium">Solo armazones</dd>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
              <HugeiconsIcon icon={Location01Icon} strokeWidth={2} />
            </div>
            <div className="flex flex-col gap-0.5">
              <dt className="text-label text-[0.65rem] text-muted-foreground">
                Visitanos
              </dt>
              <dd className="text-sm font-medium">{STORE_INFO.address}</dd>
            </div>
          </div>
        </dl>
      </div>
    </section>
  );
}
