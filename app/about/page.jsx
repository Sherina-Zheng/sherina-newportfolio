import { FadeUp, RevealText } from '../../components/ScrollReveal'
import Image from 'next/image'
import Link from 'next/link'

const px = { paddingLeft: 'clamp(2rem,5vw,3.5rem)', paddingRight: 'clamp(2rem,5vw,3.5rem)' }

const skills = [
  { cat: 'Design',    items: ['UX Research', 'UI Design', 'Prototyping', 'Interaction Design', 'Design Systems'] },
  { cat: 'Product',   items: ['Product Strategy', 'Roadmapping', 'User Stories', 'Sprint Planning', 'Stakeholder Mgmt'] },
  { cat: 'Tools',     items: ['Figma', 'FigJam', 'Notion', 'Jira', 'Supabase'] },
  { cat: 'Technical', items: ['Data Analytics', 'SQL', 'React / Next.js', 'Python (basics)', 'A/B Testing'] },
]

const timeline = [
  {
    year: '2024',
    title: 'ISO Boarding Associate',
    org: 'Financial Technology',
    desc: 'Collaborated with the Product Team on an online booking system for beauty salons — connecting merchants, staff, and customers through fast, accessible solutions.',
  },
  {
    year: '2023',
    title: 'Data Analytics',
    org: 'Academic Background',
    desc: 'Foundation in data analytics — interpreting complex datasets, building dashboards, and translating numbers into product decisions.',
  },
  {
    year: 'Now',
    title: 'Exploring & Building',
    org: 'Product Design · Web Dev · PM',
    desc: 'Leaning into the intersection of design and engineering — building systems with intention and learning that every layer added with care becomes something that lasts.',
  },
]

export default function AboutPage() {
  return (
    <>
      {/* ── Header ── */}
      <section style={{ ...px, paddingTop: 'calc(16px + 36px + 16px + 0.25rem)', paddingBottom: '1rem' }}>
        <div className="max-w-7xl mx-auto">
          <FadeUp>
            <span style={{ fontFamily: 'var(--font-inter)', fontSize: 11, letterSpacing: '0.2em', color: 'rgba(12,12,10,0.35)', textTransform: 'uppercase' }}>
              About
            </span>
          </FadeUp>
          <h1 style={{ fontFamily: 'var(--font-dm-serif)', fontSize: 'clamp(2.8rem,6.5vw,6rem)', lineHeight: 1.05, color: '#0C0C0A', marginTop: '0.5rem' }}>
            <RevealText>The person</RevealText>
            <br /><RevealText delay={110}>behind the work.</RevealText>
          </h1>
        </div>
      </section>

      {/* ── Intro: portrait + bio ── */}
      <section style={{ ...px, paddingTop: '1.5rem', paddingBottom: '5rem' }}>
        <div className="max-w-7xl mx-auto about-intro-grid">

          {/* Photo portrait */}
          <FadeUp>
            <div style={{ width: '100%', aspectRatio: '3/4', borderRadius: 28, overflow: 'hidden', position: 'relative',
              background: '#C8DEC9', boxShadow: '0 8px 40px rgba(0,0,0,0.12)' }}>
              <Image
                src="/sherina.png"
                alt="Sherina Zheng"
                fill
                style={{ objectFit: 'cover', objectPosition: 'center top' }}
                priority
              />
              {/* Name caption */}
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '2rem 1.25rem 1rem',
                background: 'linear-gradient(to top, rgba(12,12,10,0.55) 0%, transparent 100%)' }}>
                <p style={{ fontFamily: 'var(--font-inter)', fontSize: 12, color: 'rgba(255,255,255,0.95)', letterSpacing: '0.08em', fontWeight: 500 }}>Sherina Zheng</p>
                <p style={{ fontFamily: 'var(--font-inter)', fontSize: 10, color: 'rgba(255,255,255,0.5)', marginTop: 2, letterSpacing: '0.04em' }}>Designer · Builder · Thinker</p>
              </div>
            </div>
          </FadeUp>

          {/* Bio */}
          <div>
            <FadeUp>
              <p style={{ fontFamily: 'var(--font-dm-serif)', fontSize: 'clamp(1.4rem,2.2vw,1.9rem)', color: '#0C0C0A', lineHeight: 1.4, marginBottom: '1.5rem' }}>
                Systems thinker. Builder. Somewhere between design and code.
              </p>
            </FadeUp>
            <FadeUp delay={100}>
              <p style={{ fontFamily: 'var(--font-inter)', fontSize: 15, color: 'rgba(12,12,10,0.55)', lineHeight: 1.75, fontWeight: 300, marginBottom: '1.25rem' }}>
                Sherina sits at the intersection of product and operations — bridging the gap between strategy and execution. She drives cross-functional initiatives, streamlines product workflows, and translates ambiguous problems into clear, actionable outcomes that move the team forward.
              </p>
            </FadeUp>
            <FadeUp delay={180}>
              <p style={{ fontFamily: 'var(--font-inter)', fontSize: 15, color: 'rgba(12,12,10,0.55)', lineHeight: 1.75, fontWeight: 300, marginBottom: '2rem' }}>
                With a background in data analytics and a growing edge in UI/UX and front-end development, she brings a rare combination of analytical rigor and design sensibility to everything she builds. She believes the best products aren't just functional — they're felt.
              </p>
            </FadeUp>
            <FadeUp delay={250}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                {['Curious by design', 'Systems thinker', 'Data-informed', 'Empathy-first'].map(trait => (
                  <span key={trait} style={{ padding: '6px 16px', borderRadius: 9999, border: '1px solid #D8E8D8', fontSize: 12, color: '#6B7B6C', fontFamily: 'var(--font-inter)', background: 'rgba(232,240,233,0.4)' }}>
                    {trait}
                  </span>
                ))}
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── Timeline ── */}
      <section style={{ ...px, paddingTop: '4rem', paddingBottom: '4rem', background: '#F0F5F0' }}>
        <div className="max-w-7xl mx-auto">
          <FadeUp>
            <span style={{ fontFamily: 'var(--font-inter)', fontSize: 11, letterSpacing: '0.22em', color: '#7A9E7E', textTransform: 'uppercase', display: 'block', marginBottom: '2.5rem' }}>Journey</span>
          </FadeUp>
          <div>
            {timeline.map(({ year, title, org, desc }, i) => (
              <FadeUp key={i} delay={i * 90}>
                <div style={{ display: 'flex', gap: '2.5rem', padding: '2rem 0', borderBottom: i < timeline.length - 1 ? '1px solid #D8E8D8' : 'none' }}>
                  <div style={{ width: 52, flexShrink: 0, paddingTop: 3 }}>
                    <span style={{ fontFamily: 'var(--font-inter)', fontSize: 11, color: '#7A9E7E', letterSpacing: '0.12em', textTransform: 'uppercase' }}>{year}</span>
                  </div>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontFamily: 'var(--font-dm-serif)', fontSize: '1.2rem', color: '#0C0C0A', marginBottom: 4 }}>{title}</h3>
                    <p style={{ fontFamily: 'var(--font-inter)', fontSize: 11, color: '#7A9E7E', letterSpacing: '0.08em', marginBottom: 10 }}>{org}</p>
                    <p style={{ fontFamily: 'var(--font-inter)', fontSize: 14, color: 'rgba(12,12,10,0.5)', lineHeight: 1.7, fontWeight: 300 }}>{desc}</p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── Skills / Capabilities ── */}
      <section style={{ ...px, paddingTop: '4rem', paddingBottom: '5rem' }}>
        <div className="max-w-7xl mx-auto">
          <FadeUp>
            <span style={{ fontFamily: 'var(--font-inter)', fontSize: 11, letterSpacing: '0.22em', color: '#7A9E7E', textTransform: 'uppercase', display: 'block', marginBottom: '2.5rem' }}>Capabilities</span>
          </FadeUp>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '2.5rem' }}>
            {skills.map(({ cat, items }, i) => (
              <FadeUp key={cat} delay={i * 70}>
                <div style={{ textAlign: 'center' }}>
                  <h4 style={{ fontFamily: 'var(--font-inter)', fontSize: 10, letterSpacing: '0.2em', color: 'rgba(12,12,10,0.4)', textTransform: 'uppercase', marginBottom: '1rem' }}>{cat}</h4>
                  <ul style={{ display: 'inline-flex', flexDirection: 'column', gap: 10, alignItems: 'flex-start' }}>
                    {items.map(item => (
                      <li key={item} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <span style={{ width: 4, height: 4, borderRadius: '50%', background: '#7A9E7E', flexShrink: 0 }} />
                        <span style={{ fontFamily: 'var(--font-inter)', fontSize: 13, color: 'rgba(12,12,10,0.7)' }}>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ ...px, paddingTop: '3.5rem', paddingBottom: '3.5rem', background: '#E8F0E9', textAlign: 'center' }}>
        <div style={{ maxWidth: 480, margin: '0 auto' }}>
          <FadeUp>
            <h2 style={{ fontFamily: 'var(--font-dm-serif)', fontSize: 'clamp(1.9rem,3.5vw,3rem)', color: '#1C2E1E', lineHeight: 1.15, marginBottom: '1.5rem' }}>
              Let's brew ideas and ship.
            </h2>
          </FadeUp>
          <FadeUp delay={100}>
            <p style={{ fontFamily: 'var(--font-inter)', fontSize: 14, color: 'rgba(28,46,30,0.55)', fontWeight: 300, marginBottom: '2rem', lineHeight: 1.65 }}>
              Open to freelance projects, full-time roles, and interesting collaborations.
            </p>
          </FadeUp>
          <FadeUp delay={160}>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap' }}>
              <Link href="/contact" className="about-cta-primary">Work with me →</Link>
              <Link href="/work" className="about-cta-secondary">See my work</Link>
            </div>
          </FadeUp>
        </div>
      </section>

      <style>{`
        .about-intro-grid {
          display: grid;
          grid-template-columns: 280px 1fr;
          gap: 4rem;
          align-items: start;
        }
        @media (max-width: 768px) {
          .about-intro-grid { grid-template-columns: 1fr; gap: 2rem; }
          .about-intro-grid > :first-child { max-width: 240px; margin: 0 auto; aspect-ratio: 1/1 !important; }
        }
        @media (max-width: 640px) {
          .about-cta-primary, .about-cta-secondary { padding: 10px 18px !important; font-size: 12px !important; }
        }
        .about-cta-primary {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 11px 24px; background: #4A7A52; color: #fff;
          border-radius: 9999px; font-family: var(--font-inter); font-size: 13px;
          letter-spacing: 0.04em; text-decoration: none; transition: background 0.3s;
        }
        .about-cta-primary:hover { background: #3A6040; }
        .about-cta-secondary {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 11px 24px; border: 1px solid rgba(28,46,30,0.2); color: rgba(28,46,30,0.65);
          border-radius: 9999px; font-family: var(--font-inter); font-size: 13px;
          letter-spacing: 0.04em; text-decoration: none; transition: border-color 0.3s, color 0.3s;
        }
        .about-cta-secondary:hover { border-color: rgba(28,46,30,0.45); color: rgba(28,46,30,0.85); }
      `}</style>
    </>
  )
}
