// src/components/planner/planner-wizard.tsx
'use client'
import { useEffect } from 'react'
import { usePlannerStore } from '@/stores/planner-store'
import { PlannerProgress } from './planner-progress'
import { PriceSummary } from './price-summary'
import { StepDestinations } from './step-destinations'
import { StepActivities } from './step-activities'
import { StepItinerary } from './step-itinerary'
import { StepAccommodationAmenities } from './step-accommodation-amenities'
import { StepMeals } from './step-meals'
import { StepQuote } from './step-quote'

const stepTitles: Record<number, { title: string; subtitle: string }> = {
  1: { title: 'Where do you want to go?', subtitle: 'Pick your destinations and tell us about your trip.' },
  2: { title: 'What do you want to do?', subtitle: 'Select activities and experiences at each destination.' },
  3: { title: 'Review your itinerary', subtitle: "We've ordered your route for efficiency. Adjust as you like." },
  4: { title: 'Choose your accommodation', subtitle: 'Pick your sleeping style and the facilities that matter to you.' },
  5: { title: 'Plan your meals', subtitle: "Choose what you'll eat for each day on tour." },
  6: { title: 'Your quote is ready', subtitle: 'Review your full trip and request a formal quote by email.' },
}

export function PlannerWizard() {
  const step = usePlannerStore((s) => s.step)
  const { title, subtitle } = stepTitles[step]
  const showPriceSummary = step >= 2

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [step])

  return (
    <div className="min-h-screen bg-gray-50 pt-16 lg:pt-20">
      {/* Progress bar — sticks just below the fixed marketing nav */}
      <div className="sticky top-16 lg:top-20 z-40">
        <PlannerProgress />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {/* Step heading */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-navy-900">{title}</h1>
          <p className="text-brand-navy-500 text-sm sm:text-base mt-1">{subtitle}</p>
        </div>

        {/* Main layout: step content + sticky price summary on large screens */}
        <div className="flex gap-8 items-start">
          {/* Step content */}
          <div className="flex-1 min-w-0">
            {step === 1 && <StepDestinations />}
            {step === 2 && <StepActivities />}
            {step === 3 && <StepItinerary />}
            {step === 4 && <StepAccommodationAmenities />}
            {step === 5 && <StepMeals />}
            {step === 6 && <StepQuote />}
          </div>

          {/* Sticky price sidebar — lg+ only */}
          {showPriceSummary && (
            <div className="hidden lg:block w-64 xl:w-72 shrink-0 sticky top-28">
              <PriceSummary />
            </div>
          )}
        </div>

        {/* Mobile price bar — shown from step 2 onward, hidden on quote step */}
        {showPriceSummary && step < 6 && (
          <div className="lg:hidden mt-6">
            <PriceSummary />
          </div>
        )}
      </div>
    </div>
  )
}
