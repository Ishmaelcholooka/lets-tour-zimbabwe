// src/app/(marketing)/destinations/page.tsx
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { MapPin, Clock, Star, ArrowRight, TreePine, Landmark, Waves, Mountain, Binoculars } from 'lucide-react'
import { destinations, type DestinationCategory } from '@/lib/data/destinations'

export const metadata: Metadata = {
  title: 'Destinations',
  description:
    "Explore Zimbabwe's most iconic destinations — from Victoria Falls to the Great Zimbabwe Ruins, Hwange's elephants to the misty Eastern Highlands.",
}

const categories: { value: DestinationCategory | 'all'; label: string; icon: React.ElementType }[] = [
  { value: 'all', label: 'All', icon: MapPin },
  { value: 'wildlife', label: 'Wildlife', icon: Binoculars },
  { value: 'heritage', label: 'Heritage', icon: Landmark },
  { value: 'adventure', label: 'Adventure', icon: Mountain },
  { value: 'nature', label: 'Nature', icon: TreePine },
  { value: 'water', label: 'Water', icon: Waves },
]

const priceLabels: Record<string, string> = {
  '$': 'Budget-friendly',
  '$$': 'Mid-range',
  '$$$': 'Premium',
}

const difficultyColor: Record<string, string> = {
  easy: 'bg-green-100 text-green-700',
  moderate: 'bg-amber-100 text-amber-700',
  challenging: 'bg-red-100 text-red-700',
}

export default function DestinationsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>
}) {
  return <DestinationsContent searchParamsPromise={searchParams} />
}

async function DestinationsContent({
  searchParamsPromise,
}: {
  searchParamsPromise: Promise<{ category?: string }>
}) {
  const { category = 'all' } = await searchParamsPromise

  const filtered =
    category === 'all'
      ? destinations
      : destinations.filter((d) =>
          d.categories.includes(category as DestinationCategory)
        )

  return (
    <>
      {/* Hero */}
      <section className="relative pt-24 sm:pt-28 md:pt-32 pb-10 sm:pb-14 lg:pb-16 bg-brand-navy-900 overflow-hidden">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              'radial-gradient(ellipse 60% 80% at 70% 50%, #e8781a 0%, transparent 70%)',
          }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-brand-amber-400 font-semibold text-xs sm:text-sm uppercase tracking-wider mb-2 sm:mb-3">
            Explore Zimbabwe
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-3 sm:mb-4">
            Destinations
          </h1>
          <p className="text-brand-navy-300 text-sm sm:text-base lg:text-lg max-w-2xl">
            From thundering waterfalls to ancient stone kingdoms — {destinations.length} remarkable
            destinations waiting to be discovered.
          </p>
        </div>
      </section>

      {/* Filter tabs */}
      <section className="sticky top-16 lg:top-20 z-40 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-1 overflow-x-auto py-3 scrollbar-hide">
            {categories.map(({ value, label, icon: Icon }) => {
              const isActive = category === value
              return (
                <Link
                  key={value}
                  href={value === 'all' ? '/destinations' : `/destinations?category=${value}`}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-colors duration-200 shrink-0 ${
                    isActive
                      ? 'bg-brand-orange-500 text-white'
                      : 'text-brand-navy-600 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {label}
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Results count */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-2">
        <p className="text-brand-navy-500 text-sm">
          Showing <span className="font-semibold text-brand-navy-900">{filtered.length}</span>{' '}
          destination{filtered.length !== 1 ? 's' : ''}
          {category !== 'all' && (
            <>
              {' '}in{' '}
              <span className="font-semibold text-brand-orange-500 capitalize">{category}</span>
            </>
          )}
        </p>
      </section>

      {/* Destinations grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-20">
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-brand-navy-400">
            No destinations found for this category.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((dest) => (
              <Link
                key={dest.slug}
                href={`/destinations/${dest.slug}`}
                className="group rounded-2xl overflow-hidden border border-gray-100 bg-white hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col"
              >
                {/* Image */}
                <div className="relative aspect-16/10 overflow-hidden bg-gray-100">
                  <Image
                    src={dest.image}
                    alt={dest.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Featured badge */}
                  {dest.featured && (
                    <div className="absolute top-3 left-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-brand-amber-400 text-white text-xs font-bold">
                      <Star className="w-3 h-3 fill-white" />
                      Featured
                    </div>
                  )}
                  {/* Price */}
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-sm text-white text-xs font-semibold">
                    {dest.priceRange} · {priceLabels[dest.priceRange]}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h2 className="text-xl font-extrabold text-brand-navy-900 leading-tight">
                      {dest.name}
                    </h2>
                    <span
                      className={`shrink-0 text-xs font-medium px-2 py-0.5 rounded-full capitalize ${difficultyColor[dest.difficulty]}`}
                    >
                      {dest.difficulty}
                    </span>
                  </div>

                  <p className="text-brand-orange-500 text-sm font-medium italic mb-2">
                    {dest.tagline}
                  </p>

                  <div className="flex items-center gap-1 text-brand-navy-400 text-xs mb-3">
                    <MapPin className="w-3 h-3 shrink-0" />
                    {dest.region} · {dest.province}
                  </div>

                  <p className="text-brand-navy-600 text-sm leading-relaxed line-clamp-3 mb-4 flex-1">
                    {dest.description}
                  </p>

                  {/* Highlights preview */}
                  <ul className="space-y-1 mb-4">
                    {dest.highlights.slice(0, 2).map((h) => (
                      <li key={h} className="flex items-start gap-2 text-xs text-brand-navy-500">
                        <span className="w-1 h-1 rounded-full bg-brand-orange-400 mt-1.5 shrink-0" />
                        {h}
                      </li>
                    ))}
                  </ul>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {dest.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded-full bg-gray-100 text-brand-navy-600 text-xs font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Footer row */}
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <span className="flex items-center gap-1 text-brand-navy-400 text-xs">
                      <Clock className="w-3 h-3" />
                      {dest.duration}
                    </span>
                    <span className="flex items-center gap-1 text-brand-orange-500 text-sm font-semibold group-hover:gap-2 transition-all duration-200">
                      Explore <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* CTA strip */}
      <section className="bg-brand-orange-500 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl font-extrabold text-white">
              Can&apos;t decide? Let us help.
            </h2>
            <p className="text-white/80 mt-1">
              Tell us your budget, dates, and interests — we&apos;ll build the perfect Zimbabwe itinerary.
            </p>
          </div>
          <Link
            href="/plan"
            className="shrink-0 inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-white text-brand-orange-600 font-bold hover:bg-brand-amber-50 transition-colors duration-200"
          >
            Build My Itinerary <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  )
}
