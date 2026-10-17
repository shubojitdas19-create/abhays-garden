'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { ProductCard } from './product-card'
import { filters, products, type Filter } from './products'

export function Bestsellers() {
  const [active, setActive] = useState<Filter>('all')
  const visible = products.filter((p) => p.filters.includes(active))

  return (
    <section aria-labelledby="bestsellers-heading" className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="flex items-center gap-3 font-mono text-xs font-medium tracking-widest text-accent uppercase">
              <span>02</span>
              <span className="h-px w-8 bg-accent" aria-hidden="true" />
              <span>The Bestsellers</span>
            </p>
            <h2
              id="bestsellers-heading"
              className="mt-4 font-serif text-4xl leading-[1.05] font-medium tracking-tight text-balance sm:text-5xl lg:text-6xl"
            >
              Rooftop-raised, <em className="font-normal text-primary italic">home-approved.</em>
            </h2>
          </div>
          <p className="max-w-sm text-base leading-relaxed text-muted-foreground text-pretty">
            Every plant here has spent at least 90 days growing under the sun on our rooftop before it ever reaches your door.
          </p>
        </div>

        <div className="no-scrollbar -mx-4 mt-10 overflow-x-auto px-4 sm:mx-0 sm:px-0">
          <div role="tablist" aria-label="Filter bestsellers" className="flex w-max gap-2">
            {filters.map((f) => {
              const count = products.filter((p) => p.filters.includes(f.id)).length
              const isActive = active === f.id
              return (
                <button
                  key={f.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls="bestsellers-grid"
                  onClick={() => setActive(f.id)}
                  className={`inline-flex h-10 items-center gap-2 rounded-full border px-4 text-sm font-medium whitespace-nowrap transition-colors ${
                    isActive
                      ? 'border-primary bg-primary text-primary-foreground'
                      : 'border-border bg-background text-foreground hover:border-foreground/30'
                  }`}
                >
                  {f.label}
                  <span className={`text-xs tabular-nums ${isActive ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                    {count}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-8 lg:flex-row lg:gap-6">
          <FeatureCard />
          <ul
            id="bestsellers-grid"
            role="tabpanel"
            className="grid flex-1 grid-cols-2 gap-x-3 gap-y-10 sm:gap-x-5 md:grid-cols-3"
          >
            {visible.map((product) => (
              <li key={product.id}>
                <ProductCard product={product} />
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-14 flex flex-col items-center gap-4 border-t border-border pt-10 sm:flex-row sm:justify-between">
          <p className="text-sm text-muted-foreground">
            Showing <span className="font-semibold text-foreground">{visible.length}</span> of 268 plants in the nursery
          </p>
          <a
            href="#"
            className="group inline-flex h-12 items-center gap-2 rounded-full bg-foreground px-6 text-sm font-semibold text-background transition-colors hover:bg-primary"
          >
            Explore the full nursery
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  )
}

function FeatureCard() {
  return (
    <a
      href="#"
      className="group relative flex min-h-[460px] shrink-0 flex-col justify-between overflow-hidden rounded-3xl bg-primary p-6 text-primary-foreground sm:min-h-[520px] lg:w-[34%] lg:p-8"
    >
      <Image
        src="/images/fiddle-leaf.png"
        alt="Fiddle leaf fig in a cream planter on a sunlit rooftop terrace"
        fill
        sizes="(min-width: 1024px) 34vw, 100vw"
        className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-primary/70 via-primary/10 to-primary/90" aria-hidden="true" />

      <div className="relative flex items-start justify-between gap-4">
        <div>
          <p className="font-mono text-[11px] tracking-widest uppercase opacity-80">Plant of the month</p>
          <p className="mt-1 font-serif text-sm italic opacity-80">October edition</p>
        </div>
        <span className="flex size-11 items-center justify-center rounded-full bg-primary-foreground text-primary transition-transform duration-300 group-hover:rotate-45">
          <ArrowUpRight className="size-5" aria-hidden="true" />
        </span>
      </div>

      <div className="relative">
        <h3 className="font-serif text-4xl leading-none font-medium tracking-tight sm:text-5xl">
          Fiddle Leaf <em className="font-normal italic">Fig</em>
        </h3>
        <p className="mt-3 max-w-xs text-sm leading-relaxed opacity-85">
          Statement foliage, five feet tall, grown for 14 months on our terrace. Only 12 available this season.
        </p>
        <div className="mt-6 flex items-center justify-between border-t border-primary-foreground/20 pt-4">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-semibold">₹2,499</span>
            <span className="text-sm line-through opacity-60">₹3,199</span>
          </div>
          <span className="text-sm font-semibold underline decoration-primary-foreground/40 underline-offset-4 group-hover:decoration-primary-foreground">
            Shop now
          </span>
        </div>
      </div>
    </a>
  )
}
