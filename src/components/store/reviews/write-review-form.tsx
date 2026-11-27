'use client'

import { useEffect, useState, type ChangeEvent, type DragEvent, type FormEvent } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  ChevronDown,
  ImagePlus,
  Sprout,
  Star,
  X,
} from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { products } from '@/components/store/products'
import { saveStoredReview, type CustomerReview } from '@/lib/store/reviews-data'

const ratingLabels: Record<number, string> = {
  1: 'Needs attention',
  2: 'Below expectations',
  3: 'Good, settled in okay',
  4: 'Very happy with it',
  5: 'Thriving & loved it',
}

const inputClassName =
  'mt-1.5 h-12 w-full rounded-xl border border-[#dfe3da] bg-[#fbfaf6] px-3.5 text-base text-[#1A3325] outline-none transition placeholder:text-[#98a197] focus:border-[#527358] focus:bg-white focus:ring-2 focus:ring-[#527358]/15 sm:text-sm'

const labelClassName = 'block text-xs font-semibold text-[#304b37] sm:text-sm'

async function compressImageToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onerror = () => reject(new Error('Could not read file'))
    reader.onload = () => {
      const result = typeof reader.result === 'string' ? reader.result : ''
      const img = new window.Image()
      img.onload = () => {
        const maxDim = 900
        const scale = Math.min(1, maxDim / Math.max(img.width, img.height))
        const canvas = document.createElement('canvas')
        canvas.width = Math.max(1, Math.round(img.width * scale))
        canvas.height = Math.max(1, Math.round(img.height * scale))
        const ctx = canvas.getContext('2d')
        if (!ctx) {
          resolve(result)
          return
        }
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
        resolve(canvas.toDataURL('image/jpeg', 0.78))
      }
      img.onerror = () => resolve(result)
      img.src = result
    }
    reader.readAsDataURL(file)
  })
}

function StepHeader({
  step,
  title,
  badge,
}: {
  step: string
  title: string
  badge?: 'Optional' | 'Required'
}) {
  return (
    <div className="flex items-center justify-between gap-2">
      <div className="flex min-w-0 items-center gap-2.5">
        <span className="inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-[#edf1e9] text-[11px] font-bold text-[#1A3325] tabular-nums">
          {step}
        </span>
        <h2 className="truncate text-sm font-semibold text-[#1A3325] sm:text-base">
          {title}
        </h2>
      </div>
      {badge && (
        <span
          className={`shrink-0 text-[11px] font-medium ${
            badge === 'Optional' ? 'text-[#778078]' : 'text-[#a65f2b]'
          }`}
        >
          {badge}
        </span>
      )}
    </div>
  )
}

export function WriteReviewForm() {
  const [selectedSlug, setSelectedSlug] = useState('')
  const [rating, setRating] = useState<1 | 2 | 3 | 4 | 5>(5)
  const [hoverRating, setHoverRating] = useState<number | null>(null)
  const [headline, setHeadline] = useState('')
  const [experience, setExperience] = useState('')
  const [fullName, setFullName] = useState('')
  const [city, setCity] = useState('')
  const [photos, setPhotos] = useState<string[]>([])
  const [photoError, setPhotoError] = useState('')
  const [formError, setFormError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submittedReview, setSubmittedReview] = useState<CustomerReview | null>(null)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const requestedPlant = params.get('plant')
    if (requestedPlant && products.some((p) => p.slug === requestedPlant)) {
      setSelectedSlug(requestedPlant)
    }
  }, [])

  const selectedProduct = selectedSlug
    ? products.find((p) => p.slug === selectedSlug) ?? null
    : null
  const activeStars = hoverRating ?? rating

  async function addPhotoFiles(files: File[]) {
    const allowed = ['image/jpeg', 'image/png', 'image/webp']
    const valid = files.filter((file) => allowed.includes(file.type))
    if (valid.length !== files.length) {
      setPhotoError('Please upload JPG, PNG, or WebP images only.')
    } else if (photos.length + valid.length > 3) {
      setPhotoError('You can attach up to 3 photos.')
    } else {
      setPhotoError('')
    }

    const availableSlots = Math.max(0, 3 - photos.length)
    const slice = valid.slice(0, availableSlots)
    if (slice.length === 0) return

    const converted = await Promise.all(
      slice.map((file) => compressImageToDataUrl(file).catch(() => '')),
    )
    const clean = converted.filter(Boolean)
    if (clean.length > 0) {
      setPhotos((current) => [...current, ...clean].slice(0, 3))
    }
  }

  function handlePhotoInput(event: ChangeEvent<HTMLInputElement>) {
    void addPhotoFiles(Array.from(event.currentTarget.files ?? []))
    event.currentTarget.value = ''
  }

  function handleDrop(event: DragEvent<HTMLLabelElement>) {
    event.preventDefault()
    void addPhotoFiles(Array.from(event.dataTransfer.files))
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setFormError('')

    const cleanHeadline = headline.trim()
    const cleanText = experience.trim()
    const cleanName = fullName.trim()
    const cleanCity = city.trim()

    if (!cleanHeadline) {
      setFormError('Please add a short headline for your review.')
      return
    }
    if (cleanText.length < 10) {
      setFormError('Please share at least a sentence (10+ characters) about your experience.')
      return
    }
    if (!cleanName || !cleanCity) {
      setFormError('Please enter your name and city before publishing.')
      return
    }

    setIsSubmitting(true)
    const now = new Date()
    const formattedDate = new Intl.DateTimeFormat('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }).format(now)

    const newReview: CustomerReview = {
      id: `rev-user-${Date.now()}`,
      reviewerName: cleanName,
      city: cleanCity,
      verified: true,
      rating,
      date: formattedDate,
      isoDate: now.toISOString(),
      headline: cleanHeadline,
      text: cleanText,
      ...(selectedProduct
        ? {
            productId: selectedProduct.id,
            productSlug: selectedProduct.slug,
            productName: selectedProduct.name,
            productImage: selectedProduct.image,
            nurseryId: selectedProduct.nursery.id,
            nurserySlug: selectedProduct.nursery.slug,
            nurseryName: selectedProduct.nursery.name,
          }
        : {}),
      photos,
      helpfulCount: 0,
    }

    window.setTimeout(() => {
      saveStoredReview(newReview)
      setIsSubmitting(false)
      setSubmittedReview(newReview)
    }, 300)
  }

  function handleWriteAnother() {
    setSubmittedReview(null)
    setSelectedSlug('')
    setHeadline('')
    setExperience('')
    setPhotos([])
    setRating(5)
    setPhotoError('')
    setFormError('')
  }

  return (
    <main className="min-h-[75vh] bg-[#f7f5ef] pb-14 sm:pb-24">
      {/* Compact Forest Header */}
      <header className="bg-[#0F291E] text-white">
        <div className="mx-auto w-full max-w-[100rem] px-4 py-6 sm:px-6 sm:py-10 lg:px-10 lg:py-12 xl:px-14">
          <Link
            href="/reviews"
            className="inline-flex min-h-9 items-center gap-1.5 text-xs font-semibold text-white/75 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E5A849] sm:text-sm"
          >
            <ArrowLeft className="size-4" aria-hidden="true" /> Back to all reviews
          </Link>
          <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#f0c780] sm:mt-5 sm:text-xs">
            Share your plant journey
          </p>
          <h1 className="mt-1.5 max-w-2xl font-serif text-[1.85rem] font-semibold leading-[1.12] tracking-tight text-balance sm:mt-2 sm:text-4xl lg:text-5xl">
            Write a Review
          </h1>
          <p className="mt-2.5 max-w-xl text-[13.5px] leading-6 text-white/75 sm:mt-3 sm:text-base">
            Review a specific plant you ordered or share your overall experience with Abhay&apos;s Roof Garden.
          </p>
        </div>
      </header>

      {/* Main Content: Form First (clean mobile priority), Sticky Sidebar on Desktop Right */}
      <div className="mx-auto grid w-full max-w-[100rem] gap-6 px-4 pt-6 sm:px-6 sm:pt-10 lg:grid-cols-[1.32fr_0.68fr] lg:items-start lg:gap-10 lg:px-10 xl:px-14">
        {/* Guided 5-Step Form Card */}
        <form
          onSubmit={handleSubmit}
          noValidate
          className="min-w-0 overflow-hidden rounded-2xl border border-[#e4e8df] bg-white shadow-[0_14px_40px_-20px_rgba(26,51,37,0.16)] sm:rounded-3xl"
        >
          {formError && (
            <div className="border-b border-[#efe3d6] bg-[#fffaf3] px-4 py-3.5 sm:px-8">
              <p role="alert" className="text-xs font-medium leading-5 text-[#8a452e] sm:text-sm">
                {formError}
              </p>
            </div>
          )}

          {/* Step 01: Select Plant (Optional) */}
          <section className="min-w-0 border-b border-[#ecefe9] px-4 py-5 sm:px-8 sm:py-7">
            <StepHeader step="01" title="Plant purchased" badge="Optional" />
            <p className="mt-1.5 text-xs leading-5 text-[#68786b] sm:text-sm">
              Pick the plant you ordered, or leave this blank to review your overall store experience.
            </p>

            <div className="mt-3.5">
              <label htmlFor="review-plant" className="sr-only">
                Select a plant (optional)
              </label>
              <div className="relative">
                <select
                  id="review-plant"
                  value={selectedSlug}
                  onChange={(event) => setSelectedSlug(event.target.value)}
                  className={`${inputClassName} mt-0 appearance-none truncate pr-10`}
                >
                  <option value="">No specific plant — General store experience</option>
                  {products.map((product) => (
                    <option key={product.id} value={product.slug}>
                      {product.name} ({product.nursery.name})
                    </option>
                  ))}
                </select>
                <ChevronDown
                  className="pointer-events-none absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-[#68786b]"
                  aria-hidden="true"
                />
              </div>
            </div>

            {/* Compact inline plant preview when a plant is selected */}
            {selectedProduct && (
              <div className="mt-3.5 flex items-center gap-3 rounded-xl border border-[#e3e9df] bg-[#f8faf6] p-2.5 sm:p-3">
                <div className="relative size-12 shrink-0 overflow-hidden rounded-lg bg-[#edf1e9]">
                  <Image
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-[#1A3325]">
                    {selectedProduct.name}
                  </p>
                  <p className="mt-0.5 flex items-center gap-1 truncate text-xs text-[#527358]">
                    <Sprout className="size-3.5 shrink-0" aria-hidden="true" />
                    <span className="truncate">{selectedProduct.nursery.name}</span>
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedSlug('')}
                  aria-label="Clear selected plant"
                  className="inline-flex size-8 shrink-0 items-center justify-center rounded-full text-[#68786b] transition-colors hover:bg-[#e8eee4] hover:text-[#1A3325]"
                >
                  <X className="size-4" aria-hidden="true" />
                </button>
              </div>
            )}
          </section>

          {/* Step 02: Overall Star Rating */}
          <section className="min-w-0 border-b border-[#ecefe9] px-4 py-5 sm:px-8 sm:py-7">
            <StepHeader step="02" title="Overall rating" badge="Required" />
            <p className="mt-1.5 text-xs leading-5 text-[#68786b] sm:text-sm">
              Tap a star to rate your delivery, packaging, and plant quality.
            </p>

            <div
              className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4"
              onMouseLeave={() => setHoverRating(null)}
            >
              <div
                className="grid grid-cols-5 gap-2 sm:inline-flex sm:gap-2"
                role="radiogroup"
                aria-label="Star rating"
              >
                {([1, 2, 3, 4, 5] as const).map((starValue) => {
                  const filled = starValue <= activeStars
                  const isSelected = rating === starValue
                  return (
                    <button
                      key={starValue}
                      type="button"
                      role="radio"
                      aria-checked={isSelected}
                      aria-label={`${starValue} ${starValue === 1 ? 'star' : 'stars'}: ${ratingLabels[starValue]}`}
                      onClick={() => setRating(starValue)}
                      onMouseEnter={() => setHoverRating(starValue)}
                      className={`inline-flex h-12 items-center justify-center rounded-xl border transition-all duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1A3325] active:scale-95 sm:size-12 ${
                        filled
                          ? 'border-[#e5c994] bg-[#fdf9f0]'
                          : 'border-[#e5e8df] bg-[#fbfaf6] hover:border-[#d69a43]'
                      }`}
                    >
                      <Star
                        className={`size-5 transition-colors sm:size-6 ${
                          filled ? 'fill-[#d69a43] text-[#d69a43]' : 'text-[#c9d1c7]'
                        }`}
                        aria-hidden="true"
                      />
                    </button>
                  )
                })}
              </div>

              <div
                className="flex items-center justify-between rounded-xl border border-[#eceee8] bg-[#fbfaf6] px-3.5 py-2.5 sm:border-0 sm:bg-transparent sm:p-0"
                aria-live="polite"
              >
                <span className="text-xs font-semibold text-[#1A3325] sm:text-sm">
                  {ratingLabels[activeStars]}
                </span>
                <span className="ml-2 text-xs font-bold text-[#a65f2b] tabular-nums sm:text-sm">
                  {activeStars}.0 / 5
                </span>
              </div>
            </div>
          </section>

          {/* Step 03: Headline & Experience */}
          <section className="min-w-0 border-b border-[#ecefe9] px-4 py-5 sm:px-8 sm:py-7">
            <StepHeader step="03" title="Your experience" badge="Required" />

            <div className="mt-4 flex flex-col gap-4">
              <div className="min-w-0">
                <label htmlFor="review-headline" className={labelClassName}>
                  Review headline <span className="text-[#a65f2b]">*</span>
                </label>
                <input
                  id="review-headline"
                  type="text"
                  value={headline}
                  onChange={(event) => setHeadline(event.target.value)}
                  maxLength={90}
                  placeholder="e.g. Healthy leaves and thoughtful packaging"
                  required
                  className={inputClassName}
                />
              </div>

              <div className="min-w-0">
                <label htmlFor="review-experience" className={labelClassName}>
                  Detailed review <span className="text-[#a65f2b]">*</span>
                </label>
                <textarea
                  id="review-experience"
                  value={experience}
                  onChange={(event) => setExperience(event.target.value)}
                  rows={4}
                  maxLength={600}
                  placeholder="How was the delivery, unboxing, or plant health in your space?"
                  required
                  className="mt-1.5 min-h-32 w-full resize-y rounded-xl border border-[#dfe3da] bg-[#fbfaf6] px-3.5 py-3 text-base text-[#1A3325] outline-none transition placeholder:text-[#98a197] focus:border-[#527358] focus:bg-white focus:ring-2 focus:ring-[#527358]/15 sm:text-sm"
                />
                <div className="mt-1.5 flex items-center justify-between text-[11px] text-[#778078]">
                  <span>Minimum 10 characters</span>
                  <span className="tabular-nums">{experience.length}/600</span>
                </div>
              </div>
            </div>
          </section>

          {/* Step 04: Photo Upload (Optional) */}
          <section className="min-w-0 border-b border-[#ecefe9] px-4 py-5 sm:px-8 sm:py-7">
            <StepHeader step="04" title="Add photos" badge="Optional" />
            <p id="review-photo-hint" className="mt-1.5 text-xs leading-5 text-[#68786b] sm:text-sm">
              Add up to 3 sunlit photos of your plants or unboxing (JPG, PNG, or WebP).
            </p>

            <label
              htmlFor="review-photos"
              onDragOver={(event) => event.preventDefault()}
              onDrop={handleDrop}
              className="mt-3.5 flex min-h-28 cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-[#bfcbbd] bg-[#fbfaf6] px-4 py-5 text-center transition-colors hover:border-[#527358] hover:bg-[#f4f6f1] focus-within:ring-2 focus-within:ring-[#527358]/20"
            >
              <span className="flex size-10 items-center justify-center rounded-full bg-[#e9efe6] text-[#527358]">
                <ImagePlus className="size-5" aria-hidden="true" />
              </span>
              <span className="mt-2.5 text-sm font-semibold text-[#304b37]">
                <span className="sm:hidden">Tap to choose photos</span>
                <span className="hidden sm:inline">Drop photos here or click to upload</span>
              </span>
              <span className="mt-1 text-xs text-[#778078]">
                {photos.length}/3 photos selected
              </span>
              <input
                id="review-photos"
                type="file"
                accept="image/jpeg,image/png,image/webp"
                multiple
                onChange={handlePhotoInput}
                aria-describedby="review-photo-hint"
                className="sr-only"
              />
            </label>

            {photoError && (
              <p role="alert" className="mt-2 text-xs font-medium text-[#a14432]">
                {photoError}
              </p>
            )}

            {photos.length > 0 && (
              <ul className="mt-3.5 grid grid-cols-3 gap-2.5 sm:max-w-md sm:gap-3" aria-label="Uploaded photos">
                {photos.map((photo, index) => (
                  <li
                    key={`uploaded-photo-${index}`}
                    className="relative aspect-square overflow-hidden rounded-xl border border-[#e5e8df] bg-[#edf1e9] sm:rounded-2xl"
                  >
                    <Image
                      src={photo}
                      alt={`Selected photo ${index + 1}`}
                      fill
                      unoptimized
                      sizes="120px"
                      className="object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => setPhotos((current) => current.filter((_, i) => i !== index))}
                      aria-label={`Remove photo ${index + 1}`}
                      className="absolute right-1.5 top-1.5 inline-flex size-7 items-center justify-center rounded-full bg-[#0f291e]/85 text-white shadow-xs transition-colors hover:bg-[#0f291e]"
                    >
                      <X className="size-3.5" aria-hidden="true" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </section>

          {/* Step 05: Name & City */}
          <section className="min-w-0 px-4 py-5 sm:px-8 sm:py-7">
            <StepHeader step="05" title="About you" badge="Required" />

            <div className="mt-4 grid grid-cols-1 gap-3.5 sm:grid-cols-2 sm:gap-4">
              <div className="min-w-0">
                <label htmlFor="reviewer-name" className={labelClassName}>
                  Full name <span className="text-[#a65f2b]">*</span>
                </label>
                <input
                  id="reviewer-name"
                  type="text"
                  autoComplete="name"
                  value={fullName}
                  onChange={(event) => setFullName(event.target.value)}
                  placeholder="e.g. Sneha Roy"
                  required
                  className={inputClassName}
                />
              </div>

              <div className="min-w-0">
                <label htmlFor="reviewer-city" className={labelClassName}>
                  City <span className="text-[#a65f2b]">*</span>
                </label>
                <input
                  id="reviewer-city"
                  type="text"
                  autoComplete="address-level2"
                  value={city}
                  onChange={(event) => setCity(event.target.value)}
                  placeholder="e.g. Kolkata"
                  required
                  className={inputClassName}
                />
              </div>
            </div>
          </section>

          {/* Structured Form Footer */}
          <div className="flex flex-col gap-3 border-t border-[#ecefe9] bg-[#fbfaf6] px-4 py-4 sm:flex-row-reverse sm:items-center sm:justify-between sm:px-8 sm:py-5">
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex min-h-12 w-full items-center justify-center gap-2 whitespace-nowrap rounded-full bg-[#1A3325] px-7 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#294735] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1A3325] disabled:cursor-wait disabled:opacity-70 sm:w-auto"
            >
              {isSubmitting ? 'Publishing review...' : 'Submit Review'}
              <ArrowRight className="size-4" aria-hidden="true" />
            </button>
            <p className="text-center text-xs leading-5 text-[#778078] sm:text-left">
              Published reviews appear immediately in the Reviews Hub.
            </p>
          </div>
        </form>

        {/* Right Sidebar: Live Summary + Writing Tips (Desktop Sticky, Compact Tips Below Form on Mobile) */}
        <aside className="flex flex-col gap-5 lg:sticky lg:top-24">
          {/* Desktop Live Preview Card */}
          <div className="hidden rounded-3xl border border-[#e5e8df] bg-white p-6 shadow-[0_12px_36px_-28px_rgba(26,51,37,0.35)] lg:block">
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#a65f2b]">
              Reviewing
            </p>
            {selectedProduct ? (
              <div className="mt-3.5 flex items-center gap-4">
                <div className="relative size-18 shrink-0 overflow-hidden rounded-2xl bg-[#edf1e9]">
                  <Image
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    fill
                    sizes="72px"
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <h2 className="truncate font-serif text-lg font-semibold text-[#1A3325]">
                    {selectedProduct.name}
                  </h2>
                  <p className="mt-0.5 truncate font-serif text-xs italic text-[#778078]">
                    {selectedProduct.botanical}
                  </p>
                  <p className="mt-1.5 flex items-center gap-1 text-xs font-medium text-[#527358]">
                    <Sprout className="size-3.5 shrink-0" aria-hidden="true" />
                    <span className="truncate">{selectedProduct.nursery.name}</span>
                  </p>
                </div>
              </div>
            ) : (
              <div className="mt-3.5 flex items-center gap-3.5">
                <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-[#edf1e9] text-[#426b4b]">
                  <Sprout className="size-6" aria-hidden="true" />
                </span>
                <div className="min-w-0 flex-1">
                  <h2 className="font-serif text-lg font-semibold text-[#1A3325]">
                    General Store Experience
                  </h2>
                  <p className="mt-0.5 text-xs leading-5 text-[#68786b]">
                    Abhay&apos;s Roof Garden · No specific plant required
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Helpful Writing Tips */}
          <div className="rounded-2xl border border-[#dce6d8] bg-[#f1f5ee] p-4 sm:rounded-3xl sm:p-6">
            <p className="font-serif text-base font-semibold text-[#1A3325] sm:text-lg">
              What helps other plant parents most?
            </p>
            <ul className="mt-3 flex flex-col gap-2.5 text-xs leading-5 text-[#4d6152] sm:mt-3.5 sm:text-sm sm:leading-6">
              <li className="flex items-start gap-2.5">
                <BadgeCheck className="mt-0.5 size-4 shrink-0 text-[#426b4b]" aria-hidden="true" />
                How the packaging, leaves, and soil looked on arrival
              </li>
              <li className="flex items-start gap-2.5">
                <BadgeCheck className="mt-0.5 size-4 shrink-0 text-[#426b4b]" aria-hidden="true" />
                The light and corner where your plant is thriving at home
              </li>
              <li className="flex items-start gap-2.5">
                <BadgeCheck className="mt-0.5 size-4 shrink-0 text-[#426b4b]" aria-hidden="true" />
                A quick sunlit photo—our local growers love replying with care tips
              </li>
            </ul>
          </div>
        </aside>
      </div>

      {/* Animated Success Dialog */}
      <Dialog
        open={Boolean(submittedReview)}
        onOpenChange={(open) => {
          if (!open) handleWriteAnother()
        }}
      >
        <DialogContent
          showCloseButton={false}
          className="w-[calc(100%-2rem)] max-w-md rounded-2xl border border-[#e5e8df] bg-[#fbfaf6] p-5 text-center text-[#1A3325] shadow-2xl sm:rounded-3xl sm:max-w-md sm:p-8"
        >
          <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-[#e8f0e4] text-[#315a38] ring-8 ring-[#edf2e9] sm:size-16">
            <CheckCircle2 className="size-7 sm:size-8" aria-hidden="true" />
          </span>
          <DialogHeader className="mt-4 items-center text-center">
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#a65f2b]">
              Review published
            </p>
            <DialogTitle className="mt-1 font-serif text-xl font-semibold text-[#1A3325] sm:text-2xl">
              Thank you for sharing your plant journey!
            </DialogTitle>
            <DialogDescription className="mt-2 text-xs leading-6 text-[#68786b] sm:text-sm">
              {submittedReview?.productName ? (
                <>
                  Your review for{' '}
                  <span className="font-semibold text-[#1A3325]">{submittedReview.productName}</span>{' '}
                  has been published and is now live in the Reviews Hub.
                </>
              ) : (
                <>
                  Your review for{' '}
                  <span className="font-semibold text-[#1A3325]">Abhay&apos;s Roof Garden</span>{' '}
                  has been published and is now live in the Reviews Hub.
                </>
              )}
            </DialogDescription>
          </DialogHeader>

          <div className="mt-6 flex flex-col gap-2.5">
            <Link
              href="/reviews"
              className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#1A3325] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#294735]"
            >
              View all reviews
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
            <button
              type="button"
              onClick={handleWriteAnother}
              className="inline-flex min-h-11 w-full items-center justify-center rounded-full border border-[#dfe4dc] bg-white px-5 text-sm font-semibold text-[#304b37] transition-colors hover:bg-[#f4f6f1]"
            >
              Write another review
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </main>
  )
}
