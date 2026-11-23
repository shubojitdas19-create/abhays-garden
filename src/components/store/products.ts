export type Nursery = {
  id: string
  slug: string
  name: string
  tagline: string
  location: string
  distanceKm?: number
  rating: number
  reviewsCount: number
  image: string
  avatar: string
  verified: boolean
  specialty: string
  bio: string
}

export type ProductFilter =
  | 'all'
  | 'beginner'
  | 'low-light'
  | 'pet-friendly'
  | 'flowering'
  | 'succulents'
  | 'air-purifier'

export type Filter = ProductFilter

export type Product = {
  id: string
  slug: string
  tag: string
  name: string
  botanical: string
  description: string
  careSummary: {
    light: 'Low light' | 'Bright indirect' | 'Full sun'
    water: string
    difficulty: 1 | 2 | 3
    petFriendly: boolean
    airPurifying: boolean
  }
  image: string
  gallery: string[]
  rating: number
  reviews: number
  badge?: string
  sizes: { label: 'S' | 'M' | 'L'; price: number; mrp?: number; height: string }[]
  pots: { id: string; name: string; price: number; image: string }[]
  filters: ProductFilter[]
  nursery: Nursery
  inStock: boolean
}

export const nurseries: Nursery[] = [
  {
    id: 'abhays-roof-garden',
    slug: 'abhays-roof-garden',
    name: "Abhay's Flagship Nursery",
    tagline: 'Homegrown on our rooftop',
    location: 'Berhampore, West Bengal',
    rating: 4.9,
    reviewsCount: 2400,
    image: '/images/rooftop.png',
    avatar: '/images/logo2.png',
    verified: true,
    specialty: 'Indoor foliage & everyday favourites',
    bio: 'A family-run rooftop nursery growing resilient, acclimatised plants by hand in Berhampore.',
  },
  {
    id: 'eden-green',
    slug: 'eden-green-rooftop-nursery',
    name: 'Eden Green Rooftop Nursery',
    tagline: 'A little more green, every day',
    location: 'South Kolkata',
    distanceKm: 3.5,
    rating: 4.9,
    reviewsCount: 128,
    image: '/images/hero-rooftop.png',
    avatar: '/images/customer-1.jpg',
    verified: true,
    specialty: 'Tropical foliage & air-purifying plants',
    bio: 'Growing organic tropical foliage on a sunny South Kolkata terrace since 2018.',
  },
  {
    id: 'salt-lake-succulents',
    slug: 'salt-lake-succulent-studio',
    name: 'Salt Lake Succulent Studio',
    tagline: 'Small plants, big character',
    location: 'Salt Lake, Kolkata',
    distanceKm: 6.2,
    rating: 4.8,
    reviewsCount: 96,
    image: '/images/cat-succulents.png',
    avatar: '/images/customer-5.jpg',
    verified: true,
    specialty: 'Succulents, cacti & sun-lovers',
    bio: 'A specialist micro-nursery curating hardy succulents and easy-care plants for bright homes.',
  },
]

const pots: Product['pots'] = [
  { id: 'nursery-pot', name: 'Standard Eco Nursery Pot', price: 0, image: '/images/pot-terracotta.jpg' },
  { id: 'ceramic-white', name: 'Handcrafted White Ceramic Pot', price: 299, image: '/images/pot-white.jpg' },
  { id: 'terracotta', name: 'Breathable Terracotta Planter', price: 199, image: '/images/pot-terracotta.jpg' },
]

export const filters: { id: ProductFilter; label: string }[] = [
  { id: 'all', label: 'All plants' },
  { id: 'beginner', label: 'Beginner friendly' },
  { id: 'low-light', label: 'Low light' },
  { id: 'pet-friendly', label: 'Pet friendly' },
  { id: 'flowering', label: 'Flowering' },
  { id: 'succulents', label: 'Succulents' },
  { id: 'air-purifier', label: 'Air purifying' },
]

export const products: Product[] = [
  {
    id: 'monstera',
    slug: 'monstera-deliciosa',
    tag: '014',
    name: 'Monstera Deliciosa',
    botanical: 'Monstera deliciosa',
    description: 'A sculptural tropical favourite with glossy, fenestrated leaves. Rooftop-acclimatised and ready to bring a little jungle home.',
    careSummary: { light: 'Bright indirect', water: 'Once a week', difficulty: 1, petFriendly: false, airPurifying: true },
    image: '/images/monstera.png',
    gallery: ['/images/monstera.png', '/images/stage-monstera.png'],
    rating: 4.9,
    reviews: 412,
    badge: 'Bestseller',
    sizes: [
      { label: 'S', price: 649, height: '25–35 cm' },
      { label: 'M', price: 899, mrp: 1199, height: '45–60 cm' },
      { label: 'L', price: 1499, height: '75–90 cm' },
    ],
    pots,
    filters: ['all', 'beginner', 'air-purifier'],
    nursery: nurseries[0],
    inStock: true,
  },
  {
    id: 'peace-lily',
    slug: 'peace-lily',
    tag: '027',
    name: 'Peace Lily',
    botanical: 'Spathiphyllum wallisii',
    description: 'Elegant deep-green leaves and graceful white blooms make this forgiving plant a calm, beautiful fit for softer-lit rooms.',
    careSummary: { light: 'Low light', water: 'Every 5–7 days', difficulty: 2, petFriendly: false, airPurifying: true },
    image: '/images/peace-lily.png',
    gallery: ['/images/peace-lily.png', '/images/stage-peace-lily.png'],
    rating: 4.8,
    reviews: 268,
    badge: 'Air purifier',
    sizes: [
      { label: 'S', price: 449, height: '20–30 cm' },
      { label: 'M', price: 649, height: '35–45 cm' },
      { label: 'L', price: 999, height: '55–70 cm' },
    ],
    pots,
    filters: ['all', 'low-light', 'air-purifier'],
    nursery: nurseries[1],
    inStock: true,
  },
  {
    id: 'pothos',
    slug: 'golden-money-plant',
    tag: '003',
    name: 'Golden Money Plant',
    botanical: 'Epipremnum aureum',
    description: 'A cheerful trailing vine with golden variegation that adapts to a range of light and is easy to grow from cuttings.',
    careSummary: { light: 'Low light', water: 'Once a week', difficulty: 1, petFriendly: false, airPurifying: true },
    image: '/images/pothos.png',
    gallery: ['/images/pothos.png'],
    rating: 4.9,
    reviews: 587,
    sizes: [
      { label: 'S', price: 249, height: '20–30 cm' },
      { label: 'M', price: 399, mrp: 499, height: '35–50 cm' },
      { label: 'L', price: 649, height: '55–75 cm' },
    ],
    pots,
    filters: ['all', 'beginner', 'low-light', 'air-purifier'],
    nursery: nurseries[0],
    inStock: true,
  },
  {
    id: 'areca',
    slug: 'areca-palm',
    tag: '041',
    name: 'Areca Palm',
    botanical: 'Dypsis lutescens',
    description: 'Feathery, arching fronds bring a bright tropical feel to living spaces. A lush statement plant that enjoys a light corner.',
    careSummary: { light: 'Bright indirect', water: 'Twice a week', difficulty: 2, petFriendly: true, airPurifying: true },
    image: '/images/areca-palm.png',
    gallery: ['/images/areca-palm.png', '/images/stage-areca.png'],
    rating: 4.7,
    reviews: 193,
    sizes: [
      { label: 'S', price: 549, height: '35–45 cm' },
      { label: 'M', price: 849, height: '60–75 cm' },
      { label: 'L', price: 1349, height: '90–120 cm' },
    ],
    pots,
    filters: ['all', 'beginner', 'pet-friendly', 'air-purifier'],
    nursery: nurseries[1],
    inStock: true,
  },
  {
    id: 'jade',
    slug: 'lucky-jade',
    tag: '019',
    name: 'Lucky Jade',
    botanical: 'Crassula ovata',
    description: 'A compact, sun-loving succulent with plump leaves and a tree-like shape. A thoughtful gift and a steady companion for bright windowsills.',
    careSummary: { light: 'Full sun', water: 'Every 2–3 weeks', difficulty: 1, petFriendly: false, airPurifying: false },
    image: '/images/jade.png',
    gallery: ['/images/jade.png'],
    rating: 4.8,
    reviews: 341,
    badge: 'Gift pick',
    sizes: [
      { label: 'S', price: 299, height: '10–15 cm' },
      { label: 'M', price: 449, height: '18–25 cm' },
      { label: 'L', price: 749, height: '30–40 cm' },
    ],
    pots,
    filters: ['all', 'beginner', 'succulents'],
    nursery: nurseries[2],
    inStock: true,
  },
  {
    id: 'hibiscus',
    slug: 'red-hibiscus',
    tag: '052',
    name: 'Red Hibiscus',
    botanical: 'Hibiscus rosa-sinensis',
    description: 'A sun-loving flowering shrub with vivid red blooms that brings colour to balconies, patios and bright outdoor spaces.',
    careSummary: { light: 'Full sun', water: 'Every 1–2 days in warm weather', difficulty: 3, petFriendly: true, airPurifying: false },
    image: '/images/hibiscus.png',
    gallery: ['/images/hibiscus.png'],
    rating: 4.7,
    reviews: 156,
    badge: 'In bloom',
    sizes: [
      { label: 'S', price: 349, height: '25–35 cm' },
      { label: 'M', price: 549, mrp: 699, height: '45–60 cm' },
      { label: 'L', price: 899, height: '70–90 cm' },
    ],
    pots,
    filters: ['all', 'flowering', 'pet-friendly'],
    nursery: nurseries[0],
    inStock: true,
  },
  {
    id: 'snake-plant',
    slug: 'snake-plant',
    tag: '008',
    name: 'Snake Plant',
    botanical: 'Dracaena trifasciata',
    description: 'Architectural upright leaves and forgiving care make this a dependable choice for bedrooms, offices and new plant parents.',
    careSummary: { light: 'Low light', water: 'Every 2–3 weeks', difficulty: 1, petFriendly: false, airPurifying: true },
    image: '/images/snake-plant.png',
    gallery: ['/images/snake-plant.png'],
    rating: 4.9,
    reviews: 832,
    badge: 'Indestructible',
    sizes: [
      { label: 'S', price: 299, height: '20–30 cm' },
      { label: 'M', price: 499, mrp: 599, height: '40–55 cm' },
      { label: 'L', price: 899, height: '70–90 cm' },
    ],
    pots,
    filters: ['all', 'beginner', 'low-light', 'air-purifier'],
    nursery: nurseries[0],
    inStock: true,
  },
  {
    id: 'spider-plant',
    slug: 'spider-plant',
    tag: '022',
    name: 'Spider Plant',
    botanical: 'Chlorophytum comosum',
    description: 'A lively, pet-friendly plant with arching striped leaves and baby plantlets that is easy to share and easy to love.',
    careSummary: { light: 'Bright indirect', water: 'Once a week', difficulty: 1, petFriendly: true, airPurifying: true },
    image: '/images/spider-plant.png',
    gallery: ['/images/spider-plant.png'],
    rating: 4.8,
    reviews: 415,
    badge: 'Fast grower',
    sizes: [
      { label: 'S', price: 199, height: '15–20 cm' },
      { label: 'M', price: 349, height: '25–35 cm' },
      { label: 'L', price: 549, height: '40–55 cm' },
    ],
    pots,
    filters: ['all', 'beginner', 'pet-friendly', 'air-purifier'],
    nursery: nurseries[1],
    inStock: true,
  },
]

export const formatINR = (n: number) => `₹${n.toLocaleString('en-IN')}`
