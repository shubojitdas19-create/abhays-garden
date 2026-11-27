'use client'

import { useEffect, useState } from 'react'
import { Leaf, Truck } from 'lucide-react'

const messages = [
  { icon: Truck, content: <>Thoughtful doorstep delivery <span className="hidden sm:inline">·</span> Estimated delivery fee ₹99</> },
  { icon: Leaf, content: <>Wrong or damaged plant? Claim within 7 days with a complete 360° unboxing video</> },
]

export function AnnouncementBar() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const interval = window.setInterval(() => setActive((current) => (current + 1) % messages.length), 4000)
    return () => window.clearInterval(interval)
  }, [])

  const MessageIcon = messages[active].icon

  return (
    <div className="w-full bg-[#1A3325]">
      <div className="mx-auto max-w-7xl px-4 py-2.5 sm:px-6 lg:px-8">
        <p key={active} className="flex min-h-5 flex-wrap items-center justify-center gap-x-2 gap-y-1 text-center text-xs font-medium tracking-wide text-white animate-announcement-in sm:text-sm" aria-live="polite">
          <MessageIcon className="size-4 shrink-0 text-[#E5A849]" aria-hidden="true" />
          <span>{messages[active].content}</span>
        </p>
      </div>
    </div>
  )
}
