// src/components/marketing/user-types-section.tsx
import Link from 'next/link'
import { ArrowRight, Compass, Users, Briefcase, ShieldCheck } from 'lucide-react'

const userTypes = [
  {
    icon: Compass,
    role: 'Traveller',
    headline: 'Your Adventure Awaits',
    description:
      'Solo explorer, couple, or family — browse hundreds of tours, book trusted guides, and experience Zimbabwe at your own pace.',
    features: ['Instant booking', 'Verified providers', 'Flexible itineraries', 'Secure payments'],
    cta: 'Explore Tours',
    href: '/sign-up?role=traveller',
    bg: 'bg-linear-to-br from-brand-orange-500 to-brand-amber-500',
    textColor: 'text-white',
  },
  {
    icon: Users,
    role: 'Group Organiser',
    headline: 'Plan Group Trips Effortlessly',
    description:
      'Schools, corporates, and community groups — manage multi-person tours with compliance tools, group pricing, and document management built in.',
    features: ['Group pricing', 'Compliance checklists', 'Document management', 'Budget tracking'],
    cta: 'Plan a Group Tour',
    href: '/sign-up?role=organiser',
    bg: 'bg-brand-navy-900',
    textColor: 'text-white',
  },
  {
    icon: Briefcase,
    role: 'Service Provider',
    headline: 'Grow Your Tourism Business',
    description:
      'Guides, transport operators, lodges, and activity providers — reach thousands of travellers, manage bookings, and build your reputation.',
    features: ['Direct bookings', 'Rating system', 'Earnings dashboard', 'Easy onboarding'],
    cta: 'Become a Provider',
    href: '/sign-up?role=provider',
    bg: 'bg-brand-forest-900',
    textColor: 'text-white',
  },
]

export function UserTypesSection() {
  return (
    <section className="py-14 sm:py-20 lg:py-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-14">
          <p className="text-brand-orange-500 font-semibold text-xs sm:text-sm uppercase tracking-wider mb-3">
            Built for Everyone
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-navy-900 leading-tight">
            Who Is It For?
          </h2>
          <p className="mt-3 sm:mt-4 text-brand-navy-500 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto">
            Whether you&apos;re a solo traveller, a school trip organiser, or a local tour
            operator — there&apos;s a place for you on Let&apos;s Tour Zimbabwe.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {userTypes.map(({ icon: Icon, role, headline, description, features, cta, href, bg, textColor }) => (
            <div
              key={role}
              className={`rounded-3xl p-6 sm:p-8 flex flex-col ${bg} ${textColor} group`}
            >
              {/* Icon + Role */}
              <div className="flex items-center gap-3 mb-5 sm:mb-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-white/15 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider opacity-75">
                  {role}
                </span>
              </div>

              {/* Content */}
              <h3 className="text-xl sm:text-2xl font-extrabold leading-tight mb-2 sm:mb-3">{headline}</h3>
              <p className="opacity-80 text-xs sm:text-sm leading-relaxed mb-5 sm:mb-6">{description}</p>

              {/* Features */}
              <ul className="space-y-2 mb-6 sm:mb-8 flex-1">
                {features.map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-xs sm:text-sm">
                    <ShieldCheck className="w-4 h-4 opacity-60 shrink-0" />
                    <span className="opacity-90">{f}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Link
                href={href}
                className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-white/20 hover:bg-white/30 font-semibold text-xs sm:text-sm transition-all duration-200 group-hover:gap-3 border border-white/20"
              >
                {cta}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
