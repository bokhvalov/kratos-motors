import { useTranslation } from 'react-i18next'
import { PageMeta } from '../components/shared/PageMeta'
import { HomePageSections } from '../components/shared/HomePageSections'
import './HomePage.css'

export function HomePage() {
  const { t } = useTranslation()

  return (
    <>
      <PageMeta title={t('home.metaTitle')} description={t('home.metaDescription')} />
      <HomePageSections />
    </>
  )
}
