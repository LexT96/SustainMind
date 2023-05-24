import { LandingNavBar } from "../components/Navbars/LandingNavbar"
import { LandingFeaturesSection } from "../components/sections/landing/LandingFeaturesSection"
import { LandingHeroSection } from "../components/sections/landing/LandingHeroSection"
import { LandingMissionSection } from "../components/sections/landing/LandingMissionSection"
import { LandingNewsletterSection } from "../components/sections/landing/LandingNewsletterSection"
import { LandingProblemSection } from "../components/sections/landing/LandingProblemSection"

export const LandingPage = () => {
    return (
      <>
        <LandingNavBar />
        <LandingHeroSection />
        <LandingProblemSection />
        <LandingMissionSection />
        <LandingFeaturesSection />
        <LandingNewsletterSection />
      </>
    );
}