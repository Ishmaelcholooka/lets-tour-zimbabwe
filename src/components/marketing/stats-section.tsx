// src/components/marketing/stats-section.tsx
import { Users, MapPin, Star, ShieldCheck } from 'lucide-react'

const stats = [
  { value: '500+', label: 'Verified Providers', icon: ShieldCheck },
  { value: '50+', label: 'Destinations', icon: MapPin },
  { value: '10K+', label: 'Happy Travellers', icon: Users },
  { value: '4.9★', label: 'Average Rating', icon: Star },
]

export function StatsSection() {
  return (
    <section className="bg-brand-navy-900 py-10 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-brand-navy-700 rounded-2xl overflow-hidden">
          {stats.map(({ value, label, icon: Icon }, i) => (
            <div
              key={label}
              className={`bg-brand-navy-900 flex flex-col sm:flex-row items-center sm:items-start gap-3 px-6 py-6 sm:py-7 ${i === 0 ? 'rounded-tl-2xl rounded-bl-2xl' : ''} ${i === stats.length - 1 ? 'rounded-tr-2xl rounded-br-2xl' : ''}`}
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-brand-orange-500/15 flex items-center justify-center shrink-0">
                <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-brand-orange-400" />
              </div>
              <div className="text-center sm:text-left">
                <div className="text-2xl sm:text-3xl font-extrabold text-white leading-none">{value}</div>
                <div className="text-xs sm:text-sm text-brand-navy-300 mt-1 font-medium">{label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
