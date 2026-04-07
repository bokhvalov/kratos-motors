import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { ResponsiveImage } from './ResponsiveImage'
import { useRealizationLightbox } from '../../hooks/useRealizationLightbox'
import { getAssetUrl, getAssetSrcSet, ASSETS } from '../../lib/assets'
import { MODAL_ASSETS } from '../../lib/modalAssets'
import './realizations-section.css'

export function RealizationsSection({
  folder = 'home',
  images = ASSETS.home.gallery,
  headingKey = 'home.realizationsHeading',
}) {
  const { t } = useTranslation()
  const { openIndex, setOpenIndex, close } = useRealizationLightbox()

  return (
    <>
      <section className="realizations-section" aria-labelledby="realizations-heading">
        <div className="layout-content">
          <h2 id="realizations-heading" className="realizations-section__heading">
            {t(headingKey)}
          </h2>
          <div className="realizations-section__strip">
            <div className="realizations-section__grid">
              {images.map((filename, i) => (
                <button
                  key={filename}
                  type="button"
                  className="realizations-section__card"
                  onClick={() => setOpenIndex(i)}
                  aria-label={t('home.realizationEnlarge')}
                >
                  <ResponsiveImage
                    src={getAssetUrl(folder, filename)}
                    alt=""
                    className="realizations-section__img"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {openIndex !== null ? (
        <div
          className="realizations-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={t('home.realizationLightboxLabel')}
          onClick={close}
        >
          <button
            type="button"
            className="realizations-lightbox__close"
            aria-label={t('a11y.close')}
            onClick={(e) => {
              e.stopPropagation()
              close()
            }}
          >
            <img src={MODAL_ASSETS.close} alt="" width={44} height={44} decoding="async" />
          </button>
          <img
            src={getAssetUrl(folder, images[openIndex])}
            srcSet={getAssetSrcSet(folder, images[openIndex])}
            alt=""
            className="realizations-lightbox__img"
            decoding="async"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      ) : null}
    </>
  )
}

RealizationsSection.propTypes = {
  folder: PropTypes.string,
  images: PropTypes.arrayOf(PropTypes.string),
  headingKey: PropTypes.string,
}
