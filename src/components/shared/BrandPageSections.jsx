import { useMemo } from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { BRAND_SERVICES_SECTION_I18N } from '../../lib/brandPageData'
import { LeadFormSection } from './LeadFormSection'
import { RealizationsSection } from './RealizationsSection'
import { BrandHeroSection } from './BrandHeroSection'
import { BrandFactSection } from './BrandFactSection'
import { BrandProcessSection } from './BrandProcessSection'
import { BrandServicesSection } from './BrandServicesSection'

const brandDataPropType = PropTypes.shape({
  heroImage: PropTypes.string.isRequired,
  factImage: PropTypes.string.isRequired,
  factImageSide: PropTypes.oneOf(['left', 'right']).isRequired,
  processImage: PropTypes.string.isRequired,
  servicesImage: PropTypes.string.isRequired,
  gallery: PropTypes.arrayOf(PropTypes.string).isRequired,
  formImage: PropTypes.string.isRequired,
})

function buildServicesSections(t) {
  return BRAND_SERVICES_SECTION_I18N.map(([titleKey, itemsKey]) => ({
    title: t(titleKey),
    items: t(itemsKey, { returnObjects: true }),
  }))
}

export function BrandPageSections({ brandSlug, brandLabel, folder, brandData }) {
  const { t } = useTranslation()

  const processItems = useMemo(() => {
    const raw = t('pages.brands.processCards', { returnObjects: true })
    return Array.isArray(raw) ? raw : []
  }, [t])

  const servicesSections = useMemo(() => buildServicesSections(t), [t])

  return (
    <>
      <BrandHeroSection
        brandLabel={brandLabel}
        brandSlug={brandSlug}
        imageFilename={brandData.heroImage}
        folder={folder}
      />

      <BrandFactSection
        title={t(`pages.brands.facts.${brandSlug}.title`)}
        body={t(`pages.brands.facts.${brandSlug}.body`)}
        imageFilename={brandData.factImage}
        folder={folder}
        imageSide={brandData.factImageSide}
      />

      <BrandProcessSection
        title={t('pages.brands.processTitle')}
        items={processItems}
        imageFilename={brandData.processImage}
        folder={folder}
      />

      <BrandServicesSection
        title={t('pages.brands.servicesTitle')}
        imageFilename={brandData.servicesImage}
        folder={folder}
        sections={servicesSections}
      />

      <RealizationsSection
        folder={folder}
        images={brandData.gallery}
        headingKey="home.realizationsHeading"
      />

      <LeadFormSection
        imageFolder={folder}
        imageFilename={brandData.formImage}
        imageSide="right"
      />
    </>
  )
}

BrandPageSections.propTypes = {
  brandSlug: PropTypes.string.isRequired,
  brandLabel: PropTypes.string.isRequired,
  folder: PropTypes.string.isRequired,
  brandData: brandDataPropType.isRequired,
}
