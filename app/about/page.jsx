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
      <section style={{ ...px, paddingTop: '5.5rem', paddingBottom: '2rem' }}>
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
      <section style={{ ...px, paddingTop: '2.5rem', paddingBottom: '5rem' }}>
        <div className="max-w-7xl mx-auto about-intro-grid">

          {/* Cartoon portrait card */}
          <FadeUp>
            <div style={{ width: '100%', aspectRatio: '3/4', borderRadius: 24, overflow: 'hidden', position: 'relative',
              background: 'linear-gradient(170deg,#B8D4BA 0%,#8FB892 55%,#6A9E70 100%)' }}>

              {/* soft bg circles */}
              <div style={{ position: 'absolute', top: -40, right: -40, width: 180, height: 180, borderRadius: '50%', background: 'rgba(255,255,255,0.08)' }} />
              <div style={{ position: 'absolute', bottom: 60, left: -30, width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,255,255,0.06)' }} />

              {/* ── Cartoon character SVG ── */}
              <svg viewBox="0 0 280 373" fill="none" xmlns="http://www.w3.org/2000/svg"
                style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '88%', height: 'auto' }}>

                {/* Shadow */}
                <ellipse cx="140" cy="368" rx="62" ry="8" fill="rgba(0,0,0,0.13)" />

                {/* Body — sage green outfit */}
                <rect x="82" y="218" width="116" height="100" rx="28" fill="#5A8A62"/>
                {/* Collar / neck area */}
                <rect x="118" y="210" width="44" height="32" rx="10" fill="#5A8A62"/>
                {/* Shirt detail — white inner */}
                <ellipse cx="140" cy="228" rx="16" ry="20" fill="#E8E3D5" opacity="0.6"/>

                {/* Arms */}
                <rect x="48" y="220" width="40" height="72" rx="20" fill="#5A8A62"/>
                <rect x="192" y="220" width="40" height="72" rx="20" fill="#5A8A62"/>
                {/* Hands */}
                <ellipse cx="68" cy="298" rx="18" ry="16" fill="#F2C4A0"/>
                <ellipse cx="212" cy="298" rx="18" ry="16" fill="#F2C4A0"/>

                {/* Legs */}
                <rect x="104" y="308" width="34" height="60" rx="17" fill="#3D5C42"/>
                <rect x="142" y="308" width="34" height="60" rx="17" fill="#3D5C42"/>
                {/* Shoes */}
                <ellipse cx="121" cy="368" rx="24" ry="10" fill="#2C2C2A"/>
                <ellipse cx="159" cy="368" rx="24" ry="10" fill="#2C2C2A"/>

                {/* Neck */}
                <rect x="122" y="188" width="36" height="34" rx="12" fill="#F2C4A0"/>

                {/* Head */}
                <ellipse cx="140" cy="158" rx="68" ry="72" fill="#F2C4A0"/>

                {/* Hair — dark, flowy */}
                <ellipse cx="140" cy="100" rx="68" ry="44" fill="#2C1A0E"/>
                {/* Hair sides */}
                <ellipse cx="80" cy="140" rx="22" ry="40" fill="#2C1A0E"/>
                <ellipse cx="200" cy="140" rx="22" ry="40" fill="#2C1A0E"/>
                {/* Hair highlight */}
                <ellipse cx="118" cy="95" rx="18" ry="8" fill="#4A2E18" opacity="0.6"/>

                {/* Ears */}
                <ellipse cx="74" cy="162" rx="10" ry="12" fill="#F2C4A0"/>
                <ellipse cx="206" cy="162" rx="10" ry="12" fill="#F2C4A0"/>
                <ellipse cx="74" cy="162" rx="6" ry="8" fill="#E8A882"/>
                <ellipse cx="206" cy="162" rx="6" ry="8" fill="#E8A882"/>

                {/* Eyes */}
                <ellipse cx="118" cy="158" rx="12" ry="13" fill="white"/>
                <ellipse cx="162" cy="158" rx="12" ry="13" fill="white"/>
                <circle cx="120" cy="160" r="8" fill="#2C1A0E"/>
                <circle cx="164" cy="160" r="8" fill="#2C1A0E"/>
                {/* Eye shine */}
                <circle cx="123" cy="157" r="3" fill="white"/>
                <circle cx="167" cy="157" r="3" fill="white"/>
                {/* Eyelashes */}
                <path d="M108 150 Q110 146 112 148" stroke="#2C1A0E" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M152 150 Q154 146 156 148" stroke="#2C1A0E" strokeWidth="1.5" strokeLinecap="round"/>

                {/* Eyebrows */}
                <path d="M108 144 Q118 138 128 142" stroke="#2C1A0E" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
                <path d="M152 142 Q162 138 172 144" stroke="#2C1A0E" strokeWidth="2.5" strokeLinecap="round" fill="none"/>

                {/* Nose */}
                <ellipse cx="140" cy="172" rx="5" ry="3.5" fill="#E8A882"/>

                {/* Smile */}
                <path d="M124 184 Q140 196 156 184" stroke="#C4846A" strokeWidth="2.5" strokeLinecap="round" fill="none"/>

                {/* Blush */}
                <ellipse cx="104" cy="176" rx="12" ry="7" fill="#F4A0A0" opacity="0.35"/>
                <ellipse cx="176" cy="176" rx="12" ry="7" fill="#F4A0A0" opacity="0.35"/>

                {/* Small earring */}
                <circle cx="74" cy="170" r="3.5" fill="#F4C430" opacity="0.9"/>
                <circle cx="206" cy="170" r="3.5" fill="#F4C430" opacity="0.9"/>
              </svg>

              {/* Name caption */}
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '1rem 1.25rem',
                background: 'linear-gradient(to top, rgba(12,12,10,0.45), transparent)' }}>
                <p style={{ fontFamily: 'var(--font-inter)', fontSize: 12, color: 'rgba(255,255,255,0.85)', letterSpacing: '0.06em' }}>Sherina Zheng</p>
                <p style={{ fontFamily: 'var(--font-inter)', fontSize: 10, color: 'rgba(255,255,255,0.45)', marginTop: 1 }}>Designer · Builder · Thinker</p>
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
      <section style={{ ...px, paddingTop: '3.5rem', paddingBottom: '3.5rem', background: '#E8F0E9', textAlign: 'center' }}>
        <div style={{ maxWidth: 480, margin: '0 auto' }}>
          <FadeUp>
            <h2 style={{ fontFamily: 'var(--font-dm-serif)', fontSize: 'clamp(1.9rem,3.5vw,3rem)', color: '#1C2E1E', lineHeight: 1.15, marginBottom: '1.5rem' }}>
              Let's make something great.
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
          .about-intro-grid { grid-template-columns: 1fr; }
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
