'use client'

import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowRight,
  BadgeCheck,
  Camera,
  ChevronDown,
  ChevronRight,
  Expand,
  MessageSquareText,
  PenLine,
  Search,
  SlidersHorizontal,
  Sprout,
  Star,
  ThumbsUp,
  X,
} from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { nurseries } from '@/components/store/products'
import {
  BASE_STAR_DISTRIBUTION,
  BASE_TOTAL_VERIFIED_ORDERS,
  initialReviews,
  readHelpfulVotes,
  readStoredReviews,
  saveHelpfulVotes,
  type CustomerReview,
} from '@/lib/store/reviews-data'

type FilterId = 'all' | 'photos' | 'five-star' | 'nursery-replies'
type SortId = 'recent' | 'helpful' | 'rating-high'

const filterTabs: { id: FilterId; label: string; mobileLabel: string }[] = [
  { id: 'all', label: 'All Reviews', mobileLabel: 'All Reviews' },
  { id: 'photos', label: 'With Photos Only', mobileLabel: 'With Photos' },
  { id: 'five-star', label: '5 Stars Only', mobileLabel: '5 Stars Only' },
  { id: 'nursery-replies', label: 'Nursery Replies', mobileLabel: 'Nursery Replies' },
]

const sortOptions: { id: SortId; label: string }[] = [
  { id: 'recent', label: 'Most recent' },
  { id: 'helpful', label: 'Most helpful' },
  { id: 'rating-high', label: 'Highest rated' },
]

type LightboxPhoto = {
  src: string
  reviewerName: string
  city: string
  subjectName: string
  headline: string
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return 'P'
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase()
}

export function ReviewsHub() {
  const [userReviews, setUserReviews] = useState<CustomerReview[]>([])
  const [helpfulVotes, setHelpfulVotes] = useState<string[]>([])
  const [activeFilter, setActiveFilter] = useState<FilterId>('all')
  const [selectedNursery, setSelectedNursery] = useState<string>('all')
  const [selectedStar, setSelectedStar] = useState<number | null>(null)
  const [sortBy, setSortBy] = useState<SortId>('recent')
  const [searchQuery, setSearchQuery] = useState('')
  const [lightbox, setLightbox] = useState<LightboxPhoto | null>(null)

  useEffect(() => {
    setUserReviews(readStoredReviews())
    setHelpfulVotes(readHelpfulVotes())
  }, [])

  const allReviews = useMemo(() => {
    const userIds = new Set(userReviews.map((review) => review.id))
    return [...userReviews, ...initialReviews.filter((review) => !userIds.has(review.id))]
  }, [userReviews])

  const ratingStats = useMemo(() => {
    const counts: Record<1 | 2 | 3 | 4 | 5, number> = { ...BASE_STAR_DISTRIBUTION }
    for (const review of userReviews) {
      counts[review.rating] = (counts[review.rating] ?? 0) + 1
    }
    const totalOrders = BASE_TOTAL_VERIFIED_ORDERS + userReviews.length
    const weightedSum =
      counts[5] * 5 + counts[4] * 4 + counts[3] * 3 + counts[2] * 2 + counts[1] * 1
    const average = (weightedSum / totalOrders).toFixed(1)

    const rows = ([5, 4, 3, 2, 1] as const).map((stars) => ({
      stars,
      count: counts[stars],
      percent: Math.round((counts[stars] / totalOrders) * 100),
    }))

    return { totalOrders, average, rows }
  }, [userReviews])

  const filteredReviews = useMemo(() => {
    const q = searchQuery.trim().toLowerCase()
    const filtered = allReviews.filter((review) => {
      if (activeFilter === 'photos' && review.photos.length === 0) return false
      if (activeFilter === 'five-star' && review.rating !== 5) return false
      if (activeFilter === 'nursery-replies' && !review.nurseryReply) return false
      if (selectedNursery !== 'all' && review.nurseryId !== selectedNursery) return false
      if (selectedStar !== null && review.rating !== selectedStar) return false
      if (q) {
        const haystack =
          `${review.reviewerName} ${review.city} ${review.productName ?? ''} ${review.nurseryName ?? ''} ${review.headline} ${review.text}`.toLowerCase()
        if (!haystack.includes(q)) return false
      }
      return true
    })

    return [...filtered].sort((a, b) => {
      if (sortBy === 'helpful') {
        const aVotes = a.helpfulCount + (helpfulVotes.includes(a.id) ? 1 : 0)
        const bVotes = b.helpfulCount + (helpfulVotes.includes(b.id) ? 1 : 0)
        return bVotes - aVotes
      }
      if (sortBy === 'rating-high') {
        return b.rating - a.rating || b.isoDate.localeCompare(a.isoDate)
      }
      return b.isoDate.localeCompare(a.isoDate)
    })
  }, [activeFilter, allReviews, helpfulVotes, searchQuery, selectedNursery, selectedStar, sortBy])

  const hasActiveFilters =
    activeFilter !== 'all' ||
    selectedNursery !== 'all' ||
    selectedStar !== null ||
    searchQuery.trim() !== '' ||
    sortBy !== 'recent'

  function resetFilters() {
    setActiveFilter('all')
    setSelectedNursery('all')
    setSelectedStar(null)
    setSearchQuery('')
    setSortBy('recent')
  }

  function handleToggleHelpful(reviewId: string) {
    setHelpfulVotes((current) => {
      const next = current.includes(reviewId)
        ? current.filter((id) => id !== reviewId)
        : [...current, reviewId]
      saveHelpfulVotes(next)
      return next
    })
  }

  const photoCount = allReviews.filter((r) => r.photos.length > 0).length
  const replyCount = allReviews.filter((r) => Boolean(r.nurseryReply)).length

  return (
    <main className="min-h-[75vh] bg-[#f7f5ef] pb-14 sm:pb-24">
      {/* Editorial Forest Hero + Rating Overview */}
      <section className="relative overflow-hidden bg-[#0F291E] text-white" aria-labelledby="reviews-hub-heading">
        <div className="mx-auto w-full max-w-[100rem] px-4 py-7 sm:px-6 sm:py-12 lg:px-10 lg:py-16 xl:px-14">
          <div className="grid items-center gap-6 sm:gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:gap-12 xl:gap-16">
            <div className="min-w-0">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#f0c780] sm:text-xs">
                Verified plant parent reviews
              </p>
              <h1
                id="reviews-hub-heading"
                className="mt-2.5 max-w-2xl font-serif text-[1.85rem] font-semibold leading-[1.1] tracking-tight text-balance sm:mt-3 sm:text-5xl lg:text-[3.5rem]"
              >
                Real Stories from Real Plant Parents
              </h1>
              <p className="mt-3 max-w-xl text-[13.5px] leading-6 text-white/80 sm:mt-4 sm:text-base sm:leading-7">
                Every plant is acclimatised on local Bengal rooftops before it travels to your home. Read honest reviews, browse home photos, and see care replies from our partner nurseries.
              </p>

              {/* CTA Row: balanced 2-col grid on mobile, inline flex on sm+ */}
              <div className="mt-5 grid grid-cols-2 gap-2.5 sm:mt-7 sm:flex sm:items-center sm:gap-3">
                <Link
                  href="/reviews/write"
                  className="inline-flex min-h-11 items-center justify-center gap-1.5 whitespace-nowrap rounded-full bg-[#E5A849] px-3.5 text-[13px] font-semibold text-[#1A3325] shadow-sm transition-colors hover:bg-[#efbc69] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:min-h-12 sm:gap-2 sm:px-6 sm:text-sm"
                >
                  <PenLine className="size-3.5 shrink-0 sm:size-4" aria-hidden="true" />
                  Write a Review
                </Link>
                <Link
                  href="/shop"
                  className="inline-flex min-h-11 items-center justify-center gap-1.5 whitespace-nowrap rounded-full border border-white/25 px-3.5 text-[13px] font-semibold text-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E5A849] sm:min-h-12 sm:gap-2 sm:px-6 sm:text-sm"
                >
                  <span className="sm:hidden">Shop Plants</span>
                  <span className="hidden sm:inline">Shop Bestsellers</span>
                  <ArrowRight className="size-3.5 shrink-0 sm:size-4" aria-hidden="true" />
                </Link>
              </div>

              {/* Clean trust highlights */}
              <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-white/75 sm:mt-6 sm:text-sm">
                <span className="inline-flex items-center gap-1.5">
                  <BadgeCheck className="size-3.5 shrink-0 text-[#f0c780] sm:size-4" aria-hidden="true" />
                  Verified buyers
                </span>
                <span className="inline-flex items-center gap-1.5 tabular-nums">
                  <Camera className="size-3.5 shrink-0 text-[#f0c780] sm:size-4" aria-hidden="true" />
                  {photoCount} photo stories
                </span>
                <span className="inline-flex items-center gap-1.5 tabular-nums">
                  <Sprout className="size-3.5 shrink-0 text-[#f0c780] sm:size-4" aria-hidden="true" />
                  {replyCount} grower replies
                </span>
              </div>
            </div>

            {/* Rating Summary Box */}
            <aside
              aria-label="Overall rating summary"
              className="rounded-2xl border border-white/15 bg-[#163427]/95 p-4 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.45)] sm:rounded-3xl sm:p-7"
            >
              {/* Symmetrical 2-column summary header on both mobile & desktop */}
              <div className="flex items-center justify-between gap-4 border-b border-white/12 pb-4 sm:pb-5">
                <div className="min-w-0">
                  <div className="flex items-baseline gap-2">
                    <span className="font-serif text-4xl font-semibold leading-none tracking-tight text-white tabular-nums sm:text-5xl lg:text-6xl">
                      {ratingStats.average}
                    </span>
                    <span className="text-xs font-medium text-white/65 sm:text-sm">out of 5</span>
                  </div>
                  <div className="mt-2 flex items-center gap-0.5 text-[#E5A849] sm:gap-1" aria-label={`${ratingStats.average} out of 5 stars`}>
                    {Array.from({ length: 5 }, (_, index) => (
                      <Star key={index} className="size-3.5 fill-current sm:size-4" aria-hidden="true" />
                    ))}
                  </div>
                  <p className="mt-1.5 text-[11px] text-white/75 tabular-nums sm:mt-2 sm:text-sm">
                    {ratingStats.totalOrders.toLocaleString('en-IN')}+ verified orders
                  </p>
                </div>

                <div className="h-16 w-px shrink-0 bg-white/12 sm:h-20" aria-hidden="true" />

                <div className="flex shrink-0 flex-col items-end text-right">
                  <span className="font-serif text-2xl font-semibold leading-none text-[#f0c780] tabular-nums sm:text-3xl">
                    97%
                  </span>
                  <span className="mt-1.5 text-[11px] leading-4 text-white/75 sm:text-xs sm:leading-5">
                    would order<br />again
                  </span>
                </div>
              </div>

              {/* 5-star interactive breakdown bars */}
              <div className="mt-3.5 flex flex-col gap-1.5 sm:mt-4 sm:gap-2">
                {ratingStats.rows.map((row) => {
                  const isSelected = selectedStar === row.stars
                  return (
                    <button
                      key={row.stars}
                      type="button"
                      onClick={() => {
                        setSelectedStar((current) => (current === row.stars ? null : row.stars))
                        if (activeFilter === 'five-star' && row.stars !== 5) setActiveFilter('all')
                      }}
                      aria-pressed={isSelected}
                      className={`group flex min-h-8 w-full items-center gap-2.5 rounded-lg px-2 py-1 text-left transition-colors sm:gap-3 ${
                        isSelected ? 'bg-white/14' : 'hover:bg-white/6'
                      }`}
                    >
                      <span className="flex w-9 shrink-0 items-center gap-1 text-xs font-medium text-white/90 tabular-nums sm:w-10">
                        {row.stars}
                        <Star className="size-3 fill-[#E5A849] text-[#E5A849]" aria-hidden="true" />
                      </span>
                      <span className="h-2 flex-1 overflow-hidden rounded-full bg-white/12">
                        <span
                          className="block h-full rounded-full bg-[#E5A849] transition-all duration-300"
                          style={{ width: `${row.percent}%` }}
                        />
                      </span>
                      <span className="w-9 shrink-0 text-right text-xs font-medium text-white/75 tabular-nums sm:w-10">
                        {row.percent}%
                      </span>
                    </button>
                  )
                })}
              </div>
              {selectedStar !== null && (
                <p className="mt-3 text-xs text-[#f0c780]">
                  Filtering by {selectedStar}-star reviews ·{' '}
                  <button
                    type="button"
                    onClick={() => setSelectedStar(null)}
                    className="font-semibold underline underline-offset-2 hover:text-white"
                  >
                    Show all ratings
                  </button>
                </p>
              )}
            </aside>
          </div>
        </div>
      </section>

      {/* Filter & Reviews Body */}
      <div className="mx-auto w-full max-w-[100rem] px-4 pt-6 sm:px-6 sm:pt-10 lg:px-10 xl:px-14">
        {/* Filter & Search Bar */}
        <section
          aria-label="Filter and search customer reviews"
          className="rounded-2xl border border-[#e5e8df] bg-white p-4 shadow-[0_8px_24px_rgba(26,51,37,0.04)] sm:p-5"
        >
          <div className="flex items-center justify-between gap-2 pb-3 sm:pb-4">
            <div className="flex min-w-0 items-center gap-2 text-sm font-semibold text-[#1A3325]">
              <SlidersHorizontal className="size-4 shrink-0 text-[#527358]" aria-hidden="true" />
              <span className="truncate">Filter stories</span>
              <span className="shrink-0 text-xs font-normal text-[#68786b] tabular-nums" aria-live="polite">
                ({filteredReviews.length}/{allReviews.length})
              </span>
            </div>
            {hasActiveFilters && (
              <button
                type="button"
                onClick={resetFilters}
                className="shrink-0 rounded-md px-2 py-1 text-xs font-semibold text-[#a65f2b] transition-colors hover:bg-[#f7f3eb] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1A3325]"
              >
                Reset
              </button>
            )}
          </div>

          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between lg:gap-4">
            {/* Filter Tabs: 2x2 balanced grid on mobile (no cutoffs), single inline row on sm+ */}
            <div
              className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap"
              role="group"
              aria-label="Quick review filters"
            >
              {filterTabs.map((tab) => {
                const isActive = activeFilter === tab.id
                return (
                  <button
                    key={tab.id}
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => {
                      setActiveFilter(tab.id)
                      if (tab.id === 'five-star') setSelectedStar(null)
                    }}
                    className={`min-h-10 w-full rounded-xl border px-3 text-center text-xs font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1A3325] sm:w-auto sm:rounded-full sm:px-4 sm:text-sm ${
                      isActive
                        ? 'border-[#1A3325] bg-[#1A3325] text-white shadow-xs'
                        : 'border-[#dedfd7] bg-[#fbfaf6] text-[#536258] hover:border-[#527358] hover:bg-[#f1f3ed]'
                    }`}
                  >
                    <span className="sm:hidden">{tab.mobileLabel}</span>
                    <span className="hidden sm:inline">{tab.label}</span>
                  </button>
                )
              })}
            </div>

            {/* Search + Nursery + Sort */}
            <div className="flex flex-col gap-2.5 sm:grid sm:grid-cols-3 lg:flex lg:shrink-0 lg:flex-row lg:items-center">
              <label className="relative block sm:col-span-1 lg:w-56">
                <span className="sr-only">Search reviews</span>
                <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-[#778078]" aria-hidden="true" />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Search plant, city, review..."
                  className="h-11 w-full rounded-xl border border-[#dedfd7] bg-[#fbfaf6] pl-10 pr-8 text-base text-[#1A3325] outline-none transition placeholder:text-[#8c978d] focus:border-[#527358] focus:ring-2 focus:ring-[#527358]/20 sm:text-sm"
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

              <div className="grid grid-cols-2 gap-2.5 sm:col-span-2 sm:flex sm:gap-2.5">
                <label className="relative block min-w-0 flex-1 lg:w-48">
                  <span className="sr-only">Filter by nursery</span>
                  <select
                    value={selectedNursery}
                    onChange={(event) => setSelectedNursery(event.target.value)}
                    className="h-11 w-full appearance-none truncate rounded-xl border border-[#dedfd7] bg-[#fbfaf6] pl-3 pr-8 text-[13px] font-semibold text-[#304b37] outline-none transition focus:border-[#527358] focus:ring-2 focus:ring-[#527358]/20 sm:text-sm"
                  >
                    <option value="all">All nurseries</option>
                    {nurseries.map((nursery) => (
                      <option key={nursery.id} value={nursery.id}>
                        {nursery.name}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 size-4 -translate-y-1/2 text-[#68786b]" aria-hidden="true" />
                </label>

                <label className="relative block min-w-0 flex-1 lg:w-40">
                  <span className="sr-only">Sort reviews</span>
                  <select
                    value={sortBy}
                    onChange={(event) => setSortBy(event.target.value as SortId)}
                    className="h-11 w-full appearance-none truncate rounded-xl border border-[#dedfd7] bg-[#fbfaf6] pl-3 pr-8 text-[13px] font-semibold text-[#304b37] outline-none transition focus:border-[#527358] focus:ring-2 focus:ring-[#527358]/20 sm:text-sm"
                  >
                    {sortOptions.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 size-4 -translate-y-1/2 text-[#68786b]" aria-hidden="true" />
                </label>
              </div>
            </div>
          </div>
        </section>

        {/* Reviews Grid (2 columns desktop, 1 column mobile) */}
        {filteredReviews.length > 0 ? (
          <section aria-label="Customer reviews list" className="mt-5 grid grid-cols-1 gap-4 sm:mt-8 sm:gap-6 lg:grid-cols-2">
            {filteredReviews.map((review) => {
              const hasVoted = helpfulVotes.includes(review.id)
              const displayHelpful = review.helpfulCount + (hasVoted ? 1 : 0)
              const hasLinkedPlant = Boolean(review.productSlug && review.productName && review.productImage)
              const subjectLabel = review.productName ?? "Abhay's Roof Garden"

              return (
                <article
                  key={review.id}
                  className="flex min-w-0 flex-col rounded-2xl border border-[#e5e8df] bg-white p-4 shadow-[0_10px_30px_-24px_rgba(26,51,37,0.35)] sm:rounded-3xl sm:p-6"
                >
                  {/* Row 1: Stars on left + Date on right — never wraps awkwardly */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1" aria-label={`${review.rating} out of 5 stars`}>
                      {Array.from({ length: 5 }, (_, index) => (
                        <Star
                          key={index}
                          className={`size-3.5 sm:size-4 ${
                            index < review.rating
                              ? 'fill-[#d69a43] text-[#d69a43]'
                              : 'fill-[#eceee8] text-[#d8ddd4]'
                          }`}
                          aria-hidden="true"
                        />
                      ))}
                      <span className="ml-1 text-xs font-semibold text-[#1A3325] tabular-nums">
                        {review.rating}.0
                      </span>
                    </div>
                    <time dateTime={review.isoDate} className="shrink-0 text-[11px] font-medium text-[#778078] sm:text-xs">
                      {review.date}
                    </time>
                  </div>

                  {/* Row 2: Structured Reviewer Identity */}
                  <div className="mt-3 flex items-center gap-3">
                    <span
                      aria-hidden="true"
                      className="flex size-9 shrink-0 items-center justify-center rounded-full border border-[#dce5d8] bg-[#edf1e9] font-serif text-xs font-semibold text-[#1A3325] sm:size-10 sm:text-sm"
                    >
                      {getInitials(review.reviewerName)}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
                        <h2 className="truncate text-sm font-semibold text-[#1A3325] sm:text-base">
                          {review.reviewerName}
                        </h2>
                        {review.verified && (
                          <span className="inline-flex shrink-0 items-center gap-1 text-[11px] font-medium text-[#3b6a47] sm:text-xs">
                            <BadgeCheck className="size-3.5 shrink-0" aria-hidden="true" />
                            Verified Buyer
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-[#778078]">{review.city}</p>
                    </div>
                  </div>

                  {/* Purchased Plant Strip OR General Store Experience Strip */}
                  {hasLinkedPlant ? (
                    <Link
                      href={`/shop/${review.productSlug}`}
                      className="group mt-3.5 flex items-center gap-3 rounded-xl border border-[#eceee8] bg-[#fbfaf6] p-2.5 transition-colors hover:border-[#c8d4c5] hover:bg-[#f4f6f0] sm:mt-4 sm:rounded-2xl"
                    >
                      <span className="relative size-11 shrink-0 overflow-hidden rounded-lg bg-[#edf1e9] sm:size-12 sm:rounded-xl">
                        <Image
                          src={review.productImage!}
                          alt={review.productName!}
                          fill
                          sizes="48px"
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-xs font-semibold text-[#1A3325] sm:text-sm">
                          Purchased: {review.productName}
                        </span>
                        {review.nurseryName && (
                          <span className="mt-0.5 block truncate text-[11px] text-[#68786b]">
                            Grown by {review.nurseryName}
                          </span>
                        )}
                      </span>
                      <span className="inline-flex shrink-0 items-center gap-0.5 pr-0.5 text-xs font-semibold text-[#527358] transition-colors group-hover:text-[#1A3325]">
                        <span className="hidden sm:inline">View plant</span>
                        <ChevronRight className="size-4" aria-hidden="true" />
                      </span>
                    </Link>
                  ) : (
                    <div className="mt-3.5 flex items-center gap-2.5 rounded-xl border border-[#eceee8] bg-[#fbfaf6] px-3 py-2.5 sm:mt-4 sm:rounded-2xl">
                      <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-[#edf1e9] text-[#426b4b]">
                        <Sprout className="size-4" aria-hidden="true" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-xs font-semibold text-[#1A3325]">
                          General Store Experience
                        </p>
                        <p className="truncate text-[11px] text-[#68786b]">
                          Abhay&apos;s Roof Garden collective
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Review Headline & Body */}
                  <div className="mt-3.5 flex-1 sm:mt-4">
                    <h3 className="font-serif text-[17px] font-semibold leading-snug text-[#1A3325] sm:text-xl">
                      {review.headline}
                    </h3>
                    <p className="mt-1.5 text-[13.5px] leading-6 text-[#58655b] sm:mt-2 sm:text-[15px] sm:leading-7">
                      {review.text}
                    </p>
                  </div>

                  {/* Customer Plant Photo Preview(s) */}
                  {review.photos.length > 0 && (
                    <div className="mt-3.5 grid grid-cols-3 gap-2 sm:mt-4 sm:flex sm:flex-wrap sm:gap-2.5">
                      {review.photos.map((photo, index) => (
                        <button
                          key={`${review.id}-photo-${index}`}
                          type="button"
                          onClick={() =>
                            setLightbox({
                              src: photo,
                              reviewerName: review.reviewerName,
                              city: review.city,
                              subjectName: subjectLabel,
                              headline: review.headline,
                            })
                          }
                          aria-label={`Expand ${review.reviewerName}'s photo of ${subjectLabel}`}
                          className="group/photo relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-[#e5e8df] bg-[#edf1e9] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1A3325] sm:h-28 sm:w-36 sm:aspect-auto sm:rounded-2xl"
                        >
                          <Image
                            src={photo}
                            alt={`${subjectLabel} photographed by ${review.reviewerName}`}
                            fill
                            unoptimized={photo.startsWith('data:')}
                            sizes="(max-width: 640px) 30vw, 144px"
                            className="object-cover transition-transform duration-500 ease-out group-hover/photo:scale-105"
                          />
                          <span className="absolute bottom-1.5 right-1.5 inline-flex size-6 items-center justify-center rounded-full bg-[#0f291e]/70 text-white shadow-xs backdrop-blur-xs sm:inset-0 sm:m-auto sm:size-8 sm:bg-white/90 sm:text-[#1A3325] sm:opacity-0 sm:transition-opacity sm:duration-200 sm:group-hover/photo:opacity-100">
                            <Expand className="size-3 sm:size-3.5" aria-hidden="true" />
                          </span>
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Seller / Nursery Reply Box */}
                  {review.nurseryReply && (
                    <div className="mt-4 rounded-xl border border-[#dce6d8] bg-[#f1f5ee] p-3.5 sm:rounded-2xl sm:p-4">
                      <div className="flex items-start gap-2.5">
                        <span className="relative mt-0.5 size-8 shrink-0 overflow-hidden rounded-full border border-white bg-white shadow-xs">
                          <Image
                            src={review.nurseryReply.nurseryAvatar}
                            alt={review.nurseryReply.nurseryName}
                            fill
                            sizes="32px"
                            className="object-cover"
                          />
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="flex items-start gap-1.5 text-xs font-semibold leading-snug text-[#1A3325]">
                            <Sprout className="mt-0.5 size-3.5 shrink-0 text-[#426b4b]" aria-hidden="true" />
                            <Link
                              href={`/nurseries/${review.nurseryReply.nurserySlug}`}
                              className="hover:underline"
                            >
                              Response from {review.nurseryReply.nurseryName}
                            </Link>
                          </p>
                          <p className="mt-0.5 text-[11px] text-[#68786b]">{review.nurseryReply.date}</p>
                        </div>
                      </div>
                      <p className="mt-2.5 text-xs leading-6 text-[#3d5242] sm:text-sm">
                        &ldquo;{review.nurseryReply.message}&rdquo;
                      </p>
                    </div>
                  )}

                  {/* Card Footer: Helpful Action + Nursery / Context */}
                  <div className="mt-4 flex items-center justify-between gap-3 border-t border-[#eceee8] pt-3 sm:mt-5 sm:pt-3.5">
                    <button
                      type="button"
                      onClick={() => handleToggleHelpful(review.id)}
                      aria-pressed={hasVoted}
                      className={`inline-flex min-h-9 items-center gap-1.5 rounded-full px-3 text-xs font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1A3325] ${
                        hasVoted
                          ? 'bg-[#edf1e9] text-[#1A3325]'
                          : 'bg-[#f7f7f3] text-[#58655b] hover:bg-[#edf1e9] hover:text-[#1A3325]'
                      }`}
                    >
                      <ThumbsUp className={`size-3.5 ${hasVoted ? 'fill-[#527358] text-[#527358]' : ''}`} aria-hidden="true" />
                      Helpful <span className="tabular-nums">({displayHelpful})</span>
                    </button>

                    {review.nurserySlug && review.nurseryName ? (
                      <Link
                        href={`/nurseries/${review.nurserySlug}`}
                        className="truncate text-xs font-medium text-[#68786b] transition-colors hover:text-[#1A3325]"
                      >
                        {review.nurseryName}
                      </Link>
                    ) : (
                      <span className="truncate text-xs font-medium text-[#778078]">
                        General review
                      </span>
                    )}
                  </div>
                </article>
              )
            })}
          </section>
        ) : (
          <section className="mt-6 flex flex-col items-center rounded-2xl border border-dashed border-[#cbd5c9] bg-white px-5 py-12 text-center sm:mt-8 sm:rounded-3xl sm:px-6 sm:py-14">
            <span className="flex size-12 items-center justify-center rounded-full bg-[#edf1e9] text-[#527358]">
              <MessageSquareText className="size-5" aria-hidden="true" />
            </span>
            <h2 className="mt-4 font-serif text-xl font-semibold text-[#1A3325] sm:text-2xl">
              No reviews match those filters
            </h2>
            <p className="mt-2 max-w-sm text-sm leading-6 text-[#68786b]">
              Try clearing a filter or searching another plant name to explore more customer stories.
            </p>
            <button
              type="button"
              onClick={resetFilters}
              className="mt-5 inline-flex min-h-11 items-center justify-center rounded-full bg-[#1A3325] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#294735]"
            >
              Show all reviews
            </button>
          </section>
        )}

        {/* Bottom Share-Your-Story CTA */}
        <section
          aria-labelledby="share-story-cta"
          className="mt-10 rounded-2xl border border-[#e0e6dc] bg-[#1A3325] p-5 text-white sm:mt-16 sm:flex sm:items-center sm:justify-between sm:gap-8 sm:rounded-3xl sm:p-10"
        >
          <div className="max-w-xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#f0c780] sm:text-xs">
              Grown on our roof, thriving at yours
            </p>
            <h2 id="share-story-cta" className="mt-2 font-serif text-2xl font-semibold leading-tight sm:text-3xl">
              Adopted a plant from our collective?
            </h2>
            <p className="mt-2 text-sm leading-6 text-white/75">
              Share a quick note and a sunny windowsill photo—it helps fellow plant parents pick the right match and gives our local growers a smile.
            </p>
          </div>
          <div className="mt-5 shrink-0 sm:mt-0">
            <Link
              href="/reviews/write"
              className="inline-flex min-h-12 w-full items-center justify-center gap-2 whitespace-nowrap rounded-full bg-[#E5A849] px-6 text-sm font-semibold text-[#1A3325] transition-colors hover:bg-[#efbc69] sm:w-auto"
            >
              <Camera className="size-4 shrink-0" aria-hidden="true" />
              Share your plant story
            </Link>
          </div>
        </section>
      </div>

      {/* Photo Lightbox Dialog */}
      <Dialog open={Boolean(lightbox)} onOpenChange={(open) => { if (!open) setLightbox(null) }}>
        <DialogContent
          showCloseButton={false}
          className="max-h-[90dvh] w-[calc(100%-1.5rem)] max-w-2xl overflow-hidden rounded-2xl border border-[#e5e8df] bg-[#fbfaf6] p-0 text-[#1A3325] shadow-2xl sm:rounded-3xl sm:max-w-2xl"
        >
          {lightbox && (
            <div className="flex flex-col">
              <div className="relative aspect-[4/3] w-full bg-[#10251b]">
                <Image
                  src={lightbox.src}
                  alt={`${lightbox.subjectName} at ${lightbox.reviewerName}'s home`}
                  fill
                  unoptimized={lightbox.src.startsWith('data:')}
                  sizes="(min-width: 768px) 672px, 100vw"
                  className="object-contain"
                />
                <button
                  type="button"
                  onClick={() => setLightbox(null)}
                  aria-label="Close photo preview"
                  className="absolute right-3 top-3 inline-flex size-10 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-sm transition-colors hover:bg-black/80"
                >
                  <X className="size-5" aria-hidden="true" />
                </button>
              </div>
              <DialogHeader className="p-4 text-left sm:p-6">
                <DialogTitle className="font-serif text-lg font-semibold text-[#1A3325] sm:text-xl">
                  {lightbox.headline}
                </DialogTitle>
                <DialogDescription className="text-xs text-[#68786b] sm:text-sm">
                  {lightbox.subjectName} <span aria-hidden="true">·</span> Shared by {lightbox.reviewerName} from {lightbox.city}
                </DialogDescription>
              </DialogHeader>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </main>
  )
}
