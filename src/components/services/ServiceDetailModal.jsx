import PropTypes from 'prop-types'
import { useEffect, useRef, useState, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { MODAL_ASSETS } from '../../lib/modalAssets'
import { UiButton } from '../../ui/UiButton'
import { Button1 } from '../../ui/variants'
import './ServiceDetailModal.css'

const TITLE_KEY_PREFIX = 'pages.services.items.'

function itemIdFromTitleKey(titleKey) {
  if (!titleKey || !titleKey.startsWith(TITLE_KEY_PREFIX)) return null
  return titleKey.slice(TITLE_KEY_PREFIX.length)
}

export function ServiceDetailModal({ isOpen, titleKey, onClose, onBook }) {
  const { t } = useTranslation()
  const closeBtnRef = useRef(null)
  const contentTitleKeyRef = useRef(undefined)
  const [mounted, setMounted] = useState(false)
  const [visible, setVisible] = useState(false)

  if (titleKey) {
    contentTitleKeyRef.current = titleKey
  }
  const contentTitleKey = contentTitleKeyRef.current

  const itemId = itemIdFromTitleKey(contentTitleKey)

  const intro = itemId ? t(`pages.services.detail.${itemId}.intro`) : ''
  const bulletsRaw = itemId ? t(`pages.services.detail.${itemId}.bullets`, { returnObjects: true }) : []
  const bullets = Array.isArray(bulletsRaw) ? bulletsRaw : []
  const title = contentTitleKey ? t(contentTitleKey) : ''

  const handleBook = useCallback(() => {
    onClose()
    onBook()
  }, [onClose, onBook])

  useEffect(() => {
    if (isOpen) {
      setMounted(true)
    } else {
      setVisible(false)
    }
  }, [isOpen])

  useEffect(() => {
    if (!mounted || !isOpen) return
    const id = requestAnimationFrame(() => {
      requestAnimationFrame(() => setVisible(true))
    })
    return () => cancelAnimationFrame(id)
  }, [mounted, isOpen])

  const handleDimTransitionEnd = (e) => {
    if (e.target !== e.currentTarget) return
    if (e.propertyName !== 'opacity') return
    if (!visible) setMounted(false)
  }

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    if (!mounted || !isOpen) return
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    closeBtnRef.current?.focus()
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [mounted, isOpen, onClose])

  if (!mounted) return null

  return (
    <div
      className={`service-detail-modal-backdrop ${visible ? 'service-detail-modal-backdrop--visible' : ''}`}
      role="presentation"
    >
      <div
        className="service-detail-modal-backdrop__dim"
        onClick={onClose}
        onTransitionEnd={handleDimTransitionEnd}
        aria-hidden="true"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="service-detail-modal-title"
        className="service-detail-modal"
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="service-detail-modal__panel">
          <button
            ref={closeBtnRef}
            type="button"
            className="service-detail-modal__close"
            onClick={onClose}
            aria-label={t('a11y.close')}
          >
            <img src={MODAL_ASSETS.close} alt="" width={44} height={44} decoding="async" />
          </button>
          <h2 id="service-detail-modal-title" className="service-detail-modal__title">
            {title}
          </h2>
          <div className="service-detail-modal__scroll">
            {intro ? <p className="service-detail-modal__intro">{intro}</p> : null}
            {bullets.length > 0 ? (
              <>
                <p className="service-detail-modal__includes-label">{t('pages.services.modalIncludes')}</p>
                <ul className="service-detail-modal__list">
                  {bullets.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              </>
            ) : null}
          </div>
          <div className="service-detail-modal__footer">
            <UiButton variant={Button1['1']} type="button" onClick={handleBook} className="service-detail-modal__cta">
              {t('header.cta')}
            </UiButton>
          </div>
        </div>
      </div>
    </div>
  )
}

ServiceDetailModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  titleKey: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  onBook: PropTypes.func.isRequired,
}
