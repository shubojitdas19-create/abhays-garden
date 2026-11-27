'use client'

import { useState, useMemo, useEffect } from 'react'
import { Filter as FilterIcon, ArrowDownUp, X, Check } from 'lucide-react'
import { SiteHeader } from '@/components/store/layout/site-header'
import { CartProvider } from '@/components/store/cart-context'
import { ProductCard } from '@/components/store/product-card'
import { products, filters, type ProductFilter } from '@/components/store/products'

const sortOptions = [
  { id: 'featured', label: 'Featured' },
  { id: 'price-low', label: 'Price: Low to High' },
  { id: 'price-high', label: 'Price: High to Low' },
  { id: 'rating', label: 'Top Rated' },
]

export default function ShopPage() {
  const [activeFilter, setActiveFilter] = useState<ProductFilter>('all')
  const [priceUnder499, setPriceUnder499] = useState(false)
  const [activeSort, setActiveSort] = useState('featured')
  
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false)
  const [isMobileSortOpen, setIsMobileSortOpen] = useState(false)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const requestedFilter = filters.find((filter) => filter.id === params.get('filter'))
    if (requestedFilter) setActiveFilter(requestedFilter.id)
    setPriceUnder499(params.get('price') === 'under-499')
  }, [])

  useEffect(() => {
    if (isMobileFilterOpen || isMobileSortOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => { document.body.style.overflow = 'unset' }
  }, [isMobileFilterOpen, isMobileSortOpen])

  const activeFilterLabel = filters.find((filter) => filter.id === activeFilter)?.label ?? 'All Plants'
  const pageTitle = priceUnder499 ? 'Plants under ₹499' : activeFilter === 'all' ? 'All Plants' : activeFilterLabel

  const displayProducts = useMemo(() => {
    let result = [...products]
    if (activeFilter !== 'all') {
      result = result.filter(p => p.filters.includes(activeFilter))
    }
    if (priceUnder499) {
      result = result.filter((product) => (product.sizes[1] ?? product.sizes[0]).price < 500)
    }
    if (activeSort === 'price-low') {
      result.sort((a, b) => a.sizes[0].price - b.sizes[0].price)
    } else if (activeSort === 'price-high') {
      result.sort((a, b) => b.sizes[0].price - a.sizes[0].price)
    } else if (activeSort === 'rating') {
      result.sort((a, b) => (b.rating || 0) - (a.rating || 0))
    }
    return result
  }, [activeFilter, activeSort, priceUnder499])

  return (
    <CartProvider>
      <SiteHeader />
      
      <main className="mx-auto w-full max-w-[100rem] px-4 pt-6 pb-20 sm:px-6 lg:px-10 xl:px-14 lg:pt-10 lg:pb-12">
        
        <div className="mb-6 flex items-end justify-between border-b border-gray-200 pb-5 sm:mb-8">
          <div>
            <h1 className="font-serif text-3xl font-bold tracking-tight text-[#1A3325] sm:text-4xl lg:text-5xl">
              {pageTitle}
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
                    onClick={() => { setActiveFilter('all'); setPriceUnder499(false) }}
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

            <div>
              <h3 className="font-serif text-lg font-bold text-[#1A3325]">Price</h3>
              <button type="button" aria-pressed={priceUnder499} onClick={() => setPriceUnder499((active) => !active)} className="mt-4 flex w-full items-center gap-3 text-left text-sm">
                <span className={`flex size-4.5 shrink-0 items-center justify-center rounded-[4px] border ${priceUnder499 ? 'border-[#1A3325] bg-[#1A3325] text-white' : 'border-gray-300 bg-white'}`}>{priceUnder499 && <Check className="size-3.5" />}</span>
                <span className={priceUnder499 ? 'font-bold text-[#1A3325]' : 'text-gray-600'}>Under ₹499</span>
              </button>
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
                  onClick={() => { setActiveFilter('all'); setPriceUnder499(false) }}
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
          {(activeFilter !== 'all' || priceUnder499) && (
            <span className="flex size-4 items-center justify-center rounded-full bg-[#C26743] text-[9px] font-bold text-white">{Number(activeFilter !== 'all') + Number(priceUnder499)}</span>
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
                <li>
                  <button type="button" aria-pressed={priceUnder499} onClick={() => { setPriceUnder499((active) => !active); setIsMobileFilterOpen(false) }} className="flex w-full items-center gap-4 rounded-xl px-4 py-4 text-left text-sm font-medium transition-colors active:bg-gray-50">
                    <span className={`flex size-5 shrink-0 items-center justify-center rounded-[4px] border ${priceUnder499 ? 'border-[#1A3325] bg-[#1A3325] text-white' : 'border-gray-300 bg-white'}`}>{priceUnder499 && <Check className="size-3.5" />}</span>
                    <span className={priceUnder499 ? 'font-bold text-[#1A3325]' : 'text-gray-700'}>Under ₹499</span>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

    </CartProvider>
  )
}
