// src/components/planner/planner-progress.tsx
'use client'
import { Check } from 'lucide-react'
import { usePlannerStore } from '@/stores/planner-store'
import type { PlannerStep } from '@/stores/planner-store'
import { cn } from '@/lib/utils/cn'

const steps = [
  { number: 1, label: 'Destinations' },
  { number: 2, label: 'Activities' },
  { number: 3, label: 'Itinerary' },
  { number: 4, label: 'Accommodation' },
  { number: 5, label: 'Meals' },
  { number: 6, label: 'Get Quote' },
]

export function PlannerProgress() {
  const step = usePlannerStore((s) => s.step)
  const maxStepReached = usePlannerStore((s) => s.maxStepReached)
  const setStep = usePlannerStore((s) => s.setStep)

  return (
    <div className="bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          {steps.map((s, i) => {
            const done = step > s.number
            const active = step === s.number
            const isClickable = s.number <= maxStepReached && s.number !== step

            return (
              <div key={s.number} className="flex items-center flex-1">
                {/* Step indicator */}
                <div className="flex flex-col items-center gap-1">
                  <button
                    type="button"
                    onClick={() => isClickable ? setStep(s.number as PlannerStep) : undefined}
                    disabled={!isClickable && !active}
                    aria-current={active ? 'step' : undefined}
                    className={cn(
                      'w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-200 focus:outline-none',
                      done && 'bg-brand-orange-500 text-white cursor-pointer hover:bg-brand-orange-600',
                      active && 'bg-white border-2 border-brand-orange-500 text-brand-orange-500 cursor-default',
                      isClickable && !done && !active && 'bg-gray-100 text-gray-500 cursor-pointer hover:bg-brand-orange-100 hover:text-brand-orange-600',
                      !isClickable && !done && !active && 'bg-gray-100 text-gray-400 cursor-not-allowed',
                    )}
                  >
                    {done ? <Check className="w-3.5 h-3.5" /> : s.number}
                  </button>
                  <span
                    className={cn(
                      'hidden sm:block text-xs font-medium whitespace-nowrap',
                      active ? 'text-brand-orange-500' : done ? 'text-brand-navy-700' : isClickable ? 'text-gray-500' : 'text-gray-400',
                    )}
                  >
                    {s.label}
                  </span>
                </div>

                {/* Connector line (not after last step) */}
                {i < steps.length - 1 && (
                  <div
                    className={cn(
                      'flex-1 h-0.5 mx-2 sm:mx-3 transition-colors duration-300',
                      step > s.number ? 'bg-brand-orange-500' : 'bg-gray-200',
                    )}
                  />
                )}
              </div>
            )
          })}
        </div>

        {/* Mobile step label */}
        <p className="sm:hidden text-center text-xs font-semibold text-brand-orange-500 mt-2">
          Step {step} of 6 — {steps[step - 1].label}
        </p>
      </div>
    </div>
  )
}
