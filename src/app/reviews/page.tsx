import type { Metadata } from 'next'
import { CartProvider } from '@/components/store/cart-context'
import { SiteHeader } from '@/components/store/layout/site-header'
import { ReviewsHub } from '@/components/store/reviews/reviews-hub'

export const metadata: Metadata = {
  title: "Customer Reviews — Real Plant Parents | Abhay's Roof Garden",
  description:
    'Read verified plant parent stories, browse customer photos, and see nursery responses from across Abhay’s Roof Garden Collective.',
  openGraph: {
    title: "Customer Reviews | Abhay's Roof Garden",
    description: '4.9 stars across 1,480+ verified plant orders from our rooftop nursery collective.',
    images: ['/images/customer-1.jpg'],
  },
}

export default function ReviewsPage() {
  return (
    <CartProvider>
      <SiteHeader />
      <ReviewsHub />
    </CartProvider>
  )
}
