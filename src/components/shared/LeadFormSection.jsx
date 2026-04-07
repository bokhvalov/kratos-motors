import PropTypes from 'prop-types'
import { UiButton } from '../../ui/UiButton'
import { Button1, FormField, KratosText } from '../../ui/variants'
import { UiHeading } from '../../ui/UiHeading'
import { UiInput } from '../../ui/UiInput'
import { ResponsiveImage } from './ResponsiveImage'
import { FormChevronDown } from './FormChevronDown'
import { HomeFormSuccessModal } from './HomeFormSuccessModal'
import { useHomeLeadForm } from '../../hooks/useHomeLeadForm'
import { getAssetUrl, ASSETS } from '../../lib/assets'
import './lead-form-section.css'

export function LeadFormSection({
  imageFolder = 'home',
  imageFilename = ASSETS.home.formBlockSide,
  imageSide = 'left',
}) {
  const f = useHomeLeadForm()
  const sectionClass =
    'lead-form-section' +
    (imageSide === 'right' ? ' lead-form-section--media-right' : ' lead-form-section--media-left')

  return (
    <>
      <section className={sectionClass} aria-labelledby="form-block-heading">
        <div className="lead-form-section__inner">
          <div className="lead-form-section__media">
            <ResponsiveImage
              src={getAssetUrl(imageFolder, imageFilename)}
              alt=""
              className="lead-form-section__img"
              sizes="(max-width: 744px) 100vw, 789px"
            />
          </div>
          <div className="lead-form-section__content">
            <h2 id="form-block-heading" className="lead-form-section__heading">
              <UiHeading as="span" variant={KratosText.H1_WHITE} className="lead-form-section__heading-line">
                {f.t('home.formHeading')}
              </UiHeading>{' '}
              <UiHeading as="span" variant={KratosText.H1_GREY} className="lead-form-section__heading-line">
                {f.formHeadingMuted}
              </UiHeading>
            </h2>
            <form className="lead-form-section__form" onSubmit={f.handleFormSubmit} noValidate>
              <div className="lead-form-section__fields">
                <div className="lead-form-section__field">
                  <UiInput
                    id="home-form-name"
                    type="text"
                    name="name"
                    autoComplete="name"
                    variant={FormField['1']}
                    placeholder={f.t('home.formNamePlaceholder')}
                    value={f.name}
                    aria-required="true"
                    aria-invalid={!!f.homeFormErrors.name}
                    aria-describedby={f.homeFormErrors.name ? 'home-form-name-error' : undefined}
                    onChange={(e) => {
                      f.setName(e.target.value)
                      if (f.homeFormErrors.name) f.clearFieldError('name')
                    }}
                  />
                  {f.homeFormErrors.name ? (
                    <span id="home-form-name-error" className="lead-form-section__error" role="alert">
                      {f.homeFormErrors.name}
                    </span>
                  ) : null}
                </div>
                <div className="lead-form-section__field">
                  <UiInput
                    id="home-form-phone"
                    type="tel"
                    name="phone"
                    autoComplete="tel"
                    variant={FormField['1']}
                    placeholder={f.t('home.formPhonePlaceholder')}
                    value={f.phone}
                    aria-required="true"
                    aria-invalid={!!f.homeFormErrors.phone}
                    aria-describedby={f.homeFormErrors.phone ? 'home-form-phone-error' : undefined}
                    onChange={(e) => {
                      f.setPhone(e.target.value)
                      if (f.homeFormErrors.phone) f.clearFieldError('phone')
                    }}
                  />
                  {f.homeFormErrors.phone ? (
                    <span id="home-form-phone-error" className="lead-form-section__error" role="alert">
                      {f.homeFormErrors.phone}
                    </span>
                  ) : null}
                </div>
                <div className="lead-form-section__field">
                  <UiInput
                    id="home-form-vin"
                    type="text"
                    name="vin"
                    variant={FormField['1']}
                    placeholder={f.t('home.formVinPlaceholder')}
                    value={f.vin}
                    onChange={(e) => f.setVin(e.target.value)}
                  />
                </div>
                <div className="lead-form-section__field">
                  <div className="lead-form-section__select-wrap" ref={f.serviceWrapRef}>
                    <button
                      type="button"
                      id="home-form-service-trigger"
                      className="ui-input"
                      data-figma-variant={FormField['1']}
                      aria-haspopup="listbox"
                      aria-expanded={f.serviceOpen}
                      aria-controls={f.serviceListId}
                      aria-required="true"
                      aria-invalid={!!f.homeFormErrors.service}
                      aria-describedby={
                        f.homeFormErrors.service ? 'home-form-service-error' : undefined
                      }
                      aria-label={f.t('form.bookingServiceLabel')}
                      onClick={() => f.setServiceOpen((o) => !o)}
                    >
                      <span
                        className={
                          f.service
                            ? 'lead-form-section__select-value'
                            : 'lead-form-section__select-placeholder'
                        }
                      >
                        {f.service || f.t('home.formServicePlaceholder')}
                      </span>
                      <FormChevronDown className="lead-form-section__select-chevron" />
                    </button>
                    {f.serviceOpen ? (
                      <ul
                        id={f.serviceListId}
                        className="lead-form-section__select-list"
                        role="listbox"
                        aria-labelledby="home-form-service-trigger"
                      >
                        {f.services.map((label, i) => (
                          <li key={label || i} className="lead-form-section__select-item" role="presentation">
                            <button
                              type="button"
                              role="option"
                              aria-selected={f.service === label}
                              className="lead-form-section__select-option"
                              onClick={() => {
                                f.setService(label)
                                f.closeService()
                                if (f.homeFormErrors.service) f.clearFieldError('service')
                              }}
                            >
                              {label}
                            </button>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                  {f.homeFormErrors.service ? (
                    <span id="home-form-service-error" className="lead-form-section__error" role="alert">
                      {f.homeFormErrors.service}
                    </span>
                  ) : null}
                </div>
              </div>
              <UiButton variant={Button1['7']} type="submit" className="lead-form-section__submit">
                {f.t('home.formCta')}
              </UiButton>
            </form>
          </div>
        </div>
      </section>

      <HomeFormSuccessModal isOpen={f.homeFormSuccessOpen} onClose={f.closeHomeFormSuccess} />
    </>
  )
}

LeadFormSection.propTypes = {
  imageFolder: PropTypes.string,
  imageFilename: PropTypes.string,
  imageSide: PropTypes.oneOf(['left', 'right']),
}
