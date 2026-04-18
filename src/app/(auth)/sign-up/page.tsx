// src/app/(auth)/sign-up/page.tsx
import type { Metadata } from 'next'
import { ComingSoon } from '@/components/shared/coming-soon'

export const metadata: Metadata = { title: 'Get Started' }

export default function SignUpPage() {
  return (
    <ComingSoon
      title="Create Your Account"
      description="Sign up as a Traveller, Group Organiser, or Service Provider. Launching very soon — enter your email and we'll let you know the moment we go live."
      backHref="/"
      backLabel="Back to Home"
    />
  )
}
