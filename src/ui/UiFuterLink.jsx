/**
 * Contact row link (`futer=1 header`, etc.).
 * Pass `href` or render as `<span>` with `as="span"` when there is no URL.
 */
export function UiFuterLink({
  variant,
  href,
  as,
  className = '',
  children,
  ...props
}) {
  const Tag = as || (href ? 'a' : 'span')
  const linkProps =
    Tag === 'a'
      ? { href, ...props }
      : props
  return (
    <Tag
      className={['ui-futer-link', className].filter(Boolean).join(' ')}
      data-figma-variant={variant}
      {...linkProps}
    >
      {children}
    </Tag>
  )
}
