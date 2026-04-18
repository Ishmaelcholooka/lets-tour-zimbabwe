// src/components/planner/step-quote.tsx
'use client'
import { useState } from 'react'
import { CheckCircle, MapPin, Calendar, Users, Bed } from 'lucide-react'
import { usePlannerStore } from '@/stores/planner-store'
import { destinations } from '@/lib/data/destinations'
import { getItemById } from '@/lib/data/itinerary-items'
import { getSleepingTypeById, getFacilityById } from '@/lib/data/accommodation'
import { getFoodItemById } from '@/lib/data/meals'
import { getStartingLocationById } from '@/lib/data/starting-locations'
import { calculateTripPrice } from '@/lib/utils/price'

export function StepQuote() {
  const store = usePlannerStore()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const {
    orderedDestinationSlugs,
    selectedActivityIds,
    selectedSleepingType,
    selectedFacilities,
    dailyMeals,
    groupSize,
    departureDateIso,
    durationDays,
    startingLocationId,
    email,
    phone,
    notes,
    submitted,
    setContactInfo,
    setSubmitted,
    prevStep,
  } = store

  const startLoc = getStartingLocationById(startingLocationId)
  const sleepingType = selectedSleepingType ? getSleepingTypeById(selectedSleepingType) : null

  const allActivityIds = Object.values(selectedActivityIds).flat()
  const activityItems = allActivityIds.map((id) => getItemById(id)).filter(Boolean) as NonNullable<ReturnType<typeof getItemById>>[]

  const { activitiesPerPerson, accommodationPerPerson, mealsPerPerson, totalPerPerson, totalGroup, nights } =
    calculateTripPrice({ selectedActivityIds, selectedSleepingType, selectedFacilities, dailyMeals, durationDays, groupSize })

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email.trim()) { setError('Email is required.'); return }
    setError('')
    setLoading(true)

    const payload = {
      startingLocation: startLoc?.name,
      destinations: orderedDestinationSlugs.map((s) => destinations.find((d) => d.slug === s)?.name),
      activities: activityItems.map((i) => ({ name: i.name, priceUsd: i.priceUsd })),
      sleepingType: selectedSleepingType,
      facilities: selectedFacilities,
      dailyMeals,
      groupSize,
      departureDateIso,
      durationDays,
      activitiesPerPerson,
      accommodationPerPerson,
      mealsPerPerson,
      totalPerPerson,
      totalGroup,
      email,
      phone,
      notes,
    }

    // No backend yet — log and simulate async
    console.log('[Quote Request]', payload)
    await new Promise((r) => setTimeout(r, 800))

    setLoading(false)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center space-y-4">
        <CheckCircle className="w-16 h-16 text-green-500" />
        <h2 className="text-2xl font-extrabold text-brand-navy-900">Quote Request Sent!</h2>
        <p className="text-brand-navy-500 max-w-sm text-sm leading-relaxed">
          Thank you! We&apos;ll review your itinerary and email a detailed, itemised quote to{' '}
          <span className="font-semibold text-brand-navy-900">{email}</span> within 24 hours.
        </p>
        <div className="bg-brand-orange-50 border border-brand-orange-200 rounded-2xl px-6 py-4 text-sm text-brand-navy-700 text-left max-w-sm w-full">
          <p className="font-bold mb-1">Your trip summary</p>
          <p>{orderedDestinationSlugs.length} destination{orderedDestinationSlugs.length !== 1 ? 's' : ''} · {durationDays} days · {groupSize} {groupSize === 1 ? 'person' : 'people'}</p>
          <p className="text-brand-orange-600 font-bold mt-1">Est. ${totalPerPerson.toLocaleString()} / person</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Trip summary */}
      <div className="bg-brand-navy-900 rounded-2xl p-5 sm:p-6 text-white space-y-4">
        <h2 className="font-extrabold text-lg">Your Trip Summary</h2>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-brand-orange-400 shrink-0" />
            <span className="text-white/80">{orderedDestinationSlugs.length} destination{orderedDestinationSlugs.length !== 1 ? 's' : ''}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-brand-orange-400 shrink-0" />
            <span className="text-white/80">{durationDays} days{departureDateIso ? ` from ${new Date(departureDateIso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}` : ''}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-brand-orange-400 shrink-0" />
            <span className="text-white/80">{groupSize} {groupSize === 1 ? 'person' : 'people'}</span>
          </div>
          <div className="flex items-center gap-2">
            <Bed className="w-4 h-4 text-brand-orange-400 shrink-0" />
            <span className="text-white/80">
              {sleepingType ? sleepingType.label : 'No accommodation'}
              {selectedFacilities.length > 0 && ` + ${selectedFacilities.length} extras`}
            </span>
          </div>
        </div>

        {/* Route */}
        <div>
          <p className="text-xs uppercase tracking-wider text-brand-navy-400 mb-1.5">Route</p>
          <div className="flex flex-wrap gap-1.5">
            {startLoc && <span className="text-xs bg-white/10 px-2.5 py-1 rounded-full">{startLoc.name} (start)</span>}
            {orderedDestinationSlugs.map((slug) => (
              <span key={slug} className="text-xs bg-brand-orange-500/20 border border-brand-orange-500/30 px-2.5 py-1 rounded-full">
                {destinations.find((d) => d.slug === slug)?.name}
              </span>
            ))}
          </div>
        </div>

        {/* Activities */}
        {activityItems.length > 0 && (
          <div>
            <p className="text-xs uppercase tracking-wider text-brand-navy-400 mb-1.5">
              Activities ({activityItems.length})
            </p>
            <ul className="space-y-1">
              {activityItems.map((item) => (
                <li key={item.id} className="flex justify-between text-xs text-white/80">
                  <span>{item.name}</span>
                  <span className="text-brand-orange-400 font-semibold ml-4">${item.priceUsd} / person</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Accommodation */}
        {sleepingType && (
          <div>
            <p className="text-xs uppercase tracking-wider text-brand-navy-400 mb-1.5">Accommodation</p>
            <div className="text-xs text-white/80 space-y-0.5">
              <p>{sleepingType.emoji} {sleepingType.label} — ${sleepingType.pricePerNightUsd}/person/night · {nights} nights</p>
              {selectedFacilities.length > 0 && (
                <p className="text-white/60">
                  Facilities: {selectedFacilities.map((id) => getFacilityById(id)?.label).filter(Boolean).join(', ')}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Meals */}
        {mealsPerPerson > 0 && (
          <div>
            <p className="text-xs uppercase tracking-wider text-brand-navy-400 mb-1.5">Meal Highlights</p>
            <div className="text-xs text-white/70 space-y-0.5">
              {Object.entries(dailyMeals).slice(0, 3).map(([day, meals]) => {
                const allIds = [...meals.breakfast, ...meals.lunch, ...meals.dinner]
                if (allIds.length === 0) return null
                const dayTotal = allIds.reduce((s, id) => s + (getFoodItemById(id)?.priceUsd ?? 0), 0)
                return (
                  <p key={day}>
                    Day {day}: {allIds.length} item{allIds.length !== 1 ? 's' : ''}
                    {dayTotal > 0 && <span className="text-brand-orange-400 ml-1">+${dayTotal} / person</span>}
                  </p>
                )
              })}
              {Object.keys(dailyMeals).length > 3 && (
                <p className="text-white/40">+ {Object.keys(dailyMeals).length - 3} more days…</p>
              )}
            </div>
          </div>
        )}

        {/* Price breakdown */}
        <div className="border-t border-brand-navy-700 pt-3 space-y-1">
          {activitiesPerPerson > 0 && (
            <div className="flex justify-between text-sm text-white/75">
              <span>Activities</span>
              <span>${activitiesPerPerson.toLocaleString()} / person</span>
            </div>
          )}
          {accommodationPerPerson > 0 && (
            <div className="flex justify-between text-sm text-white/75">
              <span>Accommodation ({nights} nights)</span>
              <span>${accommodationPerPerson.toLocaleString()} / person</span>
            </div>
          )}
          {mealsPerPerson > 0 && (
            <div className="flex justify-between text-sm text-white/75">
              <span>Meals</span>
              <span>${mealsPerPerson.toLocaleString()} / person</span>
            </div>
          )}
          <div className="flex justify-between text-base font-extrabold text-white pt-1">
            <span>Estimated Total</span>
            <span className="text-brand-amber-400">${totalPerPerson.toLocaleString()} / person</span>
          </div>
          {groupSize > 1 && (
            <div className="flex justify-between text-xs text-white/60">
              <span>Group of {groupSize}</span>
              <span>${totalGroup.toLocaleString()} total</span>
            </div>
          )}
        </div>
      </div>

      {/* Quote form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-6 space-y-4">
        <h3 className="font-bold text-brand-navy-900">Request Your Formal Quote</h3>
        <p className="text-brand-navy-500 text-sm">We&apos;ll send a detailed, itemised quote within 24 hours.</p>

        <div>
          <label className="block text-xs font-semibold text-brand-navy-600 uppercase tracking-wider mb-1.5">
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setContactInfo({ email: e.target.value })}
            placeholder="your@email.com"
            className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-brand-orange-500 transition-colors"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-brand-navy-600 uppercase tracking-wider mb-1.5">
            Phone / WhatsApp <span className="text-brand-navy-300 font-normal">(optional)</span>
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setContactInfo({ phone: e.target.value })}
            placeholder="+263 77 123 4567"
            className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-brand-orange-500 transition-colors"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-brand-navy-600 uppercase tracking-wider mb-1.5">
            Special Requests <span className="text-brand-navy-300 font-normal">(optional)</span>
          </label>
          <textarea
            rows={3}
            value={notes}
            onChange={(e) => setContactInfo({ notes: e.target.value })}
            placeholder="Any dietary requirements, accessibility needs, or special occasions…"
            className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-brand-orange-500 transition-colors resize-none"
          />
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <div className="flex items-center justify-between pt-2">
          <button
            type="button"
            onClick={prevStep}
            className="px-6 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-brand-navy-700 hover:border-brand-orange-300 transition-colors"
          >
            ← Back
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-8 py-2.5 rounded-xl bg-brand-orange-500 text-white font-bold text-sm hover:bg-brand-orange-600 transition-colors shadow-md disabled:opacity-60"
          >
            {loading ? 'Sending…' : 'Request Quote →'}
          </button>
        </div>
      </form>
    </div>
  )
}
