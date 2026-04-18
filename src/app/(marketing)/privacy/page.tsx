// src/app/(marketing)/privacy/page.tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import { CONTACT } from '@/lib/constants/contact'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: "How Let's Tour Zimbabwe collects, uses, and protects your personal information.",
}

const EFFECTIVE_DATE = '1 January 2026'
const COMPANY = "Let's Tour Zimbabwe"

export default function PrivacyPage() {
  return (
    <main className="pt-16 lg:pt-20 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">

        {/* Header */}
        <div className="mb-10 pb-8 border-b border-gray-100">
          <p className="text-brand-orange-500 font-semibold text-xs uppercase tracking-wider mb-3">Legal</p>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-navy-900 mb-3">Privacy Policy</h1>
          <p className="text-brand-navy-400 text-sm">
            Effective date: <span className="font-semibold text-brand-navy-600">{EFFECTIVE_DATE}</span>
          </p>
          <p className="text-brand-navy-500 text-sm mt-3 leading-relaxed">
            Your privacy matters to us. This policy explains what personal information we collect,
            why we collect it, how we use it, and your rights regarding it.
          </p>
        </div>

        <div className="space-y-10 text-brand-navy-700">

          {/* 1 */}
          <section>
            <h2 className="text-lg sm:text-xl font-extrabold text-brand-navy-900 mb-3">1. Who We Are</h2>
            <p className="text-sm leading-relaxed">
              {COMPANY} is the data controller for personal information collected through this
              website and our booking processes. We are based in {CONTACT.address}. You can reach
              our team at{' '}
              <a href={CONTACT.emailHref} className="text-brand-orange-500 hover:underline">{CONTACT.email}</a>
              {' '}or{' '}
              <a href={CONTACT.phonePrimaryHref} className="text-brand-orange-500 hover:underline">{CONTACT.phonePrimaryIntl}</a>.
            </p>
          </section>

          {/* 2 */}
          <section>
            <h2 className="text-lg sm:text-xl font-extrabold text-brand-navy-900 mb-3">2. Information We Collect</h2>
            <div className="space-y-4">
              {[
                {
                  title: 'Information you give us directly',
                  items: [
                    'Name and contact details (email address, phone number)',
                    'Booking details (tour choice, travel dates, group size)',
                    'Payment information (processed securely — we do not store card numbers)',
                    'Special requirements you share with us (dietary, medical, accessibility)',
                    'Messages and enquiries you send us',
                  ],
                },
                {
                  title: 'Information collected automatically',
                  items: [
                    'IP address and browser type',
                    'Pages visited and time spent on the site',
                    'Referring website (how you found us)',
                    'Device type (mobile, desktop)',
                  ],
                },
                {
                  title: 'Information from third parties',
                  items: [
                    'Payment processors (confirmation of payment status only)',
                    'Social media platforms (if you interact with our social accounts)',
                  ],
                },
              ].map(({ title, items }) => (
                <div key={title}>
                  <p className="text-sm font-semibold text-brand-navy-800 mb-2">{title}</p>
                  <ul className="space-y-1.5">
                    {items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm leading-relaxed">
                        <span className="text-brand-orange-400 shrink-0 mt-0.5">·</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* 3 */}
          <section>
            <h2 className="text-lg sm:text-xl font-extrabold text-brand-navy-900 mb-3">3. How We Use Your Information</h2>
            <ul className="space-y-2">
              {[
                ['Process your booking and send confirmation details', 'Contract performance'],
                ['Send you pre-tour information and reminders', 'Contract performance'],
                ['Respond to your enquiries', 'Legitimate interest'],
                ['Process payments and issue invoices', 'Contract performance / Legal obligation'],
                ['Send tour-related updates or changes', 'Contract performance'],
                ['Improve our website and services', 'Legitimate interest'],
                ['Send marketing communications (only with your consent)', 'Consent'],
                ['Comply with legal and regulatory obligations', 'Legal obligation'],
              ].map(([purpose, lawfulBasis]) => (
                <li key={purpose} className="flex items-start gap-3 text-sm">
                  <span className="text-brand-orange-400 shrink-0 mt-0.5">✓</span>
                  <span className="flex-1 leading-relaxed">{purpose}</span>
                  <span className="text-xs text-brand-navy-400 bg-gray-100 px-2 py-0.5 rounded-full shrink-0 self-start mt-0.5 hidden sm:inline">
                    {lawfulBasis}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          {/* 4 */}
          <section>
            <h2 className="text-lg sm:text-xl font-extrabold text-brand-navy-900 mb-3">4. Who We Share Your Information With</h2>
            <p className="text-sm leading-relaxed mb-3">
              We do not sell your personal data. We share it only as necessary to deliver your
              tour:
            </p>
            <ul className="space-y-2 text-sm">
              {[
                'Tour guides and local service providers involved in your booking (name, contact, special requirements)',
                'Payment processors (Stripe, EcoCash, OneMoney) to securely process transactions',
                'Accommodation providers for the purpose of reserving your room',
                'Legal or regulatory authorities where required by Zimbabwean law',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 leading-relaxed">
                  <span className="text-brand-navy-400 shrink-0 mt-0.5">—</span>
                  {item}
                </li>
              ))}
            </ul>
          </section>

          {/* 5 */}
          <section>
            <h2 className="text-lg sm:text-xl font-extrabold text-brand-navy-900 mb-3">5. How Long We Keep Your Data</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-brand-navy-900 text-white">
                    <th className="text-left px-4 py-2.5 rounded-tl-xl font-semibold">Data type</th>
                    <th className="text-left px-4 py-2.5 rounded-tr-xl font-semibold">Retention period</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Booking records', '7 years (tax and legal compliance)'],
                    ['Payment records', '7 years (financial regulations)'],
                    ['Marketing preferences', 'Until you withdraw consent'],
                    ['Enquiries / messages', '2 years'],
                    ['Website analytics', '26 months'],
                  ].map(([type, period], i) => (
                    <tr key={type} className={i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      <td className="px-4 py-2.5 text-brand-navy-700">{type}</td>
                      <td className="px-4 py-2.5 text-brand-navy-600">{period}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* 6 */}
          <section>
            <h2 className="text-lg sm:text-xl font-extrabold text-brand-navy-900 mb-3">6. Cookies</h2>
            <p className="text-sm leading-relaxed">
              We use essential cookies to keep the website working (session management,
              security) and analytics cookies to understand how visitors use the site. We do not
              use advertising or tracking cookies from third-party ad networks. You can disable
              non-essential cookies in your browser settings at any time.
            </p>
          </section>

          {/* 7 */}
          <section>
            <h2 className="text-lg sm:text-xl font-extrabold text-brand-navy-900 mb-3">7. Your Rights</h2>
            <p className="text-sm leading-relaxed mb-3">You have the right to:</p>
            <ul className="space-y-2">
              {[
                ['Access', 'Request a copy of the personal data we hold about you'],
                ['Correction', 'Ask us to correct inaccurate or incomplete data'],
                ['Erasure', 'Ask us to delete your data where we no longer have a lawful basis to hold it'],
                ['Restriction', 'Ask us to limit how we use your data while a concern is resolved'],
                ['Portability', 'Receive your data in a structured, commonly used format'],
                ['Withdraw consent', 'Opt out of marketing communications at any time'],
              ].map(([right, description]) => (
                <li key={right} className="flex items-start gap-3 text-sm">
                  <span className="font-bold text-brand-navy-900 w-28 shrink-0">{right}</span>
                  <span className="leading-relaxed text-brand-navy-600">{description}</span>
                </li>
              ))}
            </ul>
            <p className="text-sm leading-relaxed mt-4">
              To exercise any of these rights, contact us at{' '}
              <a href={CONTACT.emailHref} className="text-brand-orange-500 hover:underline">{CONTACT.email}</a>.
              We will respond within 30 days.
            </p>
          </section>

          {/* 8 */}
          <section>
            <h2 className="text-lg sm:text-xl font-extrabold text-brand-navy-900 mb-3">8. Data Security</h2>
            <p className="text-sm leading-relaxed">
              We use industry-standard security measures including HTTPS encryption, secure
              payment gateways, and access controls to protect your data. While no online
              system is completely secure, we take every reasonable precaution to safeguard your
              information.
            </p>
          </section>

          {/* 9 */}
          <section>
            <h2 className="text-lg sm:text-xl font-extrabold text-brand-navy-900 mb-3">9. Children&apos;s Privacy</h2>
            <p className="text-sm leading-relaxed">
              Our platform is not directed to children under 13. We do not knowingly collect
              personal data from children under 13 without parental consent. If you believe a
              child has provided us with personal information, please contact us and we will
              delete it promptly.
            </p>
          </section>

          {/* 10 */}
          <section>
            <h2 className="text-lg sm:text-xl font-extrabold text-brand-navy-900 mb-3">10. Changes to This Policy</h2>
            <p className="text-sm leading-relaxed">
              We may update this policy periodically. When we make material changes, we will
              update the effective date at the top of this page. Continued use of the site after
              changes are posted means you accept the updated policy.
            </p>
          </section>

          {/* Contact box */}
          <section className="bg-brand-navy-900 rounded-2xl p-5 sm:p-6">
            <h2 className="text-base font-bold text-white mb-2">Privacy Enquiries</h2>
            <p className="text-brand-navy-300 text-sm leading-relaxed mb-3">
              For any privacy-related questions or to exercise your rights, contact us directly.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 text-sm">
              <a href={CONTACT.emailHref} className="text-brand-orange-400 hover:text-brand-orange-300 transition-colors">{CONTACT.email}</a>
              <span className="hidden sm:inline text-brand-navy-600">·</span>
              <a href={CONTACT.phonePrimaryHref} className="text-brand-orange-400 hover:text-brand-orange-300 transition-colors">{CONTACT.phonePrimaryIntl}</a>
              <span className="hidden sm:inline text-brand-navy-600">·</span>
              <a href={CONTACT.phoneSecondaryHref} className="text-brand-orange-400 hover:text-brand-orange-300 transition-colors">{CONTACT.phoneSecondaryIntl}</a>
            </div>
          </section>

        </div>

        <div className="mt-10 pt-8 border-t border-gray-100 flex flex-wrap gap-4 text-sm text-brand-navy-400">
          <Link href="/terms" className="hover:text-brand-orange-500 transition-colors">Terms of Service →</Link>
          <Link href="/" className="hover:text-brand-orange-500 transition-colors">Back to Home</Link>
        </div>

      </div>
    </main>
  )
}
