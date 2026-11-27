import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { BadgeCheck, ChevronRight, MapPin, PackageCheck, ShieldCheck, Sprout, Star } from 'lucide-react'
import { CartProvider } from '@/components/store/cart-context'
import { NurseryBannerActions } from '@/components/store/nursery-banner-actions'
import { NurseryCatalog } from '@/components/store/nursery-catalog'
import { SiteHeader } from '@/components/store/layout/site-header'
import { nurseries, products } from '@/components/store/products'

type NurseryPageProps = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return nurseries.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({ params }: NurseryPageProps): Promise<Metadata> {
  const { slug } = await params
  const nursery = nurseries.find((item) => item.slug === slug)

  return nursery
    ? {
        title: `${nursery.name} — Local Plant Nursery | Abhay’s Roof Garden`,
        description: `${nursery.bio} Browse plants grown by ${nursery.name}.`,
        openGraph: { title: nursery.name, description: nursery.bio, images: [nursery.image] },
      }
    : { title: 'Nursery not found | Abhay’s Roof Garden' }
}

export default async function NurseryPage({ params }: NurseryPageProps) {
  const { slug } = await params
  const nursery = nurseries.find((item) => item.slug === slug)

  if (!nursery) notFound()

  const nurseryProducts = products.filter((product) => product.nursery.id === nursery.id)

  return (
    <CartProvider>
      <SiteHeader />
      <main className="mx-auto w-full max-w-[100rem] px-4 pb-20 pt-5 sm:px-6 sm:pt-8 lg:px-10 xl:px-14">
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs text-[#778078] sm:mb-8 sm:text-sm">
          <Link href="/" className="hover:text-[#1A3325]">Home</Link>
          <ChevronRight className="size-3.5" aria-hidden="true" />
          <Link href="/shop" className="hover:text-[#1A3325]">Shop</Link>
          <ChevronRight className="size-3.5" aria-hidden="true" />
          <span aria-current="page" className="font-medium text-[#1A3325]">{nursery.name}</span>
        </nav>

        <section className="relative isolate flex min-h-[18rem] items-end overflow-hidden rounded-[1.75rem] bg-[#1A3325] p-6 sm:min-h-[23rem] sm:rounded-[2rem] sm:p-10 lg:p-14" aria-labelledby="nursery-heading">
          <Image src={nursery.image} alt="" fill priority sizes="100vw" className="-z-20 object-cover" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#0f291e]/90 via-[#0f291e]/30 to-transparent" aria-hidden="true" />
          <NurseryBannerActions nursery={nursery} />
          <div className="max-w-3xl pb-14 text-white sm:pb-16">
            <div className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 text-xs font-semibold backdrop-blur-sm"><BadgeCheck className="size-4" aria-hidden="true" /> Verified local grower</div>
            <h1 id="nursery-heading" className="font-serif text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">{nursery.name}</h1>
            <p className="mt-2 font-serif text-lg italic text-white/80 sm:text-xl">{nursery.tagline}</p>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-white/85 sm:text-base sm:leading-7">{nursery.bio}</p>
            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-white/90">
              <span className="inline-flex items-center gap-1.5"><MapPin className="size-4" aria-hidden="true" />{nursery.location}{nursery.distanceKm ? ` · ${nursery.distanceKm} km away` : ''}</span>
              <span className="inline-flex items-center gap-1.5"><Star className="size-4 fill-[#f0bd6a] text-[#f0bd6a]" aria-hidden="true" />{nursery.rating.toFixed(1)} <span className="text-white/70">({nursery.reviewsCount.toLocaleString('en-IN')} orders)</span></span>
            </div>
          </div>
        </section>

        <section aria-label="Grower promises" className="mt-4 grid grid-cols-1 gap-2 rounded-2xl border border-[#e7e5dc] bg-[#fbfaf6] p-4 sm:mt-6 sm:grid-cols-3 sm:gap-3 sm:p-5">
          <div className="flex items-center gap-3 rounded-xl bg-white px-3 py-3"><Sprout className="size-5 shrink-0 text-[#527358]" aria-hidden="true" /><span className="text-xs font-semibold text-[#304b37] sm:text-sm">100% organic soil</span></div>
          <div className="flex items-center gap-3 rounded-xl bg-white px-3 py-3"><PackageCheck className="size-5 shrink-0 text-[#527358]" aria-hidden="true" /><span className="text-xs font-semibold text-[#304b37] sm:text-sm">7-day wrong/damaged claims</span></div>
          <div className="flex items-center gap-3 rounded-xl bg-white px-3 py-3"><ShieldCheck className="size-5 shrink-0 text-[#527358]" aria-hidden="true" /><span className="text-xs font-semibold text-[#304b37] sm:text-sm">Verified rooftop grower</span></div>
        </section>

        <section className="mt-6 grid grid-cols-3 divide-x divide-[#e7e5dc] rounded-2xl border border-[#e7e5dc] bg-white py-4 sm:mt-8 sm:py-6" aria-label="Nursery performance">
          <div className="px-2 text-center"><p className="font-serif text-xl font-semibold text-[#1A3325] sm:text-3xl">{nurseryProducts.length}</p><p className="mt-1 text-[10px] leading-4 text-[#68786b] sm:text-sm">Plants listed</p></div>
          <div className="px-2 text-center"><p className="flex items-center justify-center gap-1 font-serif text-xl font-semibold text-[#1A3325] sm:text-3xl">{nursery.rating.toFixed(1)} <Star className="size-4 fill-[#d69b43] text-[#d69b43] sm:size-5" aria-hidden="true" /></p><p className="mt-1 text-[10px] leading-4 text-[#68786b] sm:text-sm">Seller rating</p></div>
          <div className="px-2 text-center"><p className="font-serif text-xl font-semibold text-[#1A3325] sm:text-3xl">99%</p><p className="mt-1 text-[10px] leading-4 text-[#68786b] sm:text-sm">On-time dispatch</p></div>
        </section>

        <blockquote className="mt-6 rounded-2xl bg-[#f5f2e9] px-5 py-5 sm:mt-8 sm:px-8 sm:py-7">
          <p className="font-serif text-lg italic leading-relaxed text-[#365440] sm:text-xl">“{nursery.bio}”</p>
          <cite className="mt-3 block text-xs font-semibold not-italic text-[#68786b]">— A note from {nursery.name}</cite>
        </blockquote>

        <NurseryCatalog nursery={nursery} products={nurseryProducts} />
      </main>
    </CartProvider>
  )
}
