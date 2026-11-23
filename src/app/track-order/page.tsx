import type { Metadata } from 'next'
import { CartProvider } from '@/components/store/cart-context'
import { SiteHeader } from '@/components/store/layout/site-header'
import { TrackOrderPage } from '@/components/store/order-experience'

export const metadata: Metadata = {
  title: "Track your order | Abhay's Roof Garden",
  description: 'Follow your plants from our nursery to your doorstep.',
}

export default async function TrackingPage({ searchParams }: { searchParams: Promise<{ order?: string }> }) {
  const { order = '' } = await searchParams

  return (
    <CartProvider>
      <SiteHeader />
      <TrackOrderPage initialOrderId={order} />
    </CartProvider>
  )
}
