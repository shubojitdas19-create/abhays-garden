import type { Metadata } from 'next'
import { CartProvider } from '@/components/store/cart-context'
import { SiteHeader } from '@/components/store/layout/site-header'
import { GuaranteePage } from '@/components/store/guarantee-page'

export const metadata: Metadata = {
  title: '7-Day Healthy Plant Guarantee | Abhay’s Roof Garden',
  description: 'Learn about our 7-day healthy plant promise, simple claim steps, and first-week care tips.',
}

export default function GuaranteeRoute() {
  return (
    <CartProvider>
      <SiteHeader />
      <GuaranteePage />
    </CartProvider>
  )
}
