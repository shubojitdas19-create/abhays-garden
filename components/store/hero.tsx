'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ArrowRight, Asterisk, Check, Droplets, Star, Sun } from 'lucide-react'
import { useCart } from './cart-context'
import { formatINR, products } from './products'
import { RooftopStamp } from './rooftop-stamp'

const stageImages: Record<string, string> = {
  monstera: '/images/stage-monstera.png',
  'peace-lily': '/images/stage-peace-lily.png',
  areca: '/images/stage-areca.png',
}

const featured = products.filter((p) => p.id in stageImages)

const promises = [
  'Free delivery over ₹999',
  '7-day healthy arrival guarantee',
  'Packed in coir, not plastic',
  'Hand-watered on our rooftop',
  'Free care call with every plant',
]

const careLabel = { 1: 'Easy care', 2: 'Some care', 3: 'Green thumb' } as const

export function Hero() {
  const { addItem } = useCart()
  const [activeIndex, setActiveIndex] = useState(0)
  const [sizeIndex, setSizeIndex] = useState(1)
  const [addedId, setAddedId] = useState<string | null>(null)

  const plant = featured[activeIndex]
  const size = plant.sizes[sizeIndex]

  function selectPlant(index: number) {
    setActiveIndex(index)
    setSizeIndex(1)
    setAddedId(null)
  }

  function handleAdd() {
    addItem()
    setAddedId(plant.id)
    window.setTimeout(() => setAddedId(null), 1800)
  }

  return (
    <section aria-labelledby="hero-heading" className="relative overflow-hidden bg-primary text-primary-foreground">
      <div className="mx-auto grid max-w-7xl gap-x-12 px-4 pt-10 pb-14 sm:px-6 lg:grid-cols-12 lg:px-8 lg:pt-16 lg:pb-20">
        <div className="lg:col-span-6 lg:row-start-1">
          <p className="flex items-center gap-3 text-xs font-semibold tracking-[0.2em] text-sun uppercase">
            <span className="h-px w-8 bg-sun" aria-hidden="true" />
            The Rooftop Edit — Autumn
          </p>

          <h1
            id="hero-heading"
            className="mt-6 font-serif text-[2.9rem] leading-[0.95] font-normal tracking-tight sm:text-6xl lg:text-[3.75rem] xl:text-[4.25rem]"
          >
            Grown on our roof.
            <span className="block text-sun italic">Ready for your home.</span>
          </h1>

          <p className="mt-6 max-w-md text-base leading-relaxed text-primary-foreground/75 text-pretty sm:text-lg">
            Every plant here was potted, watered and cared for by hand on our rooftop. Choose one below and it ships straight from our roof to your door.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4">
            <a
              href="#bestsellers-heading"
              className="group inline-flex h-13 items-center gap-2 rounded-full bg-primary-foreground px-7 text-base font-semibold text-primary transition-colors hover:bg-sun hover:text-forest-deep"
            >
              Shop all plants
              <ArrowRight className="size-4.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </a>
            <a
              href="#"
              className="text-base font-semibold underline decoration-sun decoration-2 underline-offset-[6px] transition-colors hover:text-sun"
            >
              Not sure? Take the plant quiz
            </a>
          </div>
        </div>

        <div className="relative mt-12 pb-24 sm:pb-16 lg:col-span-6 lg:col-start-7 lg:row-span-2 lg:row-start-1 lg:mt-0 lg:pb-0 lg:pl-6">
          <div className="relative mx-auto aspect-[4/5] max-w-md overflow-hidden rounded-t-full rounded-b-3xl bg-forest-deep ring-1 ring-primary-foreground/15 lg:max-w-none">
            {featured.map((p, i) => (
              <Image
                key={p.id}
                src={stageImages[p.id]}
                alt={i === activeIndex ? `${p.name} in a terracotta pot on our rooftop` : ''}
                fill
                priority={i === 0}
                sizes="(min-width: 1024px) 45vw, (min-width: 640px) 28rem, 100vw"
                className={`object-cover object-[center_70%] transition-[opacity,transform] duration-700 ease-out ${
                  i === activeIndex ? 'scale-100 opacity-100' : 'scale-105 opacity-0'
                }`}
              />
            ))}
          </div>

          <RooftopStamp className="absolute top-4 right-0 z-10 size-24 shadow-xl shadow-black/20 sm:right-4 lg:top-8 lg:-right-2 lg:size-28" />

          <PlantTag
            key={plant.id}
            plant={plant}
            sizeIndex={sizeIndex}
            onSizeChange={setSizeIndex}
            onAdd={handleAdd}
            added={addedId === plant.id}
            price={size.price}
            mrp={size.mrp}
          />
        </div>

        <div className="mt-6 lg:col-span-6 lg:row-start-2 lg:mt-12">
          <p className="text-xs font-semibold tracking-[0.2em] text-primary-foreground/60 uppercase">On the roof this week</p>
          <ul className="mt-3 divide-y divide-primary-foreground/15 border-y border-primary-foreground/15">
            {featured.map((p, i) => {
              const active = i === activeIndex
              return (
                <li key={p.id}>
                  <button
                    type="button"
                    onClick={() => selectPlant(i)}
                    aria-pressed={active}
                    className={`group flex w-full items-center gap-4 py-3.5 text-left transition-colors sm:gap-6 ${
                      active ? 'text-primary-foreground' : 'text-primary-foreground/55 hover:text-primary-foreground'
                    }`}
                  >
                    <span className={`w-6 font-sans text-xs tabular-nums ${active ? 'text-sun' : ''}`}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="flex-1">
                      <span className="block font-serif text-xl sm:text-2xl">{p.name}</span>
                      <span className="block text-xs italic opacity-75">{p.botanical}</span>
                    </span>
                    <span className="text-sm tabular-nums">from {formatINR(p.sizes[0].price)}</span>
                    <ArrowRight
                      className={`size-4 transition-all ${active ? 'translate-x-0 text-sun opacity-100' : '-translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100'}`}
                      aria-hidden="true"
                    />
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
      </div>

      <div className="border-t border-primary-foreground/15 bg-forest-deep py-4">
        <div className="flex w-max motion-safe:animate-marquee motion-reduce:flex-wrap">
          {[0, 1].map((copy) => (
            <ul key={copy} className="flex shrink-0 items-center" aria-hidden={copy === 1}>
              {promises.map((text) => (
                <li key={text} className="flex items-center gap-6 pr-6 text-sm font-medium whitespace-nowrap text-primary-foreground/85">
                  {text}
                  <Asterisk className="size-4 text-sun" aria-hidden="true" />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  )
}

type PlantTagProps = {
  plant: (typeof featured)[number]
  sizeIndex: number
  onSizeChange: (i: number) => void
  onAdd: () => void
  added: boolean
  price: number
  mrp?: number
}

function PlantTag({ plant, sizeIndex, onSizeChange, onAdd, added, price, mrp }: PlantTagProps) {
  return (
    <div className="absolute bottom-0 left-2 w-[82%] max-w-[19rem] origin-top -rotate-2 motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-2 sm:left-6 lg:bottom-10 lg:-left-10">
      <span className="absolute -top-10 left-9 h-12 w-px bg-primary-foreground/50" aria-hidden="true" />
      <div className="relative rounded-2xl bg-card p-5 text-card-foreground shadow-2xl shadow-black/30">
        <span className="absolute top-3 left-7 size-3.5 rounded-full bg-primary ring-4 ring-muted" aria-hidden="true" />
        <div className="flex items-start justify-between gap-3 pl-8">
          <span className="text-[11px] font-semibold tracking-[0.18em] text-muted-foreground uppercase">No. {plant.tag}</span>
          <span className="flex items-center gap-1 text-xs font-semibold">
            <Star className="size-3.5 fill-accent text-accent" aria-hidden="true" />
            {plant.rating}
            <span className="font-normal text-muted-foreground">({plant.reviews})</span>
          </span>
        </div>

        <h2 className="mt-3 font-serif text-2xl leading-tight font-medium">{plant.name}</h2>
        <p className="text-sm text-muted-foreground italic">{plant.botanical}</p>

        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-secondary-foreground">
          <span className="flex items-center gap-1">
            <Sun className="size-3.5" aria-hidden="true" />
            {plant.light}
          </span>
          <span className="flex items-center gap-1">
            <Droplets className="size-3.5" aria-hidden="true" />
            {careLabel[plant.care]}
          </span>
        </div>

        <div className="mt-4 flex items-center justify-between gap-3 border-t border-dashed border-border pt-4">
          <div role="radiogroup" aria-label="Pot size" className="flex gap-1.5">
            {plant.sizes.map((s, i) => (
              <button
                key={s.label}
                type="button"
                role="radio"
                aria-checked={i === sizeIndex}
                onClick={() => onSizeChange(i)}
                className={`size-8 rounded-full text-xs font-semibold transition-colors ${
                  i === sizeIndex ? 'bg-primary text-primary-foreground' : 'border border-border hover:border-primary'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
          <p className="text-right">
            <span className="font-serif text-2xl font-semibold tabular-nums">{formatINR(price)}</span>
            {mrp && (
              <span className="ml-1.5 text-xs text-muted-foreground line-through">
                <span className="sr-only">was </span>
                {formatINR(mrp)}
              </span>
            )}
          </p>
        </div>

        <button
          type="button"
          onClick={onAdd}
          className="mt-4 inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-accent text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent/90"
        >
          {added ? (
            <>
              <Check className="size-4" aria-hidden="true" /> Added to cart
            </>
          ) : (
            'Add to cart'
          )}
        </button>
        <span className="sr-only" aria-live="polite">
          {added ? `${plant.name} added to cart` : ''}
        </span>
      </div>
    </div>
  )
}
