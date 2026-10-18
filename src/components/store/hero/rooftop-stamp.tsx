import { Sprout } from 'lucide-react'

export function RooftopStamp({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center rounded-full bg-sun text-forest-deep ${className}`} aria-hidden="true">
      <svg viewBox="0 0 120 120" className="absolute inset-0 size-full motion-safe:animate-[spin_22s_linear_infinite]">
        <defs>
          <path id="stamp-circle" d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0" />
        </defs>
        <text className="fill-current font-sans text-[10.5px] font-semibold uppercase" letterSpacing="2.6">
          <textPath href="#stamp-circle">Homegrown • Rooftop raised • Hand packed •</textPath>
        </text>
      </svg>
      <Sprout className="size-7" strokeWidth={1.75} />
    </div>
  )
}
