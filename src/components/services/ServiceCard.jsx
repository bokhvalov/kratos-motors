import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { getAssetUrl, getAssetSrcSet } from '../../lib/assets'

export function ServiceCard({ img, titleKey, gradient = 'down', className = '', onOpenDetails }) {
  const { t } = useTranslation()

  return (
    <article className={['services-card', className].filter(Boolean).join(' ')}>
      <div className="services-card__media">
        <img
          src={getAssetUrl('services', img)}
          srcSet={getAssetSrcSet('services', img)}
          alt=""
          className="services-card__img"
          decoding="async"
        />
        <div className={`services-card__shade services-card__shade--${gradient}`} aria-hidden />
      </div>
      <div className="services-card__body">
        <h3 className="services-card__title">{t(titleKey)}</h3>
        <button type="button" className="services-card__btn" onClick={onOpenDetails}>
          {t('pages.services.details')}
        </button>
      </div>
    </article>
  )
}

ServiceCard.propTypes = {
  img: PropTypes.string.isRequired,
  titleKey: PropTypes.string.isRequired,
  gradient: PropTypes.string,
  className: PropTypes.string,
  onOpenDetails: PropTypes.func.isRequired,
}
