// src/app/(marketing)/terms/page.tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import { CONTACT } from '@/lib/constants/contact'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: "Let's Tour Zimbabwe terms of service — please read before booking or using our platform.",
}

const EFFECTIVE_DATE = '1 January 2026'
const COMPANY = "Let's Tour Zimbabwe"

export default function TermsPage() {
  return (
    <main className="pt-16 lg:pt-20 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">

        {/* Header */}
        <div className="mb-10 pb-8 border-b border-gray-100">
          <p className="text-brand-orange-500 font-semibold text-xs uppercase tracking-wider mb-3">Legal</p>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-navy-900 mb-3">Terms of Service</h1>
          <p className="text-brand-navy-400 text-sm">
            Effective date: <span className="font-semibold text-brand-navy-600">{EFFECTIVE_DATE}</span>
          </p>
          <p className="text-brand-navy-500 text-sm mt-3 leading-relaxed">
            Please read these terms carefully before booking a tour or using our platform. By
            accessing {COMPANY} or making a booking, you agree to be bound by these terms.
          </p>
        </div>

        <div className="prose prose-sm sm:prose max-w-none text-brand-navy-700 space-y-10">

          {/* 1 */}
          <section>
            <h2 className="text-lg sm:text-xl font-extrabold text-brand-navy-900 mb-3">1. About Us</h2>
            <p className="leading-relaxed">
              {COMPANY} is a Zimbabwe-based tourism platform that organises and facilitates
              group tours and connects travellers with vetted local service providers. We operate
              both as a direct tour operator (group tours listed on our Events page) and as a
              marketplace that connects travellers with independent service providers.
            </p>
            <p className="leading-relaxed mt-3">
              Contact us at{' '}
              <a href={CONTACT.emailHref} className="text-brand-orange-500 hover:underline">{CONTACT.email}</a>
              {' '}or by phone on{' '}
              <a href={CONTACT.phonePrimaryHref} className="text-brand-orange-500 hover:underline">{CONTACT.phonePrimaryIntl}</a>
              {' '}or{' '}
              <a href={CONTACT.phoneSecondaryHref} className="text-brand-orange-500 hover:underline">{CONTACT.phoneSecondaryIntl}</a>.
            </p>
          </section>

          {/* 2 */}
          <section>
            <h2 className="text-lg sm:text-xl font-extrabold text-brand-navy-900 mb-3">2. Bookings & Deposits</h2>
            <ul className="space-y-2 list-none pl-0">
              {[
                'A booking is confirmed only when you have paid the required deposit (25% of the total tour price) and received written confirmation from us.',
                'Deposits are non-refundable unless the tour is cancelled by Let\'s Tour Zimbabwe.',
                'The remaining balance is due no later than 7 days before the departure date unless otherwise agreed in writing.',
                'Failure to pay the balance by the due date may result in cancellation of your booking and forfeiture of your deposit.',
                'Prices quoted are per person in United States Dollars (USD) unless otherwise stated.',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm leading-relaxed">
                  <span className="w-5 h-5 rounded-full bg-brand-orange-50 text-brand-orange-500 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                  {item}
                </li>
              ))}
            </ul>
          </section>

          {/* 3 */}
          <section>
            <h2 className="text-lg sm:text-xl font-extrabold text-brand-navy-900 mb-3">3. Cancellations & Refunds</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-brand-navy-900 text-white">
                    <th className="text-left px-4 py-2.5 rounded-tl-xl font-semibold">Notice given before departure</th>
                    <th className="text-left px-4 py-2.5 rounded-tr-xl font-semibold">Refund</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['More than 30 days', 'Full refund of balance paid (deposit retained)'],
                    ['15–30 days', '50% refund of balance paid (deposit retained)'],
                    ['7–14 days', '25% refund of balance paid (deposit retained)'],
                    ['Less than 7 days', 'No refund'],
                    ['No-show', 'No refund'],
                  ].map(([notice, refund], i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      <td className="px-4 py-2.5 text-brand-navy-700">{notice}</td>
                      <td className="px-4 py-2.5 text-brand-navy-600">{refund}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-sm leading-relaxed mt-3">
              Cancellations must be submitted in writing by email to{' '}
              <a href={CONTACT.emailHref} className="text-brand-orange-500 hover:underline">{CONTACT.email}</a>.
              The date of cancellation is the date on which we receive your written notice.
            </p>
            <p className="text-sm leading-relaxed mt-3">
              If {COMPANY} cancels a tour due to insufficient bookings, unsafe conditions, force
              majeure, or circumstances beyond our control, you will receive a full refund of all
              amounts paid, or the option to transfer to a future tour date.
            </p>
          </section>

          {/* 4 */}
          <section>
            <h2 className="text-lg sm:text-xl font-extrabold text-brand-navy-900 mb-3">4. What Is Included</h2>
            <p className="text-sm leading-relaxed mb-3">
              Unless otherwise stated on the specific tour listing, all {COMPANY} group tours include:
            </p>
            <ul className="space-y-1.5 text-sm">
              {[
                'Return transport from the designated meeting point',
                'Accommodation (where applicable — day tours excluded)',
                'All meals as listed in the tour itinerary',
                'Entry fees for all listed activities',
                'A tour group photograph',
                'A tour cap and t-shirt',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 leading-relaxed">
                  <span className="text-brand-orange-400 shrink-0 mt-0.5">✓</span>
                  {item}
                </li>
              ))}
            </ul>
            <p className="text-sm leading-relaxed mt-3">
              Items not included unless explicitly stated: travel insurance, personal spending
              money, optional add-on activities (e.g., house boat), alcoholic beverages beyond
              those specified, and costs arising from personal illness or injury.
            </p>
          </section>

          {/* 5 */}
          <section>
            <h2 className="text-lg sm:text-xl font-extrabold text-brand-navy-900 mb-3">5. Your Responsibilities</h2>
            <ul className="space-y-2 text-sm">
              {[
                'You must ensure you are in good health and physically capable of participating in the activities included in your chosen tour.',
                'You are responsible for obtaining any required travel documents, visas, and vaccinations.',
                'You must arrive at the designated meeting point at the time specified. Late arrivals may not be able to join the group.',
                'You agree to behave respectfully towards other group members, guides, local communities, and wildlife.',
                'Any damage caused by you to property or equipment will be charged to you directly.',
                'You must inform us of any medical conditions, dietary requirements, or accessibility needs at the time of booking.',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 leading-relaxed">
                  <span className="w-5 h-5 rounded-full bg-brand-orange-50 text-brand-orange-500 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                  {item}
                </li>
              ))}
            </ul>
          </section>

          {/* 6 */}
          <section>
            <h2 className="text-lg sm:text-xl font-extrabold text-brand-navy-900 mb-3">6. Travel Insurance</h2>
            <p className="text-sm leading-relaxed">
              We strongly recommend that all participants obtain comprehensive travel insurance
              before departure. This should cover medical expenses, emergency evacuation,
              trip cancellation, and loss of personal belongings. {COMPANY} accepts no
              liability for costs arising from the absence of adequate travel insurance.
            </p>
          </section>

          {/* 7 */}
          <section>
            <h2 className="text-lg sm:text-xl font-extrabold text-brand-navy-900 mb-3">7. Liability</h2>
            <p className="text-sm leading-relaxed">
              {COMPANY} takes all reasonable steps to ensure your safety and enjoyment.
              However, travel inherently involves risk. We are not liable for:
            </p>
            <ul className="space-y-1.5 text-sm mt-3">
              {[
                'Loss, injury, or damage arising from circumstances beyond our reasonable control (force majeure, weather, acts of government, etc.)',
                'Personal injury, illness, or death not caused by our negligence',
                'Loss or damage to personal belongings',
                'Any services provided by third-party operators or providers',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 leading-relaxed">
                  <span className="text-brand-navy-400 shrink-0 mt-0.5">—</span>
                  {item}
                </li>
              ))}
            </ul>
          </section>

          {/* 8 */}
          <section>
            <h2 className="text-lg sm:text-xl font-extrabold text-brand-navy-900 mb-3">8. Photography & Media</h2>
            <p className="text-sm leading-relaxed">
              By joining a {COMPANY} tour, you consent to being photographed or filmed for
              promotional use on our website and social media channels. If you do not wish to
              appear in promotional material, please notify us in writing before departure.
            </p>
          </section>

          {/* 9 */}
          <section>
            <h2 className="text-lg sm:text-xl font-extrabold text-brand-navy-900 mb-3">9. Changes to These Terms</h2>
            <p className="text-sm leading-relaxed">
              We may update these terms from time to time. The version published on this page
              at the time of your booking is the version that applies to you. Continued use of
              the platform after changes are posted constitutes acceptance of the updated terms.
            </p>
          </section>

          {/* 10 */}
          <section>
            <h2 className="text-lg sm:text-xl font-extrabold text-brand-navy-900 mb-3">10. Governing Law</h2>
            <p className="text-sm leading-relaxed">
              These terms are governed by and construed in accordance with the laws of Zimbabwe.
              Any disputes shall be subject to the exclusive jurisdiction of the courts of Zimbabwe.
            </p>
          </section>

          {/* Contact */}
          <section className="bg-brand-navy-900 rounded-2xl p-5 sm:p-6">
            <h2 className="text-base font-bold text-white mb-2">Questions?</h2>
            <p className="text-brand-navy-300 text-sm leading-relaxed mb-3">
              If you have any questions about these terms, please contact us before making a booking.
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
          <Link href="/privacy" className="hover:text-brand-orange-500 transition-colors">Privacy Policy →</Link>
          <Link href="/" className="hover:text-brand-orange-500 transition-colors">Back to Home</Link>
        </div>

      </div>
    </main>
  )
}
