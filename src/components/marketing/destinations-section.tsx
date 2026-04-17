// src/components/marketing/destinations-section.tsx
import Link from 'next/link'
import { ArrowRight, MapPin } from 'lucide-react'

const destinations = [
  {
    name: 'Victoria Falls',
    tagline: 'The Smoke That Thunders',
    region: 'Matabeleland North',
    tags: ['UNESCO Heritage', 'Wildlife', 'Adventure'],
    gradient: 'from-blue-900/70 to-teal-800/60',
    emoji: '🌊',
  },
  {
    name: 'Hwange National Park',
    tagline: "Africa's Finest Safari",
    region: 'Matabeleland North',
    tags: ['Big Five', 'Safari', 'Photography'],
    gradient: 'from-amber-900/70 to-orange-800/60',
    emoji: '🐘',
  },
  {
    name: 'Great Zimbabwe Ruins',
    tagline: 'Ancient Kingdom of Stone',
    region: 'Masvingo Province',
    tags: ['History', 'Culture', 'Heritage'],
    gradient: 'from-stone-900/70 to-amber-900/60',
    emoji: '🏛️',
  },
  {
    name: 'Eastern Highlands',
    tagline: 'Mountains, Tea & Mist',
    region: 'Manicaland',
    tags: ['Hiking', 'Nature', 'Scenic'],
    gradient: 'from-green-900/70 to-emerald-800/60',
    emoji: '🏔️',
  },
  {
    name: 'Matobo Hills',
    tagline: 'Land of Ancient Spirits',
    region: 'Matabeleland South',
    tags: ['Rock Art', 'Rhino Tracking', 'Spiritual'],
    gradient: 'from-gray-900/70 to-stone-800/60',
    emoji: '🦏',
  },
  {
    name: 'Lake Kariba',
    tagline: 'The Inland Sea',
    region: 'Mashonaland West',
    tags: ['Fishing', 'Houseboat', 'Sunset'],
    gradient: 'from-blue-900/70 to-indigo-800/60',
    emoji: '⛵',
  },
]

export function DestinationsSection() {
  return (
    <section id="destinations" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-12">
          <div>
            <p className="text-brand-orange-500 font-semibold text-sm uppercase tracking-wider mb-2">
              Explore Zimbabwe
            </p>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-brand-navy-900 leading-tight">
              Iconic Destinations
            </h2>
            <p className="mt-3 text-brand-navy-500 text-lg max-w-xl">
              From thundering waterfalls to ancient stone cities — every corner of Zimbabwe tells a story.
            </p>
          </div>
          <Link
            href="/destinations"
            className="flex items-center gap-2 text-brand-orange-500 font-semibold hover:gap-3 transition-all duration-200 flex-shrink-0"
          >
            View all destinations <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((dest) => (
            <Link
              key={dest.name}
              href={`/destinations/${dest.name.toLowerCase().replace(/\s+/g, '-')}`}
              className="group relative rounded-2xl overflow-hidden aspect-[4/3] cursor-pointer"
            >
              {/* Placeholder background with gradient */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${dest.gradient}`}
                style={{
                  background: `linear-gradient(135deg, #0f2419 0%, #2d6a4f 40%, #74b49e 70%, #e8781a 100%)`,
                }}
              />
              {/* Emoji as visual placeholder */}
              <div className="absolute inset-0 flex items-center justify-center text-8xl opacity-30 group-hover:opacity-40 transition-opacity duration-300">
                {dest.emoji}
              </div>
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:from-black/70 transition-all duration-300" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-white font-bold text-xl leading-tight">{dest.name}</h3>
                    <p className="text-white/75 text-sm mt-0.5 italic">{dest.tagline}</p>
                    <span className="inline-flex items-center gap-1 text-white/60 text-xs mt-2">
                      <MapPin className="w-3 h-3" />
                      {dest.region}
                    </span>
                  </div>
                  <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
                    <ArrowRight className="w-4 h-4 text-white" />
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {dest.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded-full bg-white/15 backdrop-blur-sm text-white/90 text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
