// src/app/(marketing)/about/page.tsx
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowRight,
  Heart,
  ShieldCheck,
  Users,
  MapPin,
  Lightbulb,
  Handshake,
  Star,
  Globe,
  Compass,
  Briefcase,
  BookOpen,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'About Us',
  description:
    "We're a team of Zimbabweans passionate about sharing our country with the world. Learn about our mission, values, and the platform we're building.",
}

const stats = [
  { value: '50+', label: 'Destinations' },
  { value: '500+', label: 'Verified Providers' },
  { value: '10K+', label: 'Happy Travellers' },
  { value: '4.9★', label: 'Average Rating' },
]

const values = [
  {
    icon: Heart,
    title: 'Proudly Zimbabwean',
    description:
      "We're not a foreign startup that discovered Zimbabwe on a map. This platform was built by people who grew up here, love it here, and want the world to experience it as we do.",
  },
  {
    icon: ShieldCheck,
    title: 'Trust First',
    description:
      'Every provider is vetted before they list. Every payment is held in escrow until your tour completes. Trust is not a feature — it is our foundation.',
  },
  {
    icon: Lightbulb,
    title: 'Local Knowledge',
    description:
      'Our itineraries and recommendations are shaped by people who have hiked Chimanimani, camped in Hwange, and paddled Kariba. No algorithm replaces that.',
  },
  {
    icon: Handshake,
    title: 'Community Impact',
    description:
      'Every booking puts money directly into local hands — guides, lodge owners, community operators, and small businesses that tourism sustains.',
  },
  {
    icon: Globe,
    title: 'Accessible to All',
    description:
      "Whether you're a solo backpacker, a school organising a trip, or a corporate team — the platform works for every traveller type and every budget.",
  },
  {
    icon: Star,
    title: 'Transparency Always',
    description:
      'No hidden fees. No bait-and-switch pricing. Verified reviews from real completed bookings only. You deserve to know exactly what you are getting.',
  },
]

const whoWeServe = [
  {
    icon: Compass,
    title: 'Individual Travellers',
    description:
      'Solo explorers, couples, and families discovering Zimbabwe at their own pace — from Victoria Falls to the Eastern Highlands.',
  },
  {
    icon: Users,
    title: 'School Groups',
    description:
      'Educational tours with compliance tools, parental consent management, and group pricing built for teachers and trip coordinators.',
  },
  {
    icon: Briefcase,
    title: 'Corporate Teams',
    description:
      'Team-building retreats, incentive travel, and conference add-ons for companies wanting something extraordinary off the beaten track.',
  },
  {
    icon: Globe,
    title: 'International Visitors',
    description:
      "First-timers from around the world who want a safe, well-organised, and authentic Zimbabwe experience — not a generic safari package.",
  },
  {
    icon: BookOpen,
    title: 'Service Providers',
    description:
      'Local guides, lodge owners, transport operators, and activity providers who want a reliable platform to reach new customers and grow.',
  },
  {
    icon: MapPin,
    title: 'Diaspora Returns',
    description:
      "Zimbabweans living abroad bringing family back home — wanting the country's best organised and ready to impress.",
  },
]

export default function AboutPage() {
  return (
    <main className="pt-16 lg:pt-20">

      {/* ── Hero ──────────────────────────────────────────────────── */}
      <section className="relative min-h-[70vh] flex items-end overflow-hidden">
        <Image
          src="/great zimbabwe.jpg"
          alt="Great Zimbabwe ruins"
          fill
          sizes="100vw"
          className="object-cover object-center"
          priority
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-brand-navy-900 via-brand-navy-900/60 to-brand-navy-900/20" />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14 sm:pb-20">
          <p className="text-brand-orange-400 font-semibold text-xs sm:text-sm uppercase tracking-wider mb-3">
            Our Story
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight max-w-3xl">
            Built by Zimbabweans,{' '}
            <span className="text-brand-amber-400">For the World</span>
          </h1>
          <p className="mt-4 sm:mt-6 text-white/80 text-sm sm:text-base lg:text-lg max-w-2xl leading-relaxed">
            Let&apos;s Tour Zimbabwe is a tourism discovery and booking platform that connects
            travellers with the very best vetted local guides, accommodation, transport, and
            experiences across Zimbabwe.
          </p>

          {/* Stats row */}
          <div className="mt-8 sm:mt-10 flex flex-wrap gap-6 sm:gap-10">
            {stats.map(({ value, label }) => (
              <div key={label}>
                <div className="text-2xl sm:text-3xl font-extrabold text-white">{value}</div>
                <div className="text-xs sm:text-sm text-white/60 mt-0.5">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Mission ───────────────────────────────────────────────── */}
      <section className="py-14 sm:py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Text */}
            <div>
              <p className="text-brand-orange-500 font-semibold text-xs sm:text-sm uppercase tracking-wider mb-3">
                Our Mission
              </p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-navy-900 leading-tight mb-5 sm:mb-6">
                Make Zimbabwe Easy to Explore — and Impossible to Forget
              </h2>
              <div className="space-y-4 text-brand-navy-600 text-sm sm:text-base leading-relaxed">
                <p>
                  Zimbabwe has everything a world-class destination needs: ancient ruins,
                  thundering waterfalls, endless wilderness, vibrant culture, and people
                  whose warmth is unlike anywhere else on earth. What it lacked was a
                  single, trustworthy place to plan and book it all.
                </p>
                <p>
                  That is why we built Let&apos;s Tour Zimbabwe. Not to replace the
                  human connection that makes Zimbabwean tourism special — but to make it
                  easier to find, plan, and pay for, wherever you are in the world.
                </p>
                <p>
                  We connect individual travellers, school groups, corporate teams, and
                  international visitors with hundreds of vetted local service providers —
                  guides, lodges, transport operators, and activity specialists — through a
                  platform built around trust, transparency, and local knowledge.
                </p>
              </div>
            </div>

            {/* Image */}
            <div className="relative aspect-4/3 rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="/matobo.jpg"
                alt="Matobo Hills — Zimbabwe"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-brand-navy-900/80 backdrop-blur-sm rounded-2xl px-4 py-3 text-white text-xs sm:text-sm">
                <span className="font-bold">Matobo Hills</span>
                <span className="text-white/60 ml-2">UNESCO World Heritage Site</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── What We're Building ───────────────────────────────────── */}
      <section className="py-14 sm:py-20 lg:py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-14">
            <p className="text-brand-orange-500 font-semibold text-xs sm:text-sm uppercase tracking-wider mb-3">
              The Platform
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-navy-900 leading-tight">
              Everything Zimbabwe Tourism Needs
            </h2>
            <p className="mt-3 sm:mt-4 text-brand-navy-500 text-sm sm:text-base max-w-2xl mx-auto">
              One platform. Every type of traveller. All the tools to plan, book, and deliver
              unforgettable Zimbabwe experiences.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {[
              {
                emoji: '🗺️',
                title: 'Tour Planning Wizard',
                description:
                  'Build a full itinerary step by step — destinations, activities, accommodation, and meals — and get an instant price estimate.',
              },
              {
                emoji: '🛡️',
                title: 'Vetted Marketplace',
                description:
                  'Browse hundreds of background-checked guides, lodges, transport operators, and activity providers with verified reviews.',
              },
              {
                emoji: '💳',
                title: 'Secure Payments',
                description:
                  'Pay via Stripe card, EcoCash, or OneMoney. Funds held in escrow until your tour completes — full refund protection.',
              },
              {
                emoji: '🏫',
                title: 'Group & School Tools',
                description:
                  'Compliance checklists, parental consent forms, group pricing, document management, and budget tracking built for organisers.',
              },
              {
                emoji: '📊',
                title: 'Provider Dashboard',
                description:
                  'Guides and operators get a dedicated dashboard to manage availability, bookings, earnings, and customer reviews.',
              },
              {
                emoji: '💬',
                title: 'Real-Time Messaging',
                description:
                  'Communicate directly with your provider before, during, and after your tour — no middlemen, no lost emails.',
              },
            ].map(({ emoji, title, description }) => (
              <div
                key={title}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-6 hover:shadow-md hover:border-brand-orange-200 transition-all duration-200"
              >
                <span className="text-3xl mb-4 block">{emoji}</span>
                <h3 className="font-bold text-brand-navy-900 text-sm sm:text-base mb-2">{title}</h3>
                <p className="text-brand-navy-500 text-xs sm:text-sm leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Values ────────────────────────────────────────────────── */}
      <section className="py-14 sm:py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-14">
            <p className="text-brand-orange-500 font-semibold text-xs sm:text-sm uppercase tracking-wider mb-3">
              What We Stand For
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-navy-900 leading-tight">
              Our Values
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {values.map(({ icon: Icon, title, description }) => (
              <div key={title} className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-brand-orange-50 flex items-center justify-center shrink-0 mt-0.5">
                  <Icon className="w-5 h-5 text-brand-orange-500" />
                </div>
                <div>
                  <h3 className="font-bold text-brand-navy-900 text-sm sm:text-base mb-1">{title}</h3>
                  <p className="text-brand-navy-500 text-xs sm:text-sm leading-relaxed">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Who We Serve ──────────────────────────────────────────── */}
      <section className="py-14 sm:py-20 lg:py-28 bg-brand-navy-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-14">
            <p className="text-brand-amber-400 font-semibold text-xs sm:text-sm uppercase tracking-wider mb-3">
              Built for Everyone
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
              Who We Serve
            </h2>
            <p className="mt-3 sm:mt-4 text-brand-navy-300 text-sm sm:text-base max-w-2xl mx-auto">
              From the solo backpacker to the international tour operator — there is a place
              for everyone on Let&apos;s Tour Zimbabwe.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {whoWeServe.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="bg-brand-navy-800/50 border border-brand-navy-700 rounded-2xl p-5 sm:p-6 hover:border-brand-orange-500/40 transition-colors duration-200"
              >
                <div className="w-10 h-10 rounded-xl bg-brand-orange-500/15 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-brand-orange-400" />
                </div>
                <h3 className="font-bold text-white text-sm sm:text-base mb-2">{title}</h3>
                <p className="text-brand-navy-300 text-xs sm:text-sm leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Scenery strip ─────────────────────────────────────────── */}
      <div className="grid grid-cols-3 h-36 sm:h-52 lg:h-64 overflow-hidden">
        {['/kariba.jpg', '/mana pools.jpg', '/vicfalls.jpg'].map((src, i) => (
          <div key={i} className="relative overflow-hidden">
            <Image
              src={src}
              alt=""
              fill
              sizes="33vw"
              className="object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>
        ))}
      </div>

      {/* ── CTA ───────────────────────────────────────────────────── */}
      <section className="relative py-14 sm:py-20 lg:py-28 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(135deg, #0f2419 0%, #14472e 40%, #2d6a4f 70%, #e8781a 100%)' }}
        />
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4 sm:mb-6">
            Ready to Experience Zimbabwe?
          </h2>
          <p className="text-white/80 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed">
            Start planning your trip for free. Browse destinations, build your itinerary, and
            connect with vetted local providers — all in one place.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <Link
              href="/plan"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 sm:px-10 sm:py-4 rounded-2xl bg-brand-orange-500 text-white font-bold text-sm sm:text-base hover:bg-brand-orange-600 transition-all duration-200 shadow-2xl hover:scale-105"
            >
              Start Planning Free
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </Link>
            <Link
              href="/destinations"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 sm:px-10 sm:py-4 rounded-2xl border-2 border-white/30 text-white font-semibold text-sm sm:text-base hover:bg-white/10 transition-all duration-200"
            >
              Explore Destinations
            </Link>
          </div>
          <p className="mt-6 sm:mt-8 text-white/50 text-xs sm:text-sm">
            Free to browse · Secure payments · Cancel anytime
          </p>
        </div>
      </section>

    </main>
  )
}
