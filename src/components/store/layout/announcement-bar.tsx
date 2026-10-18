import { Truck } from 'lucide-react'

export function AnnouncementBar() {
  return (
    <div className="w-full bg-[#1A3325]">
      <div className="mx-auto max-w-7xl px-4 py-2.5 sm:px-6 lg:px-8">
        <p className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-center text-xs font-medium tracking-wide text-white sm:text-sm">
          <Truck className="size-4 shrink-0 text-[#E5A849]" aria-hidden="true" />
          <span>
            Free delivery on orders above ₹999 <span className="hidden sm:inline">·</span>
          </span>
          <span>
            Use code <strong className="font-bold text-[#E5A849]">GREEN10</strong> for 10% off your first order
          </span>
        </p>
      </div>
    </div>
  )
}