import type { Metadata } from 'next'
import { CartProvider } from '@/components/store/cart-context'
import { SiteHeader } from '@/components/store/layout/site-header'
import { GuaranteePage } from '@/components/store/guarantee-page'

export const metadata: Metadata = {
  title: '7-Day Wrong or Damaged Plant Claim Policy | Abhay’s Roof Garden',
  description: 'Learn how to claim for a wrong or transit-damaged plant within 7 days, including the mandatory continuous, unedited 360° unboxing video and claim remedies.'
}

export default function GuaranteeRoute() {
  return (
    <CartProvider>
      <SiteHeader />
      <GuaranteePage />
    </CartProvider>
  )
}
