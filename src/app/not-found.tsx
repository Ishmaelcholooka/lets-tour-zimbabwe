// src/app/not-found.tsx
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-brand-navy-900 flex flex-col items-center justify-center px-4 text-center">
      <Link href="/" className="flex items-center gap-3 mb-12">
        <Image src="/logo.jpeg" alt="Let's Tour Zimbabwe" width={52} height={52} className="rounded-full" />
        <span className="font-bold text-white">Let&apos;s Tour Zimbabwe</span>
      </Link>

      <div className="text-8xl font-black text-brand-orange-500 mb-4">404</div>
      <h1 className="text-3xl font-extrabold text-white mb-3">Page Not Found</h1>
      <p className="text-brand-navy-300 max-w-sm mb-8">
        Looks like this trail leads nowhere. Let&apos;s get you back on track.
      </p>

      <Link
        href="/"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-orange-500 text-white font-semibold hover:bg-brand-orange-600 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Home
      </Link>
    </div>
  )
}
