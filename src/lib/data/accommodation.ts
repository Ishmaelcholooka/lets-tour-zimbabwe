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
