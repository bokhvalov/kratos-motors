import { getAssetUrl } from '../../lib/assets'
import './WhyTrustCardIcon.css'

const FOLDER = 'home/why-trust'

function asset(name) {
  return getAssetUrl(FOLDER, name)
}

/** Why-trust cards: layered SVGs */
export function WhyTrustCardIcon({ variant }) {
  if (variant === 1) {
    return (
      <div className="why-trust-section__icon" aria-hidden="true">
        <div className="why-trust-section__icon-layer why-trust-section__icon-layer--fill">
          <img src={asset('i7-0.svg')} alt="" decoding="async" />
        </div>
        <div className="why-trust-section__icon-layer why-trust-section__icon-layer--i7-1">
          <img src={asset('i7-1.svg')} alt="" decoding="async" />
        </div>
        <div className="why-trust-section__icon-layer why-trust-section__icon-layer--i7-2">
          <img src={asset('i7-2.svg')} alt="" decoding="async" />
        </div>
        <div className="why-trust-section__icon-layer why-trust-section__icon-layer--i7-3">
          <img src={asset('i7-3.svg')} alt="" decoding="async" />
        </div>
      </div>
    )
  }

  if (variant === 2) {
    return (
      <div className="why-trust-section__icon" aria-hidden="true">
        <div className="why-trust-section__icon-layer why-trust-section__icon-layer--fill">
          <img src={asset('i8-0.svg')} alt="" decoding="async" />
        </div>
        <div className="why-trust-section__icon-layer why-trust-section__icon-layer--i8-1">
          <img src={asset('i8-1.svg')} alt="" decoding="async" />
        </div>
        <div className="why-trust-section__icon-layer why-trust-section__icon-layer--i8-gear">
          <div className="why-trust-section__icon-flip-y">
            <img src={asset('i8-2.svg')} alt="" decoding="async" />
          </div>
        </div>
      </div>
    )
  }

  if (variant === 3) {
    return (
      <div className="why-trust-section__icon" aria-hidden="true">
        <div className="why-trust-section__icon-layer why-trust-section__icon-layer--fill">
          <img src={asset('i10-0.svg')} alt="" decoding="async" />
        </div>
        <div className="why-trust-section__icon-layer why-trust-section__icon-layer--i10-1">
          <img src={asset('i10-1.svg')} alt="" decoding="async" />
        </div>
        <div className="why-trust-section__icon-layer why-trust-section__icon-layer--i10-2">
          <img src={asset('i10-2.svg')} alt="" decoding="async" />
        </div>
        <div className="why-trust-section__icon-layer why-trust-section__icon-layer--i10-3">
          <img src={asset('i10-3.svg')} alt="" decoding="async" />
        </div>
        <div className="why-trust-section__icon-layer why-trust-section__icon-layer--i10-4">
          <img src={asset('i10-4.svg')} alt="" decoding="async" />
        </div>
        <div className="why-trust-section__icon-layer why-trust-section__icon-layer--i10-5">
          <img src={asset('i10-5.svg')} alt="" decoding="async" />
        </div>
      </div>
    )
  }

  return (
    <div className="why-trust-section__icon" aria-hidden="true">
      <div className="why-trust-section__icon-layer why-trust-section__icon-layer--i9-0">
        <img src={asset('i9-0.svg')} alt="" decoding="async" />
      </div>
      <div className="why-trust-section__icon-layer why-trust-section__icon-layer--i9-1">
        <img src={asset('i9-1.svg')} alt="" decoding="async" />
      </div>
    </div>
  )
}
