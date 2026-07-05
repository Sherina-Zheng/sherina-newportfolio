'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [hovered, setHovered] = useState(false)
  const hideTimer = useRef(null)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Hide nav after scroll settles, show on hover
  useEffect(() => {
    function onWheel() {
      if (hovered) return
      setHidden(true)
      clearTimeout(hideTimer.current)
    }
    window.addEventListener('wheel', onWheel, { passive: true })
    return () => window.removeEventListener('wheel', onWheel)
  }, [hovered])

  useEffect(() => setMenuOpen(false), [pathname])

  const navLinks = [
    { href: '/about',   label: 'About' },
    { href: '/work',    label: 'Work' },
    { href: '/contact', label: 'Contact' },
  ]

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'py-4 nav-blur bg-[#E8E3D5]/80 border-b border-[#D5CFC0]' : 'py-7'
        }`}
        style={{
          paddingLeft: 'clamp(2rem, 5vw, 3.5rem)',
          paddingRight: 'clamp(2rem, 5vw, 3.5rem)',
          opacity: (hidden && !hovered) ? 0 : 1,
          transform: (hidden && !hovered) ? 'translateY(-100%)' : 'translateY(0)',
          transition: 'opacity 0.4s ease, transform 0.4s ease, padding 0.5s, background 0.5s, border-color 0.5s',
        }}
        onMouseEnter={() => { setHovered(true); setHidden(false) }}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">

          {/* Left: SZ icon | divider | About · Work · Contact */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/" className="group flex-shrink-0 block" style={{ transition: 'transform 0.3s ease', display: 'inline-block' }}
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            >
              <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Dark forest bg */}
                <rect width="36" height="36" rx="9" fill="#0C1F18"/>
                {/* Outer glow ring */}
                <rect x="1" y="1" width="34" height="34" rx="8" stroke="#7A9E7E" strokeWidth="0.8" strokeOpacity="0.45"/>
                {/* Subtle scan line */}
                <rect x="0" y="17" width="36" height="0.6" fill="#7A9E7E" fillOpacity="0.07" rx="1"/>
                {/* Square-bracket left */}
                <path d="M 10 9 L 7 9 L 7 27 L 10 27" stroke="#7A9E7E" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.75"/>
                {/* Square-bracket right */}
                <path d="M 26 9 L 29 9 L 29 27 L 26 27" stroke="#7A9E7E" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.75"/>
                {/* SZ monogram in mint — italic serif for creative flair */}
                {/* S — drawn as a stroke path */}
                <path d="M 15 11 C 10 11, 8.5 13, 8.5 15 C 8.5 17, 10.5 17.5, 13 18 C 15.5 18.5, 17.5 19, 17.5 21 C 17.5 23.5, 15 25, 11 25" fill="none" stroke="#A8E6CF" strokeWidth="1.7" strokeLinecap="round"/>
                {/* Z — drawn as a stroke path */}
                <path d="M 20 11 L 27 11 L 20 25 L 27 25" fill="none" stroke="#A8E6CF" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
            {/* thin separator */}
            <span className="w-px h-4 bg-[#0C0C0A]/15 flex-shrink-0" />
            <div className="flex items-center gap-8">
              {navLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className={`text-sm tracking-wide hover-line transition-colors duration-200 ${
                    pathname === href ? 'text-[#7A9E7E]' : 'text-[#0C0C0A]/65 hover:text-[#0C0C0A]'
                  }`}
                  style={{ fontFamily: 'var(--font-inter)' }}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>


          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-[5px] p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <span className={`block w-6 h-[1.5px] bg-[#0C0C0A] transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-[6.5px]' : ''}`} />
            <span className={`block w-6 h-[1.5px] bg-[#0C0C0A] transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-[1.5px] bg-[#0C0C0A] transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-[6.5px]' : ''}`} />
          </button>
        </div>
      </nav>

      {/* Mobile full-screen menu */}
      <div
        className={`fixed inset-0 z-40 bg-[#E8E3D5] flex flex-col justify-center px-10 transition-all duration-500 md:hidden ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <ul className="flex flex-col gap-8">
          {[{ href: '/', label: 'Home' }, ...navLinks].map(({ href, label }, i) => (
            <li key={href} style={{ transitionDelay: `${i * 60}ms` }}>
              <Link
                href={href}
                className="text-5xl font-light text-[#0C0C0A] hover:text-[#7A9E7E] transition-colors duration-200"
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
