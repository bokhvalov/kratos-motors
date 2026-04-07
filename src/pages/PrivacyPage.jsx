import { useTranslation } from 'react-i18next'
import { PageMeta } from '../components/shared/PageMeta'
import { Breadcrumb } from '../components/shared/Breadcrumb'
import './Page.css'

function readList(t, key) {
  const v = t(key, { returnObjects: true })
  return Array.isArray(v) ? v : []
}

function PrivacyList({ items, muted }) {
  if (!items.length) return null
  return (
    <ul className={muted ? 'privacy-page__list privacy-page__list--muted' : 'privacy-page__list'}>
      {items.map((text, i) => (
        <li key={i}>{text}</li>
      ))}
    </ul>
  )
}

export function PrivacyPage() {
  const { t } = useTranslation()

  const s1Lines = readList(t, 'pages.privacy.s1.lines')
  const s2Items = readList(t, 'pages.privacy.s2.items')
  const s3Items = readList(t, 'pages.privacy.s3.items')
  const s4Items = readList(t, 'pages.privacy.s4.items')
  const s7Items = readList(t, 'pages.privacy.s7.items')

  return (
    <div className="privacy-page-shell">
      <PageMeta title={t('pages.privacy.metaTitle')} description={t('pages.privacy.metaDescription')} />

      <div className="page-container privacy-page">
        <Breadcrumb items={[{ label: t('nav.privacy'), to: null }]} />
        <h1 className="privacy-page__title">{t('pages.privacy.title')}</h1>

        <div className="privacy-page__stack">
          <h2 className="privacy-page__h2">{t('pages.privacy.s1.heading')}</h2>
          {s1Lines
            .filter((line) => line && typeof line === 'object' && line.label != null && line.value != null)
            .map((line, i) => (
              <p key={i} className="privacy-page__p">
                <span className="privacy-page__strong">{line.label}</span> {line.value}
              </p>
            ))}

          <h2 className="privacy-page__h2">{t('pages.privacy.s2.heading')}</h2>
          <p className="privacy-page__p">{t('pages.privacy.s2.intro')}</p>
          <PrivacyList items={s2Items} />

          <h2 className="privacy-page__h2">{t('pages.privacy.s3.heading')}</h2>
          <p className="privacy-page__p">{t('pages.privacy.s3.intro')}</p>
          <PrivacyList items={s3Items} muted />

          <h2 className="privacy-page__h2">{t('pages.privacy.s4.heading')}</h2>
          <PrivacyList items={s4Items} />

          <h2 className="privacy-page__h2">{t('pages.privacy.s5.heading')}</h2>
          <p className="privacy-page__p">{t('pages.privacy.s5.body')}</p>

          <h2 className="privacy-page__h2">{t('pages.privacy.s6.heading')}</h2>
          <p className="privacy-page__p">{t('pages.privacy.s6.body')}</p>

          <h2 className="privacy-page__h2">{t('pages.privacy.s7.heading')}</h2>
          <p className="privacy-page__p">{t('pages.privacy.s7.intro')}</p>
          <PrivacyList items={s7Items} />

          <h2 className="privacy-page__h2">{t('pages.privacy.s8.heading')}</h2>
          <p className="privacy-page__p">{t('pages.privacy.s8.body')}</p>

          <h2 className="privacy-page__h2">{t('pages.privacy.s9.heading')}</h2>
          <p className="privacy-page__p">{t('pages.privacy.s9.body')}</p>

          <h2 className="privacy-page__h2">{t('pages.privacy.s10.heading')}</h2>
          <p className="privacy-page__p">{t('pages.privacy.s10.body')}</p>

          <h2 className="privacy-page__h2">{t('pages.privacy.s11.heading')}</h2>
          <p className="privacy-page__p">{t('pages.privacy.s11.body')}</p>

          <p className="privacy-page__p">{t('pages.privacy.footerNote')}</p>
        </div>
      </div>
    </div>
  )
}
