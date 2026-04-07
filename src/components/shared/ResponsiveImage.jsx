/**
 * Responsive image: multiple resolutions via srcSet/sizes.
 * Use src for single image; srcSet array for multiple resolutions.
 * srcSet format: [{ src, width }, ...] — width in px (e.g. 394, 744, 1440).
 */
export function ResponsiveImage({
  src,
  srcSet: srcSetArray,
  sizes = '(max-width: 394px) 100vw, (max-width: 744px) 100vw, 1440px',
  alt,
  width,
  height,
  loading = 'lazy',
  className,
  ...props
}) {
  const srcSet = Array.isArray(srcSetArray)
    ? srcSetArray.map(({ src: s, width: w }) => `${s} ${w}w`).join(', ')
    : typeof srcSetArray === 'string'
      ? srcSetArray
      : /@1x\.webp(?:\?|#|$)/i.test(src)
        ? [1, 2, 3].map((scale) => `${src.replace('@1x.webp', `@${scale}x.webp`)} ${scale}x`).join(', ')
        : undefined

  return (
    <img
      src={src}
      srcSet={srcSet}
      sizes={sizes}
      alt={alt}
      width={width}
      height={height}
      loading={loading}
      decoding="async"
      className={className}
      {...props}
    />
  )
}
