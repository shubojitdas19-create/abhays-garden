'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useCallback, useEffect, useState } from 'react'
import { Check, Copy, Heart, ShoppingBag, X } from 'lucide-react'
import { useCartStore, type CartItemInput } from '@/lib/store/cart-store'

type CartToastDetail = {
  kind: 'cart'
  productName: string
  image: string
}

export type StoreToastDetail = {
  kind: 'wishlist' | 'copy' | 'info'
  title: string
  description?: string
  href?: string
  actionLabel?: string
}

type ActiveToast = CartToastDetail | StoreToastDetail

export function showStoreToast(detail: StoreToastDetail): void {
  if (typeof window === 'undefined') return
  window.dispatchEvent(new CustomEvent<StoreToastDetail>('arg:toast', { detail }))
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [toast, setToast] = useState<ActiveToast | null>(null)

  useEffect(() => {
    void useCartStore.persist.rehydrate()
    const onAdded = (event: Event) => {
      const detail = (event as CustomEvent<Pick<CartItemInput, 'productName' | 'image'>>).detail
      setToast({ kind: 'cart', productName: detail.productName, image: detail.image })
    }
    const onStoreToast = (event: Event) => {
      const detail = (event as CustomEvent<StoreToastDetail>).detail
      setToast(detail)
    }
    window.addEventListener('arg:cart-added', onAdded)
    window.addEventListener('arg:toast', onStoreToast)
    return () => {
      window.removeEventListener('arg:cart-added', onAdded)
      window.removeEventListener('arg:toast', onStoreToast)
    }
  }, [])

  useEffect(() => {
    if (!toast) return
    const timeout = window.setTimeout(() => setToast(null), 3800)
    return () => window.clearTimeout(timeout)
  }, [toast])

  return (
    <>
      {children}
      <div
        className="pointer-events-none fixed inset-x-3 top-20 z-[70] flex justify-center sm:inset-x-auto sm:right-6 sm:top-24"
        aria-live="polite"
        aria-atomic="true"
      >
        {toast && toast.kind === 'cart' && (
          <div className="pointer-events-auto flex w-full max-w-sm items-center gap-3 rounded-2xl border border-[#dfe8dc] bg-white/98 p-3 shadow-[0_18px_48px_rgba(26,51,37,0.2)] backdrop-blur-md animate-toast-in">
            <div className="relative size-12 shrink-0 overflow-hidden rounded-xl bg-[#edf1e9]">
              <Image src={toast.image} alt="" fill sizes="48px" className="object-cover" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-[#1A3325]">{toast.productName}</p>
              <p className="mt-0.5 text-xs text-[#68786b]">Added to your plant bag</p>
            </div>
            <button
              type="button"
              onClick={() => {
                useCartStore.getState().toggleCart()
                setToast(null)
              }}
              className="inline-flex min-h-9 shrink-0 items-center gap-1 rounded-full bg-[#1A3325] px-3 text-xs font-semibold text-white transition-transform hover:scale-[1.03] active:scale-95"
            >
              <ShoppingBag className="size-3.5" aria-hidden="true" /> View bag
            </button>
            <button
              type="button"
              onClick={() => setToast(null)}
              className="-mr-1 -mt-1 inline-flex size-7 shrink-0 items-center justify-center rounded-full text-[#68786b] transition-colors hover:bg-[#f1f4ee]"
              aria-label="Dismiss notification"
            >
              <X className="size-4" aria-hidden="true" />
            </button>
          </div>
        )}

        {toast && toast.kind !== 'cart' && (
          <div className="pointer-events-auto flex w-full max-w-sm items-center gap-3 rounded-2xl border border-[#2c4d3a] bg-[#0F291E]/96 px-3.5 py-3 text-white shadow-[0_18px_48px_rgba(15,41,30,0.32)] backdrop-blur-md animate-toast-in">
            <span
              className={`flex size-9 shrink-0 items-center justify-center rounded-full ${
                toast.kind === 'wishlist'
                  ? 'bg-[#C26743]/25 text-[#f4b393]'
                  : 'bg-[#E5A849]/20 text-[#E5A849]'
              }`}
            >
              {toast.kind === 'wishlist' ? (
                <Heart className="size-4 fill-current" aria-hidden="true" />
              ) : toast.kind === 'copy' ? (
                <Copy className="size-4" aria-hidden="true" />
              ) : (
                <Check className="size-4" aria-hidden="true" />
              )}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-white">{toast.title}</p>
              {toast.description && (
                <p className="mt-0.5 truncate text-xs text-white/75">{toast.description}</p>
              )}
            </div>
            {toast.href && toast.actionLabel && (
              <Link
                href={toast.href}
                onClick={() => setToast(null)}
                className="inline-flex min-h-8 shrink-0 items-center rounded-full bg-[#E5A849] px-3 text-xs font-semibold text-[#1A3325] transition-colors hover:bg-[#efbc69]"
              >
                {toast.actionLabel}
              </Link>
            )}
            <button
              type="button"
              onClick={() => setToast(null)}
              className="-mr-1 inline-flex size-7 shrink-0 items-center justify-center rounded-full text-white/65 transition-colors hover:bg-white/10 hover:text-white"
              aria-label="Dismiss notification"
            >
              <X className="size-4" aria-hidden="true" />
            </button>
          </div>
        )}
      </div>
    </>
  )
}

export function useCart() {
  const count = useCartStore((state) => state.totalItemsCount)
  const storeAddItem = useCartStore((state) => state.addItem)
  const addItem = useCallback(
    (item: CartItemInput) => {
      storeAddItem(item)
      if (typeof window !== 'undefined') {
        window.dispatchEvent(
          new CustomEvent<Pick<CartItemInput, 'productName' | 'image'>>('arg:cart-added', {
            detail: { productName: item.productName, image: item.image },
          }),
        )
      }
    },
    [storeAddItem],
  )
  const items = useCartStore((state) => state.items)
  const subtotalPrice = useCartStore((state) => state.subtotalPrice)
  const shippingFee = useCartStore((state) => state.shippingFee)
  const couponCode = useCartStore((state) => state.couponCode)
  const discountAmount =
    couponCode === 'ROOFTOP10'
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
  const storeToggleWishlist = useCartStore((state) => state.toggleWishlist)
  const toggleWishlist = useCallback(
    (productId: string) => {
      const wasSaved = useCartStore.getState().wishlist.includes(productId)
      storeToggleWishlist(productId)
      showStoreToast({
        kind: 'wishlist',
        title: wasSaved ? 'Removed from wishlist' : 'Saved to your wishlist',
        description: wasSaved ? 'Updated your saved plants' : 'View anytime from your garden wishlist',
        href: wasSaved ? undefined : '/wishlist',
        actionLabel: wasSaved ? undefined : 'View',
      })
    },
    [storeToggleWishlist],
  )
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
