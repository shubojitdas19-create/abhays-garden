'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, BadgeCheck, MapPin, Star } from 'lucide-react'
import { nurseries, products } from '@/components/store/products'

const categories = [
  { id: 'all', label: 'All nurseries' },
  { id: 'rooftop', label: 'Rooftop growers' },
  { id: 'bonsai', label: 'Bonsai & exotics' },
  { id: 'flowering', label: 'Flowering' },
  { id: 'nearby', label: 'Nearby · under 10 km' },
] as const

type CategoryId = (typeof categories)[number]['id']

function matchesCategory(category: CategoryId, nursery: (typeof nurseries)[number]) {
  if (category === 'all') return true
  if (category === 'nearby') return nursery.distanceKm !== undefined && nursery.distanceKm < 10
  if (category === 'rooftop') return /rooftop|terrace/i.test(`${nursery.name} ${nursery.tagline} ${nursery.bio}`)
  if (category === 'bonsai') return /bonsai|exotic/i.test(`${nursery.specialty} ${nursery.bio}`)
  return products.some((product) => product.nursery.id === nursery.id && product.filters.includes('flowering'))
}

export function NurseriesDirectory() {
  const [activeCategory, setActiveCategory] = useState<CategoryId>('all')
  const visibleNurseries = useMemo(
    () => nurseries.filter((nursery) => matchesCategory(activeCategory, nursery)),
    [activeCategory],
  )

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

        <div className="-mx-4 mb-7 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0" role="group" aria-label="Filter nurseries">
          <div className="flex w-max gap-2">
            {categories.map((category) => {
              const selected = activeCategory === category.id
              return <button key={category.id} type="button" aria-pressed={selected} onClick={() => setActiveCategory(category.id)} className={`min-h-10 rounded-full border px-4 text-xs font-semibold transition-colors sm:text-sm ${selected ? 'border-[#1A3325] bg-[#1A3325] text-white' : 'border-[#dedfd7] bg-white text-[#536258] hover:border-[#1A3325]'}`}>{category.label}</button>
            })}
          </div>
        </div>

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
