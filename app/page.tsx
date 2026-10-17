import { AnnouncementBar } from '@/components/store/announcement-bar'
import { Bestsellers } from '@/components/store/bestsellers'
import { CartProvider } from '@/components/store/cart-context'
import { Hero } from '@/components/store/hero'
import { SiteHeader } from '@/components/store/site-header'

export default function Home() {
  return (
    <CartProvider>
      <AnnouncementBar />
      <SiteHeader />
      <main>
        <Hero />
        <Bestsellers />
      </main>
    </CartProvider>
  )
}
