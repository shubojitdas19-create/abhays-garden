import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { BadgeCheck, ChevronRight, MapPin, Star } from 'lucide-react'
import { CartProvider } from '@/components/store/cart-context'
import { ProductCard } from '@/components/store/product-card'
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
          <div className="max-w-3xl text-white">
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

        <section className="mt-10 sm:mt-14" aria-labelledby="nursery-products-heading">
          <div className="mb-6 flex items-end justify-between border-b border-[#e7e5dc] pb-5 sm:mb-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#a65f2b]">{nursery.specialty}</p>
              <h2 id="nursery-products-heading" className="mt-1 font-serif text-3xl font-semibold text-[#1A3325] sm:text-4xl">Grown here, for your home</h2>
              <p className="mt-2 text-sm text-[#68786b]">{nurseryProducts.length} plants from this nursery</p>
            </div>
            <Link href="/shop" className="hidden text-sm font-semibold text-[#1A3325] underline decoration-[#a65f2b]/50 underline-offset-4 sm:inline">Explore all plants</Link>
          </div>
          {nurseryProducts.length ? (
            <div className="grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-6 sm:gap-y-10 md:grid-cols-3 xl:grid-cols-4">
              {nurseryProducts.map((product) => <ProductCard key={product.id} product={product} />)}
            </div>
          ) : (
            <p className="rounded-2xl border border-dashed border-[#d8ddd4] p-8 text-center text-sm text-[#68786b]">This nursery is getting its plants ready. Check back soon.</p>
          )}
        </section>
      </main>
    </CartProvider>
  )
}
