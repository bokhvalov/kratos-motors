const DEFAULT_VIEWPORT = 'width=device-width, initial-scale=1.0'

function resetStuckZoom() {
  const meta = document.querySelector('meta[name="viewport"]')
  if (!meta) return

  meta.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0')
  window.setTimeout(() => {
    meta.setAttribute('content', DEFAULT_VIEWPORT)
  }, 150)
}

function isMobileLikeViewport() {
  return (
    window.matchMedia('(max-width: 1024px)').matches ||
    window.matchMedia('(pointer: coarse)').matches
  )
}

/**
 * iOS often keeps page zoom after input focus when the device rotates.
 * Nudge the viewport meta so the engine snaps back to scale 1, then restore
 * the normal tag (no permanent maximum-scale — users can still pinch-zoom).
 */
export function installViewportZoomResetOnOrientation() {
  if (typeof window === 'undefined' || !isMobileLikeViewport()) {
    return () => {}
  }

  let scheduled
  const schedule = () => {
    window.clearTimeout(scheduled)
    scheduled = window.setTimeout(() => {
      scheduled = undefined
      resetStuckZoom()
    }, 320)
  }

  window.addEventListener('orientationchange', schedule)

  const orientation = window.screen?.orientation
  if (orientation && typeof orientation.addEventListener === 'function') {
    orientation.addEventListener('change', schedule)
  }

  return () => {
    window.removeEventListener('orientationchange', schedule)
    orientation?.removeEventListener?.('change', schedule)
    window.clearTimeout(scheduled)
  }
}
