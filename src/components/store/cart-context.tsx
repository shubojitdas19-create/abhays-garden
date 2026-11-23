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
  const isCartOpen = useCartStore((state) => state.isCartOpen)
  const removeItem = useCartStore((state) => state.removeItem)
  const updateQuantity = useCartStore((state) => state.updateQuantity)
  const clearCart = useCartStore((state) => state.clearCart)
  const toggleCart = useCartStore((state) => state.toggleCart)

  return {
    count,
    items,
    totalItemsCount: count,
    subtotalPrice,
    shippingFee,
    isCartOpen,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    toggleCart,
  }
}
