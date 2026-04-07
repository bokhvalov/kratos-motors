/** Keep in sync with breakpoints in sports-car-builds.css */
export const MQ_NARROW_MAX = "(max-width: 744px)";
export const MQ_DESKTOP_WIDE_MIN = "(min-width: 1200px)";

export const SWIPER_MAIN = {
  speed: 650,
  slidesPerView: 1,
  slidesPerGroup: 1,
  spaceBetween: 0,
};

export const SWIPER_THUMBS = {
  slidesPerView: "auto",
  slidesPerGroup: 1,
  spaceBetweenBase: 16,
  spaceBetweenWide: 24,
  breakpointSpacePx: 395,
};

/** Remount tokens so Swiper re-inits when layout mode changes */
export const GALLERY_REMOUNT = {
  mobile: "m",
  tablet: "t",
  desktop: "d",
};

export function galleryRemountKey(narrowViewport, galleryDesktopWide) {
  if (narrowViewport) return GALLERY_REMOUNT.mobile;
  if (galleryDesktopWide) return GALLERY_REMOUNT.desktop;
  return GALLERY_REMOUNT.tablet;
}

/** Initial slide: center when there are 3+ images */
export function defaultInitialSlideIndex(slideCount) {
  return slideCount >= 3 ? 1 : 0;
}
