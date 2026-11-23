'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { LockKeyhole, Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react'
import { useCart } from '@/components/store/cart-context'

const FREE_DELIVERY_THRESHOLD = 999
const formatPrice = (value: number) => `₹${value.toLocaleString('en-IN')}`

export function CartDrawer() {
  const {
    items,
    count,
    subtotalPrice,
    shippingFee,
    isCartOpen,
    toggleCart,
    updateQuantity,
    removeItem,
  } = useCart()
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

  const groupedItems = items.reduce<Record<string, typeof items>>((groups, item) => {
    ;(groups[item.nurseryName] ??= []).push(item)
    return groups
  }, {})
  const amountToFreeDelivery = Math.max(0, FREE_DELIVERY_THRESHOLD - subtotalPrice)
  const deliveryProgress = Math.min(100, (subtotalPrice / FREE_DELIVERY_THRESHOLD) * 100)

  return (
    <div className="fixed inset-0 z-[70] flex justify-end" onMouseDown={(event) => {
      if (event.target === event.currentTarget) toggleCart()
    }}>
      <div className="absolute inset-0 bg-[#13251c]/45 backdrop-blur-[2px]" aria-hidden="true" />
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
            <div className="border-b border-[#e7e4dc] px-5 py-4 sm:px-7">
              <div className="flex items-center justify-between gap-3 text-sm">
                <p className="text-[#34483a]">{amountToFreeDelivery > 0 ? <>Add <strong>{formatPrice(amountToFreeDelivery)}</strong> more for free delivery</> : <strong className="text-[#1A3325]">You unlocked free delivery</strong>}</p>
                <span className="shrink-0 font-semibold text-[#1A3325]">{Math.round(deliveryProgress)}%</span>
              </div>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-[#e5e8df]" role="progressbar" aria-label="Free delivery progress" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(deliveryProgress)}>
                <div className="h-full rounded-full bg-[#527358] transition-[width] duration-500" style={{ width: `${deliveryProgress}%` }} />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-5 sm:px-7">
              <div className="flex flex-col gap-7">
                {Object.entries(groupedItems).map(([nursery, nurseryItems], groupIndex) => (
                  <section key={nursery} aria-label={`Items from ${nursery}`}>
                    <p className="mb-3 text-xs font-bold uppercase tracking-[0.14em] text-[#68786b]">Shipment {groupIndex + 1} · From {nursery}</p>
                    <ul className="flex flex-col gap-4">
                      {nurseryItems.map((item) => (
                        <li key={`${item.productId}-${item.size}-${item.pot}`} className="flex gap-3 border-b border-[#e7e4dc] pb-4 last:border-0 last:pb-0">
                          <div className="relative size-20 shrink-0 overflow-hidden rounded-xl bg-[#edf1e9]">
                            <Image src={item.image} alt={item.productName} fill sizes="80px" className="object-cover" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-start justify-between gap-2">
                              <div className="min-w-0">
                                <h3 className="truncate text-sm font-semibold text-[#1A3325]">{item.productName}</h3>
                                <p className="mt-1 text-xs text-[#68786b]">Size: {item.size} · Pot: {item.pot}</p>
                              </div>
                              <button type="button" onClick={() => removeItem(item.productId, item.size, item.pot)} aria-label={`Remove ${item.productName}`} className="rounded-full p-1.5 text-[#879187] transition-colors hover:bg-[#f0eee7] hover:text-[#9b4938]">
                                <Trash2 className="size-4" />
                              </button>
                            </div>
                            <div className="mt-3 flex items-center justify-between">
                              <div className="inline-flex items-center rounded-full border border-[#e3e2d9] bg-white">
                                <button type="button" onClick={() => updateQuantity(item.productId, item.size, item.pot, item.quantity - 1)} aria-label={`Decrease ${item.productName} quantity`} className="inline-flex size-8 items-center justify-center rounded-full text-[#1A3325] hover:bg-[#f0eee7]"><Minus className="size-3.5" /></button>
                                <span className="min-w-6 text-center text-xs font-semibold" aria-label={`Quantity ${item.quantity}`}>{item.quantity}</span>
                                <button type="button" onClick={() => updateQuantity(item.productId, item.size, item.pot, item.quantity + 1)} aria-label={`Increase ${item.productName} quantity`} className="inline-flex size-8 items-center justify-center rounded-full text-[#1A3325] hover:bg-[#f0eee7]"><Plus className="size-3.5" /></button>
                              </div>
                              <span className="text-sm font-bold text-[#1A3325]">{formatPrice(item.price * item.quantity)}</span>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </section>
                ))}
              </div>
            </div>

            <footer className="border-t border-[#e7e4dc] bg-white px-5 py-5 sm:px-7">
              <div className="flex flex-col gap-2.5 text-sm">
                <div className="flex justify-between text-[#5c6b60]"><span>Subtotal</span><span>{formatPrice(subtotalPrice)}</span></div>
                <div className="flex justify-between text-[#5c6b60]"><span>Eco-packaging</span><span className="font-semibold text-[#527358]">Free</span></div>
                <div className="flex justify-between text-[#5c6b60]"><span>Estimated delivery</span><span>{shippingFee === 0 ? 'Free' : formatPrice(shippingFee)}</span></div>
                <div className="mt-2 flex justify-between border-t border-[#e7e4dc] pt-3 text-base font-bold text-[#1A3325]"><span>Total</span><span>{formatPrice(subtotalPrice + shippingFee)}</span></div>
              </div>
              <Link href="/checkout" onClick={toggleCart} className="mt-4 flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#1A3325] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#294735]">
                <LockKeyhole className="size-4" aria-hidden="true" /> Proceed to checkout
              </Link>
              <p className="mt-2 text-center text-xs text-[#68786b]">100% safe checkout</p>
            </footer>
          </>
        )}
      </section>
    </div>
  )
}
