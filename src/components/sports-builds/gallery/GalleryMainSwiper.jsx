import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Navigation } from "swiper/modules";
import { getAssetUrl, getAssetSrcSet } from "../../../lib/assets";
import { SWIPER_MAIN } from "./constants";

export function GalleryMainSwiper({
  folder,
  slides,
  slideCount,
  remountKey,
  safeSlideIndex,
  navReady,
  prevNavRef,
  nextNavRef,
  onBeforeInitNavigation,
  onSwiper,
  onDestroy,
  onSlideChange,
}) {
  if (!navReady) return null;

  return (
    <Swiper
      key={`${slideCount}-main-${remountKey}`}
      modules={[EffectFade, Navigation]}
      effect="fade"
      speed={SWIPER_MAIN.speed}
      fadeEffect={{ crossFade: true }}
      slidesPerView={SWIPER_MAIN.slidesPerView}
      slidesPerGroup={SWIPER_MAIN.slidesPerGroup}
      spaceBetween={SWIPER_MAIN.spaceBetween}
      initialSlide={safeSlideIndex}
      watchSlidesProgress
      slideToClickedSlide
      navigation={{
        prevEl: prevNavRef.current,
        nextEl: nextNavRef.current,
      }}
      onBeforeInit={onBeforeInitNavigation}
      onSwiper={onSwiper}
      onDestroy={onDestroy}
      onSlideChange={onSlideChange}
      className="sports-builds-gallery__main-swiper"
    >
      {slides.map((filename, i) => (
        <SwiperSlide key={`${i}-${filename}`}>
          <img
            src={getAssetUrl(folder, filename)}
            srcSet={getAssetSrcSet(folder, filename)}
            alt="Zdjecia w galerii"
            decoding="async"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
