import Image from 'next/image'
import { ArrowRight, ArrowUpRight, Leaf, ShieldCheck, Star, Truck } from 'lucide-react'
import { HeroProductCard } from './hero-product-card'

const categories = [
  { name: 'Indoor Plants', count: 120, image: '/images/cat-indoor.png', alt: 'Snake plant in terracotta pot' },
  { name: 'Flowering', count: 64, image: '/images/cat-flowering.png', alt: 'Pink bougainvillea in terracotta pot' },
  { name: 'Succulents', count: 48, image: '/images/cat-succulents.png', alt: 'Succulents in small ceramic pots' },
  { name: 'Herbs & Edibles', count: 36, image: '/images/cat-herbs.png', alt: 'Basil, tulsi and mint in terracotta pots' },
]

const perks = [
  { icon: Truck, title: 'Free delivery', text: 'On orders over ₹999' },
  { icon: ShieldCheck, title: '7-day guarantee', text: 'Arrives healthy, or we replace' },
  { icon: Leaf, title: 'Homegrown', text: 'Raised on our own rooftop' },
]

export function Hero() {
  return (
    <section aria-labelledby="hero-heading" className="relative overflow-hidden">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 pt-8 pb-10 sm:px-6 lg:grid-cols-12 lg:gap-12 lg:px-8 lg:pt-14 lg:pb-16">
        <div className="flex flex-col justify-center lg:col-span-6 xl:col-span-5">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-secondary-foreground">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-accent" />
            </span>
            New season arrivals now in stock
          </div>

          <h1
            id="hero-heading"
            className="mt-5 font-serif text-4xl leading-[1.05] font-medium tracking-tight text-balance sm:text-5xl lg:text-6xl xl:text-7xl"
          >
            Shop plants grown with <em className="font-normal text-primary italic">love,</em> delivered to your door.
          </h1>

          <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground text-pretty sm:text-lg">
            Healthy, nursery-fresh plants from our rooftop to your home. Hand-picked, carefully packed and backed by our plant care team.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#"
              className="group inline-flex h-13 items-center justify-center gap-2 rounded-full bg-primary px-7 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-colors hover:bg-primary/90"
            >
              Shop All Plants
              <ArrowRight className="size-4.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </a>
            <a
              href="#"
              className="inline-flex h-13 items-center justify-center rounded-full border border-foreground/15 bg-card px-7 text-base font-semibold transition-colors hover:border-primary hover:text-primary"
            >
              Find Your Perfect Plant
            </a>
          </div>

          <div className="mt-8 flex items-center gap-4">
            <div className="flex -space-x-2" aria-hidden="true">
              {['bg-secondary', 'bg-accent/80', 'bg-primary', 'bg-muted'].map((bg, i) => (
                <span
                  key={bg}
                  className={`flex size-9 items-center justify-center rounded-full border-2 border-background text-xs font-semibold ${bg} ${i === 2 ? 'text-primary-foreground' : 'text-foreground'}`}
                >
                  {['RS', 'PK', 'AM', 'NJ'][i]}
                </span>
              ))}
            </div>
            <div>
              <div className="flex items-center gap-0.5" aria-label="Rated 4.9 out of 5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-4 fill-accent text-accent" aria-hidden="true" />
                ))}
                <span className="ml-1.5 text-sm font-semibold">4.9</span>
              </div>
              <p className="text-sm text-muted-foreground">Loved by 5,000+ plant parents</p>
            </div>
          </div>
        </div>

        <div className="relative lg:col-span-6 xl:col-span-7">
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-muted sm:aspect-[5/4] lg:aspect-auto lg:h-full lg:min-h-[560px]">
            <Image
              src="/images/hero-rooftop.png"
              alt="Rows of healthy potted plants at Abhay's rooftop nursery in golden hour light"
              fill
              priority
              sizes="(min-width: 1280px) 58vw, (min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 via-transparent to-transparent" aria-hidden="true" />

            <div className="absolute top-4 right-4 flex flex-col items-center justify-center rounded-full bg-accent text-accent-foreground size-20 sm:size-24 shadow-lg">
              <span className="text-[10px] font-semibold uppercase tracking-wider sm:text-xs">Up to</span>
              <span className="font-serif text-2xl leading-none font-semibold sm:text-3xl">25%</span>
              <span className="text-[10px] font-semibold uppercase tracking-wider sm:text-xs">Off</span>
            </div>

            <div className="absolute inset-x-3 bottom-3 sm:inset-x-auto sm:bottom-5 sm:left-5">
              <HeroProductCard />
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-serif text-2xl font-medium tracking-tight sm:text-3xl">Shop by category</h2>
          <a href="#" className="group inline-flex items-center gap-1 text-sm font-semibold text-primary">
            View all
            <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
          </a>
        </div>
        <ul className="no-scrollbar -mx-4 mt-5 flex snap-x snap-mandatory scroll-px-4 gap-3 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-4 sm:gap-4 sm:overflow-visible sm:px-0">
          {categories.map((cat) => (
            <li key={cat.name} className="w-[42%] shrink-0 snap-start sm:w-auto">
              <a href="#" className="group block">
                <div className="relative aspect-square overflow-hidden rounded-2xl bg-muted">
                  <Image
                    src={cat.image}
                    alt={cat.alt}
                    fill
                    sizes="(min-width: 640px) 25vw, 42vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="mt-3 flex items-center justify-between gap-2">
                  <div>
                    <h3 className="text-sm font-semibold sm:text-base">{cat.name}</h3>
                    <p className="text-xs text-muted-foreground sm:text-sm">{cat.count} plants</p>
                  </div>
                  <span className="hidden size-8 items-center justify-center rounded-full border border-border transition-colors group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground sm:flex">
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </span>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="mx-auto mt-10 max-w-7xl px-4 pb-12 sm:px-6 lg:mt-14 lg:px-8 lg:pb-16">
        <ul className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-3">
          {perks.map(({ icon: Icon, title, text }) => (
            <li key={title} className="flex items-center gap-4 bg-card px-5 py-4 sm:py-5">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-secondary text-primary">
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <div>
                <p className="text-sm font-semibold">{title}</p>
                <p className="text-sm text-muted-foreground">{text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
