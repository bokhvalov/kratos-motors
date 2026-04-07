/** Public site origin for canonical URLs, Open Graph, JSON-LD (override with VITE_SITE_URL in build). */
export const SITE_ORIGIN = (
  typeof import.meta.env.VITE_SITE_URL === 'string' && import.meta.env.VITE_SITE_URL.trim()
    ? import.meta.env.VITE_SITE_URL.trim().replace(/\/$/, '')
    : 'https://kratosmotors.pl'
)

/**
 * Absolute canonical URL for the current route (includes Vite `base` / GitHub Pages subpath).
 * @param {string} pathname - `location.pathname` from React Router (no query string).
 */
export function getCanonicalUrl(pathname = '/') {
  const base = (import.meta.env.BASE_URL || '/').replace(/\/+$/, '')
  const p = pathname || '/'
  const suffix = p === '/' ? '' : p
  const combined = base ? `${base}${suffix}` : suffix || '/'
  const normalized = combined.replace(/([^:]\/)\/+/g, '$1') || '/'
  return `${SITE_ORIGIN}${normalized.startsWith('/') ? normalized : `/${normalized}`}`
}

export const SITE_MAPS_URL =
  'https://maps.app.goo.gl/WhrnoPYuWiHGzspB9'

export const SITE_MAP_EMBED_URL =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4976.748872375242!2d16.943242111346795!3d51.09585175534523!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x470fc178c20d925d%3A0x2bb0cb6a185c6194!2sKratos%20Motors!5e0!3m2!1spl!2spl!4v1774220056640!5m2!1spl!2spl'

export const SITE_MAP_DIRECTIONS_URL = 'https://www.google.com/maps?cid=3148239796067656084&g_mp=CiVnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLkdldFBsYWNlEAIYASAA&hl=pl&gl=PL&source=embed'

export const SITE_PHONE_TEL = '+48516520380'

export const SITE_SOCIAL = {
  instagram: 'https://www.instagram.com/kratos_motors/',
  telegram: 'https://t.me/+48516520380',
  whatsapp: 'https://wa.me/48516520380',
}
