'use client'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FadeUp, RevealText } from '../components/ScrollReveal'

/* ── Parallax name: drifts up as user scrolls ── */
function ParallaxName({ ready }) {
  const ref = useRef(null)
  useEffect(() => {
    const onScroll = () => {
      if (ref.current) {
        ref.current.style.transform = `translateY(${window.scrollY * 0.28}px)`
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <h1
      ref={ref}
      style={{
        fontFamily: 'var(--font-dm-serif)',
        fontSize: 'clamp(3.8rem, 10.5vw, 10.5rem)',
        lineHeight: 1,
        letterSpacing: '-0.01em',
        color: '#0C0C0A',
        willChange: 'transform',
      }}
    >
      {['Sherina', 'Zheng'].map((w, i) => (
        <span key={w} className="block overflow-hidden">
          <span
            className="block"
            style={{
              transform: ready ? 'translateY(0)' : 'translateY(112%)',
              transition: `transform 1s cubic-bezier(0.16,1,0.3,1) ${i * 130 + 100}ms`,
            }}
          >
            {w}
          </span>
        </span>
      ))}
    </h1>
  )
}

const roles = ['Product Designer', 'UI/UX Designer', 'Product Manager']

function RoleRotator() {
  const [idx, setIdx] = useState(0)
  const [fade, setFade] = useState(true)
  useEffect(() => {
    const t = setInterval(() => {
      setFade(false)
      setTimeout(() => { setIdx(i => (i + 1) % roles.length); setFade(true) }, 300)
    }, 2800)
    return () => clearInterval(t)
  }, [])
  return (
    <span style={{ color: '#7A9E7E', transition: 'opacity 0.3s', opacity: fade ? 1 : 0 }}>
      {roles[idx]}
    </span>
  )
}

const projects = [
  { num: '01', title: 'Salon Connect',       tags: ['UX Design', 'FinTech', 'Mobile'] },
  { num: '02', title: 'FinFlow Dashboard',   tags: ['Data Analytics', 'Dashboard', 'B2B'] },
  { num: '03', title: 'Bloom Mobile',        tags: ['Mobile', 'iOS', 'Interaction Design'] },
]

export default function Home() {
  const [ready, setReady] = useState(false)
  useEffect(() => { const t = setTimeout(() => setReady(true), 80); return () => clearTimeout(t) }, [])

  return (
    <>
      {/* ── HERO ── */}
      <section
        className="relative min-h-screen flex flex-col justify-end overflow-hidden"
        style={{ paddingBottom: '6rem', paddingLeft: 'clamp(2rem, 5vw, 3.5rem)', paddingRight: 'clamp(2rem, 5vw, 3.5rem)' }}
      >
        {/* Photo — blended right side */}
        <div
          className="absolute inset-y-0 right-0 w-[55%] md:w-[48%] pointer-events-none select-none"
          style={{ zIndex: 0 }}
        >
          <Image
            src="/sherina.png"
            alt="Sherina Zheng"
            fill
            priority
            className="object-contain object-right-bottom"
            style={{
              mixBlendMode: 'multiply',
              maskImage: 'linear-gradient(to left, rgba(0,0,0,0.85) 30%, rgba(0,0,0,0) 100%), linear-gradient(to top, rgba(0,0,0,0.6) 10%, rgba(0,0,0,0) 55%)',
              WebkitMaskImage: 'linear-gradient(to left, rgba(0,0,0,0.85) 30%, rgba(0,0,0,0) 100%), linear-gradient(to top, rgba(0,0,0,0.6) 10%, rgba(0,0,0,0) 55%)',
              maskComposite: 'intersect',
              WebkitMaskComposite: 'source-in',
            }}
          />
        </div>

        {/* Content sits above photo */}
        <div className="relative z-10 max-w-7xl w-full mx-auto">

          {/* Credential badge — top left */}
          <div
            className="absolute"
            style={{
              top: 'calc(-100vh + 7rem)',
              left: 0,
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem',
              opacity: ready ? 1 : 0,
              transform: ready ? 'none' : 'translateY(-8px)',
              transition: 'all 0.7s ease 0.5s',
            }}
          >
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#7A9E7E', display: 'inline-block' }} />
            <span style={{ fontFamily: 'var(--font-inter)', fontSize: 11, letterSpacing: '0.22em', color: 'rgba(12,12,10,0.4)', textTransform: 'uppercase' }}>
              OnenOnlyShereena 2026
            </span>
          </div>

          {/* Available badge — top right */}
          <div
            className="absolute"
            style={{
              top: 'calc(-100vh + 7rem)',
              right: 0,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '8px 16px',
              borderRadius: 9999,
              border: '1px solid #D5CFC0',
              background: 'rgba(213,207,192,0.35)',
              opacity: ready ? 1 : 0,
              transition: 'opacity 0.7s ease 0.6s',
            }}
          >
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#7A9E7E', animation: 'pulse 2s infinite' }} />
            <span style={{ fontFamily: 'var(--font-inter)', fontSize: 11, color: '#6B7B6C', letterSpacing: '0.05em' }}>Available for work</span>
          </div>

          {/* Parallax name */}
          <ParallaxName ready={ready} />

          {/* Role + tagline + CTA */}
          <div
            style={{
              marginTop: '1.75rem',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              gap: '1.5rem',
              opacity: ready ? 1 : 0,
              transform: ready ? 'none' : 'translateY(18px)',
              transition: 'all 0.8s ease 0.55s',
            }}
          >
            <div>
              <p style={{ fontFamily: 'var(--font-inter)', fontWeight: 300, fontSize: '1.1rem', color: 'rgba(12,12,10,0.55)', marginBottom: 6 }}>
                <RoleRotator /> — Based in NYC
              </p>
              <p style={{ fontFamily: 'var(--font-dm-serif)', fontSize: '1rem', color: 'rgba(12,12,10,0.35)', fontStyle: 'italic', maxWidth: 340 }}>
                "I design user experiences that feel inevitable."
              </p>
            </div>
            <Link
              href="/work"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 12,
                padding: '14px 28px',
                background: '#0C0C0A',
                color: '#E8E3D5',
                borderRadius: 9999,
                fontSize: 14,
                letterSpacing: '0.04em',
                fontFamily: 'var(--font-inter)',
                textDecoration: 'none',
                transition: 'background 0.3s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = '#7A9E7E'}
              onMouseLeave={e => e.currentTarget.style.background = '#0C0C0A'}
            >
              View my work →
            </Link>
          </div>
        </div>

        {/* Scroll cue */}
        <div
          className="absolute left-1/2 -translate-x-1/2"
          style={{ bottom: 32, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, opacity: ready ? 0.35 : 0, transition: 'opacity 0.8s ease 1s' }}
        >
          <span style={{ fontFamily: 'var(--font-inter)', fontSize: 10, letterSpacing: '0.3em', color: '#0C0C0A', textTransform: 'uppercase' }}>Scroll</span>
          <div style={{ width: 1, height: 40, background: 'rgba(12,12,10,0.2)', overflow: 'hidden' }}>
            <div style={{ width: '100%', height: '100%', background: '#7A9E7E', animation: 'scrollLine 2s ease-in-out infinite' }} />
          </div>
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <div style={{ padding: '18px 0', borderTop: '1px solid #D5CFC0', borderBottom: '1px solid #D5CFC0', overflow: 'hidden' }}>
        <div style={{ display: 'flex', whiteSpace: 'nowrap', animation: 'marquee 22s linear infinite' }}>
          {Array(8).fill(['UX Research', 'Product Strategy', 'UI Design', 'Prototyping', 'Data Analytics', 'Systems Thinking']).flat().map((item, i) => (
            <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 24, padding: '0 32px' }}>
              <span style={{ fontFamily: 'var(--font-inter)', fontSize: 11, letterSpacing: '0.25em', color: 'rgba(12,12,10,0.35)', textTransform: 'uppercase' }}>{item}</span>
              <span style={{ width: 4, height: 4, borderRadius: '50%', background: '#7A9E7E', flexShrink: 0 }} />
            </span>
          ))}
        </div>
      </div>

      {/* ── SELECTED WORK ── */}
      <section style={{ padding: 'clamp(5rem,8vw,7rem) clamp(2rem,5vw,3.5rem)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '4rem' }}>
            <div>
              <FadeUp>
                <span style={{ fontFamily: 'var(--font-inter)', fontSize: 11, letterSpacing: '0.22em', color: '#7A9E7E', textTransform: 'uppercase', display: 'block', marginBottom: 12 }}>
                  Selected Work
                </span>
              </FadeUp>
              <h2 style={{ fontFamily: 'var(--font-dm-serif)', fontSize: 'clamp(2.2rem,5vw,4rem)', color: '#0C0C0A', lineHeight: 1.1 }}>
                <RevealText>Case Studies</RevealText>
              </h2>
            </div>
            <FadeUp delay={200}>
              <Link href="/work" className="hover-line" style={{ fontFamily: 'var(--font-inter)', fontSize: 13, color: 'rgba(12,12,10,0.4)', textDecoration: 'none' }}>
                All projects ↗
              </Link>
            </FadeUp>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', borderTop: '1px solid #D5CFC0' }}>
            {projects.map(({ num, title, tags }, i) => (
              <FadeUp key={num} delay={i * 90}>
                <Link
                  href="/work"
                  style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '2.5rem 0', borderBottom: '1px solid #D5CFC0', transition: 'padding-left 0.4s ease' }}
                  onMouseEnter={e => e.currentTarget.style.paddingLeft = '20px'}
                  onMouseLeave={e => e.currentTarget.style.paddingLeft = '0'}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(2rem,5vw,3.5rem)' }}>
                    <span style={{ fontFamily: 'var(--font-inter)', fontSize: 11, color: 'rgba(12,12,10,0.25)', letterSpacing: '0.2em' }}>{num}</span>
                    <span style={{ fontFamily: 'var(--font-dm-serif)', fontSize: 'clamp(1.5rem,3vw,2.5rem)', color: '#0C0C0A', transition: 'color 0.3s' }}
                      onMouseEnter={e => e.currentTarget.style.color = '#7A9E7E'}
                      onMouseLeave={e => e.currentTarget.style.color = '#0C0C0A'}
                    >{title}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                      {tags.map(tag => (
                        <span key={tag} style={{ padding: '4px 12px', borderRadius: 9999, border: '1px solid #D5CFC0', fontSize: 11, color: '#6B7B6C', fontFamily: 'var(--font-inter)' }}>{tag}</span>
                      ))}
                    </div>
                    <span style={{ color: 'rgba(12,12,10,0.25)', fontSize: 18 }}>→</span>
                  </div>
                </Link>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT DARK SECTION ── */}
      <section style={{ background: '#0C0C0A', padding: 'clamp(5rem,8vw,7rem) clamp(2rem,5vw,3.5rem)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: '5rem', alignItems: 'center' }}>
          <div style={{ flex: 1, minWidth: 280 }}>
            <FadeUp>
              <span style={{ fontFamily: 'var(--font-inter)', fontSize: 11, letterSpacing: '0.22em', color: '#7A9E7E', textTransform: 'uppercase', display: 'block', marginBottom: 24 }}>About</span>
            </FadeUp>
            <h2 style={{ fontFamily: 'var(--font-dm-serif)', fontSize: 'clamp(2rem,4vw,3.2rem)', color: '#E8E3D5', lineHeight: 1.2, marginBottom: 28 }}>
              <RevealText>Progress begins</RevealText>
              <br /><RevealText delay={100}>with bare bones.</RevealText>
            </h2>
            <FadeUp delay={200}>
              <p style={{ fontFamily: 'var(--font-inter)', fontWeight: 300, fontSize: 15, color: 'rgba(232,227,213,0.45)', lineHeight: 1.8, maxWidth: 400, marginBottom: 36 }}>
                A designer who moves between data and design — building systems that are both rigorous and deeply human.
              </p>
            </FadeUp>
            <FadeUp delay={300}>
              <Link
                href="/about"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 12, padding: '14px 28px', border: '1px solid rgba(232,227,213,0.2)', color: 'rgba(232,227,213,0.65)', borderRadius: 9999, fontSize: 14, fontFamily: 'var(--font-inter)', textDecoration: 'none', transition: 'all 0.3s' }}
                onMouseEnter={e => { e.currentTarget.style.background = '#E8E3D5'; e.currentTarget.style.color = '#0C0C0A' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(232,227,213,0.65)' }}
              >
                My story →
              </Link>
            </FadeUp>
          </div>

          {/* Decorative card */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ width: 260, height: 340, borderRadius: 24, background: 'linear-gradient(135deg, #1E2D20 0%, #141F15 100%)', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 60% 30%, rgba(122,158,126,0.12) 0%, transparent 65%)' }} />
              <div style={{ position: 'absolute', top: 28, right: 28, width: 72, height: 72, borderRadius: '50%', border: '1px solid rgba(122,158,126,0.15)' }} />
              <div style={{ position: 'absolute', top: 42, right: 42, width: 36, height: 36, borderRadius: '50%', border: '1px solid rgba(122,158,126,0.25)' }} />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: 24, borderTop: '1px solid rgba(122,158,126,0.1)' }}>
                <p style={{ fontFamily: 'var(--font-inter)', fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#B8D4BC', marginBottom: 4 }}>Sherina Zheng</p>
                <p style={{ fontFamily: 'var(--font-inter)', fontSize: 11, color: 'rgba(232,227,213,0.3)' }}>Designer & PM</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: 'clamp(5rem,10vw,9rem) clamp(2rem,5vw,3.5rem)', textAlign: 'center' }}>
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          <FadeUp>
            <span style={{ fontFamily: 'var(--font-inter)', fontSize: 11, letterSpacing: '0.22em', color: '#7A9E7E', textTransform: 'uppercase', display: 'block', marginBottom: 24 }}>
              Let's Connect
            </span>
          </FadeUp>
          <h2 style={{ fontFamily: 'var(--font-dm-serif)', fontSize: 'clamp(2.8rem,6vw,5.5rem)', color: '#0C0C0A', lineHeight: 1.1, marginBottom: 48 }}>
            <RevealText>Have a project</RevealText>
            <br /><RevealText delay={110}>in mind?</RevealText>
          </h2>
          <FadeUp delay={250}>
            <a
              href="mailto:zhengsherina@gmail.com"
              className="hover-line"
              style={{ fontFamily: 'var(--font-dm-serif)', fontSize: 'clamp(1.3rem,2.5vw,2rem)', color: 'rgba(12,12,10,0.35)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 12, transition: 'color 0.3s' }}
              onMouseEnter={e => e.currentTarget.style.color = '#7A9E7E'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(12,12,10,0.35)'}
            >
              zhengsherina@gmail.com ↗
            </a>
          </FadeUp>
        </div>
      </section>

      <style>{`
        @keyframes scrollLine { 0%{transform:translateY(-100%)} 100%{transform:translateY(200%)} }
        @keyframes marquee   { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
        @keyframes pulse     { 0%,100%{opacity:1} 50%{opacity:0.35} }
      `}</style>
    </>
  )
}
