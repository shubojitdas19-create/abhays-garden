import type { Metadata } from 'next'
import { CartProvider } from '@/components/store/cart-context'
import { SiteHeader } from '@/components/store/layout/site-header'
import { PolicyPage } from '@/components/store/policy-page'

export const metadata: Metadata = {
  title: "Refund & Replacement Policy | Abhay's Roof Garden",
  description: 'How to submit a 7-day wrong-plant or transit-damage claim with the mandatory continuous, unedited 360° unboxing video and replacement or refund remedy.'
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
              'For a directly confirmed order, claims apply strictly to plants that arrive damaged in transit or if the wrong plant is delivered. Contact us within 7 days of delivery; routine settling, care concerns, change of mind, or other plant-health issues are not covered by this guarantee.',
              'A continuous, unedited 360° unboxing video starting before opening the package seal or tape is strictly mandatory to claim a replacement or refund. Record the shipping label and package opening, then send the video and your order ID to WhatsApp support at +91 94764 33880 within 7 days of delivery. Keep the packaging until the claim is resolved.',
            ],
          },
          {
            title: '2. Replacement and refund remedies',
            paragraphs: [
              'For an eligible wrong-item or transit-damage claim with the required video and order ID received within 7 days, we dispatch a free healthy replacement within 24–48 hours or issue a full refund.',
              'This claim remedy applies to directly confirmed nursery orders and does not limit rights that apply under consumer-protection law.'
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
              'A continuous, unedited 360° unboxing video starting before opening the package seal or tape and showing the shipping label and package opening, plus clear photos of the damage or incorrect item.'
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
