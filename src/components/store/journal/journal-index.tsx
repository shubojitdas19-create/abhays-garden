'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowRight,
  BookOpen,
  Clock,
  Search,
  SlidersHorizontal,
  Sprout,
  X,
} from 'lucide-react'
import {
  getJournalCategory,
  journalArticles,
  journalCategories,
  type JournalCategoryId,
} from '@/lib/store/journal-data'

export function JournalIndex() {
  const [activeCategory, setActiveCategory] = useState<JournalCategoryId>('all')
  const [searchQuery, setSearchQuery] = useState('')

  const featuredArticle = useMemo(
    () => journalArticles.find((article) => article.isFeatured) ?? journalArticles[0],
    [],
  )

  const filteredArticles = useMemo(() => {
    const q = searchQuery.trim().toLowerCase()
    return journalArticles.filter((article) => {
      if (activeCategory !== 'all' && article.categoryId !== activeCategory) {
        return false
      }
      if (q) {
        const category = getJournalCategory(article.categoryId)
        const haystack =
          `${article.title} ${article.excerpt} ${article.author.name} ${category.label}`.toLowerCase()
        if (!haystack.includes(q)) return false
      }
      return true
    })
  }, [activeCategory, searchQuery])

  const hasFilters = activeCategory !== 'all' || searchQuery.trim() !== ''

  // Avoid showing the featured article twice in the unfiltered default view
  const gridArticles = useMemo(() => {
    if (hasFilters) return filteredArticles
    return filteredArticles.filter((article) => article.slug !== featuredArticle.slug)
  }, [featuredArticle.slug, filteredArticles, hasFilters])

  function resetFilters() {
    setActiveCategory('all')
    setSearchQuery('')
  }

  return (
    <main className="min-h-[75vh] bg-[#f7f5ef] pb-14 sm:pb-24">
      {/* Editorial Forest Header */}
      <section className="bg-[#0F291E] text-white" aria-labelledby="journal-heading">
        <div className="mx-auto w-full max-w-[100rem] px-4 py-7 sm:px-6 sm:py-12 lg:px-10 lg:py-14 xl:px-14">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between lg:gap-10">
            <div className="max-w-3xl">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#f0c780] sm:text-xs">
                Botanical Dispatches from Our Rooftop
              </p>
              <h1
                id="journal-heading"
                className="mt-2.5 font-serif text-[1.85rem] font-semibold leading-[1.1] tracking-tight text-balance sm:mt-3 sm:text-5xl lg:text-[3.4rem]"
              >
                The Rooftop Journal: Stories, Guides &amp; Plant Wisdom
              </h1>
              <p className="mt-3 max-w-2xl text-[13.5px] leading-6 text-white/80 sm:mt-4 sm:text-base sm:leading-7">
                Seasonal manuals, soil recipes, and calm styling notes written by our Bengal rooftop growers for real Indian balconies and living rooms.
              </p>
            </div>

            <div className="flex items-center gap-4 text-xs text-white/75 sm:text-sm">
              <span className="inline-flex items-center gap-1.5 tabular-nums">
                <BookOpen className="size-4 text-[#f0c780]" aria-hidden="true" />
                {journalArticles.length} grower guides
              </span>
              <span aria-hidden="true" className="text-white/30">·</span>
              <Link
                href="/community"
                className="inline-flex items-center gap-1 font-semibold text-[#f0c780] transition-colors hover:text-white"
              >
                Ask a plant question <ArrowRight className="size-3.5" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto w-full max-w-[100rem] px-4 pt-6 sm:px-6 sm:pt-10 lg:px-10 xl:px-14">
        {/* Featured Editorial Article Banner */}
        <article className="group overflow-hidden rounded-2xl border border-[#e5e8df] bg-white shadow-[0_16px_45px_-28px_rgba(26,51,37,0.32)] sm:rounded-3xl">
          <Link
            href={`/journal/${featuredArticle.slug}`}
            className="grid grid-cols-1 lg:grid-cols-[1.12fr_0.88fr]"
          >
            {/* Large Cover Image */}
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#edf1e9] lg:aspect-auto lg:min-h-[25rem]">
              <Image
                src={featuredArticle.coverImage}
                alt={featuredArticle.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 56vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />
              <span className="absolute left-3.5 top-3.5 inline-flex items-center gap-1.5 rounded-full bg-[#0F291E]/90 px-3 py-1 text-[11px] font-semibold text-[#f0c780] backdrop-blur-xs sm:left-5 sm:top-5 sm:px-3.5 sm:py-1.5 sm:text-xs">
                <Sprout className="size-3.5" aria-hidden="true" />
                {featuredArticle.featuredTag ?? 'Featured'} · {featuredArticle.readTime}
              </span>
            </div>

            {/* Editorial Copy Panel */}
            <div className="flex flex-col justify-between p-5 sm:p-8 lg:p-10 xl:p-12">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#a65f2b] sm:text-xs">
                  {getJournalCategory(featuredArticle.categoryId).label} · {featuredArticle.publishedAt}
                </p>
                <h2 className="mt-2.5 font-serif text-2xl font-semibold leading-[1.18] tracking-tight text-[#1A3325] transition-colors group-hover:text-[#3d6347] sm:mt-3 sm:text-3xl lg:text-[2.15rem]">
                  {featuredArticle.title}
                </h2>
                <p className="mt-3 text-sm leading-6 text-[#58655b] sm:mt-4 sm:text-[15px] sm:leading-7">
                  {featuredArticle.excerpt}
                </p>
              </div>

              <div className="mt-6 flex flex-col gap-4 border-t border-[#eceee8] pt-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex min-w-0 items-center gap-3">
                  <span className="relative size-10 shrink-0 overflow-hidden rounded-full border border-[#e5e8df] bg-[#edf1e9]">
                    <Image
                      src={featuredArticle.author.avatar}
                      alt={featuredArticle.author.name}
                      fill
                      sizes="40px"
                      className="object-cover"
                    />
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-xs font-semibold text-[#1A3325] sm:text-sm">
                      By {featuredArticle.author.name}
                    </p>
                    <p className="truncate text-[11px] text-[#778078] sm:text-xs">
                      {featuredArticle.author.role}
                    </p>
                  </div>
                </div>

                <span className="inline-flex min-h-10 shrink-0 items-center justify-center gap-1.5 rounded-full bg-[#1A3325] px-5 text-xs font-semibold text-white transition-colors group-hover:bg-[#294735] sm:text-sm">
                  Read manual
                  <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
                </span>
              </div>
            </div>
          </Link>
        </article>

        {/* Category Navigation & Search Bar */}
        <section
          aria-label="Filter journal guides"
          className="mt-6 rounded-2xl border border-[#e5e8df] bg-white p-4 shadow-[0_8px_24px_rgba(26,51,37,0.04)] sm:mt-9 sm:p-5"
        >
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between lg:gap-4">
            {/* Search Input */}
            <label className="relative block lg:order-2 lg:w-72 lg:shrink-0">
              <span className="sr-only">Search journal articles</span>
              <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-[#778078]" aria-hidden="true" />
              <input
                type="search"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search guides (e.g. winter, soil)..."
                className="h-11 w-full rounded-xl border border-[#dedfd7] bg-[#fbfaf6] pl-10 pr-9 text-base text-[#1A3325] outline-none transition placeholder:text-[#8c978d] focus:border-[#527358] focus:bg-white focus:ring-2 focus:ring-[#527358]/20 sm:text-sm"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search"
                  className="absolute right-2 top-1/2 inline-flex size-7 -translate-y-1/2 items-center justify-center rounded-full text-[#778078] hover:bg-[#eceee8] hover:text-[#1A3325]"
                >
                  <X className="size-3.5" aria-hidden="true" />
                </button>
              )}
            </label>

            {/* Category Pills: balanced 2-col grid on mobile, inline flex-wrap on sm+ */}
            <div className="lg:order-1">
              <div className="mb-2.5 flex items-center justify-between lg:hidden">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#536258]">
                  <SlidersHorizontal className="size-3.5 text-[#527358]" aria-hidden="true" />
                  Browse topics
                </span>
                {hasFilters && (
                  <button
                    type="button"
                    onClick={resetFilters}
                    className="text-xs font-semibold text-[#a65f2b]"
                  >
                    Reset
                  </button>
                )}
              </div>

              <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap" role="group" aria-label="Journal categories">
                <button
                  type="button"
                  aria-pressed={activeCategory === 'all'}
                  onClick={() => setActiveCategory('all')}
                  className={`min-h-10 w-full rounded-xl border px-3 text-center text-xs font-semibold transition-colors sm:w-auto sm:rounded-full sm:px-4 sm:text-sm ${
                    activeCategory === 'all'
                      ? 'border-[#1A3325] bg-[#1A3325] text-white shadow-xs'
                      : 'border-[#dedfd7] bg-[#fbfaf6] text-[#536258] hover:border-[#527358] hover:bg-[#f1f3ed]'
                  }`}
                >
                  All Stories
                </button>
                {journalCategories.map((category) => {
                  const isActive = activeCategory === category.id
                  return (
                    <button
                      key={category.id}
                      type="button"
                      aria-pressed={isActive}
                      onClick={() => setActiveCategory(category.id)}
                      className={`min-h-10 w-full rounded-xl border px-3 text-center text-xs font-semibold transition-colors sm:w-auto sm:rounded-full sm:px-4 sm:text-sm ${
                        isActive
                          ? 'border-[#1A3325] bg-[#1A3325] text-white shadow-xs'
                          : 'border-[#dedfd7] bg-[#fbfaf6] text-[#536258] hover:border-[#527358] hover:bg-[#f1f3ed]'
                      }`}
                    >
                      <span className="sm:hidden">{category.shortLabel}</span>
                      <span className="hidden sm:inline">{category.label}</span>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Section Label */}
        <div className="mt-7 flex items-center justify-between gap-3 sm:mt-10">
          <h2 className="font-serif text-xl font-semibold text-[#1A3325] sm:text-2xl">
            {activeCategory === 'all'
              ? searchQuery.trim()
                ? 'Matching guides'
                : 'Latest from the Rooftop'
              : getJournalCategory(activeCategory).label}
          </h2>
          <span className="text-xs font-medium text-[#68786b] tabular-nums sm:text-sm">
            {gridArticles.length} {gridArticles.length === 1 ? 'article' : 'articles'}
          </span>
        </div>

        {/* Article Cards Grid (3 cols desktop, 2 cols tablet, 1 col mobile) */}
        {gridArticles.length > 0 ? (
          <section
            aria-label="Journal articles"
            className="mt-4 grid grid-cols-1 gap-5 sm:mt-6 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-7"
          >
            {gridArticles.map((article) => {
              const category = getJournalCategory(article.categoryId)
              return (
                <article
                  key={article.slug}
                  className="group flex min-w-0 flex-col overflow-hidden rounded-2xl border border-[#e5e8df] bg-white shadow-[0_10px_30px_-24px_rgba(26,51,37,0.3)] transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-0.5 hover:border-[#cad6c7] hover:shadow-[0_18px_40px_-24px_rgba(26,51,37,0.35)] sm:rounded-3xl"
                >
                  <Link href={`/journal/${article.slug}`} className="flex flex-1 flex-col">
                    {/* Cover Photo with smooth hover zoom */}
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#edf1e9]">
                      <Image
                        src={article.coverImage}
                        alt={article.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                    </div>

                    {/* Card Body */}
                    <div className="flex flex-1 flex-col p-4 sm:p-6">
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] font-semibold sm:text-xs">
                        <span className="text-[#a65f2b]">{category.label}</span>
                        <span aria-hidden="true" className="text-[#c5ccc4]">·</span>
                        <span className="inline-flex items-center gap-1 font-medium text-[#68786b] tabular-nums">
                          <Clock className="size-3" aria-hidden="true" />
                          {article.readTime}
                        </span>
                        <span aria-hidden="true" className="text-[#c5ccc4]">·</span>
                        <time dateTime={article.isoDate} className="font-normal text-[#778078]">
                          {article.publishedAt}
                        </time>
                      </div>

                      <h3 className="mt-2.5 font-serif text-lg font-medium leading-snug text-[#1A3325] transition-colors group-hover:text-[#3d6347] sm:text-xl">
                        {article.title}
                      </h3>

                      <p className="mt-2 line-clamp-2 flex-1 text-[13.5px] leading-6 text-[#58655b] sm:text-sm">
                        {article.excerpt}
                      </p>

                      {/* Author Footer */}
                      <div className="mt-4 flex items-center justify-between gap-3 border-t border-[#f0f2ec] pt-3.5 sm:mt-5">
                        <div className="flex min-w-0 items-center gap-2.5">
                          <span className="relative size-7 shrink-0 overflow-hidden rounded-full border border-[#e5e8df] bg-[#edf1e9]">
                            <Image
                              src={article.author.avatar}
                              alt={article.author.name}
                              fill
                              sizes="28px"
                              className="object-cover"
                            />
                          </span>
                          <span className="truncate text-xs font-semibold text-[#304b37]">
                            {article.author.name}
                          </span>
                        </div>
                        <span className="inline-flex shrink-0 items-center gap-1 text-xs font-semibold text-[#527358] group-hover:text-[#1A3325]">
                          Read <ArrowRight className="size-3.5" aria-hidden="true" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </article>
              )
            })}
          </section>
        ) : (
          <section className="mt-6 flex flex-col items-center rounded-2xl border border-dashed border-[#cbd5c9] bg-white px-5 py-12 text-center sm:rounded-3xl sm:px-6 sm:py-14">
            <span className="flex size-12 items-center justify-center rounded-full bg-[#edf1e9] text-[#527358]">
              <BookOpen className="size-5" aria-hidden="true" />
            </span>
            <h3 className="mt-4 font-serif text-xl font-semibold text-[#1A3325]">
              No guides match that search
            </h3>
            <p className="mt-2 max-w-sm text-sm leading-6 text-[#68786b]">
              Try clearing your category filter or search for topics like repotting, winter, or terracotta.
            </p>
            <button
              type="button"
              onClick={resetFilters}
              className="mt-5 inline-flex min-h-11 items-center justify-center rounded-full bg-[#1A3325] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#294735]"
            >
              Show all stories
            </button>
          </section>
        )}

        {/* Bottom Community Bridge CTA */}
        <section
          aria-labelledby="journal-clinic-cta"
          className="mt-10 rounded-2xl border border-[#e0e6dc] bg-[#1A3325] p-5 text-white sm:mt-16 sm:flex sm:items-center sm:justify-between sm:gap-8 sm:rounded-3xl sm:p-10"
        >
          <div className="max-w-xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#f0c780] sm:text-xs">
              Need advice for a specific leaf or pot?
            </p>
            <h2 id="journal-clinic-cta" className="mt-2 font-serif text-2xl font-semibold leading-tight sm:text-3xl">
              Ask our rooftop growers in the Plant Care Clinic
            </h2>
            <p className="mt-2 text-sm leading-6 text-white/75">
              Post a quick photo of your plant and get tailored care advice from our partner nurseries and fellow urban plant parents.
            </p>
          </div>
          <div className="mt-5 shrink-0 sm:mt-0">
            <Link
              href="/community"
              className="inline-flex min-h-12 w-full items-center justify-center gap-2 whitespace-nowrap rounded-full bg-[#E5A849] px-6 text-sm font-semibold text-[#1A3325] transition-colors hover:bg-[#efbc69] sm:w-auto"
            >
              Visit Plant Care Clinic
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </section>
      </div>
    </main>
  )
}
