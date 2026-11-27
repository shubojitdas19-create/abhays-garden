'use client'

import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowRight,
  ArrowUp,
  BadgeCheck,
  ChevronDown,
  MessageCircle,
  MessageSquarePlus,
  Search,
  SlidersHorizontal,
  Sparkles,
  Sprout,
  X,
} from 'lucide-react'
import { nurseries } from '@/components/store/products'
import { AskQuestionModal } from '@/components/store/community/ask-question-modal'
import {
  communityTopics,
  getTopicById,
  initialQuestions,
  readStoredAnswersMap,
  readStoredQuestions,
  readUpvotedIds,
  saveStoredQuestion,
  saveUpvotedIds,
  type CommunityAnswer,
  type CommunityQuestion,
  type TopicId,
} from '@/lib/store/community-data'

type SortId = 'top' | 'recent' | 'nursery-answered' | 'unanswered'

const sortOptions: { id: SortId; label: string }[] = [
  { id: 'top', label: 'Most upvoted' },
  { id: 'recent', label: 'Most recent' },
  { id: 'nursery-answered', label: 'Nursery answered' },
  { id: 'unanswered', label: 'Needs advice' },
]

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return 'G'
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase()
}

export function CommunityFeed() {
  const [userQuestions, setUserQuestions] = useState<CommunityQuestion[]>([])
  const [storedAnswersMap, setStoredAnswersMap] = useState<Record<string, CommunityAnswer[]>>({})
  const [upvotedIds, setUpvotedIds] = useState<string[]>([])
  const [activeTopic, setActiveTopic] = useState<TopicId>('all')
  const [sortBy, setSortBy] = useState<SortId>('top')
  const [searchQuery, setSearchQuery] = useState('')
  const [askOpen, setAskOpen] = useState(false)
  const [toast, setToast] = useState<{ message: string; slug?: string } | null>(null)

  useEffect(() => {
    setUserQuestions(readStoredQuestions())
    setStoredAnswersMap(readStoredAnswersMap())
    setUpvotedIds(readUpvotedIds())
  }, [])

  useEffect(() => {
    if (!toast) return
    const timer = window.setTimeout(() => setToast(null), 4800)
    return () => window.clearTimeout(timer)
  }, [toast])

  const allQuestions = useMemo(() => {
    const userIds = new Set(userQuestions.map((q) => q.id))
    const merged = [
      ...userQuestions,
      ...initialQuestions.filter((q) => !userIds.has(q.id)),
    ]

    return merged.map((question) => {
      const extraAnswers = storedAnswersMap[question.slug] ?? []
      if (extraAnswers.length === 0) return question
      const existingIds = new Set(question.answers.map((a) => a.id))
      return {
        ...question,
        answers: [
          ...question.answers,
          ...extraAnswers.filter((a) => !existingIds.has(a.id)),
        ],
      }
    })
  }, [storedAnswersMap, userQuestions])

  const filteredQuestions = useMemo(() => {
    const q = searchQuery.trim().toLowerCase()
    const list = allQuestions.filter((question) => {
      if (activeTopic !== 'all' && question.topicId !== activeTopic) return false
      if (sortBy === 'nursery-answered' && !question.answers.some((a) => a.isOfficialNursery)) {
        return false
      }
      if (sortBy === 'unanswered' && question.answers.length > 0) return false
      if (q) {
        const topic = getTopicById(question.topicId)
        const haystack =
          `${question.title} ${question.body} ${question.plantName} ${question.authorName} ${question.authorCity} ${topic.label}`.toLowerCase()
        if (!haystack.includes(q)) return false
      }
      return true
    })

    return [...list].sort((a, b) => {
      if (sortBy === 'recent') {
        return b.isoDate.localeCompare(a.isoDate)
      }
      const aVotes = a.upvotes + (upvotedIds.includes(a.id) ? 1 : 0)
      const bVotes = b.upvotes + (upvotedIds.includes(b.id) ? 1 : 0)
      return bVotes - aVotes || b.isoDate.localeCompare(a.isoDate)
    })
  }, [activeTopic, allQuestions, searchQuery, sortBy, upvotedIds])

  const totalAnswers = useMemo(
    () => allQuestions.reduce((sum, item) => sum + item.answers.length, 0),
    [allQuestions],
  )
  const nurseryAnsweredCount = useMemo(
    () => allQuestions.filter((item) => item.answers.some((a) => a.isOfficialNursery)).length,
    [allQuestions],
  )

  const hasActiveFilters =
    activeTopic !== 'all' || searchQuery.trim() !== '' || sortBy !== 'top'

  function resetFilters() {
    setActiveTopic('all')
    setSearchQuery('')
    setSortBy('top')
  }

  function handleToggleUpvote(id: string) {
    setUpvotedIds((current) => {
      const next = current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
      saveUpvotedIds(next)
      return next
    })
  }

  function handleAddQuestion(newQuestion: CommunityQuestion) {
    saveStoredQuestion(newQuestion)
    setUserQuestions((current) => [newQuestion, ...current])
    setActiveTopic('all')
    setSortBy('recent')
    setToast({
      message: 'Your question is live in the Plant Care Clinic!',
      slug: newQuestion.slug,
    })
  }

  return (
    <main className="min-h-[75vh] bg-[#f7f5ef] pb-14 sm:pb-24">
      {/* Editorial Forest Hero */}
      <section className="relative overflow-hidden bg-[#0F291E] text-white" aria-labelledby="community-hero-heading">
        <div className="mx-auto w-full max-w-[100rem] px-4 py-7 sm:px-6 sm:py-12 lg:px-10 lg:py-14 xl:px-14">
          <div className="grid items-center gap-6 sm:gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
            <div className="min-w-0">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#f0c780] sm:text-xs">
                Rooftop Plant Care Clinic
              </p>
              <h1
                id="community-hero-heading"
                className="mt-2.5 max-w-2xl font-serif text-[1.85rem] font-semibold leading-[1.1] tracking-tight text-balance sm:mt-3 sm:text-5xl lg:text-[3.35rem]"
              >
                The Plant Care Clinic &amp; Community
              </h1>
              <p className="mt-3 max-w-xl text-[13.5px] leading-6 text-white/80 sm:mt-4 sm:text-base sm:leading-7">
                Ask plant questions, share propagation wins, and get practical advice from fellow urban growers and verified local nurseries.
              </p>

              <div className="mt-5 grid grid-cols-2 gap-2.5 sm:mt-7 sm:flex sm:items-center sm:gap-3">
                <button
                  type="button"
                  onClick={() => setAskOpen(true)}
                  className="inline-flex min-h-11 items-center justify-center gap-1.5 whitespace-nowrap rounded-full bg-[#E5A849] px-3.5 text-[13px] font-semibold text-[#1A3325] shadow-sm transition-colors hover:bg-[#efbc69] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:min-h-12 sm:gap-2 sm:px-6 sm:text-sm"
                >
                  <MessageSquarePlus className="size-4 shrink-0" aria-hidden="true" />
                  Ask a Question
                </button>
                <Link
                  href="/nurseries"
                  className="inline-flex min-h-11 items-center justify-center gap-1.5 whitespace-nowrap rounded-full border border-white/25 px-3.5 text-[13px] font-semibold text-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E5A849] sm:min-h-12 sm:gap-2 sm:px-6 sm:text-sm"
                >
                  Meet Growers
                  <ArrowRight className="size-3.5 shrink-0 sm:size-4" aria-hidden="true" />
                </Link>
              </div>
            </div>

            {/* Compact Community Pulse Box */}
            <aside
              aria-label="Community statistics"
              className="rounded-2xl border border-white/15 bg-[#163427]/95 p-4 shadow-[0_20px_50px_-24px_rgba(0,0,0,0.45)] sm:rounded-3xl sm:p-6"
            >
              <div className="grid grid-cols-3 divide-x divide-white/12 text-center">
                <div className="px-2">
                  <p className="font-serif text-2xl font-semibold text-white tabular-nums sm:text-3xl">
                    {allQuestions.length}
                  </p>
                  <p className="mt-1 text-[11px] leading-tight text-white/70 sm:text-xs">
                    Open threads
                  </p>
                </div>
                <div className="px-2">
                  <p className="font-serif text-2xl font-semibold text-[#f0c780] tabular-nums sm:text-3xl">
                    {nurseryAnsweredCount}
                  </p>
                  <p className="mt-1 text-[11px] leading-tight text-white/70 sm:text-xs">
                    Nursery replies
                  </p>
                </div>
                <div className="px-2">
                  <p className="font-serif text-2xl font-semibold text-white tabular-nums sm:text-3xl">
                    {totalAnswers}
                  </p>
                  <p className="mt-1 text-[11px] leading-tight text-white/70 sm:text-xs">
                    Care answers
                  </p>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-3 border-t border-white/12 pt-4">
                <div className="flex -space-x-2">
                  {nurseries.map((nursery) => (
                    <span
                      key={nursery.id}
                      className="relative size-8 overflow-hidden rounded-full border-2 border-[#163427] bg-white"
                    >
                      <Image
                        src={nursery.avatar}
                        alt={nursery.name}
                        fill
                        sizes="32px"
                        className="object-cover"
                      />
                    </span>
                  ))}
                </div>
                <p className="min-w-0 flex-1 text-xs leading-5 text-white/80">
                  Backed by <span className="font-semibold text-white">3 verified local nurseries</span> answering daily care &amp; pest questions.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Main Content Container */}
      <div className="mx-auto w-full max-w-[100rem] px-4 pt-6 sm:px-6 sm:pt-9 lg:px-10 xl:px-14">
        {/* Action Bar: Search + Sort + Topic Pills */}
        <section
          aria-label="Search and filter community questions"
          className="rounded-2xl border border-[#e5e8df] bg-white p-4 shadow-[0_8px_24px_rgba(26,51,37,0.04)] sm:p-5"
        >
          {/* Top Row: Search + Sort + Ask CTA (desktop) */}
          <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:gap-3">
            <label className="relative block flex-1">
              <span className="sr-only">Search plant care questions</span>
              <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-[#778078]" aria-hidden="true" />
              <input
                type="search"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search questions (e.g. yellowing pothos leaves)..."
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

            <div className="flex items-center gap-2.5">
              <label className="relative block min-w-0 flex-1 sm:w-44 sm:flex-none">
                <span className="sr-only">Sort discussions</span>
                <select
                  value={sortBy}
                  onChange={(event) => setSortBy(event.target.value as SortId)}
                  className="h-11 w-full appearance-none truncate rounded-xl border border-[#dedfd7] bg-[#fbfaf6] pl-3.5 pr-9 text-[13px] font-semibold text-[#304b37] outline-none transition focus:border-[#527358] focus:ring-2 focus:ring-[#527358]/20 sm:text-sm"
                >
                  {sortOptions.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-[#68786b]" aria-hidden="true" />
              </label>

              <button
                type="button"
                onClick={() => setAskOpen(true)}
                className="hidden h-11 shrink-0 items-center justify-center gap-2 rounded-full bg-[#1A3325] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#294735] lg:inline-flex"
              >
                <MessageSquarePlus className="size-4" aria-hidden="true" />
                Ask a Question
              </button>
            </div>
          </div>

          {/* Topic Filter Pills: symmetrical 2-col grid on mobile, inline flex-wrap on sm+ */}
          <div className="mt-3.5 border-t border-[#f0f2ec] pt-3.5">
            <div className="mb-2.5 flex items-center justify-between gap-2">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#536258]">
                <SlidersHorizontal className="size-3.5 text-[#527358]" aria-hidden="true" />
                Topics
                <span className="font-normal text-[#778078] tabular-nums" aria-live="polite">
                  ({filteredQuestions.length})
                </span>
              </span>
              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={resetFilters}
                  className="text-xs font-semibold text-[#a65f2b] hover:underline"
                >
                  Reset filters
                </button>
              )}
            </div>

            <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap" role="group" aria-label="Filter by topic">
              <button
                type="button"
                aria-pressed={activeTopic === 'all'}
                onClick={() => setActiveTopic('all')}
                className={`min-h-10 w-full rounded-xl border px-3 text-center text-xs font-semibold transition-colors sm:w-auto sm:rounded-full sm:px-4 sm:text-sm ${
                  activeTopic === 'all'
                    ? 'border-[#1A3325] bg-[#1A3325] text-white shadow-xs'
                    : 'border-[#dedfd7] bg-[#fbfaf6] text-[#536258] hover:border-[#527358] hover:bg-[#f1f3ed]'
                }`}
              >
                All Discussions
              </button>
              {communityTopics.map((topic) => {
                const isActive = activeTopic === topic.id
                return (
                  <button
                    key={topic.id}
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => setActiveTopic(topic.id)}
                    className={`min-h-10 w-full rounded-xl border px-3 text-center text-xs font-semibold transition-colors sm:w-auto sm:rounded-full sm:px-4 sm:text-sm ${
                      isActive
                        ? 'border-[#1A3325] bg-[#1A3325] text-white shadow-xs'
                        : 'border-[#dedfd7] bg-[#fbfaf6] text-[#536258] hover:border-[#527358] hover:bg-[#f1f3ed]'
                    }`}
                  >
                    <span className="sm:hidden">{topic.shortLabel}</span>
                    <span className="hidden sm:inline">{topic.label}</span>
                  </button>
                )
              })}
            </div>
          </div>
        </section>

        {/* Main 2-Column Layout: Feed (Left) + Grower Experts Sidebar (Right) */}
        <div className="mt-6 grid grid-cols-1 gap-6 sm:mt-8 lg:grid-cols-[minmax(0,1fr)_21rem] lg:items-start lg:gap-8">
          {/* Question Cards Feed */}
          <section aria-label="Plant care discussions" className="min-w-0 space-y-4">
            {filteredQuestions.length > 0 ? (
              filteredQuestions.map((question) => {
                const topic = getTopicById(question.topicId)
                const isUpvoted = upvotedIds.includes(question.id)
                const voteCount = question.upvotes + (isUpvoted ? 1 : 0)
                const nurseryReplies = question.answers.filter((a) => a.isOfficialNursery).length
                const answerCount = question.answers.length

                return (
                  <article
                    key={question.id}
                    className="group relative flex min-w-0 flex-col rounded-2xl border border-[#e5e8df] bg-white p-4 shadow-[0_10px_30px_-24px_rgba(26,51,37,0.3)] transition-colors hover:border-[#c8d5c5] sm:flex-row sm:gap-5 sm:rounded-3xl sm:p-6"
                  >
                    {/* Desktop Left Upvote Column (Reddit / StackOverflow style) */}
                    <div className="hidden shrink-0 flex-col items-center sm:flex">
                      <button
                        type="button"
                        onClick={() => handleToggleUpvote(question.id)}
                        aria-pressed={isUpvoted}
                        aria-label={`Upvote question: ${question.title}`}
                        className={`flex w-13 flex-col items-center justify-center gap-0.5 rounded-2xl border py-2.5 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1A3325] ${
                          isUpvoted
                            ? 'border-[#1A3325] bg-[#1A3325] text-white'
                            : 'border-[#e5e8df] bg-[#fbfaf6] text-[#304b37] hover:border-[#527358] hover:bg-[#edf1e9]'
                        }`}
                      >
                        <ArrowUp className="size-4" aria-hidden="true" />
                        <span className="text-xs font-bold tabular-nums">{voteCount}</span>
                      </button>
                    </div>

                    {/* Question Main Content */}
                    <div className="flex min-w-0 flex-1 flex-col">
                      {/* Meta Row: Topic Tag + Author + Time */}
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs">
                        <span className="inline-flex items-center rounded-full bg-[#edf1e9] px-2.5 py-0.5 text-[11px] font-semibold text-[#2d5336]">
                          {topic.label}
                        </span>
                        {question.plantName && (
                          <span className="text-[11px] font-medium text-[#a65f2b]">
                            {question.plantName}
                          </span>
                        )}
                      </div>

                      {/* Title + Excerpt + Optional Photo Thumbnail */}
                      <Link
                        href={`/community/${question.slug}`}
                        className="mt-2.5 flex items-start justify-between gap-3.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1A3325] sm:gap-5"
                      >
                        <div className="min-w-0 flex-1">
                          <h2 className="font-serif text-[17px] font-semibold leading-snug text-[#1A3325] transition-colors group-hover:text-[#446a4d] sm:text-xl">
                            {question.title}
                          </h2>
                          <p className="mt-1.5 line-clamp-2 text-[13.5px] leading-6 text-[#58655b] sm:text-sm">
                            {question.body}
                          </p>
                        </div>

                        {question.photo && (
                          <span className="relative size-18 shrink-0 overflow-hidden rounded-xl border border-[#e5e8df] bg-[#edf1e9] sm:size-24 sm:rounded-2xl">
                            <Image
                              src={question.photo}
                              alt={question.plantName}
                              fill
                              unoptimized={question.photo.startsWith('data:')}
                              sizes="(max-width: 640px) 72px, 96px"
                              className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                          </span>
                        )}
                      </Link>

                      {/* Author attribution row */}
                      <div className="mt-3 flex items-center gap-2 text-xs text-[#778078]">
                        <span
                          aria-hidden="true"
                          className="inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-[#edf1e9] font-serif text-[10px] font-bold text-[#1A3325]"
                        >
                          {getInitials(question.authorName)}
                        </span>
                        <p className="truncate">
                          Posted by <span className="font-semibold text-[#304b37]">{question.authorName}</span>
                          {question.authorCity ? ` · ${question.authorCity}` : ''} · {question.timeAgo}
                        </p>
                      </div>

                      {/* Footer Stats + Mobile Upvote Control */}
                      <div className="mt-3.5 flex flex-wrap items-center justify-between gap-2 border-t border-[#f0f2ec] pt-3">
                        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                          {/* Mobile Upvote Button */}
                          <button
                            type="button"
                            onClick={() => handleToggleUpvote(question.id)}
                            aria-pressed={isUpvoted}
                            aria-label={`Upvote question: ${question.title}`}
                            className={`inline-flex min-h-9 items-center gap-1 rounded-full border px-3 text-xs font-bold tabular-nums transition-colors sm:hidden ${
                              isUpvoted
                                ? 'border-[#1A3325] bg-[#1A3325] text-white'
                                : 'border-[#dfe3da] bg-[#fbfaf6] text-[#304b37]'
                            }`}
                          >
                            <ArrowUp className="size-3.5" aria-hidden="true" />
                            {voteCount}
                          </button>

                          <Link
                            href={`/community/${question.slug}#answers`}
                            className="inline-flex min-h-9 items-center gap-1.5 rounded-full bg-[#f7f7f3] px-3 text-xs font-semibold text-[#4c5b50] transition-colors hover:bg-[#edf1e9] hover:text-[#1A3325]"
                          >
                            <MessageCircle className="size-3.5 text-[#527358]" aria-hidden="true" />
                            <span className="tabular-nums">
                              {answerCount} {answerCount === 1 ? 'answer' : 'answers'}
                            </span>
                          </Link>

                          {nurseryReplies > 0 && (
                            <span className="inline-flex min-h-9 items-center gap-1.5 rounded-full border border-[#d6e4d2] bg-[#f1f6ef] px-3 text-xs font-semibold text-[#2d5838]">
                              <Sprout className="size-3.5 shrink-0 text-[#3e6d49]" aria-hidden="true" />
                              <span className="tabular-nums">
                                {nurseryReplies} Verified Nursery {nurseryReplies === 1 ? 'reply' : 'replies'}
                              </span>
                            </span>
                          )}
                        </div>

                        <Link
                          href={`/community/${question.slug}`}
                          className="hidden items-center gap-1 text-xs font-semibold text-[#527358] transition-colors hover:text-[#1A3325] sm:inline-flex"
                        >
                          Open thread <ArrowRight className="size-3.5" aria-hidden="true" />
                        </Link>
                      </div>
                    </div>
                  </article>
                )
              })
            ) : (
              <div className="flex flex-col items-center rounded-2xl border border-dashed border-[#cbd5c9] bg-white px-5 py-12 text-center sm:rounded-3xl sm:px-6 sm:py-14">
                <span className="flex size-12 items-center justify-center rounded-full bg-[#edf1e9] text-[#527358]">
                  <MessageCircle className="size-5" aria-hidden="true" />
                </span>
                <h2 className="mt-4 font-serif text-xl font-semibold text-[#1A3325] sm:text-2xl">
                  No discussions found
                </h2>
                <p className="mt-2 max-w-sm text-sm leading-6 text-[#68786b]">
                  Try another search keyword, clear your topic filter, or start a new question for our nursery specialists.
                </p>
                <div className="mt-5 flex flex-wrap items-center justify-center gap-2.5">
                  <button
                    type="button"
                    onClick={resetFilters}
                    className="inline-flex min-h-11 items-center justify-center rounded-full border border-[#dfe3da] bg-white px-5 text-sm font-semibold text-[#304b37] hover:bg-[#f4f6f1]"
                  >
                    Clear filters
                  </button>
                  <button
                    type="button"
                    onClick={() => setAskOpen(true)}
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#1A3325] px-5 text-sm font-semibold text-white hover:bg-[#294735]"
                  >
                    <MessageSquarePlus className="size-4" aria-hidden="true" />
                    Ask this question
                  </button>
                </div>
              </div>
            )}
          </section>

          {/* Right Sidebar: Verified Nursery Specialists + Clinic Tips */}
          <aside className="flex flex-col gap-5 lg:sticky lg:top-24">
            <div className="rounded-2xl border border-[#e5e8df] bg-white p-5 shadow-[0_10px_30px_-24px_rgba(26,51,37,0.3)] sm:rounded-3xl sm:p-6">
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#a65f2b]">
                Clinic Specialists
              </p>
              <h2 className="mt-1 font-serif text-xl font-semibold text-[#1A3325]">
                Verified Grower Partners
              </h2>
              <p className="mt-1.5 text-xs leading-5 text-[#68786b]">
                Official answers pinned on clinic threads come straight from our Bengal rooftop nurseries.
              </p>

              <ul className="mt-4 divide-y divide-[#f0f2ec]">
                {nurseries.map((nursery) => (
                  <li key={nursery.id} className="py-3 first:pt-0 last:pb-0">
                    <Link
                      href={`/nurseries/${nursery.slug}`}
                      className="group flex items-center gap-3"
                    >
                      <span className="relative size-10 shrink-0 overflow-hidden rounded-full border border-[#e5e8df] bg-[#edf1e9]">
                        <Image
                          src={nursery.avatar}
                          alt={nursery.name}
                          fill
                          sizes="40px"
                          className="object-cover"
                        />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="flex items-center gap-1 text-sm font-semibold text-[#1A3325] group-hover:text-[#446a4d]">
                          <span className="truncate">{nursery.name}</span>
                          <BadgeCheck className="size-3.5 shrink-0 text-[#3e6d49]" aria-hidden="true" />
                        </span>
                        <span className="mt-0.5 block truncate text-xs text-[#778078]">
                          {nursery.specialty}
                        </span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-[#dce6d8] bg-[#f1f5ee] p-5 sm:rounded-3xl sm:p-6">
              <div className="flex items-center gap-2 text-[#1A3325]">
                <Sparkles className="size-4 text-[#a65f2b]" aria-hidden="true" />
                <h2 className="font-serif text-lg font-semibold">Tips for faster diagnosis</h2>
              </div>
              <ul className="mt-3 flex flex-col gap-2.5 text-xs leading-5 text-[#4d6152] sm:text-sm sm:leading-6">
                <li className="flex items-start gap-2">
                  <BadgeCheck className="mt-0.5 size-4 shrink-0 text-[#426b4b]" aria-hidden="true" />
                  Share a close-up photo of both the affected leaf and the soil surface.
                </li>
                <li className="flex items-start gap-2">
                  <BadgeCheck className="mt-0.5 size-4 shrink-0 text-[#426b4b]" aria-hidden="true" />
                  Mention your city, window direction, and how often you water.
                </li>
                <li className="flex items-start gap-2">
                  <BadgeCheck className="mt-0.5 size-4 shrink-0 text-[#426b4b]" aria-hidden="true" />
                  Upvote helpful answers so other plant parents spot solutions faster.
                </li>
              </ul>

              <button
                type="button"
                onClick={() => setAskOpen(true)}
                className="mt-4 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-[#1A3325] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#294735]"
              >
                <MessageSquarePlus className="size-4" aria-hidden="true" />
                Start a discussion
              </button>
            </div>
          </aside>
        </div>
      </div>

      {/* Ask a Question Modal */}
      <AskQuestionModal
        open={askOpen}
        onOpenChange={setAskOpen}
        onSubmitQuestion={handleAddQuestion}
        defaultTopic={activeTopic === 'all' ? 'yellow-leaves' : activeTopic}
      />

      {/* Instant Toast Notification */}
      {toast && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-4 left-4 right-4 z-50 mx-auto flex max-w-md items-center justify-between gap-3 rounded-2xl border border-[#2c4d3a] bg-[#0F291E] px-4 py-3 text-white shadow-2xl sm:left-auto sm:right-6 sm:bottom-6"
        >
          <div className="flex min-w-0 items-center gap-2.5">
            <BadgeCheck className="size-5 shrink-0 text-[#E5A849]" aria-hidden="true" />
            <p className="text-xs font-medium leading-5 sm:text-sm">{toast.message}</p>
          </div>
          {toast.slug && (
            <Link
              href={`/community/${toast.slug}`}
              className="shrink-0 rounded-full bg-[#E5A849] px-3 py-1.5 text-xs font-semibold text-[#1A3325] hover:bg-[#efbc69]"
            >
              View
            </Link>
          )}
        </div>
      )}
    </main>
  )
}
