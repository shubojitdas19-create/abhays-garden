import type { Metadata } from 'next'
import { CartProvider } from '@/components/store/cart-context'
import { SiteHeader } from '@/components/store/layout/site-header'
import { WishlistPage } from '@/components/store/wishlist-page'

export const metadata: Metadata = {
  title: 'My Saved Garden | Abhay’s Roof Garden',
  description: 'Revisit your favourite homegrown plants and move them to your plant bag when you are ready.',
}

export default function WishlistRoute() {
  return (
    <CartProvider>
      <SiteHeader />
      <WishlistPage />
    </CartProvider>
  )
}
