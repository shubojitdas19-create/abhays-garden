'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Check, ChevronRight, Heart, Leaf, Minus, Plus, Share2, ShieldCheck, ShoppingBag, Star } from 'lucide-react'
import { useCart } from '@/components/store/cart-context'
import { formatINR, type Product } from '@/components/store/products'
import { ProductShareDialog } from './product-share-dialog'
import { NurseryTrustBox, PlantCareDashboard, PlantGuarantee, ProductRecommendations, ProductReviews } from './product-sections'

type ProductDetailProps = {
  product: Product
  relatedProducts: Product[]
}

type DetailTab = 'about' | 'care' | 'arrival'

const detailCopy: Record<DetailTab, { label: string; heading: string; body: string }> = {
  about: { label: 'About this plant', heading: 'A little more about your plant', body: 'Each plant is grown in small batches and acclimatised to everyday home conditions before it leaves the nursery. Your plant may have its own natural shape and character—that is part of what makes it yours.' },
  care: { label: 'Care guide', heading: 'Simple care, season by season', body: 'Give your plant the light listed above, water when its soil begins to dry, and make sure excess water can drain away. Rotate the pot occasionally so it grows evenly, and wipe leaves gently to keep them free of dust.' },
  arrival: { label: 'On arrival', heading: 'A calm first day at home', body: 'Unpack your plant as soon as it arrives and let it settle in a bright, sheltered spot. A little leaf movement after transit is normal. Hold off on repotting for a few days while your plant gets comfortable.' },
}

export function ProductDetail({ product, relatedProducts }: ProductDetailProps) {
  const [activeImage, setActiveImage] = useState(0)
  const [selectedSize, setSelectedSize] = useState(product.sizes.find((size) => size.label === 'M') ?? product.sizes[0])
  const [selectedPotId, setSelectedPotId] = useState(product.pots[0]?.id ?? '')
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState<DetailTab>('about')
  const [showStickyBar, setShowStickyBar] = useState(false)
  const [shareDialogOpen, setShareDialogOpen] = useState(false)
  const [shareUrl, setShareUrl] = useState('')
  const purchaseSectionRef = useRef<HTMLDivElement>(null)
  const { addItem, wishlist, toggleWishlist } = useCart()

  useEffect(() => {
    const purchaseSection = purchaseSectionRef.current
    if (!purchaseSection) return

    const observer = new IntersectionObserver(([entry]) => {
      setShowStickyBar(!entry.isIntersecting && entry.boundingClientRect.top < 0)
    })

    observer.observe(purchaseSection)
    return () => observer.disconnect()
  }, [])
  const isWishlisted = wishlist.includes(product.id)
  const toggleProductWishlist = () => toggleWishlist(product.id)

  const selectedPot = product.pots.find((pot) => pot.id === selectedPotId) ?? product.pots[0]
  const price = selectedSize.price + (selectedPot?.price ?? 0)
  const compareAt = selectedSize.mrp ? selectedSize.mrp + (selectedPot?.price ?? 0) : null
  const savingsPercent = compareAt ? Math.round((1 - price / compareAt) * 100) : null
  const gallery = product.gallery.length > 0 ? product.gallery : [product.image]
  const category = product.filters.find((filter) => filter !== 'all')?.replaceAll('-', ' ') ?? 'plants'

  async function shareProduct() {
    const url = window.location.href
    const shareData = {
      title: `${product.name} — Abhay's Roof Garden`,
      text: `Look at this homegrown ${product.name} from ${product.nursery.name}!`,
      url,
    }

    if (window.matchMedia('(max-width: 767px)').matches && typeof navigator.share === 'function') {
      try {
        await navigator.share(shareData)
        return
      } catch (error) {
        if (error instanceof Error && error.name === 'AbortError') return
      }
    }

    setShareUrl(url)
    setShareDialogOpen(true)
  }

  function addToBag() {
    if (!selectedPot) return
    addItem({
      productId: product.id,
      productName: product.name,
      size: selectedSize.label,
      pot: selectedPot.name,
      price,
      quantity,
      image: product.image,
      nurseryName: product.nursery.name,
    })
  }

  return (
    <>
      <main className="mx-auto w-full max-w-[100rem] px-4 pb-10 pt-5 sm:px-6 sm:pb-14 sm:pt-8 lg:px-10 lg:pb-16 xl:px-14">
        <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-2 text-xs text-[#778078] sm:mb-8 sm:text-sm">
          <Link href="/" className="transition-colors hover:text-[#1A3325]">Home</Link>
          <ChevronRight className="size-3.5" aria-hidden="true" />
          <Link href="/shop" className="transition-colors hover:text-[#1A3325]">Shop</Link>
          <ChevronRight className="size-3.5" aria-hidden="true" />
          <span className="capitalize">{category}</span>
          <ChevronRight className="size-3.5" aria-hidden="true" />
          <span aria-current="page" className="font-medium text-[#1A3325]">{product.name}</span>
        </nav>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(380px,0.85fr)] lg:gap-12 xl:gap-16">
          <section aria-label={`${product.name} image gallery`} className="min-w-0">
            <div className="group relative aspect-[4/4.25] overflow-hidden rounded-[1.75rem] bg-[#eee9dc] sm:rounded-[2rem]">
              <Image
                key={gallery[activeImage]}
                src={gallery[activeImage]}
                alt={`${product.name}, view ${activeImage + 1}`}
                fill
                priority
                sizes="(min-width: 1024px) 54vw, 100vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035]"
              />
              <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-[#fbfaf6]/90 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#1A3325] backdrop-blur sm:left-5 sm:top-5 sm:text-xs">
                <span className="size-1.5 rounded-full bg-[#527358]" aria-hidden="true" /> Nursery grown
              </div>
              {product.badge && <span className="absolute bottom-4 left-4 rounded-full bg-[#fbfaf6]/90 px-3 py-1.5 text-xs font-semibold text-[#1A3325] backdrop-blur sm:bottom-5 sm:left-5">{product.badge}</span>}
              <div className="absolute right-4 top-4 flex items-center gap-2 sm:right-5 sm:top-5">
                <button type="button" onClick={toggleProductWishlist} aria-pressed={isWishlisted} aria-label={isWishlisted ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`} className="inline-flex size-11 items-center justify-center rounded-full bg-[#fbfaf6]/90 text-[#1A3325] backdrop-blur transition-colors hover:bg-white">
                  <Heart className={`size-5 ${isWishlisted ? 'fill-[#c26743] text-[#c26743]' : ''}`} aria-hidden="true" />
                </button>
                <button type="button" onClick={shareProduct} aria-label={`Share ${product.name}`} className="inline-flex size-11 items-center justify-center rounded-full border border-[#dedfd5] bg-[#fbfaf6]/90 text-[#1A3325] backdrop-blur transition-colors hover:bg-white">
                  <Share2 className="size-5" aria-hidden="true" />
                </button>
              </div>
            </div>
            {gallery.length > 1 && (
              <div className="mt-3 flex gap-3 overflow-x-auto pb-1" aria-label="Choose product image">
                {gallery.map((image, index) => (
                  <button key={image} type="button" onClick={() => setActiveImage(index)} aria-label={`Show image ${index + 1} of ${product.name}`} aria-pressed={activeImage === index} className={`relative aspect-square w-[4.5rem] shrink-0 overflow-hidden rounded-xl border-2 transition-colors sm:w-20 ${activeImage === index ? 'border-[#1A3325]' : 'border-transparent hover:border-[#b7c3b5]'}`}>
                    <Image src={image} alt="" fill sizes="80px" className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </section>

          <section className="min-w-0 lg:pt-1">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#a65f2b]">
              <Leaf className="size-4" aria-hidden="true" /> Plant no. {product.tag}
            </div>
            <h1 className="mt-3 font-serif text-4xl font-semibold leading-[1.04] tracking-tight text-[#1A3325] sm:text-5xl xl:text-6xl">{product.name}</h1>
            <p className="mt-2 font-serif text-lg italic text-[#748078] sm:text-xl">{product.botanical}</p>
            <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2">
              <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#1A3325]"><Star className="size-4 fill-[#d69a43] text-[#d69a43]" aria-hidden="true" />{product.rating.toFixed(1)}</span>
              <span className="text-sm text-[#778078]">{product.reviews.toLocaleString('en-IN')} plant parent reviews</span>
              <a href="#reviews" className="text-sm font-semibold text-[#1A3325] underline decoration-[#a65f2b]/50 underline-offset-4">Read reviews</a>
            </div>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-[#58655b] sm:text-base">{product.description}</p>

            <div className="mt-6 flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="text-3xl font-semibold tracking-tight text-[#1A3325]">{formatINR(price)}</span>
              {compareAt && <span className="text-base text-[#899087] line-through">{formatINR(compareAt)}</span>}
              {savingsPercent && <span className="rounded-full bg-[#f5e9dc] px-2.5 py-1 text-xs font-semibold text-[#9b562c]">Save {savingsPercent}%</span>}
              <span className="w-full text-xs text-[#778078]">Inclusive of all taxes</span>
            </div>

            <fieldset className="mt-7">
              <legend className="text-sm font-semibold text-[#1A3325]">Choose your plant size <span className="font-normal text-[#778078]">· {selectedSize.height} tall</span></legend>
              <div className="mt-3 grid grid-cols-3 gap-2.5">
                {product.sizes.map((size) => {
                  const selected = selectedSize.label === size.label
                  return (
                    <label key={size.label} className={`relative flex min-h-[5.25rem] cursor-pointer flex-col justify-center rounded-2xl border px-3 py-2.5 transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-[#527358] ${selected ? 'border-[#1A3325] bg-[#f1f4ee]' : 'border-[#e3e3d9] bg-white hover:border-[#abb8a9]'}`}>
                      <input type="radio" name={`size-${product.id}`} value={size.label} checked={selected} onChange={() => setSelectedSize(size)} className="sr-only" />
                      <span className="flex items-center justify-between text-sm font-semibold text-[#1A3325]">{size.label}{selected && <Check className="size-4" aria-hidden="true" />}</span>
                      <span className="mt-1 text-xs text-[#68786b]">{size.label === 'S' ? '6” pot' : size.label === 'M' ? '8” pot' : '10” pot'}</span>
                      <span className="mt-1 text-xs font-medium text-[#1A3325]">{formatINR(size.price + (selectedPot?.price ?? 0))}</span>
                      {size.label === 'M' && <span className="absolute -top-2 right-2 rounded-full bg-[#1A3325] px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-white">Popular</span>}
                    </label>
                  )
                })}
              </div>
            </fieldset>

            <fieldset className="mt-6">
              <legend className="text-sm font-semibold text-[#1A3325]">Choose a planter</legend>
              <div className="mt-3 flex flex-col gap-2">
                {product.pots.map((pot) => {
                  const selected = selectedPotId === pot.id
                  return (
                    <label key={pot.id} className={`flex cursor-pointer items-center gap-3 rounded-2xl border p-3 transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-[#527358] sm:p-3.5 ${selected ? 'border-[#1A3325] bg-[#f1f4ee]' : 'border-[#e3e3d9] bg-white hover:border-[#abb8a9]'}`}>
                      <input type="radio" name={`pot-${product.id}`} value={pot.id} checked={selected} onChange={() => setSelectedPotId(pot.id)} className="size-4 accent-[#1A3325]" />
                      <span className="relative size-11 shrink-0 overflow-hidden rounded-xl bg-[#f2f0e8]"><Image src={pot.image} alt="" fill sizes="44px" className="object-cover" /></span>
                      <span className="min-w-0 flex-1"><span className="block text-sm font-medium text-[#1A3325]">{pot.name}</span><span className="mt-0.5 block text-xs text-[#778078]">{pot.price === 0 ? 'Included' : `Add ${formatINR(pot.price)}`}</span></span>
                      <span className="text-sm font-semibold text-[#1A3325]">{pot.price === 0 ? 'Free' : `+${formatINR(pot.price)}`}</span>
                    </label>
                  )
                })}
              </div>
            </fieldset>

            <div ref={purchaseSectionRef} className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="flex items-center gap-3">
                <div className="inline-flex h-12 items-center rounded-full border border-[#dedfd5] bg-white" aria-label="Quantity selector">
                  <button type="button" onClick={() => setQuantity((value) => Math.max(1, value - 1))} disabled={quantity <= 1} aria-label="Decrease quantity" className="inline-flex size-11 items-center justify-center rounded-full text-[#1A3325] hover:bg-[#f1f4ee] disabled:cursor-not-allowed disabled:opacity-40"><Minus className="size-4" /></button>
                  <span className="min-w-7 text-center text-sm font-semibold text-[#1A3325]" aria-live="polite">{quantity}</span>
                  <button type="button" onClick={() => setQuantity((value) => value + 1)} aria-label="Increase quantity" className="inline-flex size-11 items-center justify-center rounded-full text-[#1A3325] hover:bg-[#f1f4ee]"><Plus className="size-4" /></button>
                </div>
                <button type="button" onClick={toggleProductWishlist} aria-pressed={isWishlisted} aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'} className="inline-flex size-12 shrink-0 items-center justify-center rounded-full border border-[#dedfd5] text-[#1A3325] transition-colors hover:bg-[#f1f4ee]">
                  <Heart className={`size-5 ${isWishlisted ? 'fill-[#c26743] text-[#c26743]' : ''}`} aria-hidden="true" />
                </button>
                <button type="button" onClick={shareProduct} aria-label={`Share ${product.name}`} className="inline-flex size-12 shrink-0 items-center justify-center rounded-full border border-[#dedfd5] text-[#1A3325] transition-colors hover:bg-[#f1f4ee]">
                  <Share2 className="size-5" aria-hidden="true" />
                </button>
              </div>
              <button type="button" onClick={addToBag} disabled={!product.inStock} className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#1A3325] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#294735] disabled:cursor-not-allowed disabled:bg-[#899087] sm:flex-1">
                <ShoppingBag className="size-4" aria-hidden="true" /> {product.inStock ? 'Add to plant bag' : 'Out of stock'}
              </button>
            </div>
            <p className="mt-3 flex items-center gap-2 text-xs text-[#68786b]"><ShieldCheck className="size-4 text-[#527358]" aria-hidden="true" />Wrong plant or transit damage only · unedited 360° video from before opening the seal/tape, sent with order ID within 7 days</p>

            <div className="mt-7"><NurseryTrustBox nursery={product.nursery} /></div>
          </section>
        </div>

        <PlantCareDashboard product={product} />
        <PlantGuarantee />

        <section className="mt-14 border-y border-[#e7e5dc] py-8 sm:mt-20 sm:py-10" aria-label="Plant details">
          <div role="tablist" aria-label="Plant information" className="flex gap-5 overflow-x-auto border-b border-[#e7e5dc] sm:gap-8">
            {(Object.keys(detailCopy) as DetailTab[]).map((tab) => (
              <button key={tab} type="button" role="tab" id={`tab-${tab}`} aria-selected={activeTab === tab} aria-controls="plant-detail-panel" onClick={() => setActiveTab(tab)} className={`relative shrink-0 pb-3 text-sm font-semibold transition-colors ${activeTab === tab ? 'text-[#1A3325] after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:bg-[#1A3325]' : 'text-[#778078] hover:text-[#1A3325]'}`}>
                {detailCopy[tab].label}
              </button>
            ))}
          </div>
          <div id="plant-detail-panel" role="tabpanel" aria-labelledby={`tab-${activeTab}`} className="max-w-3xl pt-5">
            <h2 className="font-serif text-xl font-semibold text-[#1A3325]">{detailCopy[activeTab].heading}</h2>
            <p className="mt-2 text-sm leading-7 text-[#68786b]">{activeTab === 'care' ? `${detailCopy.care.body} ${product.careSummary.light} light and watering ${product.careSummary.water.toLowerCase()} are a good place to begin.` : detailCopy[activeTab].body}</p>
          </div>
        </section>

        <ProductReviews product={product} />
        <ProductRecommendations product={product} products={relatedProducts} />
      </main>

      <ProductShareDialog product={product} open={shareDialogOpen} onOpenChange={setShareDialogOpen} url={shareUrl} />

      <div className={`fixed inset-x-0 bottom-0 z-40 w-full max-w-full border-t border-[#e4e4da] bg-[#fbfaf6]/95 px-4 py-3 shadow-[0_-8px_30px_rgba(20,40,28,0.08)] backdrop-blur-md transition-all duration-300 sm:px-6 lg:bottom-5 lg:left-1/2 lg:right-auto lg:w-[min(760px,calc(100%-3rem))] lg:-translate-x-1/2 lg:rounded-2xl lg:border lg:px-5 ${showStickyBar ? 'visible translate-y-0 opacity-100' : 'invisible translate-y-full opacity-0 lg:visible lg:translate-y-0 lg:opacity-100'}`}>
        <div className="mx-auto flex min-w-0 max-w-[100rem] items-center gap-3">
          <div className="hidden min-w-0 flex-1 sm:block"><p className="truncate text-sm font-semibold text-[#1A3325]">{product.name}</p><p className="mt-0.5 text-xs text-[#68786b]">{selectedSize.label} · {selectedPot?.name}</p></div>
          <span className="shrink-0 text-lg font-semibold text-[#1A3325] sm:mr-2">{formatINR(price * quantity)}</span>
          <button type="button" onClick={addToBag} disabled={!product.inStock} className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-full bg-[#1A3325] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#294735] disabled:cursor-not-allowed disabled:bg-[#899087] sm:flex-none">
            <ShoppingBag className="size-4" aria-hidden="true" /> Add to plant bag
          </button>
        </div>
      </div>
    </>
  )
}
