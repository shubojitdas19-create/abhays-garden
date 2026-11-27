'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { ShoppingBag, X } from 'lucide-react'
import { useCart } from '@/components/store/cart-context'
import { CartItemsList } from '@/components/store/cart/cart-items-list'
import { CartOrderSummary } from '@/components/store/cart/cart-order-summary'

export function CartDrawer() {
  const { items, count, isCartOpen, toggleCart } = useCart()
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!isCartOpen) return

    const previousOverflow = document.body.style.overflow
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') toggleCart()
    }

    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', onKeyDown)
    closeButtonRef.current?.focus()

    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [isCartOpen, toggleCart])

  if (!isCartOpen) return null

  return (
    <div className="fixed inset-0 z-[70] flex justify-end">
      <button type="button" className="absolute inset-0 cursor-default bg-[#13251c]/45 backdrop-blur-[2px]" onClick={toggleCart} aria-label="Close cart drawer" />
      <section
        id="cart-drawer"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-drawer-title"
        className="relative flex h-full w-full max-w-md flex-col bg-[#fbfaf6] shadow-2xl animate-in slide-in-from-right duration-300"
      >
        <header className="flex items-center justify-between border-b border-[#e7e4dc] px-5 py-5 sm:px-7">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#68786b]">Abhay&apos;s Roof Garden</p>
            <h2 id="cart-drawer-title" className="mt-1 font-serif text-2xl font-semibold text-[#1A3325]">
              Your Plant Bag <span className="font-sans text-base font-medium text-[#68786b]">({count})</span>
            </h2>
          </div>
          <button ref={closeButtonRef} type="button" onClick={toggleCart} aria-label="Close cart" className="inline-flex size-10 items-center justify-center rounded-full border border-[#e7e4dc] text-[#1A3325] transition-colors hover:bg-[#f0eee7]">
            <X className="size-5" />
          </button>
        </header>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
            <span className="flex size-20 items-center justify-center rounded-full bg-[#edf1e9] text-[#1A3325]">
              <ShoppingBag className="size-9" aria-hidden="true" />
            </span>
            <h3 className="mt-6 font-serif text-2xl font-semibold text-[#1A3325]">Your bag is empty</h3>
            <p className="mt-2 max-w-xs text-sm leading-6 text-[#68786b]">A little greenery can make a home feel like yours. Find your next plant friend.</p>
            <Link href="/shop" onClick={toggleCart} className="mt-6 rounded-full bg-[#1A3325] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#294735]">Start shopping</Link>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-5 py-5 sm:px-7">
              <CartItemsList items={items} />
            </div>

            <footer className="max-h-[52vh] overflow-y-auto border-t border-[#e7e4dc] bg-white px-5 py-4 sm:px-7">
              <CartOrderSummary compact />
              <Link href="/cart" onClick={toggleCart} className="mt-3 flex min-h-10 items-center justify-center rounded-full text-sm font-semibold text-[#1A3325] underline decoration-[#a7b4a7] underline-offset-4 hover:text-[#527358]">View full cart</Link>
            </footer>
          </>
        )}
      </section>
    </div>
  )
}
