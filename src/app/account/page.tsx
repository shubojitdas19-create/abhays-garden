import type { Metadata } from 'next'
import { AccountDashboard } from '@/components/store/account/account-dashboard'
import { SiteHeader } from '@/components/store/layout/site-header'
import { CartProvider } from '@/components/store/cart-context'

export const metadata: Metadata = {
  title: "Your garden account | Abhay's Roof Garden",
  description: 'Review your plant orders, saved addresses, and wishlist.',
}

export default function AccountPage() {
  return (
    <CartProvider>
      <SiteHeader />
      <AccountDashboard />
    </CartProvider>
  )
}
