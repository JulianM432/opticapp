export const HERO_COPY = {
  title: 'Encontrá los anteojos que van con vos',
  description:
    'Mirá los armazones del catálogo y vení a probártelos a la óptica. Te esperamos.',
} as const;

// `position` is the CSS object-position: keeps each subject in frame when the
// wide hero crops the photo to a thin band.
export const HERO_SLIDES = [
  {
    src: '/images/hero/hero-1.jpg',
    position: '50% 62%',
    alt: 'Anteojos de receta con armazón carey y metal dorado sobre un libro blanco',
  },
  {
    src: '/images/hero/hero-2.jpg',
    position: '50% 55%',
    alt: 'Anteojos de sol redondos de metal dorado con lentes verdes sobre mármol',
  },
  {
    src: '/images/hero/hero-3.jpg',
    position: '50% 50%',
    alt: 'Anteojos de sol con lentes rosadas y armazón blanco entre hojas verdes',
  },
  {
    src: '/images/hero/hero-4.jpg',
    position: '50% 35%',
    alt: 'Cuatro armazones apilados, uno amarillo, sobre un exhibidor negro',
  },
  {
    src: '/images/hero/hero-5.jpg',
    position: '50% 50%',
    alt: 'Anteojos de metal dorado sobre un paño de limpieza',
  },
] as const;

export const CATALOG_BANNER = {
  src: '/images/catalog-banner.jpg',
  alt: 'Modelos con anteojos de sol',
} as const;
