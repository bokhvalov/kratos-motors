import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/free-mode";

import { GalleryMainSwiper } from "./GalleryMainSwiper";
import { GalleryPaginationBar } from "./GalleryPaginationBar";
import { GalleryThumbsRail } from "./GalleryThumbsRail";
import { useGalleryController } from "./useGalleryController";

export function SportsCarBuildsGallery({ folder, slides }) {
  const { t } = useTranslation();
  const {
    slideCount,
    remountKey,
    safeSlideIndex,
    navReady,
    prevNavRef,
    nextNavRef,
    bindMainSwiper,
    releaseMainSwiper,
    handleMainSlideChange,
    setThumbsSwiper,
    handleThumbsSlideChange,
    handleThumbsClick,
    activeIndex,
    narrowViewport,
    galleryDesktopWide,
    canPrev,
    canNext,
    goPrev,
    goNext,
    goToIndex,
  } = useGalleryController(slides);

  const onBeforeInitNavigation = useCallback((swiper) => {
    const nav = swiper.params.navigation;
    if (nav && typeof nav === "object") {
      nav.prevEl = prevNavRef.current;
      nav.nextEl = nextNavRef.current;
    }
  }, [prevNavRef, nextNavRef]);

  if (!slides?.length) return null;

  return (
    <section className="sports-builds-gallery" aria-label={t("pages.sportsCarBuilds.galleryAriaLabel")}>
      <div className="sports-builds-gallery__frame layout-content">
        <GalleryMainSwiper
          folder={folder}
          slides={slides}
          slideCount={slideCount}
          remountKey={remountKey}
          safeSlideIndex={safeSlideIndex}
          navReady={navReady}
          prevNavRef={prevNavRef}
          nextNavRef={nextNavRef}
          onBeforeInitNavigation={onBeforeInitNavigation}
          onSwiper={bindMainSwiper}
          onDestroy={releaseMainSwiper}
          onSlideChange={handleMainSlideChange}
        />

        <GalleryThumbsRail
          folder={folder}
          slides={slides}
          slideCount={slideCount}
          remountKey={remountKey}
          safeSlideIndex={safeSlideIndex}
          activeIndex={activeIndex}
          narrowViewport={narrowViewport}
          galleryDesktopWide={galleryDesktopWide}
          onSwiper={setThumbsSwiper}
          onSlideChange={handleThumbsSlideChange}
          onClick={handleThumbsClick}
        />

        <GalleryPaginationBar
          prevLabel={t("pages.sportsCarBuilds.galleryPrev")}
          nextLabel={t("pages.sportsCarBuilds.galleryNext")}
          dotsAriaLabel={t("pages.sportsCarBuilds.galleryDots")}
          getDotAriaLabel={(i) => t("pages.sportsCarBuilds.galleryGoTo", { n: i + 1 })}
          slideCount={slideCount}
          activeIndex={activeIndex}
          prevNavRef={prevNavRef}
          nextNavRef={nextNavRef}
          canPrev={canPrev}
          canNext={canNext}
          onPrev={goPrev}
          onNext={goNext}
          onDotClick={goToIndex}
        />
      </div>
    </section>
  );
}
