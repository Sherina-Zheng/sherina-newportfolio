'use client'
import Link from 'next/link'
import { FadeUp, RevealText } from '../../components/ScrollReveal'

const px = { paddingLeft: 'clamp(2rem,5vw,3.5rem)', paddingRight: 'clamp(2rem,5vw,3.5rem)' }

const projects = [
  {
    num: '01',
    title: 'CodePay Ops',
    subtitle: 'Streamlining product operations at scale',
    year: '2025',
    tags: ['Product Ops', 'FinTech', 'Strategy', 'Cross-functional'],
    desc: 'Led product operations initiatives at CodePay — building internal tooling, streamlining cross-team workflows, and translating ambiguous business problems into structured execution plans that shipped.',
    role: 'Product Operations Manager',
    accent: '#5E7A8A',
    bg: '#EAF0F4',
  },
  {
    num: '02',
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
    num: '03',
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
    num: '04',
    title: 'Bloom Mobile',
    subtitle: 'An iOS experience built around calm',
    year: '2023',
    tags: ['Mobile', 'iOS', 'Interaction Design', 'Consumer'],
    desc: "A wellness tracking app with an emphasis on gentle interaction patterns and zero-guilt design. Explored how micro-animations and thoughtful copy can shift a user's emotional state.",
    role: 'UI/UX Designer',
    accent: '#8BAF7C',
    bg: '#EEF3EC',
  },
]

export default function WorkPage() {
  return (
    <>
      {/* ── Header ── */}
      <section style={{ ...px, paddingTop: 'calc(16px + 36px + 16px)', paddingBottom: '2rem' }}>
        <div className="max-w-7xl mx-auto">
          <FadeUp>
            <span style={{ fontFamily: 'var(--font-inter)', fontSize: 11, letterSpacing: '0.2em', color: 'rgba(12,12,10,0.35)', textTransform: 'uppercase' }}>
              Work
            </span>
          </FadeUp>
          <h1 style={{ fontFamily: 'var(--font-dm-serif)', fontSize: 'clamp(2.8rem,6.5vw,6rem)', lineHeight: 1.05, color: '#0C0C0A', marginTop: '0.5rem' }}>
            <RevealText>Case Studies</RevealText>
          </h1>
          <FadeUp delay={160}>
            <p style={{ marginTop: '1rem', fontFamily: 'var(--font-inter)', fontSize: 'clamp(1rem,1.4vw,1.2rem)', color: 'rgba(12,12,10,0.45)', maxWidth: 500, lineHeight: 1.7, fontWeight: 300 }}>
              A collection of work spanning product design, UX research, and systems thinking. Each project is a problem I cared about solving.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ── Project list ── */}
      <section style={{ ...px, paddingTop: '2rem', paddingBottom: '5rem' }}>
        <div className="max-w-7xl mx-auto" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {projects.map(({ num, title, subtitle, year, tags, desc, role, accent, bg }, i) => (
            <FadeUp key={num} delay={i * 100}>
              <div style={{ backgroundColor: bg, borderRadius: 28, padding: 'clamp(2rem,4vw,3.5rem)', transition: 'transform 0.4s ease, box-shadow 0.4s ease', cursor: 'pointer' }}
                className="work-card">
                <div className="work-card-inner">
                  {/* Left: info */}
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: '1.25rem' }}>
                      <span style={{ fontFamily: 'var(--font-inter)', fontSize: 11, letterSpacing: '0.18em', color: accent, opacity: 0.9 }}>{num}</span>
                      <span style={{ fontFamily: 'var(--font-inter)', fontSize: 11, color: 'rgba(12,12,10,0.3)' }}>{year}</span>
                    </div>
                    <h2 style={{ fontFamily: 'var(--font-dm-serif)', fontSize: 'clamp(1.8rem,3.5vw,3rem)', color: '#0C0C0A', lineHeight: 1.1, marginBottom: '0.4rem' }}>
                      {title}
                    </h2>
                    <p style={{ fontFamily: 'var(--font-inter)', fontSize: 13, fontStyle: 'italic', color: accent, marginBottom: '1.25rem' }}>{subtitle}</p>
                    <p style={{ fontFamily: 'var(--font-inter)', fontSize: 14, color: 'rgba(12,12,10,0.55)', lineHeight: 1.75, fontWeight: 300, maxWidth: 480, marginBottom: '1.75rem' }}>{desc}</p>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                      {tags.map(tag => (
                        <span key={tag} style={{ padding: '5px 14px', borderRadius: 9999, fontSize: 11, fontFamily: 'var(--font-inter)', border: `1px solid ${accent}50`, color: 'rgba(12,12,10,0.6)' }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right: preview card */}
                  <div className="work-card-preview" style={{ width: 260, flexShrink: 0 }}>
                    <div style={{ width: '100%', height: 200, borderRadius: 18, position: 'relative', overflow: 'hidden',
                      background: `linear-gradient(135deg, ${accent}28 0%, ${accent}0A 100%)`,
                      border: `1px solid ${accent}25` }}>
                      <div style={{ position: 'absolute', top: 14, right: 14, width: 52, height: 52, borderRadius: '50%', border: `1px solid ${accent}30` }} />
                      <div style={{ position: 'absolute', bottom: 14, left: 14, width: 28, height: 28, borderRadius: '50%', background: accent + '25' }} />
                      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
                        <p style={{ fontFamily: 'var(--font-inter)', fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: accent, opacity: 0.6 }}>Coming soon</p>
                        <p style={{ fontFamily: 'var(--font-inter)', fontSize: 10, color: 'rgba(12,12,10,0.25)' }}>Case study in progress</p>
                      </div>
                    </div>
                    <p style={{ marginTop: 10, fontFamily: 'var(--font-inter)', fontSize: 11, color: 'rgba(12,12,10,0.35)' }}>Role: {role}</p>
                  </div>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ ...px, paddingTop: '3.5rem', paddingBottom: '3.5rem', background: '#E8F0E9', textAlign: 'center' }}>
        <div style={{ maxWidth: 480, margin: '0 auto' }}>
          <FadeUp>
            <h2 style={{ fontFamily: 'var(--font-dm-serif)', fontSize: 'clamp(1.9rem,3.5vw,3rem)', color: '#1C2E1E', lineHeight: 1.15, marginBottom: '1.5rem' }}>
              Open to collabs, always.
            </h2>
          </FadeUp>
          <FadeUp delay={120}>
            <Link href="/contact" className="work-cta">
              Get in touch →
            </Link>
          </FadeUp>
        </div>
      </section>

      <style>{`
        .work-card:hover { transform: scale(1.005); box-shadow: 0 8px 40px rgba(0,0,0,0.07); }
        .work-card-inner { display: flex; flex-direction: column; gap: 2rem; }
        @media (min-width: 768px) { .work-card-inner { flex-direction: row; align-items: flex-start; gap: 3rem; } }
        @media (max-width: 640px) {
          .work-card { padding: 1.4rem !important; border-radius: 20px !important; }
          .work-card-preview { display: none !important; }
        }
        .work-cta {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 11px 26px; background: #4A7A52; color: #fff;
          border-radius: 9999px; font-family: var(--font-inter); font-size: 13px;
          letter-spacing: 0.04em; text-decoration: none; transition: background 0.3s;
        }
        .work-cta:hover { background: #3A6040; }
      `}</style>
    </>
  )
}
