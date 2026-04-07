import { Link } from 'react-router-dom'

/**
 * Nav link variants. Header: default `menu=1`, active `menu=2`. Footer active: `menu=4`.
 * `menu=3` is the 1px underline state — not used as the header “current” style.
 */
export function UiNavMenuLink({ variant, to, className = '', children, ...props }) {
  return (
    <Link
      to={to}
      className={['ui-nav-menu-link', className].filter(Boolean).join(' ')}
      data-figma-variant={variant}
      {...props}
    >
      <span className="ui-nav-menu-link__label">{children}</span>
    </Link>
  )
}
