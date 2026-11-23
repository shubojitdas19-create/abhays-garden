'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Check, Copy, Share2 } from 'lucide-react'
import type { Nursery } from '@/components/store/products'

export function NurseryBannerActions({ nursery }: { nursery: Nursery }) {
  const [notice, setNotice] = useState('')

  async function shareNursery() {
    const url = window.location.href
    if (typeof navigator.share === 'function') {
      try {
        await navigator.share({ title: `${nursery.name} — Abhay’s Roof Garden`, text: nursery.tagline, url })
        setNotice('Thanks for sharing this nursery.')
        return
      } catch (error) {
        if (error instanceof Error && error.name === 'AbortError') return
      }
    }

    try {
      await navigator.clipboard.writeText(url)
      setNotice('Nursery link copied.')
    } catch {
      setNotice('Copy this nursery link from your browser address bar.')
    }
    window.setTimeout(() => setNotice(''), 3000)
  }

  return (
    <>
      <div className="absolute bottom-4 left-4 z-10 flex max-w-[calc(100%-2rem)] items-center gap-2 rounded-full border border-white/30 bg-[#fbfaf6]/95 py-1.5 pl-1.5 pr-3 text-[#1A3325] shadow-lg backdrop-blur sm:bottom-6 sm:left-6">
        <span className="relative size-10 shrink-0 overflow-hidden rounded-full border border-[#e5e1d7] bg-white sm:size-12">
          <Image src={nursery.avatar} alt={`${nursery.name} logo`} fill sizes="48px" className="object-cover" />
        </span>
        <span className="max-w-[10rem] truncate text-xs font-semibold sm:max-w-none sm:text-sm">Local nursery</span>
      </div>
      <button type="button" onClick={shareNursery} className="absolute right-4 top-4 z-10 inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-white/30 bg-[#fbfaf6]/95 px-4 text-sm font-semibold text-[#1A3325] shadow-lg backdrop-blur transition-colors hover:bg-white sm:right-6 sm:top-6" aria-label={`Share ${nursery.name}`}>
        <Share2 className="size-4" aria-hidden="true" /><span className="hidden sm:inline">Share nursery</span><span className="sm:hidden">Share</span>
      </button>
      {notice && <p role="status" className="absolute right-4 top-[4.25rem] z-10 inline-flex max-w-[calc(100%-2rem)] items-center gap-2 rounded-xl bg-[#fbfaf6] px-3 py-2 text-xs font-medium text-[#1A3325] shadow-lg sm:right-6 sm:top-[5rem]">{notice.includes('copied') ? <Check className="size-3.5" aria-hidden="true" /> : <Copy className="size-3.5" aria-hidden="true" />}{notice}</p>}
    </>
  )
}
