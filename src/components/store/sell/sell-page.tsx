import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowDown,
  ArrowRight,
  BadgeCheck,
  HandCoins,
  MapPin,
  MessageCircle,
  PackageCheck,
  Sprout,
  Truck,
} from 'lucide-react'
import { GrowerApplicationForm } from './grower-application-form'

const benefits = [
  {
    title: 'Meet nearby plant people',
    description: 'Reach customers in your city who are looking for plants grown close to home.',
    icon: MapPin,
  },
  {
    title: 'Packaging, thoughtfully handled',
    description: 'Get breathable, plant-safe packaging guidance for every order.',
    icon: PackageCheck,
  },
  {
    title: 'No upfront listing fee',
    description: 'Join without a setup charge. A modest commission applies only when you sell.',
    icon: HandCoins,
  },
  {
    title: 'Local pickup support',
    description: 'Coordinate hyperlocal courier pickups directly from your nursery gate.',
    icon: Truck,
  },
]

const onboardingSteps = [
  { number: '01', title: 'Apply online', description: 'Tell us about your garden and what you grow.' },
  { number: '02', title: 'Nursery quality check', description: 'Our curator learns about your growing practices.' },
  { number: '03', title: 'List your plants', description: 'We help shape your nursery profile and catalog.' },
  { number: '04', title: 'Receive local orders', description: 'Connect with plant lovers in your neighbourhood.' },
]

export function SellPage() {
  return (
    <main className="overflow-hidden">
      <section className="mx-auto grid w-full max-w-[100rem] items-center gap-8 px-4 pb-12 pt-7 sm:px-6 sm:pb-16 sm:pt-10 lg:grid-cols-[1.02fr_0.98fr] lg:gap-14 lg:px-10 lg:pb-20 lg:pt-14 xl:px-14">
        <div className="max-w-2xl">
          <p className="inline-flex items-center gap-2 rounded-full border border-[#dfe6dc] bg-white/80 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#527358]">
            <Sprout className="size-3.5" aria-hidden="true" /> For independent growers
          </p>
          <h1 className="mt-5 font-serif text-[2.65rem] font-semibold leading-[1.04] tracking-tight text-[#1A3325] sm:text-5xl lg:text-6xl">
            Grow your nursery business with us.
          </h1>
          <p className="mt-5 max-w-xl text-sm leading-7 text-[#5c6a5f] sm:text-base sm:leading-8">
            List your plants on Bengal&apos;s homegrown botanical marketplace. Meet nearby plant lovers, keep growing your way, and let us help with the details between nursery and doorstep.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link href="#application-form" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#1A3325] px-6 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#294735] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1A3325]">
              Apply to join <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
            <Link href="#how-it-works" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold text-[#365440] transition-colors hover:bg-[#e8ede5] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1A3325]">
              See how it works <ArrowDown className="size-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="mt-7 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-medium text-[#68786b]">
            <span className="inline-flex items-center gap-1.5"><BadgeCheck className="size-4 text-[#527358]" aria-hidden="true" /> Curated local growers</span>
            <span className="hidden size-1 rounded-full bg-[#b9c1b8] sm:block" aria-hidden="true" />
            <span>No upfront listing fee</span>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
          <div className="relative aspect-[1.08/1] overflow-hidden rounded-[1.75rem] bg-[#dfe6dc] shadow-[0_24px_60px_rgba(26,51,37,0.14)] sm:aspect-[1.2/1] sm:rounded-[2rem]">
            <Image src="/images/rooftop.png" alt="A local grower tending a thriving rooftop nursery" fill priority sizes="(min-width: 1024px) 48vw, 100vw" className="object-cover object-[center_60%]" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#10271d]/65 via-transparent to-transparent" aria-hidden="true" />
            <div className="absolute inset-x-0 bottom-0 p-5 text-white sm:p-7">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#f0c780]">A little more room to grow</p>
              <p className="mt-1.5 max-w-sm font-serif text-xl font-semibold leading-snug sm:text-2xl">Good plants deserve to find good homes.</p>
            </div>
          </div>
          <div className="absolute -left-1 top-5 flex items-center gap-3 rounded-2xl border border-white/80 bg-[#fbfaf6] p-3 shadow-lg sm:-left-5 sm:top-8 sm:p-4">
            <span className="flex size-10 items-center justify-center rounded-full bg-[#e8ede5] text-[#365440]"><Sprout className="size-5" aria-hidden="true" /></span>
            <span className="pr-1"><span className="block text-xs font-semibold text-[#1A3325]">Rooted in Bengal</span><span className="mt-0.5 block text-[10px] text-[#68786b]">Grown by local hands</span></span>
          </div>
        </div>
      </section>

      <section aria-labelledby="benefits-heading" className="bg-[#f1f3ed] py-12 sm:py-16 lg:py-20">
        <div className="mx-auto w-full max-w-[100rem] px-4 sm:px-6 lg:px-10 xl:px-14">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#a65f2b]">Better together</p>
            <h2 id="benefits-heading" className="mt-2 font-serif text-3xl font-semibold leading-tight text-[#1A3325] sm:text-4xl">A marketplace that grows with you.</h2>
            <p className="mt-3 text-sm leading-6 text-[#68786b]">You bring the care and the plants. We help make it easier for local customers to discover them.</p>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:mt-10 lg:grid-cols-4">
            {benefits.map(({ title, description, icon: Icon }, index) => (
              <article key={title} className="flex gap-4 rounded-2xl border border-[#e0e6dc] bg-white/80 p-4 sm:flex-col sm:p-5">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#e9efe6] text-[#365440]"><Icon className="size-5" aria-hidden="true" /></span>
                <div>
                  <p className="font-serif text-lg font-semibold text-[#1A3325]">{title}</p>
                  <p className="mt-1.5 text-xs leading-5 text-[#68786b] sm:text-sm sm:leading-6">{description}</p>
                </div>
                <span className="sr-only">Benefit {index + 1} of {benefits.length}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="how-it-works" aria-labelledby="steps-heading" className="mx-auto w-full max-w-[100rem] px-4 py-12 sm:px-6 sm:py-16 lg:px-10 lg:py-20 xl:px-14">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#a65f2b]">From your garden to their home</p>
            <h2 id="steps-heading" className="mt-2 font-serif text-3xl font-semibold leading-tight text-[#1A3325] sm:text-4xl">Four steps to grow together.</h2>
          </div>
          <p className="max-w-sm text-sm leading-6 text-[#68786b]">A thoughtful, people-first onboarding process—so you know what to expect at every step.</p>
        </div>
        <ol className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:mt-10 lg:grid-cols-4 lg:gap-4">
          {onboardingSteps.map((step, index) => (
            <li key={step.number} className="relative flex gap-4 rounded-2xl border border-[#e7e5dc] bg-white p-4 sm:flex-col sm:p-5">
              <span className="font-mono text-xs font-semibold tracking-[0.12em] text-[#a65f2b]">{step.number}</span>
              <div>
                <h3 className="font-serif text-lg font-semibold text-[#1A3325]">{step.title}</h3>
                <p className="mt-1.5 text-xs leading-5 text-[#68786b] sm:text-sm sm:leading-6">{step.description}</p>
              </div>
              {index < onboardingSteps.length - 1 && <ArrowRight className="absolute -right-3 top-1/2 z-10 hidden size-5 -translate-y-1/2 rounded-full bg-[#f7f3ea] p-0.5 text-[#a65f2b] lg:block" aria-hidden="true" />}
            </li>
          ))}
        </ol>
      </section>

      <section id="application-form" aria-labelledby="application-heading" className="bg-[#f1f3ed] py-12 sm:py-16 lg:py-20">
        <div className="mx-auto grid w-full max-w-[100rem] gap-8 px-4 sm:px-6 lg:grid-cols-[0.72fr_1.28fr] lg:gap-14 lg:px-10 xl:px-14">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#a65f2b]">Your next growing season</p>
            <h2 id="application-heading" className="mt-2 font-serif text-3xl font-semibold leading-tight text-[#1A3325] sm:text-4xl">Let&apos;s get to know your nursery.</h2>
            <p className="mt-4 text-sm leading-7 text-[#68786b]">Tell us about your nursery and the plants you grow. A few details help our team understand whether the collective is a good fit.</p>
            <div className="mt-6 rounded-2xl bg-[#1A3325] p-5 text-white shadow-[0_18px_40px_-28px_rgba(26,51,37,0.7)]">
              <span className="flex size-10 items-center justify-center rounded-xl bg-white/10 text-[#e5a849]"><MessageCircle className="size-5" aria-hidden="true" /></span>
              <p className="mt-4 font-serif text-xl font-semibold">Prefer to talk first?</p>
              <p className="mt-2 text-sm leading-6 text-white/75">Chat with our nursery team about the grower collective, fees, and onboarding before you apply.</p>
              <a href="https://wa.me/919476433880?text=Hello%2C%20I%27d%20like%20to%20learn%20about%20joining%20as%20a%20grower." target="_blank" rel="noreferrer" className="mt-4 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-[#e5a849] px-4 text-sm font-semibold text-[#1A3325] transition-colors hover:bg-[#f0bd69] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:w-fit">Chat with our team <ArrowRight className="size-4" aria-hidden="true" /></a>
              <p className="mt-3 border-t border-white/15 pt-3 text-[11px] leading-5 text-white/60">The online application is a preview and does not send or save your details yet.</p>
            </div>
          </div>
          <GrowerApplicationForm />
        </div>
      </section>
    </main>
  )
}
