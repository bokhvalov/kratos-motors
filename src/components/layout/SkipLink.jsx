import { useTranslation } from 'react-i18next'

export function SkipLink() {
  const { t } = useTranslation()

  return (
    <a href="#main" className="skip-link">
      {t('a11y.skipToContent')}
    </a>
  )
}
