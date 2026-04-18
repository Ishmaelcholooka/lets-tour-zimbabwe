// src/app/(marketing)/experiences/page.tsx
import type { Metadata } from 'next'
import { ComingSoon } from '@/components/shared/coming-soon'

export const metadata: Metadata = { title: 'Experiences' }

export default function ExperiencesPage() {
  return (
    <ComingSoon
      title="Experiences"
      description="Safari walks, canoe expeditions, cultural immersions, and more — we're curating Zimbabwe's best experiences. Be the first to know when they launch."
      backHref="/"
      backLabel="Back to Home"
    />
  )
}
