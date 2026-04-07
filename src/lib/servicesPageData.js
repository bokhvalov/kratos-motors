/**
 * Services page layout + images (public/assets/services/).
 * `asideImg` is used on the desktop section with the Audi column beside the card grid.
 */

/** Card image overlay gradient presets */
export const SERVICE_GRADIENT = {
  down: 'down',
  up: 'up',
  steep: 'steep',
  exhaust: 'exhaust',
}

export const SERVICES_SECTIONS = [
  {
    id: 'technical',
    titleKey: 'pages.services.sections.technical',
    items: [
      {
        img: 'diagnostyka-silnika.jpg',
        titleKey: 'pages.services.items.engineDiagnostics',
        gradient: SERVICE_GRADIENT.steep,
      },
      {
        img: 'wymiana-oleju.jpg',
        titleKey: 'pages.services.items.oilChange',
        gradient: SERVICE_GRADIENT.down,
      },
      {
        img: 'wymiana-filtrow.jpg',
        titleKey: 'pages.services.items.filterChange',
        gradient: SERVICE_GRADIENT.up,
      },
      {
        img: 'wymiana-oleju-bmw.png',
        titleKey: 'pages.services.items.oilBmw',
        gradient: SERVICE_GRADIENT.steep,
      },
      {
        img: 'wymiana-oleju-mercedes-benz.png',
        titleKey: 'pages.services.items.oilMercedes',
        gradient: SERVICE_GRADIENT.down,
      },
      {
        img: 'wymiana-oleju-porsche.png',
        titleKey: 'pages.services.items.oilPorsche',
        gradient: SERVICE_GRADIENT.down,
      },
    ],
  },
  {
    id: 'main',
    titleKey: 'pages.services.sections.main',
    asideImg: 'audi-rs.png',
    items: [
      {
        img: 'skrzynia-biegow.jpg',
        titleKey: 'pages.services.items.gearbox',
        gradient: SERVICE_GRADIENT.steep,
      },
      {
        img: 'uklad-jezdny.png',
        titleKey: 'pages.services.items.chassis',
        gradient: SERVICE_GRADIENT.down,
      },
      {
        img: 'uklad-wydechowy.jpg',
        titleKey: 'pages.services.items.exhaust',
        gradient: SERVICE_GRADIENT.exhaust,
      },
      {
        img: 'uklad-hamulcowy-1.jpg.webp',
        titleKey: 'pages.services.items.brakes',
        gradient: SERVICE_GRADIENT.down,
      },
    ],
  },
  {
    id: 'additional',
    titleKey: 'pages.services.sections.additional',
    items: [
      {
        img: 'wymiana-amortyzatorow.jpg',
        titleKey: 'pages.services.items.shocks',
        gradient: SERVICE_GRADIENT.steep,
      },
      {
        img: 'wymiana-wachacza-prostego.png',
        titleKey: 'pages.services.items.controlArm',
        gradient: SERVICE_GRADIENT.down,
      },
      {
        img: 'wymiana-tulei-wahacza.png',
        titleKey: 'pages.services.items.bushing',
        gradient: SERVICE_GRADIENT.down,
      },
      {
        img: 'wymiana-filtra-kabinowego.png',
        titleKey: 'pages.services.items.cabinFilter',
        gradient: SERVICE_GRADIENT.steep,
      },
    ],
  },
]

export const SERVICES_CTA_IMG = 'audi-rs.webp'
