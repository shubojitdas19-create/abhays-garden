import type { Metadata } from 'next'
import { CartProvider } from '@/components/store/cart-context'
import { SiteHeader } from '@/components/store/layout/site-header'
import { JournalIndex } from '@/components/store/journal/journal-index'

export const metadata: Metadata = {
  title: "The Rooftop Journal: Plant Care Guides & Stories | Abhay's Roof Garden",
  description:
    'Read seasonal Indian plant care manuals, chunky soil recipes, balcony styling blueprints, and grower notes from Abhay’s Roof Garden Collective.',
  openGraph: {
    title: "The Rooftop Journal | Abhay's Roof Garden",
    description:
      'Editorial botanical stories, repotting manuals, and urban gardening wisdom written by local rooftop growers.',
    images: ['/images/rooftop.png'],
  },
}

export default function JournalPage() {
  return (
    <CartProvider>
      <SiteHeader />
      <JournalIndex />
    </CartProvider>
  )
}
