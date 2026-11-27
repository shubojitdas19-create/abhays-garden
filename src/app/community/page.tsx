import type { Metadata } from 'next'
import { CartProvider } from '@/components/store/cart-context'
import { SiteHeader } from '@/components/store/layout/site-header'
import { CommunityFeed } from '@/components/store/community/community-feed'

export const metadata: Metadata = {
  title: "Plant Care Clinic & Community Q&A | Abhay's Roof Garden",
  description:
    'Ask plant care questions, diagnose yellowing leaves or pests, and get verified answers from local Indian rooftop nurseries and fellow plant parents.',
  openGraph: {
    title: "The Plant Care Clinic & Community | Abhay's Roof Garden",
    description:
      'Get plant care advice, organic pest remedies, and propagation tips from fellow growers and verified local nurseries.',
    images: ['/images/pothos.png'],
  },
}

export default function CommunityPage() {
  return (
    <CartProvider>
      <SiteHeader />
      <CommunityFeed />
    </CartProvider>
  )
}
