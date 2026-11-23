import type { Metadata } from 'next'
import { CartProvider } from '@/components/store/cart-context'
import { SiteHeader } from '@/components/store/layout/site-header'
import { PolicyPage } from '@/components/store/policy-page'

export const metadata: Metadata = {
  title: "Shipping & Delivery | Abhay's Roof Garden",
  description: 'Delivery estimates, dispatch information, and plant arrival guidance from Abhay’s Roof Garden.',
}

export default function ShippingPage() {
  return (
    <CartProvider>
      <SiteHeader />
      <PolicyPage
        title="Shipping & Delivery"
        description="What to expect when a plant leaves our rooftop nursery and makes its way to your home."
        notice="The online checkout is currently a demo and does not dispatch real orders. Delivery availability, charges, and timing for an actual order must be confirmed directly with the nursery before payment."
        sections={[
          {
            title: '1. Dispatch and delivery estimates',
            paragraphs: [
              'Our published customer information says orders are generally dispatched within 24 hours. Standard nursery transit is estimated at 2–5 business days after dispatch, depending on your location. These are estimates, not guaranteed delivery dates.',
              'The site also displays an express option for eligible local areas, with same-day or next-day delivery where available. Availability and any charge must be confirmed for your address before an actual order is accepted.',
            ],
          },
          {
            title: '2. Delivery address and coordination',
            paragraphs: [
              'Please provide a complete address, a reachable mobile number, and any useful delivery instructions when arranging a real order. Check your details carefully; an incomplete or incorrect address can delay delivery or prevent a successful handoff.',
              'We may contact you to coordinate delivery. Tell us promptly if your contact details or delivery instructions change after an order is confirmed.',
            ],
          },
          {
            title: '3. Plant packaging and arrival',
            paragraphs: [
              'Plants are living items and can experience some temporary stress during transit. A small amount of leaf movement or drooping can happen. Unpack the plant promptly, remove protective wrapping, and follow the plant’s care card as it settles.',
              'If a plant appears damaged or unhealthy on arrival, photograph the plant and packaging and contact us within 7 days under our Refund & Replacement Policy.',
            ],
          },
          {
            title: '4. Delays and delivery issues',
            paragraphs: [
              'Weather, courier disruptions, route conditions, and other events can affect delivery estimates. If your directly confirmed order is delayed or a delivery attempt fails, contact the nursery with your order reference so we can help coordinate next steps.',
              'Please contact us before refusing a shipment or returning a plant. Any remedy for damage or health concerns is handled under the Refund & Replacement Policy and applicable law.',
            ],
          },
          {
            title: '5. Contact the nursery',
            paragraphs: [
              'Call or WhatsApp +91 94764 33880, or email abhaysroofgarden@gmail.com. Visit by arrangement at Chuanpore, Sukantapally, Berhampore, Murshidabad, West Bengal 742407, India; please WhatsApp before visiting.',
            ],
          },
        ]}
      />
    </CartProvider>
  )
}
