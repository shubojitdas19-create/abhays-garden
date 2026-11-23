import type { Metadata } from 'next'
import { CartProvider } from '@/components/store/cart-context'
import { CartPageContent } from '@/components/store/cart/cart-page-content'
import { SiteHeader } from '@/components/store/layout/site-header'

export const metadata: Metadata = {
  title: "Your Plant Bag | Abhay's Roof Garden",
  description: 'Review your plants, apply a promo code, and continue to secure checkout.',
}

export default function CartPage() {
  return (
    <CartProvider>
      <SiteHeader />
      <CartPageContent />
    </CartProvider>
  )
}
