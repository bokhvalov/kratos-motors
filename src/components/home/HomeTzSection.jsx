import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { ResponsiveImage } from '../shared/ResponsiveImage'
import { getAssetUrl, ASSETS } from '../../lib/assets'

export function HomeTzSection() {
  const { t } = useTranslation()

  return (
    <section className="home-tz" aria-labelledby="tz-heading">
      <div className="layout-content">
        <h2 id="tz-heading" className="visually-hidden">
          {t('home.servicesHeading')}
        </h2>
        <div className="home-tz__strip">
          <div className="home-tz__grid">
            {ASSETS.home.tzCards.map((card, i) => (
              <Link
                key={card.titleKey}
                to="/services"
                className={`home-tz__card ${card.large ? 'home-tz__card--large' : ''}`}
              >
                <ResponsiveImage
                  src={getAssetUrl('home', card.img)}
                  alt=""
                  className={`home-tz__img${i === 1 ? ' home-tz__img--offset' : ''}`}
                />
                <span className="home-tz__label">{t(card.titleKey)}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
