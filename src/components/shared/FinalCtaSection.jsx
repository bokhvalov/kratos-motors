import { useTranslation } from 'react-i18next'
import { UiButton } from '../../ui/UiButton'
import { Button1 } from '../../ui/variants'
import { useOpenBooking } from '../../context/BookingContext'
import './final-cta-section.css'

export function FinalCtaSection() {
  const { t } = useTranslation()
  const openBooking = useOpenBooking()

  return (
    <section className="final-cta-section" aria-labelledby="final-cta-text">
      <div className="layout-content final-cta-section__inner">
        <p id="final-cta-text" className="final-cta-section__text">
          {t('home.finalCtaText')}
        </p>
        <UiButton variant={Button1['7']} onClick={openBooking}>
          {t('header.cta')}
        </UiButton>
      </div>
    </section>
  )
}
