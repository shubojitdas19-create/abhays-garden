import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ProductDetail } from '@/components/store/product/product-detail'
import { CartProvider } from '@/components/store/cart-context'
import { SiteHeader } from '@/components/store/layout/site-header'
import { products } from '@/components/store/products'

type ProductPageProps = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return products.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params
  const product = products.find((item) => item.slug === slug)

  if (!product) return { title: 'Plant not found | Abhay’s Roof Garden' }

  return {
    title: `${product.name} — ${product.botanical} | Abhay’s Roof Garden`,
    description: `${product.description} Shop from ${product.nursery.name}. Wrong or transit-damaged plant claims are accepted within 7 days with a complete 360° unboxing video.`,
    openGraph: {
      title: `${product.name} | Abhay’s Roof Garden`,
      description: product.description,
      images: [product.image],
    },
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params
  const product = products.find((item) => item.slug === slug)

  if (!product) notFound()

  const relatedProducts = products.filter((item) => item.id !== product.id)

  return (
    <CartProvider>
      <SiteHeader />
      <ProductDetail product={product} relatedProducts={relatedProducts} />
    </CartProvider>
  )
}
