'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [hovered, setHovered] = useState(false)
  const hoveredRef = useRef(false)
  const revealTimer = useRef(null)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Keep ref in sync so event listener always reads latest value
  useEffect(() => { hoveredRef.current = hovered }, [hovered])

  // Listen for section-change events dispatched by the scroll controller
  useEffect(() => {
    function onSectionChange(e) {
      const idx = e.detail?.index ?? 1
      clearTimeout(revealTimer.current)
      if (idx === 0) {
        setHidden(false)
      } else if (!hoveredRef.current) {
        setHidden(true)
        revealTimer.current = setTimeout(() => setHidden(false), 2500)
      }
    }
    window.addEventListener('sectionChange', onSectionChange)
    return () => {
      window.removeEventListener('sectionChange', onSectionChange)
      clearTimeout(revealTimer.current)
    }
  }, [])

  useEffect(() => setMenuOpen(false), [pathname])

  if (pathname === '/') return null // the homepage draws its own station-sign nav

  const navLinks = [
    { href: '/about',   label: 'About' },
    { href: '/work',    label: 'Work' },
    { href: '/contact', label: 'Contact' },
  ]

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          opacity: (hidden && !hovered) ? 0 : 1,
          transform: (hidden && !hovered) ? 'translateY(-100%)' : 'translateY(0)',
          transition: 'opacity 0.4s ease, transform 0.4s ease',
        }}
        onMouseEnter={() => { setHovered(true); setHidden(false) }}
        onMouseLeave={() => setHovered(false)}
      >
        {/* station-sign bar, same as the homepage once its name has docked */}
        <div style={{ background: '#0F0F0F', height: 64, position: 'relative', paddingLeft: 'clamp(20px,3.1vw,44px)', paddingRight: 'clamp(20px,3.1vw,44px)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ position: 'absolute', left: 0, right: 0, top: 10, height: 2, background: '#fff', opacity: 0.9 }} />
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#fff', textDecoration: 'none' }} aria-label="Sherina Zheng, home">
            <span style={{ width: 28, height: 28, borderRadius: '50%', background: '#B933AD', display: 'grid', placeItems: 'center', fontFamily: 'var(--font-inter)', fontWeight: 800, fontSize: 16 }}>S</span>
            <span style={{ fontFamily: 'var(--font-inter)', fontWeight: 900, fontSize: 20, letterSpacing: '-0.03em' }}>Sherina Zheng</span>
          </Link>
          <div className="hidden md:flex" style={{ gap: 26 }}>
            {navLinks.map(({ href, label }) => (
              <Link key={href} href={href}
                style={{ fontFamily: 'var(--font-inter)', fontWeight: 800, fontSize: 15, textDecoration: 'none', color: pathname === href ? '#FCCC0A' : '#fff' }}>
                {label}
              </Link>
            ))}
          </div>
          <button className="md:hidden flex flex-col gap-[5px] p-3" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
            <span className={`block w-6 h-[2px] bg-white transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
            <span className={`block w-6 h-[2px] bg-white transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-[2px] bg-white transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
          </button>
        </div>
      </nav>

      {/* Mobile full-screen menu */}
      <div
        className={`fixed inset-0 z-40 bg-[#F3F1EA] flex flex-col justify-center px-10 transition-all duration-500 md:hidden ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <ul className="flex flex-col gap-8">
          {[{ href: '/', label: 'Home' }, ...navLinks].map(({ href, label }, i) => (
            <li key={href} style={{ transitionDelay: `${i * 60}ms` }}>
              <Link
                href={href}
                className="text-5xl text-[#0C0C0A] hover:text-[#B933AD] transition-colors duration-200"
                style={{ fontFamily: 'var(--font-dm-serif)' }}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-16 flex flex-col gap-2">
          <a href="mailto:zhengsherina@gmail.com" className="text-sm text-[#0C0C0A]/50 hover-line">zhengsherina@gmail.com</a>
          <a href="https://www.linkedin.com/in/sherina-zheng-48b287224/" target="_blank" rel="noreferrer" className="text-sm text-[#0C0C0A]/50 hover-line">LinkedIn ↗</a>
        </div>
      </div>
    </>
  )
}
