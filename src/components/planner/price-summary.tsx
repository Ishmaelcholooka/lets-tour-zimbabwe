// src/components/planner/price-summary.tsx
'use client'
import { usePlannerStore } from '@/stores/planner-store'
import { calculateTripPrice } from '@/lib/utils/price'
import { cn } from '@/lib/utils/cn'

interface PriceSummaryProps {
  className?: string
}

export function PriceSummary({ className }: PriceSummaryProps) {
  const {
    step,
    selectedActivityIds,
    selectedSleepingType,
    selectedFacilities,
    dailyMeals,
    groupSize,
    durationDays,
  } = usePlannerStore()

  if (step < 2) return null

  const { activitiesPerPerson, accommodationPerPerson, mealsPerPerson, totalPerPerson, totalGroup, nights } =
    calculateTripPrice({ selectedActivityIds, selectedSleepingType, selectedFacilities, dailyMeals, durationDays, groupSize })

  const hasActivities = activitiesPerPerson > 0
  const hasAccommodation = accommodationPerPerson > 0
  const hasMeals = mealsPerPerson > 0
  const hasAny = hasActivities || hasAccommodation || hasMeals

  return (
    <div className={cn('bg-white border border-gray-200 rounded-2xl shadow-lg p-4 sm:p-5', className)}>
      <p className="text-xs font-semibold uppercase tracking-wider text-brand-navy-400 mb-3">
        Price Estimate
      </p>

      <div className="space-y-2 text-sm">
        {hasActivities && (
          <div className="flex justify-between text-brand-navy-700">
            <span>Activities</span>
            <span className="font-semibold">${activitiesPerPerson.toLocaleString()} / person</span>
          </div>
        )}
        {hasAccommodation && (
          <div className="flex justify-between text-brand-navy-700">
            <span>Accommodation ({nights} nights)</span>
            <span className="font-semibold">${accommodationPerPerson.toLocaleString()} / person</span>
          </div>
        )}
        {hasMeals && (
          <div className="flex justify-between text-brand-navy-700">
            <span>Meals</span>
            <span className="font-semibold">${mealsPerPerson.toLocaleString()} / person</span>
          </div>
        )}
        {!hasAny && (
          <p className="text-brand-navy-400 text-xs italic">Select activities, accommodation, and meals to see pricing.</p>
        )}
      </div>

      {hasAny && (
        <>
          <div className="border-t border-gray-100 my-3" />
          <div className="flex justify-between text-brand-navy-900 font-extrabold text-base">
            <span>Est. Total</span>
            <span className="text-brand-orange-500">
              ${totalPerPerson.toLocaleString()}
              <span className="text-xs font-normal text-brand-navy-400"> /person</span>
            </span>
          </div>
          {groupSize > 1 && (
            <div className="flex justify-between text-brand-navy-500 text-xs mt-1">
              <span>Group of {groupSize}</span>
              <span className="font-semibold">${totalGroup.toLocaleString()} total</span>
            </div>
          )}
        </>
      )}

      <p className="text-brand-navy-300 text-xs mt-3 leading-relaxed">
        * Estimate only. Final quote confirmed after review.
      </p>
    </div>
  )
}
