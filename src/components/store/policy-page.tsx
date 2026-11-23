import Link from 'next/link'
import { ArrowLeft, ArrowRight, Mail, MessageCircle } from 'lucide-react'

type PolicySection = {
  title: string
  paragraphs: string[]
  bullets?: string[]
}

type PolicyPageProps = {
  title: string
  description: string
  notice: string
  sections: PolicySection[]
}

export function PolicyPage({ title, description, notice, sections }: PolicyPageProps) {
  return (
    <main className="min-h-[65vh] bg-[#f7f5ef]">
      <header className="bg-[#0F291E] text-white">
        <div className="mx-auto w-full max-w-[100rem] px-4 py-10 sm:px-6 sm:py-14 lg:px-10 lg:py-16 xl:px-14">
          <Link href="/" className="inline-flex min-h-10 items-center gap-2 text-xs font-semibold text-white/70 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E5A849]">
            <ArrowLeft className="size-4" aria-hidden="true" /> Back to the garden
          </Link>
          <p className="mt-7 text-[11px] font-bold uppercase tracking-[0.18em] text-[#E5A849]">Abhay&apos;s Roof Garden · Store information</p>
          <h1 className="mt-2 max-w-4xl font-serif text-3xl font-semibold leading-tight tracking-tight sm:text-5xl">{title}</h1>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-white/75 sm:text-base">{description}</p>
          <p className="mt-4 text-xs text-white/50">Last updated: November 23, 2026</p>
        </div>
      </header>

      <div className="mx-auto grid w-full max-w-[100rem] gap-7 px-4 py-8 sm:px-6 sm:py-12 lg:grid-cols-[minmax(0,1fr)_18rem] lg:gap-12 lg:px-10 xl:px-14">
        <article className="min-w-0 rounded-2xl border border-[#e4e5dc] bg-white p-5 shadow-sm sm:rounded-3xl sm:p-8 lg:p-10">
          <div className="rounded-xl border border-[#e6d7b9] bg-[#fbf5e9] p-4 text-sm leading-6 text-[#604e31] sm:p-5">
            <p className="font-semibold text-[#1A3325]">Please note</p>
            <p className="mt-1">{notice}</p>
          </div>
          <div className="mt-8 flex flex-col gap-8 sm:mt-10 sm:gap-9">
            {sections.map((section, index) => (
              <section key={section.title} aria-labelledby={`policy-section-${index}`}>
                <h2 id={`policy-section-${index}`} className="font-serif text-xl font-semibold text-[#1A3325] sm:text-2xl">{section.title}</h2>
                <div className="mt-3 flex flex-col gap-3 text-sm leading-7 text-[#59685c] sm:text-[15px]">
                  {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                  {section.bullets && (
                    <ul className="flex list-disc flex-col gap-2 pl-5 marker:text-[#a65f2b]">
                      {section.bullets.map((item) => <li key={item} className="pl-1">{item}</li>)}
                    </ul>
                  )}
                </div>
              </section>
            ))}
          </div>
        </article>

        <aside className="flex flex-col gap-4 lg:sticky lg:top-24 lg:self-start">
          <section className="rounded-2xl bg-[#1A3325] p-5 text-white sm:rounded-3xl sm:p-6" aria-labelledby="policy-contact-title">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#E5A849]">We&apos;re here to help</p>
            <h2 id="policy-contact-title" className="mt-2 font-serif text-xl font-semibold">Questions about this policy?</h2>
            <p className="mt-2 text-sm leading-6 text-white/70">Contact the nursery team and include your order number if your question is about an order.</p>
            <a href="https://wa.me/919476433880" target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-[#E5A849] px-4 text-sm font-semibold text-[#1A3325] transition-colors hover:bg-[#efbc69] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
              <MessageCircle className="size-4" aria-hidden="true" /> WhatsApp the nursery
            </a>
            <a href="mailto:abhaysroofgarden@gmail.com" className="mt-3 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full border border-white/20 px-4 text-sm font-semibold text-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E5A849]">
              <Mail className="size-4" aria-hidden="true" /> Email us
            </a>
          </section>
          <Link href="/shop" className="group flex min-h-14 items-center justify-between gap-3 rounded-2xl border border-[#e4e5dc] bg-white px-5 py-4 text-sm font-semibold text-[#1A3325] transition-colors hover:border-[#aebcae] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1A3325]">
            Explore the plants <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>
        </aside>
      </div>
    </main>
  )
}
