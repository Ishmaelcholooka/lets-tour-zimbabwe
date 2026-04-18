// src/lib/utils/price.ts
import { getSleepingTypeById, getFacilityById } from '@/lib/data/accommodation'
import { getFoodItemById } from '@/lib/data/meals'
import { getItemById } from '@/lib/data/itinerary-items'

export interface TripPriceBreakdown {
  activitiesPerPerson: number
  accommodationPerPerson: number
  mealsPerPerson: number
  totalPerPerson: number
  totalGroup: number
  nights: number
}

export function calculateTripPrice(params: {
  selectedActivityIds: Record<string, string[]>
  selectedSleepingType: string | null
  selectedFacilities: string[]
  dailyMeals: Record<number, { breakfast: string[]; lunch: string[]; dinner: string[] }>
  durationDays: number
  groupSize: number
}): TripPriceBreakdown {
  const { selectedActivityIds, selectedSleepingType, selectedFacilities, dailyMeals, durationDays, groupSize } = params
  const nights = Math.max(durationDays - 1, 1)
  const people = Math.max(groupSize, 1)

  const activitiesPerPerson = Object.values(selectedActivityIds)
    .flat()
    .reduce((sum, id) => sum + (getItemById(id)?.priceUsd ?? 0), 0)

  const sleepingType = selectedSleepingType ? getSleepingTypeById(selectedSleepingType) : null
  const sleepingPerPerson = sleepingType ? sleepingType.pricePerNightUsd * nights : 0

  const facilitiesPerPerson = selectedFacilities.reduce((sum, id) => {
    const f = getFacilityById(id)
    return sum + (f ? f.pricePerNightUsd * nights : 0)
  }, 0)

  const accommodationPerPerson = sleepingPerPerson + facilitiesPerPerson

  const sumSlot = (ids: string[]) => ids.reduce((s, id) => s + (getFoodItemById(id)?.priceUsd ?? 0), 0)
  const mealsPerPerson = Object.values(dailyMeals).reduce((sum, day) => {
    return sum + sumSlot(day.breakfast) + sumSlot(day.lunch) + sumSlot(day.dinner)
  }, 0)

  const totalPerPerson = activitiesPerPerson + accommodationPerPerson + mealsPerPerson
  const totalGroup = totalPerPerson * people

  return { activitiesPerPerson, accommodationPerPerson, mealsPerPerson, totalPerPerson, totalGroup, nights }
}
