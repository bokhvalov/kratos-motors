const FOLDER = 'Sports-Car-Builds'

export const SPORTS_BUILD_HERO = 'sport-cars-hero.png'

export const SPORTS_BUILD_CO_ROBIMY_IMG = 'sport-cars-bmw.png'
export const SPORTS_BUILD_DRIFT_IMG = 'sport-cars-photo.JPG'


const DESKTOP_GALLERY_SLIDES = [
  'IMG_3369.JPG',
  'IMG_3370.JPG',
  'IMG_3375.JPG',
  'IMG_3380.JPG',
  'IMG_3383.JPG',
  'IMG_3388.JPG',
  'IMG_3391.JPG',
  'sport-cars-bmw.jpg',
  'sport-cars-bmwparking.jpg',
  'IMG_3372.JPG',
  'IMG_3373.JPG',
]

export function getSportsBuildGallerySlides(isNarrow) {
  if (!isNarrow) return DESKTOP_GALLERY_SLIDES
  const d = DESKTOP_GALLERY_SLIDES
  return [...d.slice(0, 8), d[8], d[7], d[9], SPORTS_BUILD_CO_ROBIMY_IMG, d[10]]
}

export { FOLDER }
