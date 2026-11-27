import { nurseries, products } from '@/components/store/products'

export type NurseryReply = {
  nurseryId: string
  nurserySlug: string
  nurseryName: string
  nurseryAvatar: string
  date: string
  message: string
}

export type CustomerReview = {
  id: string
  reviewerName: string
  city: string
  verified: boolean
  rating: 1 | 2 | 3 | 4 | 5
  date: string
  isoDate: string
  headline: string
  text: string
  productId?: string
  productSlug?: string
  productName?: string
  productImage?: string
  nurseryId?: string
  nurserySlug?: string
  nurseryName?: string
  photos: string[]
  helpfulCount: number
  nurseryReply?: NurseryReply
}

const REVIEWS_STORAGE_KEY = 'arg-customer-reviews'
const HELPFUL_STORAGE_KEY = 'arg-review-helpful-votes'

export const BASE_TOTAL_VERIFIED_ORDERS = 1480
export const BASE_STAR_DISTRIBUTION: Record<1 | 2 | 3 | 4 | 5, number> = {
  5: 1302, // 88%
  4: 133,  // 9%
  3: 30,   // 2%
  2: 11,   // <1%
  1: 4,    // <1%
}

const productById = (id: string) => products.find((item) => item.id === id) ?? products[0]
const nurseryById = (id: string) => nurseries.find((item) => item.id === id) ?? nurseries[0]

function makeReview(input: {
  id: string
  reviewerName: string
  city: string
  verified?: boolean
  rating: 1 | 2 | 3 | 4 | 5
  date: string
  isoDate: string
  headline: string
  text: string
  productId: string
  photos: string[]
  helpfulCount: number
  reply?: { date: string; message: string }
}): CustomerReview {
  const product = productById(input.productId)
  const nursery = nurseryById(product.nursery.id)

  return {
    id: input.id,
    reviewerName: input.reviewerName,
    city: input.city,
    verified: input.verified ?? true,
    rating: input.rating,
    date: input.date,
    isoDate: input.isoDate,
    headline: input.headline,
    text: input.text,
    productId: product.id,
    productSlug: product.slug,
    productName: product.name,
    productImage: product.image,
    nurseryId: nursery.id,
    nurserySlug: nursery.slug,
    nurseryName: nursery.name,
    photos: input.photos,
    helpfulCount: input.helpfulCount,
    nurseryReply: input.reply
      ? {
          nurseryId: nursery.id,
          nurserySlug: nursery.slug,
          nurseryName: nursery.name,
          nurseryAvatar: nursery.avatar,
          date: input.reply.date,
          message: input.reply.message,
        }
      : undefined,
  }
}

export const initialReviews: CustomerReview[] = [
  makeReview({
    id: 'rev-sneha-monstera',
    reviewerName: 'Sneha Roy',
    city: 'Kolkata',
    rating: 5,
    date: '14 Nov 2026',
    isoDate: '2026-11-14T10:30:00.000Z',
    headline: 'Five new fenestrated leaves in six months',
    text: 'Six months in and my Monstera Deliciosa has thrown five gorgeous split leaves. It arrived upright with zero soil spill in the coco-fibre lock, and the roots were already well established. It is easily the centrepiece of our living room.',
    productId: 'monstera',
    photos: ['/images/customer-1.jpg'],
    helpfulCount: 34,
    reply: {
      date: '15 Nov 2026',
      message: 'Thank you Sneha! Your monstera looks stunning near that bright window. Remember to gently mist the aerial roots and wipe the leaves once a fortnight as winter air gets drier.',
    },
  }),
  makeReview({
    id: 'rev-ramesh-hibiscus',
    reviewerName: 'Ramesh Iyer',
    city: 'Pune',
    rating: 5,
    date: '11 Nov 2026',
    isoDate: '2026-11-11T09:15:00.000Z',
    headline: 'Arrived with three buds ready to open',
    text: 'I was nervous ordering a flowering shrub online, but the hibiscus arrived with buds already intact. Within four days the first deep-red bloom opened, and it has not stopped flowering since. My balcony finally feels alive.',
    productId: 'hibiscus',
    photos: ['/images/customer-2.jpg'],
    helpfulCount: 27,
    reply: {
      date: '12 Nov 2026',
      message: 'So glad the buds opened right on cue, Ramesh! Keep giving it 4 to 5 hours of morning sun and a handful of aged compost once a month to keep the blooms coming.',
    },
  }),
  makeReview({
    id: 'rev-ananya-peace-lily',
    reviewerName: 'Ananya Chatterjee',
    city: 'Siliguri',
    rating: 5,
    date: '06 Nov 2026',
    isoDate: '2026-11-06T14:20:00.000Z',
    headline: 'Thriving in our low-light study corner',
    text: 'Ordered the medium Peace Lily with the handcrafted white ceramic pot. The packaging felt genuinely thoughtful—breathable vents, damp soil wrap, and a clear printed care card. Two fresh white spathes popped up in week three.',
    productId: 'peace-lily',
    photos: ['/images/customer-6.jpg'],
    helpfulCount: 19,
    reply: {
      date: '07 Nov 2026',
      message: 'We love seeing our South Kolkata lilies settle into northern Bengal homes, Ananya. Wait until the leaves give a gentle droop before watering—it will reward you with blooms all year.',
    },
  }),
  makeReview({
    id: 'rev-priya-pothos',
    reviewerName: 'Priya Nair',
    city: 'Bengaluru',
    rating: 5,
    date: '02 Nov 2026',
    isoDate: '2026-11-02T11:45:00.000Z',
    headline: 'Fast dispatch and already trailing over the shelf',
    text: 'Ordered on a Tuesday and unboxed it on Friday afternoon. The vines have grown almost a foot since, and two cuttings I snipped have already rooted in glass jars. Zero yellow leaves from transit.',
    productId: 'pothos',
    photos: ['/images/customer-3.jpg'],
    helpfulCount: 22,
  }),
  makeReview({
    id: 'rev-farhan-snake',
    reviewerName: 'Farhan Sheikh',
    city: 'Mumbai',
    rating: 5,
    date: '28 Oct 2026',
    isoDate: '2026-10-28T16:10:00.000Z',
    headline: 'Spotless leaves and rock-solid packaging',
    text: 'Came well packed with no soil spillage and crisp, upright foliage. I travel for work often and needed something forgiving for the bedroom—a month later it is already taller with two new shoots.',
    productId: 'snake-plant',
    photos: ['/images/customer-4.jpg'],
    helpfulCount: 16,
    reply: {
      date: '29 Oct 2026',
      message: 'Thanks for sharing the photo, Farhan! New shoots in the first month mean it loves its spot. Water sparingly every 2 to 3 weeks and it will stay effortless.',
    },
  }),
  makeReview({
    id: 'rev-meera-jade',
    reviewerName: 'Meera Balan',
    city: 'Chennai',
    rating: 4,
    date: '22 Oct 2026',
    isoDate: '2026-10-22T08:40:00.000Z',
    headline: 'Plump, healthy jade with sturdy woody stems',
    text: 'My balcony windowsill finally looks styled. The jade arrived super firm with a lovely bonsai-like trunk. Knocking half a star mentally only because the courier took an extra day in monsoon rain, though the plant itself handled it like a champ.',
    productId: 'jade',
    photos: ['/images/customer-5.jpg'],
    helpfulCount: 14,
    reply: {
      date: '23 Oct 2026',
      message: 'Thank you for the honest note, Meera! We harden our jades outdoors so they handle brief transit delays well. Let the chunky soil mix dry completely between waterings.',
    },
  }),
  makeReview({
    id: 'rev-devraj-areca',
    reviewerName: 'Devraj Mukherjee',
    city: 'Durgapur',
    rating: 5,
    date: '17 Oct 2026',
    isoDate: '2026-10-17T13:05:00.000Z',
    headline: 'Pet-safe greenery our cat actually leaves alone',
    text: 'Picked the large Areca Palm after taking the Plant Finder quiz because we have an indoor cat. The fronds are lush, vibrant, and tall right out of the box—much fuller than anything I found at roadside stalls.',
    productId: 'areca',
    photos: ['/images/customer-7.jpg'],
    helpfulCount: 18,
    reply: {
      date: '18 Oct 2026',
      message: 'So happy it passed the pet-home test, Devraj! Rotating the planter a quarter-turn every Sunday will keep those arching fronds symmetrical.',
    },
  }),
  makeReview({
    id: 'rev-kavita-fiddle',
    reviewerName: 'Kavita Sengupta',
    city: 'Berhampore',
    rating: 4,
    date: '10 Oct 2026',
    isoDate: '2026-10-10T17:30:00.000Z',
    headline: 'Statement Fiddle Leaf Fig that acclimated smoothly',
    text: 'Dropped one lower leaf in the first week while adjusting to our AC room, which the care card had already warned me might happen. Moved it closer to the east balcony door and now two glossy new leaves are unfurling.',
    productId: 'fiddle-leaf-fig',
    photos: [],
    helpfulCount: 11,
  }),
]

function isOptionalString(value: unknown): boolean {
  return value === undefined || typeof value === 'string'
}

function isValidReview(value: unknown): value is CustomerReview {
  if (!value || typeof value !== 'object') return false
  const item = value as Partial<CustomerReview>
  return (
    typeof item.id === 'string' &&
    typeof item.reviewerName === 'string' &&
    typeof item.city === 'string' &&
    typeof item.headline === 'string' &&
    typeof item.text === 'string' &&
    isOptionalString(item.productId) &&
    isOptionalString(item.productSlug) &&
    isOptionalString(item.productName) &&
    isOptionalString(item.productImage) &&
    isOptionalString(item.nurseryId) &&
    isOptionalString(item.nurserySlug) &&
    isOptionalString(item.nurseryName) &&
    typeof item.rating === 'number' &&
    item.rating >= 1 &&
    item.rating <= 5 &&
    Array.isArray(item.photos)
  )
}

export function readStoredReviews(): CustomerReview[] {
  if (typeof window === 'undefined') return []
  try {
    const raw: unknown = JSON.parse(window.localStorage.getItem(REVIEWS_STORAGE_KEY) ?? '[]')
    return Array.isArray(raw) ? raw.filter(isValidReview) : []
  } catch {
    return []
  }
}

export function saveStoredReview(review: CustomerReview): boolean {
  if (typeof window === 'undefined') return false
  try {
    const existing = readStoredReviews().filter((item) => item.id !== review.id)
    window.localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify([review, ...existing]))
    return true
  } catch {
    // Retry without photos if localStorage quota is tight
    try {
      const existing = readStoredReviews().filter((item) => item.id !== review.id)
      window.localStorage.setItem(
        REVIEWS_STORAGE_KEY,
        JSON.stringify([{ ...review, photos: [] }, ...existing]),
      )
      return true
    } catch {
      return false
    }
  }
}

export function readHelpfulVotes(): string[] {
  if (typeof window === 'undefined') return []
  try {
    const raw: unknown = JSON.parse(window.localStorage.getItem(HELPFUL_STORAGE_KEY) ?? '[]')
    return Array.isArray(raw) ? raw.filter((id): id is string => typeof id === 'string') : []
  } catch {
    return []
  }
}

export function saveHelpfulVotes(votes: string[]): void {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(HELPFUL_STORAGE_KEY, JSON.stringify(votes))
  } catch {
    // Ignore storage write errors
  }
}
