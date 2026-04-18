// src/components/marketing/testimonials-section.tsx
import { Star } from 'lucide-react'

const testimonials = [
  {
    name: 'Sarah M.',
    role: 'Solo Traveller · UK',
    quote:
      'I planned my entire Zimbabwe trip in one afternoon. The guides were incredible and I felt completely safe. Victoria Falls was even more breathtaking than I imagined.',
    rating: 5,
    initials: 'SM',
    color: 'bg-brand-orange-500',
  },
  {
    name: 'Mr. Chikore',
    role: 'Teacher · St Georges College, Harare',
    quote:
      "Organising a school trip used to take weeks of calls and spreadsheets. With Let's Tour Zimbabwe, our Grade 10 history trip to Great Zimbabwe was sorted in a day. The compliance tools are a game changer.",
    rating: 5,
    initials: 'BC',
    color: 'bg-brand-forest-600',
  },
  {
    name: 'James K.',
    role: 'Tour Guide · Hwange',
    quote:
      'My bookings have tripled since joining the platform. The rating system motivates me to give my best, and the payment process is smooth and transparent.',
    rating: 5,
    initials: 'JK',
    color: 'bg-brand-amber-600',
  },
  {
    name: 'The Ndlovu Family',
    role: 'Family Group · Bulawayo',
    quote:
      'We wanted a proper Easter family trip but had no idea where to start. This platform had everything — houseboat on Kariba, game drives in Hwange, all booked seamlessly.',
    rating: 5,
    initials: 'NF',
    color: 'bg-brand-navy-700',
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-14 sm:py-20 lg:py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-14">
          <p className="text-brand-orange-500 font-semibold text-xs sm:text-sm uppercase tracking-wider mb-3">
            What People Say
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-navy-900 leading-tight">
            Trusted by Travellers
          </h2>
        </div>
      </div>

      {/* Mobile: horizontal snap scroll — Desktop: grid */}
      <div className="lg:max-w-7xl lg:mx-auto lg:px-8">
        {/* Scroll container — full bleed on mobile for the swipe feel */}
        <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 px-4 sm:px-6 lg:px-0 lg:grid lg:grid-cols-4 lg:gap-6 lg:overflow-visible scrollbar-hide">
          {testimonials.map(({ name, role, quote, rating, initials, color }) => (
            <div
              key={name}
              className="snap-start shrink-0 w-[80vw] sm:w-[60vw] lg:w-auto rounded-2xl border border-gray-100 bg-gray-50 p-5 sm:p-6 flex flex-col gap-3 hover:shadow-md transition-shadow duration-200"
            >
              {/* Stars */}
              <div className="flex gap-0.5">
                {Array.from({ length: rating }).map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-brand-amber-400 text-brand-amber-400" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-brand-navy-700 text-sm leading-relaxed flex-1 italic">
                &ldquo;{quote}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-2 border-t border-gray-100">
                <div className={`w-9 h-9 rounded-full ${color} flex items-center justify-center text-white text-xs font-bold shrink-0`}>
                  {initials}
                </div>
                <div>
                  <div className="text-brand-navy-900 font-semibold text-sm">{name}</div>
                  <div className="text-brand-navy-400 text-xs">{role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile scroll indicator dots */}
        <div className="flex justify-center gap-1.5 mt-4 lg:hidden">
          {testimonials.map((_, i) => (
            <div key={i} className={`rounded-full bg-brand-navy-200 ${i === 0 ? 'w-4 h-1.5 bg-brand-orange-500' : 'w-1.5 h-1.5'} transition-all duration-200`} />
          ))}
        </div>
      </div>
    </section>
  )
}
