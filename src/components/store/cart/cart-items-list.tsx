'use client'

import Image from 'next/image'
import { Minus, Plus, Trash2 } from 'lucide-react'
import { useCart } from '@/components/store/cart-context'
import type { CartItem } from '@/lib/store/cart-store'

const formatPrice = (value: number) => `₹${value.toLocaleString('en-IN')}`

export function CartItemsList({ items }: { items: CartItem[] }) {
  const { updateQuantity, removeItem } = useCart()
  const groupedItems = items.reduce<Record<string, CartItem[]>>((groups, item) => {
    ;(groups[item.nurseryName] ??= []).push(item)
    return groups
  }, {})

  return (
    <div className="flex flex-col gap-8">
      {Object.entries(groupedItems).map(([nursery, nurseryItems], groupIndex) => (
        <section key={nursery} aria-label={`Items from ${nursery}`}>
          <div className="mb-4 flex items-center gap-3">
            <span className="flex size-8 items-center justify-center rounded-full bg-[#edf1e9] text-xs font-semibold text-[#1A3325]">{groupIndex + 1}</span>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#68786b]">Shipment {groupIndex + 1}</p>
              <h3 className="text-sm font-semibold text-[#1A3325]">From {nursery}</h3>
            </div>
          </div>
          <ul className="flex flex-col divide-y divide-[#e7e4dc] rounded-2xl border border-[#e7e4dc] bg-white px-4 sm:px-5">
            {nurseryItems.map((item) => (
              <li key={`${item.productId}-${item.size}-${item.pot}`} className="flex gap-3 py-4 sm:gap-5 sm:py-5">
                <div className="relative size-[76px] shrink-0 overflow-hidden rounded-xl bg-[#edf1e9] sm:size-24">
                  <Image src={item.image} alt={item.productName} fill sizes="(min-width: 640px) 96px, 76px" className="object-cover" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <h4 className="truncate text-sm font-semibold text-[#1A3325] sm:text-base">{item.productName}</h4>
                      <p className="mt-1 text-xs text-[#68786b]">Size: {item.size} <span aria-hidden="true">·</span> Pot: {item.pot}</p>
                      <p className="mt-1 text-xs text-[#68786b]">{formatPrice(item.price)} each</p>
                    </div>
                    <button type="button" onClick={() => removeItem(item.productId, item.size, item.pot)} aria-label={`Remove ${item.productName}`} className="-mr-2 -mt-2 inline-flex size-10 shrink-0 items-center justify-center rounded-full text-[#879187] transition-colors hover:bg-[#f0eee7] hover:text-[#9b4938] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1A3325]">
                      <Trash2 className="size-4" aria-hidden="true" />
                    </button>
                  </div>
                  <div className="mt-3 flex items-center justify-between gap-2">
                    <div className="inline-flex items-center rounded-full border border-[#e3e2d9] bg-[#fbfaf6]" aria-label={`Quantity for ${item.productName}`}>
                      <button type="button" onClick={() => updateQuantity(item.productId, item.size, item.pot, item.quantity - 1)} aria-label={`Decrease ${item.productName} quantity`} className="inline-flex size-9 items-center justify-center rounded-full text-[#1A3325] hover:bg-[#f0eee7] focus-visible:outline-2 focus-visible:outline-[#1A3325]"><Minus className="size-3.5" aria-hidden="true" /></button>
                      <span className="min-w-7 text-center text-xs font-semibold text-[#1A3325]" aria-live="polite">{item.quantity}</span>
                      <button type="button" onClick={() => updateQuantity(item.productId, item.size, item.pot, item.quantity + 1)} aria-label={`Increase ${item.productName} quantity`} className="inline-flex size-9 items-center justify-center rounded-full text-[#1A3325] hover:bg-[#f0eee7] focus-visible:outline-2 focus-visible:outline-[#1A3325]"><Plus className="size-3.5" aria-hidden="true" /></button>
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
  )
}
