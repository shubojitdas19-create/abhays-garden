'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock,
  Quote,
  Share2,
  ShoppingBag,
  Sparkles,
  Sprout,
} from 'lucide-react'
import { useCart } from '@/components/store/cart-context'
import { formatINR, products, type Product } from '@/components/store/products'
import {
  getJournalCategory,
  journalArticles,
  type JournalArticle,
} from '@/lib/store/journal-data'

function FeaturedPlantWidget({ product }: { product: Product }) {
  const { addItem } = useCart()
  const [selectedSizeIndex, setSelectedSizeIndex] = useState(0)
  const [justAdded, setJustAdded] = useState(false)

  const selectedSize = product.sizes[selectedSizeIndex] ?? product.sizes[0]
  const defaultPot = product.pots[0]

  function handleAddToBag() {
    addItem({
      productId: product.id,
      productName: product.name,
      size: selectedSize.label,
      pot: defaultPot.name,
      price: selectedSize.price + defaultPot.price,
      quantity: 1,
      image: product.image,
      nurseryName: product.nursery.name,
    })
    setJustAdded(true)
    window.setTimeout(() => setJustAdded(false), 1800)
  }

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-[#dce6d8] bg-white p-4 shadow-[0_10px_28px_-22px_rgba(26,51,37,0.35)] sm:flex-row sm:items-center sm:gap-5 sm:p-5">
      <Link
        href={`/shop/${product.slug}`}
        className="group flex min-w-0 flex-1 items-center gap-3.5 sm:gap-4"
      >
        <span className="relative size-20 shrink-0 overflow-hidden rounded-xl bg-[#edf1e9] sm:size-24 sm:rounded-2xl">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 80px, 96px"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </span>

        <span className="min-w-0 flex-1">
          <span className="block truncate font-serif text-lg font-semibold text-[#1A3325] transition-colors group-hover:text-[#3f6448] sm:text-xl">
            {product.name}
          </span>
          <span className="mt-0.5 block truncate font-serif text-xs italic text-[#778078]">
            {product.botanical}
          </span>
          <span className="mt-1.5 flex items-center gap-1.5 text-xs text-[#527358]">
            <Sprout className="size-3.5 shrink-0" aria-hidden="true" />
            <span className="truncate">{product.nursery.name}</span>
          </span>
          <span className="mt-1.5 block font-serif text-lg font-semibold text-[#1A3325] tabular-nums">
            {formatINR(selectedSize.price + defaultPot.price)}
          </span>
        </span>
      </Link>

      {/* Size Picker + 1-Click Add to Plant Bag */}
      <div className="flex flex-col gap-2.5 border-t border-[#f0f2ec] pt-3.5 sm:w-56 sm:shrink-0 sm:border-t-0 sm:border-l sm:pl-5 sm:pt-0">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#778078]">
            Choose size
          </p>
          <div className="mt-1.5 grid grid-cols-3 gap-1.5" role="radiogroup" aria-label={`Select size for ${product.name}`}>
            {product.sizes.map((size, idx) => {
              const active = idx === selectedSizeIndex
              return (
                <button
                  key={size.label}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  onClick={() => setSelectedSizeIndex(idx)}
                  className={`min-h-9 rounded-lg border px-2 text-xs font-semibold transition-colors ${
                    active
                      ? 'border-[#1A3325] bg-[#1A3325] text-white'
                      : 'border-[#dfe3da] bg-[#fbfaf6] text-[#4c5b50] hover:border-[#527358]'
                  }`}
                >
                  {size.label}
                </button>
              )
            })}
          </div>
          <p className="mt-1 text-[11px] text-[#778078]">
            {defaultPot.name} · {selectedSize.height}
          </p>
        </div>

        <button
          type="button"
          onClick={handleAddToBag}
          className={`inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full px-4 text-xs font-semibold transition-colors sm:text-sm ${
            justAdded
              ? 'bg-[#366542] text-white'
              : 'bg-[#1A3325] text-white hover:bg-[#294735]'
          }`}
        >
          {justAdded ? (
            <>
              <Check className="size-4" aria-hidden="true" />
              Added to Plant Bag
            </>
          ) : (
            <>
              <ShoppingBag className="size-4" aria-hidden="true" />
              Add to Plant Bag
            </>
          )}
        </button>
      </div>
    </div>
  )
}

export function ArticleReader({ article }: { article: JournalArticle }) {
  const category = getJournalCategory(article.categoryId)
  const carouselRef = useRef<HTMLDivElement>(null)
  const [copied, setCopied] = useState(false)
  const [toastMessage, setToastMessage] = useState('')

  useEffect(() => {
    if (!toastMessage) return
    const timer = window.setTimeout(() => setToastMessage(''), 3200)
    return () => window.clearTimeout(timer)
  }, [toastMessage])

  const featuredProducts = useMemo(
    () =>
      article.featuredProductSlugs
        .map((slug) => products.find((p) => p.slug === slug))
        .filter((p): p is Product => Boolean(p)),
    [article.featuredProductSlugs],
  )

  const relatedArticles = useMemo(() => {
    const sameCategory = journalArticles.filter(
      (item) => item.slug !== article.slug && item.categoryId === article.categoryId,
    )
    const others = journalArticles.filter(
      (item) => item.slug !== article.slug && item.categoryId !== article.categoryId,
    )
    return [...sameCategory, ...others].slice(0, 4)
  }, [article.categoryId, article.slug])

  function scrollCarousel(direction: -1 | 1) {
    if (!carouselRef.current) return
    carouselRef.current.scrollBy({
      left: direction * carouselRef.current.clientWidth * 0.78,
      behavior: 'smooth',
    })
  }

  async function handleShare() {
    const shareUrl = window.location.href
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: `${article.title} — Abhay's Roof Garden Journal`,
          text: article.excerpt,
          url: shareUrl,
        })
        return
      } catch {
        // Fallback to clipboard copy
      }
    }

    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setToastMessage('Guide link copied to clipboard!')
      window.setTimeout(() => setCopied(false), 2200)
    } catch {
      setToastMessage('Copy the URL from your browser bar to share.')
    }
  }

  return (
    <main className="min-h-[75vh] bg-[#f7f5ef] pb-16 sm:pb-24">
      {/* Compact Breadcrumb Bar */}
      <div className="border-b border-[#e5e8df] bg-white">
        <div className="mx-auto flex w-full max-w-[100rem] items-center gap-1.5 overflow-hidden px-4 py-3 text-xs text-[#68786b] sm:px-6 sm:py-3.5 sm:text-sm lg:px-10 xl:px-14">
          <Link href="/journal" className="shrink-0 font-semibold text-[#1A3325] hover:text-[#a65f2b]">
            Journal
          </Link>
          <ChevronRight className="size-3.5 shrink-0 text-[#9aa59b]" aria-hidden="true" />
          <Link href="/journal" className="shrink-0 hover:text-[#1A3325]">
            <span className="sm:hidden">{category.shortLabel}</span>
            <span className="hidden sm:inline">{category.label}</span>
          </Link>
          <ChevronRight className="size-3.5 shrink-0 text-[#9aa59b]" aria-hidden="true" />
          <span className="min-w-0 truncate text-[#778078]">{article.title}</span>
        </div>
      </div>

      {/* Editorial Article Container */}
      <article className="mx-auto w-full max-w-4xl px-4 pt-7 sm:px-6 sm:pt-12">
        {/* Header Metadata + Share */}
        <header>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs font-semibold sm:text-sm">
              <span className="inline-flex items-center rounded-full bg-[#edf1e9] px-3 py-1 text-xs font-semibold text-[#2d5336]">
                {article.featuredTag ? `${article.featuredTag} · ${category.label}` : category.label}
              </span>
              <time dateTime={article.isoDate} className="font-medium text-[#68786b]">
                {article.publishedAt}
              </time>
              <span aria-hidden="true" className="text-[#c5ccc4]">·</span>
              <span className="inline-flex items-center gap-1 font-medium text-[#68786b] tabular-nums">
                <Clock className="size-3.5" aria-hidden="true" />
                {article.readTime}
              </span>
            </div>

            <button
              type="button"
              onClick={handleShare}
              className="inline-flex min-h-9 items-center gap-1.5 rounded-full border border-[#dfe3da] bg-white px-3.5 text-xs font-semibold text-[#304b37] transition-colors hover:bg-[#edf1e9]"
            >
              {copied ? (
                <>
                  <Check className="size-3.5 text-[#3b6a47]" aria-hidden="true" />
                  Copied
                </>
              ) : (
                <>
                  <Share2 className="size-3.5" aria-hidden="true" />
                  Share guide
                </>
              )}
            </button>
          </div>

          {/* Fraunces Serif Article Title */}
          <h1 className="mt-4 font-serif text-[1.9rem] font-semibold leading-[1.12] tracking-tight text-balance text-[#1A3325] sm:mt-5 sm:text-5xl lg:text-[3.4rem]">
            {article.title}
          </h1>

          <p className="mt-3.5 text-base leading-7 text-[#58655b] sm:mt-4 sm:text-lg sm:leading-8">
            {article.excerpt}
          </p>

          {/* Author Byline */}
          <div className="mt-5 flex items-center gap-3 border-y border-[#e5e8df] py-4 sm:mt-6">
            <span className="relative size-11 shrink-0 overflow-hidden rounded-full border border-[#dce4d9] bg-[#edf1e9]">
              <Image
                src={article.author.avatar}
                alt={article.author.name}
                fill
                sizes="44px"
                className="object-cover"
              />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold text-[#1A3325] sm:text-sm">
                Written by {article.author.name}
              </p>
              <p className="mt-0.5 flex flex-wrap items-center gap-x-1.5 text-[11px] text-[#68786b] sm:text-xs">
                <span>{article.author.role}</span>
                <span aria-hidden="true">·</span>
                <span className="inline-flex items-center gap-1 font-medium text-[#3b6a47]">
                  <BadgeCheck className="size-3.5 shrink-0" aria-hidden="true" />
                  Reviewed by Nursery Specialists
                </span>
              </p>
            </div>
          </div>
        </header>

        {/* High-Resolution Hero Photo with Botanical Caption */}
        <figure className="mt-6 sm:mt-8">
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-[#e5e8df] bg-[#edf1e9] sm:aspect-[16/9] sm:rounded-3xl">
            <Image
              src={article.coverImage}
              alt={article.title}
              fill
              priority
              sizes="(max-width: 896px) 100vw, 896px"
              className="object-cover"
            />
          </div>
          <figcaption className="mt-2.5 text-center font-serif text-xs italic leading-5 text-[#68786b] sm:mt-3 sm:text-sm">
            {article.heroCaption}
          </figcaption>
        </figure>

        {/* Rich Editorial Body Prose */}
        <div className="mx-auto mt-7 max-w-3xl space-y-6 sm:mt-10 sm:space-y-7">
          {/* Lead Paragraph with Editorial Drop Cap */}
          <p className="text-[15.5px] leading-[1.82] text-[#2f3d33] first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:font-serif first-letter:text-5xl first-letter:font-semibold first-letter:leading-[0.82] first-letter:text-[#1A3325] sm:text-[17.5px] sm:leading-[1.85] sm:first-letter:text-[3.5rem]">
            {article.leadParagraph}
          </p>

          {article.bodyParagraphs.map((paragraph, index) => (
            <p
              key={`body-${index}`}
              className="text-[15.5px] leading-[1.82] text-[#3a493e] sm:text-[17px] sm:leading-[1.85]"
            >
              {paragraph}
            </p>
          ))}

          {/* Editorial Pull-Quote */}
          <blockquote className="my-7 rounded-2xl border border-[#e3dfd2] bg-[#fbf9f2] px-5 py-6 sm:my-9 sm:rounded-3xl sm:px-8 sm:py-7">
            <Quote className="size-6 text-[#c2873a]/70" aria-hidden="true" />
            <p className="mt-2.5 font-serif text-xl italic leading-relaxed text-[#1A3325] sm:text-2xl sm:leading-relaxed">
              &ldquo;{article.pullQuote.text}&rdquo;
            </p>
            <footer className="mt-3 text-xs font-semibold uppercase tracking-[0.14em] text-[#a65f2b]">
              — {article.pullQuote.attribution}
            </footer>
          </blockquote>

          {/* Step-by-Step Numbered Instructions */}
          <section aria-labelledby="steps-heading" className="pt-1">
            <h2
              id="steps-heading"
              className="font-serif text-2xl font-semibold tracking-tight text-[#1A3325] sm:text-3xl"
            >
              {article.stepsHeading}
            </h2>

            <ol className="mt-4 space-y-3.5 sm:mt-5 sm:space-y-4">
              {article.steps.map((step, index) => (
                <li
                  key={step.title}
                  className="flex gap-3.5 rounded-2xl border border-[#e5e8df] bg-white p-4 shadow-[0_8px_24px_-22px_rgba(26,51,37,0.3)] sm:gap-4 sm:p-5"
                >
                  <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-[#edf1e9] font-serif text-sm font-semibold text-[#1A3325] tabular-nums sm:size-9">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm font-semibold text-[#1A3325] sm:text-base">
                      {step.title}
                    </h3>
                    <p className="mt-1 text-[13.5px] leading-6 text-[#556358] sm:text-[15px] sm:leading-7">
                      {step.detail}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          {/* EMBEDDED "PLANTS FEATURED IN THIS GUIDE" WIDGET */}
          {featuredProducts.length > 0 && (
            <section
              aria-labelledby="featured-plants-heading"
              className="my-8 rounded-2xl border border-[#d6e2d3] bg-[#f1f6ef] p-4 sm:my-10 sm:rounded-3xl sm:p-6"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 pb-4">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#a65f2b]">
                    Shop the manual
                  </p>
                  <h2
                    id="featured-plants-heading"
                    className="mt-0.5 font-serif text-xl font-semibold text-[#1A3325] sm:text-2xl"
                  >
                    Plants Featured in This Guide
                  </h2>
                </div>
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#2f5a3a] hover:text-[#1A3325] sm:text-sm"
                >
                  Browse all plants <ArrowRight className="size-3.5" aria-hidden="true" />
                </Link>
              </div>

              <div className="space-y-3.5">
                {featuredProducts.map((product) => (
                  <FeaturedPlantWidget key={product.id} product={product} />
                ))}
              </div>
            </section>
          )}

          {/* Closing Paragraph */}
          <p className="text-[15.5px] leading-[1.82] text-[#3a493e] sm:text-[17px] sm:leading-[1.85]">
            {article.closingParagraph}
          </p>

          {/* Grower Care Tip Box */}
          <div className="flex items-start gap-3 rounded-2xl border border-[#e6dec9] bg-[#fdfaf1] p-4 sm:p-5">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#f4e8cb] text-[#9b5b26]">
              <Sparkles className="size-4" aria-hidden="true" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#a65f2b]">
                Rooftop grower&apos;s note
              </p>
              <p className="mt-1 text-xs leading-6 text-[#4b594d] sm:text-sm">
                {article.careTip}
              </p>
            </div>
          </div>

          {/* Bottom Author Bio Box */}
          <section
            aria-labelledby="author-bio-heading"
            className="mt-10 overflow-hidden rounded-2xl border border-[#e5e8df] bg-white shadow-[0_12px_36px_-26px_rgba(26,51,37,0.3)] sm:mt-12 sm:rounded-3xl"
          >
            <div className="grid grid-cols-1 sm:grid-cols-[0.36fr_0.64fr]">
              <div className="relative aspect-[16/10] w-full bg-[#edf1e9] sm:aspect-auto sm:min-h-[15rem]">
                <Image
                  src={article.author.coverPhoto}
                  alt={`${article.author.nurseryName} rooftop nursery`}
                  fill
                  sizes="(max-width: 640px) 100vw, 280px"
                  className="object-cover"
                />
              </div>

              <div className="p-5 sm:p-6">
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#a65f2b]">
                  About the grower
                </p>
                <div className="mt-2 flex items-center gap-3">
                  <span className="relative size-10 shrink-0 overflow-hidden rounded-full border border-[#e5e8df] bg-[#edf1e9]">
                    <Image
                      src={article.author.avatar}
                      alt={article.author.name}
                      fill
                      sizes="40px"
                      className="object-cover"
                    />
                  </span>
                  <div className="min-w-0">
                    <h2 id="author-bio-heading" className="font-serif text-xl font-semibold text-[#1A3325]">
                      {article.author.name}
                    </h2>
                    <p className="text-xs text-[#68786b]">{article.author.role}</p>
                  </div>
                </div>

                <p className="mt-3 text-xs leading-6 text-[#58655b] sm:text-sm">
                  {article.author.bio}
                </p>

                <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-2.5">
                  <Link
                    href={`/nurseries/${article.author.nurserySlug}`}
                    className="inline-flex min-h-10 items-center justify-center gap-1.5 rounded-full bg-[#1A3325] px-4 text-xs font-semibold text-white transition-colors hover:bg-[#294735]"
                  >
                    Visit {article.author.nurseryName}
                    <ArrowRight className="size-3.5" aria-hidden="true" />
                  </Link>
                  <Link
                    href="/community"
                    className="inline-flex min-h-10 items-center justify-center rounded-full border border-[#dfe3da] bg-[#fbfaf6] px-4 text-xs font-semibold text-[#304b37] transition-colors hover:bg-[#edf1e9]"
                  >
                    Ask in Plant Clinic
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </div>
      </article>

      {/* Related Guides Carousel */}
      <section
        aria-labelledby="related-guides-heading"
        className="mx-auto mt-12 w-full max-w-[100rem] px-4 sm:mt-16 sm:px-6 lg:px-10 xl:px-14"
      >
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#a65f2b] sm:text-xs">
              Keep reading
            </p>
            <h2
              id="related-guides-heading"
              className="mt-1 font-serif text-2xl font-semibold text-[#1A3325] sm:text-3xl"
            >
              Related Guides
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden gap-2 sm:flex">
              <button
                type="button"
                onClick={() => scrollCarousel(-1)}
                aria-label="Scroll related guides left"
                className="inline-flex size-10 items-center justify-center rounded-full border border-[#dedfd5] bg-white text-[#1A3325] transition-colors hover:bg-[#edf1e9]"
              >
                <ChevronLeft className="size-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => scrollCarousel(1)}
                aria-label="Scroll related guides right"
                className="inline-flex size-10 items-center justify-center rounded-full border border-[#dedfd5] bg-white text-[#1A3325] transition-colors hover:bg-[#edf1e9]"
              >
                <ChevronRight className="size-5" aria-hidden="true" />
              </button>
            </div>
            <Link
              href="/journal"
              className="inline-flex min-h-10 items-center gap-1 text-xs font-semibold text-[#1A3325] hover:text-[#a65f2b] sm:ml-2 sm:text-sm"
            >
              <ArrowLeft className="size-3.5 sm:hidden" aria-hidden="true" />
              All guides
              <ArrowRight className="hidden size-4 sm:inline" aria-hidden="true" />
            </Link>
          </div>
        </div>

        <div
          ref={carouselRef}
          className="no-scrollbar -mx-4 mt-5 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-4 pb-2 sm:mx-0 sm:gap-6 sm:px-0"
        >
          {relatedArticles.map((related) => {
            const relCat = getJournalCategory(related.categoryId)
            return (
              <article
                key={related.slug}
                className="group flex w-[82vw] max-w-[22rem] shrink-0 snap-start flex-col overflow-hidden rounded-2xl border border-[#e5e8df] bg-white shadow-[0_10px_28px_-22px_rgba(26,51,37,0.3)] sm:w-[21rem] sm:rounded-3xl lg:w-[23rem]"
              >
                <Link href={`/journal/${related.slug}`} className="flex flex-1 flex-col">
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#edf1e9]">
                    <Image
                      src={related.coverImage}
                      alt={related.title}
                      fill
                      sizes="(max-width: 640px) 82vw, 368px"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-4 sm:p-5">
                    <p className="text-[11px] font-semibold text-[#a65f2b]">
                      {relCat.label} · {related.readTime}
                    </p>
                    <h3 className="mt-1.5 font-serif text-lg font-medium leading-snug text-[#1A3325] group-hover:text-[#3d6347]">
                      {related.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 flex-1 text-xs leading-5 text-[#58655b] sm:text-sm sm:leading-6">
                      {related.excerpt}
                    </p>
                    <span className="mt-3.5 inline-flex items-center gap-1 text-xs font-semibold text-[#527358]">
                      Read guide <ArrowRight className="size-3.5" aria-hidden="true" />
                    </span>
                  </div>
                </Link>
              </article>
            )
          })}
        </div>
      </section>

      {/* Share Toast */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-4 left-4 right-4 z-50 mx-auto flex max-w-sm items-center gap-2.5 rounded-2xl border border-[#2c4d3a] bg-[#0F291E] px-4 py-3 text-white shadow-2xl sm:left-auto sm:right-6 sm:bottom-6"
        >
          <BadgeCheck className="size-5 shrink-0 text-[#E5A849]" aria-hidden="true" />
          <p className="text-xs font-medium sm:text-sm">{toastMessage}</p>
        </div>
      )}
    </main>
  )
}
