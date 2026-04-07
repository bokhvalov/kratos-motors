import { useEffect, useState } from "react";
import { MQ_DESKTOP_WIDE_MIN, MQ_NARROW_MAX, galleryRemountKey } from "./constants";

function readNarrow() {
  return typeof window !== "undefined" && window.matchMedia(MQ_NARROW_MAX).matches;
}

function readDesktopWide() {
  return typeof window !== "undefined" && window.matchMedia(MQ_DESKTOP_WIDE_MIN).matches;
}

export function useGalleryBreakpoints() {
  const [narrowViewport, setNarrowViewport] = useState(readNarrow);
  const [galleryDesktopWide, setGalleryDesktopWide] = useState(readDesktopWide);

  useEffect(() => {
    const mqMobile = window.matchMedia(MQ_NARROW_MAX);
    const mqWide = window.matchMedia(MQ_DESKTOP_WIDE_MIN);
    const onChange = () => {
      setNarrowViewport(mqMobile.matches);
      setGalleryDesktopWide(mqWide.matches);
    };
    onChange();
    mqMobile.addEventListener("change", onChange);
    mqWide.addEventListener("change", onChange);
    return () => {
      mqMobile.removeEventListener("change", onChange);
      mqWide.removeEventListener("change", onChange);
    };
  }, []);

  return {
    narrowViewport,
    galleryDesktopWide,
    remountKey: galleryRemountKey(narrowViewport, galleryDesktopWide),
  };
}
