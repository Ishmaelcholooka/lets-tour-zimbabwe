// src/app/(marketing)/page.tsx
import { HeroSection } from '@/components/marketing/hero-section'
import { DestinationsSection } from '@/components/marketing/destinations-section'
import { HowItWorksSection } from '@/components/marketing/how-it-works-section'
import { UserTypesSection } from '@/components/marketing/user-types-section'
import { StatsSection } from '@/components/marketing/stats-section'
import { TestimonialsSection } from '@/components/marketing/testimonials-section'
import { CtaSection } from '@/components/marketing/cta-section'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <DestinationsSection />
      <HowItWorksSection />
      <UserTypesSection />
      <TestimonialsSection />
      <CtaSection />
    </>
  )
}
