// src/app/(marketing)/about/page.tsx
import type { Metadata } from 'next'
import { ComingSoon } from '@/components/shared/coming-soon'

export const metadata: Metadata = { title: 'About Us' }

export default function AboutPage() {
  return (
    <ComingSoon
      title="About Us"
      description="We're a team of Zimbabweans passionate about sharing our country with the world. Our full story is on the way."
      backHref="/"
      backLabel="Back to Home"
    />
  )
}
