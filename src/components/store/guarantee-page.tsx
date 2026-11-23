import Link from 'next/link'
import { ArrowRight, Camera, Check, MessageCircle, PackageCheck, ShieldCheck, Sprout } from 'lucide-react'

const claimSteps = [
  { number: '01', title: 'Take a clear photo', detail: 'Photograph the plant and its packaging as soon as you notice a concern.', icon: Camera },
  { number: '02', title: 'Message our team', detail: 'Send your order details and photos to our plant specialists on WhatsApp within 7 days of delivery.', icon: MessageCircle },
  { number: '03', title: 'We make it right', detail: 'After a quick review, we arrange a healthy replacement or refund within 48 hours.', icon: PackageCheck },
]

export function GuaranteePage() {
  const whatsappText = encodeURIComponent('Hi Abhay’s Roof Garden, I need help with the 7-day healthy plant guarantee.')

  return (
    <main className="overflow-hidden">
      <section className="relative bg-[#0F291E] text-white">
        <div className="mx-auto w-full max-w-[100rem] px-4 py-14 sm:px-6 sm:py-20 lg:px-10 lg:py-24 xl:px-14">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#f0c780]"><ShieldCheck className="size-4" aria-hidden="true" /> Here for your first week</p>
          <h1 className="mt-5 max-w-3xl font-serif text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">Our 7-Day Healthy Plant Promise</h1>
          <p className="mt-5 max-w-2xl text-sm leading-7 text-white/75 sm:text-base sm:leading-8">Every plant is packed with care and backed by real people. If your plant arrives in poor health, we&apos;ll help you find the right solution—without the runaround.</p>
          <Link href="#how-to-claim" className="mt-7 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#E5A849] px-6 text-sm font-semibold text-[#1A3325] transition-colors hover:bg-[#efbc69]">How to make a claim <ArrowRight className="size-4" aria-hidden="true" /></Link>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[100rem] px-4 py-12 sm:px-6 sm:py-16 lg:px-10 xl:px-14">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#a65f2b]">A little reassurance</p>
            <h2 className="mt-2 font-serif text-3xl font-semibold leading-tight text-[#1A3325] sm:text-4xl">Transit can be a journey. We&apos;re here at the other end.</h2>
          </div>
          <div className="flex flex-col gap-4 text-sm leading-7 text-[#68786b] sm:text-base">
            <p>A few leaves may droop or shift after a trip. That kind of transit stress is often temporary: unpack your plant, give it a calm spot with suitable light, and let it settle before watering or repotting.</p>
            <p>If stems are broken, roots are damaged, or your plant arrives in a condition that doesn&apos;t look healthy, contact us within 7 days of delivery. Share your order number and clear photos so our nursery team can help.</p>
          </div>
        </div>
      </section>

      <section id="how-to-claim" className="bg-[#f1f3ed] py-12 scroll-mt-20 sm:py-16" aria-labelledby="claim-heading">
        <div className="mx-auto w-full max-w-[100rem] px-4 sm:px-6 lg:px-10 xl:px-14">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#a65f2b]">A simple, human process</p>
          <h2 id="claim-heading" className="mt-2 font-serif text-3xl font-semibold text-[#1A3325] sm:text-4xl">Three steps to put things right.</h2>
          <ol className="mt-7 grid gap-4 md:grid-cols-3 sm:mt-9">
            {claimSteps.map(({ number, title, detail, icon: Icon }) => (
              <li key={number} className="rounded-2xl border border-[#e0e6dc] bg-white p-5 sm:p-6">
                <div className="flex items-center justify-between"><span className="font-mono text-xs font-semibold tracking-[0.14em] text-[#a65f2b]">{number}</span><span className="inline-flex size-11 items-center justify-center rounded-full bg-[#edf1e9] text-[#527358]"><Icon className="size-5" aria-hidden="true" /></span></div>
                <h3 className="mt-5 font-serif text-xl font-semibold text-[#1A3325]">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#68786b]">{detail}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-[100rem] gap-8 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-2 lg:px-10 xl:px-14">
        <article className="rounded-3xl border border-[#e3e8e4] bg-white p-5 sm:p-7">
          <div className="inline-flex size-11 items-center justify-center rounded-full bg-[#edf1e9] text-[#527358]"><Sprout className="size-5" aria-hidden="true" /></div>
          <h2 className="mt-4 font-serif text-2xl font-semibold text-[#1A3325]">A gentle first week</h2>
          <ul className="mt-4 flex flex-col gap-3 text-sm leading-6 text-[#68786b]">
            <li className="flex gap-2"><Check className="mt-1 size-4 shrink-0 text-[#527358]" aria-hidden="true" /> Unpack promptly and remove any protective wrap around the foliage.</li>
            <li className="flex gap-2"><Check className="mt-1 size-4 shrink-0 text-[#527358]" aria-hidden="true" /> Place it in the light described on its care card, away from harsh midday sun.</li>
            <li className="flex gap-2"><Check className="mt-1 size-4 shrink-0 text-[#527358]" aria-hidden="true" /> Check the soil before watering; avoid overwatering while it settles in.</li>
            <li className="flex gap-2"><Check className="mt-1 size-4 shrink-0 text-[#527358]" aria-hidden="true" /> Wait a few days before repotting, fertilising, or making big changes.</li>
          </ul>
        </article>
        <article className="flex flex-col justify-center rounded-3xl bg-[#0F291E] p-6 text-white sm:p-8">
          <ShieldCheck className="size-8 text-[#E5A849]" aria-hidden="true" />
          <p className="mt-5 text-xs font-semibold uppercase tracking-[0.16em] text-[#f0c780]">Need a plant specialist?</p>
          <h2 className="mt-2 font-serif text-2xl font-semibold sm:text-3xl">We&apos;re one message away.</h2>
          <p className="mt-3 text-sm leading-6 text-white/70">Share your order number and a photo. Our team will guide you through the next step.</p>
          <a href={`https://wa.me/919476433880?text=${whatsappText}`} target="_blank" rel="noreferrer" className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#E5A849] px-5 text-sm font-semibold text-[#1A3325] transition-colors hover:bg-[#efbc69] sm:w-fit"><MessageCircle className="size-4" aria-hidden="true" /> WhatsApp plant support</a>
        </article>
      </section>
    </main>
  )
}
