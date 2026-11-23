'use client'

import { useEffect } from 'react'
import { useCartStore } from '@/lib/store/cart-store'

export function CartProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    void useCartStore.persist.rehydrate()
  }, [])

  return children
}

export function useCart() {
  const count = useCartStore((state) => state.totalItemsCount)
  const addItem = useCartStore((state) => state.addItem)
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
