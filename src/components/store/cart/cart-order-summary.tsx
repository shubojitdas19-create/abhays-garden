'use client'

import Link from 'next/link'
import { LockKeyhole } from 'lucide-react'
import { useCart } from '@/components/store/cart-context'
import { CartPromoCode } from '@/components/store/cart/cart-promo-code'

const formatPrice = (value: number) => `₹${value.toLocaleString('en-IN')}`

export function CartOrderSummary({ compact = false }: { compact?: boolean }) {
  const { subtotalPrice, shippingFee, discountAmount, couponCode } = useCart()
  const total = Math.max(0, subtotalPrice - discountAmount) + shippingFee
  const headingId = compact ? 'drawer-order-summary-title' : 'order-summary-title'

  return (
    <section className={`rounded-2xl border border-[#e7e4dc] bg-white p-5 sm:p-6 ${compact ? '' : 'shadow-[0_16px_48px_-36px_rgba(26,51,37,0.45)]'}`} aria-labelledby={headingId}>
      <h2 id={headingId} className="font-serif text-xl font-semibold text-[#1A3325]">Order summary</h2>
      <div className="mt-4"><CartPromoCode inputId={compact ? 'drawer-promo-code' : 'cart-promo-code'} /></div>
      <dl className="mt-5 flex flex-col gap-3 text-sm">
        <div className="flex justify-between gap-3 text-[#5c6b60]"><dt>Subtotal</dt><dd className="font-medium text-[#1A3325]">{formatPrice(subtotalPrice)}</dd></div>
        {discountAmount > 0 && <div className="flex justify-between gap-3 text-[#315a38]"><dt>Discount <span className="text-xs">({couponCode})</span></dt><dd className="font-semibold">−{formatPrice(discountAmount)}</dd></div>}
        <div className="flex justify-between gap-3 text-[#5c6b60]"><dt>Nursery safe-transit packaging</dt><dd className="font-semibold text-[#527358]">Free</dd></div>
        <div className="flex justify-between gap-3 text-[#5c6b60]"><dt>Estimated delivery</dt><dd className="font-medium text-[#1A3325]">{shippingFee === 0 ? 'Free' : formatPrice(shippingFee)}</dd></div>
      </dl>
      <div className="mt-4 flex justify-between gap-3 border-t border-[#e7e4dc] pt-4 text-base font-bold text-[#1A3325]"><span>Total</span><span>{formatPrice(total)}</span></div>
      <p className="mt-1 text-right text-xs text-[#68786b]">Taxes included</p>
      <Link href="/checkout" className="mt-5 flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#1A3325] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#294735] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1A3325]">
        <LockKeyhole className="size-4" aria-hidden="true" /> Proceed to checkout
      </Link>
      <p className="mt-3 text-center text-xs text-[#68786b]">100% safe checkout</p>
    </section>
  )
}
