'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { FadeUp, RevealText } from '../components/ScrollReveal'

function FloatingOrb() {
  return (
    <div
      className="absolute right-[-80px] top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none select-none"
      style={{
        background: 'radial-gradient(circle at 40% 40%, #B8D4BC 0%, #E8F0E9 50%, transparent 72%)',
        filter: 'blur(1px)',
        opacity: 0.65,
        animation: 'float 8s ease-in-out infinite',
      }}
    />
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
    <span className="text-sage transition-opacity duration-300" style={{ opacity: fade ? 1 : 0 }}>
      {roles[idx]}
    </span>
  )
}

const projects = [
  { num: '01', title: 'Salon Connect', tags: ['UX Design', 'FinTech', 'Mobile'] },
  { num: '02', title: 'FinFlow Dashboard', tags: ['Data Analytics', 'Dashboard', 'B2B'] },
  { num: '03', title: 'Bloom Mobile', tags: ['Mobile', 'iOS', 'Interaction Design'] },
]

export default function Home() {
  const [ready, setReady] = useState(false)
  useEffect(() => { const t = setTimeout(() => setReady(true), 80); return () => clearTimeout(t) }, [])

  return (
    <>
      {/* ── HERO ── */}
      <section className="relative min-h-screen flex flex-col justify-end pb-24 px-8 md:px-14 overflow-hidden">
        <FloatingOrb />

        {/* Top badge row */}
        <div className="absolute top-28 left-8 md:left-14 flex items-center gap-3"
          style={{ opacity: ready ? 1 : 0, transform: ready ? 'none' : 'translateY(-8px)', transition: 'all 0.7s ease 0.5s' }}>
          <span className="w-1.5 h-1.5 rounded-full bg-sage" />
          <span className="text-[11px] tracking-[0.22em] text-ink/40 uppercase font-sans">Portfolio · 2025</span>
        </div>

        <div className="absolute top-28 right-8 md:right-14 flex items-center gap-2 px-4 py-2 rounded-full border border-pale bg-pale/60"
          style={{ opacity: ready ? 1 : 0, transition: 'opacity 0.7s ease 0.6s' }}>
          <span className="w-1.5 h-1.5 rounded-full bg-sage" style={{ animation: 'pulse 2s infinite' }} />
          <span className="text-xs text-muted font-sans tracking-wide">Available for work</span>
        </div>

        {/* Name */}
        <div className="max-w-7xl w-full mx-auto">
          <h1 style={{
            fontFamily: 'var(--font-dm-serif)',
            fontSize: 'clamp(3.8rem, 10.5vw, 10.5rem)',
            lineHeight: 1,
            letterSpacing: '-0.01em',
            color: '#0C0C0A',
          }}>
            {['Sherina', 'Zheng'].map((w, i) => (
              <span key={w} className="block overflow-hidden">
                <span className="block" style={{
                  transform: ready ? 'translateY(0)' : 'translateY(112%)',
                  transition: `transform 1s cubic-bezier(0.16,1,0.3,1) ${i * 130 + 100}ms`,
                }}>{w}</span>
              </span>
            ))}
          </h1>

          <div className="mt-7 flex flex-col md:flex-row md:items-end justify-between gap-6"
            style={{ opacity: ready ? 1 : 0, transform: ready ? 'none' : 'translateY(18px)', transition: 'all 0.8s ease 0.55s' }}>
            <div>
              <p className="text-lg md:text-xl text-ink/55 mb-1.5 font-sans font-light">
                <RoleRotator /> — Based in NYC
              </p>
              <p className="text-base md:text-lg text-ink/35 italic max-w-sm" style={{ fontFamily: 'var(--font-dm-serif)' }}>
                "I design user experiences that feel inevitable."
              </p>
            </div>
            <Link href="/work"
              className="group inline-flex items-center gap-3 px-7 py-3.5 bg-ink text-cream rounded-full text-sm tracking-wide hover:bg-sage transition-all duration-300 self-start md:self-auto font-sans">
              View my work
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          style={{ opacity: ready ? 0.35 : 0, transition: 'opacity 0.8s ease 1s' }}>
          <span className="text-[10px] tracking-[0.3em] text-ink uppercase font-sans">Scroll</span>
          <div className="w-px h-10 bg-ink/20 overflow-hidden">
            <div className="w-full h-full bg-sage" style={{ animation: 'scrollLine 2s ease-in-out infinite' }} />
          </div>
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <div className="py-5 border-y border-pale overflow-hidden">
        <div className="flex whitespace-nowrap" style={{ animation: 'marquee 22s linear infinite' }}>
          {Array(8).fill(['UX Research', 'Product Strategy', 'UI Design', 'Prototyping', 'Data Analytics', 'Systems Thinking']).flat().map((item, i) => (
            <span key={i} className="inline-flex items-center gap-6 px-8">
              <span className="text-[11px] tracking-[0.25em] text-ink/35 uppercase font-sans">{item}</span>
              <span className="w-1 h-1 rounded-full bg-sage" />
            </span>
          ))}
        </div>
      </div>

      {/* ── SELECTED WORK ── */}
      <section className="px-8 md:px-14 py-28">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-16">
            <div>
              <FadeUp>
                <span className="text-[11px] tracking-[0.22em] text-sage uppercase mb-3 block font-sans">Selected Work</span>
              </FadeUp>
              <h2 style={{ fontFamily: 'var(--font-dm-serif)', fontSize: 'clamp(2.2rem, 5vw, 4rem)', color: '#0C0C0A', lineHeight: 1.15 }}>
                <RevealText>Case Studies</RevealText>
              </h2>
            </div>
            <FadeUp delay={200}>
              <Link href="/work" className="hidden md:inline-flex text-sm text-ink/40 hover:text-sage hover-line transition-colors duration-200 font-sans">
                All projects ↗
              </Link>
            </FadeUp>
          </div>

          <div className="flex flex-col divide-y divide-pale">
            {projects.map(({ num, title, tags }, i) => (
              <FadeUp key={num} delay={i * 90}>
                <Link href="/work" className="group flex items-center justify-between py-8 md:py-10 hover:pl-5 transition-all duration-500">
                  <div className="flex items-center gap-8 md:gap-14">
                    <span className="text-xs text-ink/25 tracking-widest font-sans">{num}</span>
                    <span className="text-2xl md:text-4xl text-ink group-hover:text-sage transition-colors duration-300" style={{ fontFamily: 'var(--font-dm-serif)' }}>
                      {title}
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="hidden md:flex gap-2 flex-wrap justify-end">
                      {tags.map(tag => (
                        <span key={tag} className="px-3 py-1 rounded-full border border-pale text-xs text-muted group-hover:border-mint transition-colors duration-300 font-sans">{tag}</span>
                      ))}
                    </div>
                    <span className="text-ink/25 group-hover:text-sage group-hover:translate-x-2 transition-all duration-300 text-lg">→</span>
                  </div>
                </Link>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT DARK SECTION ── */}
      <section className="px-8 md:px-14 py-28 bg-ink">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-20 items-center">
          <div className="flex-1">
            <FadeUp>
              <span className="text-[11px] tracking-[0.22em] text-sage uppercase mb-6 block font-sans">About</span>
            </FadeUp>
            <h2 className="text-4xl md:text-5xl text-cream leading-snug mb-8" style={{ fontFamily: 'var(--font-dm-serif)' }}>
              <RevealText>Progress begins</RevealText>
              <br /><RevealText delay={100}>with bare bones.</RevealText>
            </h2>
            <FadeUp delay={200}>
              <p className="text-cream/45 text-base leading-relaxed max-w-md mb-10 font-sans font-light">
                A designer who moves between data and design — building systems that are both rigorous and deeply human.
              </p>
            </FadeUp>
            <FadeUp delay={300}>
              <Link href="/about"
                className="group inline-flex items-center gap-3 px-7 py-3.5 border border-cream/20 text-cream/65 rounded-full text-sm tracking-wide hover:bg-cream hover:text-ink hover:border-cream transition-all duration-300 font-sans">
                My story <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
            </FadeUp>
          </div>

          {/* Decorative card */}
          <div className="flex-1 flex justify-center">
            <div className="w-60 h-80 md:w-72 md:h-96 rounded-3xl relative overflow-hidden"
              style={{ background: 'linear-gradient(135deg, #1E2D20 0%, #141F15 100%)' }}>
              <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at 60% 30%, #7A9E7E18 0%, transparent 65%)' }} />
              <div className="absolute top-7 right-7 w-20 h-20 rounded-full border border-sage/15" />
              <div className="absolute top-11 right-11 w-10 h-10 rounded-full border border-sage/25" />
              <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-sage/10">
                <p className="text-mint text-xs tracking-widest uppercase mb-0.5 font-sans">Sherina Zheng</p>
                <p className="text-cream/30 text-xs font-sans">Designer & PM</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="px-8 md:px-14 py-36 text-center">
        <div className="max-w-3xl mx-auto">
          <FadeUp>
            <span className="text-[11px] tracking-[0.22em] text-sage uppercase mb-6 block font-sans">Let's Connect</span>
          </FadeUp>
          <h2 className="text-5xl md:text-7xl text-ink leading-tight mb-12" style={{ fontFamily: 'var(--font-dm-serif)' }}>
            <RevealText>Have a project</RevealText>
            <br /><RevealText delay={110}>in mind?</RevealText>
          </h2>
          <FadeUp delay={250}>
            <a href="mailto:zhengsherina@gmail.com"
              className="group inline-flex items-center gap-3 text-2xl md:text-3xl text-ink/35 hover:text-sage transition-colors duration-300 hover-line font-serif"
              style={{ fontFamily: 'var(--font-dm-serif)' }}>
              zhengsherina@gmail.com
              <span className="transition-transform duration-300 group-hover:translate-x-2">↗</span>
            </a>
          </FadeUp>
        </div>
      </section>

      <style>{`
        @keyframes scrollLine { 0%{transform:translateY(-100%)} 100%{transform:translateY(200%)} }
        @keyframes marquee   { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
        @keyframes float     { 0%,100%{transform:translate(0,-50%)} 50%{transform:translate(12px,calc(-50% + 14px))} }
        .text-sage  { color: #7A9E7E; }
        .text-muted { color: #6B7B6C; }
        .text-ink   { color: #0C0C0A; }
        .text-cream { color: #F7F7F2; }
        .text-mint  { color: #B8D4BC; }
        .bg-ink     { background-color: #0C0C0A; }
        .bg-sage    { background-color: #7A9E7E; }
        .bg-cream   { background-color: #F7F7F2; }
        .border-pale { border-color: #E8F0E9; }
        .border-mint { border-color: #B8D4BC; }
        .border-sage { border-color: #7A9E7E; }
        .border-cream { border-color: #F7F7F2; }
      `}</style>
    </>
  )
}
