// src/app/layout.tsx
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: {
    default: "Let's Tour Zimbabwe",
    template: "%s | Let's Tour Zimbabwe",
  },
  description:
    "Discover Zimbabwe's breathtaking landscapes, wildlife, and culture. Plan and book unforgettable tours with vetted local guides, transport, and accommodation.",
  keywords: ['Zimbabwe', 'tourism', 'safari', 'Victoria Falls', 'Hwange', 'tour', 'travel'],
  openGraph: {
    title: "Let's Tour Zimbabwe",
    description: "Discover Zimbabwe's breathtaking landscapes, wildlife, and culture.",
    type: 'website',
    locale: 'en_ZW',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  )
}
