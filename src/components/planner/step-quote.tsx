// src/components/planner/step-quote.tsx
'use client'
import { useState } from 'react'
import { CheckCircle, MapPin, Calendar, Users, Bed } from 'lucide-react'
import { usePlannerStore } from '@/stores/planner-store'
import { destinations } from '@/lib/data/destinations'
import { getItemById } from '@/lib/data/itinerary-items'
import { getTierBySlug } from '@/lib/data/accommodation'
import { getStartingLocationById } from '@/lib/data/starting-locations'

export function StepQuote() {
  const store = usePlannerStore()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const {
    orderedDestinationSlugs,
    selectedActivityIds,
    accommodationTier,
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
  const tier = accommodationTier ? getTierBySlug(accommodationTier) : null
  const nights = Math.max(durationDays - 1, 1)

  const allActivityIds = Object.values(selectedActivityIds).flat()
  const activityItems = allActivityIds.map((id) => getItemById(id)).filter(Boolean) as NonNullable<ReturnType<typeof getItemById>>[]

  const activitiesPerPerson = activityItems.reduce((s, i) => s + i.priceUsd, 0)
  const stayPerPerson = tier ? tier.pricePerNightUsd * nights : 0
  const totalPerPerson = activitiesPerPerson + stayPerPerson
  const totalGroup = totalPerPerson * Math.max(groupSize, 1)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email.trim()) { setError('Email is required.'); return }
    setError('')
    setLoading(true)

    const payload = {
      startingLocation: startLoc?.name,
      destinations: orderedDestinationSlugs.map((s) => destinations.find((d) => d.slug === s)?.name),
      activities: activityItems.map((i) => ({ name: i.name, priceUsd: i.priceUsd })),
      accommodationTier,
      groupSize,
      departureDateIso,
      durationDays,
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
            <span className="text-white/80 capitalize">{tier?.label ?? 'No tier'}</span>
          </div>
        </div>

        {/* Destinations */}
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

        {/* Price breakdown */}
        <div className="border-t border-brand-navy-700 pt-3 space-y-1">
          {activitiesPerPerson > 0 && (
            <div className="flex justify-between text-sm text-white/75">
              <span>Activities</span>
              <span>${activitiesPerPerson.toLocaleString()} / person</span>
            </div>
          )}
          {stayPerPerson > 0 && (
            <div className="flex justify-between text-sm text-white/75">
              <span>Accommodation ({nights} nights, {tier?.label})</span>
              <span>${stayPerPerson.toLocaleString()} / person</span>
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
