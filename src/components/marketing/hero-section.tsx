// src/components/marketing/hero-section.tsx
import Link from 'next/link'
import { ArrowRight, Play, Star, MapPin, Shield, Clock } from 'lucide-react'

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient mimicking the logo's sunset scene */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 80% 60% at 50% 0%, #f5a623 0%, #e8781a 30%, #c2611a 60%, transparent 100%),
            linear-gradient(180deg, #0f2419 60%, #14472e 80%, #2d6a4f 90%, #74b49e 100%)
          `,
        }}
      />

      {/* Layered hills silhouette */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
        {/* Back hills — sage */}
        <svg
          className="absolute bottom-0 left-0 right-0 w-full"
          viewBox="0 0 1440 420"
          preserveAspectRatio="none"
          fill="none"
        >
          <path
            d="M0 420 L0 280 Q180 200 360 240 Q540 280 720 220 Q900 160 1080 200 Q1260 240 1440 180 L1440 420 Z"
            fill="#74b49e"
            opacity="0.5"
          />
          <path
            d="M0 420 L0 310 Q200 240 400 270 Q600 300 800 250 Q1000 200 1200 230 Q1350 250 1440 210 L1440 420 Z"
            fill="#2d6a4f"
            opacity="0.6"
          />
          <path
            d="M0 420 L0 350 Q150 300 300 320 Q500 350 700 310 Q900 270 1100 300 Q1300 330 1440 290 L1440 420 Z"
            fill="#14472e"
            opacity="0.8"
          />
          {/* Dark foreground */}
          <path
            d="M0 420 L0 390 Q200 370 400 380 Q700 400 1000 375 Q1200 360 1440 380 L1440 420 Z"
            fill="#0f2419"
          />
          {/* Acacia tree silhouette */}
          <g fill="#0f2419">
            {/* Trunk */}
            <rect x="180" y="310" width="8" height="70" />
            {/* Canopy */}
            <ellipse cx="184" cy="300" rx="55" ry="20" />
            <ellipse cx="160" cy="315" rx="30" ry="14" />
            <ellipse cx="210" cy="315" rx="35" ry="14" />
          </g>
          {/* Antelope silhouettes */}
          <g fill="#0f2419">
            {/* Large antelope */}
            <ellipse cx="820" cy="380" rx="18" ry="9" />
            <rect x="828" y="370" width="5" height="20" />
            <rect x="815" y="370" width="5" height="18" />
            <ellipse cx="833" cy="368" rx="9" ry="7" />
            {/* Horn */}
            <line x1="836" y1="361" x2="842" y2="350" stroke="#0f2419" strokeWidth="2" />
            {/* Small antelope */}
            <ellipse cx="750" cy="387" rx="13" ry="7" />
            <rect x="756" y="379" width="4" height="16" />
            <rect x="745" y="379" width="4" height="14" />
            <ellipse cx="761" cy="377" rx="7" ry="6" />
          </g>
        </svg>
      </div>

      {/* Overlay for text legibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40" />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-sm border border-white/25 text-white text-sm font-medium mb-8">
          <Star className="w-3.5 h-3.5 fill-brand-amber-400 text-brand-amber-400" />
          Zimbabwe&apos;s #1 Tour Planning Platform
        </div>

        {/* Headline */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-[1.05] tracking-tight mb-6">
          Discover the Heart of{' '}
          <span className="text-brand-amber-400">Zimbabwe</span>
        </h1>

        <p className="text-lg sm:text-xl text-white/85 max-w-2xl mx-auto leading-relaxed mb-10">
          From Victoria Falls to the Great Zimbabwe Ruins — explore breathtaking landscapes,
          encounter incredible wildlife, and connect with vetted local guides for an unforgettable journey.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <Link
            href="/plan"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-brand-orange-500 text-white font-bold text-base hover:bg-brand-orange-600 transition-all duration-200 shadow-xl hover:shadow-brand-orange-500/30 hover:scale-105"
          >
            Start Planning Your Tour
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            href="#destinations"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-white/15 backdrop-blur-sm border border-white/30 text-white font-semibold text-base hover:bg-white/25 transition-all duration-200"
          >
            <Play className="w-4 h-4 fill-white" />
            Explore Destinations
          </Link>
        </div>

        {/* Trust indicators */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-white/75 text-sm">
          <span className="flex items-center gap-1.5">
            <Shield className="w-4 h-4 text-brand-amber-400" />
            Verified Local Providers
          </span>
          <span className="flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-brand-amber-400" />
            Nationwide Coverage
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-brand-amber-400" />
            Plan in Minutes
          </span>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50 text-xs animate-bounce">
        <span>Scroll to explore</span>
        <div className="w-0.5 h-8 bg-white/30 rounded-full" />
      </div>
    </section>
  )
}
