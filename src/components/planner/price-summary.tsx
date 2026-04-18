// src/components/planner/price-summary.tsx
'use client'
import { usePlannerStore } from '@/stores/planner-store'
import { getItemById } from '@/lib/data/itinerary-items'
import { getTierBySlug } from '@/lib/data/accommodation'
import { cn } from '@/lib/utils/cn'

interface PriceSummaryProps {
  className?: string
}

export function PriceSummary({ className }: PriceSummaryProps) {
  const {
    step,
    selectedActivityIds,
    accommodationTier,
    groupSize,
    durationDays,
    selectedDestinationSlugs,
  } = usePlannerStore()

  if (step < 2) return null

  // Activities total per person
  const activitiesPerPerson = Object.values(selectedActivityIds)
    .flat()
    .reduce((sum, id) => {
      const item = getItemById(id)
      return sum + (item?.priceUsd ?? 0)
    }, 0)

  // Accommodation total per person
  const nights = Math.max(durationDays - 1, 1)
  const tier = accommodationTier ? getTierBySlug(accommodationTier) : null
  const stayPerPerson = tier ? tier.pricePerNightUsd * nights : 0

  const totalPerPerson = activitiesPerPerson + stayPerPerson
  const totalGroup = totalPerPerson * Math.max(groupSize, 1)

  const hasActivities = activitiesPerPerson > 0
  const hasStay = stayPerPerson > 0

  return (
    <div
      className={cn(
        'bg-white border border-gray-200 rounded-2xl shadow-lg p-4 sm:p-5',
        className,
      )}
    >
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
        {hasStay && (
          <div className="flex justify-between text-brand-navy-700">
            <span>Stay ({nights} nights)</span>
            <span className="font-semibold">${stayPerPerson.toLocaleString()} / person</span>
          </div>
        )}
        {!hasActivities && !hasStay && (
          <p className="text-brand-navy-400 text-xs italic">Select activities and a stay tier to see pricing.</p>
        )}
      </div>

      {(hasActivities || hasStay) && (
        <>
          <div className="border-t border-gray-100 my-3" />
          <div className="flex justify-between text-brand-navy-900 font-extrabold text-base">
            <span>Est. Total</span>
            <span className="text-brand-orange-500">${totalPerPerson.toLocaleString()}<span className="text-xs font-normal text-brand-navy-400"> /person</span></span>
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
