'use client'

import { useEffect, useState, type FormEvent, type ChangeEvent } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowLeft, ArrowRight, Check, ChevronRight, CreditCard, Leaf, LockKeyhole, MapPin, PackageCheck, ShieldCheck, Truck, WalletCards } from 'lucide-react'
import { useCart } from '@/components/store/cart-context'
import { useCartStore } from '@/lib/store/cart-store'
import { readSavedAddresses, saveCustomerOrder, saveSavedAddresses, type CustomerOrder, type ShippingAddress } from '@/lib/store/customer-data'

type DeliveryMethod = 'standard' | 'express'
type PaymentMethod = 'cod' | 'upi' | 'card'
type CustomerDetails = ShippingAddress

const emptyDetails: CustomerDetails = {
  fullName: '', phone: '', email: '', address: '', apartment: '', city: '', state: 'West Bengal', postalCode: '', instructions: '',
}
const indianStates = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Andaman and Nicobar Islands', 'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu', 'Delhi', 'Jammu and Kashmir', 'Ladakh', 'Lakshadweep', 'Puducherry',
]
const formatPrice = (value: number) => `₹${value.toLocaleString('en-IN')}`

const fieldClassName = 'mt-1.5 h-12 w-full rounded-xl border border-[#dfe4dc] bg-[#fbfaf6] px-3.5 text-sm text-[#1A3325] outline-none transition placeholder:text-[#9aa49a] focus:border-[#527358] focus:ring-2 focus:ring-[#527358]/15'
const labelClassName = 'block text-xs font-semibold text-[#526455]'

function CheckoutHeader() {
  return (
    <header className="border-b border-[#e8e5dc] bg-[#fbfaf6]">
      <div className="mx-auto flex min-h-[68px] max-w-[90rem] items-center justify-between gap-3 px-4 sm:min-h-[76px] sm:px-6 lg:px-10">
        <Link href="/" className="flex min-w-0 items-center gap-2.5" aria-label="Abhay's Roof Garden home">
          <span className="relative size-10 shrink-0 overflow-hidden rounded-full border border-[#e5e1d7] sm:size-11"><Image src="/images/logo2.png" alt="" fill sizes="44px" className="object-cover" /></span>
          <span className="min-w-0"><span className="block truncate font-serif text-base font-bold tracking-tight text-[#1A3325] sm:text-lg">Abhay&apos;s Roof Garden</span><span className="mt-0.5 hidden text-[9px] font-bold uppercase tracking-[0.18em] text-[#68786b] sm:block">Homegrown Nursery</span></span>
        </Link>
        <div className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-[#edf1e9] px-2.5 py-2 text-[10px] font-bold text-[#315a38] sm:gap-2 sm:px-3 sm:text-xs"><LockKeyhole className="size-3.5" aria-hidden="true" /> <span className="hidden sm:inline">100% encrypted checkout</span><span className="sm:hidden">Secure checkout</span></div>
      </div>
    </header>
  )
}

function StepIndicator({ currentStep }: { currentStep: 1 | 2 }) {
  return (
    <ol className="flex items-center gap-2 text-xs sm:gap-3" aria-label="Checkout progress">
      {[{ number: 1, label: 'Details' }, { number: 2, label: 'Delivery & payment' }].map((step, index) => {
        const complete = currentStep > step.number
        const active = currentStep === step.number
        return <li key={step.number} className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3">
          <span aria-current={active ? 'step' : undefined} className={`flex size-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${complete ? 'bg-[#315a38] text-white' : active ? 'bg-[#1A3325] text-white' : 'bg-[#e9ebe4] text-[#778078]'}`}>{complete ? <Check className="size-3.5" aria-hidden="true" /> : step.number}</span>
          <span className={`truncate font-semibold ${active || complete ? 'text-[#1A3325]' : 'text-[#8a948a]'}`}>{step.label}</span>
          {index === 0 && <span className="h-px min-w-3 flex-1 bg-[#dfe4dc]" aria-hidden="true" />}
        </li>
      })}
    </ol>
  )
}

function Field({ label, id, type = 'text', value, onChange, placeholder, required = false, autoComplete, inputMode, pattern, maxLength, children }: {
  label: string
  id: string
  type?: string
  value: string
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  required?: boolean
  autoComplete?: string
  inputMode?: 'text' | 'numeric' | 'tel' | 'email'
  pattern?: string
  maxLength?: number
  children?: React.ReactNode
}) {
  return <label className={labelClassName} htmlFor={id}>{label}{required && <span className="ml-1 text-[#a65f2b]" aria-hidden="true">*</span>}{children ?? <input className={fieldClassName} id={id} name={id} type={type} value={value} onChange={onChange} placeholder={placeholder} required={required} autoComplete={autoComplete} inputMode={inputMode} pattern={pattern} maxLength={maxLength} />}</label>
}

function DetailsStep({ details, setDetails, onContinue }: {
  details: CustomerDetails
  setDetails: (next: CustomerDetails) => void
  onContinue: (event: FormEvent<HTMLFormElement>) => void
}) {
  function handleFieldChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = event.currentTarget
    setDetails({ ...details, [name]: value })
  }

  return (
    <form onSubmit={onContinue} className="flex flex-col gap-5">
      <section className="rounded-3xl border border-[#e5e8df] bg-white p-4 sm:p-6" aria-labelledby="contact-heading">
        <div className="flex items-start gap-3"><span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#edf1e9] text-[#315a38]"><ShieldCheck className="size-4" aria-hidden="true" /></span><div><h2 id="contact-heading" className="font-serif text-xl font-semibold text-[#1A3325]">Contact information</h2><p className="mt-1 text-xs leading-5 text-[#778078]">We&apos;ll use these details for order updates and delivery coordination.</p></div></div>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <Field label="Full name" id="fullName" value={details.fullName} onChange={handleFieldChange} placeholder="Your name" autoComplete="name" required />
          <label className={labelClassName} htmlFor="phone">WhatsApp mobile number<span className="ml-1 text-[#a65f2b]" aria-hidden="true">*</span><span className="mt-1.5 flex h-12 overflow-hidden rounded-xl border border-[#dfe4dc] bg-[#fbfaf6] transition focus-within:border-[#527358] focus-within:ring-2 focus-within:ring-[#527358]/15"><span className="flex items-center border-r border-[#dfe4dc] px-3 text-sm font-semibold text-[#526455]">+91</span><input className="min-w-0 flex-1 bg-transparent px-3 text-sm text-[#1A3325] outline-none placeholder:text-[#9aa49a]" id="phone" name="phone" type="tel" value={details.phone} onChange={handleFieldChange} placeholder="98765 43210" autoComplete="tel-national" inputMode="tel" pattern="[6-9][0-9]{9}" maxLength={10} required aria-describedby="phone-hint" /></span><span className="sr-only" id="phone-hint">Enter a 10-digit Indian mobile number.</span></label>
          <div className="sm:col-span-2"><Field label="Email address" id="email" type="email" value={details.email} onChange={handleFieldChange} placeholder="you@example.com" autoComplete="email" required /></div>
        </div>
      </section>

      <section className="rounded-3xl border border-[#e5e8df] bg-white p-4 sm:p-6" aria-labelledby="address-heading">
        <div className="flex items-start gap-3"><span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#edf1e9] text-[#315a38]"><MapPin className="size-4" aria-hidden="true" /></span><div><h2 id="address-heading" className="font-serif text-xl font-semibold text-[#1A3325]">Shipping address</h2><p className="mt-1 text-xs leading-5 text-[#778078]">Where should we deliver your new plant friends?</p></div></div>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2"><Field label="Street address" id="address" value={details.address} onChange={handleFieldChange} placeholder="House number, street, area" autoComplete="street-address" required /></div>
          <Field label="Apartment, floor (optional)" id="apartment" value={details.apartment} onChange={handleFieldChange} placeholder="Apartment, suite, unit" autoComplete="address-line2" />
          <Field label="City" id="city" value={details.city} onChange={handleFieldChange} placeholder="City or town" autoComplete="address-level2" required />
          <label className={labelClassName} htmlFor="state">State<span className="ml-1 text-[#a65f2b]" aria-hidden="true">*</span><select className={fieldClassName} id="state" name="state" value={details.state} onChange={handleFieldChange} autoComplete="address-level1" required>{indianStates.map((state) => <option key={state} value={state}>{state}</option>)}</select></label>
          <Field label="PIN code" id="postalCode" value={details.postalCode} onChange={handleFieldChange} placeholder="6-digit PIN" autoComplete="postal-code" inputMode="numeric" pattern="[0-9]{6}" maxLength={6} required />
          <label className={`${labelClassName} sm:col-span-2`} htmlFor="instructions">Delivery instructions <span className="font-normal text-[#889288]">(optional)</span><textarea className="mt-1.5 min-h-24 w-full resize-y rounded-xl border border-[#dfe4dc] bg-[#fbfaf6] px-3.5 py-3 text-sm font-normal text-[#1A3325] outline-none transition placeholder:text-[#9aa49a] focus:border-[#527358] focus:ring-2 focus:ring-[#527358]/15" id="instructions" name="instructions" value={details.instructions} onChange={handleFieldChange} placeholder="Leave with security, ring the bell, nearby landmark…" autoComplete="off" /></label>
        </div>
      </section>
      <button type="submit" className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#1A3325] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#294735] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1A3325]">Continue to delivery <ArrowRight className="size-4" aria-hidden="true" /></button>
    </form>
  )
}

function ChoiceCard({ checked, onChange, name, value, title, description, price, icon: Icon }: {
  checked: boolean
  onChange: () => void
  name: string
  value: string
  title: string
  description: string
  price: string
  icon: typeof Truck
}) {
  const id = `${name}-${value}`
  return <label htmlFor={id} className={`flex cursor-pointer items-start gap-3 rounded-2xl border p-3.5 transition-colors focus-within:ring-2 focus-within:ring-[#527358]/40 sm:p-4 ${checked ? 'border-[#527358] bg-[#f1f5ed] ring-1 ring-[#527358]' : 'border-[#e3e6df] bg-white hover:border-[#aebcae]'}`}><input id={id} className="sr-only" type="radio" name={name} value={value} checked={checked} onChange={onChange} /><span aria-hidden="true" className={`mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border ${checked ? 'border-[#315a38]' : 'border-[#c9d0c8]'}`}>{checked && <span className="size-2.5 rounded-full bg-[#315a38]" />}</span><Icon className="mt-0.5 size-4 shrink-0 text-[#527358]" aria-hidden="true" /><span className="min-w-0 flex-1"><span className="flex flex-wrap items-baseline justify-between gap-x-2 gap-y-0.5"><span className="text-sm font-semibold text-[#1A3325]">{title}</span><span className="text-xs font-bold text-[#315a38]">{price}</span></span><span className="mt-1 block text-xs leading-5 text-[#778078]">{description}</span></span></label>
}

function DeliveryPaymentStep({ delivery, setDelivery, payment, setPayment, onBack, isSubmitting, total, onSubmit }: {
  delivery: DeliveryMethod
  setDelivery: (value: DeliveryMethod) => void
  payment: PaymentMethod
  setPayment: (value: PaymentMethod) => void
  onBack: () => void
  isSubmitting: boolean
  total: number
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
}) {
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5">
      <section className="rounded-3xl border border-[#e5e8df] bg-white p-4 sm:p-6" aria-labelledby="delivery-method-heading">
        <div className="flex items-start gap-3"><span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#edf1e9] text-[#315a38]"><Truck className="size-4" aria-hidden="true" /></span><div><h2 id="delivery-method-heading" className="font-serif text-xl font-semibold text-[#1A3325]">Choose delivery</h2><p className="mt-1 text-xs leading-5 text-[#778078]">Every plant travels in breathable, nursery-safe packaging.</p></div></div>
        <fieldset className="mt-5 flex flex-col gap-3"><legend className="sr-only">Delivery method</legend><ChoiceCard name="delivery" value="standard" checked={delivery === 'standard'} onChange={() => setDelivery('standard')} title="Standard Nursery Transit" description="Carefully packed · 2–5 business days" price="Free" icon={PackageCheck} /><ChoiceCard name="delivery" value="express" checked={delivery === 'express'} onChange={() => setDelivery('express')} title="Express Local Courier" description="Same day / next day in eligible areas" price="₹149" icon={Truck} /></fieldset>
      </section>

      <section className="rounded-3xl border border-[#e5e8df] bg-white p-4 sm:p-6" aria-labelledby="payment-method-heading">
        <div className="flex items-start gap-3"><span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#edf1e9] text-[#315a38]"><WalletCards className="size-4" aria-hidden="true" /></span><div><h2 id="payment-method-heading" className="font-serif text-xl font-semibold text-[#1A3325]">Payment method</h2><p className="mt-1 text-xs leading-5 text-[#778078]">Choose how you&apos;d like to pay for this demo order.</p></div></div>
        <fieldset className="mt-5 flex flex-col gap-3"><legend className="sr-only">Payment method</legend><ChoiceCard name="payment" value="cod" checked={payment === 'cod'} onChange={() => setPayment('cod')} title="Cash on Delivery" description="Pay after your plants arrive healthy." price="₹0 advance" icon={WalletCards} /><ChoiceCard name="payment" value="upi" checked={payment === 'upi'} onChange={() => setPayment('upi')} title="UPI" description="Google Pay, PhonePe, Paytm or QR code." price="Pay online" icon={WalletCards} /><ChoiceCard name="payment" value="card" checked={payment === 'card'} onChange={() => setPayment('card')} title="Credit / Debit Card" description="Visa, Mastercard and RuPay cards." price="Pay online" icon={CreditCard} /></fieldset>
        <p className="mt-4 rounded-xl bg-[#f7f8f3] px-3.5 py-3 text-xs leading-5 text-[#68786b]">This checkout is a frontend demo. No payment will be collected or card details requested.</p>
      </section>
      <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-between"><button type="button" onClick={onBack} disabled={isSubmitting} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#dfe4dc] px-5 text-sm font-semibold text-[#526455] hover:bg-white disabled:opacity-50"><ArrowLeft className="size-4" aria-hidden="true" /> Back to details</button><button type="submit" disabled={isSubmitting} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#1A3325] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#294735] disabled:cursor-wait disabled:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1A3325]">{isSubmitting ? <><span className="size-4 animate-spin rounded-full border-2 border-white/35 border-t-white" aria-hidden="true" /> Placing your order…</> : <>Confirm &amp; place order · {formatPrice(total)} <ArrowRight className="size-4" aria-hidden="true" /></>}</button></div>
    </form>
  )
}

function OrderSummary({ delivery, onDeliveryChange }: { delivery: DeliveryMethod; onDeliveryChange: (value: DeliveryMethod) => void }) {
  const { items, subtotalPrice, discountAmount, couponCode } = useCart()
  const deliveryPrice = delivery === 'express' ? 149 : 0
  const total = Math.max(0, subtotalPrice - discountAmount) + deliveryPrice
  const groups = items.reduce<Record<string, typeof items>>((result, item) => {
    ;(result[item.nurseryName] ??= []).push(item)
    return result
  }, {})

  return (
    <aside className="order-2 min-w-0 lg:order-2 lg:sticky lg:top-6" aria-label="Order summary">
      <section className="rounded-3xl border border-[#e5e8df] bg-white p-4 shadow-[0_18px_50px_-40px_rgba(26,51,37,0.45)] sm:p-6">
        <div className="flex items-center justify-between gap-3"><h2 className="font-serif text-xl font-semibold text-[#1A3325]">Your plant bag</h2><Link href="/cart" className="text-xs font-semibold text-[#527358] underline-offset-4 hover:underline">Edit bag</Link></div>
        <div className="mt-4 flex flex-col gap-4">
          {Object.entries(groups).map(([nursery, nurseryItems]) => <section key={nursery} aria-label={`From ${nursery}`}><p className="mb-2 text-[10px] font-bold uppercase tracking-[0.12em] text-[#899389]">From {nursery}</p><ul className="flex flex-col gap-3">{nurseryItems.map((item) => <li key={`${item.productId}-${item.size}-${item.pot}`} className="flex gap-3"><span className="relative size-14 shrink-0 overflow-hidden rounded-xl bg-[#edf1e9]"><Image src={item.image} alt={item.productName} fill sizes="56px" className="object-cover" /></span><span className="min-w-0 flex-1"><span className="block truncate text-sm font-semibold text-[#1A3325]">{item.productName}</span><span className="mt-1 block truncate text-xs text-[#778078]">Size {item.size} · {item.pot} · Qty {item.quantity}</span></span><span className="shrink-0 text-sm font-semibold text-[#1A3325]">{formatPrice(item.price * item.quantity)}</span></li>)}</ul></section>)}
        </div>
        <div className="mt-5 border-t border-[#eceee8] pt-4"><fieldset><legend className="mb-2 text-xs font-semibold text-[#526455]">Delivery option</legend><div className="flex flex-col gap-2"><label className={`flex cursor-pointer items-center justify-between gap-2 rounded-xl border px-3 py-2.5 text-xs ${delivery === 'standard' ? 'border-[#527358] bg-[#f1f5ed]' : 'border-[#e5e8df]'}`}><span className="flex items-center gap-2"><input type="radio" name="summary-delivery" checked={delivery === 'standard'} onChange={() => onDeliveryChange('standard')} /><span className="font-medium text-[#1A3325]">Standard transit</span></span><span className="font-semibold text-[#315a38]">Free</span></label><label className={`flex cursor-pointer items-center justify-between gap-2 rounded-xl border px-3 py-2.5 text-xs ${delivery === 'express' ? 'border-[#527358] bg-[#f1f5ed]' : 'border-[#e5e8df]'}`}><span className="flex items-center gap-2"><input type="radio" name="summary-delivery" checked={delivery === 'express'} onChange={() => onDeliveryChange('express')} /><span className="font-medium text-[#1A3325]">Express courier</span></span><span className="font-semibold text-[#1A3325]">₹149</span></label></div></fieldset></div>
        <dl className="mt-5 flex flex-col gap-3 border-t border-[#eceee8] pt-4 text-sm"><div className="flex justify-between gap-3 text-[#68786b]"><dt>Subtotal</dt><dd className="font-medium text-[#1A3325]">{formatPrice(subtotalPrice)}</dd></div>{discountAmount > 0 && <div className="flex justify-between gap-3 text-[#315a38]"><dt>Discount <span className="text-xs">({couponCode})</span></dt><dd className="font-semibold">−{formatPrice(discountAmount)}</dd></div>}<div className="flex justify-between gap-3 text-[#68786b]"><dt>Eco-transit packaging</dt><dd className="font-semibold text-[#527358]">Free</dd></div><div className="flex justify-between gap-3 text-[#68786b]"><dt>Delivery</dt><dd className="font-medium text-[#1A3325]">{deliveryPrice ? formatPrice(deliveryPrice) : 'Free'}</dd></div></dl>
        <div className="mt-4 flex items-end justify-between gap-3 border-t border-[#eceee8] pt-4"><span className="text-sm font-bold text-[#1A3325]">Total <span className="font-normal text-[#778078]">(taxes included)</span></span><span className="text-xl font-bold text-[#1A3325]">{formatPrice(total)}</span></div>
        <div className="mt-4 flex items-center gap-2 rounded-xl bg-[#edf1e9] px-3 py-2.5 text-xs font-semibold text-[#315a38]"><ShieldCheck className="size-4 shrink-0" aria-hidden="true" /><span>7-day wrong/damaged plant claims; complete 360° unboxing video required</span></div>
        <p className="mt-2 flex items-center gap-2 px-1 text-xs leading-5 text-[#778078]"><Leaf className="size-3.5 shrink-0 text-[#527358]" aria-hidden="true" /> Eco-friendly biodegradable packaging</p>
      </section>
    </aside>
  )
}

export function CheckoutContent() {
  const router = useRouter()
  const { items, subtotalPrice, discountAmount, clearCart } = useCart()
  const [isHydrated, setIsHydrated] = useState(false)
  const [step, setStep] = useState<1 | 2>(1)
  const [details, setDetails] = useState<CustomerDetails>(emptyDetails)
  const [delivery, setDelivery] = useState<DeliveryMethod>('standard')
  const [payment, setPayment] = useState<PaymentMethod>('cod')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

  useEffect(() => {
    function finishHydration() {
      const savedAddress = readSavedAddresses().find((address) => address.isDefault) ?? readSavedAddresses()[0]
      if (savedAddress) {
        setDetails({
          fullName: savedAddress.fullName,
          phone: savedAddress.phone.replace(/\D/g, '').slice(-10),
          email: savedAddress.email,
          address: savedAddress.address,
          apartment: savedAddress.apartment,
          city: savedAddress.city,
          state: savedAddress.state,
          postalCode: savedAddress.postalCode,
          instructions: savedAddress.instructions,
        })
      }
      setIsHydrated(true)
    }

    const unsubscribe = useCartStore.persist.onFinishHydration(finishHydration)
    if (useCartStore.persist.hasHydrated()) finishHydration()
    return unsubscribe
  }, [])

  function handleDetailsSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStep(2)
  }

  function handlePlaceOrder(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (isSubmitting || items.length === 0) return
    setSubmitError('')
    setIsSubmitting(true)
    window.setTimeout(() => {
      const now = new Date()
      const estimatedDelivery = new Date(now)
      estimatedDelivery.setDate(estimatedDelivery.getDate() + (delivery === 'express' ? 1 : 4))
      const orderId = `ARG-${Date.now().toString().slice(-8)}`
      const totalAmount = Math.max(0, subtotalPrice - discountAmount) + (delivery === 'express' ? 149 : 0)
      const order: CustomerOrder = {
        id: orderId,
        date: now.toISOString(),
        items: items.map((item) => ({ ...item })),
        totalAmount,
        deliveryAddress: { ...details },
        status: 'Freshly picked by grower',
        trackingStage: 1,
        deliveryMethod: delivery,
        paymentMethod: payment,
        estimatedDelivery: estimatedDelivery.toISOString(),
      }

      if (!saveCustomerOrder(order)) {
        setSubmitError('We could not save this demo order in browser storage. Please check your browser settings and try again.')
        setIsSubmitting(false)
        return
      }

      const savedAddresses = readSavedAddresses()
      const defaultAddress = savedAddresses.find((address) => address.isDefault) ?? savedAddresses[0]
      const nextAddress = {
        ...details,
        id: defaultAddress?.id ?? `address-${Date.now()}`,
        label: defaultAddress?.label ?? 'Home',
        isDefault: true,
      }
      saveSavedAddresses([nextAddress, ...savedAddresses.filter((address) => address.id !== nextAddress.id).map((address) => ({ ...address, isDefault: false }))])
      clearCart()
      router.push(`/order-success/${encodeURIComponent(orderId)}`)
    }, 1000)
  }

  if (!isHydrated) return <><CheckoutHeader /><main className="flex min-h-[65vh] items-center justify-center bg-[#f7f5ef] px-4"><p className="text-sm text-[#68786b]" role="status">Loading your plant bag…</p></main></>

  if (items.length === 0) return <><CheckoutHeader /><main className="flex min-h-[65vh] items-center justify-center bg-[#f7f5ef] px-4 py-12"><section className="max-w-md text-center"><span className="mx-auto flex size-16 items-center justify-center rounded-full bg-[#edf1e9] text-[#315a38]"><Leaf className="size-7" aria-hidden="true" /></span><h1 className="mt-5 font-serif text-2xl font-semibold text-[#1A3325]">Your plant bag is waiting</h1><p className="mt-2 text-sm leading-6 text-[#68786b]">Add a little green to your bag before heading to checkout.</p><Link href="/shop" className="mt-5 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#1A3325] px-6 text-sm font-semibold text-white hover:bg-[#294735]">Explore the plants <ChevronRight className="size-4" aria-hidden="true" /></Link></section></main></>

  return (
    <>
      <CheckoutHeader />
      <main className="min-h-[75vh] bg-[#f7f5ef] px-4 pb-12 pt-5 sm:px-6 sm:pb-20 sm:pt-8 lg:px-10">
        <div className="mx-auto max-w-[90rem]">
          <Link href="/cart" className="inline-flex min-h-9 items-center gap-2 text-xs font-semibold text-[#526455] hover:text-[#1A3325]"><ArrowLeft className="size-4" aria-hidden="true" /> Back to your bag</Link>
          <div className="mt-3 flex flex-col gap-3 border-b border-[#e3e0d7] pb-5 sm:mt-5 sm:flex-row sm:items-end sm:justify-between sm:pb-6"><div><p className="text-[10px] font-bold uppercase tracking-[0.17em] text-[#a65f2b]">Abhay&apos;s Roof Garden Collective</p><h1 className="mt-1 font-serif text-3xl font-semibold tracking-tight text-[#1A3325] sm:text-4xl">Secure checkout</h1></div><div className="w-full sm:w-[340px]"><StepIndicator currentStep={step} /></div></div>
          <div className="mt-5 grid grid-cols-1 items-start gap-5 lg:mt-7 lg:grid-cols-[minmax(0,1fr)_390px] lg:gap-8">
            <div className="order-1 min-w-0 lg:order-1">
              {submitError && <p className="mb-4 rounded-2xl border border-[#e7d9c9] bg-[#fffaf3] px-4 py-3 text-sm leading-5 text-[#705843]" role="alert">{submitError}</p>}
              {step === 1 ? <DetailsStep details={details} setDetails={setDetails} onContinue={handleDetailsSubmit} /> : <DeliveryPaymentStep delivery={delivery} setDelivery={setDelivery} payment={payment} setPayment={setPayment} onBack={() => setStep(1)} isSubmitting={isSubmitting} total={Math.max(0, subtotalPrice - discountAmount) + (delivery === 'express' ? 149 : 0)} onSubmit={handlePlaceOrder} />}
              <p className="mt-4 flex items-center justify-center gap-2 text-[11px] text-[#778078]"><LockKeyhole className="size-3.5" aria-hidden="true" /> Your details are protected with secure checkout.</p>
            </div>
            <OrderSummary delivery={delivery} onDeliveryChange={setDelivery} />
          </div>
        </div>
      </main>
    </>
  )
}
