'use client'
import { useEffect, useRef } from 'react'

export function RevealText({ children, delay = 0, className = '' }) {
  const ref = useRef(null)
  const wrapRef = useRef(null)

  // Observe the wrapper: the text itself starts clipped out of view, so watching it never fires.
  useEffect(() => {
    const el = ref.current
    const wrap = wrapRef.current
    if (!el || !wrap) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => el.classList.add('visible'), delay)
          observer.unobserve(wrap)
        }
      },
      { threshold: 0.1 }
    )
    observer.observe(wrap)
    return () => observer.disconnect()
  }, [delay])

  return (
    <span ref={wrapRef} className="reveal-wrap">
      <span ref={ref} className={`reveal-text ${className}`}>
        {children}
      </span>
    </span>
  )
}

export function FadeUp({ children, delay = 0, className = '' }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => el.classList.add('visible'), delay)
          observer.unobserve(el)
        }
      },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [delay])

  return (
    <div ref={ref} className={`fade-up ${className}`}>
      {children}
    </div>
  )
}
