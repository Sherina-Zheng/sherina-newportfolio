'use client'
import { useEffect, useState } from 'react'
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
        /* Match section horizontal padding exactly */
        style={{ paddingLeft: 'clamp(2rem, 5vw, 3.5rem)', paddingRight: 'clamp(2rem, 5vw, 3.5rem)' }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">

          {/* Left: SZ icon | divider | About · Work · Contact */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/" className="group flex-shrink-0">
              <span
                className="w-9 h-9 rounded-full bg-[#7A9E7E] flex items-center justify-center text-[#E8E3D5] text-xs font-medium tracking-wider transition-transform duration-300 group-hover:scale-110"
                style={{ fontFamily: 'var(--font-inter)' }}
              >
                SZ
              </span>
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
