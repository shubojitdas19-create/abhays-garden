import type { Metadata } from 'next'
import { CartProvider } from '@/components/store/cart-context'
import { SiteHeader } from '@/components/store/layout/site-header'
import { PolicyPage } from '@/components/store/policy-page'

export const metadata: Metadata = {
  title: "Refund & Replacement Policy | Abhay's Roof Garden",
  description: 'How to submit a 7-day claim for a wrong or transit-damaged plant, including the required complete 360° unboxing video.'
}

export default function RefundPolicyPage() {
  return (
    <CartProvider>
      <SiteHeader />
      <PolicyPage
        title="Refund & Replacement Policy"
        description="Eligibility, the required 360° unboxing video, and the steps for a 7-day wrong or transit-damage claim on a directly confirmed nursery order."
        notice="The website checkout is a demo and does not take payment or create a live order. This policy applies to purchases that the nursery has separately confirmed directly with you."
        sections={[
          {
            title: '1. 7-Day Wrong or Damaged Plant Claim Window',
            paragraphs: [
              'For a directly confirmed order, the 7-day claim window applies only when the delivered plant is incorrect or has been physically damaged in transit. Contact us within 7 days of delivery; routine settling, care concerns, change of mind, or other plant-health issues are not covered by this guarantee.',
              'A complete 360° unboxing video is required for every refund or replacement claim. Record one continuous video beginning with the unopened parcel and showing the parcel and plant from all sides as you unpack. Send the video, your order reference, delivery date, and clear photos by WhatsApp to +91 94764 33880 or email abhaysroofgarden@gmail.com. Keep the packaging until our team finishes its review.',
            ],
          },
          {
            title: '2. Review and available remedies',
            paragraphs: [
              'Our nursery team will review the order details and complete 360° unboxing video and may contact you for more information. A refund or replacement is not automatic; if the wrong-item or transit-damage claim is approved, we will confirm the available remedy and next steps with you.',
              'Any remedy depends on the review, plant availability, and delivery location. This guarantee does not limit rights that apply under consumer-protection law.'
            ],
          },
          {
            title: '3. Refund method and timing',
            paragraphs: [
              'The current demo checkout does not collect money, so no refund can be issued for a demo order. For a real order arranged directly with the nursery, we will confirm the refund amount and method with you after approving the request. Any time taken by a bank or payment provider to post an approved refund is outside our control.',
              'We will not ask for your card PIN, password, or one-time passcode to arrange a refund. For a cash-on-delivery order, contact us so we can agree on a safe and practical refund method.',
            ],
          },
          {
            title: '4. Cancellations and other returns',
            paragraphs: [
              'If you need to change or cancel an actual order, contact us as soon as possible and before dispatch. We will confirm whether the request can be accommodated based on the order’s status. A demo order is saved only in your browser and is not a live order to cancel.',
              'Because plants are living and perishable products, change-of-mind returns are not part of this plant-health guarantee. Please contact us before sending any item back; do not return a plant without our instructions. Nothing in this section overrides a right that cannot lawfully be excluded.',
            ],
          },
          {
            title: '5. What to include in a request',
            paragraphs: ['To help us resolve an issue quickly, please include:'],
            bullets: [
              'Your name and the order reference supplied by the nursery.',
              'The date the package was delivered and the affected plant name.',
              'A complete 360° unboxing video from the unopened parcel through removal of the plant, plus clear photos of the damage or incorrect item.'
            ],
          },
          {
            title: '6. Contact',
            paragraphs: [
              'WhatsApp or call +91 94764 33880, or email abhaysroofgarden@gmail.com. Nursery address: Chuanpore, Sukantapally, Berhampore, Murshidabad, West Bengal 742407, India.',
            ],
          },
        ]}
      />
    </CartProvider>
  )
}
