// src/components/marketing/how-it-works-section.tsx
import { Search, Users, CreditCard, Star } from 'lucide-react'

const steps = [
  {
    step: '01',
    icon: Search,
    title: 'Browse & Discover',
    description:
      'Explore destinations, experiences, and verified service providers across Zimbabwe. Filter by budget, date, group size, or activity type.',
    accent: 'bg-brand-orange-50 text-brand-orange-500',
    border: 'border-brand-orange-200',
  },
  {
    step: '02',
    icon: Users,
    title: 'Build Your Itinerary',
    description:
      'Mix and match guides, transport, accommodation, and activities. Get instant pricing and availability — everything in one place.',
    accent: 'bg-brand-amber-50 text-brand-amber-600',
    border: 'border-brand-amber-200',
  },
  {
    step: '03',
    icon: CreditCard,
    title: 'Book & Pay Securely',
    description:
      'Confirm your booking with a secure deposit. Pay via Stripe, EcoCash, or OneMoney. Funds held in escrow until your tour is complete.',
    accent: 'bg-brand-forest-50 text-brand-forest-600',
    border: 'border-brand-forest-200',
  },
  {
    step: '04',
    icon: Star,
    title: 'Tour & Review',
    description:
      'Enjoy your Zimbabwe adventure with confidence. After your trip, leave a review to help future travellers and reward great providers.',
    accent: 'bg-brand-sage-50 text-brand-sage-600',
    border: 'border-brand-sage-200',
  },
]

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-14 sm:py-20 lg:py-28 bg-brand-navy-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-16">
          <p className="text-brand-amber-400 font-semibold text-xs sm:text-sm uppercase tracking-wider mb-3">
            Simple by Design
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
            How It Works
          </h2>
          <p className="mt-3 sm:mt-4 text-brand-navy-300 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto">
            From idea to adventure in four simple steps. No phone calls, no spreadsheets —
            just seamless tour planning.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {steps.map(({ step, icon: Icon, title, description, accent, border }) => (
            <div
              key={step}
              className={`relative rounded-2xl border bg-brand-navy-800/50 backdrop-blur-sm p-5 sm:p-6 ${border} group hover:border-brand-orange-500/50 transition-colors duration-300`}
            >
              <span className="absolute top-4 right-4 text-4xl sm:text-5xl font-black text-white/5 group-hover:text-white/10 transition-colors duration-300 select-none">
                {step}
              </span>

              <div className={`inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-xl ${accent} mb-4 sm:mb-5`}>
                <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>

              <h3 className="text-white font-bold text-base sm:text-lg mb-2">{title}</h3>
              <p className="text-brand-navy-300 text-xs sm:text-sm leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
