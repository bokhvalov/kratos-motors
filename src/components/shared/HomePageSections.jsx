import { HomeCtaStrip, HomeHero, HomeTzSection } from '../home'
import { AboutSection } from './AboutSection'
import { WhyTrustSection } from './WhyTrustSection'
import { LeadFormSection } from './LeadFormSection'
import { RealizationsSection } from './RealizationsSection'
import { FinalCtaSection } from './FinalCtaSection'

export function HomePageSections() {
  return (
    <>
      <HomeHero />
      <HomeTzSection />
      <HomeCtaStrip />
      <AboutSection />
      <WhyTrustSection />
      <LeadFormSection />
      <RealizationsSection />
      <FinalCtaSection />
    </>
  )
}
