// src/components/planner/step-meals.tsx
'use client'
import { useState } from 'react'
import { Copy } from 'lucide-react'
import { usePlannerStore } from '@/stores/planner-store'
import {
  getCategoriesForSlot,
  getItemsByCategoryId,
  getFoodItemById,
} from '@/lib/data/meals'
import type { MealSlot } from '@/lib/data/meals'
import { cn } from '@/lib/utils/cn'

const SLOTS: { slot: MealSlot; label: string; emoji: string }[] = [
  { slot: 'breakfast', label: 'Breakfast', emoji: '🌅' },
  { slot: 'lunch',     label: 'Lunch',     emoji: '☀️' },
  { slot: 'dinner',    label: 'Dinner',    emoji: '🌙' },
]

function slotTotal(ids: string[]): number {
  return ids.reduce((s, id) => s + (getFoodItemById(id)?.priceUsd ?? 0), 0)
}

export function StepMeals() {
  const { durationDays, groupSize, dailyMeals, toggleDayMealItem, copyMealSlotToAllDays, nextStep, prevStep } =
    usePlannerStore()

  const [activeDay, setActiveDay] = useState(1)

  const mealsPerPerson = Object.values(dailyMeals).reduce((sum, day) => {
    return sum + slotTotal(day.breakfast) + slotTotal(day.lunch) + slotTotal(day.dinner)
  }, 0)

  const dayMeals = dailyMeals[activeDay] ?? { breakfast: [], lunch: [], dinner: [] }

  return (
    <div className="space-y-6">
      <p className="text-brand-navy-500 text-sm">
        Build your daily menu from our selection. Mix and match items across categories — aim for a
        balanced plate with starches, protein, veg, and fruit.
      </p>

      {/* Day tabs */}
      <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-hide">
        {Array.from({ length: durationDays }, (_, i) => i + 1).map((day) => {
          const d = dailyMeals[day] ?? { breakfast: [], lunch: [], dinner: [] }
          const hasItems =
            d.breakfast.length + d.lunch.length + d.dinner.length > 0
          return (
            <button
              key={day}
              type="button"
              onClick={() => setActiveDay(day)}
              className={cn(
                'shrink-0 px-4 py-2 rounded-xl text-xs font-bold transition-all duration-150 border',
                activeDay === day
                  ? 'bg-brand-orange-500 text-white border-brand-orange-500 shadow-sm'
                  : hasItems
                  ? 'bg-brand-orange-50 text-brand-orange-600 border-brand-orange-200 hover:border-brand-orange-400'
                  : 'bg-white text-brand-navy-600 border-gray-200 hover:border-brand-orange-300',
              )}
            >
              Day {day}
            </button>
          )
        })}
      </div>

      {/* Active day meals */}
      <div className="space-y-4">
        {SLOTS.map(({ slot, label, emoji }) => {
          const selectedIds = dayMeals[slot]
          const categories = getCategoriesForSlot(slot)
          const total = slotTotal(selectedIds)

          return (
            <div key={slot} className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              {/* Meal slot header */}
              <div className="flex items-center justify-between px-4 sm:px-5 py-3 bg-brand-navy-900">
                <div className="flex items-center gap-2">
                  <span className="text-base">{emoji}</span>
                  <h4 className="text-sm font-bold text-white">{label}</h4>
                  {total > 0 && (
                    <span className="text-xs text-brand-orange-400 font-semibold ml-1">
                      +${total} / person
                    </span>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => copyMealSlotToAllDays(activeDay, slot)}
                  title={`Apply Day ${activeDay} ${label} to all days`}
                  className="flex items-center gap-1 text-xs text-white/60 hover:text-white transition-colors"
                >
                  <Copy className="w-3 h-3" />
                  <span className="hidden sm:inline">Apply to all days</span>
                </button>
              </div>

              {/* Categories */}
              <div className="p-4 sm:p-5 space-y-5">
                {categories.map((cat) => {
                  const items = getItemsByCategoryId(cat.id)
                  return (
                    <div key={cat.id}>
                      <p className="text-xs font-semibold uppercase tracking-wider text-brand-navy-500 mb-2">
                        {cat.emoji} {cat.label}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {items.map((item) => {
                          const isSelected = selectedIds.includes(item.id)
                          return (
                            <button
                              key={item.id}
                              type="button"
                              onClick={() => toggleDayMealItem(activeDay, slot, item.id)}
                              className={cn(
                                'flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all duration-150',
                                isSelected
                                  ? 'bg-brand-orange-500 text-white border-brand-orange-500 shadow-sm'
                                  : 'bg-white text-brand-navy-700 border-gray-200 hover:border-brand-orange-300 hover:text-brand-orange-600',
                              )}
                            >
                              <span>{item.emoji}</span>
                              <span>{item.name}</span>
                              {item.priceUsd > 0 ? (
                                <span className={cn('ml-0.5', isSelected ? 'text-white/75' : 'text-brand-navy-400')}>
                                  +${item.priceUsd}
                                </span>
                              ) : (
                                <span className={cn('ml-0.5 text-xs', isSelected ? 'text-white/60' : 'text-green-600')}>
                                  free
                                </span>
                              )}
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  )
                })}

                {/* Day meal slot subtotal */}
                {selectedIds.length > 0 && (
                  <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-brand-navy-500">
                    <span>{selectedIds.length} item{selectedIds.length !== 1 ? 's' : ''} selected</span>
                    <span className="font-semibold text-brand-orange-600">${total} / person</span>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Running meals total */}
      {mealsPerPerson > 0 && (
        <div className="bg-brand-navy-900 rounded-2xl px-5 py-4 flex items-center justify-between text-sm">
          <div className="text-white/70">
            All meals across {durationDays} days
            {groupSize > 1 && <span className="text-white/50 ml-1">· group of {groupSize}</span>}
          </div>
          <div className="text-right">
            <span className="text-brand-amber-400 font-extrabold text-base">
              ${mealsPerPerson.toLocaleString()}
            </span>
            <span className="text-white/50 text-xs ml-1">/ person</span>
            {groupSize > 1 && (
              <p className="text-white/40 text-xs mt-0.5">
                ${(mealsPerPerson * groupSize).toLocaleString()} total
              </p>
            )}
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
          className="px-8 py-2.5 rounded-xl bg-brand-orange-500 text-white font-bold text-sm hover:bg-brand-orange-600 transition-colors shadow-md"
        >
          Review &amp; Get Quote →
        </button>
      </div>
    </div>
  )
}
