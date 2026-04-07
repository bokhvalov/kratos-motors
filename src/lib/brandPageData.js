import { BRAND_FOLDERS } from './assets'

export const BRAND_SLUGS = ['audi', 'bmw', 'mercedes', 'porsche', 'volkswagen', 'ford']

/** i18n keys: services section title → brand page row keys */
export const BRAND_SERVICES_SECTION_I18N = [
  ['pages.services.sections.technical', 'pages.brands.servicesRows.technical'],
  ['pages.services.sections.main', 'pages.brands.servicesRows.main'],
  ['pages.services.sections.additional', 'pages.brands.servicesRows.additional'],
]

export const BRAND_PAGE_DATA = {
  audi: {
    heroImage: 'Audi-RS_e-tron_GT_performance_US-Version-2025-Side_Profile.fb46d7ab.jpg',
    factImage: 'Audi-A6-TDI-Ultra-190-ch.jpg',
    factImageSide: 'right',
    processImage: 'f8b794a0a6fc6610f34a67f275a28b14.jpg',
    servicesImage: 'Audi-RS7_Sportback-2020-HD-7b60601c1c25e7273f552a7fc9a45afa0cb2114c9.jpg',
    gallery: [
      'PHOTO-2026-02-07-17-00-15-10.jpg',
      'PHOTO-2026-02-07-16-55-38-7.jpg',
      'sprzezyny.jpg',
      'PHOTO-2026-02-07-17-00-14-5.jpg',
    ],
    formImage: 'Audi-RS_e-tron_GT-2022-HD-2ee68b1d1c26f62d73a0be31c4ea7781e3795a3c1 copy.png',
  },
  bmw: {
    heroImage: 'BMW-M4_CSL-2023-HD-3f701c0f1c25899cbbbb8e3e321f232b10601ce47.jpg',
    factImage: 'ht5q0tzeimi51.jpg',
    factImageSide: 'left',
    processImage: '3487ac3cc80dc9627bd4a50654882073.jpg',
    servicesImage: 'BMW-M4_CS_UK-Version-2025-1280-f95f5a9cd303d6dfc70bda83829833980b.JPG',
    gallery: [
      'bmw-warsztat.jpg',
      'bmw-warsztat1.png',
      'PHOTO-2026-02-07-17-00-16.jpg',
      'IMG_3392.jpg',
    ],
    formImage: 'BMW-i5_M60-2024-Front.bfb9024d copy.png',
  },
  mercedes: {
    heroImage: 'Mercedes-Benz-CLE53_AMG_Coupe-2024-HD-d099481a1c26d36fe24033ee4477d32a517288468 copy.png',
    factImage: 'Mercedes-Benz-E-class-W211.jpg',
    factImageSide: 'right',
    processImage: '014c19395d65e1ea3cc37936677b4750.jpg',
    servicesImage: 'b9904db3804a0c25eef1f2435c7f1874.jpg',
    gallery: [
      'PHOTO-2026-02-07-17-00-14-2.jpg',
      'PHOTO-2026-02-07-17-00-16-12.jpg',
      'ms-warsztat.png',
      'PHOTO-2026-02-07-17-00-14-6.jpg',
    ],
    formImage: 'Mercedes-Benz-CLE53_AMG_Coupe-2024-HD-4b3099e01c2648933618a464276e97fcb870a846a copy.png',
  },
  porsche: {
    heroImage: 'Porsche-Taycan-2025-Side_Profile.3e7256b7 copy.png',
    factImage: 'Porsche-919_Hybrid-2014-1280-560f29f2620f35bc0fc31a9d20ed852d17.jpg',
    factImageSide: 'left',
    processImage: 'f851abd3bc3911268e18ad37e847b9c4.jpg',
    servicesImage: 'f851abd3bc3911268e18ad37e847b9c4.jpg',
    gallery: [
      'PHOTO-2026-02-07-16-55-38-9.jpg',
      'porche-warsztat.png',
      'PHOTO-2026-02-07-17-00-14-7.jpg',
      'PHOTO-2026-02-07-17-00-16-9.jpg',
    ],
    formImage: 'Porsche-Taycan-2025-HD-838964831c25fe557415cbba2cd4f09ee155e8996 copy 2.png',
  },
  volkswagen: {
    heroImage: 'Volkswagen-Arteon_UK-Version-2021-Side_Profile.2bde4de5 copy.png',
    factImage: 'Volkswagen-ID.4_GTX-2022-1280-5efafdbc6d357b0c303923cb0123fd0c6a.jpg',
    factImageSide: 'right',
    processImage: 'fb54c299cdd2f0cf0c76a8323c6c18b6.jpg',
    servicesImage: 'Volkswagen-Arteon_US-Version-2019-Engine_Bay.1022990b.jpg',
    gallery: [
      'vw-warsztat.png',
      'PHOTO-2026-02-07-17-00-15-4.jpg',
      'PHOTO-2026-02-07-17-00-13.jpg',
      'vw-warsztat1.png',
    ],
    formImage: 'Volkswagen-Arteon_UK-Version-2021-Rear.2bde4de5 copy.jpg',
  },
  ford: {
    heroImage: 'Ford-Mustang_Shelby_GT500-2020-Side_Profile.a3dd6146 copy.png',
    factImage: 'Ford-Mustang_Mach-E-2025-1280-57de95873e920f0881b680de30dab67802.jpg',
    factImageSide: 'left',
    processImage: '729a40fda74d15dbf654c293e847022e.jpg',
    servicesImage: 'Ford-Mustang_GT-2024-1280-9ddd0046333d38af909c04d2210c2b2961.jpg',
    gallery: [
      'PHOTO-2026-02-07-16-55-38-14.jpg',
      'PHOTO-2026-02-07-16-55-38-10.jpg',
      'ford-warsztat.jpg',
      'PHOTO-2026-02-07-16-55-38-4.png',
    ],
    formImage: 'Ford-Mustang_GTD_Liquid_Carbon-2026-HD-ec96d5721c26320b556a4a20ff68c0741475f9477 copy.jpg',
  },
}

/**
 * @param {string | undefined} slug
 * @returns {{ slug: string, brandData: (typeof BRAND_PAGE_DATA)[string], folder: string } | null}
 */
export function resolveBrandPage(slug) {
  if (!slug || !BRAND_SLUGS.includes(slug)) return null
  const brandData = BRAND_PAGE_DATA[slug]
  const folder = BRAND_FOLDERS[slug]
  if (!brandData || folder == null) return null
  return { slug, brandData, folder }
}
