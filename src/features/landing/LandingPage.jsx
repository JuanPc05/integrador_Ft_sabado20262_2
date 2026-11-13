// Importamos todas las secciones gracias al Patrón Barril (index.js)
import {
  HeroSection,
  HowItWorksSection,
  RolesSection,
  LandingAnalyticsSection,
  ActiveChallengesSection,
  TestimonialsSection,
  CallToActionBanner,
} from '@/features/landing/components';

export function LandingPage() {
  return (
    <div className="flex flex-col gap-24 py-12 md:py-20 max-w-7xl mx-auto px-6 md:px-12 w-full">
      <HeroSection />
      <HowItWorksSection />
      <RolesSection />
      <LandingAnalyticsSection />
      <ActiveChallengesSection />
      <TestimonialsSection />
      <CallToActionBanner />
    </div>
  );
}

// Mantenemos el export default por si el enrutador lo necesita
export default LandingPage;