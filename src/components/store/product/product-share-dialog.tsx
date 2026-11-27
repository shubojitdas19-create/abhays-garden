'use client'

import { useEffect, useRef, useState } from 'react'
import { Check, Copy, Mail, MessageCircle, X } from 'lucide-react'
import { showStoreToast } from '@/components/store/cart-context'
import type { Product } from '@/components/store/products'

type ProductShareDialogProps = {
  product: Product
  open: boolean
  onOpenChange: (open: boolean) => void
  url: string
}

export function ProductShareDialog({ product, open, onOpenChange, url }: ProductShareDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [feedback, setFeedback] = useState('')
  const shareMessage = `Check out ${product.name} at Abhay's Roof Garden: ${url}`
  const encodedUrl = encodeURIComponent(url)
  const encodedMessage = encodeURIComponent(shareMessage)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  useEffect(() => {
    if (open) setFeedback('')
  }, [open])

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url)
      setFeedback('Plant link copied to clipboard!')
      showStoreToast({ kind: 'copy', title: 'Plant link copied to clipboard', description: product.name })
    } catch {
      setFeedback('Copy was unavailable. Select the link above to copy it.')
    }
  }

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="product-share-title"
      onCancel={() => onOpenChange(false)}
      onClose={() => onOpenChange(false)}
      onClick={(event) => {
        if (event.target === event.currentTarget) onOpenChange(false)
      }}
      className="m-auto max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-lg overflow-y-auto rounded-[1.5rem] border border-[#e5e3d9] bg-[#F9F8F6] p-0 text-[#1A3325] shadow-2xl backdrop:bg-[#102018]/45 open:animate-in open:fade-in open:zoom-in-95 open:duration-200"
    >
      <div className="p-5 sm:p-7">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#a65f2b]">A little green goes a long way</p>
            <h2 id="product-share-title" className="mt-2 font-serif text-2xl font-semibold leading-tight">Share this homegrown plant</h2>
            <p className="mt-1 text-sm text-[#68786b]">Send {product.name} to someone who&apos;ll love it.</p>
          </div>
          <button
            type="button"
            autoFocus
            onClick={() => dialogRef.current?.close()}
            aria-label="Close share dialog"
            className="inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-[#dedfd5] text-[#1A3325] transition-colors hover:bg-[#f1f4ee]"
          >
            <X aria-hidden="true" />
          </button>
        </div>

        <div className="mt-6">
          <label htmlFor="product-share-link" className="mb-2 block text-sm font-semibold">Copy plant link</label>
          <div className="flex gap-2">
            <input
              id="product-share-link"
              readOnly
              value={url}
              onFocus={(event) => event.currentTarget.select()}
              className="min-w-0 flex-1 rounded-xl border border-[#dedfd5] bg-white px-3 py-2.5 text-sm text-[#58655b] outline-none focus-visible:ring-2 focus-visible:ring-[#527358]"
            />
            <button
              type="button"
              onClick={copyLink}
              className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-[#1A3325] px-4 text-sm font-semibold text-white transition-colors hover:bg-[#294735]"
            >
              <Copy className="size-4" aria-hidden="true" /> Copy
            </button>
          </div>
        </div>

        <a
          href={`https://wa.me/?text=${encodeURIComponent(shareMessage)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#16834b] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#126e3f]"
        >
          <MessageCircle className="size-4" aria-hidden="true" /> Share via WhatsApp
        </a>

        <div className="mt-3 grid grid-cols-2 gap-2">
          <a href={`https://twitter.com/intent/tweet?text=${encodedMessage}&url=${encodedUrl}`} target="_blank" rel="noopener noreferrer" aria-label="Share on X" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-[#dedfd5] bg-white px-3 text-sm font-semibold transition-colors hover:bg-[#f1f4ee]">
            <span aria-hidden="true" className="font-semibold">𝕏</span> Share on X
          </a>
          <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`} target="_blank" rel="noopener noreferrer" aria-label="Share on Facebook" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-[#dedfd5] bg-white px-3 text-sm font-semibold transition-colors hover:bg-[#f1f4ee]">
            <span aria-hidden="true" className="inline-flex size-5 items-center justify-center rounded-full bg-[#1877f2] font-semibold text-white">f</span> Facebook
          </a>
          <a href={`https://pinterest.com/pin/create/button/?url=${encodedUrl}&description=${encodedMessage}`} target="_blank" rel="noopener noreferrer" aria-label="Share on Pinterest" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-[#dedfd5] bg-white px-3 text-sm font-semibold transition-colors hover:bg-[#f1f4ee]">
            <span aria-hidden="true" className="inline-flex size-5 items-center justify-center rounded-full bg-[#bd081c] font-serif font-semibold text-white">P</span> Pinterest
          </a>
          <a href={`mailto:?subject=${encodeURIComponent(`${product.name} from Abhay's Roof Garden`)}&body=${encodedMessage}`} aria-label="Share by email" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-[#dedfd5] bg-white px-3 text-sm font-semibold transition-colors hover:bg-[#f1f4ee]">
            <Mail className="size-4" aria-hidden="true" /> Email
          </a>
        </div>

        <p aria-live="polite" role="status" className="min-h-5 pt-3 text-center text-sm font-medium text-[#527358]">
          {feedback && <span className="inline-flex items-center gap-1.5 animate-in fade-in slide-in-from-bottom-1 duration-300"><Check className="size-4" aria-hidden="true" />{feedback}</span>}
        </p>
      </div>
    </dialog>
  )
}
