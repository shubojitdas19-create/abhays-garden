import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

export type CartItemInput = {
  productId: string
  productName: string
  size: string
  pot: string
  price: number
  quantity?: number
  image: string
  nurseryName: string
}

export type CartItem = CartItemInput & { quantity: number }

type CartStore = {
  items: CartItem[]
  totalItemsCount: number
  subtotalPrice: number
  shippingFee: number
  isCartOpen: boolean
  addItem: (item: CartItemInput) => void
  removeItem: (productId: string, size: string, pot: string) => void
  updateQuantity: (productId: string, size: string, pot: string, quantity: number) => void
  clearCart: () => void
  toggleCart: () => void
}

function getTotals(items: CartItem[]) {
  const subtotalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0)
  return {
    totalItemsCount: items.reduce((total, item) => total + item.quantity, 0),
    subtotalPrice,
    shippingFee: subtotalPrice >= 999 ? 0 : 99,
  }
}

function isCartItem(value: unknown): value is CartItem {
  if (!value || typeof value !== 'object') return false
  const item = value as Partial<CartItem>
  return (
    typeof item.productId === 'string' &&
    typeof item.productName === 'string' &&
    typeof item.size === 'string' &&
    typeof item.pot === 'string' &&
    typeof item.price === 'number' && Number.isFinite(item.price) && item.price >= 0 &&
    typeof item.quantity === 'number' && Number.isSafeInteger(item.quantity) && item.quantity > 0 &&
    typeof item.image === 'string' &&
    typeof item.nurseryName === 'string'
  )
}

function itemMatches(item: CartItem, productId: string, size: string, pot: string) {
  return item.productId === productId && item.size === size && item.pot === pot
}

function withItems(items: CartItem[]) {
  return { items, ...getTotals(items) }
}

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      items: [],
      totalItemsCount: 0,
      subtotalPrice: 0,
      shippingFee: 99,
      isCartOpen: false,
      addItem: (item) => {
        if (!item.productId || !item.productName || !item.size || !item.pot || !item.image || !item.nurseryName) return
        if (!Number.isFinite(item.price) || item.price < 0) return

        const quantity = typeof item.quantity === 'number' && Number.isSafeInteger(item.quantity) && item.quantity > 0
          ? item.quantity
          : 1
        set((state) => {
          const existing = state.items.find((cartItem) => itemMatches(cartItem, item.productId, item.size, item.pot))
          const items = existing
            ? state.items.map((cartItem) =>
                itemMatches(cartItem, item.productId, item.size, item.pot)
                  ? { ...cartItem, quantity: cartItem.quantity + quantity }
                  : cartItem,
              )
            : [...state.items, { ...item, quantity }]

          return { ...withItems(items), isCartOpen: true }
        })
      },
      removeItem: (productId, size, pot) =>
        set((state) => withItems(state.items.filter((item) => !itemMatches(item, productId, size, pot)))),
      updateQuantity: (productId, size, pot, quantity) =>
        set((state) => {
          const items = Number.isSafeInteger(quantity) && quantity > 0
            ? state.items.map((item) => (itemMatches(item, productId, size, pot) ? { ...item, quantity } : item))
            : state.items.filter((item) => !itemMatches(item, productId, size, pot))
          return withItems(items)
        }),
      clearCart: () => set(withItems([])),
      toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
    }),
    {
      name: 'abhays-garden-cart',
      storage: createJSONStorage(() => localStorage),
      skipHydration: true,
      partialize: (state) => ({ items: state.items }) as CartStore,
      merge: (persistedState, currentState) => {
        const persistedItems = (persistedState as Pick<CartStore, 'items'> | undefined)?.items
        const items = Array.isArray(persistedItems) ? persistedItems.filter(isCartItem) : []
        return { ...currentState, ...withItems(items) }
      },
    },
  ),
)
