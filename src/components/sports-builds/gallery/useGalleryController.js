import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { defaultInitialSlideIndex } from "./constants";
import { centerThumbByIndex, isLiveSwiper } from "./swiperUtils";
import { useGalleryBreakpoints } from "./useGalleryBreakpoints";

export function useGalleryController(slides) {
  const slideCount = slides?.length ?? 0;
  const initialIndex = defaultInitialSlideIndex(slideCount);

  const { narrowViewport, galleryDesktopWide, remountKey } = useGalleryBreakpoints();

  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [mainSwiper, setMainSwiper] = useState(null);
  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const [navReady, setNavReady] = useState(false);

  const prevNavRef = useRef(null);
  const nextNavRef = useRef(null);
  const initialThumbLayoutDoneRef = useRef(false);
  const activeIndexRef = useRef(initialIndex);
  const mainSwiperRef = useRef(null);

  useLayoutEffect(() => {
    setNavReady(true);
  }, []);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  useEffect(() => {
    if (!isLiveSwiper(thumbsSwiper) || slideCount === 0) return;
    let cancelled = false;
    const idx = Math.min(activeIndexRef.current, slideCount - 1);
    const run = () => {
      if (cancelled || thumbsSwiper.destroyed) return;
      centerThumbByIndex(thumbsSwiper, Math.max(0, idx), 0);
    };
    const id = window.setTimeout(run, 0);
    const id2 = window.setTimeout(() => {
      run();
      initialThumbLayoutDoneRef.current = true;
    }, 120);
    return () => {
      cancelled = true;
      initialThumbLayoutDoneRef.current = false;
      clearTimeout(id);
      clearTimeout(id2);
    };
  }, [thumbsSwiper, slideCount]);

  const thumbSwiper = isLiveSwiper(thumbsSwiper) ? thumbsSwiper : null;
  const controlledSwiper = narrowViewport ? thumbSwiper : mainSwiper;
  const safeSlideIndex = Math.max(0, Math.min(activeIndex, Math.max(0, slideCount - 1)));
  const canPrev = activeIndex > 0;
  const canNext = activeIndex < slideCount - 1;

  const syncMainToThumbIndex = useCallback((index) => {
    const m = mainSwiperRef.current;
    if (!m || m.destroyed || typeof index !== "number" || index < 0) return;
    if (m.activeIndex !== index) m.slideTo(index);
  }, []);

  const centerFocusedThumb = useCallback(
    (index, speed = 420) => {
      if (!thumbSwiper) return;
      centerThumbByIndex(thumbSwiper, index, speed);
    },
    [thumbSwiper],
  );

  const handleMainSlideChange = useCallback(
    (swiper) => {
      setActiveIndex(swiper.activeIndex);
      if (!initialThumbLayoutDoneRef.current) return;
      centerFocusedThumb(swiper.activeIndex);
    },
    [centerFocusedThumb],
  );

  const handleThumbsSlideChange = useCallback(
    (swiper) => {
      const idx = swiper.activeIndex;
      setActiveIndex(idx);
      syncMainToThumbIndex(idx);
    },
    [syncMainToThumbIndex],
  );

  const handleThumbsClick = useCallback(
    (swiper) => {
      if (narrowViewport) return;
      const idx = swiper.clickedIndex;
      if (typeof idx !== "number" || idx < 0) return;
      setActiveIndex(idx);
      syncMainToThumbIndex(idx);
    },
    [narrowViewport, syncMainToThumbIndex],
  );

  const bindMainSwiper = useCallback((swiper) => {
    mainSwiperRef.current = swiper;
    setMainSwiper(swiper);
    setActiveIndex(swiper.activeIndex);
  }, []);

  const releaseMainSwiper = useCallback(() => {
    mainSwiperRef.current = null;
    setMainSwiper(null);
  }, []);

  const goPrev = useCallback(() => {
    controlledSwiper?.slideTo(Math.max(0, activeIndex - 1));
  }, [controlledSwiper, activeIndex]);

  const goNext = useCallback(() => {
    controlledSwiper?.slideTo(Math.min(slideCount - 1, activeIndex + 1));
  }, [controlledSwiper, activeIndex, slideCount]);

  const goToIndex = useCallback(
    (i) => {
      controlledSwiper?.slideTo(i);
    },
    [controlledSwiper],
  );

  return {
    slideCount,
    narrowViewport,
    galleryDesktopWide,
    remountKey,
    navReady,
    thumbsSwiper,
    setThumbsSwiper,
    mainSwiper,
    thumbSwiper,
    controlledSwiper,
    activeIndex,
    safeSlideIndex,
    canPrev,
    canNext,
    prevNavRef,
    nextNavRef,
    handleMainSlideChange,
    handleThumbsSlideChange,
    handleThumbsClick,
    bindMainSwiper,
    releaseMainSwiper,
    goPrev,
    goNext,
    goToIndex,
  };
}
