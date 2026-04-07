import { useTranslation } from 'react-i18next'
import { UiButton } from '../../ui/UiButton'
import { Button1 } from '../../ui/variants'
import { useOpenBooking } from '../../context/BookingContext'
import { getAssetUrl, getAssetSrcSet, ASSETS } from '../../lib/assets'

export function HomeCtaStrip() {
  const { t } = useTranslation()
  const openBooking = useOpenBooking()

  return (
    <section className="home-cta-strip" aria-labelledby="cta-strip-heading">
      <div className="home-cta-strip__bg" aria-hidden="true">
        <img
          src={getAssetUrl('home', ASSETS.home.ctaStrip)}
          srcSet={getAssetSrcSet('home', ASSETS.home.ctaStrip)}
          alt=""
        />
      </div>
      <div className="home-cta-strip__content">
        <p id="cta-strip-heading" className="home-cta-strip__text">
          {t('home.ctaStripText')}
        </p>
        <UiButton variant={Button1['3']} onClick={openBooking}>
          {t('header.cta')}
        </UiButton>
      </div>
    </section>
  )
}
