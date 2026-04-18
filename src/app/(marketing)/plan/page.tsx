// src/app/(marketing)/plan/page.tsx
import type { Metadata } from 'next'
import { ComingSoon } from '@/components/shared/coming-soon'

export const metadata: Metadata = { title: 'Plan a Tour' }

export default function PlanPage() {
  return (
    <ComingSoon
      title="Tour Planner"
      description="Build your perfect Zimbabwe itinerary — pick destinations, choose providers, get instant pricing. Launching very soon."
      backHref="/destinations"
      backLabel="Browse Destinations"
    />
  )
}
