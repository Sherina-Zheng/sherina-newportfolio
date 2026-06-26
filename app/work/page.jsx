'use client'
import Link from 'next/link'
import { FadeUp, RevealText } from '../../components/ScrollReveal'

const projects = [
  {
    num: '01',
    title: 'Salon Connect',
    subtitle: 'Redefining how beauty businesses operate',
    year: '2024',
    tags: ['UX Design', 'FinTech', 'Mobile', 'B2B'],
    desc: 'An end-to-end online booking system connecting merchants, staff, and customers in the beauty industry. Focused on reducing friction in scheduling while giving salon owners real-time business insights.',
    role: 'UI/UX Designer & PM',
    accent: '#7A9E7E',
    bg: '#E8F0E9',
  },
  {
    num: '02',
    title: 'FinFlow Dashboard',
    subtitle: 'Data made legible, decisions made faster',
    year: '2024',
    tags: ['Data Analytics', 'Dashboard', 'B2B', 'Enterprise'],
    desc: 'A financial analytics dashboard that transforms complex data streams into clear, actionable visuals. Designed for non-technical stakeholders who need to understand performance at a glance.',
    role: 'Product Designer',
    accent: '#4A7C6F',
    bg: '#EDF4F2',
  },
  {
    num: '03',
    title: 'Bloom Mobile',
    subtitle: 'An iOS experience built around calm',
    year: '2023',
    tags: ['Mobile', 'iOS', 'Interaction Design', 'Consumer'],
    desc: 'A wellness tracking app with an emphasis on gentle interaction patterns and zero-guilt design. Explored how micro-animations and thoughtful copy can shift a user\'s emotional state.',
    role: 'UI/UX Designer',
    accent: '#8BAF7C',
    bg: '#EEF3EC',
  },
]

export default function WorkPage() {
  return (
    <>
      {/* Header */}
      <section className="pt-56 pb-20" style={{ paddingLeft: "clamp(2rem,5vw,3.5rem)", paddingRight: "clamp(2rem,5vw,3.5rem)" }}>
        <div className="max-w-7xl mx-auto">
          <h1 style={{ fontFamily: 'var(--font-dm-serif)', fontSize: 'clamp(3rem, 7vw, 6.5rem)', lineHeight: 1.05, color: '#0C0C0A' }}>
            <RevealText>Case Studies</RevealText>
          </h1>
          <FadeUp delay={200}>
            <p className="mt-6 text-base md:text-lg text-[#0C0C0A]/45 max-w-lg font-sans font-light leading-relaxed">
              A collection of work spanning product design, UX research, and systems thinking. Each project is a problem I cared about solving.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Project list */}
      <section className="px-8 md:px-14 pb-32">
        <div className="max-w-7xl mx-auto flex flex-col gap-6">
          {projects.map(({ num, title, subtitle, year, tags, desc, role, accent, bg }, i) => (
            <FadeUp key={num} delay={i * 100}>
              <div
                className="group rounded-3xl p-10 md:p-14 transition-all duration-500 cursor-pointer hover:scale-[1.01]"
                style={{ backgroundColor: bg }}
                data-cursor
              >
                <div className="flex flex-col md:flex-row md:items-start gap-10">
                  {/* Left: info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-6">
                      <span className="text-xs tracking-widest font-sans" style={{ color: accent, opacity: 0.8 }}>{num}</span>
                      <span className="text-xs text-[#0C0C0A]/30 font-sans">{year}</span>
                    </div>
                    <h2 style={{ fontFamily: 'var(--font-dm-serif)', fontSize: 'clamp(1.8rem, 3.5vw, 3rem)', color: '#0C0C0A', lineHeight: 1.15 }}>
                      {title}
                    </h2>
                    <p className="mt-2 text-sm font-sans italic" style={{ color: accent }}>{subtitle}</p>
                    <p className="mt-5 text-sm text-[#0C0C0A]/55 leading-relaxed max-w-md font-sans font-light">{desc}</p>

                    <div className="mt-8 flex flex-wrap gap-2">
                      {tags.map(tag => (
                        <span key={tag} className="px-3 py-1 rounded-full text-xs font-sans border" style={{ borderColor: accent + '40', color: '#0C0C0A', opacity: 0.65 }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right: placeholder image */}
                  <div className="md:w-64 lg:w-80">
                    <div
                      className="w-full h-52 md:h-64 rounded-2xl flex items-center justify-center relative overflow-hidden"
                      style={{ background: `linear-gradient(135deg, ${accent}22 0%, ${accent}08 100%)`, border: `1px solid ${accent}20` }}
                    >
                      <div className="absolute top-4 right-4 w-14 h-14 rounded-full" style={{ border: `1px solid ${accent}30` }} />
                      <div className="absolute bottom-4 left-4 w-8 h-8 rounded-full" style={{ background: accent + '20' }} />
                      <div className="text-center">
                        <p className="text-xs tracking-widest font-sans uppercase" style={{ color: accent, opacity: 0.5 }}>Coming soon</p>
                        <p className="text-[10px] text-[#0C0C0A]/25 mt-1 font-sans">Case study in progress</p>
                      </div>
                    </div>
                    <p className="mt-3 text-xs text-[#0C0C0A]/35 font-sans">Role: {role}</p>
                  </div>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-8 md:px-14 py-28 text-center border-t" style={{ borderColor: '#E8F0E9' }}>
        <div className="max-w-xl mx-auto">
          <h2 className="text-3xl md:text-5xl text-[#0C0C0A] mb-8" style={{ fontFamily: 'var(--font-dm-serif)' }}>
            <RevealText>Want to collaborate?</RevealText>
          </h2>
          <FadeUp delay={150}>
            <Link href="/contact"
              className="group inline-flex items-center gap-3 px-8 py-4 bg-[#0C0C0A] text-[#E8E3D5] rounded-full text-sm tracking-wide hover:bg-[#7A9E7E] transition-all duration-300 font-sans">
              Get in touch <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          </FadeUp>
        </div>
      </section>
    </>
  )
}
