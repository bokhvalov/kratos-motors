
const LEVEL_BY_PREFIX = {
  'Property 1=H1': 'h1',
  'Property 1=H2': 'h2',
  'Property 1=H3': 'h3',
  'Property 1=H4': 'h4',
  'Property 1=H5': 'h5',
}

function levelForVariant(variant) {
  for (const [prefix, tag] of Object.entries(LEVEL_BY_PREFIX)) {
    if (variant.startsWith(prefix)) return tag
  }
  return 'p'
}

/** Heading; `variant` matches Property 1=… tokens */
export function UiHeading({ variant, as, className = '', children, ...props }) {
  const Tag = as || levelForVariant(variant)
  return (
    <Tag
      className={['ui-heading', className].filter(Boolean).join(' ')}
      data-figma-variant={variant}
      {...props}
    >
      {children}
    </Tag>
  )
}
