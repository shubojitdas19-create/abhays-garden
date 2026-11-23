'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { ProductCard } from '@/components/store/product-card'
import type { Product, ProductFilter } from '@/components/store/products'

const catalogFilters: { id: ProductFilter | 'all'; label: string }[] = [
  { id: 'all', label: 'All plants' },
  { id: 'flowering', label: 'Flowering' },
  { id: 'succulents', label: 'Succulents' },
  { id: 'low-light', label: 'Low light' },
  { id: 'air-purifier', label: 'Air purifying' },
]

export function NurseryCatalog({ nursery, products }: { nursery: { specialty: string }; products: Product[] }) {
  const [activeFilter, setActiveFilter] = useState<ProductFilter | 'all'>('all')
  const visibleProducts = useMemo(
    () => activeFilter === 'all' ? products : products.filter((product) => product.filters.includes(activeFilter)),
    [activeFilter, products],
  )

  return (
    <section className="mt-10 sm:mt-14" aria-labelledby="nursery-products-heading">
      <div className="mb-5 flex flex-col gap-2 border-b border-[#e7e5dc] pb-5 sm:mb-7 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#a65f2b]">{nursery.specialty}</p>
          <h2 id="nursery-products-heading" className="mt-1 font-serif text-3xl font-semibold text-[#1A3325] sm:text-4xl">Grown here, for your home</h2>
          <p className="mt-2 text-sm text-[#68786b]" aria-live="polite">{visibleProducts.length} {visibleProducts.length === 1 ? 'plant' : 'plants'} from this nursery</p>
        </div>
        <Link href="/shop" className="hidden text-sm font-semibold text-[#1A3325] underline decoration-[#a65f2b]/50 underline-offset-4 sm:inline">Explore all plants</Link>
      </div>
      <div className="-mx-4 mb-6 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0" role="group" aria-label="Filter this nursery’s plants">
        <div className="flex w-max gap-2">
          {catalogFilters.map((filter) => {
            const selected = activeFilter === filter.id
            return <button key={filter.id} type="button" aria-pressed={selected} onClick={() => setActiveFilter(filter.id)} className={`min-h-10 rounded-full border px-4 text-xs font-semibold transition-colors sm:text-sm ${selected ? 'border-[#1A3325] bg-[#1A3325] text-white' : 'border-[#dedfd7] bg-white text-[#536258] hover:border-[#1A3325]'}`}>{filter.label}</button>
          })}
        </div>
      </div>
      {visibleProducts.length ? (
        <div className="grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-6 sm:gap-y-10 md:grid-cols-3 xl:grid-cols-4">
          {visibleProducts.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
      ) : (
        <p className="rounded-2xl border border-dashed border-[#d8ddd4] p-8 text-center text-sm text-[#68786b]">No plants in this category just yet. Try another filter.</p>
      )}
    </section>
  )
}
