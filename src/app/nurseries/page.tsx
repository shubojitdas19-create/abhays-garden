import type { Metadata } from 'next'
import { CartProvider } from '@/components/store/cart-context'
import { SiteHeader } from '@/components/store/layout/site-header'
import { NurseriesDirectory } from '@/components/store/nurseries-directory'

export const metadata: Metadata = {
  title: 'Meet Our Local Growers | Abhay’s Roof Garden',
  description: 'Discover verified local plant nurseries and independent growers across Bengal. Find the right plants, grown close to home.',
  openGraph: {
    title: 'Meet Our Local Growers | Abhay’s Roof Garden',
    description: 'Discover verified local plant nurseries and independent growers across Bengal.',
    images: ['/images/hero-rooftop.png'],
  },
}

export default function NurseriesPage() {
  return (
    <CartProvider>
      <SiteHeader />
      <NurseriesDirectory />
    </CartProvider>
  )
}
