import { nurseries } from '@/components/store/products'

export type TopicId =
  | 'all'
  | 'yellow-leaves'
  | 'pests-bugs'
  | 'soil-potting'
  | 'light-placement'
  | 'propagation'

export type CommunityTopic = {
  id: Exclude<TopicId, 'all'>
  label: string
  shortLabel: string
  description: string
}

export type CommunityAnswer = {
  id: string
  authorName: string
  authorCity?: string
  timeAgo: string
  isoDate: string
  body: string
  upvotes: number
  photo?: string
  isOfficialNursery?: boolean
  nurseryId?: string
  nurserySlug?: string
  nurseryName?: string
  nurseryAvatar?: string
  nurseryRole?: string
}

export type CommunityQuestion = {
  id: string
  slug: string
  title: string
  body: string
  plantName: string
  topicId: Exclude<TopicId, 'all'>
  authorName: string
  authorCity: string
  timeAgo: string
  isoDate: string
  upvotes: number
  photo?: string
  relatedProductSlug?: string
  answers: CommunityAnswer[]
}

export const communityTopics: CommunityTopic[] = [
  {
    id: 'yellow-leaves',
    label: 'Yellow Leaves & Rot',
    shortLabel: 'Yellow Leaves',
    description: 'Overwatering, root health, yellowing tips, and leaf drop diagnosis.',
  },
  {
    id: 'pests-bugs',
    label: 'Pests & Bugs',
    shortLabel: 'Pests & Bugs',
    description: 'Mealybugs, spider mites, fungus gnats, and gentle organic remedies.',
  },
  {
    id: 'soil-potting',
    label: 'Soil & Potting',
    shortLabel: 'Soil & Potting',
    description: 'Aroid mixes, drainage holes, terracotta vs ceramic, and repotting timing.',
  },
  {
    id: 'light-placement',
    label: 'Light & Placement',
    shortLabel: 'Light & Spots',
    description: 'North-facing balconies, bright indirect light, AC rooms, and sunburn.',
  },
  {
    id: 'propagation',
    label: 'Propagation',
    shortLabel: 'Propagation',
    description: 'Water vs moss rooting, node cutting tips, and baby plant transfers.',
  },
]

export function getTopicById(topicId: Exclude<TopicId, 'all'>): CommunityTopic {
  return communityTopics.find((t) => t.id === topicId) ?? communityTopics[0]
}

const abhayNursery = nurseries[0]
const edenNursery = nurseries[1]
const gangaNursery = nurseries[2]

export const initialQuestions: CommunityQuestion[] = [
  {
    id: 'q-pothos-yellow-leaves',
    slug: 'why-are-my-golden-pothos-lower-leaves-turning-yellow',
    title: 'Why are my Golden Pothos lower leaves turning yellow one by one?',
    body: 'I brought home a trailing Golden Pothos about six weeks ago and placed it on a bookshelf 4 feet from an east-facing window in Kolkata. The new vines look shiny and healthy, but three older leaves near the base turned bright yellow and dropped over the past 10 days. I water it every 3 days because the top feels dry. Should I repot or change my watering schedule?',
    plantName: 'Golden Pothos',
    topicId: 'yellow-leaves',
    authorName: 'Rohan D.',
    authorCity: 'Kolkata',
    timeAgo: '3 hours ago',
    isoDate: '2026-11-27T05:10:00.000Z',
    upvotes: 24,
    photo: '/images/pothos.png',
    relatedProductSlug: 'golden-pothos',
    answers: [
      {
        id: 'ans-pothos-official',
        authorName: abhayNursery.name,
        timeAgo: '2 hours ago',
        isoDate: '2026-11-27T06:15:00.000Z',
        body: 'Great catch noticing it early, Rohan! In Kolkata’s mild winter humidity, watering every 3 days is slightly too frequent—even when the top inch looks dry, the lower root zone stays damp. Wait until the top 2–3 inches feel dry to your knuckle (usually every 6–8 days in winter) and snip off the fully yellow leaves cleanly at the stem. No need to repot right now; let the roots breathe for two weeks and the yellowing will stop.',
        upvotes: 19,
        isOfficialNursery: true,
        nurseryId: abhayNursery.id,
        nurserySlug: abhayNursery.slug,
        nurseryName: abhayNursery.name,
        nurseryAvatar: abhayNursery.avatar,
        nurseryRole: 'Verified Local Grower',
      },
      {
        id: 'ans-pothos-2',
        authorName: 'Ananya Sen',
        authorCity: 'Salt Lake',
        timeAgo: '1 hour ago',
        isoDate: '2026-11-27T07:00:00.000Z',
        body: 'A cheap wooden chopstick pushed halfway into the soil saved my pothos! If damp soil sticks to the stick when you pull it out, hold off watering for another 2–3 days.',
        upvotes: 11,
      },
      {
        id: 'ans-pothos-3',
        authorName: 'Karthik M.',
        authorCity: 'Bengaluru',
        timeAgo: '45 mins ago',
        isoDate: '2026-11-27T07:30:00.000Z',
        body: 'Also double-check that water isn’t sitting inside the decorative outer planter after you water. Standing water at the bottom causes those exact yellow base leaves.',
        upvotes: 7,
      },
    ],
  },
  {
    id: 'q-hibiscus-mealybugs',
    slug: 'white-cottony-mealybugs-on-red-hibiscus-buds-organic-fix',
    title: 'White cottony mealybugs on my Red Hibiscus buds — best organic fix?',
    body: 'My terrace Red Hibiscus has been blooming nonstop, but this morning I spotted clusters of tiny white cottony bugs tucked under two fresh flower buds and along the tender stem tips. I have a pet dog who wanders onto the balcony, so I want to avoid harsh chemical pesticides. What gentle organic spray actually works without scorching the leaves?',
    plantName: 'Red Hibiscus',
    topicId: 'pests-bugs',
    authorName: 'Meera Nair',
    authorCity: 'Pune',
    timeAgo: '6 hours ago',
    isoDate: '2026-11-27T02:00:00.000Z',
    upvotes: 31,
    photo: '/images/hibiscus.png',
    relatedProductSlug: 'red-hibiscus',
    answers: [
      {
        id: 'ans-hibiscus-official',
        authorName: edenNursery.name,
        timeAgo: '4 hours ago',
        isoDate: '2026-11-27T04:10:00.000Z',
        body: 'Mealybugs love sweet hibiscus sap! Start with a strong jet of plain water from a spray bottle to dislodge the clusters physically. Then mix 5 ml cold-pressed neem oil + 2 drops mild liquid castile soap in 1 litre of lukewarm water and spray thoroughly under leaves and around buds strictly after sunset (never in direct sun, which scorches foliage). Repeat every 5 days for 3 rounds to break the egg cycle—completely pet-safe once dry.',
        upvotes: 28,
        isOfficialNursery: true,
        nurseryId: edenNursery.id,
        nurserySlug: edenNursery.slug,
        nurseryName: edenNursery.name,
        nurseryAvatar: edenNursery.avatar,
        nurseryRole: 'Verified Local Grower',
      },
      {
        id: 'ans-hibiscus-2',
        authorName: 'Siddharth B.',
        authorCity: 'Howrah',
        timeAgo: '3 hours ago',
        isoDate: '2026-11-27T05:00:00.000Z',
        body: 'Check for ants marching up the pot too! Ants actually farm mealybugs for honeydew. Putting a thin ring of cinnamon powder around the soil rim kept ants away on my terrace.',
        upvotes: 14,
      },
    ],
  },
  {
    id: 'q-monstera-aroid-mix',
    slug: 'best-chunky-soil-mix-for-repotting-monstera-deliciosa-in-india',
    title: 'Best chunky soil mix for repotting a Monstera Deliciosa in humid weather?',
    body: 'My Monstera Deliciosa has started pushing roots out of the bottom drainage holes and just opened its fifth fenestrated leaf. I want to move it from a 6-inch nursery pot into an 8-inch breathable terracotta pot this weekend. What exact soil ratio keeps roots aerated during Indian monsoons without drying out too fast in summer?',
    plantName: 'Monstera Deliciosa',
    topicId: 'soil-potting',
    authorName: 'Sneha Roy',
    authorCity: 'Kolkata',
    timeAgo: '1 day ago',
    isoDate: '2026-11-26T09:00:00.000Z',
    upvotes: 42,
    photo: '/images/monstera.png',
    relatedProductSlug: 'monstera-deliciosa',
    answers: [
      {
        id: 'ans-monstera-official',
        authorName: gangaNursery.name,
        timeAgo: '20 hours ago',
        isoDate: '2026-11-26T12:30:00.000Z',
        body: 'Going up by just 2 inches into terracotta is the gold standard! For humid Indian apartments, we use our rooftop aroid recipe: 35% coco peat (buffered), 25% coarse pine bark or coco chips, 20% perlite or cinder, 15% vermicompost, and 5% neem cake powder to deter fungus gnats. Water thoroughly after potting and insert a moss pole right away so you don’t disturb roots later.',
        upvotes: 33,
        isOfficialNursery: true,
        nurseryId: gangaNursery.id,
        nurserySlug: gangaNursery.slug,
        nurseryName: gangaNursery.name,
        nurseryAvatar: gangaNursery.avatar,
        nurseryRole: 'Verified Local Grower',
      },
      {
        id: 'ans-monstera-2',
        authorName: 'Devika K.',
        authorCity: 'Mumbai',
        timeAgo: '16 hours ago',
        isoDate: '2026-11-26T16:15:00.000Z',
        body: 'Adding a handful of horticultural charcoal to that exact mix made a huge difference in Mumbai’s monsoon humidity—zero musty smell even after two rainy weeks.',
        upvotes: 12,
      },
    ],
  },
  {
    id: 'q-fiddle-leaf-north-window',
    slug: 'can-fiddle-leaf-fig-thrive-near-north-facing-living-room-window',
    title: 'Can a Fiddle Leaf Fig thrive 3 feet from a bright north-facing window?',
    body: 'I’ve been eyeing the Fiddle Leaf Fig for our living room corner, which gets steady diffused sky light all day through a tall north-facing French window, but no direct sunbeams. We also run the AC for 4–5 hours at night in summer. Will it hold its leaves there, or should I look at a Peace Lily or Areca Palm instead?',
    plantName: 'Fiddle Leaf Fig',
    topicId: 'light-placement',
    authorName: 'Arjun Verma',
    authorCity: 'Gurugram',
    timeAgo: '2 days ago',
    isoDate: '2026-11-25T11:20:00.000Z',
    upvotes: 19,
    photo: '/images/fiddle-leaf.png',
    relatedProductSlug: 'fiddle-leaf-fig',
    answers: [
      {
        id: 'ans-fiddle-official',
        authorName: abhayNursery.name,
        timeAgo: '1 day ago',
        isoDate: '2026-11-25T15:00:00.000Z',
        body: 'If you can see a clear patch of open sky from that spot and keep the pot within 2–3 feet of the glass (not tucked behind a dark curtain), an acclimatised Fiddle Leaf Fig can do very well! Just make sure the AC vent does not blow directly onto its foliage—cold drafts trigger leaf drop faster than lower light. Rotate the pot a quarter turn every Sunday so it grows upright.',
        upvotes: 16,
        isOfficialNursery: true,
        nurseryId: abhayNursery.id,
        nurserySlug: abhayNursery.slug,
        nurseryName: abhayNursery.name,
        nurseryAvatar: abhayNursery.avatar,
        nurseryRole: 'Verified Local Grower',
      },
      {
        id: 'ans-fiddle-2',
        authorName: 'Priya Menon',
        authorCity: 'Hyderabad',
        timeAgo: '1 day ago',
        isoDate: '2026-11-25T18:45:00.000Z',
        body: 'Mine sits right beside a north-east glass sliding door and loves it! Cleaning dust off the big leaves with a damp cloth once every two weeks helps it absorb way more light.',
        upvotes: 8,
      },
    ],
  },
  {
    id: 'q-monstera-water-propagation',
    slug: 'when-to-move-water-propagated-pothos-and-monstera-cuttings-to-soil',
    title: 'When is the right time to move water-propagated cuttings into soil?',
    body: 'I took three stem cuttings with healthy aerial nodes from my trailing pothos and rooted them in a glass jar on my kitchen windowsill. The white roots are now about 2 inches long with a few secondary hair roots branching out. Last time I transferred cuttings to soil they wilted within a week. How do I transition them without shock?',
    plantName: 'Golden Pothos',
    topicId: 'propagation',
    authorName: 'Tanya Bose',
    authorCity: 'New Town, Kolkata',
    timeAgo: '3 days ago',
    isoDate: '2026-11-24T14:00:00.000Z',
    upvotes: 27,
    photo: '/images/customer-4.jpg',
    relatedProductSlug: 'golden-pothos',
    answers: [
      {
        id: 'ans-prop-1',
        authorName: 'Ritwik Das',
        authorCity: 'Ballygunge',
        timeAgo: '2 days ago',
        isoDate: '2026-11-24T17:30:00.000Z',
        body: '2–3 inches with secondary roots is the sweet spot! The trick that stopped mine from wilting was keeping the fresh soil slightly moister than usual for the first 10–12 days so the “water roots” have time to adapt into “soil roots”. After two weeks, gradually ease back to normal watering.',
        upvotes: 21,
      },
      {
        id: 'ans-prop-2',
        authorName: 'Nisha Kulkarni',
        authorCity: 'Pune',
        timeAgo: '2 days ago',
        isoDate: '2026-11-24T20:10:00.000Z',
        body: 'Also pot them in a snug 4-inch pot rather than a big pot—too much wet soil around baby roots slows them down. Mine started throwing new leaves in 3 weeks!',
        upvotes: 9,
      },
    ],
  },
  {
    id: 'q-peace-lily-brown-tips',
    slug: 'peace-lily-leaf-tips-turning-crispy-brown-tap-water-or-humidity',
    title: 'Peace Lily leaf tips turning crispy brown — is it hard tap water or dry air?',
    body: 'My Peace Lily has three gorgeous white spathes blooming right now, and the plant perks right back up whenever I water it. However, the very tips of several older leaves have turned dark brown and crispy. Could it be chlorine/minerals in municipal tap water, or should I set up a pebble tray?',
    plantName: 'Peace Lily',
    topicId: 'yellow-leaves',
    authorName: 'Madhuri Patel',
    authorCity: 'Ahmedabad',
    timeAgo: '4 days ago',
    isoDate: '2026-11-23T08:40:00.000Z',
    upvotes: 15,
    photo: '/images/peace-lily.png',
    relatedProductSlug: 'peace-lily',
    answers: [
      {
        id: 'ans-peace-official',
        authorName: edenNursery.name,
        timeAgo: '3 days ago',
        isoDate: '2026-11-23T12:15:00.000Z',
        body: 'Peace Lilies are famous little water snobs! Crisp brown tips on an otherwise blooming plant are almost always caused by dissolved salts or chlorine in hard tap water (very common in Ahmedabad). Try switching to RO/filtered water or tap water left standing in an open jug overnight. You can trim the brown tip following the leaf’s natural pointed shape with clean scissors.',
        upvotes: 14,
        isOfficialNursery: true,
        nurseryId: edenNursery.id,
        nurserySlug: edenNursery.slug,
        nurseryName: edenNursery.name,
        nurseryAvatar: edenNursery.avatar,
        nurseryRole: 'Verified Local Grower',
      },
    ],
  },
]

const QUESTIONS_STORAGE_KEY = 'arg-community-questions'
const ANSWERS_STORAGE_KEY = 'arg-community-answers'
const UPVOTES_STORAGE_KEY = 'arg-community-upvotes'

export function slugifyQuestion(title: string): string {
  const base = title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .slice(0, 56)
  return `${base || 'plant-question'}-${Date.now().toString(36).slice(-4)}`
}

function isValidQuestion(value: unknown): value is CommunityQuestion {
  if (!value || typeof value !== 'object') return false
  const item = value as Partial<CommunityQuestion>
  return (
    typeof item.id === 'string' &&
    typeof item.slug === 'string' &&
    typeof item.title === 'string' &&
    typeof item.body === 'string' &&
    typeof item.authorName === 'string' &&
    typeof item.topicId === 'string' &&
    Array.isArray(item.answers)
  )
}

export function readStoredQuestions(): CommunityQuestion[] {
  if (typeof window === 'undefined') return []
  try {
    const raw: unknown = JSON.parse(window.localStorage.getItem(QUESTIONS_STORAGE_KEY) ?? '[]')
    return Array.isArray(raw) ? raw.filter(isValidQuestion) : []
  } catch {
    return []
  }
}

export function saveStoredQuestion(question: CommunityQuestion): boolean {
  if (typeof window === 'undefined') return false
  try {
    const existing = readStoredQuestions().filter((q) => q.id !== question.id)
    window.localStorage.setItem(QUESTIONS_STORAGE_KEY, JSON.stringify([question, ...existing]))
    return true
  } catch {
    try {
      const existing = readStoredQuestions().filter((q) => q.id !== question.id)
      window.localStorage.setItem(
        QUESTIONS_STORAGE_KEY,
        JSON.stringify([{ ...question, photo: undefined }, ...existing]),
      )
      return true
    } catch {
      return false
    }
  }
}

export function readStoredAnswersMap(): Record<string, CommunityAnswer[]> {
  if (typeof window === 'undefined') return {}
  try {
    const raw: unknown = JSON.parse(window.localStorage.getItem(ANSWERS_STORAGE_KEY) ?? '{}')
    if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return {}
    return raw as Record<string, CommunityAnswer[]>
  } catch {
    return {}
  }
}

export function saveStoredAnswer(slug: string, answer: CommunityAnswer): boolean {
  if (typeof window === 'undefined') return false
  try {
    const map = readStoredAnswersMap()
    const current = Array.isArray(map[slug]) ? map[slug] : []
    map[slug] = [...current, answer]
    window.localStorage.setItem(ANSWERS_STORAGE_KEY, JSON.stringify(map))
    return true
  } catch {
    try {
      const map = readStoredAnswersMap()
      const current = Array.isArray(map[slug]) ? map[slug] : []
      map[slug] = [...current, { ...answer, photo: undefined }]
      window.localStorage.setItem(ANSWERS_STORAGE_KEY, JSON.stringify(map))
      return true
    } catch {
      return false
    }
  }
}

export function readUpvotedIds(): string[] {
  if (typeof window === 'undefined') return []
  try {
    const raw: unknown = JSON.parse(window.localStorage.getItem(UPVOTES_STORAGE_KEY) ?? '[]')
    return Array.isArray(raw) ? raw.filter((id): id is string => typeof id === 'string') : []
  } catch {
    return []
  }
}

export function saveUpvotedIds(ids: string[]): void {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(UPVOTES_STORAGE_KEY, JSON.stringify(ids))
  } catch {
    // Ignore storage quota errors
  }
}
