import type { Metadata } from 'next'
import { CartProvider } from '@/components/store/cart-context'
import { SiteHeader } from '@/components/store/layout/site-header'
import { OrderConfirmation } from '@/components/store/order-experience'

export const metadata: Metadata = {
  title: "Order confirmed | Abhay's Roof Garden",
  description: 'Your homegrown plants are being prepared by our local growers.',
}

export default async function OrderSuccessPage({ params }: { params: Promise<{ orderId: string }> }) {
  const { orderId } = await params

  return (
    <CartProvider>
      <SiteHeader />
      <OrderConfirmation orderId={orderId} />
    </CartProvider>
  )
}
