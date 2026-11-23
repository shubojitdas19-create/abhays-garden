'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Heart, Leaf, ShoppingBag, Trash2 } from 'lucide-react'
import { useCart } from '@/components/store/cart-context'
import { formatINR, products } from '@/components/store/products'

export function WishlistPage() {
  const { wishlist, toggleWishlist, addItem } = useCart()
  const savedProducts = products.filter((product) => wishlist.includes(product.id))

  return (
    <main className="mx-auto w-full max-w-[100rem] px-4 pb-16 pt-8 sm:px-6 sm:pb-20 sm:pt-12 lg:px-10 xl:px-14">
      <div className="mb-8 flex flex-col gap-4 border-b border-[#e3e8e4] pb-6 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#a65f2b]"><Heart className="size-4" aria-hidden="true" /> Your plant collection</p>
          <h1 className="mt-2 font-serif text-3xl font-semibold tracking-tight text-[#1A3325] sm:text-5xl">My Saved Garden</h1>
          <p className="mt-2 text-sm text-[#68786b]">Keep the plants you love close, and bring them home when you&apos;re ready.</p>
        </div>
        <p className="text-sm font-medium text-[#527358]" aria-live="polite">{savedProducts.length} {savedProducts.length === 1 ? 'plant' : 'plants'} saved</p>
      </div>

      {savedProducts.length ? (
        <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4">
          {savedProducts.map((product) => {
            const size = product.sizes.find((option) => option.label === 'M') ?? product.sizes[0]
            return (
              <article key={product.id} className="min-w-0 overflow-hidden rounded-2xl border border-[#e7e5dc] bg-white">
                <div className="relative aspect-[4/4.3] bg-[#edf1e9]">
                  <Link href={`/shop/${product.slug}`} aria-label={`View ${product.name}`} className="absolute inset-0 z-0">
                    <Image src={product.image} alt={product.name} fill sizes="(min-width: 1024px) 22vw, 50vw" className="object-cover transition-transform duration-500 hover:scale-105" />
                  </Link>
                  <button type="button" onClick={() => toggleWishlist(product.id)} aria-label={`Remove ${product.name} from saved garden`} className="absolute right-3 top-3 z-10 inline-flex size-10 items-center justify-center rounded-full bg-white/95 text-[#a65f2b] shadow-sm transition-colors hover:bg-white">
                    <Trash2 className="size-4" aria-hidden="true" />
                  </button>
                </div>
                <div className="p-3.5 sm:p-4">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#7b897d]">{product.nursery.name}</p>
                  <h2 className="mt-1 truncate font-serif text-base font-semibold text-[#1A3325] sm:text-lg"><Link href={`/shop/${product.slug}`} className="hover:underline">{product.name}</Link></h2>
                  <p className="mt-0.5 truncate font-serif text-xs italic text-[#778078]">{product.botanical}</p>
                  <p className="mt-3 text-sm font-semibold text-[#1A3325]">{formatINR(size.price)}</p>
                  <button type="button" onClick={() => addItem({ productId: product.id, productName: product.name, size: size.label, pot: product.pots[0]?.name ?? 'Standard Eco Nursery Pot', price: size.price, image: product.image, nurseryName: product.nursery.name })} className="mt-3 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-[#1A3325] px-3 text-xs font-semibold text-white transition-colors hover:bg-[#294735] sm:text-sm">
                    <ShoppingBag className="size-4" aria-hidden="true" /> Move to plant bag
                  </button>
                </div>
              </article>
            )
          })}
        </div>
      ) : (
        <section className="mx-auto flex max-w-xl flex-col items-center rounded-3xl border border-[#e3e8e4] bg-white px-6 py-12 text-center sm:py-16" aria-labelledby="empty-wishlist-heading">
          <span className="inline-flex size-14 items-center justify-center rounded-full bg-[#edf1e9] text-[#527358]"><Leaf className="size-7" aria-hidden="true" /></span>
          <h2 id="empty-wishlist-heading" className="mt-5 font-serif text-2xl font-semibold text-[#1A3325]">Your garden is waiting to grow</h2>
          <p className="mt-2 max-w-sm text-sm leading-6 text-[#68786b]">Save a few favourites while you browse, and they&apos;ll be right here when you return.</p>
          <Link href="/shop" className="mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#1A3325] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#294735]">Discover plants <ArrowRight className="size-4" aria-hidden="true" /></Link>
        </section>
      )}
    </main>
  )
}
