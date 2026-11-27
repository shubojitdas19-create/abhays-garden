'use client'

import { useEffect, useState, useRef } from 'react'

type UseInViewOptions = {
  threshold?: number
  triggerOnce?: boolean
}

export function useInView(options: UseInViewOptions = {}) {
  const ref = useRef<any>(null)
  const [isInView, setIsInView] = useState(false)
  const threshold = options.threshold ?? 0.1
  const triggerOnce = options.triggerOnce ?? false

  useEffect(() => {
    const currentRef = ref.current
    if (!currentRef) return

    const observer = new IntersectionObserver(([entry]) => {
      setIsInView(entry.isIntersecting)

      if (entry.isIntersecting && triggerOnce) {
        observer.unobserve(currentRef)
      }
    }, { threshold })

    observer.observe(currentRef)
    return () => observer.disconnect()
  }, [threshold, triggerOnce])

  return { ref, isInView }
}
