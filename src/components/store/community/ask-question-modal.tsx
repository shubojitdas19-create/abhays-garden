'use client'

import { useState, type ChangeEvent, type DragEvent, type FormEvent } from 'react'
import Image from 'next/image'
import { ChevronDown, ImagePlus, Send, X } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { products } from '@/components/store/products'
import {
  communityTopics,
  slugifyQuestion,
  type CommunityQuestion,
  type TopicId,
} from '@/lib/store/community-data'

const inputClassName =
  'mt-1.5 h-11 w-full rounded-xl border border-[#dfe3da] bg-[#fbfaf6] px-3.5 text-base text-[#1A3325] outline-none transition placeholder:text-[#98a197] focus:border-[#527358] focus:bg-white focus:ring-2 focus:ring-[#527358]/15 sm:text-sm'

const labelClassName = 'block text-xs font-semibold text-[#304b37]'

async function compressImage(file: File): Promise<string> {
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

type AskQuestionModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmitQuestion: (question: CommunityQuestion) => void
  defaultTopic?: Exclude<TopicId, 'all'>
}

export function AskQuestionModal({
  open,
  onOpenChange,
  onSubmitQuestion,
  defaultTopic = 'yellow-leaves',
}: AskQuestionModalProps) {
  const [title, setTitle] = useState('')
  const [plantName, setPlantName] = useState('')
  const [topicId, setTopicId] = useState<Exclude<TopicId, 'all'>>(defaultTopic)
  const [body, setBody] = useState('')
  const [authorName, setAuthorName] = useState('')
  const [authorCity, setAuthorCity] = useState('')
  const [photo, setPhoto] = useState<string | undefined>(undefined)
  const [error, setError] = useState('')

  function resetForm() {
    setTitle('')
    setPlantName('')
    setTopicId(defaultTopic)
    setBody('')
    setPhoto(undefined)
    setError('')
  }

  async function processFile(file: File | undefined) {
    if (!file) return
    const allowed = ['image/jpeg', 'image/png', 'image/webp']
    if (!allowed.includes(file.type)) {
      setError('Please upload a JPG, PNG, or WebP photo.')
      return
    }
    setError('')
    try {
      const dataUrl = await compressImage(file)
      setPhoto(dataUrl)
    } catch {
      setError('Could not load that image. Please try another photo.')
    }
  }

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    void processFile(event.currentTarget.files?.[0])
    event.currentTarget.value = ''
  }

  function handleDrop(event: DragEvent<HTMLLabelElement>) {
    event.preventDefault()
    void processFile(event.dataTransfer.files?.[0])
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const cleanTitle = title.trim()
    const cleanBody = body.trim()
    const cleanName = authorName.trim()
    const cleanCity = authorCity.trim() || 'India'
    const cleanPlant = plantName.trim() || 'Houseplant'

    if (cleanTitle.length < 8) {
      setError('Please write a clear question title (at least 8 characters).')
      return
    }
    if (cleanBody.length < 15) {
      setError('Add a bit more detail about your plant’s light, watering, or symptoms.')
      return
    }
    if (!cleanName) {
      setError('Please enter your name so growers know who to address.')
      return
    }

    const matchedProduct = products.find(
      (p) =>
        cleanPlant.toLowerCase().includes(p.name.toLowerCase()) ||
        p.name.toLowerCase().includes(cleanPlant.toLowerCase()),
    )

    const now = new Date()
    const newQuestion: CommunityQuestion = {
      id: `q-user-${Date.now()}`,
      slug: slugifyQuestion(cleanTitle),
      title: cleanTitle,
      body: cleanBody,
      plantName: cleanPlant,
      topicId,
      authorName: cleanName,
      authorCity: cleanCity,
      timeAgo: 'Just now',
      isoDate: now.toISOString(),
      upvotes: 1,
      photo,
      relatedProductSlug: matchedProduct?.slug,
      answers: [],
    }

    onSubmitQuestion(newQuestion)
    resetForm()
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="flex max-h-[92dvh] w-[calc(100%-1.5rem)] max-w-xl flex-col gap-0 overflow-hidden rounded-2xl border border-[#e5e8df] bg-white p-0 text-[#1A3325] shadow-2xl sm:max-w-xl sm:rounded-3xl"
      >
        {/* Sticky Modal Header */}
        <div className="flex items-start justify-between gap-3 border-b border-[#eceee8] bg-[#fbfaf6] px-4 py-4 sm:px-6 sm:py-5">
          <DialogHeader className="min-w-0 text-left">
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#a65f2b]">
              Plant Care Clinic
            </p>
            <DialogTitle className="mt-0.5 font-serif text-xl font-semibold text-[#1A3325] sm:text-2xl">
              Ask the Community
            </DialogTitle>
            <DialogDescription className="mt-1 text-xs leading-5 text-[#68786b] sm:text-sm">
              Share your plant symptoms or care question to get tips from fellow growers and verified nurseries.
            </DialogDescription>
          </DialogHeader>
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            aria-label="Close ask question modal"
            className="inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-[#e5e8df] bg-white text-[#536258] transition-colors hover:bg-[#edf1e9] hover:text-[#1A3325]"
          >
            <X className="size-4" aria-hidden="true" />
          </button>
        </div>

        {/* Scrollable Form Content */}
        <form onSubmit={handleSubmit} noValidate className="flex min-h-0 flex-1 flex-col">
          <div className="flex-1 space-y-4 overflow-y-auto px-4 py-4 sm:px-6 sm:py-5">
            {error && (
              <p
                role="alert"
                className="rounded-xl border border-[#ead9c8] bg-[#fffaf3] px-3.5 py-2.5 text-xs font-medium text-[#8a452e] sm:text-sm"
              >
                {error}
              </p>
            )}

            {/* Question Title */}
            <div>
              <label htmlFor="ask-title" className={labelClassName}>
                Question title <span className="text-[#a65f2b]">*</span>
              </label>
              <input
                id="ask-title"
                type="text"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                maxLength={120}
                placeholder="e.g. Why are my Monstera leaf edges turning brown?"
                required
                className={inputClassName}
              />
            </div>

            {/* Plant Name & Topic Row */}
            <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
              <div className="min-w-0">
                <label htmlFor="ask-plant" className={labelClassName}>
                  Plant name / species{' '}
                  <span className="font-normal text-[#778078]">(optional)</span>
                </label>
                <input
                  id="ask-plant"
                  type="text"
                  value={plantName}
                  onChange={(event) => setPlantName(event.target.value)}
                  maxLength={60}
                  placeholder="e.g. Golden Pothos, Peace Lily"
                  className={inputClassName}
                />
              </div>

              <div className="min-w-0">
                <label htmlFor="ask-topic" className={labelClassName}>
                  Topic category <span className="text-[#a65f2b]">*</span>
                </label>
                <div className="relative mt-1.5">
                  <select
                    id="ask-topic"
                    value={topicId}
                    onChange={(event) => setTopicId(event.target.value as Exclude<TopicId, 'all'>)}
                    className={`${inputClassName} mt-0 appearance-none truncate pr-9`}
                  >
                    {communityTopics.map((topic) => (
                      <option key={topic.id} value={topic.id}>
                        {topic.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-[#68786b]"
                    aria-hidden="true"
                  />
                </div>
              </div>
            </div>

            {/* Detailed Problem Description */}
            <div>
              <label htmlFor="ask-body" className={labelClassName}>
                Describe what&apos;s happening <span className="text-[#a65f2b]">*</span>
              </label>
              <textarea
                id="ask-body"
                value={body}
                onChange={(event) => setBody(event.target.value)}
                rows={4}
                maxLength={800}
                placeholder="Mention how often you water, window light direction, pot type, and when the issue started..."
                required
                className="mt-1.5 min-h-28 w-full resize-y rounded-xl border border-[#dfe3da] bg-[#fbfaf6] px-3.5 py-2.5 text-base text-[#1A3325] outline-none transition placeholder:text-[#98a197] focus:border-[#527358] focus:bg-white focus:ring-2 focus:ring-[#527358]/15 sm:text-sm"
              />
              <p className="mt-1 text-right text-[11px] text-[#778078] tabular-nums">
                {body.length}/800
              </p>
            </div>

            {/* Optional Photo Upload */}
            <div>
              <span className={labelClassName}>
                Attach plant photo{' '}
                <span className="font-normal text-[#778078]">(optional, helps diagnosis)</span>
              </span>
              {photo ? (
                <div className="mt-2 flex items-center gap-3 rounded-xl border border-[#e3e8df] bg-[#fbfaf6] p-2.5">
                  <div className="relative size-16 shrink-0 overflow-hidden rounded-lg bg-[#edf1e9]">
                    <Image src={photo} alt="Attached plant preview" fill unoptimized sizes="64px" className="object-cover" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold text-[#1A3325]">Photo attached</p>
                    <p className="mt-0.5 text-[11px] text-[#68786b]">Growers can inspect it in full size</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setPhoto(undefined)}
                    aria-label="Remove attached photo"
                    className="inline-flex size-8 shrink-0 items-center justify-center rounded-full text-[#68786b] hover:bg-[#e8ede5] hover:text-[#1A3325]"
                  >
                    <X className="size-4" aria-hidden="true" />
                  </button>
                </div>
              ) : (
                <label
                  htmlFor="ask-photo"
                  onDragOver={(event) => event.preventDefault()}
                  onDrop={handleDrop}
                  className="mt-1.5 flex cursor-pointer items-center justify-center gap-2.5 rounded-xl border border-dashed border-[#bfcbbd] bg-[#fbfaf6] px-4 py-3.5 text-center transition-colors hover:border-[#527358] hover:bg-[#f4f6f1]"
                >
                  <ImagePlus className="size-4 shrink-0 text-[#527358]" aria-hidden="true" />
                  <span className="text-xs font-semibold text-[#304b37] sm:text-sm">
                    Tap to upload or drop a leaf photo
                  </span>
                  <input
                    id="ask-photo"
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={handleFileChange}
                    className="sr-only"
                  />
                </label>
              )}
            </div>

            {/* Name & City */}
            <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
              <div className="min-w-0">
                <label htmlFor="ask-author" className={labelClassName}>
                  Your name <span className="text-[#a65f2b]">*</span>
                </label>
                <input
                  id="ask-author"
                  type="text"
                  autoComplete="name"
                  value={authorName}
                  onChange={(event) => setAuthorName(event.target.value)}
                  placeholder="e.g. Rohan D."
                  required
                  className={inputClassName}
                />
              </div>

              <div className="min-w-0">
                <label htmlFor="ask-city" className={labelClassName}>
                  City <span className="font-normal text-[#778078]">(optional)</span>
                </label>
                <input
                  id="ask-city"
                  type="text"
                  autoComplete="address-level2"
                  value={authorCity}
                  onChange={(event) => setAuthorCity(event.target.value)}
                  placeholder="e.g. Kolkata"
                  className={inputClassName}
                />
              </div>
            </div>
          </div>

          {/* Sticky Modal Footer */}
          <div className="flex flex-col-reverse gap-2 border-t border-[#eceee8] bg-[#fbfaf6] px-4 py-3.5 sm:flex-row sm:items-center sm:justify-end sm:gap-3 sm:px-6 sm:py-4">
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="inline-flex min-h-11 w-full items-center justify-center rounded-full border border-[#dfe3da] bg-white px-5 text-sm font-semibold text-[#536258] transition-colors hover:bg-[#f2f4ef] sm:w-auto"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-[#1A3325] px-6 text-sm font-semibold text-white shadow-xs transition-colors hover:bg-[#294735] sm:w-auto"
            >
              <Send className="size-3.5" aria-hidden="true" />
              Post Question
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
