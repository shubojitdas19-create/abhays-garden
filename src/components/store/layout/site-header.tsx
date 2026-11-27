'use client'

import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  ArrowRight,
  BookOpen,
  ChevronRight,
  Heart,
  Menu,
  MessageCircle,
  MessageSquareText,
  Search,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Sprout,
  Star,
  Store,
  User,
  X,
} from 'lucide-react'
import { CartDrawer } from '@/components/store/layout/cart-drawer'
import { AuthModal } from '@/components/store/account/auth-modal'
import { useCart } from '@/components/store/cart-context'

const navLinks = [
  { label: 'Shop All', href: '/shop' },
  { label: 'Nurseries', href: '/nurseries' },
  { label: 'Community', href: '/community' },
  { label: 'Journal', href: '/journal' },
  { label: 'Reviews', href: '/reviews' },
  { label: 'Sell With Us', href: '/sell', featured: true },
]

const mobileShopLinks = [
  { label: 'Shop All Plants', href: '/shop', icon: Sprout, hint: '300+ rooftop-grown plants' },
  { label: 'Bestsellers', href: '/#bestsellers', icon: Sparkles, hint: 'Most-loved indoor picks' },
  { label: 'Local Nurseries', href: '/nurseries', icon: Store, hint: 'Verified Bengal growers' },
  { label: 'Plant Finder Quiz', href: '/#plant-finder', icon: Search, hint: 'Match to your light' },
  { label: '7-Day Guarantee', href: '/guarantee', icon: ShieldCheck, hint: '360° unboxing protection' },
]

const mobileCommunityLinks = [
  { label: 'Plant Care Q&A', href: '/community', icon: MessageSquareText, hint: 'Ask our nursery clinic' },
  { label: 'Botanical Journal', href: '/journal', icon: BookOpen, hint: 'Manuals & seasonal tips' },
  { label: 'Customer Reviews', href: '/reviews', icon: Star, hint: '4.9★ verified stories' },
]

function isRouteActive(pathname: string, href: string): boolean {
  if (href.startsWith('/#')) return false
  if (href === '/') return pathname === '/'
  return pathname === href || pathname.startsWith(`${href}/`)
}

export function SiteHeader() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLElement>(null)
  const menuTriggerRef = useRef<HTMLButtonElement>(null)
  const [searchOverlayOpen, setSearchOverlayOpen] = useState(false)
  const [authOpen, setAuthOpen] = useState(false)
  const { count, wishlist, isCartOpen, toggleCart } = useCart()
  const [countPopped, setCountPopped] = useState(false)
  const [wishlistPopped, setWishlistPopped] = useState(false)

  const prevWishlistCount = useRef(wishlist.length)

  useEffect(() => {
    if (count === 0) return
    setCountPopped(true)
    const timeout = window.setTimeout(() => setCountPopped(false), 480)
    return () => window.clearTimeout(timeout)
  }, [count])

  useEffect(() => {
    if (wishlist.length > prevWishlistCount.current) {
      setWishlistPopped(true)
      const timeout = window.setTimeout(() => setWishlistPopped(false), 420)
      prevWishlistCount.current = wishlist.length
      return () => window.clearTimeout(timeout)
    }
    prevWishlistCount.current = wishlist.length
  }, [wishlist.length])

  useEffect(() => {
    setMenuOpen(false)
    setSearchOverlayOpen(false)
  }, [pathname])

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
      const focusable = Array.from(
        menuRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), input'),
      )
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
        <div className="relative mx-auto flex h-16 w-full max-w-[100rem] items-center justify-between gap-2 px-4 sm:px-6 lg:h-20 lg:gap-4 lg:px-8 xl:px-12 2xl:px-14">
          {/* Left: Mobile Menu Button + Brand Lockup */}
          <div className="flex min-w-0 shrink-0 items-center gap-1.5 sm:gap-2.5">
            <button
              ref={menuTriggerRef}
              type="button"
              className="-ml-2 inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full text-foreground transition-colors hover:bg-muted active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1A3325] lg:hidden"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              onClick={() => {
                setMenuOpen((o) => !o)
                setSearchOverlayOpen(false)
              }}
            >
              {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>

            <Link
              href="/"
              className="group flex shrink-0 items-center gap-2 sm:gap-2.5"
              aria-label="Abhay's Roof Garden home"
            >
              <div className="relative flex size-9 shrink-0 overflow-hidden rounded-full border border-border bg-white shadow-xs transition-transform duration-300 group-hover:scale-105 sm:size-11">
                <Image
                  src="/images/logo2.png"
                  alt="Abhay's Roof Garden Logo"
                  fill
                  sizes="44px"
                  className="object-cover"
                />
              </div>
              <span className="flex flex-col justify-center leading-none">
                <span className="font-serif text-[1.05rem] font-bold tracking-tight text-foreground whitespace-nowrap sm:text-lg xl:text-xl 2xl:text-2xl">
                  {"Abhay's Roof Garden"}
                </span>
                <span className="mt-0.5 text-[9px] font-bold uppercase tracking-[0.18em] text-muted-foreground sm:text-[10px]">
                  Homegrown Nursery
                </span>
              </span>
            </Link>
          </div>

          {/* Center: Desktop Navigation — ALL 6 options always visible at lg (1024px) through 2xl+ */}
          <nav aria-label="Main" className="hidden shrink-0 lg:block">
            <ul className="flex items-center gap-3.5 xl:gap-5 2xl:gap-7">
              {navLinks.map((link) => {
                const active = isRouteActive(pathname, link.href)
                return (
                  <li key={link.label} className="shrink-0">
                    <Link
                      href={link.href}
                      aria-current={active ? 'page' : undefined}
                      className={`relative inline-flex items-center whitespace-nowrap text-[13px] font-semibold transition-all duration-200 xl:text-sm ${
                        link.featured
                          ? `rounded-full px-3.5 py-2 shadow-xs active:scale-95 xl:px-4 ${
                              active
                                ? 'bg-[#1A3325] text-white'
                                : 'bg-[#E5A849] text-[#1A3325] hover:bg-[#efbc69]'
                            }`
                          : `py-2 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-[#1A3325] after:transition-all after:duration-300 ${
                              active
                                ? 'text-[#1A3325] after:w-full'
                                : 'text-foreground/75 hover:text-[#1A3325] after:w-0 hover:after:w-full'
                            }`
                      }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>

          {/* Right: Search + Wishlist + Account + Cart */}
          <div className="flex shrink-0 items-center gap-0.5 sm:gap-1">
            {/* Inline Desktop Search on xl+ (1280px+) so 1024px screens stay spacious & unclipped */}
            <form role="search" action="/shop" method="get" className="relative mr-1 hidden xl:block">
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
                className="h-10 w-44 rounded-full border border-border bg-card pr-4 pl-10 text-sm placeholder:text-muted-foreground transition-all duration-300 focus:w-56 focus:border-[#1A3325] focus:outline-none focus:ring-2 focus:ring-[#1A3325]/20 2xl:w-60 2xl:focus:w-72"
              />
            </form>

            {/* Expandable Search Trigger for Mobile, Tablet & Compact Laptops (< 1280px) */}
            <button
              type="button"
              onClick={() => {
                setSearchOverlayOpen(true)
                setMenuOpen(false)
              }}
              className="inline-flex size-10 items-center justify-center rounded-full text-foreground transition-colors hover:bg-muted hover:text-[#1A3325] active:scale-95 xl:hidden"
              aria-label="Open plant search"
            >
              <Search className="size-5" aria-hidden="true" />
            </button>

            <Link
              href="/wishlist"
              className="relative hidden size-10 items-center justify-center rounded-full text-foreground transition-colors hover:bg-muted hover:text-[#1A3325] active:scale-95 sm:inline-flex"
              aria-label={`Wishlist, ${wishlist.length} saved`}
            >
              <Heart
                className={`size-5 transition-colors ${wishlist.length > 0 ? 'text-[#1A3325]' : ''} ${
                  wishlistPopped ? 'animate-heart-pop fill-[#C26743] text-[#C26743]' : ''
                }`}
                aria-hidden="true"
              />
              {wishlist.length > 0 && (
                <span
                  className={`absolute right-0.5 top-0.5 flex min-w-4 items-center justify-center rounded-full bg-[#C26743] px-1 text-[9px] font-bold leading-4 text-white shadow-xs tabular-nums ${
                    wishlistPopped ? 'animate-heart-pop' : ''
                  }`}
                  aria-hidden="true"
                >
                  {wishlist.length}
                </span>
              )}
            </Link>

            <button
              type="button"
              onClick={() => setAuthOpen(true)}
              className="hidden size-10 items-center justify-center rounded-full text-foreground transition-colors hover:bg-muted hover:text-[#1A3325] active:scale-95 sm:inline-flex"
              aria-label="Open account menu"
              aria-haspopup="dialog"
            >
              <User className="size-5" aria-hidden="true" />
            </button>

            <button
              type="button"
              onClick={toggleCart}
              className="relative inline-flex size-10 items-center justify-center rounded-full text-foreground transition-colors hover:bg-muted hover:text-[#1A3325] active:scale-95"
              aria-label={`Plant bag, ${count} ${count === 1 ? 'item' : 'items'}`}
              aria-expanded={isCartOpen}
              aria-controls="cart-drawer"
            >
              <ShoppingBag className="size-5" aria-hidden="true" />
              <span
                className={`absolute right-0.5 top-0.5 flex min-w-4.5 items-center justify-center rounded-full bg-[#E5A849] px-1 text-[10px] font-bold leading-4.5 text-[#1A3325] shadow-xs tabular-nums ${
                  countPopped ? 'animate-cart-pop' : ''
                }`}
                aria-hidden="true"
              >
                {count}
              </span>
            </button>
          </div>

          {/* Slide-down Search Overlay (Mobile + Tablet + 1024px Laptop) */}
          <div
            className={`absolute inset-0 z-50 flex items-center justify-center bg-background/98 px-4 backdrop-blur-md transition-all duration-300 xl:hidden ${
              searchOverlayOpen
                ? 'translate-y-0 opacity-100'
                : '-translate-y-full opacity-0 pointer-events-none'
            }`}
          >
            <form
              action="/shop"
              method="get"
              role="search"
              className="flex w-full max-w-xl items-center gap-2 rounded-full border border-[#cfd8cc] bg-white px-4 py-1 shadow-md"
            >
              <Search className="size-4.5 shrink-0 text-[#527358]" aria-hidden="true" />
              <label htmlFor="overlay-search" className="sr-only">Search plants</label>
              <input
                id="overlay-search"
                name="q"
                type="search"
                placeholder="Search Monstera, Hibiscus, low light, ceramic pots..."
                className="h-10 w-full bg-transparent text-base text-[#1A3325] outline-none placeholder:text-muted-foreground sm:text-sm"
                autoFocus={searchOverlayOpen}
              />
              <button
                type="submit"
                className="hidden h-8 shrink-0 items-center rounded-full bg-[#1A3325] px-3.5 text-xs font-semibold text-white transition-colors hover:bg-[#294735] sm:inline-flex"
              >
                Search
              </button>
              <button
                type="button"
                onClick={() => setSearchOverlayOpen(false)}
                className="inline-flex size-8 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                aria-label="Close search"
              >
                <X className="size-4.5" aria-hidden="true" />
              </button>
            </form>
          </div>
        </div>

        {/* Premium Boutique Mobile Sidebar Drawer */}
        {menuOpen &&
          typeof document !== 'undefined' &&
          createPortal(
            <div className="fixed inset-0 z-[60] lg:hidden">
              <button
                type="button"
                aria-label="Close navigation menu"
                className="absolute inset-0 bg-[#0b1f16]/60 backdrop-blur-[3px] transition-opacity"
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
                className="animate-drawer-in-left absolute inset-y-0 left-0 flex w-[min(88vw,23.5rem)] flex-col overflow-hidden bg-[#f7f5ef] shadow-[0_24px_80px_rgba(10,30,20,0.45)]"
              >
                {/* Branded Forest Top Banner */}
                <div className="shrink-0 bg-[#0F291E] px-5 pb-4 pt-[max(1.15rem,env(safe-area-inset-top))] text-white">
                  <div className="flex items-center justify-between gap-3">
                    <Link
                      href="/"
                      onClick={() => setMenuOpen(false)}
                      className="flex min-w-0 items-center gap-2.5"
                    >
                      <span className="relative size-10 shrink-0 overflow-hidden rounded-full border border-white/25 bg-white shadow-sm">
                        <Image
                          src="/images/logo2.png"
                          alt="Abhay's Roof Garden"
                          fill
                          sizes="40px"
                          className="object-cover"
                        />
                      </span>
                      <span className="min-w-0 leading-tight">
                        <span className="block truncate font-serif text-lg font-semibold text-white">
                          Abhay&apos;s Roof Garden
                        </span>
                        <span className="mt-0.5 block text-[10px] font-semibold uppercase tracking-[0.18em] text-[#f0c780]">
                          Bengal Rooftop Collective
                        </span>
                      </span>
                    </Link>
                    <button
                      type="button"
                      onClick={() => {
                        setMenuOpen(false)
                        menuTriggerRef.current?.focus()
                      }}
                      className="inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition-colors hover:bg-white/20 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E5A849]"
                      aria-label="Close navigation menu"
                    >
                      <X className="size-5" aria-hidden="true" />
                    </button>
                  </div>

                  {/* Quick Sidebar Plant Search */}
                  <form
                    action="/shop"
                    method="get"
                    role="search"
                    onSubmit={() => setMenuOpen(false)}
                    className="relative mt-4"
                  >
                    <label htmlFor="drawer-search" className="sr-only">
                      Search plants
                    </label>
                    <Search
                      className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-white/60"
                      aria-hidden="true"
                    />
                    <input
                      id="drawer-search"
                      name="q"
                      type="search"
                      placeholder="Search plants, pots, nurseries..."
                      className="h-10 w-full rounded-full border border-white/15 bg-white/10 pl-10 pr-4 text-base text-white outline-none transition placeholder:text-white/55 focus:border-[#E5A849] focus:bg-white/15 sm:text-sm"
                    />
                  </form>
                </div>

                {/* Scrollable Navigation Sections */}
                <div className="flex-1 overflow-y-auto overscroll-contain px-4 py-4">
                  {/* Group 1: Shop & Explore */}
                  <div>
                    <p className="px-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#8a6d43]">
                      Shop &amp; Explore
                    </p>
                    <ul className="mt-2 space-y-1">
                      {mobileShopLinks.map((link) => {
                        const Icon = link.icon
                        const active = isRouteActive(pathname, link.href)
                        return (
                          <li key={link.href}>
                            <Link
                              href={link.href}
                              onClick={() => setMenuOpen(false)}
                              aria-current={active ? 'page' : undefined}
                              className={`group flex min-h-12 items-center gap-3 rounded-2xl px-2.5 py-2 transition-colors ${
                                active
                                  ? 'bg-[#e6efe2] text-[#1A3325]'
                                  : 'text-[#1A3325] hover:bg-white'
                              }`}
                            >
                              <span
                                className={`flex size-9 shrink-0 items-center justify-center rounded-xl transition-colors ${
                                  active
                                    ? 'bg-[#1A3325] text-white'
                                    : 'bg-white text-[#426b4b] shadow-2xs ring-1 ring-[#e5e8df] group-hover:bg-[#edf1e9]'
                                }`}
                              >
                                <Icon className="size-4" aria-hidden="true" />
                              </span>
                              <span className="min-w-0 flex-1">
                                <span className="block truncate text-sm font-semibold leading-tight">
                                  {link.label}
                                </span>
                                <span className="mt-0.5 block truncate text-[11px] text-[#707d73]">
                                  {link.hint}
                                </span>
                              </span>
                              <ChevronRight
                                className="size-4 shrink-0 text-[#9aa69c] transition-transform group-hover:translate-x-0.5"
                                aria-hidden="true"
                              />
                            </Link>
                          </li>
                        )
                      })}
                    </ul>
                  </div>

                  {/* Group 2: Community & Stories */}
                  <div className="mt-5">
                    <p className="px-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#8a6d43]">
                      Community &amp; Guides
                    </p>
                    <ul className="mt-2 space-y-1">
                      {mobileCommunityLinks.map((link) => {
                        const Icon = link.icon
                        const active = isRouteActive(pathname, link.href)
                        return (
                          <li key={link.href}>
                            <Link
                              href={link.href}
                              onClick={() => setMenuOpen(false)}
                              aria-current={active ? 'page' : undefined}
                              className={`group flex min-h-12 items-center gap-3 rounded-2xl px-2.5 py-2 transition-colors ${
                                active
                                  ? 'bg-[#e6efe2] text-[#1A3325]'
                                  : 'text-[#1A3325] hover:bg-white'
                              }`}
                            >
                              <span
                                className={`flex size-9 shrink-0 items-center justify-center rounded-xl transition-colors ${
                                  active
                                    ? 'bg-[#1A3325] text-white'
                                    : 'bg-white text-[#426b4b] shadow-2xs ring-1 ring-[#e5e8df] group-hover:bg-[#edf1e9]'
                                }`}
                              >
                                <Icon className="size-4" aria-hidden="true" />
                              </span>
                              <span className="min-w-0 flex-1">
                                <span className="block truncate text-sm font-semibold leading-tight">
                                  {link.label}
                                </span>
                                <span className="mt-0.5 block truncate text-[11px] text-[#707d73]">
                                  {link.hint}
                                </span>
                              </span>
                              <ChevronRight
                                className="size-4 shrink-0 text-[#9aa69c] transition-transform group-hover:translate-x-0.5"
                                aria-hidden="true"
                              />
                            </Link>
                          </li>
                        )
                      })}
                    </ul>
                  </div>

                  {/* Highlighted Grower Partner Card */}
                  <Link
                    href="/sell"
                    onClick={() => setMenuOpen(false)}
                    className="mt-5 flex items-center justify-between gap-3 rounded-2xl border border-[#ebd7ad] bg-[#fdf5e4] p-3.5 text-[#1A3325] shadow-2xs transition-colors hover:bg-[#faeccf]"
                  >
                    <div className="min-w-0">
                      <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#a65f2b]">
                        Grower Partner Program
                      </p>
                      <p className="mt-0.5 font-serif text-base font-semibold leading-snug">
                        Sell With Us
                      </p>
                      <p className="mt-0.5 text-[11px] text-[#6d624d]">
                        List your local nursery on our collective
                      </p>
                    </div>
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#E5A849] text-[#1A3325]">
                      <ArrowRight className="size-4" aria-hidden="true" />
                    </span>
                  </Link>
                </div>

                {/* Sticky Bottom Utility Dock */}
                <div className="shrink-0 border-t border-[#e5e8df] bg-white px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3">
                  <div className="grid grid-cols-2 gap-2">
                    <Link
                      href="/account"
                      onClick={() => setMenuOpen(false)}
                      className="flex min-h-11 items-center justify-center gap-2 rounded-xl border border-[#e3e7de] bg-[#fbfaf6] px-3 text-xs font-semibold text-[#1A3325] transition-colors hover:bg-[#edf1e9]"
                    >
                      <User className="size-4 text-[#426b4b]" aria-hidden="true" />
                      My Account
                    </Link>

                    <Link
                      href="/wishlist"
                      onClick={() => setMenuOpen(false)}
                      className="flex min-h-11 items-center justify-center gap-2 rounded-xl border border-[#e3e7de] bg-[#fbfaf6] px-3 text-xs font-semibold text-[#1A3325] transition-colors hover:bg-[#edf1e9]"
                    >
                      <Heart className="size-4 text-[#C26743]" aria-hidden="true" />
                      Wishlist
                      {wishlist.length > 0 && (
                        <span className="rounded-full bg-[#C26743] px-1.5 py-0.5 text-[10px] font-bold leading-none text-white tabular-nums">
                          {wishlist.length}
                        </span>
                      )}
                    </Link>
                  </div>

                  <a
                    href="https://wa.me/919476433880?text=Hi%20Abhay%E2%80%99s%20Roof%20Garden%2C%20I%E2%80%99d%20love%20some%20plant%20recommendations!"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-[#1A3325] px-4 text-xs font-semibold text-white transition-colors hover:bg-[#294735]"
                  >
                    <MessageCircle className="size-4 text-[#E5A849]" aria-hidden="true" />
                    WhatsApp Plant Concierge
                  </a>
                </div>
              </nav>
            </div>,
            document.body,
          )}
      </header>
      <CartDrawer />
      <AuthModal open={authOpen} onOpenChange={setAuthOpen} />
    </>
  )
}
