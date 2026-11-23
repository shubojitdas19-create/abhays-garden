import type { Metadata } from 'next'
import { CartProvider } from '@/components/store/cart-context'
import { SiteHeader } from '@/components/store/layout/site-header'
import { SellPage } from '@/components/store/sell/sell-page'

export const metadata: Metadata = {
  title: 'Sell With Us | Abhay’s Roof Garden',
  description: 'Join Bengal’s homegrown botanical marketplace. Reach nearby plant lovers and grow your nursery business with Abhay’s Roof Garden.',
  openGraph: {
    title: 'Sell With Us | Abhay’s Roof Garden',
    description: 'Join a collective of local growers and help more homegrown plants find a home.',
    images: ['/images/rooftop.png'],
  },
}

export default function SellWithUsPage() {
  return (
    <CartProvider>
      <SiteHeader />
      <SellPage />
    </CartProvider>
  )
}
