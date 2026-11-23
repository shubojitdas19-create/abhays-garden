'use client'

import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, BadgeCheck, Box, Heart, House, MapPin, PackageCheck, Plus, Sprout, Store, Truck, UserRound } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useCart } from '@/components/store/cart-context'
import { products } from '@/components/store/products'
import { AddressEditorDialog } from '@/components/store/account/address-editor-dialog'
import { createDemoOrder, readCustomerOrders, readSavedAddresses, saveSavedAddresses, type CustomerOrder, type SavedAddress } from '@/lib/store/customer-data'

const formatINR = (value: number) => `₹${value.toLocaleString('en-IN')}`
const formatDate = (value: string) => {
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? 'Date unavailable' : new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }).format(date)
}

function addressFromOrder(order: CustomerOrder): SavedAddress {
  return { ...order.deliveryAddress, id: `order-${order.id}`, label: 'Home', isDefault: true }
}

function OrderCard({ order }: { order: CustomerOrder }) {
  const delivered = order.status.toLowerCase().includes('deliver')
  return (
    <article className="rounded-3xl border border-[#e5e8df] bg-white p-4 shadow-[0_16px_44px_-38px_rgba(26,51,37,0.45)] sm:p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div><p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#a65f2b]">Order placed {formatDate(order.date)}</p><h3 className="mt-1 text-sm font-bold text-[#1A3325]">#{order.id}</h3></div>
        <span className={`inline-flex min-h-7 items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ${delivered ? 'bg-[#edf1e9] text-[#315a38]' : 'bg-[#fff4df] text-[#8a5a1c]'}`}><span className={`size-1.5 rounded-full ${delivered ? 'bg-[#527358]' : 'bg-[#c88631]'}`} aria-hidden="true" />{order.status}</span>
      </div>
      <div className="mt-4 flex items-center gap-2.5">
        <div className="flex min-w-0 flex-1 items-center">
          {order.items.slice(0, 4).map((item, index) => <span key={`${item.productId}-${item.size}-${index}`} className={`relative size-12 shrink-0 overflow-hidden rounded-xl border-2 border-white bg-[#edf1e9] ${index > 0 ? '-ml-2.5' : ''}`}><Image src={item.image} alt={item.productName} fill sizes="48px" className="object-cover" /></span>)}
          <span className="ml-3 truncate text-xs text-[#68786b]">{order.items.length} {order.items.length === 1 ? 'plant' : 'plants'}</span>
        </div>
        <div className="shrink-0 text-right"><p className="text-[10px] text-[#778078]">Order total</p><p className="mt-0.5 text-sm font-bold text-[#1A3325]">{formatINR(order.totalAmount)}</p></div>
      </div>
      <div className="mt-4 flex flex-col gap-2 border-t border-[#eceee8] pt-3 sm:flex-row sm:items-center sm:justify-between"><p className="flex items-center gap-1.5 text-xs text-[#68786b]"><Truck className="size-3.5 text-[#527358]" aria-hidden="true" /> Estimated arrival {formatDate(order.estimatedDelivery)}</p><Link href={`/order-success/${encodeURIComponent(order.id)}`} className="inline-flex min-h-10 items-center justify-center gap-2 rounded-full bg-[#1A3325] px-4 text-xs font-semibold text-white transition-colors hover:bg-[#294735] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1A3325]">Track order status <ArrowRight className="size-3.5" aria-hidden="true" /></Link></div>
    </article>
  )
}

function AddressCard({ address, isDemo, onEdit }: { address: SavedAddress; isDemo: boolean; onEdit: () => void }) {
  return (
    <article className="rounded-3xl border border-[#e5e8df] bg-white p-5 sm:p-6">
      <div className="flex items-start justify-between gap-4"><div className="flex items-center gap-3"><span className="flex size-10 items-center justify-center rounded-full bg-[#edf1e9] text-[#315a38]"><House className="size-4" aria-hidden="true" /></span><div><h3 className="font-semibold text-[#1A3325]">{address.label || 'Delivery address'}</h3><p className="mt-0.5 text-xs text-[#778078]">{address.isDefault ? 'Default address' : 'Saved address'}{isDemo ? ' · Preview' : ''}</p></div></div><button type="button" onClick={onEdit} className="min-h-10 rounded-full border border-[#dfe4dc] px-4 text-xs font-semibold text-[#315a38] hover:bg-[#edf1e9]">Edit</button></div>
      <div className="mt-5 border-t border-[#eceee8] pt-4"><p className="text-sm font-semibold text-[#1A3325]">{address.fullName}</p><p className="mt-1 text-sm leading-6 text-[#68786b]">{[address.address, address.apartment, address.city, address.state, address.postalCode].filter(Boolean).join(', ')}</p><p className="mt-3 text-xs text-[#778078]">{address.phone} <span aria-hidden="true">·</span> {address.email}</p>{address.instructions && <p className="mt-2 text-xs text-[#778078]">Note: {address.instructions}</p>}</div>
    </article>
  )
}

function WishlistTab() {
  const { wishlist, toggleWishlist, addItem } = useCart()
  const wishlistProducts = useMemo(() => wishlist.map((id) => products.find((product) => product.id === id)).filter((product): product is (typeof products)[number] => Boolean(product)), [wishlist])

  if (wishlistProducts.length === 0) return <section className="rounded-3xl border border-dashed border-[#cbd5c9] bg-white/70 px-5 py-12 text-center"><span className="mx-auto flex size-12 items-center justify-center rounded-full bg-[#edf1e9] text-[#527358]"><Heart className="size-5" aria-hidden="true" /></span><h3 className="mt-4 font-serif text-xl font-semibold text-[#1A3325]">Your saved garden is ready to grow</h3><p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-[#68786b]">Tap the heart on a plant you love and it will be waiting here.</p><Link href="/shop" className="mt-5 inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#1A3325] px-5 text-sm font-semibold text-white hover:bg-[#294735]">Explore plants <ArrowRight className="size-4" aria-hidden="true" /></Link></section>

  return <div className="grid gap-3 sm:grid-cols-2">{wishlistProducts.map((product) => <article key={product.id} className="flex min-w-0 gap-3 rounded-3xl border border-[#e5e8df] bg-white p-3.5"><Link href={`/shop/${product.slug}`} className="relative size-20 shrink-0 overflow-hidden rounded-2xl bg-[#edf1e9]"><Image src={product.image} alt={product.name} fill sizes="80px" className="object-cover" /></Link><div className="flex min-w-0 flex-1 flex-col"><Link href={`/shop/${product.slug}`} className="truncate text-sm font-semibold text-[#1A3325] hover:underline">{product.name}</Link><p className="mt-1 text-xs text-[#68786b]">From {formatINR(product.sizes[0].price)}</p><div className="mt-auto flex items-center gap-2 pt-3"><button type="button" onClick={() => { const size = product.sizes[0]; const pot = product.pots[0]; addItem({ productId: product.id, productName: product.name, size: size.label, pot: pot.name, price: size.price + pot.price, image: product.image, nurseryName: product.nursery.name }); toggleWishlist(product.id) }} className="min-h-9 flex-1 rounded-full bg-[#1A3325] px-3 text-xs font-semibold text-white hover:bg-[#294735]">Move to bag</button><button type="button" onClick={() => toggleWishlist(product.id)} aria-label={`Remove ${product.name} from saved garden`} className="flex size-9 shrink-0 items-center justify-center rounded-full border border-[#e5e8df] text-[#68786b] hover:bg-[#fff4ef] hover:text-[#a65f2b]"><Heart className="size-4 fill-current" aria-hidden="true" /></button></div></div></article>)}</div>
}

function GrowerTab() {
  return <section className="relative overflow-hidden rounded-3xl bg-[#1A3325] p-5 text-white sm:p-8"><div className="pointer-events-none absolute -right-10 -top-12 size-48 rounded-full border border-white/10" aria-hidden="true" /><div className="relative max-w-2xl"><span className="flex size-12 items-center justify-center rounded-2xl bg-white/10 text-[#e5a849]"><Store className="size-5" aria-hidden="true" /></span><p className="mt-5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#e5a849]">For our growing community</p><h3 className="mt-2 font-serif text-2xl font-semibold sm:text-3xl">Local grower? There&apos;s room in our garden.</h3><p className="mt-3 max-w-xl text-sm leading-6 text-white/70">Share your nursery with plant lovers, manage your application, and grow alongside a collective that cares about healthy plants and thoughtful delivery.</p><Link href="/sell" className="mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#e5a849] px-5 text-sm font-semibold text-[#1A3325] transition-colors hover:bg-[#f0bd69]">Explore the grower portal <ArrowRight className="size-4" aria-hidden="true" /></Link><p className="mt-3 flex items-center gap-1.5 text-xs text-white/55"><BadgeCheck className="size-3.5 text-[#e5a849]" aria-hidden="true" /> Applications are reviewed by the nursery team.</p></div></section>
}

export function AccountDashboard() {
  const { wishlist } = useCart()
  const [orders, setOrders] = useState<CustomerOrder[]>([])
  const [addresses, setAddresses] = useState<SavedAddress[]>([])
  const [isHydrated, setIsHydrated] = useState(false)
  const [isAddressDialogOpen, setIsAddressDialogOpen] = useState(false)
  const [editingAddress, setEditingAddress] = useState<SavedAddress>()
  const [addressSaved, setAddressSaved] = useState('')
  const [isAddressPreview, setIsAddressPreview] = useState(true)

  useEffect(() => {
    const storedOrders = readCustomerOrders()
    const storedAddresses = readSavedAddresses()
    setOrders(storedOrders)
    setAddresses(storedAddresses.length ? storedAddresses : [addressFromOrder(storedOrders[0] ?? createDemoOrder())])
    setIsAddressPreview(storedAddresses.length === 0)
    setIsHydrated(true)
  }, [])

  const displayedOrders = orders.length ? orders : [createDemoOrder()]
  const defaultAddress = addresses.find((address) => address.isDefault) ?? addresses[0]
  const customerName = orders[0]?.deliveryAddress.fullName.split(' ')[0] ?? createDemoOrder().deliveryAddress.fullName.split(' ')[0]

  function openAddressEditor(address?: SavedAddress) {
    setEditingAddress(address)
    setAddressSaved('')
    setIsAddressDialogOpen(true)
  }

  function saveAddress(address: SavedAddress) {
    const persistedAddresses = readSavedAddresses()
    const currentAddresses = isAddressPreview ? [] : persistedAddresses
    const nextAddresses = currentAddresses.some((item) => item.id === address.id)
      ? currentAddresses.map((item) => item.id === address.id ? address : item)
      : [...currentAddresses, { ...address, isDefault: currentAddresses.length === 0 }]
    const hasDefault = nextAddresses.some((item) => item.isDefault)
    const normalized = nextAddresses.map((item, index) => ({ ...item, isDefault: hasDefault ? item.isDefault : index === 0 }))
    if (!saveSavedAddresses(normalized)) {
      setAddressSaved('Could not save this address in browser storage. Check that storage is available and try again.')
      return
    }
    setAddresses(normalized)
    setIsAddressPreview(false)
    setAddressSaved('Address saved on this device.')
    setIsAddressDialogOpen(false)
  }

  return (
    <main className="min-h-[70vh] bg-[#f7f5ef] px-4 pb-14 pt-7 sm:px-6 sm:pb-20 sm:pt-10 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-4 rounded-3xl border border-[#e5e8df] bg-white p-5 shadow-[0_18px_50px_-40px_rgba(26,51,37,0.45)] sm:flex-row sm:items-center sm:justify-between sm:p-7">
          <div className="flex min-w-0 items-center gap-4"><span className="flex size-14 shrink-0 items-center justify-center rounded-full bg-[#edf1e9] text-[#315a38] ring-4 ring-[#f6f7f2]"><UserRound className="size-6" aria-hidden="true" /></span><div className="min-w-0"><p className="text-[10px] font-bold uppercase tracking-[0.17em] text-[#a65f2b]">Your garden account</p><h1 className="mt-1 font-serif text-2xl font-semibold tracking-tight text-[#1A3325] sm:text-3xl">Welcome back, {customerName}</h1><p className="mt-1 flex items-center gap-1.5 text-xs text-[#68786b]"><Sprout className="size-3.5 text-[#527358]" aria-hidden="true" /> Your orders and saved garden, together in one place.</p></div></div>
          <span className="inline-flex w-fit shrink-0 items-center gap-2 rounded-full bg-[#edf1e9] px-3 py-2 text-xs font-semibold text-[#315a38]"><BadgeCheck className="size-4" aria-hidden="true" /> Botanical Collective Member</span>
        </div>
        {addressSaved && <p className="mt-3 text-sm text-[#315a38]" role="status">{addressSaved}</p>}
        <Tabs defaultValue="orders" className="mt-6 gap-5 sm:mt-8">
          <TabsList variant="line" className="grid h-auto w-full grid-cols-2 gap-1 rounded-2xl border border-[#e5e8df] bg-white p-1.5 group-data-horizontal/tabs:h-auto sm:grid-cols-4">
            <TabsTrigger value="orders" className="min-h-11 h-auto rounded-xl px-2 text-xs font-semibold text-[#68786b] data-active:bg-[#edf1e9] data-active:text-[#1A3325] sm:text-sm"><PackageCheck className="size-4" aria-hidden="true" /> My orders</TabsTrigger>
            <TabsTrigger value="addresses" className="min-h-11 h-auto rounded-xl px-2 text-xs font-semibold text-[#68786b] data-active:bg-[#edf1e9] data-active:text-[#1A3325] sm:text-sm"><MapPin className="size-4" aria-hidden="true" /> Addresses</TabsTrigger>
            <TabsTrigger value="wishlist" className="min-h-11 h-auto rounded-xl px-2 text-xs font-semibold text-[#68786b] data-active:bg-[#edf1e9] data-active:text-[#1A3325] sm:text-sm"><Heart className="size-4" aria-hidden="true" /> My wishlist <span className="rounded-full bg-[#f4f4ed] px-1.5 text-[10px]">{wishlist.length}</span></TabsTrigger>
            <TabsTrigger value="grower" className="min-h-11 h-auto rounded-xl px-2 text-xs font-semibold text-[#68786b] data-active:bg-[#edf1e9] data-active:text-[#1A3325] sm:text-sm"><Store className="size-4" aria-hidden="true" /> Grower portal</TabsTrigger>
          </TabsList>
          <TabsContent value="orders" className="flex flex-col gap-3 outline-none">
            <div className="flex flex-wrap items-end justify-between gap-2"><div><p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#a65f2b]">From checkout to doorstep</p><h2 className="mt-1 font-serif text-xl font-semibold text-[#1A3325] sm:text-2xl">My plant orders</h2></div><Link href="/track-order" className="inline-flex min-h-10 items-center gap-1.5 text-xs font-semibold text-[#315a38] hover:underline">Find an order <ArrowRight className="size-3.5" aria-hidden="true" /></Link></div>
            {!isHydrated ? <div className="rounded-3xl border border-[#e5e8df] bg-white p-6 text-sm text-[#68786b]" role="status">Loading your order history…</div> : <div className="flex flex-col gap-3">{displayedOrders.map((order) => <OrderCard key={order.id} order={order} />)}{orders.length === 0 && <p className="text-[11px] leading-5 text-[#899389]">Preview order shown because no orders have been saved on this device yet.</p>}</div>}
          </TabsContent>
          <TabsContent value="addresses" className="flex flex-col gap-3 outline-none">
            <div className="flex flex-wrap items-end justify-between gap-2"><div><p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#a65f2b]">Ready for the next delivery</p><h2 className="mt-1 font-serif text-xl font-semibold text-[#1A3325] sm:text-2xl">Saved addresses</h2></div><button type="button" onClick={() => openAddressEditor()} className="inline-flex min-h-10 items-center justify-center gap-1.5 rounded-full bg-[#1A3325] px-4 text-xs font-semibold text-white hover:bg-[#294735]"><Plus className="size-4" aria-hidden="true" /> Add new address</button></div>
            {defaultAddress && <AddressCard address={defaultAddress} isDemo={isAddressPreview} onEdit={() => openAddressEditor(defaultAddress)} />}
            {addresses.filter((address) => address.id !== defaultAddress?.id).map((address) => <AddressCard key={address.id} address={address} isDemo={false} onEdit={() => openAddressEditor(address)} />)}
            <p className="flex items-start gap-2 rounded-2xl bg-[#edf1e9] p-3.5 text-xs leading-5 text-[#627064]"><Box className="mt-0.5 size-4 shrink-0 text-[#527358]" aria-hidden="true" />Saved addresses stay in this browser for your next checkout.</p>
          </TabsContent>
          <TabsContent value="wishlist" className="flex flex-col gap-3 outline-none"><div><p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#a65f2b]">A garden of favourites</p><h2 className="mt-1 font-serif text-xl font-semibold text-[#1A3325] sm:text-2xl">My saved garden</h2></div><WishlistTab /></TabsContent>
          <TabsContent value="grower" className="outline-none"><GrowerTab /></TabsContent>
        </Tabs>
      </div>
      <AddressEditorDialog open={isAddressDialogOpen} onOpenChange={setIsAddressDialogOpen} initialAddress={editingAddress} onSave={saveAddress} />
    </main>
  )
}
