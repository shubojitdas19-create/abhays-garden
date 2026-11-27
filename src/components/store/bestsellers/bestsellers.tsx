'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { ProductCard } from '@/components/store/product-card'   
import { filters, formatINR, products, type Filter } from '@/components/store/products'
import { useInView } from '@/hooks/use-in-view'
import Link from 'next/link'

export function Bestsellers() {
  const [active, setActive] = useState<Filter>('all')
  
  // Initialize scroll animation hooks
  const { ref: headerRef, isInView: headerInView } = useInView()
  const { ref: featureRef, isInView: featureInView } = useInView({ threshold: 0.2 })
  const { ref: gridRef, isInView: gridInView } = useInView({ threshold: 0.1 })
  const { ref: bottomRef, isInView: bottomInView } = useInView()
  
  const filtered = products.filter((p) => p.filters.includes(active))

  let displayList = [...filtered]
  if (displayList.length > 0 && displayList.length < 8) {
    const needed = 8 - displayList.length
    for (let i = 0; i < needed; i++) {
      displayList.push({ 
        ...displayList[i % filtered.length], 
        id: `${displayList[i % filtered.length].id}-pad-${i}` 
      })
    }
  }
  
  displayList = displayList.slice(0, 8)

  return (
    // Added overflow-hidden to prevent scrollbars during the slide animations
    <section id="bestsellers" aria-labelledby="bestsellers-heading" className="w-full scroll-mt-20 overflow-hidden border-t border-border bg-card px-4 pt-8 pb-8 sm:px-6 lg:px-10 xl:px-14 lg:pt-12 lg:pb-12">
      <div className="mx-auto w-full max-w-[100rem]">
        
        {/* Header Animation Trigger */}
        <div 
          ref={headerRef}
          className={`flex flex-col lg:flex-row lg:items-end lg:justify-between transition-all duration-1000 ease-out ${headerInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#1A3325]/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-[#1A3325] sm:text-xs">
              <span className="size-1.5 rounded-full bg-[#E5A849]" aria-hidden="true" />
              Rooftop-Raised, Home-Approved
            </div>
            
            <h2
              id="bestsellers-heading"
              className="mt-3 font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl"
            >
              Bestsellers
            </h2>
            <p className="mt-2.5 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              Every plant here has spent at least 90 days growing under the sun on our rooftop before it ever reaches your door.
            </p>
          </div>
        </div>

        <div className="no-scrollbar -mx-4 mt-5 overflow-x-auto px-4 sm:mx-0 sm:mt-6 sm:px-0">
          <div role="tablist" aria-label="Filter bestsellers" className="flex w-max gap-2 pb-1">
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
                  className={`inline-flex h-9 items-center gap-2 rounded-full border px-4 text-sm font-semibold whitespace-nowrap transition-colors sm:h-10 ${
                    isActive
                      ? 'border-[#1A3325] bg-[#1A3325] text-white'
                      : 'border-border bg-background text-foreground hover:border-foreground/30'
                  }`}
                >
                  {f.label}
                  <span className={`text-xs tabular-nums ${isActive ? 'text-white/80' : 'text-muted-foreground'}`}>
                    {count}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-8 lg:flex-row lg:gap-6 xl:gap-8">
          
          {/* Feature Card Animation Trigger (Slides from left on desktop) */}
          <div 
            ref={featureRef} 
            className={`w-full lg:w-[34%] xl:w-[28%] transition-all duration-1000 ease-out delay-100 ${featureInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}
          >
            <FeatureCard />
          </div>
          
          {/* Grid Animation Trigger (Staggered cascading fade up) */}
          <ul
            ref={gridRef}
            id="bestsellers-grid"
            role="tabpanel"
            className="grid flex-1 grid-cols-2 gap-x-3 gap-y-10 sm:gap-x-5 md:grid-cols-3 xl:grid-cols-4"
          >
            {displayList.map((product, index) => (
              <li 
                key={product.id} 
                className={`transition-all duration-700 ease-out 
                  ${index >= 6 ? "hidden xl:block" : ""}
                  ${gridInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}
                `}
                style={{ transitionDelay: `${index * 100 + 200}ms` }}
              >
                <ProductCard product={product} />
              </li>
            ))}
          </ul>
        </div>

        {/* Bottom Section Animation Trigger */}
        <div 
          ref={bottomRef}
          className={`mt-8 flex flex-col items-center justify-center gap-6 border-t border-border pt-6 sm:mt-10 sm:pt-8 transition-all duration-1000 ease-out ${bottomInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="flex flex-col items-center gap-3 text-center">
            <p className="text-sm font-medium text-muted-foreground">
              You've viewed <span className="font-bold text-foreground xl:hidden">{Math.min(displayList.length, 6)}</span>
              <span className="hidden font-bold text-foreground xl:inline">{displayList.length}</span> of <span className="font-bold text-foreground">268</span> products
            </p>
            <div className="h-1 w-40 overflow-hidden rounded-full bg-border/60 sm:w-56">
              {/* Progress bar line dynamically fills up when scrolled into view */}
              <div className="h-full rounded-full bg-[#1A3325] transition-all duration-1000 ease-out" style={{ width: bottomInView ? '15%' : '0%' }} />
            </div>
          </div>
          
          <Link
            href="/shop"
            className="group inline-flex h-12 min-w-[220px] items-center justify-center gap-2 rounded-full border-2 border-[#1A3325] bg-transparent px-8 text-sm font-bold text-[#1A3325] transition-all hover:bg-[#1A3325] hover:text-white sm:h-14 sm:text-base"
          >
            Explore all plants
          </Link>
        </div>
      </div>
    </section>
  )
}

function FeatureCard() {
  const featuredProduct = products.find((product) => product.id === 'fiddle-leaf-fig') ?? products[0]
  const featuredSize = featuredProduct.sizes.find((size) => size.label === 'M') ?? featuredProduct.sizes[0]

  return (
    <Link
      href={`/shop/${featuredProduct.slug}`}
      className="group relative flex min-h-[460px] h-full w-full shrink-0 flex-col justify-between overflow-hidden rounded-3xl bg-primary p-6 text-primary-foreground sm:min-h-[520px] lg:p-8"
      aria-label={`Shop ${featuredProduct.name}`}
    >
      <Image
        src={featuredProduct.image}
        alt={`${featuredProduct.name} plant`}
        fill
        sizes="(min-width: 1024px) 34vw, 100vw"
        className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
      />
      
      <div className="absolute inset-0 bg-gradient-to-t from-[#13261C]/95 via-[#13261C]/60 to-[#13261C]/10 sm:bg-gradient-to-b sm:from-primary/70 sm:via-primary/10 sm:to-primary/90" aria-hidden="true" />

      <div className="relative flex items-start justify-between gap-4 drop-shadow-sm">
        <div>
          <p className="font-mono text-[11px] tracking-widest uppercase opacity-90 text-white">Plant of the month</p>
          <p className="mt-1 font-serif text-sm italic opacity-90 text-white">Loved by plant people</p>
        </div>
        <span className="flex size-11 items-center justify-center rounded-full bg-white text-[#1A3325] shadow-lg transition-transform duration-300 group-hover:rotate-45">
          <ArrowUpRight className="size-5" aria-hidden="true" />
        </span>
      </div>

      <div className="relative drop-shadow-sm">
        <h3 className="font-serif text-4xl leading-none font-medium tracking-tight text-white sm:text-5xl">
          {featuredProduct.name}
        </h3>
        <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/90">
          {featuredProduct.description}
        </p>
        <div className="mt-6 flex items-center justify-between border-t border-white/30 pt-4">
          <div className="flex items-baseline gap-2 text-white">
            <span className="text-2xl font-semibold">{formatINR(featuredSize.price)}</span>
            {featuredSize.mrp && <span className="text-sm line-through opacity-70">{formatINR(featuredSize.mrp)}</span>}
          </div>
          <span className="text-sm font-semibold text-white underline decoration-white/40 underline-offset-4 group-hover:decoration-white">
            Shop now
          </span>
        </div>
      </div>
    </Link>
  )
}
