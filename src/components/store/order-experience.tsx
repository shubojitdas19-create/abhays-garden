'use client'

import { useEffect, useState, type FormEvent } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowLeft, ArrowRight, Check, CheckCircle2, Circle, Clock3, Leaf, MapPin, MessageCircle, PackageCheck, Search, ShieldCheck, Sparkles, Truck } from 'lucide-react'
import { useCart } from '@/components/store/cart-context'
import { products } from '@/components/store/products'
import { DEMO_ORDER_ID, readCustomerOrder, type CustomerOrder } from '@/lib/store/customer-data'

const stages = [
  { title: 'Order confirmed', detail: 'Your order is safely with us.', icon: CheckCircle2 },
  { title: 'Freshly picked', detail: 'Your grower is preparing your plants.', icon: Leaf },
  { title: 'Packed with care', detail: 'Next: breathable, eco-friendly packaging.', icon: PackageCheck },
  { title: 'On the way', detail: 'Your plant specialist is heading to you.', icon: Truck },
]

const sampleProduct = products[0]

function formatPrice(value: number) {
  return `₹${value.toLocaleString('en-IN')}`
}

function formatDate(value: string) {
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? 'Date unavailable' : new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }).format(date)
}

function StatusTimeline({ compact = false, activeStage = 1 }: { compact?: boolean; activeStage?: number }) {
  return (
    <section className="rounded-3xl border border-[#e5e8df] bg-white p-5 shadow-[0_18px_50px_-40px_rgba(26,51,37,0.45)] sm:p-7" aria-labelledby="tracking-progress-title">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#a65f2b]">The journey</p>
          <h2 id="tracking-progress-title" className="mt-1 font-serif text-xl font-semibold text-[#1A3325] sm:text-2xl">Your plants are in good hands</h2>
        </div>
        <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-[#edf3e9] px-2.5 py-1.5 text-[11px] font-semibold text-[#315a38] sm:text-xs"><span className="relative flex size-2"><span className="absolute inline-flex size-full animate-ping rounded-full bg-[#527358] opacity-50" /><span className="relative inline-flex size-2 rounded-full bg-[#527358]" /></span> In progress</span>
      </div>
      <ol className="mt-6 flex flex-col sm:flex-row sm:items-start">
        {stages.map((stage, index) => {
          const complete = index < activeStage
          const active = index === activeStage
          const Icon = stage.icon
          return (
            <li key={stage.title} className="relative flex gap-3 pb-5 last:pb-0 sm:flex-1 sm:flex-col sm:gap-2 sm:pb-0 sm:pr-3 sm:last:pr-0">
              {index < stages.length - 1 && <span className={`absolute bottom-0 left-[15px] top-8 w-px sm:bottom-auto sm:left-8 sm:right-0 sm:top-4 sm:h-px sm:w-auto ${complete ? 'bg-[#527358]' : 'bg-[#e4e8e0]'}`} aria-hidden="true" />}
              <span className={`relative z-10 inline-flex size-8 shrink-0 items-center justify-center rounded-full border ${complete ? 'border-[#315a38] bg-[#315a38] text-white' : active ? 'border-[#527358] bg-[#edf3e9] text-[#315a38] ring-4 ring-[#edf3e9]' : 'border-[#e2e6df] bg-white text-[#a0aaa0]'}`}>
                {complete ? <Check className="size-4" aria-hidden="true" /> : <Icon className="size-4" aria-hidden="true" />}
              </span>
              <div className="min-w-0 pt-0.5 sm:pt-0">
                <p className={`text-sm font-semibold ${active || complete ? 'text-[#1A3325]' : 'text-[#748074]'}`}>{stage.title}</p>
                {!compact && <p className="mt-1 text-xs leading-5 text-[#778078] sm:max-w-40">{stage.detail}</p>}
              </div>
            </li>
          )
        })}
      </ol>
      <p className="mt-5 flex items-start gap-2 rounded-2xl bg-[#f7f8f3] px-3.5 py-3 text-xs leading-5 text-[#627064]"><Clock3 className="mt-0.5 size-4 shrink-0 text-[#527358]" aria-hidden="true" /> We&apos;ll keep this timeline updated as your order moves from the nursery to your door.</p>
    </section>
  )
}

function OrderItems({ items }: { items: ReturnType<typeof useCart>['items'] }) {
  const orderItems = items.length ? items : [{
    productId: sampleProduct.id,
    productName: sampleProduct.name,
    image: sampleProduct.image,
    quantity: 1,
    size: 'M',
    price: sampleProduct.sizes[1]?.price ?? sampleProduct.sizes[0].price,
    nurseryName: sampleProduct.nursery.name,
    pot: 'Standard Eco Nursery Pot',
  }]

  return (
    <section className="rounded-3xl border border-[#e5e8df] bg-white p-5 sm:p-7" aria-labelledby="order-items-title">
      <div className="flex items-center justify-between gap-3">
        <div><p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#a65f2b]">Packed with care</p><h2 id="order-items-title" className="mt-1 font-serif text-xl font-semibold text-[#1A3325]">Your plants</h2></div>
        <span className="rounded-full bg-[#f4f4ed] px-3 py-1 text-xs font-medium text-[#68786b]">{orderItems.length} {orderItems.length === 1 ? 'item' : 'items'}</span>
      </div>
      <ul className="mt-5 divide-y divide-[#eceee8]">
        {orderItems.map((item) => (
          <li key={`${item.productId}-${item.size}`} className="flex gap-3 py-4 first:pt-0 last:pb-0 sm:gap-4">
            <div className="relative size-[68px] shrink-0 overflow-hidden rounded-xl bg-[#edf1e9] sm:size-20"><Image src={item.image} alt={item.productName} fill sizes="80px" className="object-cover" /></div>
            <div className="min-w-0 flex-1"><h3 className="truncate text-sm font-semibold text-[#1A3325]">{item.productName}</h3><p className="mt-1 text-xs text-[#778078]">Size {item.size} <span aria-hidden="true">·</span> Qty {item.quantity}</p><p className="mt-1 truncate text-xs text-[#778078]">Grown by {item.nurseryName}</p></div>
            <p className="shrink-0 pt-0.5 text-sm font-semibold text-[#1A3325]">{formatPrice(item.price * item.quantity)}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}

function OrderActions({ orderId }: { orderId: string }) {
  const whatsappMessage = encodeURIComponent(`Hello, I would like an update on my plant order ${orderId}.`)

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <a href={`https://wa.me/919476433880?text=${whatsappMessage}`} target="_blank" rel="noreferrer" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#187A52] px-4 text-sm font-semibold text-white transition-colors hover:bg-[#126744] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1A3325]"><MessageCircle className="size-4" aria-hidden="true" /> Track live on WhatsApp</a>
      <button type="button" onClick={() => window.print()} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#dfe4dc] bg-white px-4 text-sm font-semibold text-[#1A3325] transition-colors hover:bg-[#f5f6f1] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1A3325]"><ShieldCheck className="size-4" aria-hidden="true" /> Print / save invoice</button>
    </div>
  )
}

export function OrderConfirmation({ orderId }: { orderId: string }) {
  const normalizedOrderId = orderId.toUpperCase().replace(/[^A-Z0-9-]/g, '').slice(0, 32) || DEMO_ORDER_ID
  const [order, setOrder] = useState<CustomerOrder | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setOrder(readCustomerOrder(normalizedOrderId))
    setIsLoaded(true)
  }, [normalizedOrderId])

  if (!isLoaded) return <main className="flex min-h-[70vh] items-center justify-center bg-[#f7f5ef] px-4"><p role="status" className="text-sm text-[#68786b]">Loading your order details…</p></main>
  if (!order) return <main className="flex min-h-[70vh] items-center justify-center bg-[#f7f5ef] px-4 py-12"><section className="max-w-md text-center"><span className="mx-auto flex size-14 items-center justify-center rounded-full bg-[#edf1e9] text-[#527358]"><PackageCheck className="size-6" aria-hidden="true" /></span><h1 className="mt-5 font-serif text-2xl font-semibold text-[#1A3325]">Order details aren&apos;t on this device</h1><p className="mt-2 text-sm leading-6 text-[#68786b]">This frontend demo keeps order details in your browser. Open the account on the device where you placed the order, or check the order number.</p><Link href="/account" className="mt-5 inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#1A3325] px-5 text-sm font-semibold text-white hover:bg-[#294735]">View my account <ArrowRight className="size-4" aria-hidden="true" /></Link></section></main>

  const address = order.deliveryAddress
  const paymentLabel = order.paymentMethod === 'cod' ? 'Cash on delivery' : order.paymentMethod === 'upi' ? 'UPI' : 'Credit / debit card'
  const deliveryLabel = order.deliveryMethod === 'express' ? 'Express courier' : 'Standard nursery transit'

  return (
    <main className="min-h-[70vh] bg-[#f7f5ef] px-4 pb-14 pt-7 sm:px-6 sm:pb-20 sm:pt-10">
      <div className="mx-auto max-w-5xl">
        <div className="mx-auto max-w-2xl text-center">
          <span className="mx-auto flex size-16 items-center justify-center rounded-full bg-[#e8f0e4] text-[#315a38] ring-8 ring-[#edf2e9] sm:size-[76px]"><CheckCircle2 className="size-9 sm:size-10" aria-hidden="true" /></span>
          <p className="mx-auto mt-6 flex w-fit items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.17em] text-[#a65f2b]"><Sparkles className="size-3.5" aria-hidden="true" /> A little more green is on its way</p>
          <h1 className="mt-2 font-serif text-3xl font-semibold tracking-tight text-[#1A3325] sm:text-5xl">Order placed successfully!</h1>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-[#68786b] sm:text-base">Thank you! Your order has been placed with our local growers. Your homegrown plants are being prepared by the nursery.</p>
        </div>

        <section className="mt-8 grid gap-3 rounded-3xl border border-[#e5e8df] bg-white p-5 shadow-[0_18px_50px_-40px_rgba(26,51,37,0.45)] sm:mt-10 sm:grid-cols-2 sm:gap-5 sm:p-6 lg:grid-cols-4" aria-label="Order information">
          <div><p className="text-xs text-[#778078]">Order number</p><p className="mt-1 font-semibold text-[#1A3325]">#{order.id}</p></div>
          <div><p className="text-xs text-[#778078]">Placed on</p><p className="mt-1 text-sm font-semibold text-[#1A3325]">{formatDate(order.date)}</p></div>
          <div><p className="text-xs text-[#778078]">Estimated delivery</p><p className="mt-1 text-sm font-semibold text-[#1A3325]">{formatDate(order.estimatedDelivery)}</p></div>
          <div><p className="text-xs text-[#778078]">Payment & delivery</p><p className="mt-1 text-sm font-semibold text-[#1A3325]">{paymentLabel} · {deliveryLabel}</p></div>
        </section>

        <div className="mt-5 grid items-start gap-5 lg:grid-cols-[minmax(0,1.35fr)_minmax(300px,0.85fr)] lg:gap-6">
          <div className="flex flex-col gap-5"><StatusTimeline activeStage={order.trackingStage} /><OrderItems items={order.items} /></div>
          <aside className="flex flex-col gap-4">
            <section className="rounded-3xl bg-[#1A3325] p-5 text-white sm:p-6" aria-labelledby="delivery-address-title">
              <div className="flex items-center gap-2 text-[#e5a849]"><MapPin className="size-4" aria-hidden="true" /><p className="text-[11px] font-bold uppercase tracking-[0.16em]">Delivery destination</p></div>
              <h2 id="delivery-address-title" className="mt-3 font-serif text-xl font-semibold">{address.fullName}</h2>
              <p className="mt-2 text-sm leading-6 text-white/75">{[address.address, address.apartment, address.city, address.state, address.postalCode].filter(Boolean).join(', ')}</p>
              <p className="mt-4 border-t border-white/15 pt-4 text-xs leading-5 text-white/60">{address.phone} · {address.email}</p>
            </section>
            <div className="rounded-3xl border border-[#e5e8df] bg-white p-5 sm:p-6"><OrderActions orderId={order.id} /></div>
            <section className="flex gap-3 rounded-3xl border border-[#e6e9df] bg-[#edf1e9] p-5"><span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white text-[#527358]"><Leaf className="size-5" aria-hidden="true" /></span><div><h2 className="font-serif text-lg font-semibold text-[#1A3325]">While you wait</h2><p className="mt-1 text-sm leading-5 text-[#68786b]">Get your home ready with our gentle plant arrival and unboxing tips.</p><Link href="/guarantee" className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-[#315a38] hover:underline">Read plant care tips <ArrowRight className="size-4" aria-hidden="true" /></Link></div></section>
          </aside>
        </div>
        <div className="mt-7 flex flex-col items-center justify-between gap-3 border-t border-[#e3e0d7] pt-6 sm:flex-row"><Link href="/shop" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#1A3325] px-6 text-sm font-semibold text-white hover:bg-[#294735]"><ArrowLeft className="size-4" aria-hidden="true" /> Continue shopping</Link><Link href={`/track-order?order=${encodeURIComponent(order.id)}`} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-4 text-sm font-semibold text-[#315a38] hover:bg-[#edf1e9]">View order tracking <ArrowRight className="size-4" aria-hidden="true" /></Link></div>
      </div>
    </main>
  )
}

export function TrackOrderPage({ initialOrderId = '' }: { initialOrderId?: string }) {
  const router = useRouter()
  const [orderId, setOrderId] = useState(initialOrderId)
  const [searchedOrderId, setSearchedOrderId] = useState(initialOrderId)
  const [message, setMessage] = useState('')
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [matchedOrder, setMatchedOrder] = useState<CustomerOrder | null>(null)
  const [isOrderLoaded, setIsOrderLoaded] = useState(!initialOrderId)

  useEffect(() => {
    if (!searchedOrderId) {
      setMatchedOrder(null)
      setIsOrderLoaded(true)
      return
    }
    setIsOrderLoaded(false)
    setMatchedOrder(readCustomerOrder(searchedOrderId))
    setIsOrderLoaded(true)
  }, [searchedOrderId])

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const normalized = orderId.trim().toUpperCase()
    if (!normalized) {
      setMessage('Enter your order number to see its progress.')
      return
    }
    setMessage('')
    setSearchedOrderId(normalized)
    router.replace(`/track-order?order=${encodeURIComponent(normalized)}`, { scroll: false })
  }

  function refreshStatus() {
    setIsRefreshing(true)
    window.setTimeout(() => setIsRefreshing(false), 700)
  }

  const address = matchedOrder?.deliveryAddress
  const phone = address?.phone.replace(/\D/g, '') ?? ''
  const whatsappNumber = phone.length === 10 ? `91${phone}` : phone
  const paymentLabel = matchedOrder?.paymentMethod === 'cod' ? 'Cash on delivery' : matchedOrder?.paymentMethod === 'upi' ? 'UPI' : 'Credit / debit card'

  return (
    <main className="min-h-[70vh] bg-[#f7f5ef] px-4 pb-14 pt-7 sm:px-6 sm:pb-20 sm:pt-10">
      <div className="mx-auto max-w-4xl">
        <Link href="/shop" className="inline-flex min-h-10 items-center gap-2 text-sm font-semibold text-[#526455] hover:text-[#1A3325]"><ArrowLeft className="size-4" aria-hidden="true" /> Back to the garden</Link>
        <div className="mt-6 max-w-2xl"><p className="text-[11px] font-bold uppercase tracking-[0.17em] text-[#a65f2b]">From our nursery to your home</p><h1 className="mt-2 font-serif text-3xl font-semibold tracking-tight text-[#1A3325] sm:text-5xl">Track your order</h1><p className="mt-3 text-sm leading-6 text-[#68786b] sm:text-base">Follow each careful step as your plants make their way from the grower to your doorstep.</p></div>
        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3 rounded-3xl border border-[#e5e8df] bg-white p-4 shadow-[0_18px_50px_-40px_rgba(26,51,37,0.45)] sm:flex-row sm:items-end sm:p-5">
          <label className="flex-1 text-xs font-semibold text-[#526455]" htmlFor="order-number">Order number<input id="order-number" name="order" value={orderId} onChange={(event) => setOrderId(event.target.value)} placeholder="e.g. ARG-94820" autoComplete="off" className="mt-2 h-12 w-full rounded-xl border border-[#dfe4dc] bg-[#fbfaf6] px-3.5 text-sm font-medium text-[#1A3325] outline-none transition focus:border-[#527358] focus:ring-2 focus:ring-[#527358]/15" /></label>
          <button type="submit" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#1A3325] px-5 text-sm font-semibold text-white hover:bg-[#294735] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1A3325]"><Search className="size-4" aria-hidden="true" /> Find my order</button>
        </form>
        {message && <p className="mt-2 text-sm text-[#9b4938]" role="alert">{message}</p>}
        {searchedOrderId && !isOrderLoaded && <p className="mt-5 rounded-2xl border border-[#e5e8df] bg-white p-4 text-sm text-[#68786b]" role="status">Looking for your order on this device…</p>}
        {searchedOrderId && isOrderLoaded && !matchedOrder && <section className="mt-5 rounded-2xl border border-[#e7d9c9] bg-[#fffaf3] p-5 text-sm leading-6 text-[#705843]" role="status"><h2 className="font-semibold text-[#1A3325]">We couldn&apos;t find that order on this device</h2><p className="mt-1">Order history is stored in the browser where an order was placed. Double-check the number, or <Link href="/account" className="font-semibold underline">view your account</Link>.</p></section>}
        {matchedOrder && <div className="mt-6 grid items-start gap-5 lg:grid-cols-[minmax(0,1fr)_300px]">
          <div className="flex flex-col gap-5"><section className="flex flex-col gap-3 rounded-3xl bg-[#1A3325] p-5 text-white sm:flex-row sm:items-center sm:justify-between sm:p-6"><div><p className="text-xs font-medium text-white/65">Order #{matchedOrder.id}</p><h2 className="mt-1 font-serif text-2xl font-semibold">{matchedOrder.status}</h2><p className="mt-1 text-sm text-white/70">Estimated arrival: {formatDate(matchedOrder.estimatedDelivery)}</p></div><button type="button" onClick={refreshStatus} className="inline-flex min-h-10 items-center justify-center gap-2 self-start rounded-full border border-white/20 px-4 text-xs font-semibold text-white hover:bg-white/10 sm:self-auto"><Circle className={`size-3 fill-[#e5a849] text-[#e5a849] ${isRefreshing ? 'animate-pulse' : ''}`} aria-hidden="true" /> {isRefreshing ? 'Checking status…' : 'Refresh status'}</button></section><StatusTimeline activeStage={matchedOrder.trackingStage} /><OrderItems items={matchedOrder.items} /></div>
          <aside className="flex flex-col gap-4"><section className="rounded-3xl border border-[#e5e8df] bg-white p-5"><p className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#a65f2b]">Your delivery</p><h2 className="mt-2 font-serif text-xl font-semibold text-[#1A3325]">{address?.fullName}</h2><p className="mt-2 text-sm leading-6 text-[#68786b]">{[address?.address, address?.apartment, address?.city, address?.state, address?.postalCode].filter(Boolean).join(', ')}</p><p className="mt-4 border-t border-[#eceee8] pt-4 text-sm font-medium text-[#526455]">{paymentLabel} · {matchedOrder.deliveryMethod === 'express' ? 'Express courier' : 'Standard transit'}</p></section><a href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`Hello, I would like an update on my plant order ${matchedOrder.id}.`)}`} target="_blank" rel="noreferrer" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#187A52] px-4 text-sm font-semibold text-white hover:bg-[#126744]"><MessageCircle className="size-4" aria-hidden="true" /> Get WhatsApp updates</a></aside>
        </div>}
        {!searchedOrderId && <div className="mt-6 flex items-start gap-3 rounded-2xl border border-[#e5e8df] bg-[#edf1e9] p-4 text-sm leading-6 text-[#526455]"><ShieldCheck className="mt-0.5 size-5 shrink-0 text-[#527358]" aria-hidden="true" /><p>Your tracking number is in your order confirmation. Try <button type="button" onClick={() => { setOrderId(DEMO_ORDER_ID); setSearchedOrderId(DEMO_ORDER_ID) }} className="font-semibold text-[#315a38] underline underline-offset-2">{DEMO_ORDER_ID}</button> to preview the tracking timeline.</p></div>}
      </div>
    </main>
  )
}
