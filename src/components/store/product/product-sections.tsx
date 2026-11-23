import Image from 'next/image'
import Link from 'next/link'
import { BadgeCheck, ChevronLeft, ChevronRight, Droplets, Leaf, MapPin, PackageCheck, PawPrint, ShieldCheck, Star, Sun } from 'lucide-react'
import { useRef } from 'react'
import { formatINR, type Product } from '@/components/store/products'

const careLevel = { 1: 'Easy', 2: 'Moderate', 3: 'Advanced' } as const

export function NurseryTrustBox({ nursery }: { nursery: Product['nursery'] }) {
  return (
    <section className="rounded-2xl border border-[#e6e6da] bg-white p-4 sm:p-5" aria-labelledby="nursery-title">
      <div className="flex items-center gap-3">
        <div className="relative size-12 shrink-0 overflow-hidden rounded-full border border-[#e6e6da] bg-[#f3f1e8]">
          <Image src={nursery.avatar} alt={`${nursery.name} logo`} fill sizes="48px" className="object-cover" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs text-[#68786b]">Grown &amp; shipped by</p>
          <h2 id="nursery-title" className="truncate text-sm font-semibold text-[#1A3325]">{nursery.name}</h2>
          <p className="mt-0.5 inline-flex items-center gap-1 text-xs font-medium text-[#527358]"><BadgeCheck className="size-3.5" aria-hidden="true" /> Verified local grower</p>
        </div>
        <div className="flex shrink-0 items-center gap-1 text-sm font-semibold text-[#1A3325]" aria-label={`${nursery.rating} out of 5 stars`}>
          <Star className="size-4 fill-[#d69a43] text-[#d69a43]" aria-hidden="true" /> {nursery.rating.toFixed(1)}
        </div>
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-[#eeeee7] pt-3 text-xs text-[#68786b]">
        <span className="inline-flex items-center gap-1.5"><MapPin className="size-3.5 text-[#a65f2b]" aria-hidden="true" />{nursery.location}{nursery.distanceKm ? ` · ${nursery.distanceKm} km away` : ''}</span>
        <span className="inline-flex items-center gap-1.5"><Star className="size-3.5 fill-[#d69a43] text-[#d69a43]" aria-hidden="true" />{nursery.reviewsCount.toLocaleString('en-IN')} happy orders</span>
      </div>
      <Link href={`/nurseries/${nursery.slug}`} className="mt-4 inline-flex min-h-10 w-full items-center justify-center rounded-full border border-[#1A3325]/20 text-sm font-semibold text-[#1A3325] transition-colors hover:border-[#1A3325] hover:bg-[#f6f6f0]">Visit nursery storefront</Link>
    </section>
  )
}

export function PlantCareDashboard({ product }: { product: Product }) {
  const items = [
    { icon: Sun, label: 'Light', value: product.careSummary.light },
    { icon: Droplets, label: 'Water', value: product.careSummary.water },
    { icon: Leaf, label: 'Care level', value: careLevel[product.careSummary.difficulty] },
    { icon: PawPrint, label: 'Pet safety', value: product.careSummary.petFriendly ? 'Pet friendly' : 'Keep away from pets' },
  ]

  return (
    <section aria-labelledby="care-heading" className="mt-12 sm:mt-16">
      <div className="mb-5">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#a65f2b]">A happy plant starts here</p>
        <h2 id="care-heading" className="mt-1 font-serif text-2xl font-semibold text-[#1A3325] sm:text-3xl">Plant vitality</h2>
      </div>
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {items.map(({ icon: Icon, label, value }) => (
          <article key={label} className="rounded-2xl border border-[#e7e5dc] bg-white p-4 sm:p-5">
            <span className="inline-flex size-10 items-center justify-center rounded-full bg-[#edf1e9] text-[#527358]"><Icon className="size-5" aria-hidden="true" /></span>
            <p className="mt-4 text-xs font-medium uppercase tracking-[0.12em] text-[#7a847b]">{label}</p>
            <p className="mt-1 text-sm font-semibold text-[#1A3325] sm:text-base">{value}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

export function PlantGuarantee() {
  const whatsappText = encodeURIComponent('Hi Abhay’s Roof Garden, I need help with the 7-day healthy plant guarantee.')

  return (
    <section className="mt-5 flex flex-col gap-4 rounded-2xl border border-[#dfe8dc] bg-[#f1f5ee] p-4 sm:flex-row sm:items-center sm:p-5" aria-label="7-day plant health guarantee">
      <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-white text-[#527358]"><ShieldCheck className="size-6" aria-hidden="true" /></span>
      <div className="flex-1">
        <h2 className="font-semibold text-[#1A3325]">7-day healthy plant guarantee</h2>
        <p className="mt-1 text-sm leading-6 text-[#68786b]">If your plant arrives unhealthy, our team will help make it right. Send us a photo within 7 days of delivery.</p>
      </div>
      <div className="flex shrink-0 flex-col gap-2 sm:items-end">
        <Link href="/guarantee" className="min-h-10 content-center text-sm font-semibold text-[#1A3325] underline decoration-[#a65f2b]/50 underline-offset-4">Read the full guarantee</Link>
        <a href={`https://wa.me/919476433880?text=${whatsappText}`} target="_blank" rel="noreferrer" className="inline-flex min-h-10 items-center justify-center gap-2 rounded-full border border-[#527358]/25 bg-white px-4 text-sm font-semibold text-[#1A3325] transition-colors hover:bg-[#e8eee4] motion-safe:animate-[whatsapp-pulse_2.4s_ease-in-out_infinite]">
          <PackageCheck className="size-4" aria-hidden="true" /> WhatsApp support
        </a>
      </div>
    </section>
  )
}

const reviewPhotos = ['/images/customer-1.jpg', '/images/customer-2.jpg', '/images/customer-3.jpg']

export function ProductReviews({ product }: { product: Product }) {
  const reviews = [
    { name: 'Ananya S.', title: 'Arrived in lovely shape', text: 'The leaves were fresh and the packing was thoughtful. It settled into its new spot beautifully.', date: '2 weeks ago', photo: reviewPhotos[0] },
    { name: 'Ritwik D.', title: 'Just as described', text: 'A healthy plant with clear care instructions. The nursery was quick to answer my questions.', date: '1 month ago', photo: reviewPhotos[1] },
    { name: 'Madhuri P.', title: 'A lovely addition', text: 'You can tell it was grown with care. It has been thriving near a bright window.', date: '1 month ago', photo: reviewPhotos[2] },
  ]

  return (
    <section id="reviews" className="mt-14 scroll-mt-28 sm:mt-20" aria-labelledby="reviews-heading">
      <div className="flex flex-col gap-6 border-b border-[#e7e5dc] pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#a65f2b]">From our plant community</p>
          <h2 id="reviews-heading" className="mt-1 font-serif text-2xl font-semibold text-[#1A3325] sm:text-3xl">Growing stories</h2>
        </div>
        <div className="flex items-center gap-3">
          <span className="font-serif text-4xl font-semibold text-[#1A3325]">{product.rating.toFixed(1)}</span>
          <div>
            <div className="flex gap-0.5 text-[#d69a43]" aria-label={`${product.rating} out of 5 stars`}>
              {Array.from({ length: 5 }, (_, index) => <Star key={index} className="size-4 fill-current" aria-hidden="true" />)}
            </div>
            <p className="mt-1 text-xs text-[#68786b]">Based on {product.reviews.toLocaleString('en-IN')} reviews</p>
          </div>
        </div>
      </div>
      <div className="grid gap-4 pt-6 md:grid-cols-3">
        {reviews.map((review) => (
          <article key={review.name} className="rounded-2xl border border-[#e7e5dc] bg-white p-4 sm:p-5">
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="flex gap-0.5 text-[#d69a43]" aria-label="5 out of 5 stars">
                  {Array.from({ length: 5 }, (_, index) => <Star key={index} className="size-3.5 fill-current" aria-hidden="true" />)}
                </div>
                <h3 className="mt-2 text-sm font-semibold text-[#1A3325]">{review.title}</h3>
              </div>
              <div className="relative size-14 shrink-0 overflow-hidden rounded-xl bg-[#edf1e9]">
                <Image src={review.photo} alt={`${review.name}'s plant at home`} fill sizes="56px" className="object-cover" />
              </div>
            </div>
            <p className="mt-3 text-sm leading-6 text-[#68786b]">“{review.text}”</p>
            <div className="mt-4 flex items-center justify-between border-t border-[#eeeee7] pt-3 text-xs">
              <span className="font-medium text-[#1A3325]">{review.name} <span className="ml-1 inline-flex items-center gap-1 text-[#527358]"><BadgeCheck className="size-3" aria-hidden="true" /> Verified buyer</span></span>
              <time className="text-[#879187]">{review.date}</time>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

function FrequentlyBoughtTogether({ products }: { products: Product[] }) {
  const scrollRef = useRef<HTMLDivElement>(null)

  function scrollByDirection(direction: -1 | 1) {
    scrollRef.current?.scrollBy({ left: direction * scrollRef.current.clientWidth * 0.8, behavior: 'smooth' })
  }

  return (
    <section className="mt-14 sm:mt-16" aria-labelledby="frequently-bought-heading">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#a65f2b]">A good pairing</p>
          <h3 id="frequently-bought-heading" className="mt-1 font-serif text-2xl font-semibold text-[#1A3325]">Frequently bought together</h3>
        </div>
        <div className="hidden gap-2 sm:flex">
          <button type="button" onClick={() => scrollByDirection(-1)} aria-label="Scroll pairings left" className="inline-flex size-10 items-center justify-center rounded-full border border-[#dedfd5] text-[#1A3325] transition-colors hover:bg-[#f1f4ee]"><ChevronLeft className="size-5" aria-hidden="true" /></button>
          <button type="button" onClick={() => scrollByDirection(1)} aria-label="Scroll pairings right" className="inline-flex size-10 items-center justify-center rounded-full border border-[#dedfd5] text-[#1A3325] transition-colors hover:bg-[#f1f4ee]"><ChevronRight className="size-5" aria-hidden="true" /></button>
        </div>
      </div>
      <div ref={scrollRef} className="no-scrollbar mt-5 flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth pb-2 touch-pan-x sm:gap-4">
        {products.slice(0, 6).map((item) => (
          <Link key={item.id} href={`/shop/${item.slug}`} className="group flex w-[min(82vw,19rem)] shrink-0 snap-start items-center gap-3 rounded-2xl border border-[#e7e5dc] bg-white p-3 sm:w-[19rem]">
            <div className="relative size-16 shrink-0 overflow-hidden rounded-xl bg-[#edf1e9]">
              <Image src={item.image} alt={item.name} fill sizes="64px" className="object-cover transition-transform duration-500 group-hover:scale-105" />
            </div>
            <div className="min-w-0 flex-1"><p className="truncate text-sm font-semibold text-[#1A3325]">{item.name}</p><p className="mt-1 text-xs text-[#68786b]">From {formatINR(item.sizes[0].price)}</p></div>
            <span className="text-xs font-semibold text-[#527358]">View</span>
          </Link>
        ))}
      </div>
    </section>
  )
}

export function ProductRecommendations({ product, products }: { product: Product; products: Product[] }) {
  const fromNursery = products.filter((item) => item.nursery.id === product.nursery.id)
  const recommendations = [...fromNursery, ...products.filter((item) => item.nursery.id !== product.nursery.id)].slice(0, 4)

  return (
    <section className="mt-14 sm:mt-20" aria-labelledby="recommendations-heading">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#a65f2b]">Grown by {product.nursery.name}</p>
          <h2 id="recommendations-heading" className="mt-1 font-serif text-2xl font-semibold text-[#1A3325] sm:text-3xl">More green to love</h2>
        </div>
        <Link href="/shop" className="hidden text-sm font-semibold text-[#1A3325] underline decoration-[#a65f2b]/50 underline-offset-4 sm:inline">Shop all plants</Link>
      </div>
      <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
        {recommendations.map((item) => (
          <Link key={item.id} href={`/shop/${item.slug}`} className="group min-w-0">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-[#edf1e9]">
              <Image src={item.image} alt={item.name} fill sizes="(min-width: 1024px) 22vw, 50vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
            </div>
            <div className="mt-3 flex items-start justify-between gap-2">
              <div className="min-w-0"><h3 className="truncate text-sm font-semibold text-[#1A3325]">{item.name}</h3><p className="mt-0.5 text-xs text-[#68786b]">{item.botanical}</p></div>
              <span className="shrink-0 text-sm font-semibold text-[#1A3325]">{formatINR(item.sizes[0].price)}</span>
            </div>
          </Link>
        ))}
      </div>
      <FrequentlyBoughtTogether products={products} />
    </section>
  )
}
