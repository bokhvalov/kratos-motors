import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { UiButton } from "../../ui/UiButton";
import { Button1 } from "../../ui/variants";
import { useOpenBooking } from "../../context/BookingContext";
import { Breadcrumb } from "./Breadcrumb";
import { getAssetUrl, getAssetSrcSet } from "../../lib/assets";
import { HEADER_ASSETS } from "../../lib/headerAssets";
import { SITE_SOCIAL } from "../../lib/site";
import "./brand-sections.css";

export function BrandHeroSection({
  brandLabel,
  brandSlug,
  imageFilename,
  folder,
}) {
  const { t } = useTranslation();
  const openBooking = useOpenBooking();

  return (
    <section className="brand-hero" aria-labelledby="brand-hero-title">
      <div className="brand-hero__bg" aria-hidden="true">
        <img
          src={getAssetUrl(folder, imageFilename)}
          srcSet={getAssetSrcSet(folder, imageFilename)}
          alt=""
          // eslint-disable-next-line react/no-unknown-property
          fetchpriority="high"
          decoding="async"
        />
      </div>
      <div className="brand-hero__overlay" aria-hidden="true" />

      <div className="brand-hero__content">
        <Breadcrumb
          items={[{ label: t(`nav.brands.${brandSlug}`), to: null }]}
        />

        <div className="brand-hero__inner">
          <h1 id="brand-hero-title" className="brand-hero__title">
            {t("pages.brands.heroTitle", { brand: brandLabel })}
          </h1>
          <p className="brand-hero__lead">{t("pages.brands.heroLead")}</p>

          <div className="brand-hero__actions">
            <UiButton variant={Button1["1"]} type="button" onClick={openBooking}>
              {t("header.cta")}
            </UiButton>
            <UiButton
              href={SITE_SOCIAL.whatsapp}
              variant={Button1["3"]}
              target="_blank"
              rel="noopener noreferrer"
              className="brand-hero__whatsapp"
            >
              <img
                src={HEADER_ASSETS.whatsapp}
                alt=""
                width={22}
                height={22}
                className="brand-hero__whatsapp-icon"
                decoding="async"
                aria-hidden="true"
              />
              WhatsApp
            </UiButton>
          </div>
        </div>
      </div>
    </section>
  );
}

BrandHeroSection.propTypes = {
  brandLabel: PropTypes.string.isRequired,
  brandSlug: PropTypes.string.isRequired,
  imageFilename: PropTypes.string.isRequired,
  folder: PropTypes.string.isRequired,
};
