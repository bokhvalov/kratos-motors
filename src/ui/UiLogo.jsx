import { Link } from 'react-router-dom'

/** Logo mark + wordmark */
export function UiLogo({
  variant,
  markSrc,
  wordmarkSrc,
  wordmarkAlt = 'Kratos Motors',
  to = '/',
  className = '',
  ...props
}) {
  return (
    <Link
      to={to}
      className={['ui-logo', className].filter(Boolean).join(' ')}
      data-figma-variant={variant}
      {...props}
    >
      <img src={markSrc} alt="" width={64} height={70} className="ui-logo__mark" decoding="async" />
      <img src={wordmarkSrc} alt={wordmarkAlt} width={65} height={32} className="ui-logo__wordmark" decoding="async" />
    </Link>
  )
}
