import PropTypes from 'prop-types'
import { getAssetUrl, getAssetSrcSet } from '../../lib/assets'
import './brand-sections.css'

export function BrandFactSection({ title, body, imageFilename, folder, imageSide = 'right' }) {
  const sectionClass = `brand-fact${imageSide === 'left' ? ' brand-fact--image-left' : ''}`

  return (
    <section className={sectionClass}>
      <div className="brand-fact__inner">
        <div className="brand-fact__text">
          <h2 className="brand-fact__title">{title}</h2>
          <p className="brand-fact__body">{body}</p>
        </div>
        <figure className="brand-fact__media" aria-hidden="true">
          <img
            src={getAssetUrl(folder, imageFilename)}
            srcSet={getAssetSrcSet(folder, imageFilename)}
            alt=""
            decoding="async"
          />
        </figure>
      </div>
    </section>
  )
}

BrandFactSection.propTypes = {
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  imageFilename: PropTypes.string.isRequired,
  folder: PropTypes.string.isRequired,
  imageSide: PropTypes.oneOf(['left', 'right']),
}
