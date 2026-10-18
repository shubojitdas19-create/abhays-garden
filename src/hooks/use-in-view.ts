'use client'

import { useEffect, useState, useRef } from 'react'

// Changed default triggerOnce to false so it repeats
export function useInView(options = { threshold: 0.1, triggerOnce: false }) {
  const ref = useRef<any>(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const currentRef = ref.current
    if (!currentRef) return

    const observer = new IntersectionObserver(([entry]) => {
      // This line now constantly updates the state to true or false depending on if it's on screen
      setIsInView(entry.isIntersecting)
      
      // Only stop observing if triggerOnce is explicitly set to true
      if (entry.isIntersecting && options.triggerOnce) {
        observer.unobserve(currentRef)
      }
    }, { threshold: options.threshold })

    observer.observe(currentRef)
    return () => observer.disconnect()
  }, [options.threshold, options.triggerOnce])

  return { ref, isInView }
}