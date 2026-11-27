'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FooterSitemap, footerPolicyLinks } from './footer-sitemap'
import { 
  MapPin, 
  Phone, 
  Mail, 
  MessageCircle, 
  ArrowRight,
  CheckCircle2,
  X,
  HelpCircle,
  Plus,
  Minus
} from 'lucide-react'

const faqs = [
  { q: "How does the 7-day plant claim window work?", a: "Claims are limited to plants delivered incorrectly or physically damaged in transit. Contact us within 7 days and provide a complete 360° unboxing video from the unopened parcel through unpacking. Refunds or replacements are considered after review and are not automatic." },
  { q: "How are the plants packaged for safe transit?", a: "We use custom-engineered, eco-friendly corrugated boxes that lock the pot in place. The soil is covered with biodegradable coco-fiber mats to prevent spillage, ensuring the plant breathes while staying perfectly secure." },
  { q: "What if I don't know how to care for my plant?", a: "Every plant comes with a detailed, beginner-friendly physical care card. You can also message our WhatsApp support line anytime for personalized advice from our nursery experts." },
  { q: "Are the pots included with the plants?", a: "Yes! All our plants come potted in nutrient-rich organic soil in a standard nursery pot. You can also upgrade to our premium ceramic or terracotta planters before adding to cart." },
  { q: "Can I gift a plant to someone else?", a: "Absolutely. Select the 'Add Gift Wrap' option at checkout. We will hand-wrap the plant in kraft paper with a ribbon and include a handwritten note with your custom message." },
  { q: "Do you use chemical pesticides or fertilizers?", a: "No. We pride ourselves on a 100% organic approach. We use neem oil for pest control and our own aged organic compost to ensure your home stays free from harsh agricultural chemicals." },
  { q: "How long does delivery usually take?", a: "Orders are dispatched within 24 hours. Depending on your location, transit takes between 2 to 5 business days. You will receive a tracking link via WhatsApp and Email as soon as it ships." }
]

export function HomeFooter() {
  const [isFaqOpen, setIsFaqOpen] = useState(false)
  const [activeFaq, setActiveFaq] = useState<number | null>(null)
  
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  // Prevent background scrolling when FAQ modal is open
  useEffect(() => {
    if (isFaqOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => { document.body.style.overflow = 'unset' }
  }, [isFaqOpen])

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)
    setTimeout(() => {
      setIsFormOpen(false)
      setTimeout(() => setIsSubmitted(false), 500)
    }, 3000)
  }

  return (
    <footer className="w-full bg-[#0F291E] pb-6 pt-10 sm:pt-14 lg:pt-16">
      <div className="mx-auto w-full max-w-[100rem] px-4 sm:px-6 lg:px-10 xl:px-14">
        
        {/* TOP: Newsletter / Lead Capture */}
        <div className="relative mb-12 overflow-hidden rounded-[2rem] bg-[#1A3325] p-6 shadow-2xl border border-white/10 sm:p-10 lg:flex lg:items-center lg:justify-between lg:p-14">
          <div className="relative z-10 max-w-xl">
            <h3 className="font-serif text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
              Join the Plant Care Club.
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-white/80 sm:text-base">
              Get 10% off your first order. We will also send you seasonal care tips, exclusive drops, and early access to rare cuttings.
            </p>
          </div>

          <div className="relative z-10 mt-8 w-full max-w-md lg:mt-0 lg:shrink-0">
            {!isFormOpen && !isSubmitted ? (
              <button 
                onClick={() => setIsFormOpen(true)}
                className="flex h-14 w-full items-center justify-center gap-2 rounded-full bg-[#E5A849] px-8 text-base font-bold text-[#1A3325] shadow-lg transition-transform hover:scale-[1.02] active:scale-95"
              >
                Unlock 10% Off <ArrowRight className="size-5" />
              </button>
            ) : isSubmitted ? (
              <div className="flex h-full w-full flex-col items-center justify-center rounded-2xl border border-green-500/30 bg-green-500/10 p-6 text-center text-white backdrop-blur-sm">
                <CheckCircle2 className="mb-2 size-8 text-green-400" />
                <p className="font-bold">Welcome to the Club!</p>
                <p className="text-xs text-white/70">Check your WhatsApp/Email for your code.</p>
              </div>
            ) : (
              <form onSubmit={handleLeadSubmit} className="flex flex-col gap-3 rounded-2xl bg-white/5 p-5 backdrop-blur-md border border-white/10 animate-in fade-in slide-in-from-bottom-4">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white/60">Where should we send it?</span>
                  <button type="button" onClick={() => setIsFormOpen(false)} className="text-white/60 hover:text-white">
                    <X className="size-4" />
                  </button>
                </div>
                <input required type="text" placeholder="Full Name" className="h-12 w-full rounded-xl bg-white/10 px-4 text-sm text-white placeholder-white/40 outline-none focus:ring-2 focus:ring-[#E5A849]" />
                <input required type="tel" placeholder="WhatsApp Number / Email" className="h-12 w-full rounded-xl bg-white/10 px-4 text-sm text-white placeholder-white/40 outline-none focus:ring-2 focus:ring-[#E5A849]" />
                <button type="submit" className="mt-2 h-12 w-full rounded-xl bg-[#E5A849] text-sm font-bold text-[#1A3325] transition-transform active:scale-95">
                  Claim My Discount
                </button>
              </form>
            )}
          </div>
          
          <div className="absolute -left-20 -top-20 size-64 rounded-full bg-white/5 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-32 -right-32 size-96 rounded-full bg-[#E5A849]/10 blur-3xl pointer-events-none" />
        </div>

        {/* BOTTOM: Contact Details Grid */}
        <div className="grid gap-10 border-b border-white/10 pb-10 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          
          {/* Brand & Socials (Col 1) */}
          <div className="flex flex-col items-start gap-6 lg:col-span-4">
            
            <a href="/" className="flex shrink-0 items-center gap-2.5">
              <div className="relative flex size-12 shrink-0 overflow-hidden rounded-full border border-white/20 shadow-sm sm:size-14 bg-white">
                <Image 
                  src="/images/logo2.png" 
                  alt="Abhay's Roof Garden Logo" 
                  fill 
                  sizes="56px" 
                  className="object-cover"
                />
              </div>
              <span className="flex flex-col justify-center leading-none">
                <span className="font-serif text-xl font-bold tracking-tight text-white sm:text-2xl">
                  {"Abhay's Roof Garden"}
                </span>
                <span className="mt-0.5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#E5A849]">
                  Homegrown Nursery
                </span>
              </span>
            </a>

            <div className="max-w-sm text-sm text-white/70">
              <p>Nursery-grown plants, hardened on our rooftop and delivered fresh to your door in eco-friendly packaging.</p>
            </div>
            
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-widest text-white/50">Watch our rooftop bloom on your feed 👇</p>
              <div className="flex items-center gap-4">
                <a href="https://www.facebook.com/share/1GHSBTPFXm/" target="_blank" rel="noopener noreferrer" className="flex size-10 items-center justify-center rounded-full bg-white/5 text-white transition-colors hover:bg-[#1877F2] hover:text-white border border-white/10">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4.5"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
                </a>
                <a href="https://www.instagram.com/abhaysroofgarden_2026?srtk=MWdpMTEzdTdsaThkdQ==" target="_blank" rel="noopener noreferrer" className="flex size-10 items-center justify-center rounded-full bg-white/5 text-white transition-colors hover:bg-[#E1306C] hover:text-white border border-white/10">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4.5"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                </a>
              </div>
            </div>
          </div>

          {/* Visit Us (Col 2) */}
          <div className="flex flex-col gap-5 lg:col-span-4 lg:pl-4">
            <h4 className="font-serif text-xl font-medium text-white">Visit Us</h4>
            <div className="flex gap-4 text-white/70">
              <MapPin className="mt-1 size-5 shrink-0 text-[#E5A849]" />
              <div className="flex flex-col gap-1.5 text-sm sm:text-base">
                <span className="font-medium text-white">Abhay's Roof Garden</span>
                <span>Chuanpore, Sukantapally,</span>
                <span>Berhampore, Murshidabad,</span>
                <span>West Bengal 742407</span>
                <div className="mt-2 flex flex-col gap-0.5">
                  <span className="font-medium text-[#E5A849]">Every day: 9:00 AM – 7:00 PM</span>
                  <span className="text-xs italic text-white/50">Please WhatsApp before visiting</span>
                </div>
                <a 
                  href="https://maps.app.goo.gl/4pZraYbYVNjtx3HD8?g_st=ac" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="mt-3 flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-white/10"
                >
                  Get Directions <ArrowRight className="size-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Contact & Support (Col 3) - FAQ is now neatly housed here */}
          <div className="flex flex-col gap-5 lg:col-span-4">
            <h4 className="font-serif text-xl font-medium text-white">Contact & Support</h4>
            <div className="flex gap-4 text-white/70">
              <Phone className="mt-1 size-5 shrink-0 text-[#E5A849]" />
              <div className="flex flex-col gap-3 text-sm sm:text-base">
                <a href="tel:+919476433880" className="flex items-center gap-2 transition-colors hover:text-white">
                  +91 94764 33880
                </a>
                <a href="https://wa.me/919476433880" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-green-400 transition-colors hover:text-green-300">
                  <MessageCircle className="size-4 shrink-0" /> WhatsApp Us
                </a>
                <a href="mailto:abhaysroofgarden@gmail.com" className="flex items-center gap-2 transition-colors hover:text-white mt-1">
                  <Mail className="size-4 shrink-0" /> abhaysroofgarden@gmail.com
                </a>
                
                {/* Beautifully integrated FAQ Button */}
                <button 
                  onClick={() => setIsFaqOpen(true)}
                  className="mt-3 flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-white/10"
                >
                  <HelpCircle className="size-3.5" /> Read our FAQs
                </button>
              </div>
            </div>
            <div className="pt-4">
              <FooterSitemap />
            </div>
          </div>
        </div>

        {/* Copyright & Legal */}
        <div className="flex flex-col items-center justify-between gap-4 pt-6 sm:flex-row">
          <p className="text-xs text-white/50">
            © {new Date().getFullYear()} Abhay's Roof Garden. All rights reserved.
          </p>
          <nav aria-label="Policies" className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs text-white/50">
            {footerPolicyLinks.map((link) => (
              <Link key={link.href} href={link.href} className="transition-colors hover:text-white focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E5A849]">
                {link.label}
              </Link>
            ))}
          </nav>
          <p className="text-xs font-medium text-white/70">
            Designed & Developed by <span className="font-bold text-[#E5A849]">Sj Digital Studio</span>
          </p>
        </div>
      </div>

      {/* MODAL: Hidden FAQ Overlay */}
      {isFaqOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setIsFaqOpen(false)}
          />
          <div className="relative z-10 w-full max-w-2xl max-h-[85vh] overflow-hidden rounded-3xl bg-[#F9F8F6] text-left shadow-2xl ring-1 ring-black/5 animate-in fade-in zoom-in-95 duration-200 flex flex-col">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-gray-200 p-6 sm:p-8 bg-white shrink-0">
              <div>
                <h3 className="font-serif text-2xl font-bold text-[#1A3325]">Frequently Asked Questions</h3>
                <p className="mt-1 text-sm text-muted-foreground">Everything you need to know about our nursery.</p>
              </div>
              <button 
                onClick={() => setIsFaqOpen(false)}
                className="rounded-full bg-gray-100 p-2 text-gray-500 transition-colors hover:bg-[#1A3325] hover:text-white"
              >
                <X className="size-5" />
              </button>
            </div>

            {/* Modal Body (Scrollable) */}
            <div className="overflow-y-auto p-6 sm:p-8">
              <div className="divide-y divide-gray-200">
                {faqs.map((faq, index) => (
                  <div key={index} className="py-4 first:pt-0 last:pb-0">
                    <button
                      onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                      className="flex w-full items-center justify-between text-left transition-colors hover:text-[#C26743]"
                    >
                      <span className="font-serif text-sm font-bold text-[#1A3325] sm:text-base pr-4">
                        {faq.q}
                      </span>
                      <span className="flex size-6 shrink-0 items-center justify-center rounded-full border border-gray-300 text-gray-500 transition-transform">
                        {activeFaq === index ? <Minus className="size-3.5" /> : <Plus className="size-3.5" />}
                      </span>
                    </button>
                    <div
                      className={`grid transition-all duration-300 ease-in-out ${
                        activeFaq === index ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p className="pt-3 text-sm leading-relaxed text-muted-foreground sm:pt-4">
                          {faq.a}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}
    </footer>
  )
}
