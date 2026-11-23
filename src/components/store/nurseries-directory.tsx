'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowDownWideNarrow, ArrowRight, BadgeCheck, ChevronDown, MapPin, SlidersHorizontal, Star } from 'lucide-react'
import { nurseries, products } from '@/components/store/products'

const categories = [
  { id: 'all', label: 'All nurseries' },
  { id: 'rooftop', label: 'Rooftop growers' },
  { id: 'bonsai', label: 'Bonsai & exotics' },
  { id: 'flowering', label: 'Flowering' },
  { id: 'nearby', label: 'Nearby · under 10 km' },
] as const

type CategoryId = (typeof categories)[number]['id']

type SortId = 'recommended' | 'rating' | 'plants' | 'distance'

const sortOptions: { id: SortId; label: string }[] = [
  { id: 'recommended', label: 'Recommended' },
  { id: 'rating', label: 'Top rated' },
  { id: 'plants', label: 'Most plants' },
  { id: 'distance', label: 'Nearest first' },
]

function matchesCategory(category: CategoryId, nursery: (typeof nurseries)[number]) {
  if (category === 'all') return true
  if (category === 'nearby') return nursery.distanceKm !== undefined && nursery.distanceKm < 10
  if (category === 'rooftop') return /rooftop|terrace/i.test(`${nursery.name} ${nursery.tagline} ${nursery.bio}`)
  if (category === 'bonsai') return /bonsai|exotic/i.test(`${nursery.specialty} ${nursery.bio}`)
  return products.some((product) => product.nursery.id === nursery.id && product.filters.includes('flowering'))
}

export function NurseriesDirectory() {
  const [activeCategory, setActiveCategory] = useState<CategoryId>('all')
  const [activeSort, setActiveSort] = useState<SortId>('recommended')
  const visibleNurseries = useMemo(() => {
    const filtered = nurseries.filter((nursery) => matchesCategory(activeCategory, nursery))
    return [...filtered].sort((a, b) => {
      if (activeSort === 'rating') return b.rating - a.rating || a.name.localeCompare(b.name)
      if (activeSort === 'plants') {
        const aCount = products.filter((product) => product.nursery.id === a.id).length
        const bCount = products.filter((product) => product.nursery.id === b.id).length
        return bCount - aCount || a.name.localeCompare(b.name)
      }
      if (activeSort === 'distance') return (a.distanceKm ?? Number.POSITIVE_INFINITY) - (b.distanceKm ?? Number.POSITIVE_INFINITY)
      return nurseries.indexOf(a) - nurseries.indexOf(b)
    })
  }, [activeCategory, activeSort])

  function resetControls() {
    setActiveCategory('all')
    setActiveSort('recommended')
  }

  return (
    <main className="mx-auto w-full max-w-[100rem] px-4 pb-20 pt-7 sm:px-6 sm:pt-10 lg:px-10 xl:px-14">
      <section className="relative isolate overflow-hidden rounded-[1.75rem] bg-[#1A3325] px-6 py-12 text-white sm:rounded-[2rem] sm:px-10 sm:py-16 lg:px-16 lg:py-20" aria-labelledby="nurseries-heading">
        <Image src="/images/hero-rooftop.png" alt="Lush plants growing in a rooftop nursery" fill priority sizes="100vw" className="-z-20 object-cover object-center" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#10271d]/95 via-[#10271d]/75 to-[#10271d]/25" aria-hidden="true" />
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#e7bd7d]">Grown close to home</p>
        <h1 id="nurseries-heading" className="mt-4 max-w-2xl font-serif text-4xl font-semibold leading-[1.08] sm:text-5xl lg:text-6xl">The Nurseries Behind Your Plants</h1>
        <p className="mt-4 max-w-xl text-sm leading-6 text-white/80 sm:text-base sm:leading-7">Meet the hands that nurture every leaf. Discover independent Bengal growers and the plants they know best.</p>
        <div className="mt-7 flex items-center gap-2 text-sm text-white/80"><BadgeCheck className="size-4 text-[#e7bd7d]" aria-hidden="true" />Every grower is personally verified</div>
      </section>

      <section className="pt-9 sm:pt-12" aria-labelledby="growers-list-heading">
        <div className="mb-5 flex flex-col gap-2 sm:mb-7 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#a65f2b]">Rooted in your neighbourhood</p>
            <h2 id="growers-list-heading" className="mt-1 font-serif text-3xl font-semibold text-[#1A3325] sm:text-4xl">Find your grower</h2>
          </div>
          <p className="text-sm text-[#68786b]" aria-live="polite">{visibleNurseries.length} {visibleNurseries.length === 1 ? 'nursery' : 'nurseries'}</p>
        </div>

        <section aria-label="Filter and sort growers" className="mb-7 rounded-2xl border border-[#e7e5dc] bg-white p-4 shadow-[0_8px_24px_rgba(26,51,37,0.04)] sm:p-5">
          <div className="mb-3 flex items-center justify-between md:mb-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-[#304b37]"><SlidersHorizontal className="size-4" aria-hidden="true" /> Refine growers</div>
            {(activeCategory !== 'all' || activeSort !== 'recommended') && <button type="button" onClick={resetControls} className="rounded-md px-2 py-1 text-xs font-semibold text-[#8b572e] transition-colors hover:bg-[#f7f3eb] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1A3325]">Reset</button>}
          </div>

          <div className="grid grid-cols-2 gap-3 md:hidden">
            <label className="min-w-0">
              <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wide text-[#778078]">Grower type</span>
              <span className="relative block">
                <select value={activeCategory} onChange={(event) => setActiveCategory(event.target.value as CategoryId)} className="h-11 w-full appearance-none rounded-xl border border-[#dedfd7] bg-[#fbfaf6] px-3 pr-9 text-xs font-semibold text-[#304b37] outline-none transition focus:border-[#527358] focus:ring-2 focus:ring-[#527358]/20">
                  {categories.map((category) => <option key={category.id} value={category.id}>{category.label}</option>)}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-[#68786b]" aria-hidden="true" />
              </span>
            </label>
            <label className="min-w-0">
              <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wide text-[#778078]">Sort by</span>
              <span className="relative block">
                <select value={activeSort} onChange={(event) => setActiveSort(event.target.value as SortId)} className="h-11 w-full appearance-none rounded-xl border border-[#dedfd7] bg-[#fbfaf6] px-3 pr-9 text-xs font-semibold text-[#304b37] outline-none transition focus:border-[#527358] focus:ring-2 focus:ring-[#527358]/20">
                  {sortOptions.map((option) => <option key={option.id} value={option.id}>{option.label}</option>)}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-[#68786b]" aria-hidden="true" />
              </span>
            </label>
          </div>

          <div className="hidden items-center justify-between gap-5 md:flex">
            <div className="flex min-w-0 flex-wrap gap-2" role="group" aria-label="Filter by grower type">
              {categories.map((category) => {
                const selected = activeCategory === category.id
                return <button key={category.id} type="button" aria-pressed={selected} onClick={() => setActiveCategory(category.id)} className={`min-h-10 rounded-full border px-4 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1A3325] ${selected ? 'border-[#1A3325] bg-[#1A3325] text-white shadow-sm' : 'border-[#dedfd7] bg-[#fbfaf6] text-[#536258] hover:border-[#527358] hover:bg-[#f1f3ed]'}`}>{category.label}</button>
              })}
            </div>
            <label className="flex shrink-0 items-center gap-2 text-sm font-medium text-[#68786b]">
              <ArrowDownWideNarrow className="size-4" aria-hidden="true" />
              <span>Sort</span>
              <span className="relative">
                <select value={activeSort} onChange={(event) => setActiveSort(event.target.value as SortId)} className="h-11 min-w-40 appearance-none rounded-xl border border-[#dedfd7] bg-[#fbfaf6] py-2 pl-3 pr-9 text-sm font-semibold text-[#304b37] outline-none transition focus:border-[#527358] focus:ring-2 focus:ring-[#527358]/20">
                  {sortOptions.map((option) => <option key={option.id} value={option.id}>{option.label}</option>)}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-[#68786b]" aria-hidden="true" />
              </span>
            </label>
          </div>
          <p className="mt-3 text-xs text-[#778078] md:hidden">Showing {visibleNurseries.length} {visibleNurseries.length === 1 ? 'grower' : 'growers'}</p>
        </section>

        {visibleNurseries.length ? <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 xl:grid-cols-3">
          {visibleNurseries.map((nursery) => {
            const plantCount = products.filter((product) => product.nursery.id === nursery.id).length
            return <article key={nursery.id} className="group overflow-hidden rounded-[1.5rem] border border-[#e7e5dc] bg-white shadow-[0_8px_30px_rgba(26,51,37,0.04)] transition-shadow hover:shadow-[0_16px_40px_rgba(26,51,37,0.1)]">
              <Link href={`/nurseries/${nursery.slug}`} className="block focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-[#1A3325]" aria-label={`Visit ${nursery.name}`}>
                <div className="relative aspect-[2/1] overflow-hidden bg-[#e9dcc8]">
                  <Image src={nursery.image} alt={`${nursery.name} growing space`} fill sizes="(min-width: 1280px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                  <span className="absolute top-3 right-3 inline-flex items-center gap-1 rounded-full bg-white/95 px-3 py-1.5 text-[11px] font-semibold text-[#1A3325] shadow-sm"><BadgeCheck className="size-3.5 text-[#527358]" aria-hidden="true" />Verified grower</span>
                </div>
                <div className="relative px-5 pb-5 pt-10 sm:px-6">
                  <div className="absolute -top-8 left-5 size-16 overflow-hidden rounded-full border-[3px] border-white bg-[#e9dcc8] shadow-md sm:left-6">
                    <Image src={nursery.avatar} alt="" fill sizes="64px" className="object-cover" />
                  </div>
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-serif text-xl font-semibold leading-tight text-[#1A3325] sm:text-2xl">{nursery.name}</h3>
                    <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-[#f6f4ed] px-2.5 py-1 text-xs font-semibold text-[#1A3325]"><Star className="size-3.5 fill-[#d69b43] text-[#d69b43]" aria-hidden="true" />{nursery.rating.toFixed(1)}</span>
                  </div>
                  <p className="mt-2 inline-flex items-center gap-1.5 text-xs text-[#68786b] sm:text-sm"><MapPin className="size-3.5" aria-hidden="true" />{nursery.location}</p>
                  <p className="mt-4 inline-flex rounded-full bg-[#edf1e9] px-3 py-1.5 text-xs font-medium text-[#365440]">{nursery.specialty}</p>
                  <div className="mt-5 flex items-center justify-between border-t border-[#ecebe4] pt-4">
                    <span className="text-xs text-[#68786b]">{plantCount} {plantCount === 1 ? 'plant' : 'plants'} to explore</span>
                    <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#1A3325]">Visit nursery <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" /></span>
                  </div>
                </div>
              </Link>
            </article>
          })}
        </div> : <p className="rounded-2xl border border-dashed border-[#d8ddd4] p-8 text-center text-sm text-[#68786b]">No nurseries match this filter yet. Try another category.</p>}
      </section>
    </main>
  )
}
