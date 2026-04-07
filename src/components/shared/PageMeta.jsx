import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { getCanonicalUrl } from '../../lib/site'

const DEFAULT_TITLE = 'Kratos Motors — Serwis i tuning | Wrocław'
const DEFAULT_DESC =
  'Kratos Motors — serwis i tuning samochodów we Wrocławiu. Audi, BMW, Mercedes, Porsche, Volkswagen, Ford. Umów wizytę.'

const OG_LOCALE = { pl: 'pl_PL', en: 'en_US', ru: 'ru_RU' }

function setMetaName(name, content) {
  if (content == null || content === '') return
  let el = document.querySelector(`meta[name="${name}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute('name', name)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function setMetaProperty(property, content) {
  if (content == null || content === '') return
  let el = document.querySelector(`meta[property="${property}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute('property', property)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

/**
 * Sets document title, meta description, canonical, Open Graph, Twitter Card, robots.
 */
export function PageMeta({ title, description, noIndex = false }) {
  const { pathname } = useLocation()
  const { i18n } = useTranslation()

  useEffect(() => {
    const docTitle = title || DEFAULT_TITLE
    const desc = description || DEFAULT_DESC
    const canonical = getCanonicalUrl(pathname)
    const langKey = (i18n.resolvedLanguage || i18n.language || 'pl').split('-')[0].toLowerCase()

    document.title = docTitle

    setMetaName('description', desc)

    setMetaProperty('og:title', docTitle)
    setMetaProperty('og:description', desc)
    setMetaProperty('og:type', 'website')
    setMetaProperty('og:url', canonical)
    setMetaProperty('og:locale', OG_LOCALE[langKey] || 'pl_PL')

    setMetaName('twitter:card', 'summary_large_image')
    setMetaName('twitter:title', docTitle)
    setMetaName('twitter:description', desc)

    let link = document.querySelector('link[rel="canonical"]')
    if (!link) {
      link = document.createElement('link')
      link.setAttribute('rel', 'canonical')
      document.head.appendChild(link)
    }
    link.setAttribute('href', canonical)

    if (noIndex) {
      setMetaName('robots', 'noindex, nofollow')
    } else {
      setMetaName('robots', 'index, follow')
    }
  }, [title, description, noIndex, pathname, i18n.resolvedLanguage, i18n.language])

  return null
}
