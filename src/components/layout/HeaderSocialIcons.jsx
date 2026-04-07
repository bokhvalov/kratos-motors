import { SITE_SOCIAL } from '../../lib/site'
import { HEADER_SOCIAL_KIT } from '../../lib/headerAssets'
import { getDirectAssetSrcSet } from '../../lib/assets'

const ICONS = [
  {
    key: 'instagram',
    href: SITE_SOCIAL.instagram,
    labelKey: 'instagram',
    kit: HEADER_SOCIAL_KIT.instagram,
  },
  {
    key: 'telegram',
    href: SITE_SOCIAL.telegram,
    labelKey: 'telegram',
    kit: HEADER_SOCIAL_KIT.telegram,
  },
  {
    key: 'whatsapp',
    href: SITE_SOCIAL.whatsapp,
    labelKey: 'whatsapp',
    kit: HEADER_SOCIAL_KIT.whatsapp,
  },
]

function SocialIconPair({ kit }) {
  const fgClass = `header-media-fg header-media-fg--${kit.fgPosition}`
  return (
    <span className="header-media-slot" aria-hidden="true">
      <span className="header-media-stack header-media-stack--default">
        <img
          src={kit.default.bg}
          srcSet={getDirectAssetSrcSet(kit.default.bg)}
          alt=""
          className="header-media-bg"
          width={24}
          height={24}
          decoding="async"
        />
        <img src={kit.default.fg} srcSet={getDirectAssetSrcSet(kit.default.fg)} alt="" className={fgClass} decoding="async" />
      </span>
      <span className="header-media-stack header-media-stack--hover">
        <img
          src={kit.hover.bg}
          srcSet={getDirectAssetSrcSet(kit.hover.bg)}
          alt=""
          className="header-media-bg"
          width={24}
          height={24}
          decoding="async"
        />
        <img src={kit.hover.fg} srcSet={getDirectAssetSrcSet(kit.hover.fg)} alt="" className={fgClass} decoding="async" />
      </span>
    </span>
  )
}

/** Header social: default/hover image stacks */
export function HeaderSocialIcons({ labels }) {
  return (
    <ul className="header-media-list">
      {ICONS.map(({ key, href, labelKey, kit }) => (
        <li key={key}>
          <a
            href={href}
            className="header-media-link"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={labels[labelKey]}
          >
            <SocialIconPair kit={kit} />
          </a>
        </li>
      ))}
    </ul>
  )
}
