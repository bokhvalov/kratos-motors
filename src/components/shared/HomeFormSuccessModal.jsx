import PropTypes from 'prop-types'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { UiButton } from '../../ui/UiButton'
import { UiHeading } from '../../ui/UiHeading'
import { Button1, KratosText } from '../../ui/variants'
import { MODAL_ASSETS } from '../../lib/modalAssets'
import './HomeFormSuccessModal.css'

/** Lead form success state */
export function HomeFormSuccessModal({ isOpen, onClose }) {
  const { t } = useTranslation()

  useEffect(() => {
    if (!isOpen) return
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      className="home-form-success-backdrop"
      role="presentation"
      onClick={onClose}
    >
      <div
        className="home-form-success-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="home-form-success-title"
        aria-describedby="home-form-success-desc"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={MODAL_ASSETS.successCheck}
          alt=""
          width={80}
          height={80}
          className="home-form-success-modal__icon"
          decoding="async"
        />
        <div className="home-form-success-modal__inner">
          <UiHeading
            id="home-form-success-title"
            as="h2"
            variant={KratosText.H3_SEMIBOLD_BLACK}
            className="home-form-success-modal__title"
          >
            {t('form.bookingSuccessHeadline')}
          </UiHeading>
          <p id="home-form-success-desc" className="home-form-success-modal__text">
            {t('form.bookingSuccessBody')}
          </p>
          <UiButton
            type="button"
            variant={Button1['1']}
            className="home-form-success-modal__btn"
            onClick={onClose}
          >
            {t('form.bookingClose')}
          </UiButton>
        </div>
      </div>
    </div>
  )
}

HomeFormSuccessModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
}
