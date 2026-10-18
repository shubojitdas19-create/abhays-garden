'use client'

import Image from 'next/image'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { useInView } from '@/hooks/use-in-view'

const categories = [
  { name: 'Indoor Plants', count: 120, image: '/images/cat-indoor.png', alt: 'Snake plant in terracotta pot' },
  { name: 'Outdoor Plants', count: 85, image: '/images/cat-outdoor1.png', alt: 'Lush outdoor foliage plants' },
  { name: 'Flowering', count: 64, image: '/images/cat-flowering.png', alt: 'Pink bougainvillea in terracotta pot' },
  { name: 'Succulents', count: 48, image: '/images/cat-succulents.png', alt: 'Succulents in small ceramic pots' },
  { name: 'Herbs & Edibles', count: 36, image: '/images/cat-herbs.png', alt: 'Basil, tulsi and mint in terracotta pots' },
  { name: 'Climbers & Creepers', count: 24, image: '/images/cat-climbers1.png', alt: 'Money plant trailing from a hanging pot' },
  { name: 'Pots & Planters', count: 150, image: '/images/cat-pots1.png', alt: 'Various ceramic and terracotta pots' },
  { name: 'Gifting Sets', count: 18, image: '/images/cat-gifting1.png', alt: 'Plant wrapped in kraft paper with a ribbon' },
]

export function ShopCategories() {
  // Initialize scroll animation hooks
  const { ref: headerRef, isInView: headerInView } = useInView()
  const { ref: gridRef, isInView: gridInView } = useInView({ threshold: 0.15 })

  return (
    // Added overflow-hidden to prevent scrollbars during slide animations
    <section aria-labelledby="categories-heading" className="w-full overflow-hidden px-4 pt-8 pb-4 sm:px-6 lg:px-10 xl:px-14 lg:pt-10">
      
      <div className="mx-auto w-full max-w-[100rem]">
        {/* Header Animation Trigger */}
        <div 
          ref={headerRef}
          className={`flex items-end justify-between gap-4 transition-all duration-1000 ease-out ${headerInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          <h2 id="categories-heading" className="font-serif text-2xl font-medium tracking-tight sm:text-3xl">
            Shop by category
          </h2>
          <a href="#" className="group inline-flex items-center gap-1 text-sm font-semibold text-primary transition-colors hover:text-[#1A3325]">
            View all
            <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
          </a>
        </div>
        
        {/* Grid Animation Trigger */}
        <ul 
          ref={gridRef}
          className="no-scrollbar -mx-4 mt-5 flex snap-x snap-mandatory scroll-px-4 gap-3 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-4 sm:gap-x-4 sm:gap-y-8 lg:gap-x-6 xl:gap-x-8 sm:overflow-visible sm:px-0"
        >
          {categories.map((cat, index) => (
            <li 
              key={cat.name} 
              // Staggered cascade animation: Slides from right on mobile, up from bottom on desktop
              className={`w-[42%] shrink-0 snap-start sm:w-auto transition-all duration-700 ease-out ${
                gridInView ? 'opacity-100 translate-x-0 sm:translate-y-0' : 'opacity-0 translate-x-12 sm:translate-x-0 sm:translate-y-12'
              }`}
              style={{ transitionDelay: `${index * 75}ms` }}
            >
              <a href="#" className="group block">
                <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-muted shadow-sm transition-shadow hover:shadow-md">
                  <Image
                    src={cat.image}
                    alt={cat.alt}
                    fill
                    sizes="(min-width: 640px) 25vw, 42vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="mt-3 flex items-center justify-between gap-2">
                  <div>
                    <h3 className="text-sm font-semibold text-foreground sm:text-base">{cat.name}</h3>
                    <p className="text-xs text-muted-foreground sm:text-sm">{cat.count} products</p>
                  </div>
                  <span className="hidden size-8 items-center justify-center rounded-full border border-border transition-colors group-hover:border-[#1A3325] group-hover:bg-[#1A3325] group-hover:text-white sm:flex">
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </span>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}