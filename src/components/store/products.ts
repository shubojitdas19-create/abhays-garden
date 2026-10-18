export type Filter = 'all' | 'beginner' | 'low-light' | 'pet-friendly'

export type Product = {
  id: string
  tag: string
  name: string
  botanical: string
  image: string
  alt: string
  rating: number
  reviews: number
  light: 'Low light' | 'Bright indirect' | 'Full sun'
  care: 1 | 2 | 3
  badge?: string
  sizes: { label: 'S' | 'M' | 'L'; price: number; mrp?: number }[]
  filters: Filter[]
}

export const filters: { id: Filter; label: string }[] = [
  { id: 'all', label: 'All bestsellers' },
  { id: 'beginner', label: 'Beginner friendly' },
  { id: 'low-light', label: 'Low light' },
  { id: 'pet-friendly', label: 'Pet friendly' },
]

export const products: Product[] = [
  {
    id: 'monstera',
    tag: '014',
    name: 'Monstera Deliciosa',
    botanical: 'Monstera deliciosa',
    image: '/images/monstera.png',
    alt: 'Monstera Deliciosa in a cream ceramic pot',
    rating: 4.9,
    reviews: 412,
    light: 'Bright indirect',
    care: 1,
    badge: 'Bestseller',
    sizes: [
      { label: 'S', price: 649 },
      { label: 'M', price: 899, mrp: 1199 },
      { label: 'L', price: 1499 },
    ],
    filters: ['all', 'beginner'],
  },
  {
    id: 'peace-lily',
    tag: '027',
    name: 'Peace Lily',
    botanical: 'Spathiphyllum wallisii',
    image: '/images/peace-lily.png',
    alt: 'Peace lily with white blooms in a cream ceramic pot',
    rating: 4.8,
    reviews: 268,
    light: 'Low light',
    care: 2,
    badge: 'Air purifier',
    sizes: [
      { label: 'S', price: 449 },
      { label: 'M', price: 649 },
      { label: 'L', price: 999 },
    ],
    filters: ['all', 'low-light'],
  },
  {
    id: 'pothos',
    tag: '003',
    name: 'Golden Money Plant',
    botanical: 'Epipremnum aureum',
    image: '/images/pothos.png',
    alt: 'Golden pothos with trailing vines in a terracotta pot',
    rating: 4.9,
    reviews: 587,
    light: 'Low light',
    care: 1,
    sizes: [
      { label: 'S', price: 249 },
      { label: 'M', price: 399, mrp: 499 },
      { label: 'L', price: 649 },
    ],
    filters: ['all', 'beginner', 'low-light'],
  },
  {
    id: 'areca',
    tag: '041',
    name: 'Areca Palm',
    botanical: 'Dypsis lutescens',
    image: '/images/areca-palm.png',
    alt: 'Areca palm with feathery fronds in a cream ceramic pot',
    rating: 4.7,
    reviews: 193,
    light: 'Bright indirect',
    care: 2,
    sizes: [
      { label: 'S', price: 549 },
      { label: 'M', price: 849 },
      { label: 'L', price: 1349 },
    ],
    filters: ['all', 'beginner', 'pet-friendly'],
  },
  {
    id: 'jade',
    tag: '019',
    name: 'Lucky Jade',
    botanical: 'Crassula ovata',
    image: '/images/jade.png',
    alt: 'Bushy jade plant in a small terracotta pot',
    rating: 4.8,
    reviews: 341,
    light: 'Full sun',
    care: 1,
    badge: 'Gift pick',
    sizes: [
      { label: 'S', price: 299 },
      { label: 'M', price: 449 },
      { label: 'L', price: 749 },
    ],
    filters: ['all', 'beginner'],
  },
  {
    id: 'hibiscus',
    tag: '052',
    name: 'Red Hibiscus',
    botanical: 'Hibiscus rosa-sinensis',
    image: '/images/hibiscus.png',
    alt: 'Red hibiscus in bloom in a terracotta pot',
    rating: 4.7,
    reviews: 156,
    light: 'Full sun',
    care: 3,
    badge: 'In bloom',
    sizes: [
      { label: 'S', price: 349 },
      { label: 'M', price: 549, mrp: 699 },
      { label: 'L', price: 899 },
    ],
    filters: ['all', 'pet-friendly'],
  },
  {
    id: 'snake-plant',
    tag: '008',
    name: 'Snake Plant',
    botanical: 'Sansevieria trifasciata',
    image: '/images/snake-plant.png',
    alt: 'Snake plant with tall architectural leaves in a cream ceramic pot',
    rating: 4.9,
    reviews: 832,
    light: 'Low light',
    care: 1,
    badge: 'Indestructible',
    sizes: [
      { label: 'S', price: 299 },
      { label: 'M', price: 499, mrp: 599 },
      { label: 'L', price: 899 },
    ],
    filters: ['all', 'beginner', 'low-light'],
  },
  {
    id: 'spider-plant',
    tag: '022',
    name: 'Spider Plant',
    botanical: 'Chlorophytum comosum',
    image: '/images/spider-plant.png',
    alt: 'Spider plant with arching variegated leaves in a terracotta pot',
    rating: 4.8,
    reviews: 415,
    light: 'Bright indirect',
    care: 1,
    badge: 'Fast grower',
    sizes: [
      { label: 'S', price: 199 },
      { label: 'M', price: 349 },
      { label: 'L', price: 549 },
    ],
    filters: ['all', 'beginner', 'pet-friendly'],
  },
]

export const formatINR = (n: number) => `₹${n.toLocaleString('en-IN')}`