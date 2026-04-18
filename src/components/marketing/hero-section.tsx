// src/components/marketing/hero-section.tsx
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ChevronDown, Search, MapPin, Shield, Clock } from 'lucide-react'

const popularSearches = ['Victoria Falls', 'Hwange Safari', 'Great Zimbabwe', 'Lake Kariba']

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background photo */}
      <Image
        src="/vicfalls.jpg"
        alt="Victoria Falls — The Smoke That Thunders"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      {/* Colour overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 80% 60% at 50% 0%, rgba(245,166,35,0.45) 0%, rgba(232,120,26,0.35) 30%, transparent 70%),
            linear-gradient(180deg, rgba(15,36,25,0.5) 0%, rgba(15,36,25,0.8) 100%)
          `,
        }}
      />
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-black/50" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20 pb-28">
        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.05] tracking-tight mb-4 sm:mb-5">
          Discover the Heart of{' '}
          <span className="text-brand-amber-400">Zimbabwe</span>
        </h1>

        <p className="text-sm sm:text-base md:text-lg text-white/80 max-w-xl mx-auto leading-relaxed mb-8 sm:mb-10">
          Breathtaking landscapes, incredible wildlife, vetted local guides.
          Your unforgettable Zimbabwe journey starts here.
        </p>

        {/* Search widget */}
        <div className="bg-white rounded-2xl shadow-2xl p-2 flex flex-col sm:flex-row gap-2 mb-4 max-w-2xl mx-auto">
          <div className="flex items-center gap-3 flex-1 px-3 py-2">
            <MapPin className="w-5 h-5 text-brand-orange-500 shrink-0" />
            <input
              type="text"
              placeholder="Where do you want to go?"
              className="flex-1 text-sm text-brand-navy-900 placeholder:text-brand-navy-400 outline-none bg-transparent font-medium min-w-0"
            />
          </div>
          <Link
            href="/destinations"
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-brand-orange-500 text-white font-bold text-sm hover:bg-brand-orange-600 transition-colors duration-200 shrink-0"
          >
            <Search className="w-4 h-4" />
            Explore
          </Link>
        </div>

        {/* Popular searches */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          <span className="text-white/50 text-xs">Popular:</span>
          {popularSearches.map((term) => (
            <Link
              key={term}
              href={`/destinations?q=${encodeURIComponent(term)}`}
              className="px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 text-white/80 text-xs font-medium transition-colors duration-200 backdrop-blur-sm border border-white/15"
            >
              {term}
            </Link>
          ))}
        </div>

        {/* Trust indicators */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-white/65 text-xs sm:text-sm">
          <span className="flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-brand-amber-400" />
            Verified Local Providers
          </span>
          <span className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-brand-amber-400" />
            Nationwide Coverage
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-brand-amber-400" />
            Plan in Minutes
          </span>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/50 text-xs animate-bounce">
        <span className="tracking-wide uppercase">Scroll to explore</span>
        <ChevronDown className="w-5 h-5" />
      </div>
    </section>
  )
}
