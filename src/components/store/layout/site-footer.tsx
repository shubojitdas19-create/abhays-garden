'use client'

import Image from 'next/image'
import Link from 'next/link'
import { MapPin, Phone, Mail, MessageCircle } from 'lucide-react'
import { FooterSitemap, footerPolicyLinks } from './footer-sitemap'

export function SiteFooter() {
  return (
    <footer className="w-full bg-[#0F291E] pb-6 pt-10 sm:pt-12 lg:pt-14 border-t border-white/10">
      <div className="mx-auto w-full max-w-[100rem] px-4 sm:px-6 lg:px-10 xl:px-14">
        
        {/* Compact 3-Column Layout */}
        <div className="grid gap-8 border-b border-white/10 pb-8 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          
          {/* Brand Col */}
          <div className="flex flex-col items-start gap-4 lg:col-span-4">
            <a href="/" className="flex shrink-0 items-center gap-2.5">
              <div className="relative flex size-10 shrink-0 overflow-hidden rounded-full border border-white/20 shadow-sm bg-white">
                <Image 
                  src="/images/logo2.png" 
                  alt="Abhay's Roof Garden Logo" 
                  fill 
                  sizes="40px" 
                  className="object-cover"
                />
              </div>
              <span className="flex flex-col justify-center leading-none">
                <span className="font-serif text-lg font-bold tracking-tight text-white">
                  {"Abhay's Roof Garden"}
                </span>
                <span className="mt-0.5 text-[9px] font-bold uppercase tracking-[0.2em] text-[#E5A849]">
                  Homegrown Nursery
                </span>
              </span>
            </a>
            <p className="text-xs leading-relaxed text-white/70 max-w-xs">
              Nursery-grown plants, hardened on our rooftop and delivered fresh to your door.
            </p>
          </div>

          {/* Address Col */}
          <div className="flex flex-col gap-3 lg:col-span-4 lg:pl-4">
            <h4 className="font-serif text-base font-medium text-white">Visit Us</h4>
            <div className="flex gap-3 text-white/70 text-xs sm:text-sm">
              <MapPin className="mt-0.5 size-4 shrink-0 text-[#E5A849]" />
              <div className="flex flex-col gap-1">
                <span className="font-medium text-white">Chuanpore, Sukantapally,</span>
                <span>Berhampore, Murshidabad,</span>
                <span>West Bengal - 742407</span>
                <span className="mt-1 font-medium text-[#E5A849]">9:00 AM – 7:00 PM (WhatsApp first)</span>
              </div>
            </div>
          </div>

          {/* Contact Col */}
          <div className="flex flex-col gap-3 lg:col-span-4">
            <h4 className="font-serif text-base font-medium text-white">Contact & Support</h4>
            <div className="flex gap-3 text-white/70 text-xs sm:text-sm">
              <Phone className="mt-0.5 size-4 shrink-0 text-[#E5A849]" />
              <div className="flex flex-col gap-2">
                <a href="tel:+919476433880" className="hover:text-white transition-colors">+91 94764 33880</a>
                <a href="https://wa.me/919476433880" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-green-400 hover:text-green-300">
                  <MessageCircle className="size-3.5" /> WhatsApp Us
                </a>
                <a href="mailto:abhaysroofgarden@gmail.com" className="flex items-center gap-1.5 hover:text-white">
                  <Mail className="size-3.5" /> abhaysroofgarden@gmail.com
                </a>
              </div>
            </div>
            <div className="pt-4">
              <FooterSitemap />
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="flex flex-col items-center justify-between gap-3 pt-6 text-xs text-white/50 sm:flex-row">
          <p>© {new Date().getFullYear()} Abhay's Roof Garden. All rights reserved.</p>
          <nav aria-label="Policies" className="flex flex-wrap justify-center gap-x-4 gap-y-1">
            {footerPolicyLinks.map((link) => (
              <Link key={link.href} href={link.href} className="transition-colors hover:text-white focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E5A849]">
                {link.label}
              </Link>
            ))}
          </nav>
          <p className="text-white/70">
            Designed & Developed by <span className="font-bold text-[#E5A849]">Sj Digital Studio</span>
          </p>
        </div>

      </div>
    </footer>
  )
}
