import type { Metadata } from 'next'
import { CartProvider } from '@/components/store/cart-context'
import { SiteHeader } from '@/components/store/layout/site-header'
import { PolicyPage } from '@/components/store/policy-page'

export const metadata: Metadata = {
  title: "Privacy Policy | Abhay's Roof Garden",
  description: 'How Abhay’s Roof Garden’s website handles browser-stored order details and site usage information.',
}

export default function PrivacyPage() {
  return (
    <CartProvider>
      <SiteHeader />
      <PolicyPage
        title="Privacy Policy"
        description="A clear explanation of what this website stores, what it does not transmit, and how to reach us about your information."
        notice="The current checkout is a demonstration. Contact, address, and demo order details are saved in your browser’s local storage and are not sent to the nursery by this website. Do not enter sensitive information into the demo."
        sections={[
          {
            title: '1. Information handled by this website',
            paragraphs: [
              'The site’s shopping features use browser storage to remember your cart, wishlist, saved delivery address, and demo order. If you fill in the demo checkout, the browser stores the details you enter, which can include your name, WhatsApp/mobile number, email address, delivery address, delivery instructions, selected products, and the demo order total and status.',
              'This information remains in the browser profile on the device you use. The current demo checkout does not submit it to an order database or send it to the nursery. Other people with access to that browser profile or device may be able to see it.',
            ],
          },
          {
            title: '2. How browser storage is controlled',
            paragraphs: [
              'Cart and demo order information is stored using local storage, not as a server-side customer account. It may remain on your device until you remove it or clear this website’s data in your browser settings. Clearing site data may remove your cart, saved address, and demo order history.',
              'Please do not enter payment card details, passwords, government identity numbers, or other sensitive information in the demo checkout. The website does not collect or process payment details.',
            ],
          },
          {
            title: '3. Messages you send us',
            paragraphs: [
              'If you contact us by phone, WhatsApp, or email, the information you choose to include is handled by us and by the relevant communications provider. Their own privacy terms also apply. We use those messages to respond to your enquiry or help with a directly arranged order.',
              'The newsletter/discount form currently shown on the homepage is also a visual demo and does not submit your details to a mailing list.',
            ],
          },
          {
            title: '4. Analytics and service providers',
            paragraphs: [
              'When the site is deployed in production, Vercel Analytics is enabled to help understand site usage and performance. Vercel may process technical or usage information to provide that service. See Vercel’s privacy information for details about its processing and controls.',
              'We do not use the demo checkout to share order data with payment processors, couriers, or advertising services. If a live ordering service is introduced later, this policy should be updated to identify the data it collects and the providers that process it.',
            ],
          },
          {
            title: '5. Retention and your choices',
            paragraphs: [
              'Browser-stored information stays on your device until cleared or removed. You can clear this website’s stored data using your browser’s site-data controls. If you have sent us information directly by email or WhatsApp, contact us to ask a question or request that we review it; we may need to retain records where required for legal or legitimate business purposes.',
              'You can choose not to use the demo checkout and contact the nursery directly instead. You may also use browser settings to limit or clear site storage and to manage analytics or privacy controls supported by your browser.',
            ],
          },
          {
            title: '6. Children and policy updates',
            paragraphs: [
              'This shopping website is intended for people making or considering a purchase, not for children to submit personal information. We may update this policy when the site or its data practices change. The date at the top indicates the latest revision.',
            ],
          },
          {
            title: '7. Contact us about privacy',
            paragraphs: [
              'For privacy questions, contact Abhay’s Roof Garden at abhaysroofgarden@gmail.com or +91 94764 33880. Our address is Chuanpore, Sukantapally, Berhampore, Murshidabad, West Bengal 742407, India.',
            ],
          },
        ]}
      />
    </CartProvider>
  )
}
