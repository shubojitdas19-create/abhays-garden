import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Fraunces, Inter } from 'next/font/google'
import { ConditionalFooter } from '@/components/store/layout/conditional-footer'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const fraunces = Fraunces({ subsets: ['latin'], variable: '--font-fraunces' })

export const metadata: Metadata = {
  title: "Abhay's Roof Garden — Homegrown Plants, Delivered",
  description:
    'Shop healthy, homegrown indoor plants, flowering plants, succulents and herbs from our rooftop nursery. Delivered to your door with a 7-day plant guarantee.',
  generator: 'v0.app',
  // The 'icons' block has been removed so Next.js automatically uses your favicon.ico
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#f7f3ea',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable}`}>
      <body className="flex min-h-screen flex-col antialiased">
        <div className="flex-1">
          {children}
        </div>
        
        {/* This will automatically render the SiteFooter on all pages except '/' */}
        <ConditionalFooter />
        
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}