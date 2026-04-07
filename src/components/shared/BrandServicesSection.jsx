import { useCallback, useEffect, useId, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { UiButton } from '../../ui/UiButton'
import { Button1 } from '../../ui/variants'
import { useOpenBooking } from '../../context/BookingContext'
import { getAssetUrl, getAssetSrcSet } from '../../lib/assets'
import { FormChevronDown } from './FormChevronDown'
import './brand-sections.css'

export function BrandServicesSection({ title, imageFilename, folder, sections }) {
  const { t } = useTranslation()
  const openBooking = useOpenBooking()
  const [activeIndex, setActiveIndex] = useState(0)
  const [open, setOpen] = useState(false)
  const rootRef = useRef(null)
  const uid = useId()
  const listboxId = `brand-services-lb-${uid}`

  const active = sections[activeIndex]

  const close = useCallback(() => setOpen(false), [])

  useEffect(() => {
    if (!open) return
    const onDocPointer = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) close()
    }
    const onKey = (e) => {
      if (e.key === 'Escape') close()
    }
    document.addEventListener('mousedown', onDocPointer)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDocPointer)
      document.removeEventListener('keydown', onKey)
    }
  }, [open, close])

  const select = (idx) => {
    setActiveIndex(idx)
    close()
  }

  return (
    <section className="brand-services" aria-labelledby="brand-services-title">
      <div className="brand-services__inner">
        <figure className="brand-services__image" aria-hidden="true">
          <img
            src={getAssetUrl(folder, imageFilename)}
            srcSet={getAssetSrcSet(folder, imageFilename)}
            alt=""
            decoding="async"
          />
        </figure>

        <div className="brand-services__content">
          <h2 id="brand-services-title" className="brand-services__title">
            {title}
          </h2>

          <div className="brand-services__toolbar">
            <div className="brand-services__dropdown-root" ref={rootRef}>
              <button
                type="button"
                className="brand-services__trigger"
                aria-expanded={open}
                aria-haspopup="listbox"
                aria-controls={listboxId}
                onClick={() => setOpen((v) => !v)}
              >
                <span className="brand-services__trigger-label">{active.title}</span>
                <FormChevronDown
                  className={`brand-services__chevron${open ? ' brand-services__chevron--open' : ''}`}
                />
              </button>

              <div
                id={listboxId}
                className={`brand-services__menu${open ? ' brand-services__menu--open' : ''}`}
                role="listbox"
                aria-labelledby="brand-services-title"
                aria-hidden={!open}
              >
                <div className="brand-services__menu-sizer">
                  <div className="brand-services__menu-inner">
                    {sections.map((section, idx) => (
                      <button
                        key={section.title}
                        type="button"
                        role="option"
                        aria-selected={activeIndex === idx}
                        tabIndex={open ? 0 : -1}
                        className={`brand-services__option${activeIndex === idx ? ' brand-services__option--active' : ''}`}
                        onClick={() => select(idx)}
                      >
                        {section.title}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="brand-services__panel" role="region" aria-label={active.title}>
            {active.items.map((item) => (
              <div key={item} className="brand-services__item">
                {item}
              </div>
            ))}
          </div>

          <UiButton variant={Button1['1']} type="button" onClick={openBooking} className="brand-services__cta">
            {t('header.cta')}
          </UiButton>
        </div>
      </div>
    </section>
  )
}

BrandServicesSection.propTypes = {
  title: PropTypes.string.isRequired,
  imageFilename: PropTypes.string.isRequired,
  folder: PropTypes.string.isRequired,
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      items: PropTypes.arrayOf(PropTypes.string).isRequired,
    }),
  ).isRequired,
}
