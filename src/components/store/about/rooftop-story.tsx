'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Leaf, MapPin } from 'lucide-react'
import { useInView } from '@/hooks/use-in-view'

// Custom internal component to handle the rapid count-up animation
function AnimatedNumber({ value, suffix = "", inView }: { value: number, suffix?: string, inView: boolean }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    // If it scrolls out of view, reset to 0 so it counts up again next time!
    if (!inView) {
      setCount(0)
      return
    }
    
    let start = 0
    const duration = 2000 // 2 seconds to finish counting
    const increment = value / (duration / 16) 

    const timer = setInterval(() => {
      start += increment
      if (start >= value) {
        setCount(value)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)

    return () => clearInterval(timer)
  }, [value, inView])

  return <span>{count.toLocaleString('en-IN')}{suffix}</span>
}

export function RooftopStory() {
  const { ref: sectionRef, isInView } = useInView({ threshold: 0.15 })

  return (
    // Tightly reduced vertical padding (py-6 to lg:py-10) to eliminate massive empty space
    <section className="w-full overflow-hidden bg-[#F9F8F6] px-4 py-6 sm:px-6 lg:px-10 xl:px-14 lg:py-10">
      <div className="mx-auto w-full max-w-[100rem]" ref={sectionRef}>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:items-center lg:gap-16 xl:gap-20">
          
          {/* Left Column: Image with Tags */}
          <div 
            className={`relative w-full overflow-hidden rounded-2xl sm:rounded-3xl transition-all duration-1000 ease-out 
              aspect-[4/3] lg:aspect-auto lg:h-[460px] xl:h-[520px]
              ${isInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}
          >
            <Image
              src="/images/rooftop.png" 
              alt="Abhay tending to plants on the sunlit rooftop nursery in Berhampore"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
            {/* Top and Bottom Gradients for text legibility */}
            <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/40 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#1A3325]/80 to-transparent" />
            
            {/* NEW: Top Right Location Tag */}
            <div className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full bg-black/40 px-3 py-1.5 text-white backdrop-blur-md sm:right-6 sm:top-6">
              <MapPin className="size-3.5" />
              <span className="text-[10px] font-medium tracking-wide sm:text-xs">Berhampore, WB</span>
            </div>

            {/* Floating Trust Badge */}
            <div className="absolute bottom-4 left-4 flex items-center gap-3 rounded-xl bg-white/10 p-3 backdrop-blur-md border border-white/20 sm:bottom-6 sm:left-6 sm:p-4 sm:rounded-2xl">
              <div className="flex size-10 items-center justify-center rounded-full bg-white text-[#1A3325] sm:size-12">
                <Leaf className="size-5 sm:size-6" />
              </div>
              <div>
                <p className="font-serif text-base font-bold text-white sm:text-lg">100% Organic</p>
                <p className="text-[10px] text-white/90 sm:text-xs">Pesticide-free soil</p>
              </div>
            </div>
          </div>

          {/* Right Column: Story & Animated Stats */}
          <div 
            className={`flex flex-col justify-center pt-2 transition-all duration-1000 delay-200 ease-out sm:pt-0 ${
              isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
          >
            {/* Standard E-commerce Section Tag */}
            <p className="font-mono text-[10px] font-bold tracking-widest text-[#1A3325] uppercase sm:text-xs">
              About The Nursery
            </p>
            
            <h2 className="mt-3 font-serif text-3xl leading-[1.15] font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              Grown under the sun,<br />
              <em className="font-normal italic text-[#1A3325]">nurtured by hand.</em>
            </h2>
            
            <div className="mt-4 space-y-4 text-sm leading-relaxed text-muted-foreground sm:mt-5 sm:text-base">
              <p>
                What started as a personal passion on a single sunlit terrace in Berhampore, West Bengal has blossomed into a full-scale homegrown nursery. We don't believe in mass-producing plants in artificial greenhouses. 
              </p>
              <p>
                Every single plant spends at least 90 days acclimating to real weather on our rooftop. This means by the time a plant arrives at your doorstep, it is hardened, deeply rooted, and ready to thrive.
              </p>
            </div>

            {/* NEW: Structured, Centered 3-Column Stats Box for Perfect Mobile Layout */}
            <div className="mt-8 grid grid-cols-3 divide-x divide-border rounded-2xl border border-border bg-white py-4 shadow-sm sm:mt-10 sm:py-6">
              <div className="flex flex-col items-center justify-center text-center px-1">
                <p className="text-xl font-extrabold tracking-tight text-[#1A3325] sm:text-3xl lg:text-4xl">
                  <AnimatedNumber value={5} suffix="+" inView={isInView} />
                </p>
                <p className="mt-1 text-[9px] font-bold text-muted-foreground uppercase tracking-widest sm:text-[11px]">Years</p>
              </div>
              
              <div className="flex flex-col items-center justify-center text-center px-1">
                <p className="text-xl font-extrabold tracking-tight text-[#1A3325] sm:text-3xl lg:text-4xl">
                  <AnimatedNumber value={12000} suffix="+" inView={isInView} />
                </p>
                <p className="mt-1 text-[9px] font-bold text-muted-foreground uppercase tracking-widest sm:text-[11px]">Plants</p>
              </div>
              
              <div className="flex flex-col items-center justify-center text-center px-1">
                <p className="text-xl font-extrabold tracking-tight text-[#1A3325] sm:text-3xl lg:text-4xl">
                  <AnimatedNumber value={1500} inView={isInView} />
                </p>
                <p className="mt-1 text-[9px] font-bold text-muted-foreground uppercase tracking-widest sm:text-[11px]">Sq Ft Roof</p>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </section>
  )
}