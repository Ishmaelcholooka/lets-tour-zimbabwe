// src/components/planner/step-destinations.tsx
'use client'
import Image from 'next/image'
import { Check, Minus, Plus } from 'lucide-react'
import { usePlannerStore } from '@/stores/planner-store'
import { destinations } from '@/lib/data/destinations'
import { startingLocations } from '@/lib/data/starting-locations'
import { nearestNeighbourRoute } from '@/lib/utils/route'
import { cn } from '@/lib/utils/cn'

export function StepDestinations() {
  const {
    startingLocationId,
    selectedDestinationSlugs,
    groupSize,
    departureDateIso,
    durationDays,
    setStartingLocationId,
    toggleDestination,
    setGroupSize,
    setDepartureDate,
    setDurationDays,
    setOrderedDestinations,
    nextStep,
  } = usePlannerStore()

  const canContinue = startingLocationId !== '' && selectedDestinationSlugs.length > 0

  function handleContinue() {
    const startLoc = startingLocations.find((l) => l.id === startingLocationId)
    if (!startLoc) return

    const points = destinations
      .filter((d) => selectedDestinationSlugs.includes(d.slug))
      .map((d) => ({ id: d.slug, coordinates: d.coordinates }))

    const ordered = nearestNeighbourRoute([startLoc.lat, startLoc.lng], points)
    setOrderedDestinations(ordered)
    nextStep()
  }

  return (
    <div className="space-y-8">
      {/* Section: Starting location + trip details */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5 sm:p-6 shadow-sm space-y-5">
        <h2 className="text-lg font-bold text-brand-navy-900">Trip Details</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Starting location */}
          <div>
            <label className="block text-xs font-semibold text-brand-navy-600 uppercase tracking-wider mb-1.5">
              Starting From
            </label>
            <select
              value={startingLocationId}
              onChange={(e) => setStartingLocationId(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm text-brand-navy-900 bg-white focus:outline-none focus:border-brand-orange-500 transition-colors"
            >
              <option value="">Select your starting city…</option>
              {startingLocations.map((loc) => (
                <option key={loc.id} value={loc.id}>{loc.name}</option>
              ))}
            </select>
          </div>

          {/* Departure date */}
          <div>
            <label className="block text-xs font-semibold text-brand-navy-600 uppercase tracking-wider mb-1.5">
              Departure Date
            </label>
            <input
              type="date"
              value={departureDateIso}
              min={new Date().toISOString().split('T')[0]}
              onChange={(e) => setDepartureDate(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm text-brand-navy-900 bg-white focus:outline-none focus:border-brand-orange-500 transition-colors"
            />
          </div>

          {/* Duration */}
          <div>
            <label className="block text-xs font-semibold text-brand-navy-600 uppercase tracking-wider mb-1.5">
              Duration (days)
            </label>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setDurationDays(Math.max(1, durationDays - 1))}
                className="w-9 h-9 rounded-xl border border-gray-200 flex items-center justify-center text-brand-navy-600 hover:border-brand-orange-500 hover:text-brand-orange-500 transition-colors"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="flex-1 text-center text-sm font-bold text-brand-navy-900">
                {durationDays} {durationDays === 1 ? 'day' : 'days'}
              </span>
              <button
                type="button"
                onClick={() => setDurationDays(Math.min(30, durationDays + 1))}
                className="w-9 h-9 rounded-xl border border-gray-200 flex items-center justify-center text-brand-navy-600 hover:border-brand-orange-500 hover:text-brand-orange-500 transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Group size */}
          <div>
            <label className="block text-xs font-semibold text-brand-navy-600 uppercase tracking-wider mb-1.5">
              Group Size
            </label>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setGroupSize(Math.max(1, groupSize - 1))}
                className="w-9 h-9 rounded-xl border border-gray-200 flex items-center justify-center text-brand-navy-600 hover:border-brand-orange-500 hover:text-brand-orange-500 transition-colors"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="flex-1 text-center text-sm font-bold text-brand-navy-900">
                {groupSize} {groupSize === 1 ? 'person' : 'people'}
              </span>
              <button
                type="button"
                onClick={() => setGroupSize(Math.min(100, groupSize + 1))}
                className="w-9 h-9 rounded-xl border border-gray-200 flex items-center justify-center text-brand-navy-600 hover:border-brand-orange-500 hover:text-brand-orange-500 transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Section: Destination picker */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-brand-navy-900">
            Choose Destinations
          </h2>
          {selectedDestinationSlugs.length > 0 && (
            <span className="text-xs font-semibold text-brand-orange-500 bg-brand-orange-50 px-2.5 py-1 rounded-full">
              {selectedDestinationSlugs.length} selected
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {destinations.map((dest) => {
            const selected = selectedDestinationSlugs.includes(dest.slug)
            return (
              <button
                key={dest.slug}
                type="button"
                onClick={() => toggleDestination(dest.slug)}
                className={cn(
                  'relative rounded-2xl overflow-hidden aspect-4/3 text-left transition-all duration-200 focus:outline-none',
                  selected
                    ? 'ring-[3px] ring-brand-orange-500 shadow-lg scale-[1.02]'
                    : 'ring-1 ring-gray-200 hover:ring-brand-orange-300 hover:shadow-md',
                )}
              >
                <Image
                  src={dest.image}
                  alt={dest.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/75 via-black/20 to-transparent" />

                {/* Selected badge */}
                {selected && (
                  <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-brand-orange-500 flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                )}

                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-white font-bold text-base leading-tight">{dest.name}</p>
                  <p className="text-white/70 text-xs mt-0.5 italic">{dest.tagline}</p>
                  <p className="text-white/60 text-xs mt-1">from ${dest.fromPriceUsd} / person</p>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Continue button */}
      <div className="flex justify-end pt-2">
        <button
          type="button"
          onClick={handleContinue}
          disabled={!canContinue}
          className="px-8 py-3 rounded-xl bg-brand-orange-500 text-white font-bold text-sm hover:bg-brand-orange-600 transition-colors disabled:opacity-40 disabled:cursor-not-allowed shadow-md"
        >
          Continue to Activities →
        </button>
      </div>
    </div>
  )
}
