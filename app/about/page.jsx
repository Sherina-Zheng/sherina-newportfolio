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
      <section style={{ ...px, paddingTop: 'calc(28px + 36px + 28px + 1.5rem)', paddingBottom: '2rem' }}>
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
            <div style={{ width: '100%', aspectRatio: '3/4', borderRadius: 28, overflow: 'hidden', position: 'relative',
              background: 'linear-gradient(160deg,#1A2A20 0%,#1E3528 45%,#152318 100%)',
              boxShadow: '0 8px 40px rgba(0,0,0,0.18)' }}>

              {/* Grid lines bg */}
              <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.07 }} viewBox="0 0 280 373" preserveAspectRatio="none">
                {[0,40,80,120,160,200,240,280].map(x => <line key={x} x1={x} y1="0" x2={x} y2="373" stroke="#7A9E7E" strokeWidth="0.8"/>)}
                {[0,40,80,120,160,200,240,280,320,360].map(y => <line key={y} x1="0" y1={y} x2="280" y2={y} stroke="#7A9E7E" strokeWidth="0.8"/>)}
              </svg>

              {/* Floating code snippets */}
              <text x="14" y="32" style={{ fontFamily: 'monospace', fontSize: 9, fill: '#7A9E7E', opacity: 0.55 }}>{'</design>'}</text>
              <text x="168" y="56" style={{ fontFamily: 'monospace', fontSize: 8, fill: '#A8E6CF', opacity: 0.4 }}>{'fn build()'}</text>
              <text x="20" y="300" style={{ fontFamily: 'monospace', fontSize: 8, fill: '#7A9E7E', opacity: 0.4 }}>{'{ craft }'}</text>

              {/* Star accents */}
              {[[240,28,6],[24,200,4],[250,190,5],[200,310,4]].map(([x,y,r],i) => (
                <svg key={i} style={{ position:'absolute', left: x, top: y }} viewBox="0 0 12 12" width={r*2} height={r*2}>
                  <path d="M6 0 L7 5 L12 6 L7 7 L6 12 L5 7 L0 6 L5 5 Z" fill="#A8E6CF" opacity="0.5"/>
                </svg>
              ))}

              {/* ── Character SVG ── */}
              <svg viewBox="0 0 280 380" fill="none" xmlns="http://www.w3.org/2000/svg"
                style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '84%', height: 'auto' }}>

                {/* Ground shadow */}
                <ellipse cx="140" cy="375" rx="58" ry="7" fill="rgba(0,0,0,0.25)" />

                {/* Hoodie body — dark charcoal */}
                <rect x="78" y="215" width="124" height="110" rx="30" fill="#2A3530"/>
                {/* Hood overlap / collar */}
                <path d="M110 215 Q140 238 170 215" fill="#222C28" stroke="none"/>
                {/* Hoodie pocket */}
                <rect x="112" y="268" width="56" height="30" rx="10" fill="#1E2924"/>
                <line x1="140" y1="268" x2="140" y2="298" stroke="#2A3530" strokeWidth="1.5"/>
                {/* Hoodie cuffs / arms */}
                <rect x="42" y="218" width="42" height="78" rx="21" fill="#2A3530"/>
                <rect x="196" y="218" width="42" height="78" rx="21" fill="#2A3530"/>
                {/* Hands */}
                <ellipse cx="63" cy="302" rx="17" ry="15" fill="#F0BC95"/>
                <ellipse cx="217" cy="302" rx="17" ry="15" fill="#F0BC95"/>

                {/* Legs */}
                <rect x="103" y="316" width="34" height="58" rx="17" fill="#1A2420"/>
                <rect x="143" y="316" width="34" height="58" rx="17" fill="#1A2420"/>
                {/* Shoes — chunky white sneakers */}
                <rect x="94" y="362" width="50" height="16" rx="8" fill="#E8E3D5"/>
                <rect x="136" y="362" width="50" height="16" rx="8" fill="#E8E3D5"/>
                <rect x="94" y="362" width="50" height="6" rx="3" fill="rgba(255,255,255,0.4)"/>
                <rect x="136" y="362" width="50" height="6" rx="3" fill="rgba(255,255,255,0.4)"/>

                {/* Neck */}
                <rect x="122" y="192" width="36" height="32" rx="12" fill="#F0BC95"/>

                {/* Head */}
                <ellipse cx="140" cy="155" rx="66" ry="68" fill="#F0BC95"/>

                {/* Hair — sleek dark, straight with subtle fringe */}
                <ellipse cx="140" cy="97" rx="66" ry="40" fill="#1C1008"/>
                <ellipse cx="78" cy="138" rx="18" ry="36" fill="#1C1008"/>
                <ellipse cx="202" cy="138" rx="18" ry="36" fill="#1C1008"/>
                {/* Fringe */}
                <path d="M96 100 Q108 118 116 108 Q128 124 140 112 Q152 124 164 108 Q172 118 184 100" fill="#1C1008" stroke="none"/>
                {/* Hair sheen */}
                <ellipse cx="116" cy="90" rx="16" ry="7" fill="#2E1E0A" opacity="0.5"/>

                {/* Ears */}
                <ellipse cx="76" cy="158" rx="10" ry="12" fill="#F0BC95"/>
                <ellipse cx="204" cy="158" rx="10" ry="12" fill="#F0BC95"/>
                <ellipse cx="76" cy="158" rx="6" ry="8" fill="#E0A87A"/>
                <ellipse cx="204" cy="158" rx="6" ry="8" fill="#E0A87A"/>

                {/* Glasses frames — round, mint accent */}
                <rect x="96" y="148" width="36" height="26" rx="13" fill="none" stroke="#A8E6CF" strokeWidth="2.5"/>
                <rect x="148" y="148" width="36" height="26" rx="13" fill="none" stroke="#A8E6CF" strokeWidth="2.5"/>
                {/* Bridge */}
                <line x1="132" y1="161" x2="148" y2="161" stroke="#A8E6CF" strokeWidth="2" strokeLinecap="round"/>
                {/* Temple arms */}
                <line x1="96" y1="161" x2="78" y2="158" stroke="#A8E6CF" strokeWidth="2" strokeLinecap="round"/>
                <line x1="184" y1="161" x2="202" y2="158" stroke="#A8E6CF" strokeWidth="2" strokeLinecap="round"/>
                {/* Lens tint */}
                <rect x="97" y="149" width="34" height="24" rx="12" fill="#A8E6CF" fillOpacity="0.08"/>
                <rect x="149" y="149" width="34" height="24" rx="12" fill="#A8E6CF" fillOpacity="0.08"/>

                {/* Eyes behind glasses */}
                <circle cx="114" cy="161" r="7" fill="#1C1008"/>
                <circle cx="166" cy="161" r="7" fill="#1C1008"/>
                <circle cx="117" cy="158" r="2.5" fill="white"/>
                <circle cx="169" cy="158" r="2.5" fill="white"/>

                {/* Eyebrows — sharp, defined */}
                <path d="M100 143 Q114 136 126 140" stroke="#1C1008" strokeWidth="2.8" strokeLinecap="round" fill="none"/>
                <path d="M154 140 Q166 136 180 143" stroke="#1C1008" strokeWidth="2.8" strokeLinecap="round" fill="none"/>

                {/* Nose */}
                <ellipse cx="140" cy="172" rx="4.5" ry="3" fill="#E0A87A"/>

                {/* Smile — small, confident */}
                <path d="M128 183 Q140 192 152 183" stroke="#C4846A" strokeWidth="2.2" strokeLinecap="round" fill="none"/>

                {/* Subtle blush */}
                <ellipse cx="102" cy="174" rx="11" ry="6" fill="#F4A0A0" opacity="0.28"/>
                <ellipse cx="178" cy="174" rx="11" ry="6" fill="#F4A0A0" opacity="0.28"/>

                {/* Gold stud earrings */}
                <circle cx="76" cy="167" r="3" fill="#F4C430"/>
                <circle cx="204" cy="167" r="3" fill="#F4C430"/>

                {/* Tiny laptop in hands */}
                <rect x="72" y="286" width="96" height="56" rx="6" fill="#1A2420"/>
                <rect x="76" y="290" width="88" height="44" rx="4" fill="#0E1A14"/>
                {/* Screen glow */}
                <rect x="78" y="292" width="84" height="40" rx="3" fill="#0E1A14"/>
                <rect x="80" y="294" width="80" height="36" rx="2" fill="#1C3828" opacity="0.8"/>
                {/* Code lines on screen */}
                <rect x="84" y="299" width="36" height="2.5" rx="1" fill="#A8E6CF" opacity="0.7"/>
                <rect x="84" y="305" width="52" height="2.5" rx="1" fill="#7A9E7E" opacity="0.5"/>
                <rect x="84" y="311" width="28" height="2.5" rx="1" fill="#A8E6CF" opacity="0.55"/>
                <rect x="84" y="317" width="44" height="2.5" rx="1" fill="#7A9E7E" opacity="0.45"/>
                {/* Cursor blink */}
                <rect x="116" y="311" width="2" height="6" rx="1" fill="#A8E6CF" opacity="0.9"/>
                {/* Laptop base */}
                <rect x="66" y="340" width="108" height="6" rx="3" fill="#2A3530"/>
              </svg>

              {/* Name caption */}
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '2rem 1.25rem 1rem',
                background: 'linear-gradient(to top, rgba(10,18,14,0.85) 0%, transparent 100%)' }}>
                <p style={{ fontFamily: 'var(--font-inter)', fontSize: 12, color: 'rgba(168,230,207,0.9)', letterSpacing: '0.1em', fontWeight: 500 }}>Sherina Zheng</p>
                <p style={{ fontFamily: 'var(--font-inter)', fontSize: 10, color: 'rgba(255,255,255,0.35)', marginTop: 2, letterSpacing: '0.04em' }}>Designer · Builder · Thinker</p>
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
