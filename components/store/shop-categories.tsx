import Image from 'next/image'
import { ArrowRight, ArrowUpRight } from 'lucide-react'

const categories = [
  { name: 'Indoor Plants', count: 120, image: '/images/cat-indoor.png', alt: 'Snake plant in terracotta pot' },
  { name: 'Flowering', count: 64, image: '/images/cat-flowering.png', alt: 'Pink bougainvillea in terracotta pot' },
  { name: 'Succulents', count: 48, image: '/images/cat-succulents.png', alt: 'Succulents in small ceramic pots' },
  { name: 'Herbs & Edibles', count: 36, image: '/images/cat-herbs.png', alt: 'Basil, tulsi and mint in terracotta pots' },
]

export function ShopCategories() {
  return (
    <section aria-labelledby="categories-heading" className="mx-auto max-w-7xl px-4 pt-14 pb-4 sm:px-6 lg:px-8 lg:pt-20">
      <div className="flex items-end justify-between gap-4">
        <h2 id="categories-heading" className="font-serif text-2xl font-medium tracking-tight sm:text-3xl">
          Shop by category
        </h2>
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
    </section>
  )
}
