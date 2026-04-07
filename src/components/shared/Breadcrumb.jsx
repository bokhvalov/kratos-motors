import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { publicAssetUrl } from '../../lib/assets'
import './Breadcrumb.css'

const BREADCRUMB_CHEVRON_BG = `url("${publicAssetUrl('assets/icons/breadcrumb-chevron-right.svg')}")`

/**
 * Breadcrumbs (same pattern as sports builds: chevron, link, current in accent).
 * @param items Segments after “Home”
 * @param frame Wrap in `.layout-content` when the parent has no horizontal padding
 */
export function Breadcrumb({ items, frame = false }) {
  const { t } = useTranslation()

  const nav = (
    <nav
      className="breadcrumb"
      aria-label="Breadcrumb"
      style={{ '--breadcrumb-chevron': BREADCRUMB_CHEVRON_BG }}
    >
      <ol itemScope itemType="https://schema.org/BreadcrumbList">
        <li
          itemProp="itemListElement"
          itemScope
          itemType="https://schema.org/ListItem"
        >
          <Link itemProp="item" to="/">
            <span itemProp="name">{t('breadcrumb.home')}</span>
          </Link>
          <meta itemProp="position" content="1" />
          {items.length > 0 ? <span className="breadcrumb__chev" aria-hidden="true" /> : null}
        </li>
        {items.map(({ label, to }, i) => (
          <li
            key={to ?? `crumb-${i}`}
            itemProp="itemListElement"
            itemScope
            itemType="https://schema.org/ListItem"
          >
            {to ? (
              <Link itemProp="item" to={to}>
                <span itemProp="name">{label}</span>
              </Link>
            ) : (
              <span className="breadcrumb__current" itemProp="name">
                {label}
              </span>
            )}
            <meta itemProp="position" content={String(i + 2)} />
            {i < items.length - 1 ? <span className="breadcrumb__chev" aria-hidden="true" /> : null}
          </li>
        ))}
      </ol>
    </nav>
  )

  if (frame) {
    return <div className="breadcrumb-frame layout-content">{nav}</div>
  }

  return nav
}
