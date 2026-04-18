// src/components/planner/step-accommodation-amenities.tsx
'use client'
import { Check } from 'lucide-react'
import { usePlannerStore } from '@/stores/planner-store'
import { sleepingTypes, facilities, getSleepingTypeById, getFacilityById } from '@/lib/data/accommodation'
import { cn } from '@/lib/utils/cn'

export function StepAccommodationAmenities() {
  const {
    selectedSleepingType,
    selectedFacilities,
    durationDays,
    groupSize,
    setSleepingType,
    toggleFacility,
    nextStep,
    prevStep,
  } = usePlannerStore()

  const nights = Math.max(durationDays - 1, 1)

  const sleepingCost = selectedSleepingType
    ? (getSleepingTypeById(selectedSleepingType)?.pricePerNightUsd ?? 0) * nights
    : 0

  const facilitiesCost = selectedFacilities.reduce((sum, id) => {
    const f = getFacilityById(id)
    return sum + (f ? f.pricePerNightUsd * nights : 0)
  }, 0)

  const totalPerPerson = sleepingCost + facilitiesCost

  return (
    <div className="space-y-8">
      {/* Sleeping Type */}
      <section>
        <h2 className="text-lg font-bold text-brand-navy-900 mb-1">Where will you sleep?</h2>
        <p className="text-brand-navy-500 text-sm mb-4">
          Choose your preferred sleeping arrangement — this applies across all your destinations.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {sleepingTypes.map((type) => {
            const selected = selectedSleepingType === type.id
            return (
              <button
                key={type.id}
                type="button"
                onClick={() => setSleepingType(type.id)}
                className={cn(
                  'text-left rounded-2xl border-2 p-4 transition-all duration-200 focus:outline-none',
                  selected
                    ? 'border-brand-orange-500 shadow-lg bg-brand-orange-50'
                    : 'border-gray-200 bg-white hover:border-brand-orange-300 hover:shadow-sm',
                )}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{type.emoji}</span>
                    <div>
                      <p className="font-extrabold text-brand-navy-900 text-sm">{type.label}</p>
                      <p className="text-brand-navy-500 text-xs mt-0.5">{type.description}</p>
                    </div>
                  </div>
                  <div
                    className={cn(
                      'w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5',
                      selected ? 'bg-brand-orange-500 border-brand-orange-500' : 'border-gray-300',
                    )}
                  >
                    {selected && <Check className="w-3 h-3 text-white" />}
                  </div>
                </div>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="text-lg font-extrabold text-brand-orange-500">${type.pricePerNightUsd}</span>
                  <span className="text-xs text-brand-navy-400">/ person / night</span>
                </div>
              </button>
            )
          })}
        </div>
      </section>

      {/* Facilities */}
      <section>
        <h2 className="text-lg font-bold text-brand-navy-900 mb-1">What facilities do you need?</h2>
        <p className="text-brand-navy-500 text-sm mb-4">Select any that matter to you — these will be matched in your final quote.</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {facilities.map((f) => {
            const selected = selectedFacilities.includes(f.id)
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => toggleFacility(f.id)}
                className={cn(
                  'flex flex-col items-center gap-1.5 p-3 rounded-xl border-2 text-center transition-all duration-200 focus:outline-none',
                  selected
                    ? 'border-brand-orange-500 bg-brand-orange-50 shadow-sm'
                    : 'border-gray-200 bg-white hover:border-brand-orange-300',
                )}
              >
                <span className="text-xl">{f.emoji}</span>
                <span className={cn('text-xs font-semibold', selected ? 'text-brand-orange-600' : 'text-brand-navy-700')}>
                  {f.label}
                </span>
                <span className="text-xs text-brand-navy-400">
                  {f.pricePerNightUsd === 0 ? 'Included' : `+$${f.pricePerNightUsd}/night`}
                </span>
              </button>
            )
          })}
        </div>
      </section>

      {/* Running cost banner */}
      {selectedSleepingType && (
        <div className="bg-brand-navy-900 rounded-2xl px-5 py-4 flex items-center justify-between text-sm">
          <div className="text-white/70">
            <span className="font-semibold text-white">{getSleepingTypeById(selectedSleepingType)?.label}</span>
            {selectedFacilities.length > 0 && (
              <span className="ml-2 text-white/50">+ {selectedFacilities.length} {selectedFacilities.length === 1 ? 'facility' : 'facilities'}</span>
            )}
            <span className="ml-2 text-white/50">· {nights} nights</span>
          </div>
          <div className="text-right">
            <span className="text-brand-amber-400 font-extrabold text-base">${totalPerPerson.toLocaleString()}</span>
            <span className="text-white/50 text-xs ml-1">/ person</span>
          </div>
        </div>
      )}

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
          disabled={!selectedSleepingType}
          className="px-8 py-2.5 rounded-xl bg-brand-orange-500 text-white font-bold text-sm hover:bg-brand-orange-600 transition-colors shadow-md disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Plan Your Meals →
        </button>
      </div>
    </div>
  )
}
