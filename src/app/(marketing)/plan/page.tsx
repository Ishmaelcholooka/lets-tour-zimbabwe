// src/app/(marketing)/plan/page.tsx
import type { Metadata } from 'next'
import { PlannerWizard } from '@/components/planner/planner-wizard'

export const metadata: Metadata = {
  title: 'Plan a Tour',
  description: 'Build your perfect Zimbabwe itinerary — pick destinations, choose activities, and get an instant quote.',
}

export default function PlanPage() {
  return <PlannerWizard />
}
