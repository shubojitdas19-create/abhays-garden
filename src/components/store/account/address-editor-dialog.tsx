'use client'

import { useEffect, useState, type FormEvent } from 'react'
import { MapPin, Save } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import type { SavedAddress } from '@/lib/store/customer-data'

type AddressForm = Omit<SavedAddress, 'id' | 'isDefault'>

const emptyForm: AddressForm = {
  label: 'Home', fullName: '', phone: '', email: '', address: '', apartment: '', city: '', state: 'West Bengal', postalCode: '', instructions: '',
}

const inputClassName = 'mt-1.5 h-11 w-full rounded-xl border border-[#dfe4dc] bg-[#fbfaf6] px-3 text-sm text-[#1A3325] outline-none transition placeholder:text-[#9aa49a] focus:border-[#527358] focus:ring-2 focus:ring-[#527358]/15'
const labelClassName = 'block text-xs font-semibold text-[#526455]'

export function AddressEditorDialog({ open, onOpenChange, initialAddress, onSave }: {
  open: boolean
  onOpenChange: (open: boolean) => void
  initialAddress?: SavedAddress
  onSave: (address: SavedAddress) => void
}) {
  const [form, setForm] = useState<AddressForm>(emptyForm)

  useEffect(() => {
    if (!open) return
    setForm(initialAddress ? {
      label: initialAddress.label,
      fullName: initialAddress.fullName,
      phone: initialAddress.phone,
      email: initialAddress.email,
      address: initialAddress.address,
      apartment: initialAddress.apartment,
      city: initialAddress.city,
      state: initialAddress.state,
      postalCode: initialAddress.postalCode,
      instructions: initialAddress.instructions,
    } : emptyForm)
  }, [open, initialAddress])

  function updateField(field: keyof AddressForm, value: string) {
    setForm((current) => ({ ...current, [field]: value }))
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    onSave({
      ...form,
      id: initialAddress?.id ?? `address-${Date.now()}`,
      isDefault: initialAddress?.isDefault ?? false,
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-xl overflow-y-auto rounded-3xl border border-[#e5e8df] bg-[#fbfaf6] p-5 text-[#1A3325] sm:p-7">
        <DialogHeader className="pr-7">
          <span className="flex size-10 items-center justify-center rounded-full bg-[#edf1e9] text-[#315a38]"><MapPin className="size-4" aria-hidden="true" /></span>
          <DialogTitle className="font-serif text-2xl font-semibold">{initialAddress ? 'Edit delivery address' : 'Add a delivery address'}</DialogTitle>
          <DialogDescription className="text-sm leading-6 text-[#68786b]">Save an address on this device for a quicker checkout next time.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="mt-2 grid gap-3 sm:grid-cols-2">
          <label className={labelClassName}>Address label<input className={inputClassName} value={form.label} onChange={(event) => updateField('label', event.target.value)} required /></label>
          <label className={labelClassName}>Full name<input className={inputClassName} autoComplete="name" value={form.fullName} onChange={(event) => updateField('fullName', event.target.value)} required /></label>
          <label className={labelClassName}>WhatsApp number<input className={inputClassName} type="tel" inputMode="tel" autoComplete="tel-national" pattern="[6-9][0-9]{9}" maxLength={10} placeholder="10-digit mobile number" value={form.phone} onChange={(event) => updateField('phone', event.target.value)} required /></label>
          <label className={labelClassName}>Email address<input className={inputClassName} type="email" autoComplete="email" value={form.email} onChange={(event) => updateField('email', event.target.value)} required /></label>
          <label className={`${labelClassName} sm:col-span-2`}>Street address<input className={inputClassName} autoComplete="street-address" value={form.address} onChange={(event) => updateField('address', event.target.value)} required /></label>
          <label className={labelClassName}>Apartment or floor<input className={inputClassName} autoComplete="address-line2" value={form.apartment} onChange={(event) => updateField('apartment', event.target.value)} /></label>
          <label className={labelClassName}>City<input className={inputClassName} autoComplete="address-level2" value={form.city} onChange={(event) => updateField('city', event.target.value)} required /></label>
          <label className={labelClassName}>State<input className={inputClassName} autoComplete="address-level1" value={form.state} onChange={(event) => updateField('state', event.target.value)} required /></label>
          <label className={labelClassName}>PIN code<input className={inputClassName} inputMode="numeric" autoComplete="postal-code" pattern="[0-9]{6}" maxLength={6} value={form.postalCode} onChange={(event) => updateField('postalCode', event.target.value)} required /></label>
          <label className={`${labelClassName} sm:col-span-2`}>Delivery instructions <span className="font-normal text-[#889288]">(optional)</span><textarea className="mt-1.5 min-h-20 w-full resize-y rounded-xl border border-[#dfe4dc] bg-[#fbfaf6] px-3 py-2.5 text-sm font-normal text-[#1A3325] outline-none transition placeholder:text-[#9aa49a] focus:border-[#527358] focus:ring-2 focus:ring-[#527358]/15" value={form.instructions} onChange={(event) => updateField('instructions', event.target.value)} /></label>
          <div className="mt-1 flex flex-col-reverse gap-2 sm:col-span-2 sm:flex-row sm:justify-end"><button type="button" onClick={() => onOpenChange(false)} className="min-h-11 rounded-full border border-[#dfe4dc] px-5 text-sm font-semibold text-[#526455] hover:bg-white">Cancel</button><button type="submit" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#1A3325] px-5 text-sm font-semibold text-white hover:bg-[#294735]"><Save className="size-4" aria-hidden="true" /> Save address</button></div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
