import type { Metadata } from 'next'
import { CartProvider } from '@/components/store/cart-context'
import { SiteHeader } from '@/components/store/layout/site-header'
import { PolicyPage } from '@/components/store/policy-page'

export const metadata: Metadata = {
  title: "Terms & Conditions | Abhay's Roof Garden",
  description: 'Terms for using the Abhay’s Roof Garden website and its plant catalogue.',
}

export default function TermsPage() {
  return (
    <CartProvider>
      <SiteHeader />
      <PolicyPage
        title="Terms & Conditions"
        description="The terms for browsing our nursery, using this website, and placing an order with Abhay’s Roof Garden."
        notice="The website checkout is currently a demonstration only. It does not take payment or send an order to the nursery. Do not treat an on-screen demo order as a confirmed purchase."
        sections={[
          {
            title: '1. About these terms',
            paragraphs: [
              'These terms apply when you visit or use the Abhay’s Roof Garden website. By using the site, you agree to these terms and the related Privacy, Refund, and Shipping & Delivery policies. If you do not agree, please do not use the site.',
              'Abhay’s Roof Garden is a homegrown nursery located in Chuanpore, Sukantapally, Berhampore, Murshidabad, West Bengal 742407, India. These terms do not remove any rights you may have under applicable consumer-protection laws.',
            ],
          },
          {
            title: '2. Plants and product information',
            paragraphs: [
              'Plants are living products. Their size, shape, colour, leaf count, and appearance naturally vary, and a plant may look slightly different from its photograph. We aim to describe each listing accurately and to share relevant care information.',
              'Availability can change as plants grow or sell. A listing or price on this demonstration site is not a guarantee that an item is in stock or available for delivery.',
            ],
          },
          {
            title: '3. Orders, prices, and payment',
            paragraphs: [
              'The current checkout is a front-end demo: it stores a sample order in your browser, does not transmit it to us, and does not collect money or payment details. A demo confirmation or tracking screen is not proof that the nursery has accepted an order.',
              'For a real purchase, contact us using the phone, WhatsApp, or email details on this site. We will confirm item availability, the final price, delivery options, and payment instructions directly before accepting the order. Never send card PINs, passwords, or one-time passcodes to anyone.',
            ],
          },
          {
            title: '4. Delivery and plant care',
            paragraphs: [
              'Delivery estimates are indicative and depend on the destination, courier service, weather, and other conditions outside our reasonable control. See the Shipping & Delivery Policy for the estimates currently displayed on the site.',
              'Please unpack plants promptly and follow the care card or instructions supplied with them. Our 7-Day Wrong or Damaged Plant Claim Policy explains how to report an incorrect or transit-damaged delivery and the complete 360° unboxing video required for a claim.',
            ],
          },
          {
            title: '5. Changes and cancellations',
            paragraphs: [
              'For an actual order arranged directly with the nursery, contact us as soon as possible to request a change or cancellation. We will confirm whether it can be accommodated based on whether the plants have been prepared or dispatched. The demo checkout itself does not create a live order to cancel.',
            ],
          },
          {
            title: '6. Acceptable use and website content',
            paragraphs: [
              'You may browse the site for personal, lawful use. Do not misuse the site, interfere with its operation, attempt unauthorised access, or copy our text, photographs, branding, or other material for commercial use without permission.',
            ],
          },
          {
            title: '7. Availability and liability',
            paragraphs: [
              'We work to keep the site accurate and available, but it may occasionally be changed, interrupted, or unavailable. Information on the demonstration site is provided for general shopping information and is not a substitute for a direct order confirmation.',
              'Nothing in these terms excludes liability or consumer rights that cannot lawfully be excluded. To the extent permitted by law, we are not responsible for losses caused by use of an unconfirmed demo order or by factors outside our reasonable control.',
            ],
          },
          {
            title: '8. Governing law and contact',
            paragraphs: [
              'These terms are governed by the laws of India, subject to applicable consumer rights and the jurisdiction rules that apply to your transaction.',
              'Questions about these terms? Call or WhatsApp +91 94764 33880, or email abhaysroofgarden@gmail.com.',
            ],
          },
        ]}
      />
    </CartProvider>
  )
}
