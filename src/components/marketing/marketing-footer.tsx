// src/components/marketing/marketing-footer.tsx
import Link from 'next/link'
import Image from 'next/image'
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from 'lucide-react'

const footerLinks = {
  explore: [
    { label: 'Destinations', href: '/destinations' },
    { label: 'Experiences', href: '/experiences' },
    { label: 'Wildlife Safari', href: '/experiences/wildlife' },
    { label: 'Victoria Falls', href: '/destinations/victoria-falls' },
    { label: 'Great Zimbabwe', href: '/destinations/great-zimbabwe' },
  ],
  plan: [
    { label: 'Plan a Tour', href: '/plan' },
    { label: 'Group Tours', href: '/plan/group' },
    { label: 'School Trips', href: '/plan/school' },
    { label: 'Corporate Events', href: '/plan/corporate' },
    { label: 'Custom Itinerary', href: '/plan/custom' },
  ],
  providers: [
    { label: 'Become a Provider', href: '/providers/register' },
    { label: 'Tour Guides', href: '/marketplace?type=guide' },
    { label: 'Transport', href: '/marketplace?type=transport' },
    { label: 'Accommodation', href: '/marketplace?type=accommodation' },
    { label: 'Activities', href: '/marketplace?type=activities' },
  ],
  company: [
    { label: 'About Us', href: '/about' },
    { label: 'How It Works', href: '/#how-it-works' },
    { label: 'Blog', href: '/blog' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
  ],
}

const socials = [
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Twitter, href: '#', label: 'Twitter / X' },
  { icon: Youtube, href: '#', label: 'YouTube' },
]

export function MarketingFooter() {
  return (
    <footer className="bg-brand-navy-900 text-white">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 sm:gap-10 lg:gap-12">
          {/* Brand column — full width on mobile */}
          <div className="col-span-2 sm:col-span-2 md:col-span-3 lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-5">
              <Image
                src="/logo.jpeg"
                alt="Let's Tour Zimbabwe"
                width={44}
                height={44}
                className="rounded-full"
              />
              <span className="font-bold text-sm leading-tight">
                Let&apos;s Tour<br />Zimbabwe
              </span>
            </Link>
            <p className="text-brand-navy-300 text-sm leading-relaxed mb-5">
              Your gateway to Zimbabwe&apos;s wonders. Plan, book, and experience
              unforgettable tours with trusted local experts.
            </p>
            <div className="flex items-center gap-2.5">
              {socials.map(({ icon: Icon, href, label }) => (
                <Link
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-brand-navy-800 flex items-center justify-center text-brand-navy-300 hover:bg-brand-orange-500 hover:text-white transition-colors duration-200"
                >
                  <Icon className="w-4 h-4" />
                </Link>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-semibold text-xs uppercase tracking-wider text-brand-amber-400 mb-3 sm:mb-4">
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </h3>
              <ul className="space-y-2 sm:space-y-2.5">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-xs sm:text-sm text-brand-navy-300 hover:text-white transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact bar */}
        <div className="mt-10 sm:mt-12 pt-6 sm:pt-8 border-t border-brand-navy-800 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-8 text-xs sm:text-sm text-brand-navy-300">
          <span className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-brand-orange-400 shrink-0" />
            Harare, Zimbabwe
          </span>
          <a href="mailto:hello@letstourzimbabwe.com" className="flex items-center gap-2 hover:text-white transition-colors">
            <Mail className="w-4 h-4 text-brand-orange-400 shrink-0" />
            hello@letstourzimbabwe.com
          </a>
          <a href="tel:+2637712345678" className="flex items-center gap-2 hover:text-white transition-colors">
            <Phone className="w-4 h-4 text-brand-orange-400 shrink-0" />
            +263 77 123 4567
          </a>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-brand-navy-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5 flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-3 text-xs text-brand-navy-400">
          <span>© {new Date().getFullYear()} Let&apos;s Tour Zimbabwe. All rights reserved.</span>
          <span>Made with ❤️ in Zimbabwe</span>
        </div>
      </div>
    </footer>
  )
}
