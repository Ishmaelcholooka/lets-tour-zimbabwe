// src/components/planner/step-accommodation.tsx
'use client'
import { Check } from 'lucide-react'
import { usePlannerStore } from '@/stores/planner-store'
import { accommodationTiers } from '@/lib/data/accommodation'
import type { AccommodationTier } from '@/lib/data/accommodation'
import { cn } from '@/lib/utils/cn'

export function StepAccommodation() {
  const { accommodationTier, durationDays, setAccommodationTier, nextStep, prevStep } =
    usePlannerStore()

  const nights = Math.max(durationDays - 1, 1)

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-bold text-brand-navy-900 mb-1">Stay &amp; Dining Tier</h2>
        <p className="text-brand-navy-500 text-sm">
          Choose one tier that applies across all your destinations. Your final quote will include
          specific property options for each location.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {accommodationTiers.map((tier) => {
          const selected = accommodationTier === tier.tier
          const estimatedTotal = tier.pricePerNightUsd * nights

          return (
            <button
              key={tier.tier}
              type="button"
              onClick={() => setAccommodationTier(tier.tier as AccommodationTier)}
              className={cn(
                'text-left rounded-2xl border-2 p-5 transition-all duration-200 focus:outline-none',
                selected
                  ? 'border-brand-orange-500 shadow-lg bg-brand-orange-50'
                  : 'border-gray-200 bg-white hover:border-brand-orange-300 hover:shadow-sm',
              )}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{tier.emoji}</span>
                  <div>
                    <p className="font-extrabold text-brand-navy-900 text-base">{tier.label}</p>
                    <p className="text-brand-navy-500 text-xs">{tier.accommodationType}</p>
                  </div>
                </div>
                <div className={cn(
                  'w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0',
                  selected ? 'bg-brand-orange-500 border-brand-orange-500' : 'border-gray-300',
                )}>
                  {selected && <Check className="w-3.5 h-3.5 text-white" />}
                </div>
              </div>

              {/* Meal plan */}
              <div className="mb-3">
                <span className="text-xs font-semibold text-brand-navy-600 uppercase tracking-wider">Meals</span>
                <p className="text-sm text-brand-navy-700 mt-0.5">{tier.mealPlan}</p>
              </div>

              {/* Price */}
              <div className="mb-4">
                <span className="text-2xl font-extrabold text-brand-orange-500">
                  ${tier.pricePerNightUsd}
                </span>
                <span className="text-brand-navy-400 text-xs ml-1">/ person / night</span>
                <p className="text-xs text-brand-navy-400 mt-0.5">
                  Est. ${tier.priceMinUsd}–${tier.priceMaxUsd} range · {nights} nights ≈ ${estimatedTotal.toLocaleString()} total
                </p>
              </div>

              {/* Includes */}
              <ul className="space-y-1.5">
                {tier.includes.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-xs text-brand-navy-600">
                    <span className="text-brand-orange-400 mt-0.5 shrink-0">✓</span>
                    {item}
                  </li>
                ))}
              </ul>

              {selected && (
                <div className="mt-4 pt-3 border-t border-brand-orange-200 text-xs font-semibold text-brand-orange-600 flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5" /> Selected
                </div>
              )}
            </button>
          )
        })}
      </div>

      {/* Nav */}
      <div className="flex items-center justify-between pt-2">
        <button
          type="button"
          onClick={prevStep}
          className="px-6 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-brand-navy-700 hover:border-brand-orange-300 transition-colors"
        >
          ← Back
        </button>
        <button
          type="button"
          onClick={nextStep}
          disabled={!accommodationTier}
          className="px-8 py-2.5 rounded-xl bg-brand-orange-500 text-white font-bold text-sm hover:bg-brand-orange-600 transition-colors shadow-md disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Review &amp; Get Quote →
        </button>
      </div>
    </div>
  )
}
