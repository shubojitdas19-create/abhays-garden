# ABHAY'S ROOF GARDEN - FRONTEND ARCHITECTURE & AI CONTEXT

> **For the AI:** This document contains the complete frontend architecture, Next.js App Router maps, custom UI components, hooks, global state, and Tailwind configuration for the "Abhay's Roof Garden" e-commerce website. Read this to understand the established design system, state management, and existing sections before generating new pages or modifying the store.

---

## Directory Structure

```text
abhays-garden
├── app
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx
│   └── shop
│       └── page.tsx
├── components
│   ├── store
│   │   ├── about
│   │   │   ├── rooftop-story.tsx
│   │   │   └── shipping-timeline.tsx
│   │   ├── accessories
│   │   │   └── accessories-row.tsx
│   │   ├── bestsellers
│   │   │   └── bestsellers.tsx
│   │   ├── cart-context.tsx
│   │   ├── categories
│   │   │   └── shop-categories.tsx
│   │   ├── hero
│   │   │   ├── hero-product-card.tsx
│   │   │   ├── hero.tsx
│   │   │   └── rooftop-stamp.tsx
│   │   ├── layout
│   │   │   ├── announcement-bar.tsx
│   │   │   ├── conditional-footer.tsx
│   │   │   ├── home-footer.tsx
│   │   │   ├── site-footer.tsx
│   │   │   └── site-header.tsx
│   │   ├── product-card.tsx
│   │   ├── products.ts
│   │   ├── quiz
│   │   │   └── plant-finder.tsx
│   │   └── reviews
│   │       └── customer-reviews.tsx
│   └── ui
│       └── button.tsx
├── hooks
│   └── use-in-view.ts
└── lib
    └── utils.ts
```



---

## Project Configurations (Tailwind, CSS Variables)

### `package.json`
```json
{
  "name": "my-project",
  "version": "0.1.0",
  "private": true,
  "packageManager": "pnpm@12.3.4",
  "scripts": {
    "dev": "next dev -p 3001 -H 0.0.0.0",
    "build": "next build",
    "start": "next start"
  },
  "dependencies": {
    "@base-ui/react": "^1.5.0",
    "@vercel/analytics": "1.6.1",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "lucide-react": "^1.16.0",
    "next": "16.4.0",
    "react": "^19",
    "react-dom": "^19",
    "shadcn": "^4.11.0",
    "tailwind-merge": "^3.3.1",
    "tw-animate-css": "^1.4.0"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4.3.3",
    "@types/node": "^24",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "postcss": "^8.5",
    "tailwindcss": "^4.3.3",
    "typescript": "5.7.3"
  }
}

```

### `src/app/globals.css`
```css
@import 'tailwindcss';
@import 'tw-animate-css';
@import 'shadcn/tailwind.css';

@custom-variant dark (&:is(.dark *));

@theme inline {
  --font-sans: var(--font-inter), ui-sans-serif, system-ui, sans-serif;
  --font-serif: var(--font-fraunces), ui-serif, Georgia, serif;
  --color-ring: var(--ring);
  --color-input: var(--input);
  --color-border: var(--border);
  --color-destructive: var(--destructive);
  --color-accent-foreground: var(--accent-foreground);
  --color-accent: var(--accent);
  --color-muted-foreground: var(--muted-foreground);
  --color-muted: var(--muted);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-secondary: var(--secondary);
  --color-primary-foreground: var(--primary-foreground);
  --color-primary: var(--primary);
  --color-popover-foreground: var(--popover-foreground);
  --color-popover: var(--popover);
  --color-card-foreground: var(--card-foreground);
  --color-card: var(--card);
  --color-foreground: var(--foreground);
  --color-background: var(--background);
  --radius-sm: calc(var(--radius) * 0.6);
  --radius-md: calc(var(--radius) * 0.8);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) * 1.4);
  --radius-2xl: calc(var(--radius) * 1.8);
  --radius-3xl: calc(var(--radius) * 2.2);
  --radius-4xl: calc(var(--radius) * 2.6);
  --color-sun: var(--sun);
  --color-forest-deep: var(--forest-deep);
  --animate-marquee: marquee 40s linear infinite;

  @keyframes marquee {
    to {
      transform: translateX(-50%);
    }
  }
}

/* Botanical palette: cream base, deep forest green, terracotta accent */
:root {
  color-scheme: light;
  --background: oklch(0.975 0.012 85);
  --foreground: oklch(0.24 0.035 155);
  --card: oklch(0.995 0.005 85);
  --card-foreground: oklch(0.24 0.035 155);
  --popover: oklch(0.995 0.005 85);
  --popover-foreground: oklch(0.24 0.035 155);
  --primary: oklch(0.36 0.07 155);
  --primary-foreground: oklch(0.975 0.012 85);
  --secondary: oklch(0.935 0.025 120);
  --secondary-foreground: oklch(0.3 0.06 155);
  --muted: oklch(0.945 0.015 85);
  --muted-foreground: oklch(0.47 0.025 150);
  --accent: oklch(0.64 0.13 45);
  --accent-foreground: oklch(0.99 0.005 85);
  --destructive: oklch(0.577 0.245 27.325);
  --border: oklch(0.89 0.018 95);
  --input: oklch(0.89 0.018 95);
  --ring: oklch(0.36 0.07 155);
  --radius: 0.75rem;
  --sun: oklch(0.86 0.1 78);
  --forest-deep: oklch(0.29 0.055 155);
}

@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground font-sans;
  }
}

@utility no-scrollbar {
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
}

```

### `next.config.mjs`
```typescript
/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig

```



---

## Core Logic, Custom Hooks & Global Data

### File: `/src/lib/utils.ts`
```typescript
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

```

### File: `/src/hooks/use-in-view.ts`
```typescript
'use client'

import { useEffect, useState, useRef } from 'react'

// Changed default triggerOnce to false so it repeats
export function useInView(options = { threshold: 0.1, triggerOnce: false }) {
  const ref = useRef<any>(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const currentRef = ref.current
    if (!currentRef) return

    const observer = new IntersectionObserver(([entry]) => {
      // This line now constantly updates the state to true or false depending on if it's on screen
      setIsInView(entry.isIntersecting)
      
      // Only stop observing if triggerOnce is explicitly set to true
      if (entry.isIntersecting && options.triggerOnce) {
        observer.unobserve(currentRef)
      }
    }, { threshold: options.threshold })

    observer.observe(currentRef)
    return () => observer.disconnect()
  }, [options.threshold, options.triggerOnce])

  return { ref, isInView }
}
```



---

## Next.js App Router (Pages & Layouts)

### Route: `/ (Homepage)`
*File: /src/app/layout.tsx*
```tsx
import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Fraunces, Inter } from 'next/font/google'
import { ConditionalFooter } from '@/components/store/layout/conditional-footer'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const fraunces = Fraunces({ subsets: ['latin'], variable: '--font-fraunces' })

export const metadata: Metadata = {
  title: "Abhay's Roof Garden — Homegrown Plants, Delivered",
  description:
    'Shop healthy, homegrown indoor plants, flowering plants, succulents and herbs from our rooftop nursery. Delivered to your door with a 7-day plant guarantee.',
  generator: 'v0.app',
  // The 'icons' block has been removed so Next.js automatically uses your favicon.ico
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#f7f3ea',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable}`}>
      <body className="flex min-h-screen flex-col antialiased">
        <div className="flex-1">
          {children}
        </div>
        
        {/* This will automatically render the SiteFooter on all pages except '/' */}
        <ConditionalFooter />
        
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
```

### Route: `/ (Homepage)`
*File: /src/app/page.tsx*
```tsx
import { AnnouncementBar } from '@/components/store/layout/announcement-bar'
import { Bestsellers } from '@/components/store/bestsellers/bestsellers'
import { CartProvider } from '@/components/store/cart-context'
import { Hero } from '@/components/store/hero/hero'
import { ShopCategories } from '@/components/store/categories/shop-categories'
import { SiteHeader } from '@/components/store/layout/site-header'
import { RooftopStory } from '@/components/store/about/rooftop-story'
import { PlantFinder } from '@/components/store/quiz/plant-finder'
import { ShippingTimeline } from '@/components/store/about/shipping-timeline'
import { CustomerReviews } from '@/components/store/reviews/customer-reviews'
import { AccessoriesRow } from '@/components/store/accessories/accessories-row'
import { HomeFooter } from '@/components/store/layout/home-footer'

export default function Home() {
  return (
    <CartProvider>
      <AnnouncementBar />
      <SiteHeader />
      <main>
        <Hero />
        <ShopCategories />
        <Bestsellers />
        <RooftopStory />
        <PlantFinder />
        <ShippingTimeline />
        <CustomerReviews />
        <AccessoriesRow />
      </main>
      <HomeFooter />
    </CartProvider>
  )
}
```

### Route: `/shop`
*File: /src/app/shop/page.tsx*
```tsx
'use client'

import { useState, useMemo, useEffect } from 'react'
import { Filter as FilterIcon, ArrowDownUp, X, Check } from 'lucide-react'
import { SiteHeader } from '@/components/store/layout/site-header'
import { CartProvider } from '@/components/store/cart-context'
import { ProductCard } from '@/components/store/product-card'
import { products, filters } from '@/components/store/products'

const sortOptions = [
  { id: 'featured', label: 'Featured' },
  { id: 'price-low', label: 'Price: Low to High' },
  { id: 'price-high', label: 'Price: High to Low' },
  { id: 'rating', label: 'Top Rated' },
]

export default function ShopPage() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [activeSort, setActiveSort] = useState('featured')
  
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false)
  const [isMobileSortOpen, setIsMobileSortOpen] = useState(false)

  useEffect(() => {
    if (isMobileFilterOpen || isMobileSortOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => { document.body.style.overflow = 'unset' }
  }, [isMobileFilterOpen, isMobileSortOpen])

  const displayProducts = useMemo(() => {
    let result = [...products]
    if (activeFilter !== 'all') {
      result = result.filter(p => p.filters.includes(activeFilter))
    }
    if (activeSort === 'price-low') {
      result.sort((a, b) => a.price - b.price)
    } else if (activeSort === 'price-high') {
      result.sort((a, b) => b.price - a.price)
    } else if (activeSort === 'rating') {
      result.sort((a, b) => (b.rating || 0) - (a.rating || 0))
    }
    return result
  }, [activeFilter, activeSort])

  return (
    <CartProvider>
      <SiteHeader />
      
      <main className="mx-auto w-full max-w-[100rem] px-4 pt-6 pb-20 sm:px-6 lg:px-10 xl:px-14 lg:pt-10 lg:pb-12">
        
        <div className="mb-6 flex items-end justify-between border-b border-gray-200 pb-5 sm:mb-8">
          <div>
            <h1 className="font-serif text-3xl font-bold tracking-tight text-[#1A3325] sm:text-4xl lg:text-5xl">
              All Plants
            </h1>
            <p className="mt-1.5 text-sm text-muted-foreground sm:text-base">
              Showing {displayProducts.length} {displayProducts.length === 1 ? 'result' : 'results'}
            </p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row lg:gap-10 xl:gap-14">
          
          {/* DESKTOP SIDEBAR */}
          <aside className="hidden w-64 shrink-0 flex-col gap-10 lg:flex">
            
            {/* Proper E-commerce Checkbox Filters */}
            <div>
              <h3 className="font-serif text-lg font-bold text-[#1A3325]">Categories</h3>
              <ul className="mt-4 space-y-3.5">
                {/* All Categories Option */}
                <li>
                  <button
                    onClick={() => setActiveFilter('all')}
                    className="group flex w-full items-center gap-3 text-left text-sm transition-colors"
                  >
                    <div className={`flex size-4.5 shrink-0 items-center justify-center rounded-[4px] border transition-colors ${
                      activeFilter === 'all' ? 'border-[#1A3325] bg-[#1A3325] text-white' : 'border-gray-300 bg-white group-hover:border-[#1A3325]'
                    }`}>
                      {activeFilter === 'all' && <Check className="size-3.5" />}
                    </div>
                    <span className={activeFilter === 'all' ? 'font-bold text-[#1A3325]' : 'text-gray-600 group-hover:text-[#1A3325]'}>
                      All Categories
                    </span>
                  </button>
                </li>
                {/* Dynamic Options */}
                {filters.map((f) => (
                  <li key={f.id}>
                    <button
                      onClick={() => setActiveFilter(f.id)}
                      className="group flex w-full items-center gap-3 text-left text-sm transition-colors"
                    >
                      <div className={`flex size-4.5 shrink-0 items-center justify-center rounded-[4px] border transition-colors ${
                        activeFilter === f.id ? 'border-[#1A3325] bg-[#1A3325] text-white' : 'border-gray-300 bg-white group-hover:border-[#1A3325]'
                      }`}>
                        {activeFilter === f.id && <Check className="size-3.5" />}
                      </div>
                      <span className={activeFilter === f.id ? 'font-bold text-[#1A3325]' : 'text-gray-600 group-hover:text-[#1A3325]'}>
                        {f.label}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Desktop Sort (Radio Style) */}
            <div>
              <h3 className="font-serif text-lg font-bold text-[#1A3325]">Sort By</h3>
              <ul className="mt-4 space-y-3.5">
                {sortOptions.map((s) => (
                  <li key={s.id}>
                    <button
                      onClick={() => setActiveSort(s.id)}
                      className="group flex w-full items-center gap-3 text-left text-sm transition-colors"
                    >
                      <div className={`flex size-4 shrink-0 items-center justify-center rounded-full border transition-colors ${
                        activeSort === s.id ? 'border-[#C26743] bg-white' : 'border-gray-300 bg-white group-hover:border-[#C26743]'
                      }`}>
                        {activeSort === s.id && <div className="size-2 rounded-full bg-[#C26743]" />}
                      </div>
                      <span className={activeSort === s.id ? 'font-bold text-[#C26743]' : 'text-gray-600 group-hover:text-[#C26743]'}>
                        {s.label}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* PRODUCT GRID */}
          <div className="flex-1">
            {displayProducts.length > 0 ? (
              <div className="grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-6 sm:gap-y-10 md:grid-cols-3 xl:grid-cols-4">
                {displayProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="flex h-64 flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-gray-50">
                <p className="font-medium text-gray-500">No plants found for this category.</p>
                <button 
                  onClick={() => setActiveFilter('all')} 
                  className="mt-4 text-sm font-bold text-[#C26743] hover:underline"
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>

        </div>
      </main>

      {/* MOBILE BOTTOM NAVIGATION BAR */}
      <div className="fixed bottom-0 left-0 right-0 z-40 flex h-14 w-full border-t border-gray-200 bg-white shadow-[0_-4px_20px_rgba(0,0,0,0.05)] lg:hidden">
        <button 
          onClick={() => setIsMobileSortOpen(true)}
          className="flex flex-1 items-center justify-center gap-2 border-r border-gray-200 text-sm font-bold text-[#1A3325] active:bg-gray-50"
        >
          <ArrowDownUp className="size-4" /> Sort
        </button>
        <button 
          onClick={() => setIsMobileFilterOpen(true)}
          className="flex flex-1 items-center justify-center gap-2 text-sm font-bold text-[#1A3325] active:bg-gray-50"
        >
          <FilterIcon className="size-4" /> Filter
          {activeFilter !== 'all' && (
            <span className="flex size-4 items-center justify-center rounded-full bg-[#C26743] text-[9px] font-bold text-white">1</span>
          )}
        </button>
      </div>

      {/* MOBILE SORT DRAWER */}
      {isMobileSortOpen && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end lg:hidden">
          <div className="absolute inset-0 bg-black/60 transition-opacity" onClick={() => setIsMobileSortOpen(false)} />
          <div className="relative w-full rounded-t-[2rem] bg-white pb-6 pt-4 animate-in slide-in-from-bottom-full duration-200">
            <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-gray-300" />
            <div className="flex items-center justify-between border-b border-gray-100 px-6 pb-4">
              <h3 className="font-serif text-xl font-bold text-[#1A3325]">Sort By</h3>
              <button onClick={() => setIsMobileSortOpen(false)} className="rounded-full bg-gray-100 p-1.5 text-gray-500">
                <X className="size-4" />
              </button>
            </div>
            <ul className="px-4 pt-2">
              {sortOptions.map((s) => (
                <li key={s.id}>
                  <button
                    onClick={() => { setActiveSort(s.id); setIsMobileSortOpen(false); }}
                    className="flex w-full items-center gap-4 rounded-xl px-4 py-4 text-left text-sm font-medium transition-colors active:bg-gray-50"
                  >
                    <div className={`flex size-4.5 shrink-0 items-center justify-center rounded-full border transition-colors ${
                      activeSort === s.id ? 'border-[#C26743] bg-white' : 'border-gray-300 bg-white'
                    }`}>
                      {activeSort === s.id && <div className="size-2.5 rounded-full bg-[#C26743]" />}
                    </div>
                    <span className={activeSort === s.id ? 'text-[#C26743] font-bold' : 'text-gray-700'}>{s.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* MOBILE FILTER DRAWER */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end lg:hidden">
          <div className="absolute inset-0 bg-black/60 transition-opacity" onClick={() => setIsMobileFilterOpen(false)} />
          <div className="relative flex max-h-[85vh] w-full flex-col rounded-t-[2rem] bg-white pb-6 pt-4 animate-in slide-in-from-bottom-full duration-200">
            <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-gray-300" />
            <div className="flex shrink-0 items-center justify-between border-b border-gray-100 px-6 pb-4">
              <h3 className="font-serif text-xl font-bold text-[#1A3325]">Filters</h3>
              <button onClick={() => setIsMobileFilterOpen(false)} className="rounded-full bg-gray-100 p-1.5 text-gray-500">
                <X className="size-4" />
              </button>
            </div>
            <div className="overflow-y-auto px-4 pt-2 pb-4">
              <ul className="space-y-1">
                {/* All Categories Option for Mobile */}
                <li>
                  <button
                    onClick={() => { setActiveFilter('all'); setIsMobileFilterOpen(false); }}
                    className="flex w-full items-center gap-4 rounded-xl px-4 py-4 text-left text-sm font-medium transition-colors active:bg-gray-50"
                  >
                    <div className={`flex size-5 shrink-0 items-center justify-center rounded-[4px] border transition-colors ${
                      activeFilter === 'all' ? 'border-[#1A3325] bg-[#1A3325] text-white' : 'border-gray-300 bg-white'
                    }`}>
                      {activeFilter === 'all' && <Check className="size-3.5" />}
                    </div>
                    <span className={activeFilter === 'all' ? 'font-bold text-[#1A3325]' : 'text-gray-700'}>
                      All Categories
                    </span>
                  </button>
                </li>
                {/* Dynamic Options for Mobile */}
                {filters.map((f) => (
                  <li key={f.id}>
                    <button
                      onClick={() => { setActiveFilter(f.id); setIsMobileFilterOpen(false); }}
                      className="flex w-full items-center gap-4 rounded-xl px-4 py-4 text-left text-sm font-medium transition-colors active:bg-gray-50"
                    >
                      <div className={`flex size-5 shrink-0 items-center justify-center rounded-[4px] border transition-colors ${
                        activeFilter === f.id ? 'border-[#1A3325] bg-[#1A3325] text-white' : 'border-gray-300 bg-white'
                      }`}>
                        {activeFilter === f.id && <Check className="size-3.5" />}
                      </div>
                      <span className={activeFilter === f.id ? 'font-bold text-[#1A3325]' : 'text-gray-700'}>
                        {f.label}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

    </CartProvider>
  )
}
```



---

## Core UI Components

### Component: `/src/components/store/about/rooftop-story.tsx`
```tsx
'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Leaf, MapPin } from 'lucide-react'
import { useInView } from '@/hooks/use-in-view'

// Custom internal component to handle the rapid count-up animation
function AnimatedNumber({ value, suffix = "", inView }: { value: number, suffix?: string, inView: boolean }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    // If it scrolls out of view, reset to 0 so it counts up again next time!
    if (!inView) {
      setCount(0)
      return
    }
    
    let start = 0
    const duration = 2000 // 2 seconds to finish counting
    const increment = value / (duration / 16) 

    const timer = setInterval(() => {
      start += increment
      if (start >= value) {
        setCount(value)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)

    return () => clearInterval(timer)
  }, [value, inView])

  return <span>{count.toLocaleString('en-IN')}{suffix}</span>
}

export function RooftopStory() {
  const { ref: sectionRef, isInView } = useInView({ threshold: 0.15 })

  return (
    // Tightly reduced vertical padding (py-6 to lg:py-10) to eliminate massive empty space
    <section className="w-full overflow-hidden bg-[#F9F8F6] px-4 py-6 sm:px-6 lg:px-10 xl:px-14 lg:py-10">
      <div className="mx-auto w-full max-w-[100rem]" ref={sectionRef}>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:items-center lg:gap-16 xl:gap-20">
          
          {/* Left Column: Image with Tags */}
          <div 
            className={`relative w-full overflow-hidden rounded-2xl sm:rounded-3xl transition-all duration-1000 ease-out 
              aspect-[4/3] lg:aspect-auto lg:h-[460px] xl:h-[520px]
              ${isInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}
          >
            <Image
              src="/images/rooftop.png" 
              alt="Abhay tending to plants on the sunlit rooftop nursery in Berhampore"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
            {/* Top and Bottom Gradients for text legibility */}
            <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/40 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#1A3325]/80 to-transparent" />
            
            {/* NEW: Top Right Location Tag */}
            <div className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full bg-black/40 px-3 py-1.5 text-white backdrop-blur-md sm:right-6 sm:top-6">
              <MapPin className="size-3.5" />
              <span className="text-[10px] font-medium tracking-wide sm:text-xs">Berhampore, WB</span>
            </div>

            {/* Floating Trust Badge */}
            <div className="absolute bottom-4 left-4 flex items-center gap-3 rounded-xl bg-white/10 p-3 backdrop-blur-md border border-white/20 sm:bottom-6 sm:left-6 sm:p-4 sm:rounded-2xl">
              <div className="flex size-10 items-center justify-center rounded-full bg-white text-[#1A3325] sm:size-12">
                <Leaf className="size-5 sm:size-6" />
              </div>
              <div>
                <p className="font-serif text-base font-bold text-white sm:text-lg">100% Organic</p>
                <p className="text-[10px] text-white/90 sm:text-xs">Pesticide-free soil</p>
              </div>
            </div>
          </div>

          {/* Right Column: Story & Animated Stats */}
          <div 
            className={`flex flex-col justify-center pt-2 transition-all duration-1000 delay-200 ease-out sm:pt-0 ${
              isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
          >
            {/* Standard E-commerce Section Tag */}
            <p className="font-mono text-[10px] font-bold tracking-widest text-[#1A3325] uppercase sm:text-xs">
              About The Nursery
            </p>
            
            <h2 className="mt-3 font-serif text-3xl leading-[1.15] font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              Grown under the sun,<br />
              <em className="font-normal italic text-[#1A3325]">nurtured by hand.</em>
            </h2>
            
            <div className="mt-4 space-y-4 text-sm leading-relaxed text-muted-foreground sm:mt-5 sm:text-base">
              <p>
                What started as a personal passion on a single sunlit terrace in Berhampore, West Bengal has blossomed into a full-scale homegrown nursery. We don't believe in mass-producing plants in artificial greenhouses. 
              </p>
              <p>
                Every single plant spends at least 90 days acclimating to real weather on our rooftop. This means by the time a plant arrives at your doorstep, it is hardened, deeply rooted, and ready to thrive.
              </p>
            </div>

            {/* NEW: Structured, Centered 3-Column Stats Box for Perfect Mobile Layout */}
            <div className="mt-8 grid grid-cols-3 divide-x divide-border rounded-2xl border border-border bg-white py-4 shadow-sm sm:mt-10 sm:py-6">
              <div className="flex flex-col items-center justify-center text-center px-1">
                <p className="text-xl font-extrabold tracking-tight text-[#1A3325] sm:text-3xl lg:text-4xl">
                  <AnimatedNumber value={5} suffix="+" inView={isInView} />
                </p>
                <p className="mt-1 text-[9px] font-bold text-muted-foreground uppercase tracking-widest sm:text-[11px]">Years</p>
              </div>
              
              <div className="flex flex-col items-center justify-center text-center px-1">
                <p className="text-xl font-extrabold tracking-tight text-[#1A3325] sm:text-3xl lg:text-4xl">
                  <AnimatedNumber value={12000} suffix="+" inView={isInView} />
                </p>
                <p className="mt-1 text-[9px] font-bold text-muted-foreground uppercase tracking-widest sm:text-[11px]">Plants</p>
              </div>
              
              <div className="flex flex-col items-center justify-center text-center px-1">
                <p className="text-xl font-extrabold tracking-tight text-[#1A3325] sm:text-3xl lg:text-4xl">
                  <AnimatedNumber value={1500} inView={isInView} />
                </p>
                <p className="mt-1 text-[9px] font-bold text-muted-foreground uppercase tracking-widest sm:text-[11px]">Sq Ft Roof</p>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </section>
  )
}
```

### Component: `/src/components/store/about/shipping-timeline.tsx`
```tsx
'use client'

import { Sprout, Package, Truck, ShieldCheck } from 'lucide-react'
import { useInView } from '@/hooks/use-in-view'

const steps = [
  {
    id: 1,
    title: 'Hand-picked & potted',
    desc: 'Selected for health and potted in nutrient-rich soil before leaving our roof.',
    icon: Sprout,
  },
  {
    id: 2,
    title: 'Custom packaging',
    desc: 'Secured in our eco-friendly, damage-proof transit boxes so dirt stays put.',
    icon: Package,
  },
  {
    id: 3,
    title: 'Safely delivered',
    desc: 'Tracked to your door. Unbox a vibrant, happy plant ready to thrive.',
    icon: Truck,
  },
]

export function ShippingTimeline() {
  const { ref: sectionRef, isInView } = useInView({ threshold: 0.2 })

  return (
    // Tightly padded to keep vertical height very compact (py-8 to lg:py-12)
    <section className="w-full bg-white px-4 py-8 sm:px-6 lg:px-10 xl:px-14 lg:py-12">
      <div 
        ref={sectionRef} 
        className="mx-auto w-full max-w-[100rem]"
      >
        
        {/* Header Animation Trigger */}
        <div className={`text-center transition-all duration-700 ease-out ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <h2 className="font-serif text-2xl font-bold tracking-tight text-[#1A3325] sm:text-3xl lg:text-4xl">
            From our roof to your room.
          </h2>
        </div>

        {/* Timeline Grid */}
        <div className="relative mt-8 sm:mt-10 lg:mt-12">
          {/* Subtle connecting line strictly for desktop view */}
          <div 
            className={`absolute left-[15%] right-[15%] top-6 hidden h-px bg-gray-200 md:block transition-all duration-1000 delay-300 ease-out ${
              isInView ? 'opacity-100' : 'opacity-0'
            }`} 
            aria-hidden="true" 
          />
          
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-6 lg:gap-10">
            {steps.map((step, i) => {
              const Icon = step.icon
              return (
                <div 
                  key={step.id}
                  // Staggered cascade animation for each step
                  className={`relative flex flex-col items-center text-center transition-all duration-700 ease-out`}
                  style={{ 
                    transitionDelay: `${(i + 1) * 150}ms`,
                    opacity: isInView ? 1 : 0,
                    transform: isInView ? 'translateY(0)' : 'translateY(20px)'
                  }}
                >
                  <div className="relative z-10 flex size-12 items-center justify-center rounded-full bg-white border-2 border-[#1A3325] text-[#1A3325] shadow-sm sm:size-14 transition-transform hover:scale-110">
                    <Icon className="size-5 sm:size-6" />
                  </div>
                  <h3 className="mt-4 text-base font-bold text-[#1A3325] sm:text-lg">{step.title}</h3>
                  <p className="mt-2 max-w-xs text-xs leading-relaxed text-muted-foreground sm:text-sm">
                    {step.desc}
                  </p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Guarantee Banner Trigger */}
        <div 
          className={`mx-auto mt-10 max-w-3xl rounded-2xl bg-[#F4F7F5] border border-[#1A3325]/10 p-4 sm:mt-12 sm:p-5 transition-all duration-700 delay-500 ease-out ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <div className="flex flex-col items-center justify-center gap-3 text-center sm:flex-row sm:gap-4 sm:text-left">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#1A3325] text-white">
              <ShieldCheck className="size-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-[#1A3325] sm:text-base">7-Day Healthy Plant Guarantee</p>
              <p className="mt-0.5 text-xs text-[#1A3325]/70 sm:text-sm">
                If your plant arrives damaged or unhealthy, we’ll replace it for free. No questions asked.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
```

### Component: `/src/components/store/accessories/accessories-row.tsx`
```tsx
'use client'

import Image from 'next/image'
import { ArrowRight, Plus } from 'lucide-react'
import { useInView } from '@/hooks/use-in-view'
import { useCart } from '@/components/store/cart-context'
import { useState } from 'react'

const accessories = [
  {
    id: 'g-1',
    name: 'The Green Gift Set',
    desc: 'Plant, ceramic pot & care card in a ribbon box.',
    price: 899,
    img: '/images/gifting.jpg', 
    badge: 'Perfect Gift'
  },
  {
    id: 'a-1',
    name: 'Minimalist Ceramic Pot',
    desc: 'Matte white finish with drainage hole. 6 inch.',
    price: 299,
    img: '/images/pot-white.jpg', 
  },
  {
    id: 'a-2',
    name: 'Classic Terracotta',
    desc: 'Breathable clay pot for healthy roots. 6 inch.',
    price: 199,
    img: '/images/pot-terracotta.jpg', 
  },
  {
    id: 'a-3',
    name: 'Organic Plant Food',
    desc: 'Liquid fertilizer for lush, vibrant growth. 250ml.',
    price: 149,
    img: '/images/fertilizer.jpg', 
  }
]

export function AccessoriesRow() {
  const { addItem } = useCart()
  const { ref: sectionRef, isInView } = useInView({ threshold: 0.15 })
  const [addedId, setAddedId] = useState<string | null>(null)

  const handleQuickAdd = (id: string) => {
    addItem()
    setAddedId(id)
    setTimeout(() => setAddedId(null), 2000)
  }

  return (
    <section className="w-full overflow-hidden bg-white px-4 py-8 sm:px-6 lg:px-10 xl:px-14 lg:py-12">
      <div ref={sectionRef} className="mx-auto w-full max-w-[100rem]">
        
        {/* Header */}
        <div className={`flex items-end justify-between gap-4 transition-all duration-700 ease-out ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#1A3325] sm:text-xs">
              Complete the look
            </p>
            <h2 className="mt-2 font-serif text-2xl font-bold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
              Pots & Gift Sets
            </h2>
          </div>
          <a href="#" className="hidden items-center gap-1.5 text-sm font-semibold text-[#1A3325] transition-colors hover:text-[#C26743] sm:inline-flex">
            Shop all accessories <ArrowRight className="size-4" />
          </a>
        </div>

        {/* 
          UPDATED TO MATCH BESTSELLERS: 
          Now uses a strict 2-column grid on mobile (grid-cols-2) instead of a horizontal slider.
        */}
        <div className="mt-6 grid grid-cols-2 gap-x-3 gap-y-8 sm:mt-8 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-4">
          {accessories.map((item, index) => (
            <div 
              key={item.id}
              className="group relative flex flex-col transition-all duration-700 ease-out"
              style={{ 
                transitionDelay: `${(index + 1) * 100}ms`,
                opacity: isInView ? 1 : 0,
                transform: isInView ? 'translateY(0)' : 'translateY(20px)'
              }}
            >
              {/* Image Box */}
              <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-muted">
                <Image
                  src={item.img}
                  alt={item.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                {item.badge && (
                  <span className="absolute left-2 top-2 sm:left-3 sm:top-3 rounded-full bg-[#D47E5B] px-2 py-1 text-[9px] sm:px-2.5 sm:text-[10px] font-bold text-white shadow-sm">
                    {item.badge}
                  </span>
                )}

                {/* Quick Add Button - Scaled down for mobile 2-col fit */}
                <button
                  onClick={() => handleQuickAdd(item.id)}
                  className={`absolute bottom-2 right-2 flex size-8 items-center justify-center rounded-full shadow-md transition-all active:scale-95 sm:bottom-3 sm:right-3 sm:size-12 ${
                    addedId === item.id 
                      ? 'bg-green-600 text-white' 
                      : 'bg-white text-[#1A3325] hover:bg-[#1A3325] hover:text-white'
                  }`}
                  aria-label={`Add ${item.name} to cart`}
                >
                  <Plus className={`size-4 sm:size-5 transition-transform ${addedId === item.id ? 'rotate-45' : ''}`} />
                </button>
              </div>

              {/* Product Details - Typography scaled slightly for mobile 2-col */}
              <div className="mt-3 sm:mt-4 flex flex-1 flex-col px-1 sm:px-0">
                <h3 className="font-serif text-sm font-bold text-[#1A3325] sm:text-lg leading-tight">{item.name}</h3>
                <p className="mt-1 text-[10px] leading-relaxed text-muted-foreground sm:text-sm line-clamp-2">
                  {item.desc}
                </p>
                <div className="mt-auto pt-2 sm:pt-3">
                  <span className="text-sm font-bold text-[#1A3325] sm:text-lg">₹{item.price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile-only View All Link */}
        <div className="mt-8 flex justify-center sm:hidden">
          <a href="#" className="inline-flex items-center gap-1.5 text-sm font-bold text-[#1A3325]">
            Shop all accessories <ArrowRight className="size-4" />
          </a>
        </div>

      </div>
    </section>
  )
}
```

### Component: `/src/components/store/bestsellers/bestsellers.tsx`
```tsx
'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { ProductCard } from '@/components/store/product-card'   
import { filters, products, type Filter } from '@/components/store/products'
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
    <section aria-labelledby="bestsellers-heading" className="w-full overflow-hidden border-t border-border bg-card px-4 pt-8 pb-8 sm:px-6 lg:px-10 xl:px-14 lg:pt-12 lg:pb-12">
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
            Explore all bestsellers
          </Link>
        </div>
      </div>
    </section>
  )
}

function FeatureCard() {
  return (
    <a
      href="#"
      className="group relative flex min-h-[460px] h-full w-full shrink-0 flex-col justify-between overflow-hidden rounded-3xl bg-primary p-6 text-primary-foreground sm:min-h-[520px] lg:p-8"
    >
      <Image
        src="/images/fiddle-leaf.png"
        alt="Fiddle leaf fig in a cream planter on a sunlit rooftop terrace"
        fill
        sizes="(min-width: 1024px) 34vw, 100vw"
        className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
      />
      
      <div className="absolute inset-0 bg-gradient-to-t from-[#13261C]/95 via-[#13261C]/60 to-[#13261C]/10 sm:bg-gradient-to-b sm:from-primary/70 sm:via-primary/10 sm:to-primary/90" aria-hidden="true" />

      <div className="relative flex items-start justify-between gap-4 drop-shadow-sm">
        <div>
          <p className="font-mono text-[11px] tracking-widest uppercase opacity-90 text-white">Plant of the month</p>
          <p className="mt-1 font-serif text-sm italic opacity-90 text-white">October edition</p>
        </div>
        <span className="flex size-11 items-center justify-center rounded-full bg-white text-[#1A3325] shadow-lg transition-transform duration-300 group-hover:rotate-45">
          <ArrowUpRight className="size-5" aria-hidden="true" />
        </span>
      </div>

      <div className="relative drop-shadow-sm">
        <h3 className="font-serif text-4xl leading-none font-medium tracking-tight text-white sm:text-5xl">
          Fiddle Leaf <em className="font-normal italic">Fig</em>
        </h3>
        <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/90">
          Statement foliage, five feet tall, grown for 14 months on our terrace. Only 12 available this season.
        </p>
        <div className="mt-6 flex items-center justify-between border-t border-white/30 pt-4">
          <div className="flex items-baseline gap-2 text-white">
            <span className="text-2xl font-semibold">₹2,499</span>
            <span className="text-sm line-through opacity-70">₹3,199</span>
          </div>
          <span className="text-sm font-semibold text-white underline decoration-white/40 underline-offset-4 group-hover:decoration-white">
            Shop now
          </span>
        </div>
      </div>
    </a>
  )
}
```

### Component: `/src/components/store/cart-context.tsx`
```tsx
'use client'

import { createContext, useContext, useState } from 'react'

type CartContextValue = {
  count: number
  addItem: () => void
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [count, setCount] = useState(0)
  return (
    <CartContext value={{ count, addItem: () => setCount((c) => c + 1) }}>
      {children}
    </CartContext>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}

```

### Component: `/src/components/store/categories/shop-categories.tsx`
```tsx
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
```

### Component: `/src/components/store/hero/hero-product-card.tsx`
```tsx
'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Check, Plus, Star } from 'lucide-react'
import { useCart } from '@/components/store/cart-context'

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

```

### Component: `/src/components/store/hero/hero.tsx`
```tsx
'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { ArrowRight, Check, Heart, Plus, ShieldCheck, Truck, Leaf, Star, StarHalf, ShoppingBag } from 'lucide-react'
import { useCart } from '@/components/store/cart-context'
import { formatINR, products } from '@/components/store/products'

// Map the featured plants to their standard brightly lit images
const cardImages: Record<string, string> = {
  monstera: '/images/monstera.png',
  'peace-lily': '/images/peace-lily.png',
  areca: '/images/areca.png',
}

const featured = products.filter((p) => p.id in cardImages)
const careLabel = { 1: 'Easy care', 2: 'Some care', 3: 'Green thumb' } as const
const cats = ["Air Purifying", "Low Light", "Pet Friendly", "Bestsellers", "Under ₹499"]

export function Hero() {
  const { addItem } = useCart()
  const [activeIndex, setActiveIndex] = useState(0)
  const [addedId, setAddedId] = useState<string | null>(null)

  // Auto-slideshow interval
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((current) => (current + 1) % featured.length)
      setAddedId(null)
    }, 5000) // Changes every 5 seconds
    
    return () => clearInterval(timer)
  }, [])

  const plant = featured[activeIndex]
  const size = plant?.sizes[0]

  function handleAdd() {
    if (!plant) return
    addItem()
    setAddedId(plant.id)
    window.setTimeout(() => setAddedId(null), 1800)
  }

  if (!plant) return null // Safety check to prevent errors

  return (
    // Matched horizontal padding to header and categories
    <section className="px-4 pt-3 sm:px-6 lg:px-10 xl:px-14 sm:pt-6">
      
      {/* Expanded to max-w-[100rem] for ultra-wide screen support */}
      <div className="relative mx-auto flex w-full max-w-[100rem] min-h-[640px] overflow-hidden rounded-2xl md:min-h-[600px] sm:rounded-[2rem]">
        
        {/* Background Image */}
        <Image
          src="/images/hero-main.jpg"
          alt="Lush rooftop nursery with potted plants at sunset"
          fill
          priority
          className="absolute inset-0 object-cover object-[60%_center]"
        />
        
        {/* Exact Lovable Gradients */}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(18,32,23,0.2)_0%,rgba(18,32,23,0.92)_70%)] md:hidden" />
        <div className="absolute inset-0 hidden md:block bg-[linear-gradient(90deg,rgba(18,32,23,0.88)_0%,rgba(18,32,23,0.55)_45%,rgba(18,32,23,0)_75%)]" />

        <div className="relative z-10 grid w-full items-end gap-8 p-6 md:grid-cols-12 md:items-center sm:p-10 lg:p-14">
          
          {/* Left Column: Text & Buttons */}
          <div className="text-white md:col-span-7 lg:col-span-6 animate-in slide-in-from-bottom-4 duration-700">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold tracking-wide backdrop-blur-md">
              <span className="size-1.5 rounded-full bg-[#E5A849]" /> Festive Sale · Up to 30% off
            </span>
            
            {/* Fixed Mobile Text Overflow by wrapping naturally on mobile, strict on desktop */}
            <h1 className="mt-5 font-serif text-[2.6rem] font-medium leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
              Grown on our roof.<br />
              <span className="lg:whitespace-nowrap">
                <em className="font-normal italic text-[#E5A849]">Delivered</em> to your home.
              </span>
            </h1>
            
            <p className="mt-5 max-w-md text-base text-white/80 sm:text-lg">
              Shop 300+ healthy, nursery-grown plants, hand-potted and packed with care by Abhay's Roof Garden.
            </p>
            
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a href="#bestsellers-heading" className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#C26743] px-7 font-semibold text-white shadow-lg transition hover:brightness-110">
                <ShoppingBag className="size-4" /> Shop All Plants
              </a>
              <a href="#" className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/20 bg-black/40 px-7 font-semibold text-white backdrop-blur-md transition hover:bg-black/60">
                Find Your Perfect Plant <ArrowRight className="size-4" />
              </a>
            </div>

            <div className="mt-6 flex items-center gap-3 text-sm text-white/85">
              <div className="flex text-[#E5A849]">
                <Star className="size-4 fill-current" />
                <Star className="size-4 fill-current" />
                <Star className="size-4 fill-current" />
                <Star className="size-4 fill-current" />
                <StarHalf className="size-4 fill-current" />
              </div>
              <span><b className="font-semibold text-white">4.9/5</b> from 2,400+ happy plant parents</span>
            </div>
          </div>

          {/* Right Column: Exact Lovable Floating Card */}
          <div className="hidden justify-end md:col-span-5 md:flex lg:col-span-6 animate-in slide-in-from-bottom-8 duration-700 delay-300">
            <div className="w-[18rem] rounded-2xl bg-card p-3 text-card-foreground shadow-2xl transition-all duration-500 xl:w-[20rem]">
              <div className="relative aspect-square overflow-hidden rounded-xl bg-muted">
                {/* Dynamically loads correct image from cardImages mapping */}
                <Image 
                  key={plant.id} 
                  src={cardImages[plant.id] || size?.image || '/images/monstera.png'} 
                  alt={plant.name} 
                  fill 
                  sizes="(min-width: 1024px) 320px, 288px"
                  className="object-cover animate-in fade-in duration-700" 
                />
                <span className="absolute left-2 top-2 rounded-full bg-[#1A3325] px-2.5 py-1 text-[11px] font-semibold text-white shadow-sm">
                  On the roof this week
                </span>
                <button aria-label="Add to wishlist" className="absolute right-2 top-2 grid size-8 place-items-center rounded-full bg-card/90 transition-colors hover:text-red-500 backdrop-blur-sm shadow-sm">
                  <Heart className="size-4" />
                </button>
              </div>
              
              <div className="p-2 pt-3">
                <p className="text-xs text-muted-foreground">{plant.light} · {careLabel[plant.care]}</p>
                <h3 className="mt-1 font-serif text-lg font-semibold">{plant.name}</h3>

                <div className="mt-2 flex items-center justify-between">
                  <div>
                    <span className="text-lg font-bold">{formatINR(size.price)}</span>
                    {size.mrp && (
                      <span className="ml-2 text-sm text-muted-foreground line-through">{formatINR(size.mrp)}</span>
                    )}
                  </div>
                  <button
                    onClick={handleAdd}
                    aria-label={`Add ${plant.name} to cart`}
                    className="grid size-10 place-items-center rounded-full bg-[#1A3325] text-white transition hover:scale-105 hover:bg-primary active:scale-95 shadow-sm"
                  >
                    {addedId === plant.id ? <Check className="size-5" /> : <Plus className="size-5" />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Categories - Expanded to max-w-[100rem] */}
      <div className="mx-auto mt-5 flex w-full max-w-[100rem] gap-2 overflow-x-auto pb-1 md:hidden [scrollbar-width:none]">
        {cats.map((c, i) => (
          <a key={c} href="#" className={`shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition ${i === 0 ? "border-primary bg-primary text-primary-foreground" : "bg-card hover:border-primary"}`}>
            {c}
          </a>
        ))}
      </div>

      {/* Trust Bar - Expanded to max-w-[100rem] */}
      <div className="mx-auto mt-5 grid w-full max-w-[100rem] grid-cols-1 gap-3 pb-2 sm:grid-cols-3">
        {[
          { i: Truck, t: "Safe Doorstep Delivery", d: "Packed to arrive fresh & healthy" },
          { i: Leaf, t: "Nursery-Grown Quality", d: "Raised on our own rooftop" },
          { i: ShieldCheck, t: "7-Day Plant Guarantee", d: "Free replacement if damaged" },
        ].map(({ i: Icon, t, d }) => (
          <div key={t} className="flex items-center gap-4 rounded-xl border bg-card p-4 shadow-sm transition hover:shadow-md">
            <span className="grid size-11 shrink-0 place-items-center rounded-full bg-secondary text-primary">
              <Icon className="size-5" />
            </span>
            <div>
              <p className="text-sm font-semibold">{t}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">{d}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
```

### Component: `/src/components/store/hero/rooftop-stamp.tsx`
```tsx
import { Sprout } from 'lucide-react'

export function RooftopStamp({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center rounded-full bg-sun text-forest-deep ${className}`} aria-hidden="true">
      <svg viewBox="0 0 120 120" className="absolute inset-0 size-full motion-safe:animate-[spin_22s_linear_infinite]">
        <defs>
          <path id="stamp-circle" d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0" />
        </defs>
        <text className="fill-current font-sans text-[10.5px] font-semibold uppercase" letterSpacing="2.6">
          <textPath href="#stamp-circle">Homegrown • Rooftop raised • Hand packed •</textPath>
        </text>
      </svg>
      <Sprout className="size-7" strokeWidth={1.75} />
    </div>
  )
}

```

### Component: `/src/components/store/layout/announcement-bar.tsx`
```tsx
import { Truck } from 'lucide-react'

export function AnnouncementBar() {
  return (
    <div className="w-full bg-[#1A3325]">
      <div className="mx-auto max-w-7xl px-4 py-2.5 sm:px-6 lg:px-8">
        <p className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-center text-xs font-medium tracking-wide text-white sm:text-sm">
          <Truck className="size-4 shrink-0 text-[#E5A849]" aria-hidden="true" />
          <span>
            Free delivery on orders above ₹999 <span className="hidden sm:inline">·</span>
          </span>
          <span>
            Use code <strong className="font-bold text-[#E5A849]">GREEN10</strong> for 10% off your first order
          </span>
        </p>
      </div>
    </div>
  )
}
```

### Component: `/src/components/store/layout/conditional-footer.tsx`
```tsx
'use client'

import { usePathname } from 'next/navigation'
import { SiteFooter } from './site-footer'

export function ConditionalFooter() {
  const pathname = usePathname()

  // If we are on the homepage, return nothing (because HomeFooter is already there)
  if (pathname === '/') {
    return null
  }

  // On every other page, automatically show the compact SiteFooter
  return (
    <div className="pb-[56px] lg:pb-0">
      <SiteFooter />
    </div>
  )
}
```

### Component: `/src/components/store/layout/home-footer.tsx`
```tsx
'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { 
  MapPin, 
  Phone, 
  Mail, 
  MessageCircle, 
  ArrowRight,
  CheckCircle2,
  X,
  HelpCircle,
  Plus,
  Minus
} from 'lucide-react'

const faqs = [
  { q: "How does the 7-day healthy plant guarantee work?", a: "If your plant arrives damaged, diseased, or dies within 7 days of delivery despite proper care, simply send us a photo on WhatsApp. We will send a free replacement, no questions asked." },
  { q: "How are the plants packaged for safe transit?", a: "We use custom-engineered, eco-friendly corrugated boxes that lock the pot in place. The soil is covered with biodegradable coco-fiber mats to prevent spillage, ensuring the plant breathes while staying perfectly secure." },
  { q: "What if I don't know how to care for my plant?", a: "Every plant comes with a detailed, beginner-friendly physical care card. You can also message our WhatsApp support line anytime for personalized advice from our nursery experts." },
  { q: "Are the pots included with the plants?", a: "Yes! All our plants come potted in nutrient-rich organic soil in a standard nursery pot. You can also upgrade to our premium ceramic or terracotta planters before adding to cart." },
  { q: "Can I gift a plant to someone else?", a: "Absolutely. Select the 'Add Gift Wrap' option at checkout. We will hand-wrap the plant in kraft paper with a ribbon and include a handwritten note with your custom message." },
  { q: "Do you use chemical pesticides or fertilizers?", a: "No. We pride ourselves on a 100% organic approach. We use neem oil for pest control and our own aged organic compost to ensure your home stays free from harsh agricultural chemicals." },
  { q: "How long does delivery usually take?", a: "Orders are dispatched within 24 hours. Depending on your location, transit takes between 2 to 5 business days. You will receive a tracking link via WhatsApp and Email as soon as it ships." }
]

export function HomeFooter() {
  const [isFaqOpen, setIsFaqOpen] = useState(false)
  const [activeFaq, setActiveFaq] = useState<number | null>(null)
  
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  // Prevent background scrolling when FAQ modal is open
  useEffect(() => {
    if (isFaqOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => { document.body.style.overflow = 'unset' }
  }, [isFaqOpen])

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)
    setTimeout(() => {
      setIsFormOpen(false)
      setTimeout(() => setIsSubmitted(false), 500)
    }, 3000)
  }

  return (
    <footer className="w-full bg-[#0F291E] pb-6 pt-10 sm:pt-14 lg:pt-16">
      <div className="mx-auto w-full max-w-[100rem] px-4 sm:px-6 lg:px-10 xl:px-14">
        
        {/* TOP: Newsletter / Lead Capture */}
        <div className="relative mb-12 overflow-hidden rounded-[2rem] bg-[#1A3325] p-6 shadow-2xl border border-white/10 sm:p-10 lg:flex lg:items-center lg:justify-between lg:p-14">
          <div className="relative z-10 max-w-xl">
            <h3 className="font-serif text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
              Join the Plant Care Club.
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-white/80 sm:text-base">
              Get 10% off your first order. We will also send you seasonal care tips, exclusive drops, and early access to rare cuttings.
            </p>
          </div>

          <div className="relative z-10 mt-8 w-full max-w-md lg:mt-0 lg:shrink-0">
            {!isFormOpen && !isSubmitted ? (
              <button 
                onClick={() => setIsFormOpen(true)}
                className="flex h-14 w-full items-center justify-center gap-2 rounded-full bg-[#E5A849] px-8 text-base font-bold text-[#1A3325] shadow-lg transition-transform hover:scale-[1.02] active:scale-95"
              >
                Unlock 10% Off <ArrowRight className="size-5" />
              </button>
            ) : isSubmitted ? (
              <div className="flex h-full w-full flex-col items-center justify-center rounded-2xl border border-green-500/30 bg-green-500/10 p-6 text-center text-white backdrop-blur-sm">
                <CheckCircle2 className="mb-2 size-8 text-green-400" />
                <p className="font-bold">Welcome to the Club!</p>
                <p className="text-xs text-white/70">Check your WhatsApp/Email for your code.</p>
              </div>
            ) : (
              <form onSubmit={handleLeadSubmit} className="flex flex-col gap-3 rounded-2xl bg-white/5 p-5 backdrop-blur-md border border-white/10 animate-in fade-in slide-in-from-bottom-4">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white/60">Where should we send it?</span>
                  <button type="button" onClick={() => setIsFormOpen(false)} className="text-white/60 hover:text-white">
                    <X className="size-4" />
                  </button>
                </div>
                <input required type="text" placeholder="Full Name" className="h-12 w-full rounded-xl bg-white/10 px-4 text-sm text-white placeholder-white/40 outline-none focus:ring-2 focus:ring-[#E5A849]" />
                <input required type="tel" placeholder="WhatsApp Number / Email" className="h-12 w-full rounded-xl bg-white/10 px-4 text-sm text-white placeholder-white/40 outline-none focus:ring-2 focus:ring-[#E5A849]" />
                <button type="submit" className="mt-2 h-12 w-full rounded-xl bg-[#E5A849] text-sm font-bold text-[#1A3325] transition-transform active:scale-95">
                  Claim My Discount
                </button>
              </form>
            )}
          </div>
          
          <div className="absolute -left-20 -top-20 size-64 rounded-full bg-white/5 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-32 -right-32 size-96 rounded-full bg-[#E5A849]/10 blur-3xl pointer-events-none" />
        </div>

        {/* BOTTOM: Contact Details Grid */}
        <div className="grid gap-10 border-b border-white/10 pb-10 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          
          {/* Brand & Socials (Col 1) */}
          <div className="flex flex-col items-start gap-6 lg:col-span-4">
            
            <a href="/" className="flex shrink-0 items-center gap-2.5">
              <div className="relative flex size-12 shrink-0 overflow-hidden rounded-full border border-white/20 shadow-sm sm:size-14 bg-white">
                <Image 
                  src="/images/logo2.png" 
                  alt="Abhay's Roof Garden Logo" 
                  fill 
                  sizes="56px" 
                  className="object-cover"
                />
              </div>
              <span className="flex flex-col justify-center leading-none">
                <span className="font-serif text-xl font-bold tracking-tight text-white sm:text-2xl">
                  {"Abhay's Roof Garden"}
                </span>
                <span className="mt-0.5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#E5A849]">
                  Homegrown Nursery
                </span>
              </span>
            </a>

            <div className="max-w-sm text-sm text-white/70">
              <p>Nursery-grown plants, hardened on our rooftop and delivered fresh to your door in eco-friendly packaging.</p>
            </div>
            
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-widest text-white/50">Watch our rooftop bloom on your feed 👇</p>
              <div className="flex items-center gap-4">
                <a href="https://www.facebook.com/share/1GHSBTPFXm/" target="_blank" rel="noopener noreferrer" className="flex size-10 items-center justify-center rounded-full bg-white/5 text-white transition-colors hover:bg-[#1877F2] hover:text-white border border-white/10">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4.5"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
                </a>
                <a href="https://www.instagram.com/abhaysroofgarden_2026?srtk=MWdpMTEzdTdsaThkdQ==" target="_blank" rel="noopener noreferrer" className="flex size-10 items-center justify-center rounded-full bg-white/5 text-white transition-colors hover:bg-[#E1306C] hover:text-white border border-white/10">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4.5"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                </a>
              </div>
            </div>
          </div>

          {/* Visit Us (Col 2) */}
          <div className="flex flex-col gap-5 lg:col-span-4 lg:pl-4">
            <h4 className="font-serif text-xl font-medium text-white">Visit Us</h4>
            <div className="flex gap-4 text-white/70">
              <MapPin className="mt-1 size-5 shrink-0 text-[#E5A849]" />
              <div className="flex flex-col gap-1.5 text-sm sm:text-base">
                <span className="font-medium text-white">Abhay's Roof Garden</span>
                <span>Chuanpore, Sukantapally,</span>
                <span>Berhampore, Murshidabad,</span>
                <span>West Bengal 742407</span>
                <div className="mt-2 flex flex-col gap-0.5">
                  <span className="font-medium text-[#E5A849]">Every day: 9:00 AM – 7:00 PM</span>
                  <span className="text-xs italic text-white/50">Please WhatsApp before visiting</span>
                </div>
                <a 
                  href="https://maps.app.goo.gl/4pZraYbYVNjtx3HD8?g_st=ac" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="mt-3 flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-white/10"
                >
                  Get Directions <ArrowRight className="size-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Contact & Support (Col 3) - FAQ is now neatly housed here */}
          <div className="flex flex-col gap-5 lg:col-span-4">
            <h4 className="font-serif text-xl font-medium text-white">Contact & Support</h4>
            <div className="flex gap-4 text-white/70">
              <Phone className="mt-1 size-5 shrink-0 text-[#E5A849]" />
              <div className="flex flex-col gap-3 text-sm sm:text-base">
                <a href="tel:+919476433880" className="flex items-center gap-2 transition-colors hover:text-white">
                  +91 94764 33880
                </a>
                <a href="https://wa.me/919476433880" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-green-400 transition-colors hover:text-green-300">
                  <MessageCircle className="size-4 shrink-0" /> WhatsApp Us
                </a>
                <a href="mailto:abhaysroofgarden@gmail.com" className="flex items-center gap-2 transition-colors hover:text-white mt-1">
                  <Mail className="size-4 shrink-0" /> abhaysroofgarden@gmail.com
                </a>
                
                {/* Beautifully integrated FAQ Button */}
                <button 
                  onClick={() => setIsFaqOpen(true)}
                  className="mt-3 flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-white/10"
                >
                  <HelpCircle className="size-3.5" /> Read our FAQs
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Copyright & Legal */}
        <div className="flex flex-col items-center justify-between gap-4 pt-6 sm:flex-row">
          <p className="text-xs text-white/50">
            © {new Date().getFullYear()} Abhay's Roof Garden. All rights reserved.
          </p>
          <div className="flex gap-4 text-xs text-white/50">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
          <p className="text-xs font-medium text-white/70">
            Designed & Developed by <a href="#" className="font-bold text-[#E5A849] hover:underline">Sj Digital Studio</a>
          </p>
        </div>
      </div>

      {/* MODAL: Hidden FAQ Overlay */}
      {isFaqOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setIsFaqOpen(false)}
          />
          <div className="relative z-10 w-full max-w-2xl max-h-[85vh] overflow-hidden rounded-3xl bg-[#F9F8F6] text-left shadow-2xl ring-1 ring-black/5 animate-in fade-in zoom-in-95 duration-200 flex flex-col">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-gray-200 p-6 sm:p-8 bg-white shrink-0">
              <div>
                <h3 className="font-serif text-2xl font-bold text-[#1A3325]">Frequently Asked Questions</h3>
                <p className="mt-1 text-sm text-muted-foreground">Everything you need to know about our nursery.</p>
              </div>
              <button 
                onClick={() => setIsFaqOpen(false)}
                className="rounded-full bg-gray-100 p-2 text-gray-500 transition-colors hover:bg-[#1A3325] hover:text-white"
              >
                <X className="size-5" />
              </button>
            </div>

            {/* Modal Body (Scrollable) */}
            <div className="overflow-y-auto p-6 sm:p-8">
              <div className="divide-y divide-gray-200">
                {faqs.map((faq, index) => (
                  <div key={index} className="py-4 first:pt-0 last:pb-0">
                    <button
                      onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                      className="flex w-full items-center justify-between text-left transition-colors hover:text-[#C26743]"
                    >
                      <span className="font-serif text-sm font-bold text-[#1A3325] sm:text-base pr-4">
                        {faq.q}
                      </span>
                      <span className="flex size-6 shrink-0 items-center justify-center rounded-full border border-gray-300 text-gray-500 transition-transform">
                        {activeFaq === index ? <Minus className="size-3.5" /> : <Plus className="size-3.5" />}
                      </span>
                    </button>
                    <div
                      className={`grid transition-all duration-300 ease-in-out ${
                        activeFaq === index ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p className="pt-3 text-sm leading-relaxed text-muted-foreground sm:pt-4">
                          {faq.a}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}
    </footer>
  )
}
```

### Component: `/src/components/store/layout/site-footer.tsx`
```tsx
'use client'

import Image from 'next/image'
import { MapPin, Phone, Mail, MessageCircle, ArrowRight } from 'lucide-react'

export function SiteFooter() {
  return (
    <footer className="w-full bg-[#0F291E] pb-6 pt-10 sm:pt-12 lg:pt-14 border-t border-white/10">
      <div className="mx-auto w-full max-w-[100rem] px-4 sm:px-6 lg:px-10 xl:px-14">
        
        {/* Compact 3-Column Layout */}
        <div className="grid gap-8 border-b border-white/10 pb-8 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          
          {/* Brand Col */}
          <div className="flex flex-col items-start gap-4 lg:col-span-4">
            <a href="/" className="flex shrink-0 items-center gap-2.5">
              <div className="relative flex size-10 shrink-0 overflow-hidden rounded-full border border-white/20 shadow-sm bg-white">
                <Image 
                  src="/images/logo2.png" 
                  alt="Abhay's Roof Garden Logo" 
                  fill 
                  sizes="40px" 
                  className="object-cover"
                />
              </div>
              <span className="flex flex-col justify-center leading-none">
                <span className="font-serif text-lg font-bold tracking-tight text-white">
                  {"Abhay's Roof Garden"}
                </span>
                <span className="mt-0.5 text-[9px] font-bold uppercase tracking-[0.2em] text-[#E5A849]">
                  Homegrown Nursery
                </span>
              </span>
            </a>
            <p className="text-xs leading-relaxed text-white/70 max-w-xs">
              Nursery-grown plants, hardened on our rooftop and delivered fresh to your door.
            </p>
          </div>

          {/* Address Col */}
          <div className="flex flex-col gap-3 lg:col-span-4 lg:pl-4">
            <h4 className="font-serif text-base font-medium text-white">Visit Us</h4>
            <div className="flex gap-3 text-white/70 text-xs sm:text-sm">
              <MapPin className="mt-0.5 size-4 shrink-0 text-[#E5A849]" />
              <div className="flex flex-col gap-1">
                <span className="font-medium text-white">Chuanpore, Sukantapally,</span>
                <span>Berhampore, Murshidabad,</span>
                <span>West Bengal - 742407</span>
                <span className="mt-1 font-medium text-[#E5A849]">9:00 AM – 7:00 PM (WhatsApp first)</span>
              </div>
            </div>
          </div>

          {/* Contact Col */}
          <div className="flex flex-col gap-3 lg:col-span-4">
            <h4 className="font-serif text-base font-medium text-white">Contact & Support</h4>
            <div className="flex gap-3 text-white/70 text-xs sm:text-sm">
              <Phone className="mt-0.5 size-4 shrink-0 text-[#E5A849]" />
              <div className="flex flex-col gap-2">
                <a href="tel:+919476433880" className="hover:text-white transition-colors">+91 94764 33880</a>
                <a href="https://wa.me/919476433880" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-green-400 hover:text-green-300">
                  <MessageCircle className="size-3.5" /> WhatsApp Us
                </a>
                <a href="mailto:abhaysroofgarden@gmail.com" className="flex items-center gap-1.5 hover:text-white">
                  <Mail className="size-3.5" /> abhaysroofgarden@gmail.com
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Copyright */}
        <div className="flex flex-col items-center justify-between gap-3 pt-6 text-xs text-white/50 sm:flex-row">
          <p>© {new Date().getFullYear()} Abhay's Roof Garden. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
          <p className="text-white/70">
            Designed & Developed by <span className="font-bold text-[#E5A849]">Sj Digital Studio</span>
          </p>
        </div>

      </div>
    </footer>
  )
}
```

### Component: `/src/components/store/layout/site-header.tsx`
```tsx
'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Heart, Menu, Search, ShoppingBag, User, X } from 'lucide-react'
import { useCart } from '@/components/store/cart-context'

const navLinks = [
  { label: 'Shop All', href: '#' },
  { label: 'Indoor', href: '#' },
  { label: 'Outdoor', href: '#' },
  { label: 'Flowering', href: '#' },
  { label: 'Pots & Planters', href: '#' },
  { label: 'Gifting', href: '#' },
]

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false)
  const { count } = useCart()

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [menuOpen])

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/70 bg-background/95 backdrop-blur-md">
      
      {/* Expanded Max-Width for Full Screen Desktop Support */}
      <div className="relative mx-auto flex h-16 w-full max-w-[100rem] items-center gap-4 px-4 sm:px-6 lg:h-20 lg:px-10 xl:px-14">
        
        <button
          type="button"
          className="-ml-2 inline-flex size-10 items-center justify-center rounded-full text-foreground hover:bg-muted lg:hidden"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          onClick={() => {
            setMenuOpen((o) => !o)
            setMobileSearchOpen(false) // Close search if opening menu
          }}
        >
          {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>

        <a href="/" className="flex shrink-0 items-center gap-2.5" aria-label="Abhay's Roof Garden home">
          <div className="relative flex size-10 shrink-0 overflow-hidden rounded-full border border-border shadow-sm sm:size-12">
            <Image 
              src="/images/logo2.png" 
              alt="Abhay's Roof Garden Logo" 
              fill 
              sizes="48px" 
              className="object-cover"
            />
          </div>
          <span className="flex flex-col justify-center leading-none">
            <span className="font-serif text-lg font-bold tracking-tight text-foreground whitespace-nowrap sm:text-xl lg:text-2xl">
              {"Abhay's Roof Garden"}
            </span>
            <span className="mt-0.5 text-[9px] font-bold uppercase tracking-[0.2em] text-muted-foreground sm:text-[10px]">
              Homegrown Nursery
            </span>
          </span>
        </a>

        {/* Desktop Navigation - Fixed wrapping and added animations */}
        <nav aria-label="Main" className="mx-auto hidden lg:block overflow-hidden px-2">
          <ul className="flex items-center gap-5 xl:gap-8">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="relative py-2 text-sm font-semibold text-foreground/80 whitespace-nowrap transition-colors hover:text-[#1A3325] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-[#1A3325] after:transition-all after:duration-300 hover:after:w-full"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto flex shrink-0 items-center gap-1 lg:ml-0">
          
          {/* Desktop Search Form */}
          <form role="search" className="relative mr-2 hidden lg:block" onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="desktop-search" className="sr-only">Search plants</label>
            <button 
              type="submit" 
              className="absolute left-3.5 top-1/2 flex -translate-y-1/2 items-center justify-center text-muted-foreground transition-colors hover:text-[#1A3325]"
              aria-label="Submit search"
            >
              <Search className="size-4" aria-hidden="true" />
            </button>
            <input
              id="desktop-search"
              type="search"
              placeholder="Search plants..."
              className="h-10 w-44 rounded-full border border-border bg-card pr-4 pl-10 text-sm placeholder:text-muted-foreground transition-all focus:w-64 focus:border-[#1A3325] focus:outline-none focus:ring-2 focus:ring-[#1A3325]/20 xl:w-60 xl:focus:w-72"
            />
          </form>
          
          {/* Mobile Search Button */}
          <button 
            type="button" 
            onClick={() => {
              setMobileSearchOpen(true)
              setMenuOpen(false)
            }}
            className="inline-flex size-10 items-center justify-center rounded-full text-foreground transition-colors hover:bg-muted hover:text-[#1A3325] lg:hidden" 
            aria-label="Open mobile search"
          >
            <Search className="size-5" />
          </button>
          
          <button type="button" className="hidden size-10 items-center justify-center rounded-full text-foreground transition-colors hover:bg-muted hover:text-[#1A3325] sm:inline-flex" aria-label="Wishlist">
            <Heart className="size-5" />
          </button>
          <button type="button" className="hidden size-10 items-center justify-center rounded-full text-foreground transition-colors hover:bg-muted hover:text-[#1A3325] sm:inline-flex" aria-label="Account">
            <User className="size-5" />
          </button>
          
          <button
            type="button"
            className="relative inline-flex size-10 items-center justify-center rounded-full text-foreground transition-colors hover:bg-muted hover:text-[#1A3325]"
            aria-label={`Cart, ${count} ${count === 1 ? 'item' : 'items'}`}
          >
            <ShoppingBag className="size-5" />
            <span
              className="absolute right-0.5 top-0.5 flex min-w-4.5 items-center justify-center rounded-full bg-[#E5A849] px-1 text-[10px] font-bold leading-4.5 text-white shadow-sm"
              aria-hidden="true"
            >
              {count}
            </span>
          </button>
        </div>

        {/* Slide-down Mobile Search Overlay */}
        <div className={`absolute inset-0 z-50 flex items-center justify-center bg-background/98 px-4 backdrop-blur-md transition-all duration-300 lg:hidden ${mobileSearchOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'}`}>
          <form className="flex w-full max-w-lg items-center gap-2 rounded-full border border-border bg-card px-4 py-1 shadow-sm" onSubmit={(e) => { e.preventDefault(); setMobileSearchOpen(false); }}>
            <Search className="size-4.5 shrink-0 text-muted-foreground" aria-hidden="true" />
            <input
              type="search"
              placeholder="Search for plants, pots, accessories..."
              className="h-10 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              // Only autofocus if the panel is currently open to prevent weird scrolling jumps
              autoFocus={mobileSearchOpen}
            />
            <button 
              type="button" 
              onClick={() => setMobileSearchOpen(false)} 
              className="shrink-0 rounded-full p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
              aria-label="Close search"
            >
              <X className="size-4.5" />
            </button>
          </form>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {menuOpen && (
        <nav id="mobile-nav" aria-label="Mobile" className="border-t border-border bg-background lg:hidden">
          <ul className="mx-auto flex max-w-7xl flex-col px-4 py-2 sm:px-6">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="block border-b border-border/60 py-3.5 text-base font-medium last:border-0"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="flex gap-3 py-4 sm:hidden">
              <a href="#" className="flex flex-1 items-center justify-center gap-2 rounded-full border border-border py-2.5 text-sm font-medium">
                <User className="size-4" aria-hidden="true" /> Account
              </a>
              <a href="#" className="flex flex-1 items-center justify-center gap-2 rounded-full border border-border py-2.5 text-sm font-medium">
                <Heart className="size-4" aria-hidden="true" /> Wishlist
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  )
}
```

### Component: `/src/components/store/product-card.tsx`
```tsx
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

```

### Component: `/src/components/store/products.ts`
```tsx
export type Filter = 'all' | 'beginner' | 'low-light' | 'pet-friendly'

export type Product = {
  id: string
  tag: string
  name: string
  botanical: string
  image: string
  alt: string
  rating: number
  reviews: number
  light: 'Low light' | 'Bright indirect' | 'Full sun'
  care: 1 | 2 | 3
  badge?: string
  sizes: { label: 'S' | 'M' | 'L'; price: number; mrp?: number }[]
  filters: Filter[]
}

export const filters: { id: Filter; label: string }[] = [
  { id: 'all', label: 'All bestsellers' },
  { id: 'beginner', label: 'Beginner friendly' },
  { id: 'low-light', label: 'Low light' },
  { id: 'pet-friendly', label: 'Pet friendly' },
]

export const products: Product[] = [
  {
    id: 'monstera',
    tag: '014',
    name: 'Monstera Deliciosa',
    botanical: 'Monstera deliciosa',
    image: '/images/monstera.png',
    alt: 'Monstera Deliciosa in a cream ceramic pot',
    rating: 4.9,
    reviews: 412,
    light: 'Bright indirect',
    care: 1,
    badge: 'Bestseller',
    sizes: [
      { label: 'S', price: 649 },
      { label: 'M', price: 899, mrp: 1199 },
      { label: 'L', price: 1499 },
    ],
    filters: ['all', 'beginner'],
  },
  {
    id: 'peace-lily',
    tag: '027',
    name: 'Peace Lily',
    botanical: 'Spathiphyllum wallisii',
    image: '/images/peace-lily.png',
    alt: 'Peace lily with white blooms in a cream ceramic pot',
    rating: 4.8,
    reviews: 268,
    light: 'Low light',
    care: 2,
    badge: 'Air purifier',
    sizes: [
      { label: 'S', price: 449 },
      { label: 'M', price: 649 },
      { label: 'L', price: 999 },
    ],
    filters: ['all', 'low-light'],
  },
  {
    id: 'pothos',
    tag: '003',
    name: 'Golden Money Plant',
    botanical: 'Epipremnum aureum',
    image: '/images/pothos.png',
    alt: 'Golden pothos with trailing vines in a terracotta pot',
    rating: 4.9,
    reviews: 587,
    light: 'Low light',
    care: 1,
    sizes: [
      { label: 'S', price: 249 },
      { label: 'M', price: 399, mrp: 499 },
      { label: 'L', price: 649 },
    ],
    filters: ['all', 'beginner', 'low-light'],
  },
  {
    id: 'areca',
    tag: '041',
    name: 'Areca Palm',
    botanical: 'Dypsis lutescens',
    image: '/images/areca-palm.png',
    alt: 'Areca palm with feathery fronds in a cream ceramic pot',
    rating: 4.7,
    reviews: 193,
    light: 'Bright indirect',
    care: 2,
    sizes: [
      { label: 'S', price: 549 },
      { label: 'M', price: 849 },
      { label: 'L', price: 1349 },
    ],
    filters: ['all', 'beginner', 'pet-friendly'],
  },
  {
    id: 'jade',
    tag: '019',
    name: 'Lucky Jade',
    botanical: 'Crassula ovata',
    image: '/images/jade.png',
    alt: 'Bushy jade plant in a small terracotta pot',
    rating: 4.8,
    reviews: 341,
    light: 'Full sun',
    care: 1,
    badge: 'Gift pick',
    sizes: [
      { label: 'S', price: 299 },
      { label: 'M', price: 449 },
      { label: 'L', price: 749 },
    ],
    filters: ['all', 'beginner'],
  },
  {
    id: 'hibiscus',
    tag: '052',
    name: 'Red Hibiscus',
    botanical: 'Hibiscus rosa-sinensis',
    image: '/images/hibiscus.png',
    alt: 'Red hibiscus in bloom in a terracotta pot',
    rating: 4.7,
    reviews: 156,
    light: 'Full sun',
    care: 3,
    badge: 'In bloom',
    sizes: [
      { label: 'S', price: 349 },
      { label: 'M', price: 549, mrp: 699 },
      { label: 'L', price: 899 },
    ],
    filters: ['all', 'pet-friendly'],
  },
  {
    id: 'snake-plant',
    tag: '008',
    name: 'Snake Plant',
    botanical: 'Sansevieria trifasciata',
    image: '/images/snake-plant.png',
    alt: 'Snake plant with tall architectural leaves in a cream ceramic pot',
    rating: 4.9,
    reviews: 832,
    light: 'Low light',
    care: 1,
    badge: 'Indestructible',
    sizes: [
      { label: 'S', price: 299 },
      { label: 'M', price: 499, mrp: 599 },
      { label: 'L', price: 899 },
    ],
    filters: ['all', 'beginner', 'low-light'],
  },
  {
    id: 'spider-plant',
    tag: '022',
    name: 'Spider Plant',
    botanical: 'Chlorophytum comosum',
    image: '/images/spider-plant.png',
    alt: 'Spider plant with arching variegated leaves in a terracotta pot',
    rating: 4.8,
    reviews: 415,
    light: 'Bright indirect',
    care: 1,
    badge: 'Fast grower',
    sizes: [
      { label: 'S', price: 199 },
      { label: 'M', price: 349 },
      { label: 'L', price: 549 },
    ],
    filters: ['all', 'beginner', 'pet-friendly'],
  },
]

export const formatINR = (n: number) => `₹${n.toLocaleString('en-IN')}`
```

### Component: `/src/components/store/quiz/plant-finder.tsx`
```tsx
'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Check, Clock, RefreshCcw, ShieldCheck, Sun, Star, ShoppingBag } from 'lucide-react'
import { products } from '@/components/store/products'
import { useCart } from '@/components/store/cart-context'
import { useInView } from '@/hooks/use-in-view'

const questions = [
  {
    id: 'light',
    title: 'How much light does your space get?',
    icon: Sun,
    options: [
      { label: 'Low light', value: 'Low light', desc: 'Away from windows' },
      { label: 'Bright, indirect', value: 'Bright indirect', desc: 'Near a window' },
      { label: 'Direct sun', value: 'Full sun', desc: 'Balcony or terrace' },
    ]
  },
  {
    id: 'care',
    title: 'How much time can you give your plant?',
    icon: Clock,
    options: [
      { label: 'Very little', value: 1, desc: 'Water & forget' },
      { label: 'A little weekly', value: 2, desc: 'Weekend care' },
      { label: 'I enjoy gardening', value: 3, desc: 'Daily attention' },
    ]
  },
  {
    id: 'pets',
    title: 'Do you have pets at home?',
    icon: ShieldCheck,
    options: [
      { label: 'Yes, need pet-friendly', value: 'pet-friendly', desc: 'Safe for cats & dogs' },
      { label: 'No pets', value: 'none', desc: 'I can grow anything' },
    ]
  }
]

export function PlantFinder() {
  const { addItem } = useCart()
  const { ref: sectionRef, isInView } = useInView({ threshold: 0.15 })
  
  const [step, setStep] = useState(1)
  const [answers, setAnswers] = useState<Record<string, any>>({})
  const [result, setResult] = useState<(typeof products)[0] | null>(null)
  const [isAnimating, setIsAnimating] = useState(false)
  const [added, setAdded] = useState(false)

  const goToStep = (newStep: number) => {
    setIsAnimating(true)
    setTimeout(() => {
      setStep(newStep)
      setIsAnimating(false)
    }, 250) 
  }

  const handleSelect = (questionId: string, value: any) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }))
    
    if (step < questions.length) {
      goToStep(step + 1)
    } else {
      calculateResult({ ...answers, [questionId]: value })
    }
  }

  const calculateResult = (finalAnswers: Record<string, any>) => {
    let matches = products.filter(p => p.light === finalAnswers.light)
    if (matches.length === 0) matches = products 
    
    const careMatches = matches.filter(p => p.care === finalAnswers.care)
    if (careMatches.length > 0) matches = careMatches

    if (finalAnswers.pets === 'pet-friendly') {
      const petMatches = matches.filter(p => p.filters.includes('pet-friendly'))
      if (petMatches.length > 0) matches = petMatches
    }

    setResult(matches[0] || products.find(p => p.id === 'snake-plant') || products[0])
    goToStep(4)
  }

  const resetQuiz = () => {
    setAnswers({})
    setResult(null)
    setAdded(false)
    goToStep(1) 
  }

  const handleAddToCart = () => {
    addItem()
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  const CurrentIcon = step <= questions.length ? questions[step - 1].icon : Sun

  return (
    <section className="w-full bg-[#0F291E] px-4 py-10 sm:px-6 lg:px-10 xl:px-14 lg:py-12">
      <div 
        ref={sectionRef}
        className={`mx-auto w-full max-w-[100rem] transition-all duration-1000 ease-out ${
          isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        
        <div className="mx-auto max-w-2xl text-center mb-8 lg:mb-10">
          <p className="text-[10px] font-bold uppercase tracking-widest text-[#E5A849] sm:text-xs">
            Plant Finder
          </p>
          <h2 className="mt-2 font-serif text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
            Find your perfect plant
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-white/80 sm:text-base">
            Answer three quick questions and we'll match you with a plant that fits your home.
          </p>
        </div>

        <div className="mx-auto w-full max-w-4xl overflow-hidden rounded-[2rem] bg-white p-6 shadow-2xl sm:p-8 lg:p-10">
          <div className={`mx-auto w-full transition-all duration-250 ease-out will-change-transform ${isAnimating ? 'opacity-0 scale-[0.98]' : 'opacity-100 scale-100'}`}>
            
            {step > 0 && step <= questions.length && (
              <div className="flex flex-col">
                <div className="mb-6 flex items-center justify-between sm:mb-8">
                  <span className="text-xs font-semibold text-muted-foreground sm:text-sm">
                    Question {step} of {questions.length}
                  </span>
                  <div className="flex gap-1.5">
                    {[1, 2, 3].map((num) => (
                      <div 
                        key={num} 
                        className={`h-1 w-6 sm:w-8 rounded-full ${num <= step ? 'bg-[#0F291E]' : 'bg-gray-200'}`} 
                      />
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center gap-3 mb-6 sm:gap-4 sm:mb-8">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#F4F7F5] text-[#0F291E] sm:size-12">
                    <CurrentIcon className="size-5 sm:size-6" />
                  </div>
                  <h3 className="font-serif text-xl font-semibold leading-tight text-[#0F291E] sm:text-2xl lg:text-3xl">
                    {questions[step - 1].title}
                  </h3>
                </div>
                
                <div className="grid gap-3 sm:grid-cols-3 lg:gap-5">
                  {questions[step - 1].options.map((option) => (
                    <button
                      key={option.label}
                      onClick={() => handleSelect(questions[step - 1].id, option.value)}
                      className="group flex flex-col items-start justify-center rounded-2xl border border-gray-100 bg-[#FAFAFA] p-5 text-left transition-all duration-200 hover:border-[#0F291E] hover:bg-white hover:shadow-sm active:scale-95 sm:min-h-[120px] sm:p-6"
                    >
                      <span className="text-sm font-semibold text-[#0F291E] sm:text-base">
                        {option.label}
                      </span>
                      <span className="mt-1 text-xs text-muted-foreground sm:mt-1.5">
                        {option.desc}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 4 && result && (
              <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-10">
                <div className="relative aspect-square w-full shrink-0 overflow-hidden rounded-2xl bg-[#F3EFEA] sm:w-[40%]">
                  <div className="absolute left-3 top-3 z-10 rounded-full bg-[#D47E5B] px-3 py-1 text-[10px] font-bold text-white sm:left-4 sm:top-4">
                    Your match
                  </div>
                  <Image
                    src={result.image}
                    alt={result.alt}
                    fill
                    className="object-cover object-bottom"
                  />
                </div>
                
                <div className="flex flex-1 flex-col text-left">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-[#D47E5B] sm:text-xs">
                    We Recommend
                  </p>
                  
                  <h3 className="mt-1 font-serif text-2xl font-bold text-[#0F291E] sm:text-3xl lg:text-4xl">
                    {result.name}
                  </h3>
                  
                  <p className="mt-2 text-sm text-muted-foreground">
                    Indoor • {result.light} • Care Level: {result.care}
                  </p>
                  
                  <div className="mt-3 flex items-center gap-1.5">
                    <Star className="size-4 fill-[#E5A849] text-[#E5A849]" />
                    <span className="text-sm font-bold text-[#0F291E]">{result.rating}</span>
                    <span className="text-sm text-muted-foreground">({result.reviews} reviews)</span>
                  </div>
                  
                  <div className="mt-4 flex items-end gap-2 sm:mt-6">
                    <span className="text-2xl font-bold text-[#0F291E] sm:text-3xl">₹{result.sizes[0].price}</span>
                    {result.sizes[0].mrp && (
                      <span className="mb-1 text-sm font-medium text-muted-foreground line-through">₹{result.sizes[0].mrp}</span>
                    )}
                  </div>
                  
                  {/* MOBILE FIX: Buttons now sit side-by-side on phone (flex-row instead of flex-col) */}
                  <div className="mt-6 flex w-full flex-row items-center gap-3 sm:mt-8 sm:w-auto">
                    
                    <button
                      onClick={handleAddToCart}
                      // App-style proportion: primary button takes up more space (flex-[2])
                      className={`flex h-12 flex-[2] items-center justify-center gap-2 rounded-full text-sm font-bold shadow-sm transition-all active:scale-[0.98] sm:flex-none sm:px-8 ${
                        added ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-[#0F291E] text-white hover:bg-[#0F291E]/90'
                      }`}
                    >
                      {added ? (
                        <><Check className="size-4" /> Added</>
                      ) : (
                        <><ShoppingBag className="size-4" /> Add to Cart</>
                      )}
                    </button>
                    
                    <button
                      onClick={resetQuiz}
                      // Secondary button takes up less space (flex-1)
                      className="flex h-12 flex-1 items-center justify-center gap-1.5 rounded-full border border-gray-200 bg-white text-sm font-semibold text-[#0F291E] transition-all hover:bg-gray-50 active:scale-[0.98] sm:gap-2 sm:flex-none sm:px-6"
                    >
                      <RefreshCcw className="size-4" /> Retake
                    </button>
                    
                  </div>
                </div>

              </div>
            )}

          </div>
        </div>
      </div>
    </section>
  )
}
```

### Component: `/src/components/store/reviews/customer-reviews.tsx`
```tsx
'use client'

import Image from 'next/image'
import { ArrowRight, ShieldCheck, Star, MoveRight } from 'lucide-react'
import { useInView } from '@/hooks/use-in-view'

// Authentic review data including the newly added 5th review to perfect the grid
const reviews = [
  { 
    id: 1,
    img: '/images/customer-1.jpg', 
    name: "Sneha Roy", 
    city: "Kolkata", 
    plant: "Monstera Deliciosa", 
    when: "3 months ago", 
    text: "Six months in and my monstera has thrown five new leaves. It's become the centrepiece of our living room." 
  },
  { 
    id: 2,
    img: '/images/customer-2.jpg', 
    name: "Ramesh Iyer", 
    city: "Pune", 
    plant: "Red Hibiscus", 
    when: "1 month ago", 
    text: "The hibiscus arrived with buds already on it. It hasn't stopped flowering since — my balcony has never looked better." 
  },
  { 
    id: 3,
    img: '/images/customer-3.jpg', 
    name: "Priya Nair", 
    city: "Bengaluru", 
    plant: "Golden Money Plant", 
    when: "4 months ago", 
    text: "Ordered on a Tuesday, it was on my sofa by Friday. The vines have grown almost a foot since, and two cuttings I took have rooted in water." 
  },
  { 
    id: 4,
    img: '/images/customer-4.jpg', 
    name: "Farhan Sheikh", 
    city: "Mumbai", 
    plant: "Snake Plant", 
    when: "1 month ago", 
    text: "Came well packed with no soil spillage and the leaves were spotless. A month later it's already taller than when it arrived." 
  },
  { 
    id: 5,
    img: '/images/customer-5.jpg', 
    name: "Meera Balan", 
    city: "Chennai", 
    plant: "Jade Succulent", 
    when: "2 months ago", 
    text: "My balcony corner finally looks like a corner. Three pots, all alive, all growing — not one has let me down yet." 
  },
]

export function CustomerReviews() {
  const { ref: sectionRef, isInView } = useInView({ threshold: 0.1 })

  return (
    // Tightened top and bottom spacing
    <section className="w-full overflow-hidden bg-[#F9F8F6] px-4 py-8 sm:px-6 lg:px-10 xl:px-14 lg:py-12">
      <div ref={sectionRef} className="mx-auto w-full max-w-[100rem]">
        
        {/* Header Section */}
        <div className={`flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 transition-all duration-700 ease-out ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#C26743] sm:text-xs">
              Straight from their homes
            </p>
            <h2 className="mt-2 font-serif text-3xl font-bold tracking-tight text-[#1A3325] sm:text-4xl lg:text-5xl">
              Real plants, real homes
            </h2>
          </div>
          <a href="#" className="hidden items-center gap-1.5 text-sm font-semibold text-[#1A3325] transition-colors hover:text-[#C26743] sm:inline-flex">
            See all reviews <ArrowRight className="size-4" />
          </a>
        </div>

        {/* Mobile Swipe Cue */}
        <div className={`mt-5 flex items-center gap-2 text-xs font-semibold text-muted-foreground sm:hidden transition-all duration-700 delay-200 ease-out ${isInView ? 'opacity-100' : 'opacity-0'}`}>
          Swipe to read more <MoveRight className="size-3.5 animate-pulse" />
        </div>

        {/* Grid / Mobile Slider Layout */}
        <div className="no-scrollbar -mx-4 mt-3 flex snap-x snap-mandatory overflow-x-auto px-4 pb-4 gap-4 sm:mx-0 sm:mt-8 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-6 lg:gap-8 sm:overflow-visible sm:px-0 sm:pb-0">
          
          {reviews.map((r, index) => (
            <figure 
              key={r.id} 
              className="group flex w-[85vw] shrink-0 snap-start flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all duration-700 ease-out hover:shadow-xl sm:w-auto sm:border-transparent sm:shadow-sm"
              style={{ 
                transitionDelay: `${(index + 1) * 100}ms`,
                opacity: isInView ? 1 : 0,
                transform: isInView ? 'translateY(0)' : 'translateY(20px)'
              }}
            >
              {/* Image Section */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
                <Image 
                  src={r.img} 
                  alt={`${r.plant} at ${r.name}'s home`} 
                  fill 
                  className="object-cover transition-transform duration-1000 group-hover:scale-105" 
                />
                {/* MOVED TO BOTTOM LEFT: Verified Buyer tag now sits at the bottom so it doesn't hide faces */}
                <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-[10px] font-bold text-[#1A3325] shadow-sm backdrop-blur-md sm:text-[11px]">
                  <ShieldCheck className="size-3.5 text-green-600" /> Verified buyer
                </span>
              </div>
              
              {/* Content Section */}
              <figcaption className="flex flex-1 flex-col p-5 sm:p-6 lg:p-8">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <div className="flex text-[#E5A849]">
                    {[...Array(5)].map((_, i) => <Star key={i} className="size-4 fill-current" />)}
                  </div>
                  <span className="ml-1 text-[11px] sm:text-xs">{r.when}</span>
                </div>
                
                <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-gray-700 sm:text-base">
                  “{r.text}”
                </blockquote>
                
                <div className="mt-6 flex items-center justify-between gap-3 border-t border-gray-100 pt-5">
                  <div>
                    <p className="text-sm font-bold text-[#1A3325]">{r.name} · <span className="font-medium text-muted-foreground">{r.city}</span></p>
                    <p className="mt-0.5 text-[11px] font-medium text-muted-foreground sm:text-xs">Bought the {r.plant}</p>
                  </div>
                  <a href="#" className="shrink-0 rounded-full bg-[#F4F7F5] px-4 py-2 text-[11px] font-bold text-[#1A3325] transition-colors hover:bg-[#1A3325] hover:text-white sm:text-xs">
                    Shop this
                  </a>
                </div>
              </figcaption>
            </figure>
          ))}

          {/* TABLET / DESKTOP Aggregate Block: Perfectly fills the 6th slot in the grid */}
          <div 
            className="hidden sm:flex flex-col justify-center gap-4 rounded-2xl bg-[#1A3325] p-6 text-white lg:p-8 xl:p-10 transition-all duration-700 delay-500 ease-out"
            style={{ 
              opacity: isInView ? 1 : 0,
              transform: isInView ? 'translateY(0)' : 'translateY(20px)'
            }}
          >
            <div className="flex text-[#E5A849]">
              {[...Array(5)].map((_, i) => <Star key={i} className="size-6 fill-current sm:size-8" />)}
            </div>
            <p className="font-serif text-4xl font-bold tracking-tight xl:text-5xl">4.9 out of 5</p>
            <p className="mt-1 text-sm leading-relaxed text-white/80 xl:text-base">
              from 2,400+ verified reviews across India. Every plant is checked by hand the morning it leaves our rooftop.
            </p>
            <a href="#" className="mt-4 inline-flex w-fit items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-[#1A3325] transition-transform hover:scale-[1.02] active:scale-95">
              Read all reviews <ArrowRight className="size-4" />
            </a>
          </div>

        </div>

        {/* MOBILE ONLY Aggregate Block: Moved OUTSIDE the slider so users don't have to swipe to see it! */}
        <div className="mt-6 flex flex-col items-center justify-center gap-3 rounded-2xl bg-[#1A3325] p-6 text-center text-white sm:hidden">
            <div className="flex text-[#E5A849]">
              {[...Array(5)].map((_, i) => <Star key={i} className="size-5 fill-current" />)}
            </div>
            <p className="font-serif text-3xl font-bold tracking-tight">4.9 out of 5</p>
            <p className="text-xs leading-relaxed text-white/80">
              from 2,400+ verified reviews. Hand-checked before leaving our roof.
            </p>
            <a href="#" className="mt-2 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-xs font-bold text-[#1A3325] transition-transform active:scale-95">
              Read all reviews <ArrowRight className="size-3.5" />
            </a>
        </div>

      </div>
    </section>
  )
}
```

### Component: `/src/components/ui/button.tsx`
```tsx
import { Button as ButtonPrimitive } from '@base-ui/react/button'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground [a]:hover:bg-primary/80',
        outline:
          'border-border bg-background hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80 aria-expanded:bg-secondary aria-expanded:text-secondary-foreground',
        ghost:
          'hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50',
        destructive:
          'bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default:
          'h-8 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2',
        xs: "h-6 gap-1 rounded-[min(var(--radius-md),10px)] px-2 text-xs in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-7 gap-1 rounded-[min(var(--radius-md),12px)] px-2.5 text-[0.8rem] in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
        lg: 'h-9 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2',
        icon: 'size-8',
        'icon-xs':
          "size-6 rounded-[min(var(--radius-md),10px)] in-data-[slot=button-group]:rounded-lg [&_svg:not([class*='size-'])]:size-3",
        'icon-sm':
          'size-7 rounded-[min(var(--radius-md),12px)] in-data-[slot=button-group]:rounded-lg',
        'icon-lg': 'size-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

function Button({
  className,
  variant = 'default',
  size = 'default',
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }

```


