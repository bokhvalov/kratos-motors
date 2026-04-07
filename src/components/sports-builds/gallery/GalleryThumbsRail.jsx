import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import { getAssetUrl, getAssetSrcSet } from "../../../lib/assets";
import { SWIPER_THUMBS } from "./constants";
import { getThumbsFreeMode } from "./thumbsFreeModeParams";

export function GalleryThumbsRail({
  folder,
  slides,
  slideCount,
  remountKey,
  safeSlideIndex,
  activeIndex,
  narrowViewport,
  galleryDesktopWide,
  onSwiper,
  onSlideChange,
  onClick,
}) {
  const freeMode = getThumbsFreeMode(narrowViewport, galleryDesktopWide);
  const bp = SWIPER_THUMBS.breakpointSpacePx;

  return (
    <div className="sports-builds-gallery__thumb-rail">
      <div className="sports-builds-gallery__thumb-viewport">
        <Swiper
          key={`${slideCount}-thumbs-${remountKey}`}
          modules={[FreeMode]}
          onSwiper={onSwiper}
          slidesPerView={SWIPER_THUMBS.slidesPerView}
          slidesPerGroup={SWIPER_THUMBS.slidesPerGroup}
          initialSlide={safeSlideIndex}
          slideToClickedSlide={!narrowViewport}
          freeMode={freeMode}
          watchSlidesProgress
          spaceBetween={SWIPER_THUMBS.spaceBetweenBase}
          breakpoints={{
            [bp]: { spaceBetween: SWIPER_THUMBS.spaceBetweenWide },
          }}
          className="sports-builds-gallery__thumbs-swiper"
          onSlideChange={onSlideChange}
          onClick={onClick}
        >
          {slides.map((filename, i) => (
            <SwiperSlide
              key={`${i}-${filename}`}
              className={`sports-builds-gallery__thumb-slide${i === activeIndex ? " sports-builds-gallery__thumb-slide--active" : ""}`.trim()}
            >
              <div className="sports-builds-gallery__thumb-inner">
                <img
                  src={getAssetUrl(folder, filename)}
                  srcSet={getAssetSrcSet(folder, filename)}
                  alt=""
                  decoding="async"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
