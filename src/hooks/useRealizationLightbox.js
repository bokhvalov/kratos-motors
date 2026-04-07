import { useCallback, useEffect, useState } from 'react'

/** Lightbox galerii realizacji na home — indeks w ASSETS.home.gallery lub null */
export function useRealizationLightbox() {
  const [openIndex, setOpenIndex] = useState(null)

  useEffect(() => {
    if (openIndex === null) return
    const onKey = (e) => {
      if (e.key === 'Escape') setOpenIndex(null)
    }
    document.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [openIndex])

  const close = useCallback(() => setOpenIndex(null), [])
  return { openIndex, setOpenIndex, close }
}
