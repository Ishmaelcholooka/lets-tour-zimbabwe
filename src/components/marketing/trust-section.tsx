// src/components/marketing/trust-section.tsx
import { ShieldCheck, BadgeCheck, Headphones, CreditCard, Star, Map } from 'lucide-react'

const pillars = [
  {
    icon: BadgeCheck,
    title: 'Vetted Local Guides',
    description: 'Every provider is background-checked, licensed, and reviewed by real travellers before listing.',
  },
  {
    icon: ShieldCheck,
    title: 'Secure Escrow Payments',
    description: 'Your money is held safely until your tour is complete. Pay via card, EcoCash, or OneMoney.',
  },
  {
    icon: Star,
    title: 'Verified Reviews',
    description: 'Only travellers who completed a booking can leave a review — no fake ratings, ever.',
  },
  {
    icon: Map,
    title: 'Expert Local Knowledge',
    description: 'Itineraries built by people who live and breathe Zimbabwe tourism, not algorithms.',
  },
  {
    icon: CreditCard,
    title: 'No Hidden Fees',
    description: "The price you see is the price you pay. Transparent invoicing from first click to final payment.",
  },
  {
    icon: Headphones,
    title: '24 / 7 Support',
    description: 'Real humans available by chat, WhatsApp, or phone before, during, and after your tour.',
  },
]

export function TrustSection() {
  return (
    <section className="py-14 sm:py-20 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-14">
          <p className="text-brand-orange-500 font-semibold text-xs sm:text-sm uppercase tracking-wider mb-3">
            Why Book With Us
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-navy-900 leading-tight">
            Travel Zimbabwe with Confidence
          </h2>
          <p className="mt-3 sm:mt-4 text-brand-navy-500 text-sm sm:text-base max-w-2xl mx-auto">
            We built the platform we wished existed when planning our own Zimbabwe adventures.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {pillars.map(({ icon: Icon, title, description }) => (
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
  )
}
