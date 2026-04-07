import { forwardRef } from "react";

export const GalleryEdgeNavButton = forwardRef(function GalleryEdgeNavButton(
  { dir, label, onClick, disabled },
  ref,
) {
  return (
    <button
      ref={ref}
      type="button"
      className={`sports-builds-gallery__edge-btn sports-builds-gallery__edge-btn--${dir}`.trim()}
      aria-label={label}
      onClick={onClick}
      disabled={disabled}
    >
      <svg
        className="sports-builds-gallery__edge-icon"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M15 12H7M7 12l4.25-3.75M7 12l4.25 3.75"
          stroke="currentColor"
          strokeWidth="1.35"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
});

GalleryEdgeNavButton.displayName = "GalleryEdgeNavButton";
