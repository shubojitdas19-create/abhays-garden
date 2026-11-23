'use client'

import { useState } from 'react'
import { Check, ChevronDown, Tag, X } from 'lucide-react'
import { useCart } from '@/components/store/cart-context'

export function CartPromoCode({ inputId }: { inputId: string }) {
  const { couponCode, applyCouponCode, clearCouponCode } = useCart()
  const [isOpen, setIsOpen] = useState(false)
  const [code, setCode] = useState('')
  const [message, setMessage] = useState('')
  const isApplied = Boolean(couponCode)

  function applyCode() {
    const applied = applyCouponCode(code)
    setMessage(applied ? `${couponCode ? 'Coupon updated' : 'Coupon applied'}: ${code.trim().toUpperCase()}` : 'That code isn’t valid. Try ROOFTOP10 or FIRSTPLANT.')
    if (applied) setCode('')
  }

  return (
    <section className="rounded-2xl border border-[#e7e4dc] bg-[#fbfaf6] p-4" aria-label="Promo code">
      {isApplied ? (
        <div className="flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-2 text-sm font-semibold text-[#315a38]">
            <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-[#e8f0e5]"><Check className="size-4" aria-hidden="true" /></span>
            <span className="truncate">{couponCode} applied</span>
          </div>
          <button type="button" onClick={() => { clearCouponCode(); setMessage('Coupon removed.') }} className="inline-flex size-9 shrink-0 items-center justify-center rounded-full text-[#68786b] hover:bg-white" aria-label="Remove coupon">
            <X className="size-4" aria-hidden="true" />
          </button>
        </div>
      ) : (
        <>
          <button type="button" onClick={() => setIsOpen((open) => !open)} aria-expanded={isOpen} className="flex min-h-9 w-full items-center justify-between gap-3 text-left text-sm font-semibold text-[#1A3325]">
            <span className="flex items-center gap-2"><Tag className="size-4 text-[#527358]" aria-hidden="true" /> Have a promo code?</span>
            <ChevronDown className={`size-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
          </button>
          {isOpen && (
            <div className="mt-3 flex gap-2">
              <label className="sr-only" htmlFor={inputId}>Promo code</label>
              <input id={inputId} value={code} onChange={(event) => setCode(event.target.value)} onKeyDown={(event) => { if (event.key === 'Enter') { if (event.nativeEvent.isComposing || event.keyCode === 229) return; event.preventDefault(); applyCode() } }} placeholder="Enter code" autoComplete="off" className="h-11 min-w-0 flex-1 rounded-xl border border-[#deded4] bg-white px-3 text-sm uppercase text-[#1A3325] outline-none placeholder:normal-case placeholder:text-[#8a958b] focus:border-[#527358] focus:ring-2 focus:ring-[#527358]/15" />
              <button type="button" onClick={applyCode} className="min-h-11 rounded-xl bg-[#1A3325] px-4 text-sm font-semibold text-white transition-colors hover:bg-[#294735] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1A3325]">Apply</button>
            </div>
          )}
          <p className="mt-2 text-[11px] text-[#68786b]">Try ROOFTOP10 for 10% off or FIRSTPLANT for ₹100 off.</p>
        </>
      )}
      {message && <p className={`mt-2 text-xs ${message.startsWith('That code') ? 'text-[#9b4938]' : 'text-[#315a38]'}`} role="status" aria-live="polite">{message}</p>}
    </section>
  )
}
