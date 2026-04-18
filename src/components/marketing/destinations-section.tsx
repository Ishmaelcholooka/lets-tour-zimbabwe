// src/components/marketing/destinations-section.tsx
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, MapPin } from 'lucide-react'

const destinations = [
  {
    name: 'Victoria Falls',
    slug: 'victoria-falls',
    tagline: 'The Smoke That Thunders',
    region: 'Matabeleland North',
    tags: ['UNESCO Heritage', 'Wildlife', 'Adventure'],
    image: '/vicfalls.jpg',
    fromPriceUsd: 85,
  },
  {
    name: 'Hwange National Park',
    slug: 'hwange-national-park',
    tagline: "Africa's Finest Safari",
    region: 'Matabeleland North',
    tags: ['Big Five', 'Safari', 'Photography'],
    image: '/hwange%20national%20park.jpg',
    fromPriceUsd: 65,
  },
  {
    name: 'Great Zimbabwe Ruins',
    slug: 'great-zimbabwe',
    tagline: 'Ancient Kingdom of Stone',
    region: 'Masvingo Province',
    tags: ['History', 'Culture', 'Heritage'],
    image: '/great%20zimbabwe.jpg',
    fromPriceUsd: 15,
  },
  {
    name: 'Eastern Highlands',
    slug: 'eastern-highlands',
    tagline: 'Mountains, Tea & Mist',
    region: 'Manicaland',
    tags: ['Hiking', 'Nature', 'Scenic'],
    image: '/eastern%20highlands.jpg',
    fromPriceUsd: 30,
  },
  {
    name: 'Matobo Hills',
    slug: 'matobo-hills',
    tagline: 'Land of Ancient Spirits',
    region: 'Matabeleland South',
    tags: ['Rock Art', 'Rhino Tracking', 'Spiritual'],
    image: '/matobo.jpg',
    fromPriceUsd: 35,
  },
  {
    name: 'Lake Kariba',
    slug: 'lake-kariba',
    tagline: 'The Inland Sea',
    region: 'Mashonaland West',
    tags: ['Fishing', 'Houseboat', 'Sunset'],
    image: '/kariba.jpg',
    fromPriceUsd: 45,
  },
]

export function DestinationsSection() {
  return (
    <section id="destinations" className="py-14 sm:py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-3 sm:gap-4 mb-8 sm:mb-12">
          <div>
            <p className="text-brand-orange-500 font-semibold text-xs sm:text-sm uppercase tracking-wider mb-2">
              Explore Zimbabwe
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-navy-900 leading-tight">
              Iconic Destinations
            </h2>
            <p className="mt-2 sm:mt-3 text-brand-navy-500 text-sm sm:text-base lg:text-lg max-w-xl">
              From thundering waterfalls to ancient stone cities — every corner of Zimbabwe tells a story.
            </p>
          </div>
          <Link
            href="/destinations"
            className="flex items-center gap-2 text-brand-orange-500 font-semibold hover:gap-3 transition-all duration-200 shrink-0 text-sm sm:text-base"
          >
            View all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {destinations.map((dest) => (
            <Link
              key={dest.slug}
              href={`/destinations/${dest.slug}`}
              className="group relative rounded-2xl overflow-hidden aspect-4/3 cursor-pointer"
            >
              <Image
                src={dest.image}
                alt={dest.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent group-hover:from-black/70 transition-all duration-300" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-white font-bold text-lg sm:text-xl leading-tight">{dest.name}</h3>
                    <p className="text-white/75 text-xs sm:text-sm mt-0.5 italic">{dest.tagline}</p>
                    <span className="inline-flex items-center gap-1 text-white/60 text-xs mt-1.5 sm:mt-2">
                      <MapPin className="w-3 h-3" />
                      {dest.region}
                    </span>
                  </div>
                  <div className="flex flex-col items-end gap-1.5 shrink-0">
                    <span className="text-xs font-semibold text-white/90 bg-black/30 backdrop-blur-sm px-2 py-0.5 rounded-full">
                      from ${dest.fromPriceUsd}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
                      <ArrowRight className="w-3.5 h-3.5 text-white" />
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1 sm:gap-1.5 mt-2 sm:mt-3">
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
