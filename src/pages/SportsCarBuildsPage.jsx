import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { UiButton } from '../ui/UiButton'
import { Button1 } from '../ui/variants'
import { PageMeta } from '../components/shared/PageMeta'
import { Breadcrumb } from '../components/shared/Breadcrumb'
import { SportsCarBuildsGallery } from '../components/sports-builds/gallery/SportsCarBuildsGallery'
import { useOpenBooking } from '../context/BookingContext'
import { getAssetUrl, getAssetSrcSet } from '../lib/assets'
import { HEADER_ASSETS } from '../lib/headerAssets'
import { SITE_SOCIAL } from '../lib/site'
import {
  FOLDER,
  SPORTS_BUILD_CO_ROBIMY_IMG,
  SPORTS_BUILD_DRIFT_IMG,
  SPORTS_BUILD_HERO,
  getSportsBuildGallerySlides,
} from '../lib/sportsCarBuildsPageData'
import './Page.css'
import './sports-car-builds.css'

function useNarrowGallery() {
  const [narrow, setNarrow] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(max-width: 744px)').matches,
  )

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 744px)')
    const onChange = () => setNarrow(mq.matches)
    onChange()
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return narrow
}

function useMobileCta() {
  const [mobile, setMobile] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(max-width: 394px)').matches,
  )

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 394px)')
    const onChange = () => setMobile(mq.matches)
    onChange()
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return mobile
}

export function SportsCarBuildsPage() {
  const { t } = useTranslation()
  const openBooking = useOpenBooking()
  const narrowGallery = useNarrowGallery()
  const mobileCta = useMobileCta()
  const slides = useMemo(() => getSportsBuildGallerySlides(narrowGallery), [narrowGallery])

  const coItems = t('pages.sportsCarBuilds.coRobimyItems', { returnObjects: true })
  const listItems = Array.isArray(coItems) ? coItems : []

  return (
    <>
      <PageMeta
        title={t('pages.sportsCarBuilds.metaTitle')}
        description={t('pages.sportsCarBuilds.metaDescription')}
      />

      <div className="sports-builds">
        <div className="page-container sports-builds__crumb-mobile">
          <Breadcrumb items={[{ label: t('nav.sportsCarBuilds'), to: null }]} />
        </div>

        <section className="sports-builds-hero" aria-labelledby="sports-builds-hero-title">
          <div className="sports-builds-hero__bg" aria-hidden="true">
            <img
              src={getAssetUrl(FOLDER, SPORTS_BUILD_HERO)}
              srcSet={getAssetSrcSet(FOLDER, SPORTS_BUILD_HERO)}
              alt=""
              fetchPriority="high"
              decoding="async"
            />
          </div>

          <div className="sports-builds-hero__mobile-visual" aria-hidden="true">
            <img
              src={getAssetUrl(FOLDER, SPORTS_BUILD_HERO)}
              srcSet={getAssetSrcSet(FOLDER, SPORTS_BUILD_HERO)}
              alt=""
              fetchPriority="high"
              decoding="async"
            />
          </div>

          <div className="sports-builds-hero__foreground layout-content">
            <div className="sports-builds-hero__crumb-row">
              <Breadcrumb items={[{ label: t('nav.sportsCarBuilds'), to: null }]} />
            </div>

            <div className="sports-builds-hero__inner sports-builds-hero__inner--desktop sports-builds-hero__inner--tablet-text">
              <h1 id="sports-builds-hero-title" className="sports-builds-hero__title">
                <span className="sports-builds-hero__title-desktop-mobile">{t('pages.sportsCarBuilds.heroTitleDesktop')}</span>
                <span className="sports-builds-hero__title-tablet-line">
                  {t('pages.sportsCarBuilds.heroTitleTabletLine1')}
                </span>
                <span className="sports-builds-hero__title-tablet-line">
                  {t('pages.sportsCarBuilds.heroTitleTabletLine2')}
                </span>
              </h1>

              <p className="sports-builds-hero__lead sports-builds-hero__lead--desktop-mobile">
                {t('pages.sportsCarBuilds.heroLeadDesktop')}
              </p>
              <p className="sports-builds-hero__lead sports-builds-hero__lead--tablet-only">
                {t('pages.sportsCarBuilds.heroLeadTablet')}
              </p>

              <div className="sports-builds-hero__actions sports-builds-hero__actions--desktop-row">
                <UiButton variant={Button1['1']} type="button" onClick={openBooking}>
                  {t('header.cta')}
                </UiButton>
                <UiButton
                  href={SITE_SOCIAL.whatsapp}
                  variant={Button1['3']}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hero-actions__whatsapp"
                >
                  <img
                    src={HEADER_ASSETS.whatsapp}
                    alt=""
                    width={22}
                    height={22}
                    className="sports-builds-hero__whatsapp-icon"
                    decoding="async"
                    aria-hidden="true"
                  />
                  WhatsApp
                </UiButton>
              </div>

              <div className="sports-builds-hero__actions sports-builds-hero__actions--stack sports-builds-hero__actions--tablet-only">
                <UiButton variant={Button1.TABLET1} type="button" onClick={openBooking}>
                  {t('header.cta')}
                </UiButton>
                <UiButton
                  href={SITE_SOCIAL.whatsapp}
                  variant={Button1['3']}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hero-actions__whatsapp"
                >
                  <img
                    src={HEADER_ASSETS.whatsapp}
                    alt=""
                    width={22}
                    height={22}
                    className="sports-builds-hero__whatsapp-icon"
                    decoding="async"
                    aria-hidden="true"
                  />
                  WhatsApp
                </UiButton>
              </div>

              <div className="sports-builds-hero__actions sports-builds-hero__actions--mobile-only">
                <UiButton variant={Button1.MOBILE1} type="button" onClick={openBooking}>
                  {t('header.cta')}
                </UiButton>
              </div>
            </div>
          </div>
        </section>

        <div className="sports-builds-body sports-builds-body--grid">
          <div className="sports-builds-body__text sports-builds-body__co-text">
            <h2 className="sports-builds-body__heading">{t('pages.sportsCarBuilds.sectionCoRobimy')}</h2>
            <ul className="sports-builds-body__list">
              {listItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <figure className="sports-builds-body__figure sports-builds-body__co-fig">
            <img
              src={getAssetUrl(FOLDER, SPORTS_BUILD_CO_ROBIMY_IMG)}
              srcSet={getAssetSrcSet(FOLDER, SPORTS_BUILD_CO_ROBIMY_IMG)}
              alt=""
              decoding="async"
            />
          </figure>

          <figure className="sports-builds-body__figure sports-builds-body__drift-fig">
            <img
              src={getAssetUrl(FOLDER, SPORTS_BUILD_DRIFT_IMG)}
              srcSet={getAssetSrcSet(FOLDER, SPORTS_BUILD_DRIFT_IMG)}
              alt=""
              decoding="async"
            />
          </figure>
          <div className="sports-builds-body__text sports-builds-body__drift-text">
            <h2 className="sports-builds-body__heading">{t('pages.sportsCarBuilds.sectionDrift')}</h2>
            <p className="sports-builds-body__prose">{t('pages.sportsCarBuilds.driftBody')}</p>
          </div>
        </div>

        <SportsCarBuildsGallery folder={FOLDER} slides={slides} />

        <section className="sports-builds-cta" aria-label={t('pages.sportsCarBuilds.ctaAria')}>
          <p className="sports-builds-cta__text">{t('home.ctaStripText')}</p>
          <UiButton
            variant={mobileCta ? Button1.MOBILE1 : Button1.TABLET1}
            type="button"
            onClick={openBooking}
            className="sports-builds-cta__btn"
          >
            {t('header.cta')}
          </UiButton>
        </section>
      </div>
    </>
  )
}
