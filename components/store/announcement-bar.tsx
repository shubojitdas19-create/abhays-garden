import { Truck } from 'lucide-react'

export function AnnouncementBar() {
  return (
    <div className="bg-primary text-primary-foreground">
      <p className="mx-auto flex max-w-7xl items-center justify-center gap-2 px-4 py-2 text-center text-xs font-medium tracking-wide sm:text-sm">
        <Truck className="size-4 shrink-0" aria-hidden="true" />
        <span>
          Free delivery on orders above ₹999
          <span className="hidden sm:inline"> · Use code <strong className="font-semibold">GROW10</strong> for 10% off your first order</span>
        </span>
      </p>
    </div>
  )
}
