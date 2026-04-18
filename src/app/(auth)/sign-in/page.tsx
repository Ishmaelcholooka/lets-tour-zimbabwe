// src/app/(auth)/sign-in/page.tsx
import type { Metadata } from 'next'
import { ComingSoon } from '@/components/shared/coming-soon'

export const metadata: Metadata = { title: 'Sign In' }

export default function SignInPage() {
  return (
    <ComingSoon
      title="Sign In"
      description="Authentication is coming soon. We're setting up secure login for all user types."
      backHref="/"
      backLabel="Back to Home"
    />
  )
}
