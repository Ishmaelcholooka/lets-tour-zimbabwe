// src/app/layout.tsx
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'

const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
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
      <body className={`${poppins.variable} antialiased`}>
        {children}
      </body>
    </html>
  )
}
