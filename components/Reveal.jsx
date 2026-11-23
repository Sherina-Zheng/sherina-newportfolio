'use client'
import { useEffect, useRef, useState } from 'react'

// Adds `in` once the block scrolls into view. Children marked `.rv` (with an optional --i index)
// then arrive one after another. Nothing is hidden until JS has armed the block, so content
// stays visible if scripts fail.
export default function Reveal({ as: Tag = 'div', className = '', children, amount = 0.15, ...rest }) {
  const ref = useRef(null)
  const [armed, setArmed] = useState(false)
  const [shown, setShown] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setShown(true); return }
    setArmed(true)
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setShown(true); io.disconnect() } }, { threshold: amount })
    io.observe(el)
    return () => io.disconnect()
  }, [amount])
  return <Tag ref={ref} className={`reveal ${armed ? 'armed' : ''} ${shown ? 'in' : ''} ${className}`} {...rest}>{children}</Tag>
}
