import PropTypes from 'prop-types'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { UiHeading } from '../ui/UiHeading'
import { UiButton } from '../ui/UiButton'
import { KratosText, Button1 } from '../ui/variants'
import { PageMeta } from '../components/shared/PageMeta'
import { Breadcrumb } from '../components/shared/Breadcrumb'
import { ServiceCard } from '../components/services/ServiceCard'
import { ServiceDetailModal } from '../components/services/ServiceDetailModal'
import { useOpenBooking } from '../context/BookingContext'
import { getAssetUrl, getAssetSrcSet } from '../lib/assets'
import { SERVICES_SECTIONS, SERVICES_CTA_IMG } from '../lib/servicesPageData'
import './Page.css'
import './services-page.css'

const serviceSectionItemShape = PropTypes.shape({
  img: PropTypes.string.isRequired,
  titleKey: PropTypes.string.isRequired,
  gradient: PropTypes.string,
})

function ServicesSectionCards({ items, onOpenDetails }) {
  return (
    <ul className="services-repairs__grid">
      {items.map((item) => (
        <li key={item.titleKey}>
          <ServiceCard
            img={item.img}
            titleKey={item.titleKey}
            gradient={item.gradient}
            onOpenDetails={() => onOpenDetails(item.titleKey)}
          />
        </li>
      ))}
    </ul>
  )
}

ServicesSectionCards.propTypes = {
  items: PropTypes.arrayOf(serviceSectionItemShape).isRequired,
  onOpenDetails: PropTypes.func.isRequired,
}

export function ServicesPage() {
  const { t } = useTranslation()
  const openBooking = useOpenBooking()
  const [detailTitleKey, setDetailTitleKey] = useState(null)

  const closeDetail = () => setDetailTitleKey(null)
  const bookFromDetail = () => {
    closeDetail()
    openBooking()
  }

  return (
    <>
      <PageMeta title={t('pages.services.metaTitle')} description={t('pages.services.metaDescription')} />

      <div className="page-container services-page">
        <h1 className="visually-hidden">{t('pages.services.title')}</h1>
        <Breadcrumb items={[{ label: t('nav.services'), to: null }]} />

        <div className="services-page__stack">
          {SERVICES_SECTIONS.map((section) => (
            <section
              key={section.id}
              className="services-page__section"
              aria-labelledby={`services-section-${section.id}`}
            >
              <UiHeading
                id={`services-section-${section.id}`}
                as="h2"
                variant={KratosText.H2}
                className="services-page__heading"
              >
                {t(section.titleKey)}
              </UiHeading>

              {section.asideImg ? (
                <div className="services-repairs">
                  <ServicesSectionCards items={section.items} onOpenDetails={setDetailTitleKey} />
                  <figure className="services-repairs__aside" aria-hidden="true">
                    <img
                      src={getAssetUrl('services', section.asideImg)}
                      srcSet={getAssetSrcSet('services', section.asideImg)}
                      alt=""
                      decoding="async"
                    />
                  </figure>
                </div>
              ) : (
                <ServicesSectionCards items={section.items} onOpenDetails={setDetailTitleKey} />
              )}
            </section>
          ))}
        </div>

        <div className="services-page__cta">
          <figure className="services-page__cta-figure">
            <img
              src={getAssetUrl('services', SERVICES_CTA_IMG)}
              srcSet={getAssetSrcSet('services', SERVICES_CTA_IMG)}
              alt=""
              decoding="async"
            />
          </figure>
          <p className="services-page__cta-text">{t('pages.services.ctaBody')}</p>
          <UiButton variant={Button1['1']} type="button" onClick={openBooking} className="services-page__cta-btn">
            {t('header.cta')}
          </UiButton>
        </div>
      </div>

      <ServiceDetailModal
        isOpen={Boolean(detailTitleKey)}
        titleKey={detailTitleKey ?? undefined}
        onClose={closeDetail}
        onBook={bookFromDetail}
      />
    </>
  )
}
