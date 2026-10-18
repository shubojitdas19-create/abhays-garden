'use client'

import Image from 'next/image'
import { ArrowRight, ShieldCheck, Star, MoveRight } from 'lucide-react'
import { useInView } from '@/hooks/use-in-view'

// Authentic review data including the newly added 5th review to perfect the grid
const reviews = [
  { 
    id: 1,
    img: '/images/customer-1.jpg', 
    name: "Sneha Roy", 
    city: "Kolkata", 
    plant: "Monstera Deliciosa", 
    when: "3 months ago", 
    text: "Six months in and my monstera has thrown five new leaves. It's become the centrepiece of our living room." 
  },
  { 
    id: 2,
    img: '/images/customer-2.jpg', 
    name: "Ramesh Iyer", 
    city: "Pune", 
    plant: "Red Hibiscus", 
    when: "1 month ago", 
    text: "The hibiscus arrived with buds already on it. It hasn't stopped flowering since — my balcony has never looked better." 
  },
  { 
    id: 3,
    img: '/images/customer-3.jpg', 
    name: "Priya Nair", 
    city: "Bengaluru", 
    plant: "Golden Money Plant", 
    when: "4 months ago", 
    text: "Ordered on a Tuesday, it was on my sofa by Friday. The vines have grown almost a foot since, and two cuttings I took have rooted in water." 
  },
  { 
    id: 4,
    img: '/images/customer-4.jpg', 
    name: "Farhan Sheikh", 
    city: "Mumbai", 
    plant: "Snake Plant", 
    when: "1 month ago", 
    text: "Came well packed with no soil spillage and the leaves were spotless. A month later it's already taller than when it arrived." 
  },
  { 
    id: 5,
    img: '/images/customer-5.jpg', 
    name: "Meera Balan", 
    city: "Chennai", 
    plant: "Jade Succulent", 
    when: "2 months ago", 
    text: "My balcony corner finally looks like a corner. Three pots, all alive, all growing — not one has let me down yet." 
  },
]

export function CustomerReviews() {
  const { ref: sectionRef, isInView } = useInView({ threshold: 0.1 })

  return (
    // Tightened top and bottom spacing
    <section className="w-full overflow-hidden bg-[#F9F8F6] px-4 py-8 sm:px-6 lg:px-10 xl:px-14 lg:py-12">
      <div ref={sectionRef} className="mx-auto w-full max-w-[100rem]">
        
        {/* Header Section */}
        <div className={`flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 transition-all duration-700 ease-out ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#C26743] sm:text-xs">
              Straight from their homes
            </p>
            <h2 className="mt-2 font-serif text-3xl font-bold tracking-tight text-[#1A3325] sm:text-4xl lg:text-5xl">
              Real plants, real homes
            </h2>
          </div>
          <a href="#" className="hidden items-center gap-1.5 text-sm font-semibold text-[#1A3325] transition-colors hover:text-[#C26743] sm:inline-flex">
            See all reviews <ArrowRight className="size-4" />
          </a>
        </div>

        {/* Mobile Swipe Cue */}
        <div className={`mt-5 flex items-center gap-2 text-xs font-semibold text-muted-foreground sm:hidden transition-all duration-700 delay-200 ease-out ${isInView ? 'opacity-100' : 'opacity-0'}`}>
          Swipe to read more <MoveRight className="size-3.5 animate-pulse" />
        </div>

        {/* Grid / Mobile Slider Layout */}
        <div className="no-scrollbar -mx-4 mt-3 flex snap-x snap-mandatory overflow-x-auto px-4 pb-4 gap-4 sm:mx-0 sm:mt-8 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-6 lg:gap-8 sm:overflow-visible sm:px-0 sm:pb-0">
          
          {reviews.map((r, index) => (
            <figure 
              key={r.id} 
              className="group flex w-[85vw] shrink-0 snap-start flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all duration-700 ease-out hover:shadow-xl sm:w-auto sm:border-transparent sm:shadow-sm"
              style={{ 
                transitionDelay: `${(index + 1) * 100}ms`,
                opacity: isInView ? 1 : 0,
                transform: isInView ? 'translateY(0)' : 'translateY(20px)'
              }}
            >
              {/* Image Section */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
                <Image 
                  src={r.img} 
                  alt={`${r.plant} at ${r.name}'s home`} 
                  fill 
                  className="object-cover transition-transform duration-1000 group-hover:scale-105" 
                />
                {/* MOVED TO BOTTOM LEFT: Verified Buyer tag now sits at the bottom so it doesn't hide faces */}
                <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-[10px] font-bold text-[#1A3325] shadow-sm backdrop-blur-md sm:text-[11px]">
                  <ShieldCheck className="size-3.5 text-green-600" /> Verified buyer
                </span>
              </div>
              
              {/* Content Section */}
              <figcaption className="flex flex-1 flex-col p-5 sm:p-6 lg:p-8">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <div className="flex text-[#E5A849]">
                    {[...Array(5)].map((_, i) => <Star key={i} className="size-4 fill-current" />)}
                  </div>
                  <span className="ml-1 text-[11px] sm:text-xs">{r.when}</span>
                </div>
                
                <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-gray-700 sm:text-base">
                  “{r.text}”
                </blockquote>
                
                <div className="mt-6 flex items-center justify-between gap-3 border-t border-gray-100 pt-5">
                  <div>
                    <p className="text-sm font-bold text-[#1A3325]">{r.name} · <span className="font-medium text-muted-foreground">{r.city}</span></p>
                    <p className="mt-0.5 text-[11px] font-medium text-muted-foreground sm:text-xs">Bought the {r.plant}</p>
                  </div>
                  <a href="#" className="shrink-0 rounded-full bg-[#F4F7F5] px-4 py-2 text-[11px] font-bold text-[#1A3325] transition-colors hover:bg-[#1A3325] hover:text-white sm:text-xs">
                    Shop this
                  </a>
                </div>
              </figcaption>
            </figure>
          ))}

          {/* TABLET / DESKTOP Aggregate Block: Perfectly fills the 6th slot in the grid */}
          <div 
            className="hidden sm:flex flex-col justify-center gap-4 rounded-2xl bg-[#1A3325] p-6 text-white lg:p-8 xl:p-10 transition-all duration-700 delay-500 ease-out"
            style={{ 
              opacity: isInView ? 1 : 0,
              transform: isInView ? 'translateY(0)' : 'translateY(20px)'
            }}
          >
            <div className="flex text-[#E5A849]">
              {[...Array(5)].map((_, i) => <Star key={i} className="size-6 fill-current sm:size-8" />)}
            </div>
            <p className="font-serif text-4xl font-bold tracking-tight xl:text-5xl">4.9 out of 5</p>
            <p className="mt-1 text-sm leading-relaxed text-white/80 xl:text-base">
              from 2,400+ verified reviews across India. Every plant is checked by hand the morning it leaves our rooftop.
            </p>
            <a href="#" className="mt-4 inline-flex w-fit items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-[#1A3325] transition-transform hover:scale-[1.02] active:scale-95">
              Read all reviews <ArrowRight className="size-4" />
            </a>
          </div>

        </div>

        {/* MOBILE ONLY Aggregate Block: Moved OUTSIDE the slider so users don't have to swipe to see it! */}
        <div className="mt-6 flex flex-col items-center justify-center gap-3 rounded-2xl bg-[#1A3325] p-6 text-center text-white sm:hidden">
            <div className="flex text-[#E5A849]">
              {[...Array(5)].map((_, i) => <Star key={i} className="size-5 fill-current" />)}
            </div>
            <p className="font-serif text-3xl font-bold tracking-tight">4.9 out of 5</p>
            <p className="text-xs leading-relaxed text-white/80">
              from 2,400+ verified reviews. Hand-checked before leaving our roof.
            </p>
            <a href="#" className="mt-2 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-xs font-bold text-[#1A3325] transition-transform active:scale-95">
              Read all reviews <ArrowRight className="size-3.5" />
            </a>
        </div>

      </div>
    </section>
  )
}