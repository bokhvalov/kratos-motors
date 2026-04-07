import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { UiHeading } from '../ui/UiHeading'
import { UiButton } from '../ui/UiButton'
import { KratosText, Button1 } from '../ui/variants'
import { PageMeta } from '../components/shared/PageMeta'
import { Breadcrumb } from '../components/shared/Breadcrumb'
import { ResponsiveImage } from '../components/shared/ResponsiveImage'
import { useOpenBooking } from '../context/BookingContext'
import { useRealizationLightbox } from '../hooks/useRealizationLightbox'
import { getAssetUrl, getAssetSrcSet, ASSETS } from '../lib/assets'
import { MODAL_ASSETS } from '../lib/modalAssets'
import '../components/shared/realizations-section.css'
import './Page.css'

const DESKTOP_COLUMN_COUNT = 4
const PORTFOLIO_TABLET_MAX = 1100
const PORTFOLIO_MOBILE_SINGLE_COL = 394
/** Tablet: number of items shown before “show more” */
const PORTFOLIO_TABLET_INITIAL_VISIBLE = 10

/** Tablet masonry: column width 336px, per-row aspect ratios (336 / height) */
const TABLET_ASPECT_LEFT = [182, 205, 205, 213, 205, 190, 210, 220, 176, 214].map(
  (h) => `336 / ${h}`,
)
const TABLET_ASPECT_RIGHT = [225, 202, 210, 202, 171, 224, 210, 178, 201, 168].map(
  (h) => `336 / ${h}`,
)

function chunkIntoColumns(items, columnCount) {
  const rowsPerColumn = Math.ceil(items.length / columnCount)

  return Array.from({ length: columnCount }, (_, columnIndex) => {
    const start = columnIndex * rowsPerColumn
    const end = start + rowsPerColumn
    return items.slice(start, end)
  })
}

function usePortfolioNarrowLayout() {
  const [narrow, setNarrow] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(`(max-width: ${PORTFOLIO_TABLET_MAX}px)`).matches,
  )

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${PORTFOLIO_TABLET_MAX}px)`)
    const onChange = () => setNarrow(mq.matches)
    onChange()
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return narrow
}

function usePortfolioMobileStack() {
  const [mobile, setMobile] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia(`(max-width: ${PORTFOLIO_MOBILE_SINGLE_COL}px)`).matches,
  )

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${PORTFOLIO_MOBILE_SINGLE_COL}px)`)
    const onChange = () => setMobile(mq.matches)
    onChange()
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return mobile
}

function aspectRatioForGlobalIndex(globalIndex) {
  if (globalIndex % 2 === 0) {
    return TABLET_ASPECT_LEFT[globalIndex / 2] ?? '336 / 200'
  }
  return TABLET_ASPECT_RIGHT[(globalIndex - 1) / 2] ?? '336 / 200'
}

function portfolioImageSizes(isMobileSingle) {
  if (isMobileSingle) {
    return `(max-width: ${PORTFOLIO_MOBILE_SINGLE_COL}px) calc(100vw - 48px), 100vw`
  }
  return `(max-width: ${PORTFOLIO_TABLET_MAX}px) calc((100vw - 104px) / 2), 50vw`
}

export function PortfolioPage() {
  const { t } = useTranslation()
  const openBooking = useOpenBooking()
  const { openIndex, setOpenIndex, close } = useRealizationLightbox()
  const isNarrowPortfolio = usePortfolioNarrowLayout()
  const isMobileSingleCol = usePortfolioMobileStack()
  const [tabletExpanded, setTabletExpanded] = useState(false)

  const workFiles = ASSETS.work
  const desktopRowsPerColumn = Math.ceil(workFiles.length / DESKTOP_COLUMN_COUNT)
  const desktopColumns = chunkIntoColumns(workFiles, DESKTOP_COLUMN_COUNT)

  const tabletHasMore = workFiles.length > PORTFOLIO_TABLET_INITIAL_VISIBLE
  const visibleCount =
    isNarrowPortfolio && tabletHasMore && !tabletExpanded
      ? PORTFOLIO_TABLET_INITIAL_VISIBLE
      : workFiles.length

  const visibleEntries = useMemo(
    () => workFiles.slice(0, visibleCount).map((filename, i) => ({ filename, globalIndex: i })),
    [workFiles, visibleCount],
  )

  const tabletLeft = visibleEntries.filter((e) => e.globalIndex % 2 === 0)
  const tabletRight = visibleEntries.filter((e) => e.globalIndex % 2 === 1)

  const sizesNarrow = portfolioImageSizes(isMobileSingleCol)

  const renderTabletCard = (entry) => (
    <button
      key={`${entry.filename}-${entry.globalIndex}`}
      type="button"
      className="portfolio-page-card portfolio-page-card--tablet"
      style={{ aspectRatio: aspectRatioForGlobalIndex(entry.globalIndex) }}
      onClick={() => setOpenIndex(entry.globalIndex)}
      aria-label={t('home.realizationEnlarge')}
    >
      <ResponsiveImage
        src={getAssetUrl('work', entry.filename)}
        alt=""
        className="portfolio-page-img"
        sizes={sizesNarrow}
        loading={entry.globalIndex < 2 ? 'eager' : 'lazy'}
      />
    </button>
  )

  return (
    <>
      <PageMeta title={t('pages.portfolio.metaTitle')} description={t('pages.portfolio.metaDescription')} />

      <div className="page-container portfolio-page">
        <Breadcrumb items={[{ label: t('nav.portfolio'), to: null }]} />
        <UiHeading as="h1" variant={KratosText.H1_WHITE} className="page-title portfolio-page__title">
          {t('pages.portfolio.title')}
        </UiHeading>

        <div className="portfolio-page-grid portfolio-page-grid--desktop" aria-label={t('nav.portfolio')}>
          {desktopColumns.map((columnFiles, columnIndex) => (
            <div key={`portfolio-col-${columnIndex + 1}`} className="portfolio-page-col">
              {columnFiles.map((filename, rowIndex) => {
                const globalIndex = columnIndex * desktopRowsPerColumn + rowIndex
                return (
                  <button
                    key={`${filename}-${columnIndex + 1}-${rowIndex + 1}`}
                    type="button"
                    className="portfolio-page-card"
                    data-col={columnIndex + 1}
                    data-row={rowIndex + 1}
                    onClick={() => setOpenIndex(globalIndex)}
                    aria-label={t('home.realizationEnlarge')}
                  >
                    <ResponsiveImage
                      src={getAssetUrl('work', filename)}
                      alt=""
                      className="portfolio-page-img"
                      sizes="(max-width: 1440px) 25vw, 360px"
                      loading={globalIndex < 8 ? 'eager' : 'lazy'}
                    />
                  </button>
                )
              })}
            </div>
          ))}
        </div>

        <div className="portfolio-page-tablet" aria-label={t('nav.portfolio')}>
          <div
            className={[
              'portfolio-page-tablet-clip',
              tabletExpanded || !tabletHasMore ? 'portfolio-page-tablet-clip--expanded' : '',
            ]
              .filter(Boolean)
              .join(' ')}
          >
            {isMobileSingleCol ? (
              <div className="portfolio-page-tablet-grid portfolio-page-tablet-grid--single">
                {visibleEntries.map((entry) => renderTabletCard(entry))}
              </div>
            ) : (
              <div className="portfolio-page-tablet-grid">
                <div className="portfolio-page-tablet-col">{tabletLeft.map((e) => renderTabletCard(e))}</div>
                <div className="portfolio-page-tablet-col">{tabletRight.map((e) => renderTabletCard(e))}</div>
              </div>
            )}
          </div>

          {tabletHasMore ? (
            <UiButton
              type="button"
              variant={Button1.TABLET1}
              className="portfolio-page-show-more"
              aria-expanded={tabletExpanded}
              onClick={() => setTabletExpanded((v) => !v)}
            >
              {tabletExpanded ? t('pages.portfolio.showLess') : t('pages.portfolio.showMore')}
            </UiButton>
          ) : null}
        </div>

        <div className="portfolio-page-actions">
          <p className="portfolio-page-cta-copy">{t('home.finalCtaText')}</p>
          <UiButton
            variant={Button1.TABLET1}
            onClick={openBooking}
            className="portfolio-page-booking-btn"
          >
            {t('header.cta')}
          </UiButton>
        </div>
      </div>

      {openIndex !== null && workFiles[openIndex] ? (
        <div
          className="realizations-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={t('home.realizationLightboxLabel')}
          onClick={close}
        >
          <button
            type="button"
            className="realizations-lightbox__close"
            aria-label={t('a11y.close')}
            onClick={(e) => {
              e.stopPropagation()
              close()
            }}
          >
            <img src={MODAL_ASSETS.close} alt="" width={44} height={44} decoding="async" />
          </button>
          <img
            src={getAssetUrl('work', workFiles[openIndex])}
            srcSet={getAssetSrcSet('work', workFiles[openIndex])}
            alt=""
            className="realizations-lightbox__img"
            decoding="async"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      ) : null}
    </>
  )
}
