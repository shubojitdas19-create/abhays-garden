'use client'

import { useState } from 'react'
import { Heart, Leaf, Menu, Search, ShoppingBag, User, X } from 'lucide-react'
import { useCart } from './cart-context'

const navLinks = [
  { label: 'Shop All', href: '#' },
  { label: 'Indoor', href: '#' },
  { label: 'Outdoor', href: '#' },
  { label: 'Flowering', href: '#' },
  { label: 'Pots & Planters', href: '#' },
  { label: 'Gifting', href: '#' },
]

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { count } = useCart()

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:h-20 lg:px-8">
        <button
          type="button"
          className="-ml-2 inline-flex size-10 items-center justify-center rounded-full text-foreground hover:bg-muted lg:hidden"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          onClick={() => setMenuOpen((o) => !o)}
        >
          {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>

        <a href="#" className="flex items-center gap-2" aria-label="Abhay's Roof Garden home">
          <span className="flex size-9 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <Leaf className="size-4.5" aria-hidden="true" />
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-serif text-base font-semibold tracking-tight whitespace-nowrap sm:text-lg lg:text-xl">
              {"Abhay's Roof Garden"}
            </span>
            <span className="hidden text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground sm:block">
              Homegrown Nursery
            </span>
          </span>
        </a>

        <nav aria-label="Main" className="mx-auto hidden lg:block">
          <ul className="flex items-center gap-7">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-1 lg:ml-0">
          <form role="search" className="relative mr-2 hidden xl:block" onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="desktop-search" className="sr-only">Search plants</label>
            <Search className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
            <input
              id="desktop-search"
              type="search"
              placeholder="Search plants..."
              className="h-10 w-56 rounded-full border border-border bg-card pr-4 pl-10 text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </form>
          <button type="button" className="inline-flex size-10 items-center justify-center rounded-full hover:bg-muted xl:hidden" aria-label="Search">
            <Search className="size-5" />
          </button>
          <button type="button" className="hidden size-10 items-center justify-center rounded-full hover:bg-muted sm:inline-flex" aria-label="Wishlist">
            <Heart className="size-5" />
          </button>
          <button type="button" className="hidden size-10 items-center justify-center rounded-full hover:bg-muted sm:inline-flex" aria-label="Account">
            <User className="size-5" />
          </button>
          <button
            type="button"
            className="relative inline-flex size-10 items-center justify-center rounded-full hover:bg-muted"
            aria-label={`Cart, ${count} ${count === 1 ? 'item' : 'items'}`}
          >
            <ShoppingBag className="size-5" />
            <span
              className="absolute top-0.5 right-0.5 flex min-w-4.5 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-semibold leading-4.5 text-accent-foreground"
              aria-hidden="true"
            >
              {count}
            </span>
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav id="mobile-nav" aria-label="Mobile" className="border-t border-border bg-background lg:hidden">
          <ul className="mx-auto flex max-w-7xl flex-col px-4 py-2 sm:px-6">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="block border-b border-border/60 py-3.5 text-base font-medium last:border-0"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="flex gap-3 py-4 sm:hidden">
              <a href="#" className="flex flex-1 items-center justify-center gap-2 rounded-full border border-border py-2.5 text-sm font-medium">
                <User className="size-4" aria-hidden="true" /> Account
              </a>
              <a href="#" className="flex flex-1 items-center justify-center gap-2 rounded-full border border-border py-2.5 text-sm font-medium">
                <Heart className="size-4" aria-hidden="true" /> Wishlist
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  )
}
