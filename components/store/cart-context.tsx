'use client'

import { createContext, useContext, useState } from 'react'

type CartContextValue = {
  count: number
  addItem: () => void
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [count, setCount] = useState(0)
  return (
    <CartContext value={{ count, addItem: () => setCount((c) => c + 1) }}>
      {children}
    </CartContext>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
