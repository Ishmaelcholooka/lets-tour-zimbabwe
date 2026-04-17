// src/components/marketing/cta-section.tsx
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export function CtaSection() {
  return (
    <section className="py-20 lg:py-28 relative overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(135deg, #0f2419 0%, #14472e 40%, #2d6a4f 70%, #e8781a 100%)`,
        }}
      />
      {/* Pattern overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
          Zimbabwe Is Calling.{' '}
          <span className="text-brand-amber-400">Answer It.</span>
        </h2>
        <p className="text-white/80 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
          Join thousands of travellers, schools, and tour operators who are discovering Zimbabwe
          the smarter way. Start planning for free — no credit card required.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/sign-up"
            className="inline-flex items-center gap-2 px-10 py-4 rounded-2xl bg-brand-orange-500 text-white font-bold text-lg hover:bg-brand-orange-600 transition-all duration-200 shadow-2xl hover:shadow-brand-orange-500/40 hover:scale-105"
          >
            Start Planning Free
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            href="/providers/register"
            className="inline-flex items-center gap-2 px-10 py-4 rounded-2xl border-2 border-white/30 text-white font-semibold text-lg hover:bg-white/10 transition-all duration-200"
          >
            Join as a Provider
          </Link>
        </div>

        <p className="mt-8 text-white/50 text-sm">
          Free to browse · Secure payments · Cancel anytime
        </p>
      </div>
    </section>
  )
}
