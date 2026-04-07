import { GalleryEdgeNavButton } from "./GalleryEdgeNavButton";

export function GalleryPaginationBar({
  prevLabel,
  nextLabel,
  dotsAriaLabel,
  getDotAriaLabel,
  slideCount,
  activeIndex,
  prevNavRef,
  nextNavRef,
  canPrev,
  canNext,
  onPrev,
  onNext,
  onDotClick,
}) {
  return (
    <div className="sports-builds-gallery__pagination-row">
      <GalleryEdgeNavButton ref={prevNavRef} dir="prev" label={prevLabel} onClick={onPrev} disabled={!canPrev} />
      <div className="sports-builds-gallery__dots" aria-label={dotsAriaLabel}>
        {Array.from({ length: slideCount }, (_, i) => (
          <button
            key={i}
            type="button"
            className={`sports-builds-gallery__dot ${i === activeIndex ? "sports-builds-gallery__dot--active" : ""}`.trim()}
            aria-label={getDotAriaLabel(i)}
            aria-current={i === activeIndex ? "true" : undefined}
            onClick={() => onDotClick(i)}
          />
        ))}
      </div>
      <GalleryEdgeNavButton ref={nextNavRef} dir="next" label={nextLabel} onClick={onNext} disabled={!canNext} />
    </div>
  );
}
