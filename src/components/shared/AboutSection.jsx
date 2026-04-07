import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { ResponsiveImage } from './ResponsiveImage'
import { getAssetUrl, ASSETS } from '../../lib/assets'
import { UiButton } from '../../ui/UiButton'
import { useOpenBooking } from '../../context/BookingContext'
import { Button1 } from '../../ui/variants'
import './about-section.css'

export function AboutSection({ aboutPage = false }) {
  const { t } = useTranslation()
  const openBooking = useOpenBooking()

  const sectionClass =
    'about-section' + (aboutPage ? ' about-section--about-page' : '')

  return (
    <section className={sectionClass} aria-labelledby="about-heading">
      <div className="about-section__inner">
        <div className="about-section__text">
          <h2 id="about-heading" className="about-section__heading">
            <span className="about-section__heading-muted">{t('home.aboutHeading')} </span>
            <span className="about-section__heading-accent">{t('home.aboutBrand')}</span>
          </h2>
          <p className="about-section__p1">{t('home.aboutP1')}</p>
          <p className="about-section__p2">{t('home.aboutP2')}</p>
          {aboutPage && (
            <UiButton variant={Button1['1']} className="about-section__cta" onClick={openBooking}>
              {t('header.cta')}
            </UiButton>
          )}
        </div>
        <div className="about-section__media">
          <ResponsiveImage
            src={getAssetUrl('about-us', ASSETS['about-us'].side)}
            alt=""
            className="about-section__img"
          />
        </div>
      </div>
    </section>
  )
}

AboutSection.propTypes = {
  aboutPage: PropTypes.bool,
}
