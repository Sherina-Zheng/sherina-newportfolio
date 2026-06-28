import { FadeUp, RevealText } from '../../components/ScrollReveal'
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
    org: 'Financial Technology Firm',
    desc: 'Collaborating with the Product Team to design and develop an online booking system for beauty salons — connecting merchants, staff, and customers through fast, accessible solutions.',
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
    desc: 'Leaning into the intersection of design and engineering. Building from bare bones and learning that every layer added with intention becomes something that lasts.',
  },
]

export default function AboutPage() {
  return (
    <>
      {/* ── Header ── */}
      <section style={{ ...px, paddingTop: '8rem', paddingBottom: '3rem' }}>
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

      {/* ── Intro: photo + bio ── */}
      <section style={{ ...px, paddingTop: '3rem', paddingBottom: '5rem' }}>
        <div className="max-w-7xl mx-auto" style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '4rem', alignItems: 'start' }}>

          {/* Photo placeholder */}
          <FadeUp>
            <div style={{ width: '100%', aspectRatio: '3/4', borderRadius: 24, overflow: 'hidden', position: 'relative',
              background: 'linear-gradient(160deg,#C8DEC9 0%,#A8C9AA 50%,#7A9E7E 100%)' }}>
              <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 70% 20%, rgba(232,227,213,0.18) 0%, transparent 55%)' }} />
              <div style={{ position: 'absolute', top: 20, left: 20, width: 80, height: 80, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.2)' }} />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '1.5rem',
                background: 'linear-gradient(to top, rgba(12,12,10,0.5), transparent)' }}>
                <p style={{ fontFamily: 'var(--font-inter)', fontSize: 13, color: 'rgba(255,255,255,0.8)', letterSpacing: '0.04em' }}>Sherina Zheng</p>
                <p style={{ fontFamily: 'var(--font-inter)', fontSize: 11, color: 'rgba(255,255,255,0.4)', marginTop: 2 }}>Designer · Builder · Thinker</p>
              </div>
            </div>
          </FadeUp>

          {/* Bio */}
          <div>
            <FadeUp>
              <p style={{ fontFamily: 'var(--font-dm-serif)', fontSize: 'clamp(1.4rem,2.2vw,1.9rem)', color: '#0C0C0A', lineHeight: 1.4, marginBottom: '1.5rem' }}>
                Sherina began her professional journey stepping into the world of fintech — officially entering adulthood one product sprint at a time.
              </p>
            </FadeUp>
            <FadeUp delay={100}>
              <p style={{ fontFamily: 'var(--font-inter)', fontSize: 15, color: 'rgba(12,12,10,0.55)', lineHeight: 1.75, fontWeight: 300, marginBottom: '1.25rem' }}>
                Within her company, she collaborates with the Product Team on an innovative online booking system for beauty salons — a platform that connects merchants, staff, and customers through rapid, efficient solutions that redefine convenience and accessibility.
              </p>
            </FadeUp>
            <FadeUp delay={180}>
              <p style={{ fontFamily: 'var(--font-inter)', fontSize: 15, color: 'rgba(12,12,10,0.55)', lineHeight: 1.75, fontWeight: 300, marginBottom: '2rem' }}>
                But this is just the beginning. With a background in Data Analytics, she's driven to explore new horizons in Web Development and Product Management. The satisfaction of building systems from the ground up inspires her — a reminder that progress often begins with bare bones, and every step forward fuels her passion for crafting impactful solutions.
              </p>
            </FadeUp>
            <FadeUp delay={250}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                {['Curious by default', 'Systems thinker', 'Data-informed', 'Empathy-first'].map(trait => (
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
                <div>
                  <h4 style={{ fontFamily: 'var(--font-inter)', fontSize: 10, letterSpacing: '0.2em', color: 'rgba(12,12,10,0.4)', textTransform: 'uppercase', marginBottom: '1rem' }}>{cat}</h4>
                  <ul style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
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
      <section style={{ ...px, paddingTop: '5rem', paddingBottom: '5rem', background: '#0C0C0A', textAlign: 'center' }}>
        <div style={{ maxWidth: 560, margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'var(--font-dm-serif)', fontSize: 'clamp(2.5rem,5vw,4.5rem)', color: '#E8E3D5', lineHeight: 1.1, marginBottom: '2.5rem' }}>
            <RevealText>Let's make</RevealText>
            <br /><RevealText delay={100}>something great.</RevealText>
          </h2>
          <FadeUp delay={180}>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap' }}>
              <Link href="/contact"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 26px', background: '#E8E3D5', color: '#0C0C0A', borderRadius: 9999, fontFamily: 'var(--font-inter)', fontSize: 13, letterSpacing: '0.04em', textDecoration: 'none', transition: 'background 0.3s, color 0.3s' }}
                onMouseEnter={e => { e.currentTarget.style.background = '#7A9E7E'; e.currentTarget.style.color = '#E8E3D5' }}
                onMouseLeave={e => { e.currentTarget.style.background = '#E8E3D5'; e.currentTarget.style.color = '#0C0C0A' }}>
                Work with me →
              </Link>
              <Link href="/work"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 26px', border: '1px solid rgba(232,227,213,0.2)', color: 'rgba(232,227,213,0.6)', borderRadius: 9999, fontFamily: 'var(--font-inter)', fontSize: 13, letterSpacing: '0.04em', textDecoration: 'none', transition: 'border-color 0.3s, color 0.3s' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(232,227,213,0.45)'; e.currentTarget.style.color = 'rgba(232,227,213,0.85)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(232,227,213,0.2)'; e.currentTarget.style.color = 'rgba(232,227,213,0.6)' }}>
                See my work
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  )
}
