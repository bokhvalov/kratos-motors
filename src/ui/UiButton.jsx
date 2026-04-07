import { Link } from 'react-router-dom'

/**
 * Kit button; `variant` is the exact symbol string (see variants.js).
 * Use `withComponentScope` if names collide across components.
 */
export function UiButton({
  variant,
  children,
  to,
  href,
  className = '',
  type = 'button',
  ...props
}) {
  const cls = ['ui-btn', className].filter(Boolean).join(' ')
  const data = { 'data-figma-variant': variant }

  if (to) {
    return (
      <Link to={to} className={cls} {...data} {...props}>
        {children}
      </Link>
    )
  }
  if (href) {
    return (
      <a href={href} className={cls} {...data} {...props}>
        {children}
      </a>
    )
  }
  return (
    <button type={type} className={cls} {...data} {...props}>
      {children}
    </button>
  )
}
