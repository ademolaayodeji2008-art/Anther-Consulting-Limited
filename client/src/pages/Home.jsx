import SEO                from '../components/SEO.jsx'
import HeroSection        from '../components/home/HeroSection.jsx'
import WhoWeAreSection    from '../components/home/WhoWeAreSection.jsx'
import OurServicesSection from '../components/home/OurServicesSection.jsx'
import OtherServicesSection from '../components/home/OtherServicesSection.jsx'
import CtaBannerSection   from '../components/home/CtaBannerSection.jsx'

export default function Home() {
  return (
    <>
      <SEO
        title={null}  /* uses default full site title */
        description="Anther Consulting Limited offers expert accounting, tax advisory, audit, and business consulting services across Nigeria since 2013."
        path="/"
      />
      <HeroSection />
      <WhoWeAreSection />
      <OurServicesSection />
      <OtherServicesSection />
      <CtaBannerSection />
    </>
  )
}
