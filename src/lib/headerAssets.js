import { getDirectAssetUrl, publicAssetUrl } from './assets'

/** Header icons in public/assets/header/ (not generated into dist alone). */
export const HEADER_ASSETS = {
  tel: publicAssetUrl('assets/header/tel.svg'),
  location: publicAssetUrl('assets/header/location.svg'),
  clock: publicAssetUrl('assets/header/clock.svg'),
  instagram: publicAssetUrl('assets/header/Instagram.svg'),
  telegram: publicAssetUrl('assets/header/telegram.svg'),
  whatsapp: publicAssetUrl('assets/header/whatsapp.svg'),
  /** Lang flags sprite (EN / PL / RU) */
  langFlags: getDirectAssetUrl('/assets/header/lang-flags.jpg'),
}

/** Social icons: default / hover asset pairs */
export const HEADER_SOCIAL_KIT = {
  instagram: {
    default: {
      bg: publicAssetUrl('assets/header/social/ig-default-bg.svg'),
      fg: getDirectAssetUrl('/assets/header/social/ig-default-fg.png'),
    },
    hover: {
      bg: getDirectAssetUrl('/assets/header/social/ig-hover-bg.png'),
      fg: publicAssetUrl('assets/header/social/ig-hover-fg.svg'),
    },
    fgPosition: 'ig',
  },
  telegram: {
    default: {
      bg: publicAssetUrl('assets/header/social/tg-default-bg.svg'),
      fg: publicAssetUrl('assets/header/social/tg-default-fg.svg'),
    },
    hover: {
      bg: publicAssetUrl('assets/header/social/tg-hover-bg.svg'),
      fg: publicAssetUrl('assets/header/social/tg-hover-fg.svg'),
    },
    fgPosition: 'tg',
  },
  whatsapp: {
    default: {
      bg: publicAssetUrl('assets/header/social/wa-default-bg.svg'),
      fg: publicAssetUrl('assets/header/social/wa-default-fg.svg'),
    },
    hover: {
      bg: publicAssetUrl('assets/header/social/wa-hover-bg.svg'),
      fg: publicAssetUrl('assets/header/social/wa-hover-fg.svg'),
    },
    fgPosition: 'wa',
  },
}
