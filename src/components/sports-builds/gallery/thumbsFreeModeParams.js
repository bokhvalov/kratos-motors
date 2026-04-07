/** freeMode + sticky psuje slideToClickedSlide — tylko desktop (≥1200); tablet: kliki / swipe bez freeMode */
export function getThumbsFreeMode(narrowViewport, galleryDesktopWide) {
  if (narrowViewport) return false;
  if (!galleryDesktopWide) return false;
  return {
    enabled: true,
    momentum: true,
    momentumRatio: 0.85,
    sticky: true,
  };
}
