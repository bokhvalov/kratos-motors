import { useTranslation } from 'react-i18next'
import { PageMeta } from '../components/shared/PageMeta'
import { Breadcrumb } from '../components/shared/Breadcrumb'
import { AboutSection } from '../components/shared/AboutSection'
import { WhyTrustSection } from '../components/shared/WhyTrustSection'
import { LeadFormSection } from '../components/shared/LeadFormSection'
import { RealizationsSection } from '../components/shared/RealizationsSection'
import { FinalCtaSection } from '../components/shared/FinalCtaSection'
import { getAssetUrl, getAssetSrcSet, ASSETS } from '../lib/assets'
import './Page.css'
import './home/cta-strip.css'

export function AboutPage() {
  const { t } = useTranslation()

  return (
    <>
      <PageMeta title={t('pages.about.metaTitle')} description={t('pages.about.metaDescription')} />

      <div className="page-container about-page">
        <Breadcrumb items={[{ label: t('nav.about'), to: null }]} />
        <h1 className="visually-hidden">{t('pages.about.title')}</h1>
      </div>
      <AboutSection aboutPage />
      <WhyTrustSection aboutPage />
      <section className="home-cta-strip home-cta-strip--no-overlay" aria-label={t('pages.about.title')}>
        <div className="home-cta-strip__bg" aria-hidden="true">
          <img
            src={getAssetUrl('about-us', ASSETS['about-us'].banner)}
            srcSet={getAssetSrcSet('about-us', ASSETS['about-us'].banner)}
            alt=""
          />
        </div>
      </section>

      <RealizationsSection />
      <FinalCtaSection />
      <LeadFormSection />
    </>
  )
}
