import { nurseries } from '@/components/store/products'

export type JournalCategoryId =
  | 'all'
  | 'seasonal-care'
  | 'urban-gardening'
  | 'plant-styling'
  | 'rare-exotics'
  | 'soil-fertilizers'

export type JournalCategory = {
  id: Exclude<JournalCategoryId, 'all'>
  label: string
  shortLabel: string
}

export type JournalAuthor = {
  name: string
  role: string
  bio: string
  avatar: string
  coverPhoto: string
  nurserySlug: string
  nurseryName: string
}

export type JournalStep = {
  title: string
  detail: string
}

export type JournalArticle = {
  slug: string
  title: string
  excerpt: string
  categoryId: Exclude<JournalCategoryId, 'all'>
  featuredTag?: string
  isFeatured?: boolean
  readTime: string
  publishedAt: string
  isoDate: string
  coverImage: string
  heroCaption: string
  author: JournalAuthor
  featuredProductSlugs: string[]
  leadParagraph: string
  bodyParagraphs: string[]
  pullQuote: {
    text: string
    attribution: string
  }
  stepsHeading: string
  steps: JournalStep[]
  closingParagraph: string
  careTip: string
}

export const journalCategories: JournalCategory[] = [
  { id: 'seasonal-care', label: 'Seasonal Care', shortLabel: 'Seasonal Care' },
  { id: 'urban-gardening', label: 'Urban Gardening', shortLabel: 'Urban Gardening' },
  { id: 'plant-styling', label: 'Plant Styling', shortLabel: 'Plant Styling' },
  { id: 'rare-exotics', label: 'Rare Exotics', shortLabel: 'Rare Exotics' },
  { id: 'soil-fertilizers', label: 'Soil & Fertilizers', shortLabel: 'Soil & Mixes' },
]

export function getJournalCategory(
  id: Exclude<JournalCategoryId, 'all'>,
): JournalCategory {
  return journalCategories.find((cat) => cat.id === id) ?? journalCategories[0]
}

const abhayNursery = nurseries[0]
const edenNursery = nurseries[1]
const gangaNursery = nurseries[2]

const authors: Record<'abhay' | 'rina' | 'subir', JournalAuthor> = {
  abhay: {
    name: 'Abhay Sen',
    role: 'Founder & Master Grower',
    bio: 'Abhay has spent over a decade cultivating acclimatised indoor foliage and tropical aroids on his South Kolkata rooftop. Every guide he writes comes straight from hands-on trials across Indian summers, monsoons, and mild winters.',
    avatar: abhayNursery.avatar,
    coverPhoto: '/images/hero-rooftop.png',
    nurserySlug: abhayNursery.slug,
    nurseryName: abhayNursery.name,
  },
  rina: {
    name: 'Rina Chakraborty',
    role: 'Horticulturist, Eden Green Nursery',
    bio: 'Rina leads foliage styling and low-light indoor acclimatisation at Eden Green Nursery in Salt Lake. She specialises in helping first-time apartment plant parents match the right species to real Indian windows.',
    avatar: edenNursery.avatar,
    coverPhoto: '/images/rooftop.png',
    nurserySlug: edenNursery.slug,
    nurseryName: edenNursery.name,
  },
  subir: {
    name: 'Subir Ghosh',
    role: 'Soil & Terracotta Specialist',
    bio: 'Subir crafts custom porous potting blends and breathable clay vessels at Ganga Terracotta & Foliage in Howrah. His focus is keeping tropical roots oxygenated through sticky coastal monsoons.',
    avatar: gangaNursery.avatar,
    coverPhoto: '/images/pot-terracotta.jpg',
    nurserySlug: gangaNursery.slug,
    nurseryName: gangaNursery.name,
  },
}

export const journalArticles: JournalArticle[] = [
  {
    slug: 'repotting-aroids-without-root-shock',
    title: "How to Repot Aroids Without Root Shock: A Rooftop Grower's Manual",
    excerpt:
      'Step-by-step terracotta and chunky mix techniques to upgrade your Monstera or Pothos without drooping leaves, stalled growth, or soggy roots.',
    categoryId: 'soil-fertilizers',
    featuredTag: 'Master Class',
    isFeatured: true,
    readTime: '6 min read',
    publishedAt: '18 Nov 2026',
    isoDate: '2026-11-18',
    coverImage: '/images/rooftop.png',
    heroCaption:
      'Morning light across our acclimatisation benches in South Kolkata, where every Monstera settles into airy coco-bark substrates before dispatch.',
    author: authors.abhay,
    featuredProductSlugs: ['monstera-deliciosa', 'golden-pothos'],
    leadParagraph:
      'Nothing makes a new plant parent hesitate faster than spotting white roots peeking out of a nursery pot’s drainage holes. Repotting feels like minor surgery—and when done with heavy garden clay or an oversized planter, tropical aroids often sulk for months. Yet with the right timing and an airy substrate, your Monstera or Pothos will reward you with bigger fenestrated leaves within weeks.',
    bodyParagraphs: [
      'On our rooftop, we never repot an aroid the very day it arrives in a new home. Always give a newly delivered plant 14 to 21 days to adjust to your apartment’s light and airflow first. Moving a plant into a new microclimate and disturbing its root ball simultaneously is the number-one cause of transplant shock.',
      'When you do see circling roots or water rushing straight through the pot within seconds, choose a new vessel that is strictly 1.5 to 2 inches wider than the current pot. A giant pot traps excess wet soil around undisturbed roots, cutting off oxygen during humid afternoons.',
    ],
    pullQuote: {
      text: 'Aroids do not grow in dense mud—they climb damp tree bark. If your potting mix still feels springy and crumbly when you squeeze a wet handful, your roots will thank you.',
      attribution: 'Abhay Sen, Founder & Master Grower',
    },
    stepsHeading: 'Four calm steps to a shock-free repot',
    steps: [
      {
        title: 'Water lightly 24 hours before repotting',
        detail:
          'Slightly hydrated roots are flexible and far less likely to snap than bone-dry ones. Avoid soaking the soil right before lifting, as heavy wet mud pulls on delicate feeder roots.',
      },
      {
        title: 'Build a chunky, breathable aroid mix',
        detail:
          'Combine 35% buffered coco peat, 25% coarse coco chips or pine bark, 20% perlite or cinder, 15% rich vermicompost, and 5% neem cake powder to deter fungus gnats naturally.',
      },
      {
        title: 'Tease only the tightest bottom roots',
        detail:
          'Never wash away every grain of old nursery soil unless you suspect root rot. Gently loosen the bottom third of the root ball with your thumbs so roots know they have fresh space to explore.',
      },
      {
        title: 'Anchor a moss pole and rest in bright shade',
        detail:
          'Settle the plant at the exact same soil depth, water until it trickles from the drainage hole, and keep it out of harsh afternoon sun for five days while fine root hairs re-establish.',
      },
    ],
    closingParagraph:
      'Resist the urge to fertilize for the first three weeks after repotting—your fresh vermicompost already supplies gentle trace nutrition while the root tips settle in. Once a new unfurling leaf appears, resume your regular bi-weekly liquid kelp or seaweed tonic.',
    careTip:
      'Best repotting window in India: late February through April, or early October to mid-November when temperatures stay warm without extreme heat stress.',
  },
  {
    slug: 'winter-balcony-care-indian-apartments',
    title: 'Winter Care for Tropical Houseplants in Indian Apartments',
    excerpt:
      'How to dial back watering, prevent cold draft leaf drop, and keep Fiddle Leaf Figs and palms glossy from November through February.',
    categoryId: 'seasonal-care',
    readTime: '5 min read',
    publishedAt: '12 Nov 2026',
    isoDate: '2026-11-12',
    coverImage: '/images/hero-rooftop.png',
    heroCaption:
      'Soft winter sun on Bengal rooftop benches—ideal for nudging indoor tropicals a couple of feet closer to east windows.',
    author: authors.abhay,
    featuredProductSlugs: ['fiddle-leaf-fig', 'areca-palm'],
    leadParagraph:
      'As crisp morning breezes sweep across Kolkata, Delhi, and Pune each November, your tropical houseplants quietly shift into a slower rhythm. Shorter daylight hours mean leaves photosynthesise less, and potting soil stays damp almost twice as long as it did in May.',
    bodyParagraphs: [
      'Most winter plant casualties have nothing to do with frost—they happen because we keep watering on our summer schedule. Before lifting your watering can, push a clean finger or wooden skewer two inches deep into the soil. If it comes up cool or dark, wait another three days.',
      'Winter is also the best season to let gentle morning sun reach foliage that usually needs sheer curtains in summer. Shifting your Fiddle Leaf Fig or Areca Palm two feet closer to an east-facing window restores lost winter brightness without risking scorch.',
    ],
    pullQuote: {
      text: 'In winter, slightly underwatered roots bounce back overnight; cold, waterlogged roots rarely forgive.',
      attribution: 'Abhay Sen, Rooftop Notes',
    },
    stepsHeading: 'Your 4-point winter routine',
    steps: [
      {
        title: 'Cut watering frequency by 35–40%',
        detail:
          'Water in the late morning using room-temperature water rather than icy early-morning tap water so roots never experience thermal shock.',
      },
      {
        title: 'Pause heavy nitrogen fertilizers',
        detail:
          'Hold off strong liquid feeds between December and mid-February. Plants resting in cooler months cannot absorb excess salts, which quickly brown leaf tips.',
      },
      {
        title: 'Wipe dust off broad leaves fortnightly',
        detail:
          'Winter smog and indoor dust coat wide leaves like Fiddle Leaf Figs and Monsteras. A soft damp cotton cloth restores light absorption immediately.',
      },
      {
        title: 'Shield foliage from cold night drafts',
        detail:
          'Keep tender tropicals a foot away from chilly balcony door cracks or night-time room heaters that strip ambient humidity.',
      },
    ],
    closingParagraph:
      'By mid-February, as daylight stretches longer and nights warm up, you will spot plump new buds swelling at the crown. That is your cue to resume light organic feeding and celebrate spring growth.',
    careTip:
      'Use lukewarm standing water for winter watering—especially for sensitive palms and Peace Lilies.',
  },
  {
    slug: 'styling-low-light-corners-with-living-foliage',
    title: 'Styling Shady Living Room Corners That Actually Keep Plants Thriving',
    excerpt:
      'Design warm, architectural indoor corners using resilient Snake Plants and Peace Lilies without sacrificing botanical health.',
    categoryId: 'plant-styling',
    readTime: '4 min read',
    publishedAt: '05 Nov 2026',
    isoDate: '2026-11-05',
    coverImage: '/images/stage-peace-lily.png',
    heroCaption:
      'Pairing sculptural dark foliage with matte cream ceramics lifts muted interior corners while keeping soil breathable.',
    author: authors.rina,
    featuredProductSlugs: ['peace-lily', 'snake-plant'],
    leadParagraph:
      'Every apartment has that one quiet hallway alcove or sofa-side nook that begs for greenery—yet sits eight feet away from the nearest balcony door. Too often, sun-loving plants get tucked there for aesthetics and slowly fade within a month.',
    bodyParagraphs: [
      'The secret to designer-worthy indoor greenery is pairing architectural planters with true shade-tolerant species. Snake Plants bring vertical sword-like structure to narrow corners, while Peace Lilies soften sharp furniture edges with glossy arching foliage and bright ivory spathes.',
      'Pay attention to height layering too: placing a medium ceramic pot on a simple 10-inch teak or cane plant stand lifts leaves closer to bounced ceiling light and creates effortless visual rhythm beside a reading chair.',
    ],
    pullQuote: {
      text: 'Good plant styling starts with honesty about light. A healthy Snake Plant in a quiet corner always looks ten times richer than a struggling sun-lover.',
      attribution: 'Rina Chakraborty, Eden Green Nursery',
    },
    stepsHeading: 'How to style shaded corners sustainably',
    steps: [
      {
        title: 'Read the shadow test at noon',
        detail:
          'Hold your hand above the spot at midday. If you can comfortably read a paperback book without switching on a lamp, Snake Plants, ZZ Plants, and Peace Lilies will happily settle there.',
      },
      {
        title: 'Use matte light-toned pots to bounce daylight',
        detail:
          'Off-white stoneware or pale sandstone planters reflect ambient window light back onto lower stems while keeping your room feeling airy and calm.',
      },
      {
        title: 'Rotate a quarter turn every Sunday',
        detail:
          'Plants naturally lean toward distant windows. Giving each pot a gentle quarter-turn during weekend watering keeps silhouettes balanced and symmetrical.',
      },
      {
        title: 'Swap corners once a month for a light boost',
        detail:
          'If a nook is especially dim, rotate two matching plants between a bright sill and the shaded corner every four weeks so both stay vigorous year-round.',
      },
    ],
    closingParagraph:
      'Remember that low-light plants drink far less water than balcony plants. Let Snake Plant soil dry nearly all the way through between drinks, and wait for your Peace Lily’s leaves to just barely soften before watering.',
    careTip:
      'Always keep a subtle saucer or waterproof felt pad beneath ceramic planters to protect wooden floors and sideboards.',
  },
  {
    slug: 'monsoon-proof-chunky-aroid-soil-recipe',
    title: 'The Monsoon-Proof Chunky Soil Recipe Every Balcony Grower Needs',
    excerpt:
      'Stop root rot before July rains arrive with a breathable five-ingredient potting blend engineered for Indian humidity.',
    categoryId: 'soil-fertilizers',
    readTime: '5 min read',
    publishedAt: '28 Oct 2026',
    isoDate: '2026-10-28',
    coverImage: '/images/fertilizer.jpg',
    heroCaption:
      'Organic vermicompost, coarse coco chips, and neem cake form the backbone of our aerated rooftop blends.',
    author: authors.subir,
    featuredProductSlugs: ['monstera-deliciosa', 'spider-plant'],
    leadParagraph:
      'Traditional red garden soil works wonders in open ground where earthworms tunnel freely, but inside an apartment pot during a four-day monsoon downpour, dense garden clay turns into airless cement. Within 72 hours, suffocated roots begin to blacken.',
    bodyParagraphs: [
      'A truly great container mix does two opposite jobs at once: it holds just enough moisture for thirsty feeder roots while letting excess rainwater pour freely through the bottom drainage hole in under ten seconds.',
      'At Ganga Terracotta & Foliage, we blend coarse organic chunks with mineral grit so even beginner plant parents find it almost impossible to overwater their pots.',
    ],
    pullQuote: {
      text: 'Roots breathe oxygen just as much as leaves breathe carbon dioxide. Open air pockets inside your soil are your best insurance against rot.',
      attribution: 'Subir Ghosh, Soil & Terracotta Specialist',
    },
    stepsHeading: 'Mixing your 5-part monsoon blend at home',
    steps: [
      {
        title: 'Start with 35% rinsed, low-EC coco peat',
        detail:
          'Coco peat retains gentle moisture without compacting. Always rinse compressed bricks thoroughly so excess sea salts wash away before mixing.',
      },
      {
        title: 'Add 25% chunky coco husk chips or orchid bark',
        detail:
          'Large fibrous chunks create permanent air channels that keep roots vigorous even during week-long rainy spells.',
      },
      {
        title: 'Fold in 20% perlite, pumice, or washed cinder',
        detail:
          'Mineral aeration never breaks down over time, keeping the pot lightweight and fast-draining for two full growing seasons.',
      },
      {
        title: 'Finish with 15% vermicompost + 5% neem cake',
        detail:
          'Vermicompost feeds slow-release micronutrients while a spoonful of neem cake powder naturally discourages soil-dwelling fungus gnats.',
      },
    ],
    closingParagraph:
      'Store leftover dry potting mix in a breathable cloth sack or lidded bucket on your balcony so it stays fluffy and ready whenever a cutting roots or a plant outgrows its pot.',
    careTip:
      'Pair chunky soil with unglazed terracotta pots for plants prone to overwatering—terracotta walls wick away excess moisture naturally.',
  },
  {
    slug: 'rare-exotic-foliage-beginners-guide',
    title: 'Fiddle Leaf Fig & Fenestrated Monsteras: Acclimatising Statement Plants',
    excerpt:
      'How our Bengal rooftop growers harden tall architectural foliage for Indian living rooms—and what to do in their first 30 days home.',
    categoryId: 'rare-exotics',
    readTime: '6 min read',
    publishedAt: '19 Oct 2026',
    isoDate: '2026-10-19',
    coverImage: '/images/stage-monstera.png',
    heroCaption:
      'Tall, sculptural foliage transforms a living room instantly once it settles into a steady bright spot.',
    author: authors.abhay,
    featuredProductSlugs: ['fiddle-leaf-fig', 'monstera-deliciosa'],
    leadParagraph:
      'Statement plants like the Fiddle Leaf Fig and mature Monstera Deliciosa have an undeserved reputation for being fussy. In reality, most disappointment starts before the plant even reaches your doorstep—when greenhouse-pampered stock is shipped straight into dry indoor air without hardening.',
    bodyParagraphs: [
      'Every tall statement plant in our collective spends weeks under filtered rooftop shade nets, learning to handle real breeze, natural humidity swings, and diurnal temperature shifts. By the time it arrives at your door, its stems are sturdy and its cuticle layer is resilient.',
      'Your only job during the first month is consistency. Pick one bright spot near an east or south-east window—and resist moving the pot around the house every few days.',
    ],
    pullQuote: {
      text: 'A Fiddle Leaf Fig does not mind modest light nearly as much as it dislikes changing its address every week. Pick one bright window and let it claim its corner.',
      attribution: 'Abhay Sen, Founder & Master Grower',
    },
    stepsHeading: 'The first-30-days settling playbook',
    steps: [
      {
        title: 'Unbox gently and hydrate only if dry',
        detail:
          'Remove the coco-fibre moisture lock and let leaves unfurl for a few hours. Check soil two inches down before giving a slow, thorough drink.',
      },
      {
        title: 'Choose bright, filtered sky light',
        detail:
          'Aim for 3 to 5 hours of bright indirect light daily. Direct midday summer glare through glass can singe dark leaves, while morning sunbeams encourage dramatic splits.',
      },
      {
        title: 'Keep AC vents angled away from foliage',
        detail:
          'Cold dry blasts from split ACs pull moisture out of large leaves rapidly. A simple deflector or 4-foot offset keeps leaf edges crisp and unblemished.',
      },
      {
        title: 'Support climbing stems early',
        detail:
          'Give your Monstera a coir or moss pole behind its aerial-root side so every subsequent leaf grows larger and more intricately fenestrated.',
      },
    ],
    closingParagraph:
      'Do not panic if a single oldest lower leaf yellows during week two—it is a normal settling adjustment. Focus on the growing tip at the top: bright green new growth is the surest sign your statement plant feels right at home.',
    careTip:
      'Mist aerial roots lightly twice a week in dry months, or group two plants together to create a gentle natural humidity pocket.',
  },
  {
    slug: 'small-balcony-terracotta-jungle-blueprint',
    title: 'Turning a 4-Foot City Balcony into a Blooming Terracotta Sanctuary',
    excerpt:
      'Smart vertical layering, sun-loving hibiscus blooms, and breathable clay pots that turn compact urban ledges into lush retreats.',
    categoryId: 'urban-gardening',
    readTime: '5 min read',
    publishedAt: '10 Oct 2026',
    isoDate: '2026-10-10',
    coverImage: '/images/pot-terracotta.jpg',
    heroCaption:
      'Warm handmade clay vessels unify mismatched plants and keep root zones cool during intense Indian afternoons.',
    author: authors.subir,
    featuredProductSlugs: ['red-hibiscus', 'jade-plant'],
    leadParagraph:
      'You do not need a sprawling terrace to wake up to crimson hibiscus blooms and morning tea beside living green walls. Even a four-foot city apartment balcony holds enough vertical space for twelve thriving plants—without ever feeling cluttered underfoot.',
    bodyParagraphs: [
      'The trick is unifying your pot palette and thinking in three vertical tiers: railing-height sun lovers, mid-level stepped benches, and trailing vines cascading down from wall hooks.',
      'Unglazed Indian terracotta does double duty on sunlit balconies. Its earthy tone makes green leaves pop effortlessly, and evaporative cooling through porous clay walls keeps roots several degrees cooler than black plastic tubs during April heatwaves.',
    ],
    pullQuote: {
      text: 'When every pot shares a warm terracotta family of tones, even ten different plant shapes read as one calm, intentional garden.',
      attribution: 'Subir Ghosh, Ganga Terracotta & Foliage',
    },
    stepsHeading: 'Designing your compact balcony in 4 layers',
    steps: [
      {
        title: 'Map your sun hours before buying',
        detail:
          'Put flowering Red Hibiscus and plump Jade Plants along the sunniest outer edge where they soak up 4+ hours of direct sunshine.',
      },
      {
        title: 'Use a narrow two-tier plant bench',
        detail:
          'A slim 12-inch deep wooden or wrought-iron step rack doubles your planting footprint while keeping floor space clear for sweeping and morning chairs.',
      },
      {
        title: 'Hang trailing pothos along the shaded wall',
        detail:
          'Trailing vines soften bare apartment plaster and thrive in the bright reflected light bouncing off your sunny balcony rail.',
      },
      {
        title: 'Mulch soil tops with river pebbles or bark',
        detail:
          'A thin top-dressing slows summer evaporation by nearly a third and stops muddy splashes from staining balcony tiles when you water.',
      },
    ],
    closingParagraph:
      'Start with four or five core plants and live with them for a month before adding more. Watching how the sun shifts across your railing each week will show you exactly where the next terracotta pot belongs.',
    careTip:
      'Soak brand-new unglazed terracotta pots in water for 20 minutes before potting so the dry clay doesn’t steal the first watering from your plant.',
  },
  {
    slug: 'gifting-living-plants-that-outlast-bouquets',
    title: 'Why Living Rooftop Plants Make Better Housewarming Gifts Than Bouquets',
    excerpt:
      'From lucky Jade Plants to calming Peace Lilies, choose low-fuss living gifts that settle gracefully into any friend’s new home.',
    categoryId: 'plant-styling',
    readTime: '4 min read',
    publishedAt: '02 Oct 2026',
    isoDate: '2026-10-02',
    coverImage: '/images/gifting.jpg',
    heroCaption:
      'Hand-packed living gift plants arrive ready to display with breathable pots and simple care cards.',
    author: authors.rina,
    featuredProductSlugs: ['jade-plant', 'peace-lily'],
    leadParagraph:
      'Cut flowers fade by Friday, leaving behind a wilting stem and an empty vase. A potted living plant, by contrast, grows alongside the memories of a new home—sending out fresh shoots months after the housewarming boxes have been unpacked.',
    bodyParagraphs: [
      'When gifting a plant to someone whose schedule or window light you don’t know well, resilience matters most. Skip finicky ferns and pick forgiving companions like the auspicious Jade Plant for sunny study desks or a graceful Peace Lily for bright living rooms.',
      'Presenting the plant already settled inside a clean ceramic or terracotta pot removes the chore of repotting and lets your friend place it straight onto their coffee table or console.',
    ],
    pullQuote: {
      text: 'The best plant gift never feels like homework—it brings quiet life to a room and forgives a forgotten weekend watering.',
      attribution: 'Rina Chakraborty, Eden Green Nursery',
    },
    stepsHeading: 'How to pick a thoughtful living gift',
    steps: [
      {
        title: 'Match personality with care ease',
        detail:
          'For busy professionals or frequent travellers, a Jade Plant or Snake Plant thrives happily on minimal attention.',
      },
      {
        title: 'Check for furry family members',
        detail:
          'If your friend has curious cats or dogs, opt for pet-friendly winners like an Areca Palm or Spider Plant.',
      },
      {
        title: 'Include a handwritten spot suggestion',
        detail:
          'Jot one simple line on the gift note—like “Loves your bright east window and a sip every Sunday”—so they feel confident from day one.',
      },
    ],
    closingParagraph:
      'Every gift order from our rooftop collective travels in plastic-free breathable sleeves with a printed botanical care card tucked inside, ready to brighten a friend’s doorway.',
    careTip:
      'Jade Plants are cherished as symbols of steady growth and prosperity—ideal for housewarmings, new studios, and festive gifting.',
  },
]

export function getJournalArticleBySlug(slug: string): JournalArticle | undefined {
  return journalArticles.find((article) => article.slug === slug)
}
