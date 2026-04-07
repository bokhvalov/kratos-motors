import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/** Scroll window to top on client-side navigation (SPA default keeps scroll position). */
export function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}
