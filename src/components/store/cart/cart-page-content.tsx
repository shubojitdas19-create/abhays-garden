'use client'

import Link from 'next/link'
import { ArrowLeft, Leaf, ShoppingBag } from 'lucide-react'
import { useCart } from '@/components/store/cart-context'
import { CartItemsList } from '@/components/store/cart/cart-items-list'
import { CartOrderSummary } from '@/components/store/cart/cart-order-summary'

export function CartPageContent() {
  const { items, count } = useCart()

  return (
    <main className="min-h-[70vh] bg-[#f7f5ef] px-4 pb-12 pt-7 sm:px-6 sm:pt-10 lg:px-10 lg:pb-20">
      <div className="mx-auto max-w-6xl">
        <Link href="/shop" className="inline-flex min-h-10 items-center gap-2 text-sm font-semibold text-[#526455] transition-colors hover:text-[#1A3325] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1A3325]">
          <ArrowLeft className="size-4" aria-hidden="true" /> Continue shopping
        </Link>
        <div className="mt-5 flex flex-wrap items-end justify-between gap-3 border-b border-[#e3e0d7] pb-5 sm:mt-7 sm:pb-7">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#68786b]">Abhay&apos;s Roof Garden</p>
            <h1 className="mt-1 font-serif text-3xl font-semibold tracking-tight text-[#1A3325] sm:text-4xl">Your Plant Bag</h1>
          </div>
          <p className="text-sm font-medium text-[#68786b]">{count} {count === 1 ? 'item' : 'items'}</p>
        </div>

        {items.length === 0 ? (
          <section className="mx-auto flex max-w-lg flex-col items-center px-5 py-16 text-center sm:py-24" aria-labelledby="empty-cart-title">
            <span className="relative flex size-24 items-center justify-center rounded-full bg-[#e9eee5] text-[#1A3325]">
              <ShoppingBag className="size-10" aria-hidden="true" />
              <Leaf className="absolute -right-1 -top-1 size-7 rotate-12 rounded-full bg-[#f7f5ef] p-1 text-[#527358]" aria-hidden="true" />
            </span>
            <h2 id="empty-cart-title" className="mt-6 font-serif text-2xl font-semibold text-[#1A3325]">Your bag is empty</h2>
            <p className="mt-2 max-w-sm text-sm leading-6 text-[#68786b]">A little greenery can make a home feel like yours. Find your next plant friend.</p>
            <Link href="/shop" className="mt-6 inline-flex min-h-12 items-center justify-center rounded-full bg-[#1A3325] px-7 text-sm font-semibold text-white transition-colors hover:bg-[#294735]">Start shopping</Link>
          </section>
        ) : (
          <>
            <div className="mt-6 grid items-start gap-6 lg:mt-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-8">
              <section aria-labelledby="cart-items-heading">
                <h2 id="cart-items-heading" className="sr-only">Items in your bag</h2>
                <CartItemsList items={items} />
              </section>
              <aside className="lg:sticky lg:top-28">
                <CartOrderSummary />
              </aside>
            </div>
          </>
        )}
      </div>
    </main>
  )
}
