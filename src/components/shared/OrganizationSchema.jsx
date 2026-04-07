import { SITE_ORIGIN, SITE_SOCIAL } from '../../lib/site'
import { publicAssetUrl } from '../../lib/assets'

/**
 * JSON-LD: AutoRepair (semantics/SEO doc)
 */
export function OrganizationSchema() {
  const logoRel = publicAssetUrl('assets/logo.svg')
  const logoUrl = new URL(logoRel, `${SITE_ORIGIN}/`).href

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'AutoRepair',
    '@id': `${SITE_ORIGIN}/#business`,
    name: 'Kratos Motors',
    image: logoUrl,
    logo: {
      '@type': 'ImageObject',
      url: logoUrl,
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Przedświt 10',
      addressLocality: 'Wrocław',
      postalCode: '54-618',
      addressCountry: 'PL',
    },
    telephone: '+48516520380',
    email: 'nizaruama@gmail.com',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '17:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Saturday', 'Sunday'],
        opens: '00:00',
        closes: '00:00',
        closed: true,
      },
    ],
    url: `${SITE_ORIGIN}/`,
    sameAs: [SITE_SOCIAL.instagram, SITE_SOCIAL.telegram, SITE_SOCIAL.whatsapp],
    priceRange: '$$',
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
