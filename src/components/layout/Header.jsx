import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { UiNavMenuLink } from '../../ui/UiNavMenuLink'
import { UiLogo } from '../../ui/UiLogo'
import { UiFuterLink } from '../../ui/UiFuterLink'
import { UiLanguageRow } from '../../ui/UiLanguageRow'
import { Menu, Logo, Futer, Languages } from '../../ui/variants'
import { useTranslation } from 'react-i18next'
import { UiButton } from '../../ui/UiButton'
import { Button1 } from '../../ui/variants'
import { HeaderSocialIcons } from './HeaderSocialIcons'
import { SITE_MAPS_URL, SITE_PHONE_TEL } from '../../lib/site'
import { HEADER_ASSETS } from '../../lib/headerAssets'
import { getDirectAssetSrcSet, publicAssetUrl } from '../../lib/assets'
import { BRAND_SLUGS } from '../../lib/brandPageData'
import { FuterContactPhoneIcon, FuterContactPinIcon } from '../../ui/icons/FuterContactIcons'
import './Header.css'

/** Normalize i18next locale (e.g. en-US) to pl | en | ru. */
function normalizeLangCode(lng) {
  const raw = (lng || 'pl').toString().split('-')[0].toLowerCase()
  return ['pl', 'en', 'ru'].includes(raw) ? raw : 'pl'
}

function isNavLinkActive(pathname, to) {
  const p = pathname.replace(/\/+$/, '') || '/'
  const target = to.replace(/\/+$/, '') || '/'
  if (target === '/') return p === '/'
  return p === target || p.startsWith(`${target}/`)
}

const LOGO_MARK_SRC = publicAssetUrl('assets/logo.svg')
const LOGO_WORDMARK_SRC = publicAssetUrl('assets/Vector.svg')

const LANG_ROW_VARIANT = {
  pl: Languages.PL_DEFAULT,
  en: Languages.EN_DEFAULT,
  ru: Languages.RU_DEFAULT,
}

/** EN / PL / RU flags — single sprite, positions in CSS */
function LangFlagSprite({ code }) {
  const c = normalizeLangCode(code)
  return (
    <span className="lang-flag-sprite-wrap" aria-hidden="true">
      <img
        src={HEADER_ASSETS.langFlags}
        srcSet={getDirectAssetSrcSet(HEADER_ASSETS.langFlags)}
        alt=""
        className={`lang-flag-sprite-img lang-flag-sprite-img--${c}`}
        decoding="async"
      />
    </span>
  )
}

function LangTriggerContent({ label, langCode }) {
  return (
    <span className="lang-inner">
      <LangFlagSprite code={langCode} />
      <span className="lang-label">{label}</span>
    </span>
  )
}

export function Header({ onOpenBooking }) {
  const { t, i18n } = useTranslation()
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const langSwitcherRef = useRef(null)

  useEffect(() => {
    if (!menuOpen) return
    const mq = window.matchMedia('(max-width: 1000px)')
    if (!mq.matches) return
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prevOverflow
    }
  }, [menuOpen])

  useEffect(() => {
    if (!langOpen) return
    function handlePointerDown(event) {
      const root = langSwitcherRef.current
      if (!root || root.contains(event.target)) return
      setLangOpen(false)
    }
    document.addEventListener('mousedown', handlePointerDown)
    document.addEventListener('touchstart', handlePointerDown, { passive: true })
    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
      document.removeEventListener('touchstart', handlePointerDown)
    }
  }, [langOpen])

  const navItems = [
    { to: '/', label: t('nav.home') },
    { to: '/services', label: t('nav.services') },
    { to: '/about', label: t('nav.about') },
    { to: '/sports-car-builds', label: t('nav.sportsCarBuilds') },
    ...BRAND_SLUGS.map((slug) => ({ to: `/${slug}`, label: t(`nav.brands.${slug}`) })),
    { to: '/portfolio', label: t('nav.portfolio') },
  ]

  const languages = [
    { code: 'pl', label: 'PL' },
    { code: 'en', label: 'EN' },
    { code: 'ru', label: 'RU' },
  ]

  const currentLang = normalizeLangCode(i18n.resolvedLanguage || i18n.language)
  const currentLangLabel = languages.find((l) => l.code === currentLang)?.label ?? 'PL'

  const socialLabels = {
    telegram: t('header.socialTelegram'),
    instagram: t('header.socialInstagram'),
    whatsapp: t('header.socialWhatsapp'),
  }

  const closeMenu = () => {
    setMenuOpen(false)
    setLangOpen(false)
  }

  return (
    <header className="site-header" role="banner">

      <div className="header-row header-row--desktop">
        <div className="header-shell header-row-desktop-inner">
          <UiLogo
            variant={Logo.DESKTOP}
            markSrc={LOGO_MARK_SRC}
            wordmarkSrc={LOGO_WORDMARK_SRC}
            to="/"
            className="header-brand"
            aria-label={t('footer.logoAria')}
          />

          <div className="header-contacts" role="region" aria-label={t('header.topBarLabel')}>
            <div className="header-contacts__line">
              <UiFuterLink href={`tel:${SITE_PHONE_TEL}`} variant={Futer['1_HEADER']} className="header-futer-link">
                <span className="header-futer-icon-wrap" aria-hidden="true">
                  <FuterContactPhoneIcon className="header-futer-icon-svg header-futer-icon-svg--tel" />
                </span>
                {t('header.phone')}
              </UiFuterLink>
              <UiFuterLink
                href={SITE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                variant={Futer['1_HEADER']}
                className="header-futer-link header-futer-link--address"
              >
                <span className="header-futer-icon-wrap" aria-hidden="true">
                  <FuterContactPinIcon className="header-futer-icon-svg header-futer-icon-svg--pin" />
                </span>
                <span className="header-addr-u">{t('header.address')}</span>
              </UiFuterLink>
            </div>
            <HeaderSocialIcons labels={socialLabels} />
            <UiButton variant={Button1['5']} onClick={onOpenBooking} className="header-cta-desktop">
              {t('header.cta')}
            </UiButton>
          </div>
        </div>
      </div>

      <div className="header-row header-row--mobile">
        <button
          type="button"
          className="header-menu-hit"
          aria-expanded={menuOpen}
          aria-controls="main-nav-menu"
          aria-label={menuOpen ? t('a11y.closeMenu') : t('a11y.openMenu')}
          onClick={() => {
            setMenuOpen((o) => !o)
            setLangOpen(false)
          }}
        >
          <span className="hamburger-icon" aria-hidden="true">
            <span className="hamburger-line hamburger-line--top" />
            <span className="hamburger-line hamburger-line--mid" />
            <span className="hamburger-line hamburger-line--bot" />
          </span>
        </button>

        <UiLogo
          variant={Logo.MOBILE}
          markSrc={LOGO_MARK_SRC}
          wordmarkSrc={LOGO_WORDMARK_SRC}
          to="/"
          className="header-brand header-brand--mobile"
          aria-label={t('footer.logoAria')}
          onClick={closeMenu}
        />

        <a
          href={`tel:${SITE_PHONE_TEL}`}
          className="header-mobile-phone"
          aria-label={t('header.phoneLinkLabel')}
        >
          <FuterContactPhoneIcon className="header-mobile-phone-icon" />
        </a>
      </div>

      <div className="header-nav-bg">
        <nav
          id="main-nav-menu"
          className={`main-nav ${menuOpen ? 'is-open' : ''}`}
          aria-label={t('a11y.mainNav')}
        >
          <div className="main-nav__cluster">
            <ul className="nav-list">
              {navItems.map(({ to, label }) => (
                <li key={to}>
                  <UiNavMenuLink
                    to={to}
                    variant={isNavLinkActive(location.pathname, to) ? Menu['2'] : Menu['1']}
                    onClick={closeMenu}
                  >
                    {label}
                  </UiNavMenuLink>
                </li>
              ))}
            </ul>
            <div className="main-nav__lang">
              <div className="lang-switcher" ref={langSwitcherRef}>
                <button
                  type="button"
                  className="lang-trigger lang-trigger--nav"
                  aria-expanded={langOpen}
                  aria-haspopup="listbox"
                  aria-label={t('header.chooseLanguage')}
                  onClick={() => setLangOpen((o) => !o)}
                >
                  <LangTriggerContent label={currentLangLabel} langCode={currentLang} />
                </button>
                {langOpen && (
                  <ul className="lang-list" role="listbox" aria-label={t('header.languageListLabel')}>
                    {languages.map((lang) => {
                      const selected = currentLang === lang.code
                      return (
                        <li key={lang.code} role="presentation">
                          <button
                            type="button"
                            role="option"
                            aria-selected={selected}
                            className={selected ? 'active' : undefined}
                            onClick={() => {
                              i18n.changeLanguage(lang.code)
                              setLangOpen(false)
                            }}
                          >
                            <UiLanguageRow as="span" variant={LANG_ROW_VARIANT[lang.code]} className="lang-option-row">
                              <span className="lang-option-flag" aria-hidden="true">
                                <LangFlagSprite code={lang.code} />
                              </span>
                              <span className="lang-option-label">{lang.label}</span>
                            </UiLanguageRow>
                          </button>
                        </li>
                      )
                    })}
                  </ul>
                )}
              </div>
            </div>
          </div>

          <div className="main-nav__mobile-extra">
            <UiFuterLink href={`tel:${SITE_PHONE_TEL}`} variant={Futer['1_HEADER']} className="header-futer-link">
              <span className="header-futer-icon-wrap" aria-hidden="true">
                <FuterContactPhoneIcon className="header-futer-icon-svg header-futer-icon-svg--tel" />
              </span>
              {t('header.phone')}
            </UiFuterLink>
            <UiFuterLink
              href={SITE_MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              variant={Futer['1_HEADER']}
              className="header-futer-link header-futer-link--address"
            >
              <span className="header-futer-icon-wrap" aria-hidden="true">
                <FuterContactPinIcon className="header-futer-icon-svg header-futer-icon-svg--pin" />
              </span>
              <span className="header-addr-u">{t('header.address')}</span>
            </UiFuterLink>
            <HeaderSocialIcons labels={socialLabels} />
            <UiButton variant={Button1['5']} onClick={() => { onOpenBooking(); closeMenu(); }} className="header-cta-mobile-panel">
              {t('header.cta')}
            </UiButton>
          </div>
        </nav>
      </div>

      <button
        type="button"
        className={`header-nav-scrim ${menuOpen ? 'header-nav-scrim--visible' : ''}`}
        aria-label={t('a11y.closeMenu')}
        aria-hidden={!menuOpen}
        tabIndex={menuOpen ? 0 : -1}
        onClick={closeMenu}
      />
    </header>
  )
}
