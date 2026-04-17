'use client'
// src/components/marketing/marketing-nav.tsx
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils/cn'

const navLinks = [
  { label: 'Destinations', href: '/destinations' },
  { label: 'Experiences', href: '/experiences' },
  { label: 'Plan a Tour', href: '/plan' },
  { label: 'About', href: '/about' },
]

export function MarketingNav() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100'
          : 'bg-transparent'
      )}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 flex-shrink-0">
            <Image
              src="/logo.jpeg"
              alt="Let's Tour Zimbabwe"
              width={48}
              height={48}
              className="rounded-full"
              priority
            />
            <span
              className={cn(
                'font-bold text-lg hidden sm:block transition-colors duration-300',
                scrolled ? 'text-brand-navy-900' : 'text-white drop-shadow'
              )}
            >
              Let&apos;s Tour Zimbabwe
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'text-sm font-medium transition-colors duration-200 hover:text-brand-orange-500',
                  scrolled ? 'text-brand-navy-700' : 'text-white/90 drop-shadow'
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/sign-in"
              className={cn(
                'text-sm font-medium px-4 py-2 rounded-lg transition-colors duration-200',
                scrolled
                  ? 'text-brand-navy-700 hover:text-brand-orange-500'
                  : 'text-white/90 hover:text-white drop-shadow'
              )}
            >
              Sign In
            </Link>
            <Link
              href="/sign-up"
              className="text-sm font-semibold px-5 py-2.5 rounded-xl bg-brand-orange-500 text-white hover:bg-brand-orange-600 transition-colors duration-200 shadow-md"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={cn(
              'md:hidden p-2 rounded-lg transition-colors',
              scrolled ? 'text-brand-navy-700' : 'text-white'
            )}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 py-4 px-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block px-4 py-3 text-brand-navy-700 font-medium hover:text-brand-orange-500 hover:bg-brand-orange-50 rounded-lg transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-4 pt-4 border-t border-gray-100 flex flex-col gap-2 px-4">
              <Link
                href="/sign-in"
                onClick={() => setIsOpen(false)}
                className="text-center py-2.5 text-brand-navy-700 font-medium hover:text-brand-orange-500 transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/sign-up"
                onClick={() => setIsOpen(false)}
                className="text-center py-2.5 px-4 bg-brand-orange-500 text-white font-semibold rounded-xl hover:bg-brand-orange-600 transition-colors"
              >
                Get Started
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
