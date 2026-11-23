'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Check, Clock, RefreshCcw, ShieldCheck, Sun, Star, ShoppingBag } from 'lucide-react'
import { products } from '@/components/store/products'
import { useCart } from '@/components/store/cart-context'
import { useInView } from '@/hooks/use-in-view'

const questions = [
  {
    id: 'light',
    title: 'How much light does your space get?',
    icon: Sun,
    options: [
      { label: 'Low light', value: 'Low light', desc: 'Away from windows' },
      { label: 'Bright, indirect', value: 'Bright indirect', desc: 'Near a window' },
      { label: 'Direct sun', value: 'Full sun', desc: 'Balcony or terrace' },
    ]
  },
  {
    id: 'care',
    title: 'How much time can you give your plant?',
    icon: Clock,
    options: [
      { label: 'Very little', value: 1, desc: 'Water & forget' },
      { label: 'A little weekly', value: 2, desc: 'Weekend care' },
      { label: 'I enjoy gardening', value: 3, desc: 'Daily attention' },
    ]
  },
  {
    id: 'pets',
    title: 'Do you have pets at home?',
    icon: ShieldCheck,
    options: [
      { label: 'Yes, need pet-friendly', value: 'pet-friendly', desc: 'Safe for cats & dogs' },
      { label: 'No pets', value: 'none', desc: 'I can grow anything' },
    ]
  }
]

export function PlantFinder() {
  const { addItem } = useCart()
  const { ref: sectionRef, isInView } = useInView({ threshold: 0.15 })
  
  const [step, setStep] = useState(1)
  const [answers, setAnswers] = useState<Record<string, any>>({})
  const [result, setResult] = useState<(typeof products)[0] | null>(null)
  const [isAnimating, setIsAnimating] = useState(false)
  const [added, setAdded] = useState(false)

  const goToStep = (newStep: number) => {
    setIsAnimating(true)
    setTimeout(() => {
      setStep(newStep)
      setIsAnimating(false)
    }, 250) 
  }

  const handleSelect = (questionId: string, value: any) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }))
    
    if (step < questions.length) {
      goToStep(step + 1)
    } else {
      calculateResult({ ...answers, [questionId]: value })
    }
  }

  const calculateResult = (finalAnswers: Record<string, any>) => {
    let matches = products.filter(p => p.careSummary.light === finalAnswers.light)
    if (matches.length === 0) matches = products 
    
    const careMatches = matches.filter(p => p.careSummary.difficulty === finalAnswers.care)
    if (careMatches.length > 0) matches = careMatches

    if (finalAnswers.pets === 'pet-friendly') {
      const petMatches = matches.filter(p => p.filters.includes('pet-friendly'))
      if (petMatches.length > 0) matches = petMatches
    }

    setResult(matches[0] || products.find(p => p.id === 'snake-plant') || products[0])
    goToStep(4)
  }

  const resetQuiz = () => {
    setAnswers({})
    setResult(null)
    setAdded(false)
    goToStep(1) 
  }

  const handleAddToCart = () => {
    if (!result) return
    const size = result.sizes[0]
    if (!size) return
    addItem({
      productId: result.id,
      productName: result.name,
      size: size.label,
      pot: 'Standard Eco Nursery Pot',
      price: size.price,
      image: result.image,
      nurseryName: result.nursery.name,
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  const CurrentIcon = step <= questions.length ? questions[step - 1].icon : Sun

  return (
    <section className="w-full bg-[#0F291E] px-4 py-10 sm:px-6 lg:px-10 xl:px-14 lg:py-12">
      <div 
        ref={sectionRef}
        className={`mx-auto w-full max-w-[100rem] transition-all duration-1000 ease-out ${
          isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        
        <div className="mx-auto max-w-2xl text-center mb-8 lg:mb-10">
          <p className="text-[10px] font-bold uppercase tracking-widest text-[#E5A849] sm:text-xs">
            Plant Finder
          </p>
          <h2 className="mt-2 font-serif text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
            Find your perfect plant
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-white/80 sm:text-base">
            Answer three quick questions and we'll match you with a plant that fits your home.
          </p>
        </div>

        <div className="mx-auto w-full max-w-4xl overflow-hidden rounded-[2rem] bg-white p-6 shadow-2xl sm:p-8 lg:p-10">
          <div className={`mx-auto w-full transition-all duration-250 ease-out will-change-transform ${isAnimating ? 'opacity-0 scale-[0.98]' : 'opacity-100 scale-100'}`}>
            
            {step > 0 && step <= questions.length && (
              <div className="flex flex-col">
                <div className="mb-6 flex items-center justify-between sm:mb-8">
                  <span className="text-xs font-semibold text-muted-foreground sm:text-sm">
                    Question {step} of {questions.length}
                  </span>
                  <div className="flex gap-1.5">
                    {[1, 2, 3].map((num) => (
                      <div 
                        key={num} 
                        className={`h-1 w-6 sm:w-8 rounded-full ${num <= step ? 'bg-[#0F291E]' : 'bg-gray-200'}`} 
                      />
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center gap-3 mb-6 sm:gap-4 sm:mb-8">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#F4F7F5] text-[#0F291E] sm:size-12">
                    <CurrentIcon className="size-5 sm:size-6" />
                  </div>
                  <h3 className="font-serif text-xl font-semibold leading-tight text-[#0F291E] sm:text-2xl lg:text-3xl">
                    {questions[step - 1].title}
                  </h3>
                </div>
                
                <div className="grid gap-3 sm:grid-cols-3 lg:gap-5">
                  {questions[step - 1].options.map((option) => (
                    <button
                      key={option.label}
                      onClick={() => handleSelect(questions[step - 1].id, option.value)}
                      className="group flex flex-col items-start justify-center rounded-2xl border border-gray-100 bg-[#FAFAFA] p-5 text-left transition-all duration-200 hover:border-[#0F291E] hover:bg-white hover:shadow-sm active:scale-95 sm:min-h-[120px] sm:p-6"
                    >
                      <span className="text-sm font-semibold text-[#0F291E] sm:text-base">
                        {option.label}
                      </span>
                      <span className="mt-1 text-xs text-muted-foreground sm:mt-1.5">
                        {option.desc}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 4 && result && (
              <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-10">
                <div className="relative aspect-square w-full shrink-0 overflow-hidden rounded-2xl bg-[#F3EFEA] sm:w-[40%]">
                  <div className="absolute left-3 top-3 z-10 rounded-full bg-[#D47E5B] px-3 py-1 text-[10px] font-bold text-white sm:left-4 sm:top-4">
                    Your match
                  </div>
                  <Image
                    src={result.image}
                    alt={result.name}
                    fill
                    className="object-cover object-bottom"
                  />
                </div>
                
                <div className="flex flex-1 flex-col text-left">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-[#D47E5B] sm:text-xs">
                    We Recommend
                  </p>
                  
                  <h3 className="mt-1 font-serif text-2xl font-bold text-[#0F291E] sm:text-3xl lg:text-4xl">
                    {result.name}
                  </h3>
                  
                  <p className="mt-2 text-sm text-muted-foreground">
                    Indoor • {result.careSummary.light} • Care Level: {result.careSummary.difficulty}
                  </p>
                  
                  <div className="mt-3 flex items-center gap-1.5">
                    <Star className="size-4 fill-[#E5A849] text-[#E5A849]" />
                    <span className="text-sm font-bold text-[#0F291E]">{result.rating}</span>
                    <span className="text-sm text-muted-foreground">({result.reviews} reviews)</span>
                  </div>
                  
                  <div className="mt-4 flex items-end gap-2 sm:mt-6">
                    <span className="text-2xl font-bold text-[#0F291E] sm:text-3xl">₹{result.sizes[0].price}</span>
                    {result.sizes[0].mrp && (
                      <span className="mb-1 text-sm font-medium text-muted-foreground line-through">₹{result.sizes[0].mrp}</span>
                    )}
                  </div>
                  
                  {/* MOBILE FIX: Buttons now sit side-by-side on phone (flex-row instead of flex-col) */}
                  <div className="mt-6 flex w-full flex-row items-center gap-3 sm:mt-8 sm:w-auto">
                    
                    <button
                      onClick={handleAddToCart}
                      // App-style proportion: primary button takes up more space (flex-[2])
                      className={`flex h-12 flex-[2] items-center justify-center gap-2 rounded-full text-sm font-bold shadow-sm transition-all active:scale-[0.98] sm:flex-none sm:px-8 ${
                        added ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-[#0F291E] text-white hover:bg-[#0F291E]/90'
                      }`}
                    >
                      {added ? (
                        <><Check className="size-4" /> Added</>
                      ) : (
                        <><ShoppingBag className="size-4" /> Add to Cart</>
                      )}
                    </button>
                    
                    <button
                      onClick={resetQuiz}
                      // Secondary button takes up less space (flex-1)
                      className="flex h-12 flex-1 items-center justify-center gap-1.5 rounded-full border border-gray-200 bg-white text-sm font-semibold text-[#0F291E] transition-all hover:bg-gray-50 active:scale-[0.98] sm:gap-2 sm:flex-none sm:px-6"
                    >
                      <RefreshCcw className="size-4" /> Retake
                    </button>
                    
                  </div>
                </div>

              </div>
            )}

          </div>
        </div>
      </div>
    </section>
  )
}
