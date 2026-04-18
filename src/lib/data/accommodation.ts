// src/lib/data/accommodation.ts

export type AccommodationTier = 'bronze' | 'silver' | 'gold' | 'platinum'

export interface TierOption {
  tier: AccommodationTier
  label: string
  emoji: string
  accommodationType: string
  mealPlan: string
  pricePerNightUsd: number  // per person, midpoint estimate
  priceMinUsd: number
  priceMaxUsd: number
  includes: string[]
  accentClass: string       // Tailwind bg class for card accent strip
  borderClass: string
}

export const accommodationTiers: TierOption[] = [
  {
    tier: 'bronze',
    label: 'Bronze',
    emoji: '🏕️',
    accommodationType: 'Camping / Basic Lodge',
    mealPlan: 'Self-catering',
    pricePerNightUsd: 40,
    priceMinUsd: 30,
    priceMaxUsd: 50,
    includes: [
      'Tent or basic dorm bed',
      'Shared ablution facilities',
      'Braai / fire pit access',
      'Parking',
    ],
    accentClass: 'bg-amber-700',
    borderClass: 'border-amber-700',
  },
  {
    tier: 'silver',
    label: 'Silver',
    emoji: '🏠',
    accommodationType: 'Guesthouse / Mid-range Lodge',
    mealPlan: 'Bed & Breakfast',
    pricePerNightUsd: 100,
    priceMinUsd: 80,
    priceMaxUsd: 120,
    includes: [
      'En-suite room',
      'Daily breakfast included',
      'Wi-Fi',
      'Swimming pool access',
      'Guided day walk',
    ],
    accentClass: 'bg-gray-400',
    borderClass: 'border-gray-400',
  },
  {
    tier: 'gold',
    label: 'Gold',
    emoji: '🏨',
    accommodationType: '4-Star Safari Lodge',
    mealPlan: 'Half Board (B&B + Dinner)',
    pricePerNightUsd: 215,
    priceMinUsd: 180,
    priceMaxUsd: 250,
    includes: [
      'Superior chalet / room',
      'Breakfast + dinner',
      'One game drive per day',
      'Airport / park transfers',
      'Wi-Fi & laundry',
      'Welcome sundowner',
    ],
    accentClass: 'bg-yellow-500',
    borderClass: 'border-yellow-500',
  },
  {
    tier: 'platinum',
    label: 'Platinum',
    emoji: '💎',
    accommodationType: 'Luxury Safari Lodge / Boutique Camp',
    mealPlan: 'Full Board + Activities',
    pricePerNightUsd: 450,
    priceMinUsd: 400,
    priceMaxUsd: 600,
    includes: [
      'Luxury suite / private tent',
      'All meals + premium bar',
      'Twice-daily game activities',
      'Dedicated ranger & tracker',
      'Spa treatment (1 per stay)',
      'All transfers included',
      'Curated bush experiences',
    ],
    accentClass: 'bg-brand-navy-700',
    borderClass: 'border-brand-navy-400',
  },
]

export function getTierBySlug(tier: AccommodationTier): TierOption | undefined {
  return accommodationTiers.find((t) => t.tier === tier)
}

// ── Amenity system (Step 4) ──────────────────────────────────────

export type SleepingTypeId =
  | 'tent'
  | 'dormitory'
  | 'shared-room'
  | 'private-room'
  | 'ensuite'
  | 'chalet'
  | 'luxury-suite'

export interface SleepingType {
  id: SleepingTypeId
  label: string
  emoji: string
  description: string
  pricePerNightUsd: number
}

export type FacilityId =
  | 'wifi'
  | 'hot-shower'
  | 'air-con'
  | 'pool'
  | 'kitchen'
  | 'braai'
  | 'laundry'
  | 'parking'

export interface Facility {
  id: FacilityId
  label: string
  emoji: string
  pricePerNightUsd: number
}

export const sleepingTypes: SleepingType[] = [
  { id: 'tent',          label: 'Tent / Camping',    emoji: '⛺', description: 'Sleep under the stars in your own tent',            pricePerNightUsd: 15  },
  { id: 'dormitory',     label: 'Dormitory',          emoji: '🛏️', description: 'Shared bunk-bed dormitory with fellow travellers',  pricePerNightUsd: 25  },
  { id: 'shared-room',   label: 'Shared Room',        emoji: '🚪', description: 'Private room shared between 2–4 travellers',        pricePerNightUsd: 45  },
  { id: 'private-room',  label: 'Private Room',       emoji: '🏠', description: 'Your own room with shared bathroom facilities',     pricePerNightUsd: 80  },
  { id: 'ensuite',       label: 'En-suite Room',      emoji: '🛁', description: 'Private room with your own bathroom',               pricePerNightUsd: 120 },
  { id: 'chalet',        label: 'Self-catering Chalet', emoji: '🏡', description: 'Private chalet with kitchenette and living area', pricePerNightUsd: 160 },
  { id: 'luxury-suite',  label: 'Luxury Suite',       emoji: '💎', description: 'Luxury lodge suite with premium amenities',         pricePerNightUsd: 320 },
]

export const facilities: Facility[] = [
  { id: 'wifi',       label: 'Wi-Fi',           emoji: '📶', pricePerNightUsd: 0 },
  { id: 'hot-shower', label: 'Hot Shower',      emoji: '🚿', pricePerNightUsd: 0 },
  { id: 'air-con',    label: 'Air Conditioning', emoji: '❄️', pricePerNightUsd: 5 },
  { id: 'pool',       label: 'Swimming Pool',   emoji: '🏊', pricePerNightUsd: 8 },
  { id: 'kitchen',    label: 'Kitchen Access',  emoji: '🍳', pricePerNightUsd: 5 },
  { id: 'braai',      label: 'Braai / Fire Pit', emoji: '🔥', pricePerNightUsd: 3 },
  { id: 'laundry',    label: 'Laundry Service', emoji: '👕', pricePerNightUsd: 4 },
  { id: 'parking',    label: 'Secure Parking',  emoji: '🅿️', pricePerNightUsd: 2 },
]

export function getSleepingTypeById(id: string): SleepingType | undefined {
  return sleepingTypes.find((t) => t.id === id)
}

export function getFacilityById(id: string): Facility | undefined {
  return facilities.find((f) => f.id === id)
}
