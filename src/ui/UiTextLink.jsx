
function ArrowRight({ className }) {
  return (
    <svg
      className={className}
      width={13}
      height={14}
      viewBox="0 0 13 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M1 7h10M11 7l-5-5M11 7l-5 5"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/** Text link + arrow */
export function UiTextLink({
  variant,
  href,
  children,
  className = '',
  showArrow = true,
  target,
  rel,
  ...props
}) {
  return (
    <a
      href={href}
      className={['ui-text-link', className].filter(Boolean).join(' ')}
      data-figma-variant={variant}
      target={target}
      rel={rel}
      {...props}
    >
      <span>{children}</span>
      {showArrow ? (
        <span className="ui-text-link__arrow" aria-hidden>
          <ArrowRight />
        </span>
      ) : null}
    </a>
  )
}
