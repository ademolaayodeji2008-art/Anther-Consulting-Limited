import { useEffect, useRef, useState } from 'react'

/**
 * useInView — triggers once when the element enters the viewport.
 * Returns [ref, hasEntered].
 *
 * @param {object} options
 * @param {string} options.threshold  — 0–1, how much of the element must be visible (default 0.15)
 * @param {string} options.rootMargin — CSS margin string (default '0px')
 */
export default function useInView({ threshold = 0.15, rootMargin = '0px' } = {}) {
  const ref = useRef(null)
  const [hasEntered, setHasEntered] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // If IntersectionObserver isn't available (very old browsers), just show
    if (!('IntersectionObserver' in window)) {
      setHasEntered(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasEntered(true)
          observer.unobserve(el) // fire once only
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold, rootMargin])

  return [ref, hasEntered]
}
