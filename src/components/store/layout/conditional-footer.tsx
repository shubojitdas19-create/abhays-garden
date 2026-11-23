'use client'

import { usePathname } from 'next/navigation'
import { SiteFooter } from './site-footer'

export function ConditionalFooter() {
  const pathname = usePathname()

  // If we are on the homepage, return nothing (because HomeFooter is already there)
  if (pathname === '/') {
    return null
  }

  // On every other page, automatically show the compact SiteFooter
  const needsMobileFooterClearance = pathname === '/shop' || pathname.startsWith('/shop/')

  return (
    <div className={`bg-[#0F291E] ${needsMobileFooterClearance ? 'pb-[56px] lg:pb-0' : ''}`}>
      <SiteFooter />
    </div>
  )
}
