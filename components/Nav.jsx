'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setMenuOpen(false), [pathname])

  const links = [
    { href: '/work', label: 'Work' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ]

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 px-8 md:px-14 transition-all duration-500 ${
          scrolled ? 'py-4 nav-blur bg-[#F7F7F2]/80 border-b border-[#E8F0E9]' : 'py-7'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="group flex items-center gap-3">
            <span
              className="w-8 h-8 rounded-full bg-[#7A9E7E] flex items-center justify-center text-[#F7F7F2] text-xs font-medium tracking-wider transition-transform duration-300 group-hover:scale-110"
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              SZ
            </span>
            <span
              className="text-[#0C0C0A] text-sm tracking-wide opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              Sherina Zheng
            </span>
          </Link>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-10">
            {links.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={`text-sm tracking-wide hover-line transition-colors duration-200 ${
                    pathname === href ? 'text-[#7A9E7E]' : 'text-[#0C0C0A]/70 hover:text-[#0C0C0A]'
                  }`}
                  style={{ fontFamily: 'var(--font-inter)' }}
                >
                  {label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/contact"
                className="px-5 py-2 rounded-full border border-[#0C0C0A]/20 text-sm text-[#0C0C0A]/80 hover:bg-[#0C0C0A] hover:text-[#F7F7F2] hover:border-[#0C0C0A] transition-all duration-300"
                style={{ fontFamily: 'var(--font-inter)' }}
              >
                Say hello →
              </Link>
            </li>
          </ul>

          {/* Mobile menu button */}
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

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-40 bg-[#F7F7F2] flex flex-col justify-center px-10 transition-all duration-500 md:hidden ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <ul className="flex flex-col gap-8">
          {links.map(({ href, label }, i) => (
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
