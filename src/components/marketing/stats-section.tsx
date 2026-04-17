// src/components/marketing/stats-section.tsx
const stats = [
  { value: '500+', label: 'Verified Providers' },
  { value: '50+', label: 'Destinations' },
  { value: '10K+', label: 'Happy Travellers' },
  { value: '4.9★', label: 'Average Rating' },
]

export function StatsSection() {
  return (
    <section className="bg-brand-orange-500 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map(({ value, label }) => (
            <div key={label} className="text-center">
              <div className="text-3xl lg:text-4xl font-extrabold text-white">{value}</div>
              <div className="text-sm text-white/80 mt-1 font-medium">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
