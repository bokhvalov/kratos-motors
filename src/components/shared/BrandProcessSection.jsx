import PropTypes from 'prop-types'
import { getAssetUrl, getAssetSrcSet } from '../../lib/assets'
import './brand-sections.css'

const PROCESS_TEXT_STEPS = 5

function CheckPill() {
  return (
    <span className="brand-process-card__check-pill" aria-hidden="true">
      <svg className="brand-process-card__check-icon" viewBox="0 0 14 10" width="14" height="10" fill="none">
        <path
          d="M1.25 5.1 4.9 8.75 12.75 0.9"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  )
}

export function BrandProcessSection({ title, items, imageFilename, folder }) {
  const cards = items.slice(0, PROCESS_TEXT_STEPS)

  return (
    <section className="brand-process" aria-labelledby="brand-process-title">
      <div className="brand-process__inner">
        <h2 id="brand-process-title" className="brand-process__title">
          {title}
        </h2>

        <div className="brand-process__strip">
          <div className="brand-process__grid">
            {cards.map((item, idx) => (
              <article key={item.title} className="brand-process-card">
                <div className="brand-process-card__body">
                  <div className="brand-process-card__top">
                    <CheckPill />
                    <img
                      className="brand-process-card__num-img"
                      src={getAssetUrl('home/why-trust', `num-${String(idx + 1).padStart(2, '0')}.svg`)}
                      alt=""
                      decoding="async"
                      aria-hidden="true"
                    />
                  </div>
                  <div>
                    <h3 className="brand-process-card__title">{item.title}</h3>
                    <p className="brand-process-card__desc">{item.body}</p>
                  </div>
                </div>
              </article>
            ))}

            <figure className="brand-process-photo" aria-hidden="true">
              <img
                src={getAssetUrl(folder, imageFilename)}
                srcSet={getAssetSrcSet(folder, imageFilename)}
                alt=""
                decoding="async"
              />
            </figure>
          </div>
        </div>
      </div>
    </section>
  )
}

BrandProcessSection.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
    }),
  ).isRequired,
  imageFilename: PropTypes.string.isRequired,
  folder: PropTypes.string.isRequired,
}
