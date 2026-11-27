import type { Metadata } from 'next'
import { CartProvider } from '@/components/store/cart-context'
import { SiteHeader } from '@/components/store/layout/site-header'
import { WriteReviewForm } from '@/components/store/reviews/write-review-form'

export const metadata: Metadata = {
  title: "Write a Review | Abhay's Roof Garden",
  description:
    'Share your plant story, rate your delivery, and upload a photo from your home for fellow plant parents.',
}

export default function WriteReviewPage() {
  return (
    <CartProvider>
      <SiteHeader />
      <WriteReviewForm />
    </CartProvider>
  )
}
