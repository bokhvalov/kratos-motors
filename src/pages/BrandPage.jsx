import { useParams, Navigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { PageMeta } from '../components/shared/PageMeta'
import { BrandPageSections } from '../components/shared/BrandPageSections'
import { resolveBrandPage } from '../lib/brandPageData'
import './Page.css'

export function BrandPage() {
  const { brand } = useParams()
  const { t } = useTranslation()
  const resolved = resolveBrandPage(brand)

  if (!resolved) {
    return <Navigate to="/404" replace />
  }

  const { slug, brandData, folder } = resolved
  const brandLabel = t(`nav.brands.${slug}`)

  return (
    <>
      <PageMeta
        title={t('pages.brands.metaTitle', { brand: brandLabel })}
        description={t('pages.brands.metaDescription', { brand: brandLabel })}
      />

      <BrandPageSections brandSlug={slug} brandLabel={brandLabel} folder={folder} brandData={brandData} />
    </>
  )
}
