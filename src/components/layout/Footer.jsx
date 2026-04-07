import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { SITE_MAP_EMBED_URL, SITE_MAP_DIRECTIONS_URL, SITE_PHONE_TEL } from '../../lib/site'
import { HEADER_ASSETS } from '../../lib/headerAssets'
import { FuterContactPhoneIcon, FuterContactPinIcon } from '../../ui/icons/FuterContactIcons'
import { HeaderSocialIcons } from './HeaderSocialIcons'
import { UiTextLink } from '../../ui/UiTextLink'
import { UiNavMenuLink } from '../../ui/UiNavMenuLink'
import { UiLogo } from '../../ui/UiLogo'
import { UiFuterLink } from '../../ui/UiFuterLink'
import { UiHeading } from '../../ui/UiHeading'
import { BRAND_SLUGS } from '../../lib/brandPageData'
import { publicAssetUrl } from '../../lib/assets'
import { NavigationLink, Menu, Logo, Futer, KratosText } from '../../ui/variants'
import './Footer.css'

const LOGO_MARK_SRC = publicAssetUrl('assets/logo.svg')
const LOGO_WORDMARK_SRC = publicAssetUrl('assets/Vector.svg')

function FooterIconClock() {
  return (
    <span className="footer-futer-icon-wrap" aria-hidden="true">
      <img
        src={HEADER_ASSETS.clock}
        alt=""
        width={16}
        height={16}
        className="footer-futer-icon-img"
        decoding="async"
      />
    </span>
  )
}

export function Footer() {
  const { t } = useTranslation()
  const location = useLocation()
  const year = new Date().getFullYear()

  const footerBarPrimaryLinks = new Set(['/', '/services', '/about'])

  const barNavItems = [
    { to: '/', label: t('nav.home') },
    { to: '/services', label: t('nav.services') },
    { to: '/about', label: t('nav.about') },
    { to: '/sports-car-builds', label: t('nav.sportsCarBuilds') },
    ...BRAND_SLUGS.map((slug) => ({ to: `/${slug}`, label: t(`nav.brands.${slug}`) })),
    { to: '/portfolio', label: t('nav.portfolio'), portfolio: true },
  ]

  const socialLabels = {
    telegram: t('header.socialTelegram'),
    instagram: t('header.socialInstagram'),
    whatsapp: t('header.socialWhatsapp'),
  }

  function isBarLinkActive(to) {
    const p = location.pathname.replace(/\/+$/, '') || '/'
    const target = to.replace(/\/+$/, '') || '/'
    return p === target
  }

  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div className="footer-main-inner">
          <div className="footer-aside">
            <div className="footer-block">
              <UiHeading as="h3" variant={KratosText.H5_SEMIBOLD_RED} className="footer-heading">
                {t('footer.addressLabel')}
              </UiHeading>
              <div className="footer-line">
                <UiFuterLink
                  href={SITE_MAP_DIRECTIONS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant={Futer['5']}
                  className="footer-address-link"
                >
                  <span className="footer-futer-icon-wrap" aria-hidden="true">
                    <FuterContactPinIcon className="footer-futer-icon-svg footer-futer-icon-svg--pin" />
                  </span>
                  {t('footer.address')}
                </UiFuterLink>
              </div>
              <div className="footer-route-line">
                <UiTextLink
                  href={SITE_MAP_DIRECTIONS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant={NavigationLink['1']}
                  className="footer-route-link"
                >
                  {t('footer.route')}
                </UiTextLink>
              </div>
            </div>

            <div className="footer-block">
              <UiHeading as="h3" variant={KratosText.H5_SEMIBOLD_RED} className="footer-heading">
                {t('footer.phoneLabel')}
              </UiHeading>
              <div className="footer-line">
                <UiFuterLink href={`tel:${SITE_PHONE_TEL}`} variant={Futer['1_FUTER']} className="footer-phone-link">
                  <span className="footer-futer-icon-wrap" aria-hidden="true">
                    <FuterContactPhoneIcon className="footer-futer-icon-svg footer-futer-icon-svg--tel" />
                  </span>
                  {t('footer.phone')}
                </UiFuterLink>
              </div>
            </div>

            <div className="footer-block">
              <UiHeading as="h3" variant={KratosText.H5_SEMIBOLD_RED} className="footer-heading">
                {t('footer.hours')}
              </UiHeading>
              <div className="footer-line">
                <FooterIconClock />
                <span className="footer-hours-text">{t('footer.hoursValue')}</span>
              </div>
              <div className="footer-line">
                <FooterIconClock />
                <span className="footer-hours-text">{t('footer.hoursWeekend')}</span>
              </div>
            </div>

            <div className="footer-block">
              <UiHeading as="h3" variant={KratosText.H5_SEMIBOLD_RED} className="footer-heading">
                {t('footer.socialHeading')}
              </UiHeading>
              <HeaderSocialIcons labels={socialLabels} />
            </div>
          </div>

          <div className="footer-map-shell">
            <div className="footer-map-frame">
              <iframe
                title={t('footer.mapIframeTitle')}
                className="footer-map-iframe"
                src={SITE_MAP_EMBED_URL}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bar">
        <div className="footer-bar-inner">
          <UiLogo
            variant={Logo.DESKTOP}
            markSrc={LOGO_MARK_SRC}
            wordmarkSrc={LOGO_WORDMARK_SRC}
            to="/"
            className="footer-bar-brand"
            aria-label={t('footer.logoAria')}
          />

          <nav className="footer-bar-nav" aria-label={t('a11y.footerNav')}>
            <ul className="footer-bar-nav-list">
              {barNavItems.map(({ to, label }) => {
                const active = isBarLinkActive(to)
                const hideOnTablet = !footerBarPrimaryLinks.has(to)
                return (
                  <li key={to} className={hideOnTablet ? 'footer-bar-nav-item footer-bar-nav-item--tablet-hide' : 'footer-bar-nav-item'}>
                    <UiNavMenuLink to={to} variant={active ? Menu['4'] : Menu['1']} className="footer-bar-nav-link">
                      {label}
                    </UiNavMenuLink>
                  </li>
                )
              })}
            </ul>
          </nav>

          <div className="footer-bar-legal">
            <p className="footer-bar-copyright">
              {t('footer.copyrightLine', { year })}
            </p>
            <Link to="/privacy-policy" className="footer-bar-privacy">
              {t('footer.privacyLink')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
