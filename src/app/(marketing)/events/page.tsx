// src/app/(marketing)/events/page.tsx
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, MapPin, Clock, Users, CheckCircle, Phone, ArrowRight } from 'lucide-react'
import { CONTACT } from '@/lib/constants/contact'

export const metadata: Metadata = {
  title: 'Group Tours & Events',
  description:
    "Join one of our curated group tours across Zimbabwe in 2026. Kariba, Nyanga, Victoria Falls, and more — open to anyone. 25% deposit to secure your seat.",
}

const PHONE_PRIMARY = CONTACT.phonePrimary
const PHONE_SECONDARY = CONTACT.phoneSecondary
const WHATSAPP_HREF = CONTACT.whatsappHref

const INCLUDED_IN_ALL = [
  'Tour group photo',
  'Transport (return)',
  'Accommodation',
  'All meals',
  'All listed activities',
  'Tour cap & t-shirt',
]

const events = [
  {
    id: 'mothers-day-kariba',
    flier: '/events/Kariba-tour-1_100928.jpg.jpeg',
    title: "Mother's Day — Kariba",
    theme: "Mother's Day",
    themeColor: 'bg-pink-500',
    dates: '8–10 May 2026',
    dateShort: 'May 8–10',
    location: 'Kariba',
    price: 200,
    duration: '3 days',
    groupType: 'Open to all',
    status: 'open' as const,
    activities: [
      'Kariba Dam Wall',
      'Information Center',
      "St Barbara's Church",
      'Croc Farm',
      'Kariba Heights Observation Point',
      'Chinhoyi Caves',
      'Boat Cruise',
      'Dinner Dance',
    ],
    notes: undefined,
  },
  {
    id: 'africa-day-kwaterry',
    flier: '/events/kwa-terry_101059.jpg.jpeg',
    title: 'Afrika Day — Kwa-Terry',
    theme: 'Africa Day',
    themeColor: 'bg-brand-forest-600',
    dates: '25 May 2026',
    dateShort: 'May 25',
    location: 'Kwa-Terry',
    price: 45,
    duration: '1 day',
    groupType: 'Open to all',
    status: 'open' as const,
    activities: [
      'Authentic Traditional Food',
      'Traditional Games',
      'Kukama Mombe',
      'Refreshments',
    ],
    notes: 'Package includes: Tour photo, transport, food, all activities, cap & t-shirt',
  },
  {
    id: 'nyanga-hike',
    flier: '/events/Nyanga-lets-Tour-Zim11_100228.jpg.jpeg',
    title: 'Conquer the Mountain',
    theme: 'Nyanga Hike',
    themeColor: 'bg-emerald-600',
    dates: '7–9 August 2026',
    dateShort: 'Aug 7–9',
    location: 'Mount Nyangani, Nyanga',
    price: 300,
    duration: '3 days',
    groupType: 'Open to all',
    status: 'open' as const,
    activities: [
      "World's View",
      'Nyangombe Falls',
      'Troutbeck Hotel Visit',
      'Natural Pools',
      'Pit Structures',
      'Trout Hatchery Farm',
      'Rhodes Museum',
      'Nyanga Town Tour',
    ],
    notes: undefined,
  },
  {
    id: 'kariba-group-tour',
    flier: '/events/KAriba-group-tour--1_100909.jpg.jpeg',
    title: 'Kariba Group Tour',
    theme: 'Group Tour',
    themeColor: 'bg-brand-navy-700',
    dates: '8–11 October 2026',
    dateShort: 'Oct 8–11',
    location: 'Kariba',
    price: 300,
    duration: '4 days',
    groupType: 'Open to all',
    status: 'open' as const,
    activities: [
      'House Boat (optional +$100)',
      'Fishing',
      'Kariba Dam Wall',
      "St Barbara's Church",
      'Croc Farm',
      'Kariba Heights Observation Point',
      'Chinhoyi Caves',
      'Boat Cruise',
    ],
    notes: 'House Boat is an optional add-on at $100 extra per person',
  },
  {
    id: 'mosi-oa-tunya',
    flier: '/events/VICTORIA-FALLS-LETS-TOUR-ZIM-OFFICIAL_100750.jpg.jpeg',
    title: 'Mosi Oa Tunya',
    theme: 'Victoria Falls / Bulawayo',
    themeColor: 'bg-brand-orange-500',
    dates: '10–13 December 2026',
    dateShort: 'Dec 10–13',
    location: 'Victoria Falls & Bulawayo',
    price: 440,
    duration: '4 days',
    groupType: 'Open to all',
    status: 'open' as const,
    activities: [
      'Boat Cruise',
      'The Bridge',
      'Big Tree',
      'Boma Dinner',
      'Hwange National Park / Game Drive',
      'Fishing',
      'Rainforest',
      'Croc Farm',
      'Matopos',
      'Natural History Museum',
    ],
    notes: undefined,
  },
]

export default function EventsPage() {
  return (
    <main className="pt-16 lg:pt-20">

      {/* ── Hero ──────────────────────────────────────────────────── */}
      <section className="relative py-20 sm:py-28 lg:py-36 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(135deg, #0f2419 0%, #14472e 50%, #1a3a5c 100%)' }}
        />
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 bg-brand-orange-500/20 border border-brand-orange-500/30 text-brand-orange-400 text-xs font-semibold uppercase tracking-wider px-4 py-1.5 rounded-full mb-5">
            <Calendar className="w-3.5 h-3.5" /> 2026 Tour Calendar
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-5">
            Join Us On Tour.{' '}
            <span className="text-brand-amber-400">Anyone Welcome.</span>
          </h1>
          <p className="text-white/75 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
            Let&apos;s Tour Zimbabwe runs curated group tours throughout the year — open to
            individuals, couples, families, and friends. All activities, meals, transport,
            and accommodation included. Just secure your seat with a 25% deposit.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl bg-brand-orange-500 text-white font-bold text-sm hover:bg-brand-orange-600 transition-all duration-200 shadow-xl hover:scale-105"
            >
              Book a Seat via WhatsApp
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href={`tel:+263${PHONE_PRIMARY.replace(/\s/g, '')}`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl border-2 border-white/25 text-white font-semibold text-sm hover:bg-white/10 transition-all duration-200"
            >
              <Phone className="w-4 h-4" /> {PHONE_PRIMARY}
            </a>
          </div>
        </div>
      </section>

      {/* ── Calendar overview ─────────────────────────────────────── */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            {/* Intro text */}
            <div>
              <p className="text-brand-orange-500 font-semibold text-xs sm:text-sm uppercase tracking-wider mb-3">
                Full Year at a Glance
              </p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-navy-900 leading-tight mb-4">
                5 Tours. 5 Destinations.{' '}
                <span className="text-brand-orange-500">One Unforgettable Year.</span>
              </h2>
              <p className="text-brand-navy-500 text-sm sm:text-base leading-relaxed mb-6">
                Our 2026 calendar takes you from the shores of Kariba to the peaks of
                Nyanga, the thunder of Victoria Falls, and the cultural heartbeat of
                Kwa-Terry. Every tour is fully organised — you just show up.
              </p>
              <div className="space-y-3">
                {events.map((e) => (
                  <a
                    key={e.id}
                    href={`#${e.id}`}
                    className="flex items-center gap-3 group"
                  >
                    <span className={`w-2 h-2 rounded-full ${e.themeColor} shrink-0`} />
                    <span className="text-xs sm:text-sm text-brand-navy-700 group-hover:text-brand-orange-500 transition-colors font-medium">
                      {e.dateShort}
                    </span>
                    <span className="text-xs sm:text-sm text-brand-navy-500">—</span>
                    <span className="text-xs sm:text-sm text-brand-navy-600 group-hover:text-brand-orange-500 transition-colors">
                      {e.title}
                    </span>
                    <span className="text-xs font-bold text-brand-orange-500 ml-auto">
                      ${e.price}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* Calendar image */}
            <div className="relative max-w-sm mx-auto lg:max-w-none">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="/events/calender.jpeg"
                  alt="Let's Tour Zimbabwe 2026 Calendar"
                  width={600}
                  height={750}
                  className="w-full h-auto"
                  priority
                />
              </div>
              <div className="absolute -bottom-3 -right-3 bg-brand-orange-500 text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg">
                25% deposit secures your seat
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Event cards ───────────────────────────────────────────── */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-14">
            <p className="text-brand-orange-500 font-semibold text-xs sm:text-sm uppercase tracking-wider mb-3">
              2026 Events
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-navy-900 leading-tight">
              All Tours, All Details
            </h2>
            <p className="mt-3 text-brand-navy-500 text-sm sm:text-base max-w-xl mx-auto">
              Click any tour to see what&apos;s included. All prices are per person.
            </p>
          </div>

          <div className="space-y-12 sm:space-y-16">
            {events.map((event, i) => (
              <div
                key={event.id}
                id={event.id}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start ${
                  i % 2 === 1 ? 'lg:grid-flow-dense' : ''
                }`}
              >
                {/* Flier image */}
                <div className={`relative ${i % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                  <div className="relative rounded-3xl overflow-hidden shadow-2xl max-w-sm mx-auto lg:max-w-none">
                    <Image
                      src={event.flier}
                      alt={event.title}
                      width={600}
                      height={750}
                      className="w-full h-auto"
                    />
                  </div>
                </div>

                {/* Event details */}
                <div className={`flex flex-col justify-center ${i % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                  {/* Theme badge */}
                  <span className={`inline-flex self-start items-center px-3 py-1 rounded-full text-xs font-bold text-white mb-4 ${event.themeColor}`}>
                    {event.theme}
                  </span>

                  <h3 className="text-2xl sm:text-3xl font-extrabold text-brand-navy-900 leading-tight mb-2">
                    {event.title}
                  </h3>

                  {/* Meta row */}
                  <div className="flex flex-wrap gap-4 text-sm text-brand-navy-600 mb-5">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-brand-orange-400 shrink-0" />
                      {event.dates}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-brand-orange-400 shrink-0" />
                      {event.location}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-brand-orange-400 shrink-0" />
                      {event.duration}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Users className="w-4 h-4 text-brand-orange-400 shrink-0" />
                      {event.groupType}
                    </span>
                  </div>

                  {/* Price */}
                  <div className="flex items-baseline gap-2 mb-6">
                    <span className="text-4xl font-extrabold text-brand-orange-500">${event.price}</span>
                    <span className="text-brand-navy-400 text-sm">per person</span>
                    <span className="ml-2 text-xs bg-brand-orange-50 text-brand-orange-600 font-semibold px-2.5 py-1 rounded-full border border-brand-orange-200">
                      25% deposit = ${Math.ceil(event.price * 0.25)}
                    </span>
                  </div>

                  {/* Activities */}
                  <div className="mb-5">
                    <p className="text-xs font-semibold uppercase tracking-wider text-brand-navy-400 mb-2">
                      Activities Included
                    </p>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-1.5 gap-x-4">
                      {event.activities.map((act) => (
                        <li key={act} className="flex items-start gap-2 text-xs sm:text-sm text-brand-navy-600">
                          <CheckCircle className="w-3.5 h-3.5 text-brand-orange-400 shrink-0 mt-0.5" />
                          {act}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Package includes */}
                  <div className="bg-brand-navy-900 rounded-2xl px-4 py-3 mb-5">
                    <p className="text-xs font-semibold uppercase tracking-wider text-brand-amber-400 mb-2">
                      Package Includes
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {(event.id === 'africa-day-kwaterry'
                        ? ['Tour photo', 'Transport', 'Food', 'All activities', 'Cap & t-shirt']
                        : INCLUDED_IN_ALL
                      ).map((item) => (
                        <span
                          key={item}
                          className="text-xs bg-white/10 text-white/80 px-2.5 py-1 rounded-full"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                    {event.notes && (
                      <p className="text-white/50 text-xs mt-2 italic">{event.notes}</p>
                    )}
                  </div>

                  {/* CTA buttons */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <a
                      href={WHATSAPP_HREF}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-brand-orange-500 text-white font-bold text-sm hover:bg-brand-orange-600 transition-colors shadow-md"
                    >
                      Book Now — ${Math.ceil(event.price * 0.25)} deposit
                      <ArrowRight className="w-4 h-4" />
                    </a>
                    <a
                      href={`tel:+263${PHONE_PRIMARY.replace(/\s/g, '')}`}
                      className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-gray-200 text-brand-navy-700 font-semibold text-sm hover:border-brand-orange-300 transition-colors"
                    >
                      <Phone className="w-4 h-4" /> Enquire
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── What's always included ────────────────────────────────── */}
      <section className="py-14 sm:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-brand-orange-500 font-semibold text-xs sm:text-sm uppercase tracking-wider mb-3">
            Every Single Tour
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-navy-900 mb-4">
            What&apos;s Always Included
          </h2>
          <p className="text-brand-navy-500 text-sm sm:text-base mb-10 max-w-xl mx-auto">
            No hidden extras. Every Let&apos;s Tour Zimbabwe group tour comes with these as standard.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
            {[
              { emoji: '📸', label: 'Group Tour Photo' },
              { emoji: '🚌', label: 'Return Transport' },
              { emoji: '🛏️', label: 'Accommodation' },
              { emoji: '🍽️', label: 'All Meals' },
              { emoji: '🎯', label: 'All Listed Activities' },
              { emoji: '🧢', label: 'Tour Cap & T-shirt' },
            ].map(({ emoji, label }) => (
              <div
                key={label}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col items-center gap-3 hover:shadow-md hover:border-brand-orange-200 transition-all"
              >
                <span className="text-3xl">{emoji}</span>
                <span className="text-xs sm:text-sm font-semibold text-brand-navy-800 text-center">{label}</span>
              </div>
            ))}
          </div>
          <p className="mt-8 text-brand-navy-400 text-xs sm:text-sm">
            * Afrika Day (Kwa-Terry) is a 1-day event — accommodation not applicable.
          </p>
        </div>
      </section>

      {/* ── CTA / Contact ─────────────────────────────────────────── */}
      <section className="relative py-14 sm:py-20 lg:py-28 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(135deg, #0f2419 0%, #14472e 40%, #2d6a4f 70%, #e8781a 100%)' }}
        />
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            Ready to Join the Tour?
          </h2>
          <p className="text-white/75 text-sm sm:text-base mb-8 leading-relaxed">
            Secure your seat with just a 25% deposit. Contact us on WhatsApp or call to
            book — spaces are limited and fill up fast.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <a
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-brand-orange-500 text-white font-bold text-base hover:bg-brand-orange-600 transition-all duration-200 shadow-xl hover:scale-105"
            >
              Book via WhatsApp
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-white/80 text-sm">
            <a
              href={`tel:+263${PHONE_PRIMARY.replace(/\s/g, '')}`}
              className="flex items-center gap-2 hover:text-white transition-colors font-semibold"
            >
              <Phone className="w-4 h-4 text-brand-orange-400" />
              {PHONE_PRIMARY}
            </a>
            <a
              href={`tel:+263${PHONE_SECONDARY.replace(/\s/g, '')}`}
              className="flex items-center gap-2 hover:text-white transition-colors font-semibold"
            >
              <Phone className="w-4 h-4 text-brand-orange-400" />
              {PHONE_SECONDARY}
            </a>
          </div>
          <p className="mt-6 text-white/40 text-xs">
            25% deposit required · Balance due before departure · All prices per person
          </p>
        </div>
      </section>

    </main>
  )
}
