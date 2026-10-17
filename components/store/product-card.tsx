'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Check, Droplets, Heart, ShoppingBag, Star, Sun } from 'lucide-react'
import { useCart } from './cart-context'
import { formatINR, type Product } from './products'

const careLabel = { 1: 'Easy care', 2: 'Moderate care', 3: 'Needs attention' } as const

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart()
  const [sizeIndex, setSizeIndex] = useState(1)
  const [added, setAdded] = useState(false)
  const [saved, setSaved] = useState(false)
  const size = product.sizes[sizeIndex]

  function handleAdd() {
    addItem()
    setAdded(true)
    setTimeout(() => setAdded(false), 1600)
  }

  return (
    <article className="group flex h-full flex-col">
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-[#e9dcc8]">
        <Image
          src={product.image}
          alt={product.alt}
          fill
          sizes="(min-width: 1024px) 22vw, (min-width: 640px) 33vw, 50vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        <div className="absolute top-3 left-3 flex items-center gap-1.5 rounded-md bg-card/90 py-1 pr-2 pl-1.5 font-mono text-[10px] font-medium tracking-wider text-foreground/70 backdrop-blur-sm">
          <span className="size-1.5 rounded-full border border-foreground/40" aria-hidden="true" />
          {'NO. '}
          {product.tag}
        </div>

        <button
          type="button"
          onClick={() => setSaved((s) => !s)}
          aria-pressed={saved}
          aria-label={saved ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`}
          className="absolute top-2.5 right-2.5 flex size-9 items-center justify-center rounded-full bg-card/90 backdrop-blur-sm transition-colors hover:bg-card"
        >
          <Heart className={`size-4 transition-colors ${saved ? 'fill-accent text-accent' : 'text-foreground'}`} aria-hidden="true" />
        </button>

        {product.badge && (
          <span className="absolute bottom-3 left-3 rounded-full bg-primary px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-primary-foreground sm:text-[11px]">
            {product.badge}
          </span>
        )}

        <button
          type="button"
          onClick={handleAdd}
          className="absolute right-3 bottom-3 hidden h-10 items-center gap-2 rounded-full bg-foreground px-4 text-sm font-semibold text-background opacity-0 shadow-lg transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 focus-visible:opacity-100 translate-y-2 lg:inline-flex"
        >
          {added ? <Check className="size-4" aria-hidden="true" /> : <ShoppingBag className="size-4" aria-hidden="true" />}
          {added ? 'Added' : 'Quick add'}
        </button>
      </div>

      <div className="flex flex-1 flex-col pt-4">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="truncate font-serif text-lg leading-tight font-medium sm:text-xl">{product.name}</h3>
            <p className="mt-0.5 truncate text-xs text-muted-foreground italic sm:text-sm">{product.botanical}</p>
          </div>
          <span className="flex shrink-0 items-center gap-1 pt-1 text-xs font-semibold sm:text-sm">
            <Star className="size-3.5 fill-accent text-accent" aria-hidden="true" />
            {product.rating}
            <span className="hidden font-normal text-muted-foreground sm:inline">({product.reviews})</span>
          </span>
        </div>

        <ul className="mt-3 flex flex-wrap gap-1.5 text-[11px] font-medium text-secondary-foreground sm:text-xs">
          <li className="inline-flex items-center gap-1 rounded-full bg-secondary px-2 py-1">
            <Sun className="size-3" aria-hidden="true" />
            {product.light}
          </li>
          <li className="inline-flex items-center gap-1 rounded-full bg-secondary px-2 py-1">
            <Droplets className="size-3" aria-hidden="true" />
            {careLabel[product.care]}
          </li>
        </ul>

        <div className="mt-auto flex flex-wrap items-end justify-between gap-3 pt-4">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-base font-semibold sm:text-lg">{formatINR(size.price)}</span>
              {size.mrp && <span className="text-xs text-muted-foreground line-through sm:text-sm">{formatINR(size.mrp)}</span>}
            </div>
          </div>
          <fieldset className="flex items-center gap-1">
            <legend className="sr-only">Choose size for {product.name}</legend>
            {product.sizes.map((s, i) => (
              <label
                key={s.label}
                className={`flex size-7 cursor-pointer items-center justify-center rounded-full border text-[11px] font-semibold transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring ${
                  i === sizeIndex
                    ? 'border-foreground bg-foreground text-background'
                    : 'border-border text-foreground hover:border-foreground/40'
                }`}
              >
                <input
                  type="radio"
                  name={`size-${product.id}`}
                  value={s.label}
                  checked={i === sizeIndex}
                  onChange={() => setSizeIndex(i)}
                  className="sr-only"
                />
                {s.label}
              </label>
            ))}
          </fieldset>
        </div>

        <button
          type="button"
          onClick={handleAdd}
          className="mt-3 inline-flex h-11 w-full items-center justify-center gap-2 rounded-full border border-foreground/15 text-sm font-semibold transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground lg:hidden"
        >
          {added ? <Check className="size-4" aria-hidden="true" /> : <ShoppingBag className="size-4" aria-hidden="true" />}
          {added ? 'Added to cart' : 'Add to cart'}
        </button>
        <span className="sr-only" aria-live="polite">{added ? `${product.name} added to cart` : ''}</span>
      </div>
    </article>
  )
}
