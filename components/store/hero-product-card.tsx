'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Check, Plus, Star } from 'lucide-react'
import { useCart } from './cart-context'

export function HeroProductCard() {
  const { addItem } = useCart()
  const [added, setAdded] = useState(false)

  function handleAdd() {
    addItem()
    setAdded(true)
    setTimeout(() => setAdded(false), 1600)
  }

  return (
    <article className="flex w-full items-center gap-3 rounded-2xl border border-border/70 bg-card/95 p-2.5 pr-3 shadow-xl shadow-primary/10 backdrop-blur-md sm:w-80">
      <div className="relative size-18 shrink-0 overflow-hidden rounded-xl bg-muted">
        <Image src="/images/monstera.png" alt="Monstera Deliciosa in a cream ceramic pot" fill sizes="72px" className="object-cover" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-accent">Bestseller</p>
        <h3 className="truncate font-serif text-base font-semibold leading-tight">Monstera Deliciosa</h3>
        <div className="mt-1 flex items-center gap-2">
          <span className="text-sm font-semibold">₹899</span>
          <span className="text-xs text-muted-foreground line-through">₹1,199</span>
          <span className="flex items-center gap-0.5 text-xs text-muted-foreground">
            <Star className="size-3 fill-accent text-accent" aria-hidden="true" />
            4.9
          </span>
        </div>
      </div>
      <button
        type="button"
        onClick={handleAdd}
        aria-label={added ? 'Added Monstera Deliciosa to cart' : 'Add Monstera Deliciosa to cart'}
        className="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform hover:scale-105 active:scale-95"
      >
        {added ? <Check className="size-4.5" /> : <Plus className="size-4.5" />}
      </button>
      <span className="sr-only" aria-live="polite">{added ? 'Added to cart' : ''}</span>
    </article>
  )
}
