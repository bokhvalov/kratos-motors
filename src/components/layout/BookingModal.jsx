import PropTypes from 'prop-types'
import { useEffect, useRef, useState, useCallback } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { Link, useNavigate } from 'react-router-dom'
import { digitsOnly } from '../../lib/form'
import { getDirectAssetSrcSet } from '../../lib/assets'
import { MODAL_ASSETS } from '../../lib/modalAssets'
import { UiButton } from '../../ui/UiButton'
import { UiInput } from '../../ui/UiInput'
import { UiHeading } from '../../ui/UiHeading'
import { Button1, FormField, KratosText } from '../../ui/variants'
import './BookingModal.css'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const DEFAULT_PHONE_PREFIX = '+48 '

const STEPS = {
  CUSTOMER: 0,
  CAR: 1,
  SUCCESS: 2,
}

const INITIAL_CUSTOMER = {
  firstName: '',
  lastName: '',
  phone: DEFAULT_PHONE_PREFIX,
  email: '',
}

const INITIAL_CAR = {
  makeModel: '',
  engineType: '',
  year: '',
  faultDescription: '',
  extraInfo: '',
}

/** Back icon: same geometry as btn-arrow.svg, currentColor for light backgrounds. */
const MODAL_BACK_ARROW_PATH =
  'M6.26087 13.8839C6.43478 14.0387 6.59903 14.0387 6.75362 13.8839L12.8696 7.73214C13.0435 7.57738 13.0435 7.42262 12.8696 7.26786L6.75362 1.11607C6.59903 0.96131 6.43478 0.96131 6.26087 1.11607L6.05797 1.34821C5.90338 1.50298 5.90338 1.66741 6.05797 1.84152L11.2464 7.0067H0.347826C0.115942 7.0067 0 7.12277 0 7.35491V7.64509C0 7.87723 0.115942 7.9933 0.347826 7.9933H11.2464L6.05797 13.1585C5.90338 13.3326 5.90338 13.497 6.05797 13.6518L6.26087 13.8839Z'

function ModalBackArrowIcon({ className }) {
  return (
    <svg
      className={className}
      width={13}
      height={14}
      viewBox="0 0 13 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden={true}
    >
      <path d={MODAL_BACK_ARROW_PATH} fill="currentColor" />
    </svg>
  )
}

ModalBackArrowIcon.propTypes = {
  className: PropTypes.string,
}

function isValidProductionYear(y) {
  const d = y.trim()
  if (!/^\d{4}$/.test(d)) return false
  const n = parseInt(d, 10)
  const now = new Date().getFullYear()
  return n >= 1950 && n <= now + 1
}

export function BookingModal({ isOpen, onClose }) {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const dialogRef = useRef(null)
  const pendingHomeNavigationRef = useRef(false)
  const wasModalMountedRef = useRef(false)

  const [modalMounted, setModalMounted] = useState(false)
  const [backdropShown, setBackdropShown] = useState(false)

  const [step, setStep] = useState(STEPS.CUSTOMER)
  const [errors, setErrors] = useState({})
  const [values, setValues] = useState(() => ({ ...INITIAL_CUSTOMER }))
  const [carErrors, setCarErrors] = useState({})
  const [carValues, setCarValues] = useState(() => ({ ...INITIAL_CAR }))

  const resetBookingForm = useCallback(() => {
    setErrors({})
    setCarErrors({})
    setValues({ ...INITIAL_CUSTOMER })
    setCarValues({ ...INITIAL_CAR })
    setStep(STEPS.CUSTOMER)
  }, [])

  useEffect(() => {
    if (modalMounted) {
      wasModalMountedRef.current = true
      return
    }
    if (!wasModalMountedRef.current) return
    wasModalMountedRef.current = false
    resetBookingForm()
    if (pendingHomeNavigationRef.current) {
      pendingHomeNavigationRef.current = false
      navigate('/')
    }
  }, [modalMounted, navigate, resetBookingForm])

  useEffect(() => {
    if (!isOpen) return
    dialogRef.current?.focus()
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return
    const el = document.activeElement
    if (
      el instanceof HTMLElement &&
      dialogRef.current?.contains(el) &&
      (el.tagName === 'BUTTON' || el.tagName === 'A')
    ) {
      el.blur()
    }
    dialogRef.current?.focus()
  }, [step, isOpen])

  useEffect(() => {
    if (isOpen) {
      setModalMounted(true)
    } else {
      setBackdropShown(false)
    }
  }, [isOpen])

  useEffect(() => {
    if (!modalMounted || !isOpen) return
    const id = requestAnimationFrame(() => {
      requestAnimationFrame(() => setBackdropShown(true))
    })
    return () => cancelAnimationFrame(id)
  }, [modalMounted, isOpen])

  const handleDimTransitionEnd = (e) => {
    if (e.target !== e.currentTarget) return
    if (e.propertyName !== 'opacity') return
    if (!backdropShown) setModalMounted(false)
  }

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose()
    }
    if (!modalMounted) return
    document.addEventListener('keydown', handleEscape)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [modalMounted, onClose])

  const validateCustomer = () => {
    const next = {}
    if (!values.firstName.trim()) next.firstName = t('form.required')
    const phoneDigits = digitsOnly(values.phone)
    if (!phoneDigits) next.phone = t('form.required')
    else if (phoneDigits.length < 9) next.phone = t('form.invalidPhone')
    if (!values.email.trim()) next.email = t('form.required')
    else if (!EMAIL_REGEX.test(values.email)) next.email = t('form.invalidEmail')
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const validateCar = () => {
    const next = {}
    if (!carValues.makeModel.trim()) next.makeModel = t('form.required')
    if (carValues.year.trim() && !isValidProductionYear(carValues.year)) {
      next.year = t('form.invalidYear')
    }
    if (!carValues.faultDescription.trim()) next.faultDescription = t('form.required')
    setCarErrors(next)
    return Object.keys(next).length === 0
  }

  const handleCustomerSubmit = (e) => {
    e.preventDefault()
    if (!validateCustomer()) return
    setStep(STEPS.CAR)
  }

  const handleCarSubmit = (e) => {
    e.preventDefault()
    if (!validateCar()) return
    // TODO: submit values + carValues
    setStep(STEPS.SUCCESS)
  }

  const handleSuccessClose = () => {
    pendingHomeNavigationRef.current = true
    onClose()
  }

  const handleChange = (field) => (e) => {
    setValues((v) => ({ ...v, [field]: e.target.value }))
    if (errors[field]) setErrors((err) => ({ ...err, [field]: null }))
  }

  const handleCarChange = (field) => (e) => {
    setCarValues((v) => ({ ...v, [field]: e.target.value }))
    if (carErrors[field]) setCarErrors((err) => ({ ...err, [field]: null }))
  }

  const modalTitle =
    step === STEPS.CUSTOMER
      ? t('form.customerInfoTitle')
      : step === STEPS.CAR
        ? t('form.bookingCarTitle')
        : ''

  if (!modalMounted) return null

  return (
    <div
      className={`modal-backdrop ${backdropShown ? 'modal-backdrop--visible' : ''}`}
      role="presentation"
    >
      <div
        className="modal-backdrop__dim"
        onClick={onClose}
        onTransitionEnd={handleDimTransitionEnd}
        aria-hidden={true}
      />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-modal-title"
        className="modal-dialog"
        onClick={(e) => e.stopPropagation()}
        tabIndex={-1}
      >
        <button
          type="button"
          className="modal-close-fab"
          aria-label={t('a11y.close')}
          onClick={onClose}
        >
          <img src={MODAL_ASSETS.close} alt="" width={44} height={44} decoding="async" />
        </button>

        <div
          className={[
            'modal-dialog__form-side',
            step === STEPS.CAR && 'modal-dialog__form-side--car-step',
            step === STEPS.SUCCESS && 'modal-dialog__form-side--success',
          ]
            .filter(Boolean)
            .join(' ')}
        >
          {step !== STEPS.SUCCESS ? (
            <UiHeading
              id="booking-modal-title"
              as="h2"
              variant={KratosText.H3_SEMIBOLD_BLACK}
              className="modal-dialog__title"
            >
              {modalTitle}
            </UiHeading>
          ) : null}

          {step === STEPS.CUSTOMER && (
            <form
              onSubmit={handleCustomerSubmit}
              className="modal-booking-form modal-booking-form--customer modal-booking-form--stacked"
              noValidate
            >
              <div className="modal-booking-form__main">
              <div className="modal-booking-form__fields">
                <div className="modal-field">
                  <label htmlFor="booking-first-name">{t('form.firstName')}</label>
                  <UiInput
                    id="booking-first-name"
                    variant={FormField['1']}
                    type="text"
                    autoComplete="given-name"
                    placeholder={t('form.firstName')}
                    value={values.firstName}
                    onChange={handleChange('firstName')}
                    aria-required="true"
                    aria-invalid={!!errors.firstName}
                    aria-describedby={errors.firstName ? 'booking-first-name-error' : undefined}
                    className="modal-field__input"
                  />
                  {errors.firstName && (
                    <span id="booking-first-name-error" className="modal-field__error" role="alert">
                      {errors.firstName}
                    </span>
                  )}
                </div>

                <div className="modal-field">
                  <label htmlFor="booking-last-name">{t('form.lastName')}</label>
                  <UiInput
                    id="booking-last-name"
                    variant={FormField['1']}
                    type="text"
                    autoComplete="family-name"
                    placeholder={t('form.lastName')}
                    value={values.lastName}
                    onChange={handleChange('lastName')}
                    aria-required="false"
                    aria-invalid={!!errors.lastName}
                    aria-describedby={errors.lastName ? 'booking-last-name-error' : undefined}
                    className="modal-field__input"
                  />
                  {errors.lastName && (
                    <span id="booking-last-name-error" className="modal-field__error" role="alert">
                      {errors.lastName}
                    </span>
                  )}
                </div>

                <div className="modal-field">
                  <label htmlFor="booking-phone">{t('form.phoneNumber')}</label>
                  <UiInput
                    id="booking-phone"
                    variant={FormField['1']}
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    placeholder={`${DEFAULT_PHONE_PREFIX.trim()} ${t('form.phoneDigitsPlaceholder')}`}
                    value={values.phone}
                    onChange={handleChange('phone')}
                    aria-required="true"
                    aria-invalid={!!errors.phone}
                    aria-describedby={errors.phone ? 'booking-phone-error' : undefined}
                    className="modal-field__input"
                  />
                  {errors.phone && (
                    <span id="booking-phone-error" className="modal-field__error" role="alert">
                      {errors.phone}
                    </span>
                  )}
                </div>

                <div className="modal-field">
                  <label htmlFor="booking-email">{t('form.emailShort')}</label>
                  <UiInput
                    id="booking-email"
                    variant={FormField['1']}
                    type="email"
                    autoComplete="email"
                    placeholder={t('form.emailShort')}
                    value={values.email}
                    onChange={handleChange('email')}
                    aria-required="true"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? 'booking-email-error' : undefined}
                    className="modal-field__input"
                  />
                  {errors.email && (
                    <span id="booking-email-error" className="modal-field__error" role="alert">
                      {errors.email}
                    </span>
                  )}
                </div>
              </div>

              <p className="modal-booking-form__consent">
                <Trans
                  i18nKey="form.bookingConsent"
                  components={{
                    privacyLink: (
                      <Link
                        to="/privacy-policy"
                        className="modal-booking-form__consent-link"
                        onClick={() => onClose()}
                      />
                    ),
                  }}
                />
              </p>
              </div>

              <div className="modal-booking-form__actions modal-booking-form__actions--dock">
                <UiButton type="submit" variant={Button1['1']} className="modal-booking-form__submit">
                  <span>{t('form.next')}</span>
                  <span className="modal-booking-form__submit-icon" aria-hidden="true">
                    <img src={MODAL_ASSETS.arrow} alt="" width={13} height={14} decoding="async" />
                  </span>
                </UiButton>
              </div>
            </form>
          )}

          {step === STEPS.CAR && (
            <form className="modal-car-form modal-car-form--stacked" onSubmit={handleCarSubmit} noValidate>
              <div className="modal-car-form__main">
              <div className="modal-car-form__fields">
                <div className="modal-car-form__field">
                  <label className="modal-car-form__label" htmlFor="booking-car-make">
                    {t('form.bookingCarMakeModel')}
                  </label>
                  <UiInput
                    id="booking-car-make"
                    variant={FormField['1']}
                    type="text"
                    autoComplete="off"
                    placeholder={t('form.bookingCarMakeModel')}
                    value={carValues.makeModel}
                    onChange={handleCarChange('makeModel')}
                    aria-required="true"
                    aria-invalid={!!carErrors.makeModel}
                    aria-describedby={carErrors.makeModel ? 'booking-car-make-error' : undefined}
                    className="modal-car-form__control"
                  />
                  {carErrors.makeModel ? (
                    <span id="booking-car-make-error" className="modal-car-form__error" role="alert">
                      {carErrors.makeModel}
                    </span>
                  ) : null}
                </div>

                <div className="modal-car-form__field">
                  <label className="modal-car-form__label" htmlFor="booking-car-engine">
                    {t('form.bookingCarEngine')}
                  </label>
                  <UiInput
                    id="booking-car-engine"
                    variant={FormField['1']}
                    type="text"
                    autoComplete="off"
                    placeholder={t('form.bookingCarEngine')}
                    value={carValues.engineType}
                    onChange={handleCarChange('engineType')}
                    aria-required="false"
                    className="modal-car-form__control"
                  />
                </div>

                <div className="modal-car-form__field">
                  <label className="modal-car-form__label" htmlFor="booking-car-year">
                    {t('form.bookingCarYear')}
                  </label>
                  <UiInput
                    id="booking-car-year"
                    variant={FormField['1']}
                    type="text"
                    inputMode="numeric"
                    autoComplete="off"
                    placeholder={t('form.bookingCarYear')}
                    value={carValues.year}
                    onChange={handleCarChange('year')}
                    maxLength={4}
                    aria-required="false"
                    aria-invalid={!!carErrors.year}
                    aria-describedby={carErrors.year ? 'booking-car-year-error' : undefined}
                    className="modal-car-form__control"
                  />
                  {carErrors.year ? (
                    <span id="booking-car-year-error" className="modal-car-form__error" role="alert">
                      {carErrors.year}
                    </span>
                  ) : null}
                </div>

                <div className="modal-car-form__field">
                  <label className="modal-car-form__label" htmlFor="booking-car-fault">
                    {t('form.bookingCarFault')}
                  </label>
                  <UiInput
                    id="booking-car-fault"
                    variant={FormField['1']}
                    type="text"
                    autoComplete="off"
                    placeholder={t('form.bookingCarFaultPlaceholder')}
                    value={carValues.faultDescription}
                    onChange={handleCarChange('faultDescription')}
                    aria-required="true"
                    aria-invalid={!!carErrors.faultDescription}
                    aria-describedby={
                      carErrors.faultDescription ? 'booking-car-fault-error' : undefined
                    }
                    className="modal-car-form__control"
                  />
                  {carErrors.faultDescription ? (
                    <span id="booking-car-fault-error" className="modal-car-form__error" role="alert">
                      {carErrors.faultDescription}
                    </span>
                  ) : null}
                </div>

                <div className="modal-car-form__field">
                  <label className="modal-car-form__label" htmlFor="booking-car-extra">
                    {t('form.bookingCarExtra')}
                  </label>
                  <textarea
                    id="booking-car-extra"
                    className="modal-car-form__textarea"
                    rows={3}
                    placeholder={t('form.bookingCarExtraPlaceholder')}
                    value={carValues.extraInfo}
                    onChange={handleCarChange('extraInfo')}
                  />
                </div>
              </div>
              </div>

              <div className="modal-car-form__footer">
                <button
                  type="button"
                  className="modal-car-form__back"
                  onClick={() => {
                    setStep(STEPS.CUSTOMER)
                    setCarErrors({})
                  }}
                >
                  <span className="modal-car-form__back-icon" aria-hidden="true">
                    <ModalBackArrowIcon className="modal-car-form__arrow-svg" />
                  </span>
                  <span>{t('form.bookingBack')}</span>
                </button>
                <UiButton
                  type="submit"
                  variant={Button1['1']}
                  className="modal-booking-form__submit modal-car-form__submit"
                >
                  <span>{t('form.next')}</span>
                  <span className="modal-booking-form__submit-icon" aria-hidden="true">
                    <img src={MODAL_ASSETS.arrow} alt="" width={13} height={14} decoding="async" />
                  </span>
                </UiButton>
              </div>
            </form>
          )}

          {step === STEPS.SUCCESS && (
            <div
              className="modal-booking-form modal-booking-form--success modal-booking-form--stacked"
              role="status"
              aria-live="polite"
            >
              <div className="modal-booking-form__main modal-booking-form__main--success">
                <div className="modal-booking-success">
                  <img
                    src={MODAL_ASSETS.successCheck}
                    alt=""
                    width={80}
                    height={80}
                    className="modal-booking-success__icon"
                    decoding="async"
                  />
                  <div className="modal-booking-success__copy">
                    <UiHeading
                      id="booking-modal-title"
                      as="h2"
                      variant={KratosText.H3_SEMIBOLD_BLACK}
                      className="modal-booking-success__title"
                    >
                      {t('form.bookingSuccessHeadline')}
                    </UiHeading>
                    <p className="modal-booking-success__text">{t('form.bookingSuccessBody')}</p>
                  </div>
                </div>
              </div>
              <div className="modal-booking-form__actions modal-booking-form__actions--dock modal-booking-form__actions--success">
                <UiButton
                  type="button"
                  variant={Button1['1']}
                  className="modal-booking-form__submit modal-booking-form__submit--success"
                  onClick={handleSuccessClose}
                >
                  <span>{t('form.bookingBackToHome')}</span>
                  <span className="modal-booking-form__submit-icon" aria-hidden="true">
                    <img src={MODAL_ASSETS.arrow} alt="" width={13} height={14} decoding="async" />
                  </span>
                </UiButton>
              </div>
            </div>
          )}
        </div>

        <div className="modal-dialog__media" aria-hidden="true">
          <img
            src={MODAL_ASSETS.hero}
            srcSet={getDirectAssetSrcSet(MODAL_ASSETS.hero)}
            alt=""
            className="modal-dialog__media-img"
            width={1024}
            height={948}
            decoding="async"
          />
        </div>
      </div>
    </div>
  )
}

BookingModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
}
