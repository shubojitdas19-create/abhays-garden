'use client'

import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import Image from 'next/image'
import Link from 'next/link'
import { Heart, Menu, Search, ShoppingBag, User, X } from 'lucide-react'
import { CartDrawer } from '@/components/store/layout/cart-drawer'
import { AuthModal } from '@/components/store/account/auth-modal'
import { useCart } from '@/components/store/cart-context'

const navLinks = [
  { label: 'Shop All', href: '/shop' },
  { label: 'Nurseries', href: '/nurseries' },
  { label: 'Plant Finder Quiz', href: '/#plant-finder' },
  { label: 'Sell With Us', href: '/sell', featured: true },
]

const mobileExploreLinks = [
  { label: 'Shop All', href: '/shop' },
  { label: 'Bestsellers', href: '/#bestsellers' },
  { label: 'Nurseries Directory', href: '/nurseries' },
  { label: 'Community Q&A', href: '/community' },
  { label: 'Reviews', href: '/reviews' },
  { label: 'Journal / Blog', href: '/journal' },
  { label: 'Sell With Us', href: '/sell' },
]

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLElement>(null)
  const menuTriggerRef = useRef<HTMLButtonElement>(null)
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false)
  const [authOpen, setAuthOpen] = useState(false)
  const { count, isCartOpen, toggleCart } = useCart()
  const [countPopped, setCountPopped] = useState(false)

  useEffect(() => {
    if (count === 0) return
    setCountPopped(true)
    const timeout = window.setTimeout(() => setCountPopped(false), 480)
    return () => window.clearTimeout(timeout)
  }, [count])

  useEffect(() => {
    if (!menuOpen) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    menuRef.current?.querySelector<HTMLElement>('button, a')?.focus()

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
        menuTriggerRef.current?.focus()
        return
      }

      if (event.key !== 'Tab' || !menuRef.current) return
      const focusable = Array.from(menuRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled])'))
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last?.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first?.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [menuOpen])

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border/70 bg-background/95 backdrop-blur-md">
      
      {/* Expanded Max-Width for Full Screen Desktop Support */}
      <div className="relative mx-auto flex h-16 w-full max-w-[100rem] items-center gap-4 px-4 sm:px-6 lg:h-20 lg:px-10 xl:px-14">
        
        <button
          ref={menuTriggerRef}
          type="button"
          className="-ml-2 inline-flex size-10 items-center justify-center rounded-full text-foreground transition-colors hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1A3325] lg:hidden"
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
          <button type="button" onClick={() => setAuthOpen(true)} className="hidden size-10 items-center justify-center rounded-full text-foreground transition-colors hover:bg-muted hover:text-[#1A3325] sm:inline-flex" aria-label="Open account sign-in" aria-haspopup="dialog">
            <User className="size-5" aria-hidden="true" />
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
              className={`absolute right-0.5 top-0.5 flex min-w-4.5 items-center justify-center rounded-full bg-[#E5A849] px-1 text-[10px] font-bold leading-4.5 text-white shadow-sm ${countPopped ? 'animate-cart-pop' : ''}`}
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

      {menuOpen && typeof document !== 'undefined' && createPortal((
        <div className="fixed inset-0 z-[60] lg:hidden">
          <button
            type="button"
            aria-label="Close navigation menu"
            className="absolute inset-0 bg-[#10251b]/55 backdrop-blur-[2px]"
            onClick={() => {
              setMenuOpen(false)
              menuTriggerRef.current?.focus()
            }}
          />
          <nav
            ref={menuRef}
            id="mobile-nav"
            aria-label="Mobile navigation"
            aria-modal="true"
            role="dialog"
            className="absolute inset-y-0 left-0 flex w-[min(88vw,24rem)] flex-col overflow-y-auto overscroll-contain border-r border-border bg-background px-5 pb-6 pt-[max(1.25rem,env(safe-area-inset-top))] shadow-2xl motion-safe:animate-in motion-safe:slide-in-from-left motion-safe:duration-300"
          >
            <div className="mb-5 flex items-center justify-between border-b border-border/70 pb-4">
              <div>
                <p className="font-serif text-xl font-semibold text-foreground">Explore the garden</p>
                <p className="mt-1 text-xs text-muted-foreground">A little more green, every day</p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false)
                  menuTriggerRef.current?.focus()
                }}
                className="inline-flex size-11 items-center justify-center rounded-full text-foreground transition-colors hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1A3325]"
                aria-label="Close navigation menu"
              >
                <X className="size-5" aria-hidden="true" />
              </button>
            </div>
            <ul className="flex flex-col">
              {mobileExploreLinks.map((link) => (
                <li key={link.href} className="border-b border-border/60">
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="flex min-h-12 items-center rounded-md px-2 text-base font-medium text-foreground transition-colors hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1A3325]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="border-b border-border/60">
                <Link href="/guarantee" onClick={() => setMenuOpen(false)} className="flex min-h-12 items-center rounded-md px-2 text-base font-medium text-foreground transition-colors hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1A3325]">
                  Plant Guarantee
                </Link>
              </li>
              <li className="border-b border-border/60">
                <Link href="/wishlist" onClick={() => setMenuOpen(false)} className="flex min-h-12 items-center rounded-md px-2 text-base font-medium text-foreground transition-colors hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1A3325]">
                  Wishlist
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false)
                    setAuthOpen(true)
                  }}
                  className="flex min-h-12 w-full items-center gap-3 rounded-md px-2 text-left text-base font-medium text-foreground transition-colors hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1A3325]"
                  aria-haspopup="dialog"
                >
                  <User className="size-5" aria-hidden="true" /> My Account
                </button>
              </li>
            </ul>
          </nav>
        </div>
      ), document.body)}
      </header>
      <CartDrawer />
      <AuthModal open={authOpen} onOpenChange={setAuthOpen} />
    </>
  )
}
