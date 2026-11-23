import Link from 'next/link'

const exploreLinks = [
  { label: 'Home', href: '/' },
  { label: 'Shop all plants', href: '/shop' },
  { label: 'Nurseries', href: '/nurseries' },
  { label: 'Sell with us', href: '/sell' },
  { label: 'Track an order', href: '/track-order' },
  { label: 'Plant guarantee', href: '/guarantee' },
]

export function FooterSitemap() {
  return (
    <nav aria-label="Explore Abhay’s Roof Garden" className="flex flex-col gap-3">
      <h2 className="font-serif text-base font-medium text-white">Explore</h2>
      <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs text-white/70 sm:text-sm lg:grid-cols-1">
        {exploreLinks.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="inline-flex min-h-8 items-center transition-colors hover:text-white focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E5A849]">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export const footerPolicyLinks = [
  { label: 'Terms & Conditions', href: '/terms' },
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Refund Policy', href: '/refunds' },
  { label: 'Shipping & Delivery', href: '/shipping' },
]
