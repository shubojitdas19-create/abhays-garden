'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Check, Plus } from 'lucide-react'
import { useInView } from '@/hooks/use-in-view'
import { useCart } from '@/components/store/cart-context'
import { useState } from 'react'

const accessories = [
  {
    id: 'g-1',
    name: 'The Green Gift Set',
    desc: 'Plant, ceramic pot & care card in a ribbon box.',
    price: 899,
    img: '/images/gifting.jpg', 
    badge: 'Perfect Gift'
  },
  {
    id: 'a-1',
    name: 'Minimalist Ceramic Pot',
    desc: 'Matte white finish with drainage hole. 6 inch.',
    price: 299,
    img: '/images/pot-white.jpg', 
  },
  {
    id: 'a-2',
    name: 'Classic Terracotta',
    desc: 'Breathable clay pot for healthy roots. 6 inch.',
    price: 199,
    img: '/images/pot-terracotta.jpg', 
  },
  {
    id: 'a-3',
    name: 'Organic Plant Food',
    desc: 'Liquid fertilizer for lush, vibrant growth. 250ml.',
    price: 149,
    img: '/images/fertilizer.jpg', 
  }
]

export function AccessoriesRow() {
  const { addItem } = useCart()
  const { ref: sectionRef, isInView } = useInView({ threshold: 0.15 })
  const [addedId, setAddedId] = useState<string | null>(null)

  const handleQuickAdd = (id: string) => {
    const item = accessories.find((accessory) => accessory.id === id)
    if (!item) return
    addItem({
      productId: item.id,
      productName: item.name,
      size: 'One size',
      pot: 'No pot',
      price: item.price,
      image: item.img,
      nurseryName: "Abhay's Flagship Nursery",
    })
    setAddedId(id)
    setTimeout(() => setAddedId(null), 2000)
  }

  return (
    <section className="w-full overflow-hidden bg-white px-4 py-8 sm:px-6 lg:px-10 xl:px-14 lg:py-12">
      <div ref={sectionRef} className="mx-auto w-full max-w-[100rem]">
        
        {/* Header */}
        <div className={`flex items-end justify-between gap-4 transition-all duration-700 ease-out ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#1A3325] sm:text-xs">
              Complete the look
            </p>
            <h2 className="mt-2 font-serif text-2xl font-bold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
              Pots & Gift Sets
            </h2>
          </div>
          <Link href="/shop" className="hidden items-center gap-1.5 text-sm font-semibold text-[#1A3325] transition-colors hover:text-[#C26743] sm:inline-flex">
            Shop all plants &amp; pots <ArrowRight className="size-4" />
          </Link>
        </div>

        {/* 
          UPDATED TO MATCH BESTSELLERS: 
          Now uses a strict 2-column grid on mobile (grid-cols-2) instead of a horizontal slider.
        */}
        <div className="mt-6 grid grid-cols-2 gap-x-3 gap-y-8 sm:mt-8 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-4">
          {accessories.map((item, index) => (
            <div 
              key={item.id}
              className="group relative flex flex-col transition-all duration-700 ease-out"
              style={{ 
                transitionDelay: `${(index + 1) * 100}ms`,
                opacity: isInView ? 1 : 0,
                transform: isInView ? 'translateY(0)' : 'translateY(20px)'
              }}
            >
              {/* Image Box */}
              <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-muted">
                <Image
                  src={item.img}
                  alt={item.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                {item.badge && (
                  <span className="absolute left-2 top-2 sm:left-3 sm:top-3 rounded-full bg-[#D47E5B] px-2 py-1 text-[9px] sm:px-2.5 sm:text-[10px] font-bold text-white shadow-sm">
                    {item.badge}
                  </span>
                )}

                {/* Quick Add Button - Scaled down for mobile 2-col fit */}
                <button
                  onClick={() => handleQuickAdd(item.id)}
                  className={`absolute bottom-2 right-2 flex size-8 items-center justify-center rounded-full shadow-md transition-all active:scale-95 sm:bottom-3 sm:right-3 sm:size-12 ${
                    addedId === item.id 
                      ? 'bg-green-600 text-white' 
                      : 'bg-white text-[#1A3325] hover:bg-[#1A3325] hover:text-white'
                  }`}
                  aria-label={`Add ${item.name} to cart`}
                >
                  {addedId === item.id ? <Check className="size-4 sm:size-5" aria-hidden="true" /> : <Plus className="size-4 sm:size-5" aria-hidden="true" />}
                </button>
              </div>

              {/* Product Details - Typography scaled slightly for mobile 2-col */}
              <div className="mt-3 sm:mt-4 flex flex-1 flex-col px-1 sm:px-0">
                <h3 className="font-serif text-sm font-bold text-[#1A3325] sm:text-lg leading-tight">{item.name}</h3>
                <p className="mt-1 text-[10px] leading-relaxed text-muted-foreground sm:text-sm line-clamp-2">
                  {item.desc}
                </p>
                <div className="mt-auto pt-2 sm:pt-3">
                  <span className="text-sm font-bold text-[#1A3325] sm:text-lg">₹{item.price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile-only View All Link */}
        <div className="mt-8 flex justify-center sm:hidden">
          <Link href="/shop" className="inline-flex min-h-10 items-center gap-1.5 rounded-full border border-[#1A3325]/20 px-5 text-sm font-bold text-[#1A3325] transition-colors hover:bg-[#edf1e9]">
            Shop all plants &amp; pots <ArrowRight className="size-4" />
          </Link>
        </div>

      </div>
    </section>
  )
}
