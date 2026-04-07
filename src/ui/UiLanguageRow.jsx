/** Language row on light panel */
export function UiLanguageRow({ variant, as: Tag = 'div', className = '', children, ...props }) {
  return (
    <Tag
      className={['ui-language-row', className].filter(Boolean).join(' ')}
      data-figma-variant={variant}
      {...props}
    >
      {children}
    </Tag>
  )
}
