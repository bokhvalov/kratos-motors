
/** Text field; `variant` matches kit symbol (e.g. {@link FormField}). */
export function UiInput({ variant, className = '', ...props }) {
  return (
    <input
      className={['ui-input', className].filter(Boolean).join(' ')}
      data-figma-variant={variant}
      {...props}
    />
  )
}
