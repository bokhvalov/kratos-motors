/**
 * Pasek miniaturek: tylko slideTo — bez setTranslate + updateActiveIndex w freeMode
 * (psuje indeks i „skacze co drugi”).
 */
export function centerThumbByIndex(swiper, index, speed = 420) {
  if (!swiper || swiper.destroyed) return;
  if (index < 0 || index >= swiper.slides.length) return;
  swiper.slideTo(index, speed);
}

export function isLiveSwiper(s) {
  return Boolean(s) && !s.destroyed && Boolean(s.el);
}
