import type { Metadata } from 'next'
import { CartProvider } from '@/components/store/cart-context'
import { SiteHeader } from '@/components/store/layout/site-header'
import { PolicyPage } from '@/components/store/policy-page'

export const metadata: Metadata = {
  title: "Refund & Replacement Policy | Abhay's Roof Garden",
  description: 'How to request help for a plant that arrives damaged or unhealthy, including replacement and refund steps.',
}

export default function RefundPolicyPage() {
  return (
    <CartProvider>
      <SiteHeader />
      <PolicyPage
        title="Refund & Replacement Policy"
        description="Our 7-Day Healthy Plant Guarantee and the steps to request help with a directly confirmed nursery order."
        notice="The website checkout is a demo and does not take payment or create a live order. This policy applies to purchases that the nursery has separately confirmed directly with you."
        sections={[
          {
            title: '1. Our 7-Day Healthy Plant Guarantee',
            paragraphs: [
              'If a plant from a directly confirmed order arrives damaged, diseased, or in poor health, contact us within 7 days of delivery. A few drooping or shifted leaves after transit can be normal; unpack the plant promptly and follow its care card while it settles.',
              'Send your order details and clear photos of the plant and packaging by WhatsApp to +91 94764 33880, or email abhaysroofgarden@gmail.com. Please keep the packaging until we have reviewed the issue, as it can help us understand what happened in transit.',
            ],
          },
          {
            title: '2. Review and available remedies',
            paragraphs: [
              'Our nursery team will review the information and contact you if we need anything else. After review, we will arrange an appropriate remedy—typically a replacement plant or a refund. We aim to confirm the resolution within 48 hours after review, as described in our plant guarantee.',
              'The remedy depends on the issue, plant availability, and delivery location. We will confirm the agreed remedy and any practical next steps with you before arranging it. This policy does not limit rights that apply under consumer-protection law.',
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
              'Clear photos of the plant and its packaging, with a short description of the issue.',
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
