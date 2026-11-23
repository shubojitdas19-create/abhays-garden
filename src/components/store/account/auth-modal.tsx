'use client'

import { useState, type FormEvent } from 'react'
import Link from 'next/link'
import { ArrowRight, Leaf, LockKeyhole, Mail, Phone } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

export function AuthModal({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const [contact, setContact] = useState('')
  const [message, setMessage] = useState('')

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setMessage('Sign-in is not connected in this frontend-only preview. No code was sent and no account was created.')
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[calc(100%-2rem)] max-w-md rounded-3xl border border-[#e5e8df] bg-[#fbfaf6] p-5 text-[#1A3325] shadow-2xl sm:p-7">
        <DialogHeader className="gap-2 pr-7">
          <span className="flex size-11 items-center justify-center rounded-full bg-[#edf1e9] text-[#315a38]"><Leaf className="size-5" aria-hidden="true" /></span>
          <DialogTitle className="font-serif text-2xl font-semibold">A little more green, together</DialogTitle>
          <DialogDescription className="text-sm leading-6 text-[#68786b]">Sign-in is planned for a future connected version. You can still browse your orders and saved garden on this device.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-3">
          <label htmlFor="account-contact" className="text-xs font-semibold text-[#526455]">WhatsApp number or email</label>
          <div className="flex h-12 items-center gap-2 rounded-xl border border-[#dfe4dc] bg-white px-3.5 focus-within:border-[#527358] focus-within:ring-2 focus-within:ring-[#527358]/15">
            <Phone className="size-4 shrink-0 text-[#778078]" aria-hidden="true" />
            <input id="account-contact" name="contact" value={contact} onChange={(event) => { setContact(event.target.value); setMessage('') }} placeholder="+91 98765 43210 or you@example.com" autoComplete="email tel" required className="min-w-0 flex-1 bg-transparent text-sm text-[#1A3325] outline-none placeholder:text-[#9aa49a]" />
            <Mail className="size-4 shrink-0 text-[#778078]" aria-hidden="true" />
          </div>
          <p className="flex items-start gap-2 rounded-xl bg-[#f0f3ec] px-3 py-2.5 text-xs leading-5 text-[#627064]"><LockKeyhole className="mt-0.5 size-3.5 shrink-0 text-[#527358]" aria-hidden="true" /> No password or one-time code is requested in this UI-only preview.</p>
          {message && <p role="status" className="rounded-xl border border-[#e6d8c8] bg-[#fffaf3] px-3 py-2.5 text-xs leading-5 text-[#705843]">{message}</p>}
          <button type="submit" className="mt-1 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#1A3325] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#294735] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1A3325]">Continue <ArrowRight className="size-4" aria-hidden="true" /></button>
        </form>
        <Link href="/account" onClick={() => onOpenChange(false)} className="mt-3 flex min-h-11 items-center justify-center rounded-full border border-[#dfe4dc] px-5 text-sm font-semibold text-[#315a38] transition-colors hover:bg-[#edf1e9]">View account and orders</Link>
      </DialogContent>
    </Dialog>
  )
}
