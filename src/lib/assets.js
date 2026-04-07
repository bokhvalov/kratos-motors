/** Asset paths under public/assets; filenames are URL-encoded. */

/** Prefix for `/public` files when the app is hosted under a subpath (e.g. GitHub Pages project site). */
export function publicAssetUrl(path) {
  const s = String(path || '').replace(/^\/+/, '')
  if (!s) return import.meta.env.BASE_URL
  return `${import.meta.env.BASE_URL}${s}`
}

const RASTER_EXTENSION_RE = /\.(?:avif|webp|jpe?g|png)$/i
const GENERATED_WEBP_VARIANT_RE = /@([123])x\.webp$/i

function stripBaseUrlPrefix(normalizedPath) {
  const base = String(import.meta.env.BASE_URL || '/')
    .replace(/^\/+/, '')
    .replace(/\/+$/, '')

  if (!base) return normalizedPath
  if (normalizedPath === base) return ''
  if (normalizedPath.startsWith(`${base}/`)) return normalizedPath.slice(base.length + 1)
  return normalizedPath
}

function encodeAssetFilename(filename) {
  return encodeURIComponent(filename).replace(/%40/g, '@')
}

function stripRasterExtensions(filename) {
  let output = filename

  while (RASTER_EXTENSION_RE.test(output)) {
    output = output.replace(RASTER_EXTENSION_RE, '')
  }

  return output
}

export function isRasterAsset(filename) {
  return RASTER_EXTENSION_RE.test(filename)
}

export function toWebpVariantFilename(filename, scale = 1) {
  if (!isRasterAsset(filename)) return filename

  const safeScale = scale >= 3 ? 3 : scale <= 1 ? 1 : 2
  const baseName = stripRasterExtensions(filename)
  return `${baseName}@${safeScale}x.webp`
}

export function getAssetUrl(folder, filename, scale = 1) {
  const resolvedFilename = toWebpVariantFilename(filename, scale)
  const path = `assets/${folder}/${encodeAssetFilename(resolvedFilename)}`
  return publicAssetUrl(path)
}

export function getAssetSrcSet(folder, filename) {
  if (!isRasterAsset(filename)) return undefined

  return [1, 2, 3]
    .map((scale) => `${getAssetUrl(folder, filename, scale)} ${scale}x`)
    .join(', ')
}

export function getDirectAssetUrl(path, scale = 1) {
  const normalizedPath = stripBaseUrlPrefix(String(path || '').replace(/^\/+/, ''))
  const parts = normalizedPath.split('/').filter(Boolean)
  const filename = parts.pop() || ''
  const safeScale = scale >= 3 ? 3 : scale <= 1 ? 1 : 2

  if (!filename || !isRasterAsset(filename)) {
    return publicAssetUrl(normalizedPath)
  }

  if (GENERATED_WEBP_VARIANT_RE.test(filename)) {
    if (safeScale === 1) return publicAssetUrl(normalizedPath)
    const replaced = normalizedPath.replace(/@1x\.webp$/i, `@${safeScale}x.webp`)
    return publicAssetUrl(replaced)
  }

  const basePath = parts.join('/')
  return publicAssetUrl(`${basePath}/${encodeAssetFilename(toWebpVariantFilename(filename, safeScale))}`)
}

export function getDirectAssetSrcSet(path) {
  const normalizedPath = stripBaseUrlPrefix(String(path || '').replace(/^\/+/, ''))
  const parts = normalizedPath.split('/').filter(Boolean)
  const filename = parts.pop() || ''

  if (!filename || !isRasterAsset(filename)) return undefined

  const cleanPath = `${parts.join('/')}/${filename}`

  return [1, 2, 3]
    .map((scale) => `${getDirectAssetUrl(cleanPath, scale)} ${scale}x`)
    .join(', ')
}


export const ASSETS = {
  home: {
    hero: 'BMW-M4_CS_UK-Version-2025-HD-82223cd61c25592f666b76f2a9f851429837cca07.jpg',
    /** Home CTA strip image */
    ctaStrip: 'Gemini_Generated_Image_11ign911ign911ig-2.png',
    /** Services grid: one large + three small tiles */
    tzCards: [
      { img: 'mechanika-i-skrzynie.png', titleKey: 'home.tz.mechanika', large: true },
      { img: 'podwozie.png', titleKey: 'home.tz.podwozie', large: false },
      { img: 'tuning.png', titleKey: 'home.tz.tuning', large: false },
      { img: 'kola.png', titleKey: 'home.tz.kola', large: false },
    ],
    gallery: [
      'realizacje-1.jpg',
      'realizacje-2.jpg',
      'realizacje-3.png',
      'realizacje-4.jpg',
    ],
    /** Lead form side image */
    formBlockSide: '5e4ce70476d2dd1567d432680cc4462a-Photoroom 1.png',
    /** 404 hero (dashboard photo) */
    notFound: '404.png',
    /** 404 wordmark SVG (glow / ERROR 404 artwork) */
    notFoundHeading: '404-heading.svg',
  },
  'about-us': {
    main: 'Audi-RS7_Sportback-2020-HD-298f02181c25a2f01e4c45fa3294b2174e0cf7aa3.jpg',
    side: 'Audi-A7_Sportback-2018-HD-b71f805d1c25294c8e68ef69b59a56652744e94cb copy.png',
    /** About banner (same strip style as home, no copy) */
    banner: 'audi.jpg',
  },
  work: [
    'portfolio1.png',
    'portfolio2.JPG',
    'IMG_3369.JPG',
    'IMG_3370.JPG',
    'IMG_3380.JPG',
    'IMG_3388.JPG',
    'IMG_3392.JPG',
    'PHOTO-2026-02-07-16-55-38-5.jpg',
    'PHOTO-2026-02-07-16-55-38-7.jpg',
    'PHOTO-2026-02-07-16-55-38-8.jpg',
    'PHOTO-2026-02-07-17-00-14-3.jpg',
    'PHOTO-2026-02-07-17-00-15-2.jpg',
    'PHOTO-2026-02-07-17-00-15-4.jpg',
    'PHOTO-2026-02-07-17-00-15-5.jpg',
    'PHOTO-2026-02-07-17-00-15-7.jpg',
    'PHOTO-2026-02-07-17-00-15.jpg',
    'PHOTO-2026-02-07-17-00-16-2.jpg',
    'PHOTO-2026-02-07-17-00-16-3.jpg',
    'PHOTO-2026-02-07-17-00-16-5.jpg',
    'PHOTO-2026-02-07-17-00-16-9.jpg',
  ],
  audi: ['Audi-RS_e-tron_GT-2022-HD-2ee68b1d1c26f62d73a0be31c4ea7781e3795a3c1 copy.png', 'Audi-RS7_Sportback-2020-HD-7b60601c1c25e7273f552a7fc9a45afa0cb2114c9.jpg'],
  bmw: ['BMW-M4_CS_UK-Version-2025-HD-82223cd61c25592f666b76f2a9f851429837cca07.jpg', 'BMW-M4_CSL-2023-HD-3f701c0f1c25899cbbbb8e3e321f232b10601ce47.jpg'],
  mercedes: ['Mercedes-Benz-CLE53_AMG_Coupe-2024-HD-4b3099e01c2648933618a464276e97fcb870a846a copy.png'],
  porcshe: ['Porsche-Taycan-2025-Side_Profile.3e7256b7 copy.png', 'Porsche-Taycan_4S-2020-1280-bfad981b0a22a94f4978c7182f5a9dbb8f.jpg'],
  Volkswagen: ['Volkswagen-Arteon_UK-Version-2021-Rear.2bde4de5 copy.png'],
  Ford: ['Ford-Mustang_GT-2024-1280-9ddd0046333d38af909c04d2210c2b2961.jpg'],
  'Sports-Car-Builds': ['IMG_3369.JPG', 'IMG_3370.JPG', 'sport-cars-photo.JPG', 'IMG_3380.JPG', 'IMG_3383.JPG', 'IMG_3388.JPG'],
}

/** Brand slug → folder under public/assets */
export const BRAND_FOLDERS = {
  audi: 'audi',
  bmw: 'bmw',
  mercedes: 'mercedes',
  porsche: 'porcshe',
  volkswagen: 'Volkswagen',
  ford: 'Ford',
}
