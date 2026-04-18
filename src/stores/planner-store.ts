// src/stores/planner-store.ts
'use client'
import { create } from 'zustand'
import type { MealSlot } from '@/lib/data/meals'

export type PlannerStep = 1 | 2 | 3 | 4 | 5 | 6

export type DayMeals = { breakfast: string[]; lunch: string[]; dinner: string[] }

interface PlannerState {
  step: PlannerStep
  maxStepReached: number

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

  // Step 4 — Accommodation amenities
  selectedSleepingType: string | null
  selectedFacilities: string[]

  // Step 5 — Meals (day index 1-based → meal option IDs)
  dailyMeals: Record<number, DayMeals>

  // Step 6 — Quote contact
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

  setSleepingType: (id: string) => void
  toggleFacility: (id: string) => void

  toggleDayMealItem: (day: number, slot: MealSlot, itemId: string) => void
  copyMealSlotToAllDays: (fromDay: number, slot: MealSlot) => void

  setContactInfo: (info: { email?: string; phone?: string; notes?: string }) => void
  setSubmitted: (val: boolean) => void

  reset: () => void
}

const initialState = {
  step: 1 as PlannerStep,
  maxStepReached: 1,
  startingLocationId: '',
  selectedDestinationSlugs: [],
  groupSize: 2,
  departureDateIso: '',
  durationDays: 7,
  selectedActivityIds: {},
  orderedDestinationSlugs: [],
  selectedSleepingType: null,
  selectedFacilities: [],
  dailyMeals: {},
  email: '',
  phone: '',
  notes: '',
  submitted: false,
}

export const usePlannerStore = create<PlannerState>((set) => ({
  ...initialState,

  setStep: (step) => set({ step }),

  nextStep: () =>
    set((s) => {
      const next = Math.min(s.step + 1, 6) as PlannerStep
      return { step: next, maxStepReached: Math.max(s.maxStepReached, next) }
    }),

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

  setDurationDays: (n) =>
    set((s) => {
      const pruned: Record<number, DayMeals> = {}
      for (let day = 1; day <= n; day++) {
        if (s.dailyMeals[day]) pruned[day] = s.dailyMeals[day]
      }
      return { durationDays: n, dailyMeals: pruned }
    }),

  toggleActivity: (destinationSlug, activityId) =>
    set((s) => {
      const current = s.selectedActivityIds[destinationSlug] ?? []
      const updated = current.includes(activityId)
        ? current.filter((id) => id !== activityId)
        : [...current, activityId]
      return { selectedActivityIds: { ...s.selectedActivityIds, [destinationSlug]: updated } }
    }),

  setOrderedDestinations: (slugs) => set({ orderedDestinationSlugs: slugs }),

  reorderDestination: (fromIndex, toIndex) =>
    set((s) => {
      const arr = [...s.orderedDestinationSlugs]
      const [moved] = arr.splice(fromIndex, 1)
      arr.splice(toIndex, 0, moved)
      return { orderedDestinationSlugs: arr }
    }),

  setSleepingType: (id) =>
    set((s) => ({ selectedSleepingType: s.selectedSleepingType === id ? null : id })),

  toggleFacility: (id) =>
    set((s) => ({
      selectedFacilities: s.selectedFacilities.includes(id)
        ? s.selectedFacilities.filter((f) => f !== id)
        : [...s.selectedFacilities, id],
    })),

  toggleDayMealItem: (day, slot, itemId) =>
    set((s) => {
      const dayData = s.dailyMeals[day] ?? { breakfast: [], lunch: [], dinner: [] }
      const current = dayData[slot]
      const updated = current.includes(itemId)
        ? current.filter((id) => id !== itemId)
        : [...current, itemId]
      return { dailyMeals: { ...s.dailyMeals, [day]: { ...dayData, [slot]: updated } } }
    }),

  copyMealSlotToAllDays: (fromDay, slot) =>
    set((s) => {
      const sourceItems = [...(s.dailyMeals[fromDay]?.[slot] ?? [])]
      const updated = { ...s.dailyMeals }
      for (let day = 1; day <= s.durationDays; day++) {
        updated[day] = { ...(updated[day] ?? { breakfast: [], lunch: [], dinner: [] }), [slot]: sourceItems }
      }
      return { dailyMeals: updated }
    }),

  setContactInfo: (info) =>
    set((s) => ({
      email: info.email ?? s.email,
      phone: info.phone ?? s.phone,
      notes: info.notes ?? s.notes,
    })),

  setSubmitted: (val) => set({ submitted: val }),

  reset: () => set(initialState),
}))
