import type { Metadata } from 'next'
import { CartProvider } from '@/components/store/cart-context'
import { CheckoutContent } from '@/components/store/checkout/checkout-content'

export const metadata: Metadata = {
  title: "Secure checkout | Abhay's Roof Garden",
  description: 'Choose delivery and payment options for your homegrown plants.',
  robots: { index: false, follow: false },
}

export default function CheckoutPage() {
  return (
    <CartProvider>
      <CheckoutContent />
    </CartProvider>
  )
}
