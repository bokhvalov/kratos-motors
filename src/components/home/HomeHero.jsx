import { useTranslation } from 'react-i18next'
import { UiButton } from '../../ui/UiButton'
import { Button1, KratosText } from '../../ui/variants'
import { UiHeading } from '../../ui/UiHeading'
import { useOpenBooking } from '../../context/BookingContext'
import { getAssetUrl, getAssetSrcSet, ASSETS } from '../../lib/assets'
import { HEADER_ASSETS } from '../../lib/headerAssets'

export function HomeHero() {
  const { t } = useTranslation()
  const openBooking = useOpenBooking()

  return (
    <section className="hero" aria-labelledby="hero-heading">
      <div className="hero-bg" aria-hidden="true">
        <img
          src={getAssetUrl('home', ASSETS.home.hero)}
          srcSet={getAssetSrcSet('home', ASSETS.home.hero)}
          alt=""
          fetchPriority="high"
        />
      </div>
      <div className="layout-content hero__inner">
        <div className="hero-content">
          <h1 id="hero-heading" className="hero-heading">
            <UiHeading as="span" variant={KratosText.H1_WHITE} className="hero-heading__line">
              {t('home.title')}
            </UiHeading>
            <UiHeading as="span" variant={KratosText.H1_WHITE} className="hero-heading__line">
              {t('home.serwisPremium')}
            </UiHeading>
          </h1>
          <UiHeading as="p" variant={KratosText.H3_REGULAR_WHITE} className="hero-subtitle">
            {t('home.heroDescription')}
          </UiHeading>
          <div className="hero-actions">
            <UiButton variant={Button1['1']} onClick={openBooking}>
              {t('header.cta')}
            </UiButton>
            <UiButton
              href="https://wa.me/48516520380"
              variant={Button1['3']}
              target="_blank"
              rel="noopener noreferrer"
              className="hero-actions__whatsapp"
            >
              <img
                src={HEADER_ASSETS.whatsapp}
                alt=""
                width={22}
                height={22}
                className="hero-actions__whatsapp-icon"
                decoding="async"
                aria-hidden="true"
              />
              WhatsApp
            </UiButton>
          </div>
        </div>
      </div>
    </section>
  )
}
