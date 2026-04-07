import { useTranslation } from 'react-i18next'
import { UiButton } from '../ui/UiButton'
import { Button1 } from '../ui/variants'
import { PageMeta } from '../components/shared/PageMeta'
import { ASSETS, getAssetSrcSet, getAssetUrl } from '../lib/assets'
import './Page.css'

const NOT_FOUND_IMG = ASSETS.home.notFound
const NOT_FOUND_HEADING = ASSETS.home.notFoundHeading

export function NotFoundPage() {
  const { t } = useTranslation()

  return (
    <>
      <PageMeta
        title={t('pages.404.metaTitle')}
        description={t('pages.404.metaDescription')}
        noIndex
      />

      <div className="not-found-page" role="status" aria-live="polite">
        <div className="not-found-page__hero">
          <div className="not-found-page__visual" aria-hidden="true">
            <img
              className="not-found-page__photo"
              src={getAssetUrl('home', NOT_FOUND_IMG, 1)}
              srcSet={getAssetSrcSet('home', NOT_FOUND_IMG)}
              sizes="100vw"
              alt=""
              decoding="async"
            />
          </div>

          <div className="not-found-page__column">
            <div className="not-found-page__heading-wrap">
              <img
                className="not-found-page__heading-graphic"
                src={getAssetUrl('home', NOT_FOUND_HEADING, 1)}
                alt={t('pages.404.title')}
                decoding="async"
              />
            </div>

            <div className="not-found-page__card">
              <div className="not-found-page__card-intro">
                <h1 className="not-found-page__exclaim">{t('pages.404.exclaim')}</h1>
                <p className="not-found-page__lead">{t('pages.404.lead')}</p>
              </div>
              <p className="not-found-page__body">{t('pages.404.body')}</p>
              <UiButton to="/" variant={Button1['1']}>
                {t('pages.404.cta')}
              </UiButton>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
