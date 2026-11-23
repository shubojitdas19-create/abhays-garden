import type { CartItem } from '@/lib/store/cart-store'
import { products } from '@/components/store/products'

export type ShippingAddress = {
  fullName: string
  phone: string
  email: string
  address: string
  apartment: string
  city: string
  state: string
  postalCode: string
  instructions: string
}

export type SavedAddress = ShippingAddress & {
  id: string
  label: string
  isDefault: boolean
}

export type CustomerOrder = {
  id: string
  date: string
  items: CartItem[]
  totalAmount: number
  deliveryAddress: ShippingAddress
  status: string
  trackingStage: number
  deliveryMethod: 'standard' | 'express'
  paymentMethod: 'cod' | 'upi' | 'card'
  estimatedDelivery: string
}

const ORDERS_KEY = 'arg-customer-orders'
const ADDRESSES_KEY = 'arg-customer-addresses'
export const DEMO_ORDER_ID = 'ARG-94820'

function readArray(key: string): unknown[] {
  try {
    const value: unknown = JSON.parse(window.localStorage.getItem(key) ?? 'null')
    return Array.isArray(value) ? value : []
  } catch {
    return []
  }
}

function isShippingAddress(value: unknown): value is ShippingAddress {
  if (!value || typeof value !== 'object') return false
  const address = value as Partial<ShippingAddress>
  return ['fullName', 'phone', 'email', 'address', 'apartment', 'city', 'state', 'postalCode', 'instructions']
    .every((key) => typeof address[key as keyof ShippingAddress] === 'string')
}

function isCartItem(value: unknown): value is CartItem {
  if (!value || typeof value !== 'object') return false
  const item = value as Partial<CartItem>
  return typeof item.productId === 'string' && typeof item.productName === 'string' &&
    typeof item.image === 'string' && typeof item.nurseryName === 'string' &&
    typeof item.size === 'string' && typeof item.pot === 'string' &&
    typeof item.price === 'number' && Number.isFinite(item.price) &&
    typeof item.quantity === 'number' && Number.isSafeInteger(item.quantity) && item.quantity > 0
}

function isCustomerOrder(value: unknown): value is CustomerOrder {
  if (!value || typeof value !== 'object') return false
  const order = value as Partial<CustomerOrder>
  return typeof order.id === 'string' && typeof order.date === 'string' &&
    Array.isArray(order.items) && order.items.every(isCartItem) &&
    typeof order.totalAmount === 'number' && Number.isFinite(order.totalAmount) &&
    isShippingAddress(order.deliveryAddress) && typeof order.status === 'string' &&
    typeof order.trackingStage === 'number' && Number.isInteger(order.trackingStage) && order.trackingStage >= 1 && order.trackingStage <= 4 &&
    (order.deliveryMethod === 'standard' || order.deliveryMethod === 'express') &&
    (order.paymentMethod === 'cod' || order.paymentMethod === 'upi' || order.paymentMethod === 'card') &&
    typeof order.estimatedDelivery === 'string'
}

function isSavedAddress(value: unknown): value is SavedAddress {
  if (!value || typeof value !== 'object') return false
  const address = value as Partial<SavedAddress>
  return typeof address.id === 'string' && typeof address.label === 'string' &&
    typeof address.isDefault === 'boolean' && isShippingAddress(address)
}

export function readCustomerOrders(): CustomerOrder[] {
  return readArray(ORDERS_KEY).filter(isCustomerOrder)
}

export function readCustomerOrder(orderId: string): CustomerOrder | null {
  const order = readCustomerOrders().find((item) => item.id.toUpperCase() === orderId.toUpperCase())
  if (order) return order
  return orderId.toUpperCase() === DEMO_ORDER_ID ? createDemoOrder() : null
}

export function saveCustomerOrder(order: CustomerOrder): boolean {
  try {
    const currentOrders = readCustomerOrders().filter((item) => item.id !== order.id)
    window.localStorage.setItem(ORDERS_KEY, JSON.stringify([order, ...currentOrders]))
    return true
  } catch {
    return false
  }
}

export function readSavedAddresses(): SavedAddress[] {
  return readArray(ADDRESSES_KEY).filter(isSavedAddress)
}

export function saveSavedAddresses(addresses: SavedAddress[]): boolean {
  try {
    window.localStorage.setItem(ADDRESSES_KEY, JSON.stringify(addresses))
    return true
  } catch {
    return false
  }
}

export function createDemoOrder(): CustomerOrder {
  const product = products[0]
  return {
    id: DEMO_ORDER_ID,
    date: '2026-11-23T10:00:00.000Z',
    items: [{
      productId: product.id,
      productName: product.name,
      image: product.image,
      quantity: 1,
      size: 'M',
      price: product.sizes[1]?.price ?? product.sizes[0].price,
      nurseryName: product.nursery.name,
      pot: 'Standard Eco Nursery Pot',
    }],
    totalAmount: product.sizes[1]?.price ?? product.sizes[0].price,
    deliveryAddress: {
      fullName: 'Sneha Ghosh',
      phone: '90000 00000',
      email: 'sneha@example.com',
      address: '12 Garden Lane',
      apartment: 'Rooftop View',
      city: 'Berhampore',
      state: 'West Bengal',
      postalCode: '742101',
      instructions: 'Please ring the bell.',
    },
    status: 'In transit',
    trackingStage: 3,
    deliveryMethod: 'standard',
    paymentMethod: 'cod',
    estimatedDelivery: '2026-11-27T10:00:00.000Z',
  }
}
