// src/stores/planner-store.ts
'use client'
import { create } from 'zustand'
import type { AccommodationTier } from '@/lib/data/accommodation'

export type PlannerStep = 1 | 2 | 3 | 4 | 5

interface PlannerState {
  step: PlannerStep

  // Step 1
  startingLocationId: string
  selectedDestinationSlugs: string[]
  groupSize: number
  departureDateIso: string
  durationDays: number

  // Step 2 — destinationSlug → selected activity IDs
  selectedActivityIds: Record<string, string[]>

  // Step 3 — route-optimised + user-editable order
  orderedDestinationSlugs: string[]

  // Step 4
  accommodationTier: AccommodationTier | null

  // Step 5
  email: string
  phone: string
  notes: string
  submitted: boolean

  // ── Actions ──────────────────────────────────────────────────
  setStep: (step: PlannerStep) => void
  nextStep: () => void
  prevStep: () => void

  setStartingLocationId: (id: string) => void
  toggleDestination: (slug: string) => void
  setGroupSize: (n: number) => void
  setDepartureDate: (iso: string) => void
  setDurationDays: (n: number) => void

  toggleActivity: (destinationSlug: string, activityId: string) => void

  setOrderedDestinations: (slugs: string[]) => void
  reorderDestination: (fromIndex: number, toIndex: number) => void

  setAccommodationTier: (tier: AccommodationTier) => void

  setContactInfo: (info: { email?: string; phone?: string; notes?: string }) => void
  setSubmitted: (val: boolean) => void

  reset: () => void
}

const initialState = {
  step: 1 as PlannerStep,
  startingLocationId: '',
  selectedDestinationSlugs: [],
  groupSize: 2,
  departureDateIso: '',
  durationDays: 7,
  selectedActivityIds: {},
  orderedDestinationSlugs: [],
  accommodationTier: null,
  email: '',
  phone: '',
  notes: '',
  submitted: false,
}

export const usePlannerStore = create<PlannerState>((set) => ({
  ...initialState,

  setStep: (step) => set({ step }),
  nextStep: () => set((s) => ({ step: Math.min(s.step + 1, 5) as PlannerStep })),
  prevStep: () => set((s) => ({ step: Math.max(s.step - 1, 1) as PlannerStep })),

  setStartingLocationId: (id) => set({ startingLocationId: id }),

  toggleDestination: (slug) =>
    set((s) => ({
      selectedDestinationSlugs: s.selectedDestinationSlugs.includes(slug)
        ? s.selectedDestinationSlugs.filter((d) => d !== slug)
        : [...s.selectedDestinationSlugs, slug],
    })),

  setGroupSize: (n) => set({ groupSize: n }),
  setDepartureDate: (iso) => set({ departureDateIso: iso }),
  setDurationDays: (n) => set({ durationDays: n }),

  toggleActivity: (destinationSlug, activityId) =>
    set((s) => {
      const current = s.selectedActivityIds[destinationSlug] ?? []
      const updated = current.includes(activityId)
        ? current.filter((id) => id !== activityId)
        : [...current, activityId]
      return {
        selectedActivityIds: { ...s.selectedActivityIds, [destinationSlug]: updated },
      }
    }),

  setOrderedDestinations: (slugs) => set({ orderedDestinationSlugs: slugs }),

  reorderDestination: (fromIndex, toIndex) =>
    set((s) => {
      const arr = [...s.orderedDestinationSlugs]
      const [moved] = arr.splice(fromIndex, 1)
      arr.splice(toIndex, 0, moved)
      return { orderedDestinationSlugs: arr }
    }),

  setAccommodationTier: (tier) => set({ accommodationTier: tier }),

  setContactInfo: (info) =>
    set((s) => ({
      email: info.email ?? s.email,
      phone: info.phone ?? s.phone,
      notes: info.notes ?? s.notes,
    })),

  setSubmitted: (val) => set({ submitted: val }),

  reset: () => set(initialState),
}))
