import { AnnouncementBar } from '@/components/store/layout/announcement-bar'
import { Bestsellers } from '@/components/store/bestsellers/bestsellers'
import { CartProvider } from '@/components/store/cart-context'
import { Hero } from '@/components/store/hero/hero'
import { ShopCategories } from '@/components/store/categories/shop-categories'
import { SiteHeader } from '@/components/store/layout/site-header'
import { RooftopStory } from '@/components/store/about/rooftop-story'
import { PlantFinder } from '@/components/store/quiz/plant-finder'
import { ShippingTimeline } from '@/components/store/about/shipping-timeline'
import { CustomerReviews } from '@/components/store/reviews/customer-reviews'
import { AccessoriesRow } from '@/components/store/accessories/accessories-row'
import { HomeFooter } from '@/components/store/layout/home-footer'

export default function Home() {
  return (
    <CartProvider>
      <AnnouncementBar />
      <SiteHeader />
      <main>
        <Hero />
        <ShopCategories />
        <Bestsellers />
        <RooftopStory />
        <PlantFinder />
        <ShippingTimeline />
        <CustomerReviews />
        <AccessoriesRow />
      </main>
      <HomeFooter />
    </CartProvider>
  )
}