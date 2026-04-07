import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { UiButton } from '../../ui/UiButton'
import { Button1 } from '../../ui/variants'
import { useOpenBooking } from '../../context/BookingContext'
import { getAssetUrl } from '../../lib/assets'
import { WhyTrustCardIcon } from './WhyTrustCardIcon'
import { WHY_TRUST_CARDS } from './constants'
import './why-trust-section.css'

export function WhyTrustSection({ aboutPage = false }) {
  const { t } = useTranslation()
  const openBooking = useOpenBooking()

  const sectionClass =
    'why-trust-section' + (aboutPage ? ' why-trust-section--about-page' : '')

  return (
    <section className={sectionClass} aria-labelledby="why-trust-heading">
      <div className="why-trust-section__inner">
        <div className="why-trust-section__left">
          <h2 id="why-trust-heading" className="why-trust-section__heading">
            <span className="why-trust-section__heading-muted">{t('home.whyTrustHeading')} </span>
            <span className="why-trust-section__heading-accent">{t('home.whyTrustWord')}</span>
          </h2>
          <p className="why-trust-section__subtitle">{t('home.whyTrustSubtitle')}</p>
          <UiButton variant={Button1['1']} className="why-trust-section__cta" onClick={openBooking}>
            {t('header.cta')}
          </UiButton>
        </div>
        <div className="why-trust-section__cards">
          {WHY_TRUST_CARDS.map(({ n, iconVariant }) => (
            <div key={n} className="why-trust-section__card">
              <div className="why-trust-section__card-body">
                <div className="why-trust-section__card-top">
                  <WhyTrustCardIcon variant={iconVariant} />
                  <img
                    className="why-trust-section__card-num-img"
                    src={getAssetUrl('home/why-trust', `num-0${n}.svg`)}
                    alt=""
                    decoding="async"
                    aria-hidden="true"
                  />
                </div>
                <p className="why-trust-section__card-text">{t(`home.whyTrust0${n}`)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

WhyTrustSection.propTypes = {
  aboutPage: PropTypes.bool,
}
