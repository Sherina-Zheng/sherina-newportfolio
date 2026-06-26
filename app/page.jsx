'use client'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FadeUp, RevealText } from '../components/ScrollReveal'

/* ── Scroll-driven portrait: starts small + faint, expands on scroll — full colour always ── */
function ScrollPortrait() {
  const ref = useRef(null)
  useEffect(() => {
    const onScroll = () => {
      if (!ref.current) return
      // Progress 0→1 over the first 600px of scroll
      const p = Math.min(window.scrollY / 600, 1)
      const ease = p < 0.5 ? 2 * p * p : -1 + (4 - 2 * p) * p
      const scale   = 0.84 + ease * 0.16   // 0.84 → 1.0
      const opacity = 0.55 + ease * 0.45   // 0.55 → 1.0
      ref.current.style.transform = `scale(${scale})`
      ref.current.style.opacity   = opacity
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      className="absolute inset-y-0 right-0 w-[52%] md:w-[46%] pointer-events-none select-none"
      style={{ zIndex: 1, transformOrigin: 'right center' }}
    >
      <div
        ref={ref}
        className="absolute inset-0"
        style={{
          transformOrigin: 'right center',
          willChange: 'transform, opacity',
          transition: 'transform 0.05s linear, opacity 0.05s linear',
        }}
      >
        <Image
          src="/sherina.png"
          alt="Sherina Zheng"
          fill
          priority
          className="object-contain object-right-top"
          style={{
            mixBlendMode: 'multiply',
            maskImage: 'linear-gradient(to left, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 100%)',
            WebkitMaskImage: 'linear-gradient(to left, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 100%)',
          }}
        />
      </div>
    </div>
  )
}

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

const bentoRoles = ['Product Designer', 'UI/UX Designer', 'Product Manager']

function RoleBentoCard() {
  const [active, setActive] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setActive(i => (i + 1) % bentoRoles.length), 1800)
    return () => clearInterval(t)
  }, [])
  return (
    <div style={{ gridColumn: 'span 5', background: '#0C0C0A', borderRadius: 28, padding: 'clamp(2rem,3vw,2.8rem)', minHeight: 320, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <span style={{ fontFamily: 'var(--font-inter)', fontSize: 11, letterSpacing: '0.2em', color: 'rgba(184,212,188,0.5)', textTransform: 'uppercase' }}>I am a</span>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {bentoRoles.map((role, i) => (
          <div
            key={role}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              padding: '10px 16px',
              borderRadius: 14,
              background: active === i ? 'rgba(122,158,126,0.2)' : 'transparent',
              border: active === i ? '1px solid rgba(122,158,126,0.35)' : '1px solid transparent',
              transition: 'all 0.5s cubic-bezier(0.16,1,0.3,1)',
            }}
          >
            <span style={{
              width: 7, height: 7, borderRadius: '50%', flexShrink: 0,
              background: active === i ? '#7A9E7E' : 'rgba(122,158,126,0.2)',
              boxShadow: active === i ? '0 0 8px #7A9E7E' : 'none',
              transition: 'all 0.5s ease',
            }} />
            <span style={{
              fontFamily: 'var(--font-dm-serif)',
              fontSize: 'clamp(1.3rem,2.2vw,1.8rem)',
              color: active === i ? '#E8E3D5' : 'rgba(232,227,213,0.25)',
              transition: 'color 0.5s ease',
            }}>
              {role}
            </span>
          </div>
        ))}
      </div>
      <p style={{ fontFamily: 'var(--font-inter)', fontSize: 12, color: 'rgba(232,227,213,0.25)', lineHeight: 1.6 }}>NYC-based · FinTech · Data → Design</p>
    </div>
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

  const [hoveredBento, setHoveredBento] = useState(null)
  const bentoRow1 = [0, 1]
  const bentoRow2 = [2, 3, 4]
  function getBentoScale(i) {
    if (hoveredBento === null) return 'scale(1)'
    if (hoveredBento === i) return 'scale(1.03)'
    const row = bentoRow1.includes(i) ? bentoRow1 : bentoRow2
    if (row.includes(hoveredBento)) return 'scale(0.975)'
    return 'scale(1)'
  }
  const bentoTransition = 'transform 0.4s cubic-bezier(0.16,1,0.3,1), box-shadow 0.4s ease'

  return (
    <>
      {/* ── HERO ── */}
      <section
        className="relative min-h-screen flex flex-col justify-end overflow-hidden"
        style={{ paddingBottom: '6rem', paddingLeft: 'clamp(2rem, 5vw, 3.5rem)', paddingRight: 'clamp(2rem, 5vw, 3.5rem)' }}
      >
        {/* ── Cartoon rainbow arc — z-index -1 so it's always behind portrait ── */}
        <div className="absolute pointer-events-none select-none" style={{ inset: 0, zIndex: -1 }}>
          <svg
            viewBox="0 0 900 600"
            preserveAspectRatio="xMidYMid meet"
            style={{ position: 'absolute', right: 0, bottom: 0, width: '75%', height: '90%', opacity: 0.72 }}
          >
            {[
              { r: 420, color: '#FF6B6B', w: 18 },
              { r: 396, color: '#FF9F43', w: 18 },
              { r: 372, color: '#FFEAA7', w: 18 },
              { r: 348, color: '#A8E6CF', w: 18 },
              { r: 324, color: '#74B9FF', w: 18 },
              { r: 300, color: '#A29BFE', w: 18 },
            ].map(({ r, color, w }) => (
              <path
                key={r}
                d={`M ${450 - r} 580 A ${r} ${r} 0 0 1 ${450 + r} 580`}
                fill="none"
                stroke={color}
                strokeWidth={w}
                strokeLinecap="round"
                opacity="0.75"
              />
            ))}
          </svg>
        </div>

        {/* Portrait — rendered after rainbow so it's always in front */}
        <ScrollPortrait />

        {/* Content sits above photo */}
        <div className="relative z-10 max-w-7xl w-full mx-auto">

          {/* Available badge — top left, below nav */}
          <div
            className="absolute"
            style={{
              top: 'calc(-100vh + 7rem)',
              left: 0,
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

      {/* ── ABOUT — vibrant bento grid ── */}
      <section style={{ padding: 'clamp(5rem,8vw,7rem) clamp(2rem,5vw,3.5rem)', background: '#E0DDD0' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <FadeUp>
            <span style={{ fontFamily: 'var(--font-inter)', fontSize: 11, letterSpacing: '0.22em', color: '#7A9E7E', textTransform: 'uppercase', display: 'block', marginBottom: 40 }}>About</span>
          </FadeUp>

          {/* Bento grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gridTemplateRows: 'auto', gap: 16 }}>

            {/* Big quote card */}
            <FadeUp delay={0} className="col-span-12 md:col-span-7">
              <div
                onMouseEnter={() => setHoveredBento(0)}
                onMouseLeave={() => setHoveredBento(null)}
                style={{ gridColumn: 'span 7', background: '#7A9E7E', borderRadius: 28, padding: 'clamp(2rem,4vw,3.5rem)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: 320, transform: getBentoScale(0), transition: bentoTransition, boxShadow: hoveredBento === 0 ? '0 20px 60px rgba(122,158,126,0.35)' : 'none' }}>
                <span style={{ fontFamily: 'var(--font-inter)', fontSize: 11, letterSpacing: '0.2em', color: 'rgba(232,227,213,0.6)', textTransform: 'uppercase' }}>Philosophy</span>
                <div>
                  <p style={{ fontFamily: 'var(--font-dm-serif)', fontSize: 'clamp(1.8rem,3.5vw,3rem)', color: '#E8E3D5', lineHeight: 1.25, marginBottom: 24 }}>
                    "Progress begins<br />with bare bones."
                  </p>
                  <Link
                    href="/about"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '12px 24px', background: 'rgba(232,227,213,0.15)', border: '1px solid rgba(232,227,213,0.25)', color: '#E8E3D5', borderRadius: 9999, fontSize: 13, fontFamily: 'var(--font-inter)', textDecoration: 'none', backdropFilter: 'blur(8px)', transition: 'all 0.3s' }}
                    onMouseEnter={e => { e.currentTarget.style.background = '#E8E3D5'; e.currentTarget.style.color = '#0C0C0A' }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'rgba(232,227,213,0.15)'; e.currentTarget.style.color = '#E8E3D5' }}
                  >
                    Read my story →
                  </Link>
                </div>
              </div>
            </FadeUp>

            {/* Role stack card — rolling highlight */}
            <FadeUp delay={80} className="col-span-12 md:col-span-5">
              <div
                onMouseEnter={() => setHoveredBento(1)}
                onMouseLeave={() => setHoveredBento(null)}
                style={{ height: '100%', transform: getBentoScale(1), transition: bentoTransition, boxShadow: hoveredBento === 1 ? '0 20px 60px rgba(12,12,10,0.25)' : 'none', borderRadius: 28 }}
              >
                <RoleBentoCard />
              </div>
            </FadeUp>

            {/* Skills pill card */}
            <FadeUp delay={140} className="col-span-12 md:col-span-4">
              <div
                onMouseEnter={() => setHoveredBento(2)}
                onMouseLeave={() => setHoveredBento(null)}
                style={{ gridColumn: 'span 4', background: '#B8D4BC', borderRadius: 28, padding: 'clamp(1.8rem,3vw,2.5rem)', minHeight: 200, transform: getBentoScale(2), transition: bentoTransition, boxShadow: hoveredBento === 2 ? '0 16px 50px rgba(122,158,126,0.3)' : 'none' }}>
                <span style={{ fontFamily: 'var(--font-inter)', fontSize: 11, letterSpacing: '0.2em', color: 'rgba(12,12,10,0.45)', textTransform: 'uppercase', display: 'block', marginBottom: 20 }}>Toolkit</span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {['Figma', 'UX Research', 'SQL', 'React', 'Prototyping', 'Jira', 'Design Systems'].map(s => (
                    <span key={s} style={{ padding: '6px 14px', borderRadius: 9999, background: 'rgba(12,12,10,0.08)', fontSize: 12, fontFamily: 'var(--font-inter)', color: '#0C0C0A' }}>{s}</span>
                  ))}
                </div>
              </div>
            </FadeUp>

            {/* Stat cards */}
            <FadeUp delay={180} className="col-span-6 md:col-span-4">
              <div
                onMouseEnter={() => setHoveredBento(3)}
                onMouseLeave={() => setHoveredBento(null)}
                style={{ gridColumn: 'span 4', background: '#E8E3D5', border: '1px solid #D5CFC0', borderRadius: 28, padding: 'clamp(1.8rem,3vw,2.5rem)', minHeight: 200, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', transform: getBentoScale(3), transition: bentoTransition, boxShadow: hoveredBento === 3 ? '0 16px 50px rgba(12,12,10,0.1)' : 'none' }}>
                <span style={{ fontFamily: 'var(--font-inter)', fontSize: 11, letterSpacing: '0.2em', color: 'rgba(12,12,10,0.4)', textTransform: 'uppercase' }}>Background</span>
                <div>
                  <p style={{ fontFamily: 'var(--font-dm-serif)', fontSize: 'clamp(2.5rem,4vw,3.5rem)', color: '#7A9E7E', lineHeight: 1 }}>3×</p>
                  <p style={{ fontFamily: 'var(--font-inter)', fontSize: 13, color: 'rgba(12,12,10,0.5)', marginTop: 6 }}>disciplines combined into one practice</p>
                </div>
              </div>
            </FadeUp>

            <FadeUp delay={220} className="col-span-6 md:col-span-4">
              <div
                onMouseEnter={() => setHoveredBento(4)}
                onMouseLeave={() => setHoveredBento(null)}
                style={{ gridColumn: 'span 4', background: '#E8F0E9', borderRadius: 28, padding: 'clamp(1.8rem,3vw,2.5rem)', minHeight: 200, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', transform: getBentoScale(4), transition: bentoTransition, boxShadow: hoveredBento === 4 ? '0 16px 50px rgba(122,158,126,0.2)' : 'none' }}>
                <span style={{ fontFamily: 'var(--font-inter)', fontSize: 11, letterSpacing: '0.2em', color: 'rgba(12,12,10,0.4)', textTransform: 'uppercase' }}>Driven by</span>
                <p style={{ fontFamily: 'var(--font-dm-serif)', fontSize: 'clamp(1.1rem,2vw,1.5rem)', color: '#0C0C0A', lineHeight: 1.4 }}>Building systems from the ground up.</p>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: 'clamp(2.5rem,5vw,4rem) clamp(2rem,5vw,3.5rem)', textAlign: 'center' }}>
        <div style={{ maxWidth: 700, margin: '0 auto' }}>

          {/* Foreground content */}
          <div style={{ position: 'relative', zIndex: 1 }}>
            <FadeUp>
              <span style={{ fontFamily: 'var(--font-inter)', fontSize: 11, letterSpacing: '0.22em', color: '#7A9E7E', textTransform: 'uppercase', display: 'block', marginBottom: 20 }}>
                Let's Connect
              </span>
            </FadeUp>
            {/* Wheel wraps heading + slogan */}
            <div style={{ position: 'relative', display: 'inline-block', width: '100%' }}>
              {/* Spinning badge — centered on heading+slogan */}
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', zIndex: 0, pointerEvents: 'none', width: 480, height: 480, marginLeft: -240, marginTop: -240 }}>
                <svg viewBox="0 0 480 480" width="480" height="480" style={{ animation: 'spinBadge 18s linear infinite', display: 'block', opacity: 0.28 }}>
                  <defs>
                    <path id="circlePath" d="M 240,240 m -200,0 a 200,200 0 1,1 400,0 a 200,200 0 1,1 -400,0" />
                  </defs>
                  <text style={{ fontFamily: 'var(--font-inter)', fontSize: 16, fill: '#7A9E7E', letterSpacing: '0.3em' }}>
                    <textPath href="#circlePath">✦ OnenOnlyShereena ✦ Designer ✦ Builder ✦&nbsp;</textPath>
                  </text>
                  <circle cx="240" cy="240" r="5" fill="#7A9E7E" opacity="0.5" />
                </svg>
              </div>
              <div style={{ position: 'relative', zIndex: 1 }}>
                <h2 style={{ fontFamily: 'var(--font-dm-serif)', fontSize: 'clamp(2.8rem,6vw,5.5rem)', color: '#0C0C0A', lineHeight: 1.1, marginBottom: 10 }}>
                  <RevealText>Have a project</RevealText>
                  <br /><RevealText delay={110}>in mind?</RevealText>
                </h2>
                {/* Personal one-liner */}
                <FadeUp delay={80}>
                  <p style={{ fontFamily: 'var(--font-dm-serif)', fontSize: 'clamp(1rem,1.8vw,1.25rem)', color: 'rgba(12,12,10,0.38)', fontStyle: 'italic', marginBottom: 24, lineHeight: 1.6 }}>
                    Data brain. Design heart. Ships things that actually work.
                  </p>
                </FadeUp>
              </div>
            </div>
          </div>

          <div style={{ position: 'relative', zIndex: 1 }}>
          <FadeUp delay={200}>
            {/* Icon row — enlarged */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: 24, marginBottom: 44 }}>
              <a href="mailto:zhengsherina@gmail.com"
                style={{ width: 60, height: 60, borderRadius: '50%', border: '1px solid rgba(12,12,10,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(12,12,10,0.3)', textDecoration: 'none', transition: 'all 0.3s', background: 'transparent' }}
                onMouseEnter={e => { e.currentTarget.style.background = '#E8F0E9'; e.currentTarget.style.color = '#7A9E7E'; e.currentTarget.style.borderColor = '#B8D4BC'; e.currentTarget.style.transform = 'scale(1.12)' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(12,12,10,0.3)'; e.currentTarget.style.borderColor = 'rgba(12,12,10,0.12)'; e.currentTarget.style.transform = 'scale(1)' }}
                aria-label="Email"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                </svg>
              </a>
              <a href="https://www.linkedin.com/in/sherina-zheng-48b287224/" target="_blank" rel="noreferrer"
                style={{ width: 60, height: 60, borderRadius: '50%', border: '1px solid rgba(12,12,10,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(12,12,10,0.3)', textDecoration: 'none', transition: 'all 0.3s', background: 'transparent' }}
                onMouseEnter={e => { e.currentTarget.style.background = '#E8F0E9'; e.currentTarget.style.color = '#7A9E7E'; e.currentTarget.style.borderColor = '#B8D4BC'; e.currentTarget.style.transform = 'scale(1.12)' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(12,12,10,0.3)'; e.currentTarget.style.borderColor = 'rgba(12,12,10,0.12)'; e.currentTarget.style.transform = 'scale(1)' }}
                aria-label="LinkedIn"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/>
                </svg>
              </a>
            </div>
          </FadeUp>

          <FadeUp delay={320}>
            {/* Both links same size, bigger */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
              <a
                href="mailto:zhengsherina@gmail.com"
                style={{ fontFamily: 'var(--font-dm-serif)', fontSize: 'clamp(1.2rem,2.2vw,1.8rem)', color: 'rgba(12,12,10,0.4)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 10, transition: 'all 0.3s' }}
                onMouseEnter={e => { e.currentTarget.style.color = '#7A9E7E'; e.currentTarget.style.transform = 'scale(1.04)' }}
                onMouseLeave={e => { e.currentTarget.style.color = 'rgba(12,12,10,0.4)'; e.currentTarget.style.transform = 'scale(1)' }}
              >
                zhengsherina@gmail.com ↗
              </a>
              <a
                href="https://www.linkedin.com/in/sherina-zheng-48b287224/"
                target="_blank"
                rel="noreferrer"
                style={{ fontFamily: 'var(--font-dm-serif)', fontSize: 'clamp(1.2rem,2.2vw,1.8rem)', color: 'rgba(12,12,10,0.4)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 10, transition: 'all 0.3s' }}
                onMouseEnter={e => { e.currentTarget.style.color = '#7A9E7E'; e.currentTarget.style.transform = 'scale(1.04)' }}
                onMouseLeave={e => { e.currentTarget.style.color = 'rgba(12,12,10,0.4)'; e.currentTarget.style.transform = 'scale(1)' }}
              >
                linkedin.com/in/sherina-zheng ↗
              </a>
            </div>
          </FadeUp>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes scrollLine { 0%{transform:translateY(-100%)} 100%{transform:translateY(200%)} }
        @keyframes marquee   { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
        @keyframes pulse     { 0%,100%{opacity:1} 50%{opacity:0.35} }
        @keyframes spinBadge { 0%{transform:rotate(0deg)} 100%{transform:rotate(360deg)} }
      `}</style>
    </>
  )
}
