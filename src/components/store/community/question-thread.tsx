'use client'

import { useEffect, useMemo, useState, type ChangeEvent, type FormEvent } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  BadgeCheck,
  Check,
  ChevronRight,
  Expand,
  ImagePlus,
  MessageCircle,
  Pin,
  Send,
  Share2,
  Sprout,
  X,
} from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { formatINR, products } from '@/components/store/products'
import {
  getTopicById,
  initialQuestions,
  readStoredAnswersMap,
  readStoredQuestions,
  readUpvotedIds,
  saveStoredAnswer,
  saveUpvotedIds,
  type CommunityAnswer,
  type CommunityQuestion,
} from '@/lib/store/community-data'

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return 'P'
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase()
}

async function compressReplyImage(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onerror = () => reject(new Error('Read failed'))
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

export function QuestionThread({ slug }: { slug: string }) {
  const initialMatch = useMemo(
    () => initialQuestions.find((q) => q.slug === slug) ?? null,
    [slug],
  )

  const [question, setQuestion] = useState<CommunityQuestion | null>(initialMatch)
  const [hydrated, setHydrated] = useState(false)
  const [extraAnswers, setExtraAnswers] = useState<CommunityAnswer[]>([])
  const [upvotedIds, setUpvotedIds] = useState<string[]>([])
  const [answerSort, setAnswerSort] = useState<'best' | 'newest'>('best')
  const [lightboxSrc, setLightboxSrc] = useState<{ src: string; caption: string } | null>(null)
  const [copied, setCopied] = useState(false)

  // Reply Composer state
  const [replyName, setReplyName] = useState('')
  const [replyCity, setReplyCity] = useState('')
  const [replyBody, setReplyBody] = useState('')
  const [replyPhoto, setReplyPhoto] = useState<string | undefined>(undefined)
  const [replyError, setReplyError] = useState('')
  const [toastMessage, setToastMessage] = useState('')

  useEffect(() => {
    const storedQuestions = readStoredQuestions()
    const fromStorage = storedQuestions.find((q) => q.slug === slug) ?? null
    setQuestion(fromStorage ?? initialMatch)

    const answersMap = readStoredAnswersMap()
    setExtraAnswers(answersMap[slug] ?? [])
    setUpvotedIds(readUpvotedIds())
    setHydrated(true)
  }, [initialMatch, slug])

  useEffect(() => {
    if (!toastMessage) return
    const timer = window.setTimeout(() => setToastMessage(''), 3500)
    return () => window.clearTimeout(timer)
  }, [toastMessage])

  const allAnswers = useMemo(() => {
    if (!question) return []
    const existingIds = new Set(question.answers.map((a) => a.id))
    return [...question.answers, ...extraAnswers.filter((a) => !existingIds.has(a.id))]
  }, [extraAnswers, question])

  const pinnedOfficialAnswers = useMemo(
    () => allAnswers.filter((answer) => answer.isOfficialNursery),
    [allAnswers],
  )

  const communityAnswers = useMemo(() => {
    const regular = allAnswers.filter((answer) => !answer.isOfficialNursery)
    return [...regular].sort((a, b) => {
      if (answerSort === 'newest') return b.isoDate.localeCompare(a.isoDate)
      const aVotes = a.upvotes + (upvotedIds.includes(a.id) ? 1 : 0)
      const bVotes = b.upvotes + (upvotedIds.includes(b.id) ? 1 : 0)
      return bVotes - aVotes
    })
  }, [allAnswers, answerSort, upvotedIds])

  const relatedProduct = useMemo(() => {
    if (!question?.relatedProductSlug) return null
    return products.find((p) => p.slug === question.relatedProductSlug) ?? null
  }, [question])

  const relatedThreads = useMemo(() => {
    if (!question) return initialQuestions.slice(0, 3)
    const sameTopic = initialQuestions.filter(
      (q) => q.slug !== question.slug && q.topicId === question.topicId,
    )
    const others = initialQuestions.filter(
      (q) => q.slug !== question.slug && q.topicId !== question.topicId,
    )
    return [...sameTopic, ...others].slice(0, 3)
  }, [question])

  function handleToggleUpvote(id: string) {
    setUpvotedIds((current) => {
      const next = current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
      saveUpvotedIds(next)
      return next
    })
  }

  async function handleShare() {
    if (!question) return
    const shareUrl = window.location.href
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: `${question.title} — Abhay's Roof Garden Plant Care Clinic`,
          text: `Plant care discussion: ${question.title}`,
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
      setToastMessage('Discussion link copied to clipboard!')
      window.setTimeout(() => setCopied(false), 2200)
    } catch {
      setToastMessage('Copy the URL from your browser bar to share.')
    }
  }

  async function handleAttachPhoto(event: ChangeEvent<HTMLInputElement>) {
    const file = event.currentTarget.files?.[0]
    event.currentTarget.value = ''
    if (!file) return
    const allowed = ['image/jpeg', 'image/png', 'image/webp']
    if (!allowed.includes(file.type)) {
      setReplyError('Please attach a JPG, PNG, or WebP photo.')
      return
    }
    setReplyError('')
    try {
      const dataUrl = await compressReplyImage(file)
      setReplyPhoto(dataUrl)
    } catch {
      setReplyError('Could not load that image. Please try another file.')
    }
  }

  function handlePostAnswer(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setReplyError('')

    const cleanName = replyName.trim()
    const cleanCity = replyCity.trim()
    const cleanBody = replyBody.trim()

    if (!cleanName) {
      setReplyError('Please add your name so the asker knows who replied.')
      return
    }
    if (cleanBody.length < 10) {
      setReplyError('Please write at least a short sentence of advice (10+ characters).')
      return
    }

    const newAnswer: CommunityAnswer = {
      id: `ans-user-${Date.now()}`,
      authorName: cleanName,
      authorCity: cleanCity || undefined,
      timeAgo: 'Just now',
      isoDate: new Date().toISOString(),
      body: cleanBody,
      upvotes: 1,
      photo: replyPhoto,
    }

    saveStoredAnswer(slug, newAnswer)
    setExtraAnswers((current) => [...current, newAnswer])
    setReplyBody('')
    setReplyPhoto(undefined)
    setToastMessage('Your plant care advice has been posted!')
  }

  if (!question && hydrated) {
    return (
      <main className="min-h-[70vh] bg-[#f7f5ef] px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-lg rounded-3xl border border-[#e5e8df] bg-white p-8 text-center shadow-xs">
          <span className="mx-auto flex size-12 items-center justify-center rounded-full bg-[#edf1e9] text-[#527358]">
            <Sprout className="size-6" aria-hidden="true" />
          </span>
          <h1 className="mt-4 font-serif text-2xl font-semibold text-[#1A3325]">
            Discussion not found
          </h1>
          <p className="mt-2 text-sm leading-6 text-[#68786b]">
            This plant care question may have been removed or posted on a different browser.
          </p>
          <Link
            href="/community"
            className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-full bg-[#1A3325] px-6 text-sm font-semibold text-white hover:bg-[#294735]"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            Back to Plant Care Clinic
          </Link>
        </div>
      </main>
    )
  }

  if (!question) {
    return (
      <main className="min-h-[70vh] bg-[#f7f5ef] px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-4xl space-y-4">
          <div className="h-6 w-48 animate-pulse rounded-lg bg-[#e6ebe2]" />
          <div className="h-64 w-full animate-pulse rounded-3xl bg-white" />
        </div>
      </main>
    )
  }

  const topic = getTopicById(question.topicId)
  const questionUpvoted = upvotedIds.includes(question.id)
  const questionVoteCount = question.upvotes + (questionUpvoted ? 1 : 0)

  return (
    <main className="min-h-[75vh] bg-[#f7f5ef] pb-14 sm:pb-24">
      {/* Compact Breadcrumb Bar */}
      <div className="border-b border-[#e5e8df] bg-white">
        <div className="mx-auto flex w-full max-w-[100rem] items-center gap-1.5 overflow-hidden px-4 py-3 text-xs text-[#68786b] sm:px-6 sm:py-3.5 sm:text-sm lg:px-10 xl:px-14">
          <Link href="/community" className="shrink-0 font-semibold text-[#1A3325] hover:text-[#a65f2b]">
            Community
          </Link>
          <ChevronRight className="size-3.5 shrink-0 text-[#9aa59b]" aria-hidden="true" />
          <Link href="/community" className="shrink-0 hover:text-[#1A3325]">
            <span className="sm:hidden">{topic.shortLabel}</span>
            <span className="hidden sm:inline">{topic.label}</span>
          </Link>
          <ChevronRight className="size-3.5 shrink-0 text-[#9aa59b]" aria-hidden="true" />
          <span className="min-w-0 truncate text-[#778078]">{question.title}</span>
        </div>
      </div>

      {/* Thread Grid: Main Discussion (Left) + Related Context (Right) */}
      <div className="mx-auto grid w-full max-w-[100rem] grid-cols-1 gap-6 px-4 pt-5 sm:px-6 sm:pt-8 lg:grid-cols-[minmax(0,1fr)_21rem] lg:items-start lg:gap-8 lg:px-10 xl:px-14">
        {/* Left Main Thread Column */}
        <div className="min-w-0 space-y-6 sm:space-y-8">
          {/* Main Question Card */}
          <article className="overflow-hidden rounded-2xl border border-[#e5e8df] bg-white p-4 shadow-[0_12px_36px_-26px_rgba(26,51,37,0.3)] sm:rounded-3xl sm:p-7">
            {/* Topic & Plant Tags */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center rounded-full bg-[#edf1e9] px-3 py-1 text-xs font-semibold text-[#2d5336]">
                {topic.label}
              </span>
              {question.plantName && (
                relatedProduct ? (
                  <Link
                    href={`/shop/${relatedProduct.slug}`}
                    className="inline-flex items-center gap-1 rounded-full border border-[#eadcc8] bg-[#fcf8f1] px-3 py-1 text-xs font-semibold text-[#9a5727] transition-colors hover:bg-[#f6eddf]"
                  >
                    <Sprout className="size-3.5" aria-hidden="true" />
                    {question.plantName}
                  </Link>
                ) : (
                  <span className="inline-flex items-center gap-1 rounded-full border border-[#eceee8] bg-[#fbfaf6] px-3 py-1 text-xs font-medium text-[#58655b]">
                    <Sprout className="size-3.5 text-[#527358]" aria-hidden="true" />
                    {question.plantName}
                  </span>
                )
              )}
            </div>

            {/* Question Title */}
            <h1 className="mt-3.5 font-serif text-[1.5rem] font-semibold leading-[1.2] tracking-tight text-balance text-[#1A3325] sm:mt-4 sm:text-3xl lg:text-[2.15rem]">
              {question.title}
            </h1>

            {/* Author Meta Row */}
            <div className="mt-3.5 flex items-center gap-2.5 text-xs text-[#778078] sm:mt-4">
              <span
                aria-hidden="true"
                className="flex size-8 shrink-0 items-center justify-center rounded-full border border-[#dce5d8] bg-[#edf1e9] font-serif text-xs font-semibold text-[#1A3325]"
              >
                {getInitials(question.authorName)}
              </span>
              <div className="min-w-0">
                <p className="truncate font-semibold text-[#1A3325]">
                  {question.authorName}
                  {question.authorCity && (
                    <span className="font-normal text-[#778078]"> · {question.authorCity}</span>
                  )}
                </p>
                <p className="text-[11px] text-[#778078]">Asked {question.timeAgo}</p>
              </div>
            </div>

            {/* Full Question Body */}
            <p className="mt-4 whitespace-pre-line text-[14.5px] leading-7 text-[#3f4e43] sm:mt-5 sm:text-base sm:leading-7">
              {question.body}
            </p>

            {/* Attached High-Res Plant Photo */}
            {question.photo && (
              <div className="mt-5">
                <button
                  type="button"
                  onClick={() =>
                    setLightboxSrc({
                      src: question.photo!,
                      caption: `${question.plantName} — shared by ${question.authorName}`,
                    })
                  }
                  aria-label="Inspect full-size plant photo"
                  className="group relative block aspect-[4/3] w-full max-w-xl overflow-hidden rounded-2xl border border-[#e5e8df] bg-[#edf1e9] text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1A3325] sm:aspect-[16/10]"
                >
                  <Image
                    src={question.photo}
                    alt={`${question.plantName} photo from ${question.authorName}`}
                    fill
                    unoptimized={question.photo.startsWith('data:')}
                    sizes="(max-width: 768px) 100vw, 576px"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                  <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-[#0f291e]/80 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-xs">
                    <Expand className="size-3.5" aria-hidden="true" />
                    Zoom photo
                  </span>
                </button>
              </div>
            )}

            {/* Question Action Bar */}
            <div className="mt-5 flex flex-wrap items-center justify-between gap-2.5 border-t border-[#eceee8] pt-4 sm:mt-6">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleToggleUpvote(question.id)}
                  aria-pressed={questionUpvoted}
                  className={`inline-flex min-h-10 items-center gap-1.5 rounded-full border px-4 text-xs font-semibold tabular-nums transition-colors sm:text-sm ${
                    questionUpvoted
                      ? 'border-[#1A3325] bg-[#1A3325] text-white'
                      : 'border-[#dfe3da] bg-[#fbfaf6] text-[#1A3325] hover:border-[#527358] hover:bg-[#edf1e9]'
                  }`}
                >
                  <ArrowUp className="size-4" aria-hidden="true" />
                  Upvote · {questionVoteCount}
                </button>

                <a
                  href="#reply-composer"
                  className="inline-flex min-h-10 items-center gap-1.5 rounded-full border border-[#dfe3da] bg-white px-4 text-xs font-semibold text-[#304b37] transition-colors hover:bg-[#f4f6f1] sm:text-sm"
                >
                  <MessageCircle className="size-4 text-[#527358]" aria-hidden="true" />
                  Answer
                </a>
              </div>

              <button
                type="button"
                onClick={handleShare}
                className="inline-flex min-h-10 items-center gap-1.5 rounded-full border border-[#dfe3da] bg-white px-3.5 text-xs font-semibold text-[#536258] transition-colors hover:bg-[#f4f6f1] hover:text-[#1A3325] sm:text-sm"
              >
                {copied ? (
                  <>
                    <Check className="size-4 text-[#3b6a47]" aria-hidden="true" />
                    Copied
                  </>
                ) : (
                  <>
                    <Share2 className="size-4" aria-hidden="true" />
                    Share
                  </>
                )}
              </button>
            </div>
          </article>

          {/* Answers Section */}
          <section id="answers" aria-labelledby="answers-heading" className="scroll-mt-24 space-y-4">
            <div className="flex items-center justify-between gap-3">
              <h2 id="answers-heading" className="font-serif text-xl font-semibold text-[#1A3325] sm:text-2xl">
                {allAnswers.length} {allAnswers.length === 1 ? 'Answer' : 'Answers'}
              </h2>
              {communityAnswers.length > 1 && (
                <div className="inline-flex rounded-full border border-[#e0e4db] bg-white p-0.5 text-xs font-semibold">
                  <button
                    type="button"
                    onClick={() => setAnswerSort('best')}
                    className={`rounded-full px-3 py-1.5 transition-colors ${
                      answerSort === 'best'
                        ? 'bg-[#1A3325] text-white'
                        : 'text-[#58655b] hover:text-[#1A3325]'
                    }`}
                  >
                    Most helpful
                  </button>
                  <button
                    type="button"
                    onClick={() => setAnswerSort('newest')}
                    className={`rounded-full px-3 py-1.5 transition-colors ${
                      answerSort === 'newest'
                        ? 'bg-[#1A3325] text-white'
                        : 'text-[#58655b] hover:text-[#1A3325]'
                    }`}
                  >
                    Newest
                  </button>
                </div>
              )}
            </div>

            {/* Pinned Official Nursery Answer(s) */}
            {pinnedOfficialAnswers.map((answer) => {
              const isUpvoted = upvotedIds.includes(answer.id)
              const voteCount = answer.upvotes + (isUpvoted ? 1 : 0)

              return (
                <article
                  key={answer.id}
                  className="overflow-hidden rounded-2xl border border-[#b9cfb5] bg-[#f1f6ef] shadow-[0_12px_32px_-24px_rgba(26,51,37,0.35)] sm:rounded-3xl"
                >
                  {/* Official Pinned Header Strip */}
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#d5e4d2] bg-[#e6f0e3] px-4 py-2.5 sm:px-6">
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1A3325]">
                      <Sprout className="size-4 shrink-0 text-[#356440]" aria-hidden="true" />
                      Official Answer by {answer.nurseryName ?? answer.authorName}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#356440]">
                      <Pin className="size-3" aria-hidden="true" />
                      Pinned Grower Advice
                    </span>
                  </div>

                  <div className="p-4 sm:p-6">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex min-w-0 items-center gap-3">
                        {answer.nurseryAvatar && (
                          <span className="relative size-10 shrink-0 overflow-hidden rounded-full border-2 border-white bg-white shadow-xs">
                            <Image
                              src={answer.nurseryAvatar}
                              alt={answer.nurseryName ?? answer.authorName}
                              fill
                              sizes="40px"
                              className="object-cover"
                            />
                          </span>
                        )}
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-x-1.5 gap-y-0.5">
                            {answer.nurserySlug ? (
                              <Link
                                href={`/nurseries/${answer.nurserySlug}`}
                                className="truncate text-sm font-semibold text-[#1A3325] hover:underline"
                              >
                                {answer.nurseryName ?? answer.authorName}
                              </Link>
                            ) : (
                              <span className="truncate text-sm font-semibold text-[#1A3325]">
                                {answer.authorName}
                              </span>
                            )}
                            <span className="inline-flex items-center gap-1 text-xs font-medium text-[#356440]">
                              <BadgeCheck className="size-3.5 shrink-0" aria-hidden="true" />
                              {answer.nurseryRole ?? 'Verified Local Grower'}
                            </span>
                          </div>
                          <p className="text-xs text-[#607364]">{answer.timeAgo}</p>
                        </div>
                      </div>
                    </div>

                    <p className="mt-3.5 whitespace-pre-line text-[14px] leading-7 text-[#283d2e] sm:text-[15px]">
                      {answer.body}
                    </p>

                    <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-[#d8e5d5] pt-3.5">
                      <button
                        type="button"
                        onClick={() => handleToggleUpvote(answer.id)}
                        aria-pressed={isUpvoted}
                        className={`inline-flex min-h-9 items-center gap-1.5 rounded-full border px-3.5 text-xs font-semibold tabular-nums transition-colors ${
                          isUpvoted
                            ? 'border-[#1A3325] bg-[#1A3325] text-white'
                            : 'border-[#c6d8c3] bg-white text-[#1A3325] hover:bg-[#e8f0e6]'
                        }`}
                      >
                        <ArrowUp className="size-3.5" aria-hidden="true" />
                        Helpful · {voteCount}
                      </button>

                      {answer.nurserySlug && (
                        <Link
                          href={`/nurseries/${answer.nurserySlug}`}
                          className="inline-flex items-center gap-1 text-xs font-semibold text-[#2d5838] hover:text-[#1A3325]"
                        >
                          Visit nursery <ArrowRight className="size-3.5" aria-hidden="true" />
                        </Link>
                      )}
                    </div>
                  </div>
                </article>
              )
            })}

            {/* Community Answers */}
            {communityAnswers.map((answer) => {
              const isUpvoted = upvotedIds.includes(answer.id)
              const voteCount = answer.upvotes + (isUpvoted ? 1 : 0)

              return (
                <article
                  key={answer.id}
                  className="rounded-2xl border border-[#e5e8df] bg-white p-4 shadow-[0_8px_24px_-20px_rgba(26,51,37,0.28)] sm:rounded-3xl sm:p-6"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex min-w-0 items-center gap-2.5">
                      <span
                        aria-hidden="true"
                        className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#edf1e9] font-serif text-xs font-semibold text-[#1A3325]"
                      >
                        {getInitials(answer.authorName)}
                      </span>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-[#1A3325]">
                          {answer.authorName}
                          {answer.authorCity && (
                            <span className="font-normal text-[#778078]"> · {answer.authorCity}</span>
                          )}
                        </p>
                        <p className="text-[11px] text-[#778078]">{answer.timeAgo}</p>
                      </div>
                    </div>
                  </div>

                  <p className="mt-3 whitespace-pre-line text-[14px] leading-6 text-[#4b594e] sm:text-[15px] sm:leading-7">
                    {answer.body}
                  </p>

                  {answer.photo && (
                    <button
                      type="button"
                      onClick={() =>
                        setLightboxSrc({
                          src: answer.photo!,
                          caption: `Photo shared by ${answer.authorName}`,
                        })
                      }
                      className="relative mt-3 block h-36 w-48 overflow-hidden rounded-xl border border-[#e5e8df] bg-[#edf1e9]"
                    >
                      <Image
                        src={answer.photo}
                        alt={`Advice photo from ${answer.authorName}`}
                        fill
                        unoptimized={answer.photo.startsWith('data:')}
                        sizes="192px"
                        className="object-cover"
                      />
                    </button>
                  )}

                  <div className="mt-4 flex items-center justify-between border-t border-[#f0f2ec] pt-3">
                    <button
                      type="button"
                      onClick={() => handleToggleUpvote(answer.id)}
                      aria-pressed={isUpvoted}
                      className={`inline-flex min-h-9 items-center gap-1.5 rounded-full border px-3 text-xs font-semibold tabular-nums transition-colors ${
                        isUpvoted
                          ? 'border-[#1A3325] bg-[#1A3325] text-white'
                          : 'border-[#e5e8df] bg-[#fbfaf6] text-[#4c5b50] hover:border-[#527358] hover:bg-[#edf1e9] hover:text-[#1A3325]'
                      }`}
                    >
                      <ArrowUp className="size-3.5" aria-hidden="true" />
                      Upvote · {voteCount}
                    </button>
                  </div>
                </article>
              )
            })}

            {allAnswers.length === 0 && (
              <div className="rounded-2xl border border-dashed border-[#cbd5c9] bg-white px-5 py-8 text-center sm:rounded-3xl">
                <p className="font-serif text-lg font-semibold text-[#1A3325]">
                  No answers yet — be the first to help!
                </p>
                <p className="mt-1 text-xs leading-5 text-[#68786b] sm:text-sm">
                  Our local nursery growers also check new clinic posts daily.
                </p>
              </div>
            )}
          </section>

          {/* Reply Composer */}
          <section
            id="reply-composer"
            aria-labelledby="composer-heading"
            className="scroll-mt-24 overflow-hidden rounded-2xl border border-[#e5e8df] bg-white shadow-[0_12px_36px_-24px_rgba(26,51,37,0.28)] sm:rounded-3xl"
          >
            <div className="border-b border-[#eceee8] bg-[#fbfaf6] px-4 py-4 sm:px-6">
              <h2 id="composer-heading" className="font-serif text-lg font-semibold text-[#1A3325] sm:text-xl">
                Share your plant care advice
              </h2>
              <p className="mt-0.5 text-xs text-[#68786b] sm:text-sm">
                Have experience with {question.plantName}? Help {question.authorName} out below.
              </p>
            </div>

            <form onSubmit={handlePostAnswer} noValidate className="p-4 sm:p-6">
              {replyError && (
                <p
                  role="alert"
                  className="mb-4 rounded-xl border border-[#ead9c8] bg-[#fffaf3] px-3.5 py-2.5 text-xs font-medium text-[#8a452e] sm:text-sm"
                >
                  {replyError}
                </p>
              )}

              <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                <div className="min-w-0">
                  <label htmlFor="reply-name" className="block text-xs font-semibold text-[#304b37]">
                    Your name <span className="text-[#a65f2b]">*</span>
                  </label>
                  <input
                    id="reply-name"
                    type="text"
                    autoComplete="name"
                    value={replyName}
                    onChange={(event) => setReplyName(event.target.value)}
                    placeholder="e.g. Ananya Sen"
                    required
                    className="mt-1.5 h-11 w-full rounded-xl border border-[#dfe3da] bg-[#fbfaf6] px-3.5 text-base text-[#1A3325] outline-none transition placeholder:text-[#98a197] focus:border-[#527358] focus:bg-white focus:ring-2 focus:ring-[#527358]/15 sm:text-sm"
                  />
                </div>
                <div className="min-w-0">
                  <label htmlFor="reply-city" className="block text-xs font-semibold text-[#304b37]">
                    City <span className="font-normal text-[#778078]">(optional)</span>
                  </label>
                  <input
                    id="reply-city"
                    type="text"
                    autoComplete="address-level2"
                    value={replyCity}
                    onChange={(event) => setReplyCity(event.target.value)}
                    placeholder="e.g. Kolkata"
                    className="mt-1.5 h-11 w-full rounded-xl border border-[#dfe3da] bg-[#fbfaf6] px-3.5 text-base text-[#1A3325] outline-none transition placeholder:text-[#98a197] focus:border-[#527358] focus:bg-white focus:ring-2 focus:ring-[#527358]/15 sm:text-sm"
                  />
                </div>
              </div>

              <div className="mt-3.5">
                <label htmlFor="reply-body" className="block text-xs font-semibold text-[#304b37]">
                  Your advice <span className="text-[#a65f2b]">*</span>
                </label>
                <textarea
                  id="reply-body"
                  value={replyBody}
                  onChange={(event) => setReplyBody(event.target.value)}
                  rows={4}
                  maxLength={700}
                  placeholder="Share watering tips, soil mix ratios, or what worked for your plant..."
                  required
                  className="mt-1.5 min-h-28 w-full resize-y rounded-xl border border-[#dfe3da] bg-[#fbfaf6] px-3.5 py-2.5 text-base text-[#1A3325] outline-none transition placeholder:text-[#98a197] focus:border-[#527358] focus:bg-white focus:ring-2 focus:ring-[#527358]/15 sm:text-sm"
                />
              </div>

              {replyPhoto && (
                <div className="mt-3 flex items-center gap-3 rounded-xl border border-[#e3e8df] bg-[#fbfaf6] p-2.5">
                  <span className="relative size-14 shrink-0 overflow-hidden rounded-lg bg-[#edf1e9]">
                    <Image src={replyPhoto} alt="Attached reply photo" fill unoptimized sizes="56px" className="object-cover" />
                  </span>
                  <span className="min-w-0 flex-1 text-xs font-medium text-[#304b37]">
                    Reference photo attached
                  </span>
                  <button
                    type="button"
                    onClick={() => setReplyPhoto(undefined)}
                    aria-label="Remove attached photo"
                    className="inline-flex size-8 items-center justify-center rounded-full text-[#68786b] hover:bg-[#e8ede5] hover:text-[#1A3325]"
                  >
                    <X className="size-4" aria-hidden="true" />
                  </button>
                </div>
              )}

              <div className="mt-4 flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between">
                <label className="inline-flex min-h-10 w-full cursor-pointer items-center justify-center gap-2 rounded-full border border-[#dfe3da] bg-[#fbfaf6] px-4 text-xs font-semibold text-[#304b37] transition-colors hover:border-[#527358] hover:bg-[#edf1e9] sm:w-auto sm:text-sm">
                  <ImagePlus className="size-4 text-[#527358]" aria-hidden="true" />
                  {replyPhoto ? 'Change photo' : 'Attach photo'}
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={handleAttachPhoto}
                    className="sr-only"
                  />
                </label>

                <button
                  type="submit"
                  className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#1A3325] px-6 text-sm font-semibold text-white shadow-xs transition-colors hover:bg-[#294735] sm:w-auto"
                >
                  <Send className="size-4" aria-hidden="true" />
                  Post your advice
                </button>
              </div>
            </form>
          </section>
        </div>

        {/* Right Sidebar: Related Plant + More Discussions */}
        <aside className="flex flex-col gap-5 lg:sticky lg:top-24">
          {relatedProduct && (
            <div className="rounded-2xl border border-[#e5e8df] bg-white p-4 shadow-[0_10px_30px_-24px_rgba(26,51,37,0.3)] sm:rounded-3xl sm:p-5">
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#a65f2b]">
                Plant in this thread
              </p>
              <Link
                href={`/shop/${relatedProduct.slug}`}
                className="group mt-3 flex items-center gap-3.5"
              >
                <span className="relative size-16 shrink-0 overflow-hidden rounded-xl bg-[#edf1e9]">
                  <Image
                    src={relatedProduct.image}
                    alt={relatedProduct.name}
                    fill
                    sizes="64px"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate font-serif text-base font-semibold text-[#1A3325] group-hover:text-[#446a4d]">
                    {relatedProduct.name}
                  </span>
                  <span className="mt-0.5 block text-xs text-[#68786b]">
                    From {formatINR(relatedProduct.sizes[0].price)}
                  </span>
                  <span className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-[#527358]">
                    View care &amp; shop <ArrowRight className="size-3" aria-hidden="true" />
                  </span>
                </span>
              </Link>
            </div>
          )}

          <div className="rounded-2xl border border-[#e5e8df] bg-white p-5 shadow-[0_10px_30px_-24px_rgba(26,51,37,0.3)] sm:rounded-3xl sm:p-6">
            <h2 className="font-serif text-lg font-semibold text-[#1A3325]">
              Related discussions
            </h2>
            <ul className="mt-3.5 divide-y divide-[#f0f2ec]">
              {relatedThreads.map((item) => (
                <li key={item.id} className="py-3 first:pt-0 last:pb-0">
                  <Link
                    href={`/community/${item.slug}`}
                    className="group block"
                  >
                    <p className="text-[11px] font-semibold text-[#a65f2b]">
                      {getTopicById(item.topicId).shortLabel}
                    </p>
                    <p className="mt-1 line-clamp-2 text-sm font-semibold leading-snug text-[#1A3325] group-hover:text-[#446a4d]">
                      {item.title}
                    </p>
                    <p className="mt-1 text-xs text-[#778078] tabular-nums">
                      {item.upvotes} upvotes · {item.answers.length} answers
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="/community"
              className="mt-4 inline-flex min-h-10 w-full items-center justify-center gap-1.5 rounded-full border border-[#dfe3da] bg-[#fbfaf6] text-xs font-semibold text-[#1A3325] transition-colors hover:bg-[#edf1e9]"
            >
              <ArrowLeft className="size-3.5" aria-hidden="true" />
              All clinic questions
            </Link>
          </div>
        </aside>
      </div>

      {/* Photo Lightbox Dialog */}
      <Dialog open={Boolean(lightboxSrc)} onOpenChange={(open) => { if (!open) setLightboxSrc(null) }}>
        <DialogContent
          showCloseButton={false}
          className="max-h-[90dvh] w-[calc(100%-1.5rem)] max-w-2xl overflow-hidden rounded-2xl border border-[#e5e8df] bg-[#fbfaf6] p-0 text-[#1A3325] shadow-2xl sm:max-w-2xl sm:rounded-3xl"
        >
          {lightboxSrc && (
            <div className="flex flex-col">
              <div className="relative aspect-[4/3] w-full bg-[#10251b]">
                <Image
                  src={lightboxSrc.src}
                  alt={lightboxSrc.caption}
                  fill
                  unoptimized={lightboxSrc.src.startsWith('data:')}
                  sizes="(min-width: 768px) 672px, 100vw"
                  className="object-contain"
                />
                <button
                  type="button"
                  onClick={() => setLightboxSrc(null)}
                  aria-label="Close photo zoom"
                  className="absolute right-3 top-3 inline-flex size-10 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-xs hover:bg-black/80"
                >
                  <X className="size-5" aria-hidden="true" />
                </button>
              </div>
              <DialogHeader className="p-4 text-left sm:p-5">
                <DialogTitle className="font-serif text-base font-semibold text-[#1A3325] sm:text-lg">
                  {question.title}
                </DialogTitle>
                <DialogDescription className="text-xs text-[#68786b]">
                  {lightboxSrc.caption}
                </DialogDescription>
              </DialogHeader>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Instant Toast Notification */}
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
