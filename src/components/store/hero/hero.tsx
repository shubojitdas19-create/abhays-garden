'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { ArrowRight, Check, Heart, Plus, ShieldCheck, Truck, Leaf, Star, StarHalf, ShoppingBag } from 'lucide-react'
import { useCart } from '@/components/store/cart-context'
import { formatINR, products } from '@/components/store/products'

// Map the featured plants to their standard brightly lit images
const cardImages: Record<string, string> = {
  monstera: '/images/monstera.png',
  'peace-lily': '/images/peace-lily.png',
  areca: '/images/areca.png',
}

const featured = products.filter((p) => p.id in cardImages)
const careLabel = { 1: 'Easy care', 2: 'Some care', 3: 'Green thumb' } as const
const cats = ["Air Purifying", "Low Light", "Pet Friendly", "Bestsellers", "Under ₹499"]

export function Hero() {
  const { addItem, wishlist, toggleWishlist } = useCart()
  const [activeIndex, setActiveIndex] = useState(0)
  const [addedId, setAddedId] = useState<string | null>(null)

  // Auto-slideshow interval
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((current) => (current + 1) % featured.length)
      setAddedId(null)
    }, 5000) // Changes every 5 seconds
    
    return () => clearInterval(timer)
  }, [])

  const plant = featured[activeIndex]
  const size = plant?.sizes[0]

  function handleAdd() {
    if (!plant) return
    if (!size) return
    addItem({
      productId: plant.id,
      productName: plant.name,
      size: size.label,
      pot: 'Standard Eco Nursery Pot',
      price: size.price,
      image: plant.image,
      nurseryName: plant.nursery.name,
    })
    setAddedId(plant.id)
    window.setTimeout(() => setAddedId(null), 1800)
  }

  if (!plant) return null // Safety check to prevent errors

  return (
    // Matched horizontal padding to header and categories
    <section className="px-4 pt-3 sm:px-6 lg:px-10 xl:px-14 sm:pt-6">
      
      {/* Expanded to max-w-[100rem] for ultra-wide screen support */}
      <div className="relative mx-auto flex w-full max-w-[100rem] min-h-[640px] overflow-hidden rounded-2xl md:min-h-[600px] sm:rounded-[2rem]">
        
        {/* Background Image */}
        <Image
          src="/images/hero-main.jpg"
          alt="Lush rooftop nursery with potted plants at sunset"
          fill
          priority
          className="absolute inset-0 object-cover object-[60%_center]"
        />
        
        {/* Exact Lovable Gradients */}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(18,32,23,0.2)_0%,rgba(18,32,23,0.92)_70%)] md:hidden" />
        <div className="absolute inset-0 hidden md:block bg-[linear-gradient(90deg,rgba(18,32,23,0.88)_0%,rgba(18,32,23,0.55)_45%,rgba(18,32,23,0)_75%)]" />

        <div className="relative z-10 grid w-full items-end gap-8 p-6 md:grid-cols-12 md:items-center sm:p-10 lg:p-14">
          
          {/* Left Column: Text & Buttons */}
          <div className="text-white md:col-span-7 lg:col-span-6 animate-in slide-in-from-bottom-4 duration-700">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold tracking-wide backdrop-blur-md">
              <span className="size-1.5 rounded-full bg-[#E5A849]" /> Festive Sale · Up to 30% off
            </span>
            
            {/* Fixed Mobile Text Overflow by wrapping naturally on mobile, strict on desktop */}
            <h1 className="mt-5 font-serif text-[2.6rem] font-medium leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
              Grown on our roof.<br />
              <span className="lg:whitespace-nowrap">
                <em className="font-normal italic text-[#E5A849]">Delivered</em> to your home.
              </span>
            </h1>
            
            <p className="mt-5 max-w-md text-base text-white/80 sm:text-lg">
              Shop 300+ healthy, nursery-grown plants, hand-potted and packed with care by Abhay's Roof Garden.
            </p>
            
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a href="#bestsellers-heading" className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#C26743] px-7 font-semibold text-white shadow-lg transition hover:brightness-110">
                <ShoppingBag className="size-4" /> Shop All Plants
              </a>
              <a href="#" className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/20 bg-black/40 px-7 font-semibold text-white backdrop-blur-md transition hover:bg-black/60">
                Find Your Perfect Plant <ArrowRight className="size-4" />
              </a>
            </div>

            <div className="mt-6 flex items-center gap-3 text-sm text-white/85">
              <div className="flex text-[#E5A849]">
                <Star className="size-4 fill-current" />
                <Star className="size-4 fill-current" />
                <Star className="size-4 fill-current" />
                <Star className="size-4 fill-current" />
                <StarHalf className="size-4 fill-current" />
              </div>
              <span><b className="font-semibold text-white">4.9/5</b> from 2,400+ happy plant parents</span>
            </div>
          </div>

          {/* Right Column: Exact Lovable Floating Card */}
          <div className="hidden justify-end md:col-span-5 md:flex lg:col-span-6 animate-in slide-in-from-bottom-8 duration-700 delay-300">
            <div className="w-[18rem] rounded-2xl bg-card p-3 text-card-foreground shadow-2xl transition-all duration-500 xl:w-[20rem]">
              <div className="relative aspect-square overflow-hidden rounded-xl bg-muted">
                {/* Dynamically loads correct image from cardImages mapping */}
                <Image 
                  key={plant.id} 
                  src={cardImages[plant.id] || plant.image}
                  alt={plant.name} 
                  fill 
                  sizes="(min-width: 1024px) 320px, 288px"
                  className="object-cover animate-in fade-in duration-700" 
                />
                <span className="absolute left-2 top-2 rounded-full bg-[#1A3325] px-2.5 py-1 text-[11px] font-semibold text-white shadow-sm">
                  On the roof this week
                </span>
                <button type="button" onClick={() => toggleWishlist(plant.id)} aria-pressed={wishlist.includes(plant.id)} aria-label={wishlist.includes(plant.id) ? `Remove ${plant.name} from wishlist` : `Add ${plant.name} to wishlist`} className="absolute right-2 top-2 grid size-9 place-items-center rounded-full bg-card/90 transition-colors hover:text-red-500 backdrop-blur-sm shadow-sm">
                  <Heart className={`size-4 ${wishlist.includes(plant.id) ? 'fill-[#c26743] text-[#c26743]' : ''}`} aria-hidden="true" />
                </button>
              </div>
              
              <div className="p-2 pt-3">
                <p className="text-xs text-muted-foreground">{plant.careSummary.light} · {careLabel[plant.careSummary.difficulty]}</p>
                <h3 className="mt-1 font-serif text-lg font-semibold">{plant.name}</h3>

                <div className="mt-2 flex items-center justify-between">
                  <div>
                    <span className="text-lg font-bold">{formatINR(size.price)}</span>
                    {size.mrp && (
                      <span className="ml-2 text-sm text-muted-foreground line-through">{formatINR(size.mrp)}</span>
                    )}
                  </div>
                  <button
                    onClick={handleAdd}
                    aria-label={`Add ${plant.name} to cart`}
                    className="grid size-10 place-items-center rounded-full bg-[#1A3325] text-white transition hover:scale-105 hover:bg-primary active:scale-95 shadow-sm"
                  >
                    {addedId === plant.id ? <Check className="size-5" /> : <Plus className="size-5" />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Categories - Expanded to max-w-[100rem] */}
      <div className="mx-auto mt-5 flex w-full max-w-[100rem] gap-2 overflow-x-auto pb-1 md:hidden [scrollbar-width:none]">
        {cats.map((c, i) => (
          <a key={c} href="#" className={`shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition ${i === 0 ? "border-primary bg-primary text-primary-foreground" : "bg-card hover:border-primary"}`}>
            {c}
          </a>
        ))}
      </div>

      {/* Trust Bar - Expanded to max-w-[100rem] */}
      <div className="mx-auto mt-5 grid w-full max-w-[100rem] grid-cols-1 gap-3 pb-2 sm:grid-cols-3">
        {[
          { i: Truck, t: "Safe Doorstep Delivery", d: "Packed to arrive fresh & healthy" },
          { i: Leaf, t: "Nursery-Grown Quality", d: "Raised on our own rooftop" },
          { i: ShieldCheck, t: "7-Day Plant Guarantee", d: "Free replacement if damaged" },
        ].map(({ i: Icon, t, d }) => (
          <div key={t} className="flex items-center gap-4 rounded-xl border bg-card p-4 shadow-sm transition hover:shadow-md">
            <span className="grid size-11 shrink-0 place-items-center rounded-full bg-secondary text-primary">
              <Icon className="size-5" />
            </span>
            <div>
              <p className="text-sm font-semibold">{t}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">{d}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
