'use client'

import { Sprout, Package, Truck, ShieldCheck } from 'lucide-react'
import { useInView } from '@/hooks/use-in-view'

const steps = [
  {
    id: 1,
    title: 'Hand-picked & potted',
    desc: 'Selected for health and potted in nutrient-rich soil before leaving our roof.',
    icon: Sprout,
  },
  {
    id: 2,
    title: 'Custom packaging',
    desc: 'Secured in our eco-friendly, damage-proof transit boxes so dirt stays put.',
    icon: Package,
  },
  {
    id: 3,
    title: 'Safely delivered',
    desc: 'Tracked to your door. Unbox a vibrant, happy plant ready to thrive.',
    icon: Truck,
  },
]

export function ShippingTimeline() {
  const { ref: sectionRef, isInView } = useInView({ threshold: 0.2 })

  return (
    // Tightly padded to keep vertical height very compact (py-8 to lg:py-12)
    <section className="w-full bg-white px-4 py-8 sm:px-6 lg:px-10 xl:px-14 lg:py-12">
      <div 
        ref={sectionRef} 
        className="mx-auto w-full max-w-[100rem]"
      >
        
        {/* Header Animation Trigger */}
        <div className={`text-center transition-all duration-700 ease-out ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <h2 className="font-serif text-2xl font-bold tracking-tight text-[#1A3325] sm:text-3xl lg:text-4xl">
            From our roof to your room.
          </h2>
        </div>

        {/* Timeline Grid */}
        <div className="relative mt-8 sm:mt-10 lg:mt-12">
          {/* Subtle connecting line strictly for desktop view */}
          <div 
            className={`absolute left-[15%] right-[15%] top-6 hidden h-px bg-gray-200 md:block transition-all duration-1000 delay-300 ease-out ${
              isInView ? 'opacity-100' : 'opacity-0'
            }`} 
            aria-hidden="true" 
          />
          
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-6 lg:gap-10">
            {steps.map((step, i) => {
              const Icon = step.icon
              return (
                <div 
                  key={step.id}
                  // Staggered cascade animation for each step
                  className={`relative flex flex-col items-center text-center transition-all duration-700 ease-out`}
                  style={{ 
                    transitionDelay: `${(i + 1) * 150}ms`,
                    opacity: isInView ? 1 : 0,
                    transform: isInView ? 'translateY(0)' : 'translateY(20px)'
                  }}
                >
                  <div className="relative z-10 flex size-12 items-center justify-center rounded-full bg-white border-2 border-[#1A3325] text-[#1A3325] shadow-sm sm:size-14 transition-transform hover:scale-110">
                    <Icon className="size-5 sm:size-6" />
                  </div>
                  <h3 className="mt-4 text-base font-bold text-[#1A3325] sm:text-lg">{step.title}</h3>
                  <p className="mt-2 max-w-xs text-xs leading-relaxed text-muted-foreground sm:text-sm">
                    {step.desc}
                  </p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Guarantee Banner Trigger */}
        <div 
          className={`mx-auto mt-10 max-w-3xl rounded-2xl bg-[#F4F7F5] border border-[#1A3325]/10 p-4 sm:mt-12 sm:p-5 transition-all duration-700 delay-500 ease-out ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <div className="flex flex-col items-center justify-center gap-3 text-center sm:flex-row sm:gap-4 sm:text-left">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#1A3325] text-white">
              <ShieldCheck className="size-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-[#1A3325] sm:text-base">7-Day Healthy Plant Guarantee</p>
              <p className="mt-0.5 text-xs text-[#1A3325]/70 sm:text-sm">
                If your plant arrives damaged or unhealthy, we’ll replace it for free. No questions asked.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}