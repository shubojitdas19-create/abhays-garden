'use client'

import { useEffect, useState, type FormEvent } from 'react'
import Link from 'next/link'
import { ArrowRight, LockKeyhole, Mail, MapPin, PackageCheck, Phone, Sprout } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { readCustomerOrders, readSavedAddresses } from '@/lib/store/customer-data'

type GardenSnapshot = { firstName: string; orders: number; addresses: number }

export function AuthModal({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const [contact, setContact] = useState('')
  const [message, setMessage] = useState('')
  const [garden, setGarden] = useState<GardenSnapshot>({ firstName: '', orders: 0, addresses: 0 })

  useEffect(() => {
    if (!open) return
    const orders = readCustomerOrders()
    const addresses = readSavedAddresses()
    setGarden({
      firstName: orders[0]?.deliveryAddress.fullName.trim().split(/\s+/)[0] ?? '',
      orders: orders.length,
      addresses: addresses.length,
    })
  }, [open])

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setMessage('Sign-in is not connected in this preview. No code was sent and no account was created.')
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90dvh] w-[calc(100%-1.5rem)] max-w-[420px] overflow-y-auto rounded-[28px] border border-[#e5e8df] bg-[#fbfaf6] p-5 text-[#1A3325] shadow-[0_24px_80px_-24px_rgba(18,45,29,0.38)] sm:p-7">
        <DialogHeader className="gap-3 pr-7 text-left">
          <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-[#55765b]">
            <span className="flex size-8 items-center justify-center rounded-full bg-[#eaf0e6]"><Sprout className="size-4" aria-hidden="true" /></span>
            A little more green
          </div>
          <div className="flex flex-col gap-2">
            <DialogTitle className="font-serif text-[26px] font-semibold leading-tight tracking-[-0.02em]">
              {garden.firstName ? `Welcome back, ${garden.firstName}.` : 'Your garden, in one place.'}
            </DialogTitle>
            <DialogDescription className="text-sm leading-6 text-[#68786b]">
              {garden.orders > 0
                ? `Good to see you again. Your ${garden.orders === 1 ? 'latest order is' : `${garden.orders} orders are`} saved on this device.`
                : 'Keep your plant orders and favorite garden details close at hand.'}
            </DialogDescription>
          </div>
        </DialogHeader>

        <div className="mt-5 grid grid-cols-2 gap-2.5" aria-label="Your garden on this device">
          <div className="flex min-w-0 items-center gap-2.5 rounded-2xl border border-[#e6e9df] bg-white/80 px-3 py-3">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-[#edf3e9] text-[#42684a"><PackageCheck className="size-4" aria-hidden="true" /></span>
            <span className="min-w-0"><span className="block text-lg font-semibold leading-5">{garden.orders}</span><span className="block truncate pt-1 text-[11px] text-[#68786b]">Orders</span></span>
          </div>
          <div className="flex min-w-0 items-center gap-2.5 rounded-2xl border border-[#e6e9df] bg-white/80 px-3 py-3">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-[#f5eee2] text-[#8a633a]"><MapPin className="size-4" aria-hidden="true" /></span>
            <span className="min-w-0"><span className="block text-lg font-semibold leading-5">{garden.addresses}</span><span className="block truncate pt-1 text-[11px] text-[#68786b]">Addresses</span></span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-3">
          <label htmlFor="account-contact" className="text-xs font-semibold text-[#526455]">Email or WhatsApp number</label>
          <div className="flex h-12 items-center gap-2 rounded-xl border border-[#dfe4dc] bg-white px-3.5 transition focus-within:border-[#527358] focus-within:ring-2 focus-within:ring-[#527358]/15">
            <Phone className="size-4 shrink-0 text-[#778078]" aria-hidden="true" />
            <input id="account-contact" name="contact" value={contact} onChange={(event) => { setContact(event.target.value); setMessage('') }} placeholder="Your number or email address" autoComplete="email tel" required className="min-w-0 flex-1 bg-transparent text-sm text-[#1A3325] outline-none placeholder:text-[#9aa49a]" />
            <Mail className="size-4 shrink-0 text-[#778078]" aria-hidden="true" />
          </div>
          <p className="flex items-start gap-2 rounded-xl bg-[#f0f3ec] px-3 py-2.5 text-xs leading-5 text-[#627064]"><LockKeyhole className="mt-0.5 size-3.5 shrink-0 text-[#527358]" aria-hidden="true" /> Your details stay on this device in this preview. No password or verification code is requested.</p>
          {message && <p role="status" className="rounded-xl border border-[#e6d8c8] bg-[#fffaf3] px-3 py-2.5 text-xs leading-5 text-[#705843]">{message}</p>}
          <button type="submit" className="mt-1 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#1A3325] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#294735] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1A3325]">Continue <ArrowRight className="size-4" aria-hidden="true" /></button>
        </form>
        <Link href="/account" onClick={() => onOpenChange(false)} className="mt-3 flex min-h-11 items-center justify-center rounded-full border border-[#dfe4dc] px-5 text-sm font-semibold text-[#315a38] transition-colors hover:bg-[#edf1e9]">View account and orders</Link>
      </DialogContent>
    </Dialog>
  )
}
