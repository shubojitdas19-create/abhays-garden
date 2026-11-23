'use client'

import Image from 'next/image'
import { useCallback, useEffect, useState } from 'react'
import { Check, ShoppingBag, X } from 'lucide-react'
import { useCartStore, type CartItemInput } from '@/lib/store/cart-store'

type CartToastDetail = Pick<CartItemInput, 'productName' | 'image'>

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [toast, setToast] = useState<CartToastDetail | null>(null)

  useEffect(() => {
    void useCartStore.persist.rehydrate()
    const onAdded = (event: Event) => {
      setToast((event as CustomEvent<CartToastDetail>).detail)
    }
    window.addEventListener('arg:cart-added', onAdded)
    return () => window.removeEventListener('arg:cart-added', onAdded)
  }, [])

  useEffect(() => {
    if (!toast) return
    const timeout = window.setTimeout(() => setToast(null), 4200)
    return () => window.clearTimeout(timeout)
  }, [toast])

  return (
    <>
      {children}
      <div className="pointer-events-none fixed inset-x-3 top-20 z-[70] flex justify-center sm:inset-x-auto sm:right-6 sm:top-24" aria-live="polite" aria-atomic="true">
        {toast && (
          <div className="pointer-events-auto flex w-full max-w-sm items-center gap-3 rounded-2xl border border-[#dfe8dc] bg-white p-3 shadow-[0_16px_48px_rgba(26,51,37,0.18)] animate-toast-in">
            <div className="relative size-12 shrink-0 overflow-hidden rounded-xl bg-[#edf1e9]">
              <Image src={toast.image} alt="" fill sizes="48px" className="object-cover" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-[#1A3325]">{toast.productName}</p>
              <p className="mt-0.5 text-xs text-[#68786b]">Added to your plant bag</p>
            </div>
            <button type="button" onClick={() => { useCartStore.getState().toggleCart(); setToast(null) }} className="inline-flex min-h-9 shrink-0 items-center gap-1 rounded-full bg-[#1A3325] px-3 text-xs font-semibold text-white transition-transform hover:scale-[1.03] active:scale-95">
              <ShoppingBag className="size-3.5" aria-hidden="true" /> View bag
            </button>
            <button type="button" onClick={() => setToast(null)} className="-mr-1 -mt-1 inline-flex size-7 shrink-0 items-center justify-center rounded-full text-[#68786b] transition-colors hover:bg-[#f1f4ee]" aria-label="Dismiss notification">
              <X className="size-4" aria-hidden="true" />
            </button>
            <span className="sr-only"><Check aria-hidden="true" /> Added to bag</span>
          </div>
        )}
      </div>
    </>
  )
}

export function useCart() {
  const count = useCartStore((state) => state.totalItemsCount)
  const storeAddItem = useCartStore((state) => state.addItem)
  const addItem = useCallback((item: CartItemInput) => {
    storeAddItem(item)
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent<CartToastDetail>('arg:cart-added', { detail: { productName: item.productName, image: item.image } }))
    }
  }, [storeAddItem])
  const items = useCartStore((state) => state.items)
  const subtotalPrice = useCartStore((state) => state.subtotalPrice)
  const shippingFee = useCartStore((state) => state.shippingFee)
  const couponCode = useCartStore((state) => state.couponCode)
  const discountAmount = couponCode === 'ROOFTOP10'
    ? Math.min(subtotalPrice, Math.round(subtotalPrice * 0.1))
    : couponCode === 'FIRSTPLANT'
      ? Math.min(subtotalPrice, 100)
      : 0
  const applyCouponCode = useCartStore((state) => state.applyCouponCode)
  const clearCouponCode = useCartStore((state) => state.clearCouponCode)
  const isCartOpen = useCartStore((state) => state.isCartOpen)
  const removeItem = useCartStore((state) => state.removeItem)
  const updateQuantity = useCartStore((state) => state.updateQuantity)
  const clearCart = useCartStore((state) => state.clearCart)
  const toggleCart = useCartStore((state) => state.toggleCart)
  const wishlist = useCartStore((state) => state.wishlist)
  const toggleWishlist = useCartStore((state) => state.toggleWishlist)
  const removeFromWishlist = useCartStore((state) => state.removeFromWishlist)

  return {
    count,
    items,
    totalItemsCount: count,
    subtotalPrice,
    shippingFee,
    couponCode,
    discountAmount,
    applyCouponCode,
    clearCouponCode,
    isCartOpen,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    toggleCart,
    wishlist,
    toggleWishlist,
    removeFromWishlist,
  }
}
