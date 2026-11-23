'use client'

import { useEffect, useRef, useState, type ChangeEvent, type DragEvent, type FormEvent } from 'react'
import Image from 'next/image'
import { Check, CheckCircle2, ImagePlus, Leaf, Plus, Sprout, X } from 'lucide-react'

const nurseryTypes = [
  'Commercial ground nursery',
  'Home rooftop / terrace garden',
  'Micro-grower / hobbyist',
]

const specialties = ['Indoor', 'Flowering', 'Bonsai', 'Succulents', 'Herbs', 'Exotic aroids']
const inputClassName = 'mt-1.5 h-11 w-full rounded-xl border border-[#dfe3da] bg-[#fbfaf6] px-3.5 text-sm text-[#1A3325] outline-none transition placeholder:text-[#98a197] focus:border-[#527358] focus:ring-2 focus:ring-[#527358]/15'
const labelClassName = 'text-xs font-semibold text-[#304b37] sm:text-sm'

export function GrowerApplicationForm() {
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([])
  const [specialtyError, setSpecialtyError] = useState('')
  const [photos, setPhotos] = useState<File[]>([])
  const [photoError, setPhotoError] = useState('')
  const [previewUrls, setPreviewUrls] = useState<string[]>([])
  const [applicantName, setApplicantName] = useState('')
  const [applicationReceived, setApplicationReceived] = useState(false)
  const confirmationRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const urls = photos.map((photo) => URL.createObjectURL(photo))
    setPreviewUrls(urls)
    return () => urls.forEach((url) => URL.revokeObjectURL(url))
  }, [photos])

  useEffect(() => {
    if (applicationReceived) confirmationRef.current?.showModal()
  }, [applicationReceived])

  function addPhotos(files: File[]) {
    const allowedImageTypes = ['image/jpeg', 'image/png', 'image/webp']
    const imageFiles = files.filter((file) => allowedImageTypes.includes(file.type))
    if (imageFiles.length !== files.length) setPhotoError('Please select JPG, PNG, or WebP images only.')
    else if (photos.length + imageFiles.length > 5) setPhotoError('You can add up to 5 photos.')
    else setPhotoError('')

    const availableSlots = Math.max(0, 5 - photos.length)
    setPhotos((current) => [...current, ...imageFiles.slice(0, availableSlots)].slice(-5))
  }

  function handlePhotoChange(event: ChangeEvent<HTMLInputElement>) {
    addPhotos(Array.from(event.currentTarget.files ?? []))
    event.currentTarget.value = ''
  }

  function handleDrop(event: DragEvent<HTMLLabelElement>) {
    event.preventDefault()
    addPhotos(Array.from(event.dataTransfer.files))
  }

  function toggleSpecialty(specialty: string) {
    setSelectedSpecialties((current) => {
      const next = current.includes(specialty)
        ? current.filter((item) => item !== specialty)
        : [...current, specialty]
      if (next.length) setSpecialtyError('')
      return next
    })
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!selectedSpecialties.length) {
      setSpecialtyError('Choose at least one specialty to continue.')
      document.getElementById('specialty-indoor')?.focus()
      return
    }

    const formData = new FormData(event.currentTarget)
    setApplicantName(String(formData.get('ownerName') ?? ''))
    setApplicationReceived(true)
  }

  function closeConfirmation() {
    confirmationRef.current?.close()
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="rounded-[1.5rem] border border-[#e4e8df] bg-white p-4 shadow-[0_16px_45px_rgba(26,51,37,0.07)] sm:rounded-[2rem] sm:p-7 lg:p-8">
        <div className="mb-6 border-b border-[#ecefe9] pb-5 sm:mb-7">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#a65f2b]">Grower application</p>
          <h3 className="mt-1.5 font-serif text-2xl font-semibold text-[#1A3325]">Tell us about your garden</h3>
          <p className="mt-2 text-xs leading-5 text-[#68786b] sm:text-sm">Fields marked with <span className="text-[#a65f2b]">*</span> are required.</p>
        </div>

        <div className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2 sm:gap-y-5">
          <label className={labelClassName}>
            Nursery / garden name <span className="text-[#a65f2b]">*</span>
            <input className={inputClassName} name="nurseryName" autoComplete="organization" placeholder="e.g. Green Corner Garden" required />
          </label>
          <label className={labelClassName}>
            Owner name <span className="text-[#a65f2b]">*</span>
            <input className={inputClassName} name="ownerName" autoComplete="name" placeholder="Your full name" required />
          </label>
          <label className={labelClassName}>
            WhatsApp number <span className="text-[#a65f2b]">*</span>
            <input className={inputClassName} name="whatsapp" type="tel" inputMode="tel" autoComplete="tel" placeholder="+91 98765 43210" required />
          </label>
          <label className={labelClassName}>
            Email address <span className="text-[#a65f2b]">*</span>
            <input className={inputClassName} name="email" type="email" autoComplete="email" placeholder="you@example.com" required />
          </label>
          <label className={`${labelClassName} sm:col-span-2`}>
            Nursery type <span className="text-[#a65f2b]">*</span>
            <select className={`${inputClassName} appearance-none`} name="nurseryType" defaultValue="" required>
              <option value="" disabled>Select the option that fits best</option>
              {nurseryTypes.map((type) => <option key={type}>{type}</option>)}
            </select>
          </label>
          <label className={`${labelClassName} sm:col-span-2`}>
            Nursery address <span className="text-[#a65f2b]">*</span>
            <textarea className="mt-1.5 min-h-24 w-full resize-y rounded-xl border border-[#dfe3da] bg-[#fbfaf6] px-3.5 py-3 text-sm text-[#1A3325] outline-none transition placeholder:text-[#98a197] focus:border-[#527358] focus:ring-2 focus:ring-[#527358]/15" name="address" autoComplete="street-address" placeholder="Street, neighbourhood, or a nearby landmark" required />
          </label>
          <label className={labelClassName}>
            City <span className="text-[#a65f2b]">*</span>
            <input className={inputClassName} name="city" autoComplete="address-level2" placeholder="e.g. Berhampore" required />
          </label>
          <label className={labelClassName}>
            PIN code <span className="text-[#a65f2b]">*</span>
            <input className={inputClassName} name="pin" inputMode="numeric" autoComplete="postal-code" maxLength={6} pattern="[0-9]{6}" placeholder="6-digit PIN" required />
          </label>
        </div>

        <fieldset className="mt-6">
          <legend className={labelClassName}>Main specialties <span className="text-[#a65f2b]">*</span></legend>
          <p className="mt-1 text-xs text-[#778078]">Select all that you grow.</p>
          <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
            {specialties.map((specialty, index) => {
              const id = `specialty-${index === 0 ? 'indoor' : specialty.toLowerCase().replaceAll(' ', '-')}`
              const checked = selectedSpecialties.includes(specialty)
              return (
                <label key={specialty} htmlFor={id} className={`flex min-h-11 cursor-pointer items-center gap-2.5 rounded-xl border px-3 py-2 text-xs font-medium transition-colors focus-within:ring-2 focus-within:ring-[#527358]/20 sm:text-sm ${checked ? 'border-[#527358] bg-[#edf2ea] text-[#1A3325]' : 'border-[#e2e5de] bg-[#fbfaf6] text-[#5d6a5f] hover:border-[#b8c6b6]'}`}>
                  <input id={id} type="checkbox" name="specialties" value={specialty} checked={checked} onChange={() => toggleSpecialty(specialty)} aria-describedby={specialtyError ? 'specialty-error' : undefined} className="sr-only" />
                  <span className={`flex size-4 shrink-0 items-center justify-center rounded border ${checked ? 'border-[#365440] bg-[#365440] text-white' : 'border-[#b9c2b8] bg-white'}`} aria-hidden="true">{checked && <Check className="size-3" />}</span>
                  {specialty}
                </label>
              )
            })}
          </div>
          {specialtyError && <p id="specialty-error" className="mt-2 text-xs font-medium text-[#a14432]" role="alert">{specialtyError}</p>}
        </fieldset>

        <div className="mt-6">
          <p className={labelClassName}>A glimpse of your nursery <span className="font-normal text-[#778078]">(optional)</span></p>
          <p id="photo-hint" className="mt-1 text-xs leading-5 text-[#778078]">Add up to 5 photos of your plants or growing space.</p>
          <label htmlFor="nursery-photos" onDragOver={(event) => event.preventDefault()} onDrop={handleDrop} className="mt-3 flex min-h-28 cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-[#bfcbbd] bg-[#fbfaf6] px-4 py-5 text-center transition-colors hover:border-[#527358] hover:bg-[#f4f6f1] focus-within:ring-2 focus-within:ring-[#527358]/20">
            <span className="flex size-9 items-center justify-center rounded-full bg-[#e9efe6] text-[#527358]"><ImagePlus className="size-4.5" aria-hidden="true" /></span>
            <span className="mt-2 text-xs font-semibold text-[#365440]">Drop photos here or browse</span>
            <span className="mt-1 text-[11px] text-[#778078]">JPG, PNG or WebP · up to 5 images</span>
            <input id="nursery-photos" type="file" accept="image/jpeg,image/png,image/webp" multiple onChange={handlePhotoChange} aria-describedby="photo-hint" className="sr-only" />
          </label>
          {photoError && <p className="mt-2 text-xs font-medium text-[#a14432]" role="alert">{photoError}</p>}
          {previewUrls.length > 0 && (
            <ul className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-5" aria-label="Selected nursery photos">
              {previewUrls.map((url, index) => (
                <li key={`${photos[index]?.name}-${index}`} className="group relative aspect-square overflow-hidden rounded-xl bg-[#e9efe6]">
                  <Image src={url} alt={`Nursery photo ${index + 1}`} fill unoptimized sizes="96px" className="object-cover" />
                  <button type="button" onClick={() => setPhotos((current) => current.filter((_, photoIndex) => photoIndex !== index))} className="absolute right-1 top-1 inline-flex size-7 items-center justify-center rounded-full bg-[#10271d]/85 text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white" aria-label={`Remove nursery photo ${index + 1}`}>
                    <X className="size-3.5" aria-hidden="true" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <button type="submit" className="mt-7 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#1A3325] px-6 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#294735] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1A3325]">
          Send my application <Plus className="size-4" aria-hidden="true" />
        </button>
        <p className="mt-3 text-center text-[11px] leading-5 text-[#778078]">By applying, you agree to be contacted about joining the collective.</p>
      </form>

      <dialog ref={confirmationRef} onClose={() => setApplicationReceived(false)} aria-labelledby="application-success-heading" className="m-auto w-[calc(100%-2rem)] max-w-md rounded-[1.75rem] border border-[#e5e8df] bg-[#fbfaf6] p-0 text-[#1A3325] shadow-2xl backdrop:bg-[#0f291e]/65">
        <div className="p-6 text-center sm:p-8">
          <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-[#e8efe6] text-[#365440]"><CheckCircle2 className="size-7" aria-hidden="true" /></span>
          <p className="mt-5 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#a65f2b]">Application received</p>
          <h3 id="application-success-heading" className="mt-2 font-serif text-2xl font-semibold">Thank you{applicantName ? `, ${applicantName.split(' ')[0]}` : ''}.</h3>
          <p className="mt-3 text-sm leading-6 text-[#68786b]">Our curator will review your application and arrange a nursery visit within 48 hours. We&apos;re excited to learn about what you grow.</p>
          <div className="mt-6 flex items-center justify-center gap-2 rounded-xl bg-[#edf2ea] px-4 py-3 text-xs font-medium text-[#365440]"><Leaf className="size-4" aria-hidden="true" /> A new growing story starts here.</div>
          <button type="button" onClick={closeConfirmation} className="mt-6 inline-flex min-h-11 w-full items-center justify-center rounded-full bg-[#1A3325] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#294735] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1A3325]">Back to the page</button>
        </div>
      </dialog>
    </>
  )
}
