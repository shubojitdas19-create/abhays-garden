'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Heart, Menu, Search, ShoppingBag, User, X } from 'lucide-react'
import { CartDrawer } from '@/components/store/layout/cart-drawer'
import { useCart } from '@/components/store/cart-context'

const navLinks = [
  { label: 'Shop All', href: '/shop' },
  { label: 'Nurseries', href: '/nurseries' },
  { label: 'Plant Finder Quiz', href: '/#plant-finder' },
  { label: 'Sell With Us', href: '/sell', featured: true },
]

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false)
  const { count, isCartOpen, toggleCart } = useCart()

  useEffect(() => {
    if (!menuOpen) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [menuOpen])

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border/70 bg-background/95 backdrop-blur-md">
      
      {/* Expanded Max-Width for Full Screen Desktop Support */}
      <div className="relative mx-auto flex h-16 w-full max-w-[100rem] items-center gap-4 px-4 sm:px-6 lg:h-20 lg:px-10 xl:px-14">
        
        <button
          type="button"
          className="-ml-2 inline-flex size-10 items-center justify-center rounded-full text-foreground hover:bg-muted lg:hidden"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          onClick={() => {
            setMenuOpen((o) => !o)
            setMobileSearchOpen(false) // Close search if opening menu
          }}
        >
          {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>

        <Link href="/" className="flex shrink-0 items-center gap-2.5" aria-label="Abhay's Roof Garden home">
          <div className="relative flex size-10 shrink-0 overflow-hidden rounded-full border border-border shadow-sm sm:size-12">
            <Image 
              src="/images/logo2.png" 
              alt="Abhay's Roof Garden Logo" 
              fill 
              sizes="48px" 
              className="object-cover"
            />
          </div>
          <span className="flex flex-col justify-center leading-none">
            <span className="font-serif text-lg font-bold tracking-tight text-foreground whitespace-nowrap sm:text-xl lg:text-2xl">
              {"Abhay's Roof Garden"}
            </span>
            <span className="mt-0.5 text-[9px] font-bold uppercase tracking-[0.2em] text-muted-foreground sm:text-[10px]">
              Homegrown Nursery
            </span>
          </span>
        </Link>

        {/* Desktop Navigation - Fixed wrapping and added animations */}
        <nav aria-label="Main" className="mx-auto hidden lg:block overflow-hidden px-2">
          <ul className="flex items-center gap-5 xl:gap-8">
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className={`relative py-2 text-sm font-semibold whitespace-nowrap transition-colors after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:transition-all after:duration-300 hover:after:w-full ${link.featured ? 'rounded-full bg-[#E5A849] px-4 text-[#1A3325] after:hidden hover:bg-[#d99a3d]' : 'text-foreground/80 hover:text-[#1A3325] after:bg-[#1A3325]'}`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto flex shrink-0 items-center gap-1 lg:ml-0">
          
          {/* Desktop Search Form */}
          <form role="search" action="/shop" method="get" className="relative mr-2 hidden lg:block">
            <label htmlFor="desktop-search" className="sr-only">Search plants</label>
            <button 
              type="submit" 
              className="absolute left-3.5 top-1/2 flex -translate-y-1/2 items-center justify-center text-muted-foreground transition-colors hover:text-[#1A3325]"
              aria-label="Submit search"
            >
              <Search className="size-4" aria-hidden="true" />
            </button>
            <input
              id="desktop-search"
              name="q"
              type="search"
              placeholder="Search plants..."
              className="h-10 w-44 rounded-full border border-border bg-card pr-4 pl-10 text-sm placeholder:text-muted-foreground transition-all focus:w-64 focus:border-[#1A3325] focus:outline-none focus:ring-2 focus:ring-[#1A3325]/20 xl:w-60 xl:focus:w-72"
            />
          </form>
          
          {/* Mobile Search Button */}
          <button 
            type="button" 
            onClick={() => {
              setMobileSearchOpen(true)
              setMenuOpen(false)
            }}
            className="inline-flex size-10 items-center justify-center rounded-full text-foreground transition-colors hover:bg-muted hover:text-[#1A3325] lg:hidden" 
            aria-label="Open mobile search"
          >
            <Search className="size-5" />
          </button>
          
          <Link href="/wishlist" className="hidden size-10 items-center justify-center rounded-full text-foreground transition-colors hover:bg-muted hover:text-[#1A3325] sm:inline-flex" aria-label="Wishlist">
            <Heart className="size-5" aria-hidden="true" />
          </Link>
          <button type="button" className="hidden size-10 items-center justify-center rounded-full text-foreground transition-colors hover:bg-muted hover:text-[#1A3325] sm:inline-flex" aria-label="Account">
            <User className="size-5" />
          </button>
          
          <button
            type="button"
            onClick={toggleCart}
            className="relative inline-flex size-10 items-center justify-center rounded-full text-foreground transition-colors hover:bg-muted hover:text-[#1A3325]"
            aria-label={`Cart, ${count} ${count === 1 ? 'item' : 'items'}`}
            aria-expanded={isCartOpen}
            aria-controls="cart-drawer"
          >
            <ShoppingBag className="size-5" />
            <span
              className="absolute right-0.5 top-0.5 flex min-w-4.5 items-center justify-center rounded-full bg-[#E5A849] px-1 text-[10px] font-bold leading-4.5 text-white shadow-sm"
              aria-hidden="true"
            >
              {count}
            </span>
          </button>
        </div>

        {/* Slide-down Mobile Search Overlay */}
        <div className={`absolute inset-0 z-50 flex items-center justify-center bg-background/98 px-4 backdrop-blur-md transition-all duration-300 lg:hidden ${mobileSearchOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'}`}>
          <form action="/shop" method="get" role="search" className="flex w-full max-w-lg items-center gap-2 rounded-full border border-border bg-card px-4 py-1 shadow-sm">
            <Search className="size-4.5 shrink-0 text-muted-foreground" aria-hidden="true" />
            <label htmlFor="mobile-search" className="sr-only">Search plants</label>
            <input
              id="mobile-search"
              name="q"
              type="search"
              placeholder="Search for plants, pots, accessories..."
              className="h-10 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              // Only autofocus if the panel is currently open to prevent weird scrolling jumps
              autoFocus={mobileSearchOpen}
            />
            <button 
              type="button" 
              onClick={() => setMobileSearchOpen(false)} 
              className="shrink-0 rounded-full p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
              aria-label="Close search"
            >
              <X className="size-4.5" />
            </button>
          </form>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {menuOpen && (
        <nav id="mobile-nav" aria-label="Mobile" className="border-t border-border bg-background lg:hidden">
          <ul className="mx-auto flex max-w-7xl flex-col px-4 py-2 sm:px-6">
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className={`block border-b border-border/60 py-3.5 text-base font-medium last:border-0 ${link.featured ? 'text-[#A65F2B]' : ''}`}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="flex gap-3 py-4 sm:hidden">
              <Link href="/account" className="flex flex-1 items-center justify-center gap-2 rounded-full border border-border py-2.5 text-sm font-medium">
                <User className="size-4" aria-hidden="true" /> Account
              </Link>
              <Link href="/wishlist" className="flex flex-1 items-center justify-center gap-2 rounded-full border border-border py-2.5 text-sm font-medium">
                <Heart className="size-4" aria-hidden="true" /> Wishlist
              </Link>
            </li>
          </ul>
        </nav>
      )}
      </header>
      <CartDrawer />
    </>
  )
}
