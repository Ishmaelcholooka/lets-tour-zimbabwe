// src/components/shared/coming-soon.tsx
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Bell } from 'lucide-react'

interface ComingSoonProps {
  title: string
  description: string
  backHref?: string
  backLabel?: string
}

export function ComingSoon({
  title,
  description,
  backHref = '/',
  backLabel = 'Back to Home',
}: ComingSoonProps) {
  return (
    <div className="min-h-screen bg-brand-navy-900 flex flex-col items-center justify-center px-4 text-center">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-3 mb-12">
        <Image src="/logo.jpeg" alt="Let's Tour Zimbabwe" width={56} height={56} className="rounded-full" />
        <span className="font-bold text-lg text-white">Let&apos;s Tour Zimbabwe</span>
      </Link>

      {/* Illustration — sunset gradient circle */}
      <div
        className="w-40 h-40 rounded-full mb-8 flex items-center justify-center text-6xl"
        style={{
          background:
            'radial-gradient(circle, #f5a623 0%, #e8781a 50%, #c2611a 100%)',
          boxShadow: '0 0 60px rgba(232, 120, 26, 0.4)',
        }}
      >
        🏞️
      </div>

      {/* Badge */}
      <span className="inline-block px-4 py-1.5 rounded-full bg-brand-orange-500/20 text-brand-orange-400 text-sm font-semibold mb-4 border border-brand-orange-500/30">
        Coming Soon
      </span>

      <h1 className="text-4xl lg:text-5xl font-extrabold text-white mb-4 leading-tight">
        {title}
      </h1>
      <p className="text-brand-navy-300 text-lg max-w-md leading-relaxed mb-10">
        {description}
      </p>

      {/* Notify form (static — no server action yet) */}
      <div className="flex flex-col sm:flex-row gap-3 w-full max-w-sm mb-10">
        <input
          type="email"
          placeholder="Your email address"
          className="flex-1 px-4 py-3 rounded-xl bg-brand-navy-800 border border-brand-navy-700 text-white placeholder-brand-navy-400 text-sm focus:outline-none focus:border-brand-orange-500 transition-colors"
        />
        <button className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-brand-orange-500 text-white font-semibold text-sm hover:bg-brand-orange-600 transition-colors">
          <Bell className="w-4 h-4" /> Notify Me
        </button>
      </div>

      {/* Back link */}
      <Link
        href={backHref}
        className="inline-flex items-center gap-2 text-brand-navy-400 hover:text-white text-sm transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> {backLabel}
      </Link>
    </div>
  )
}
