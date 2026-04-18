// src/components/planner/step-activities.tsx
'use client'
import { useState } from 'react'
import { Clock, Check } from 'lucide-react'
import { usePlannerStore } from '@/stores/planner-store'
import { destinations } from '@/lib/data/destinations'
import { getItemsByDestination } from '@/lib/data/itinerary-items'
import type { ActivityCategory } from '@/lib/data/itinerary-items'
import { cn } from '@/lib/utils/cn'

const categoryColour: Record<ActivityCategory, string> = {
  activity:    'bg-blue-100 text-blue-700',
  tour:        'bg-brand-amber-100 text-brand-amber-700',
  experience:  'bg-purple-100 text-purple-700',
  cultural:    'bg-green-100 text-green-700',
  adventure:   'bg-red-100 text-red-700',
}

export function StepActivities() {
  const {
    orderedDestinationSlugs,
    selectedActivityIds,
    toggleActivity,
    nextStep,
    prevStep,
  } = usePlannerStore()

  const [activeTab, setActiveTab] = useState(orderedDestinationSlugs[0] ?? '')

  const tabDestinations = orderedDestinationSlugs
    .map((slug) => destinations.find((d) => d.slug === slug))
    .filter(Boolean) as typeof destinations

  const activeItems = getItemsByDestination(activeTab)
  const selectedForTab = selectedActivityIds[activeTab] ?? []

  const totalSelected = Object.values(selectedActivityIds).flat().length

  return (
    <div className="space-y-6">
      {/* Destination tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
        {tabDestinations.map((dest) => {
          const count = (selectedActivityIds[dest.slug] ?? []).length
          return (
            <button
              key={dest.slug}
              type="button"
              onClick={() => setActiveTab(dest.slug)}
              className={cn(
                'flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap shrink-0 transition-colors duration-200',
                activeTab === dest.slug
                  ? 'bg-brand-orange-500 text-white'
                  : 'bg-white border border-gray-200 text-brand-navy-700 hover:border-brand-orange-300',
              )}
            >
              {dest.name}
              {count > 0 && (
                <span className={cn(
                  'text-xs font-bold px-1.5 py-0.5 rounded-full',
                  activeTab === dest.slug ? 'bg-white/25 text-white' : 'bg-brand-orange-100 text-brand-orange-600',
                )}>
                  {count}
                </span>
              )}
            </button>
          )
        })}
      </div>

      {/* Activity cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {activeItems.length === 0 ? (
          <p className="text-brand-navy-400 text-sm col-span-2 py-8 text-center">
            No activities seeded for this destination yet.
          </p>
        ) : (
          activeItems.map((item) => {
            const selected = selectedForTab.includes(item.id)
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => toggleActivity(activeTab, item.id)}
                className={cn(
                  'text-left rounded-2xl border p-4 sm:p-5 transition-all duration-200 focus:outline-none',
                  selected
                    ? 'border-brand-orange-500 bg-brand-orange-50 shadow-md'
                    : 'border-gray-200 bg-white hover:border-brand-orange-300 hover:shadow-sm',
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className={cn('text-xs font-semibold px-2 py-0.5 rounded-full capitalize', categoryColour[item.category])}>
                        {item.category}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-brand-navy-400">
                        <Clock className="w-3 h-3" />
                        {item.durationHours}h
                      </span>
                    </div>
                    <h3 className="font-bold text-brand-navy-900 text-sm leading-tight mb-1">{item.name}</h3>
                    <p className="text-brand-navy-500 text-xs leading-relaxed line-clamp-2">{item.description}</p>
                    {item.specialRequirements && (
                      <p className="text-amber-600 text-xs mt-1.5 font-medium">⚠ {item.specialRequirements}</p>
                    )}
                  </div>
                  <div className="shrink-0 flex flex-col items-end gap-2">
                    <div className={cn(
                      'w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors',
                      selected ? 'bg-brand-orange-500 border-brand-orange-500' : 'border-gray-300',
                    )}>
                      {selected && <Check className="w-3.5 h-3.5 text-white" />}
                    </div>
                    <span className="text-sm font-extrabold text-brand-orange-500">
                      ${item.priceUsd}
                    </span>
                    <span className="text-xs text-brand-navy-400">/ person</span>
                  </div>
                </div>
              </button>
            )
          })
        )}
      </div>

      {/* Nav buttons */}
      <div className="flex items-center justify-between pt-2">
        <button
          type="button"
          onClick={prevStep}
          className="px-6 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-brand-navy-700 hover:border-brand-orange-300 transition-colors"
        >
          ← Back
        </button>
        <div className="text-xs text-brand-navy-400">
          {totalSelected > 0 ? `${totalSelected} activities selected` : 'Optional — skip if you prefer'}
        </div>
        <button
          type="button"
          onClick={nextStep}
          className="px-8 py-2.5 rounded-xl bg-brand-orange-500 text-white font-bold text-sm hover:bg-brand-orange-600 transition-colors shadow-md"
        >
          Review Itinerary →
        </button>
      </div>
    </div>
  )
}
