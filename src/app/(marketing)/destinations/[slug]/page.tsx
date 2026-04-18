// src/app/(marketing)/destinations/[slug]/page.tsx
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  MapPin, Clock, ArrowLeft, ArrowRight, Star, CheckCircle,
  Sun, DollarSign, Activity, ChevronRight
} from 'lucide-react'
import { destinations, getDestinationBySlug } from '@/lib/data/destinations'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const dest = getDestinationBySlug(slug)
  if (!dest) return { title: 'Not Found' }
  return {
    title: dest.name,
    description: dest.description,
  }
}

export function generateStaticParams() {
  return destinations.map((d) => ({ slug: d.slug }))
}

const difficultyColor: Record<string, string> = {
  easy: 'bg-green-100 text-green-700',
  moderate: 'bg-amber-100 text-amber-700',
  challenging: 'bg-red-100 text-red-700',
}

export default async function DestinationPage({ params }: Props) {
  const { slug } = await params
  const dest = getDestinationBySlug(slug)
  if (!dest) notFound()

  const others = destinations.filter((d) => d.slug !== slug).slice(0, 3)

  return (
    <>
      {/* Hero image */}
      <div className="relative h-[55vh] min-h-80 bg-brand-navy-900">
        <Image
          src={dest.image}
          alt={dest.imageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/30" />

        {/* Back button */}
        <div className="absolute top-24 left-0 right-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link
              href="/destinations"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white text-sm font-medium transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> All Destinations
            </Link>
          </div>
        </div>

        {/* Title overlay */}
        <div className="absolute bottom-0 left-0 right-0 pb-10 pt-20 bg-gradient-to-t from-black/80 to-transparent">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap gap-2 mb-3">
              {dest.categories.map((c) => (
                <span
                  key={c}
                  className="px-3 py-1 rounded-full bg-brand-orange-500 text-white text-xs font-semibold capitalize"
                >
                  {c}
                </span>
              ))}
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
              {dest.name}
            </h1>
            <p className="text-white/75 text-lg italic mt-1">{dest.tagline}</p>
          </div>
        </div>
      </div>

      {/* Quick facts bar */}
      <div className="bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap gap-6 text-sm">
            <span className="flex items-center gap-2 text-brand-navy-600">
              <MapPin className="w-4 h-4 text-brand-orange-400" />
              {dest.region}, {dest.province}
            </span>
            <span className="flex items-center gap-2 text-brand-navy-600">
              <Clock className="w-4 h-4 text-brand-orange-400" />
              Recommended {dest.duration}
            </span>
            <span className="flex items-center gap-2 text-brand-navy-600">
              <Sun className="w-4 h-4 text-brand-orange-400" />
              {dest.bestTime}
            </span>
            <span className="flex items-center gap-2 text-brand-navy-600">
              <DollarSign className="w-4 h-4 text-brand-orange-400" />
              {dest.priceRange} ·{' '}
              {{ '$': 'Budget', '$$': 'Mid-range', '$$$': 'Premium' }[dest.priceRange]}
            </span>
            <span
              className={`flex items-center gap-2 px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${difficultyColor[dest.difficulty]}`}
            >
              <Activity className="w-3.5 h-3.5" />
              {dest.difficulty}
            </span>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left — details */}
          <div className="lg:col-span-2 space-y-10">
            {/* About */}
            <section>
              <h2 className="text-2xl font-extrabold text-brand-navy-900 mb-4">
                About {dest.name}
              </h2>
              <p className="text-brand-navy-600 leading-relaxed text-base">{dest.description}</p>
            </section>

            {/* Highlights */}
            <section>
              <h2 className="text-2xl font-extrabold text-brand-navy-900 mb-4">
                Top Highlights
              </h2>
              <ul className="space-y-3">
                {dest.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-brand-orange-500 flex-shrink-0 mt-0.5" />
                    <span className="text-brand-navy-600">{h}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Tags */}
            <section>
              <h2 className="text-2xl font-extrabold text-brand-navy-900 mb-4">
                What to Expect
              </h2>
              <div className="flex flex-wrap gap-2">
                {dest.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-4 py-1.5 rounded-full border border-brand-orange-200 text-brand-orange-600 text-sm font-medium bg-brand-orange-50"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </section>
          </div>

          {/* Right — booking card */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 rounded-2xl border border-gray-200 bg-white shadow-lg p-6">
              {dest.featured && (
                <div className="flex items-center gap-1.5 text-brand-amber-600 text-sm font-semibold mb-4">
                  <Star className="w-4 h-4 fill-brand-amber-400 text-brand-amber-400" />
                  Featured Destination
                </div>
              )}

              <h3 className="text-xl font-extrabold text-brand-navy-900 mb-1">
                Plan Your Visit
              </h3>
              <p className="text-brand-navy-500 text-sm mb-6">
                Connect with vetted local guides and operators for {dest.name}.
              </p>

              <div className="space-y-3 mb-6 text-sm text-brand-navy-600">
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span>Best time</span>
                  <span className="font-medium text-brand-navy-900 text-right max-w-[60%]">
                    {dest.bestTime.split('·')[0].trim()}
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span>Duration</span>
                  <span className="font-medium text-brand-navy-900">{dest.duration}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span>Difficulty</span>
                  <span className={`font-medium capitalize px-2 py-0.5 rounded-full text-xs ${difficultyColor[dest.difficulty]}`}>
                    {dest.difficulty}
                  </span>
                </div>
                <div className="flex justify-between py-2">
                  <span>Price range</span>
                  <span className="font-medium text-brand-navy-900">{dest.priceRange}</span>
                </div>
              </div>

              <Link
                href={`/plan?destination=${dest.slug}`}
                className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-brand-orange-500 text-white font-bold hover:bg-brand-orange-600 transition-colors duration-200"
              >
                Start Planning <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href={`/marketplace?destination=${dest.slug}`}
                className="w-full mt-3 flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-gray-200 text-brand-navy-700 font-semibold hover:bg-gray-50 transition-colors duration-200 text-sm"
              >
                Browse Local Providers
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* More destinations */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-extrabold text-brand-navy-900">More Destinations</h2>
            <Link
              href="/destinations"
              className="flex items-center gap-1 text-brand-orange-500 font-semibold text-sm hover:gap-2 transition-all"
            >
              View all <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {others.map((d) => (
              <Link
                key={d.slug}
                href={`/destinations/${d.slug}`}
                className="group rounded-xl overflow-hidden bg-white border border-gray-100 hover:shadow-md transition-all duration-200"
              >
                <div className="relative aspect-[16/9] overflow-hidden bg-gray-100">
                  <Image
                    src={d.image}
                    alt={d.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-brand-navy-900">{d.name}</h3>
                  <p className="text-brand-navy-400 text-xs mt-0.5 flex items-center gap-1">
                    <MapPin className="w-3 h-3" /> {d.province}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
