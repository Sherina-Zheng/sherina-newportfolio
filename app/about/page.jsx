import Link from 'next/link'
import { SignHeader, Bullet, Poster } from '../../components/Station'

export const metadata = { title: 'About — Sherina Zheng' }

const skills = [
  { letter: 'P', color: '#EE352E', cat: 'Product',   items: 'Product strategy · Roadmapping · User stories · Sprint planning · Stakeholder management' },
  { letter: 'D', color: '#B933AD', cat: 'Design',    items: 'UX research · UI design · Prototyping · Interaction design · Design systems' },
  { letter: 'T', color: '#00933C', cat: 'Tools',     items: 'Notion · Jira · Figma · FigJam · Supabase' },
  { letter: 'A', color: '#0039A6', cat: 'Technical', items: 'Data analytics · SQL · React / Next.js · Python (basics) · A/B testing' },
  { letter: 'L', color: '#FCCC0A', cat: 'Languages', items: 'English · 中文 · 粵語' },
]

// Journey runs newest first, like reading a line from the current stop back.
const timeline = [
  { year: 'Now',  color: '#B933AD', title: 'Product Owner — CognitMES', org: 'Ranial Systems · Long Island City',
    desc: 'Own CognitMES, a manufacturing execution system heading toward pilot: setting feature priorities with the dev team, running the weekly product sync, and writing the manual and onboarding materials.' },
  { year: '2025', color: '#0039A6', title: 'Product Operations Manager', org: 'CodePay',
    desc: 'Ran merchant onboarding, payment terminal logistics and bilingual partner communications for a B2B payments business.' },
  { year: '2024', color: '#FF6319', title: 'ISO Boarding Associate', org: 'Financial Technology',
    desc: 'Worked with the product team on an online booking system for beauty salons, connecting merchants, staff and customers.' },
  { year: '2024', color: '#00933C', title: 'BBA, CIS & Data Analytics', org: 'Baruch College, Zicklin School of Business',
    desc: 'Computer Information Systems and Data Analytics, minor in Mathematics. The habit of turning numbers into product decisions started here.' },
]

export default function AboutPage() {
  const gradient = `linear-gradient(180deg, ${timeline.map((t, i) => `${t.color} ${(i / timeline.length) * 100}% ${((i + 1) / timeline.length) * 100}%`).join(', ')})`
  return (
    <>
      <SignHeader
        where="About · Queens, New York"
        title="The person behind the work"
        bullet="S"
        tags={[
          { letter: 'P', color: '#EE352E', label: 'Product Owner' },
          { letter: 'D', color: '#00933C', label: 'Data' },
          { letter: '3', color: '#0039A6', label: 'EN · 中文 · 粵語' },
        ]}
      />

      <section className="about-intro">
        <div className="wrap about-grid">
          <Poster caption="Platform poster" />
          <div>
            <p className="about-big">Systems thinker. Builder. Somewhere between the business and the code.</p>
            <p className="about-p">I sit at the intersection of product and operations, bridging strategy and execution. I drive cross-functional work, streamline product workflows, and turn ambiguous problems into clear, shippable steps.</p>
            <p className="about-p">With a background in data analytics and a growing edge in UI/UX and front-end development, I bring analytical rigor and a designer&rsquo;s eye to everything I build.</p>
            <blockquote className="about-quote">&ldquo;Progress begins with bare bones.&rdquo;</blockquote>
          </div>
        </div>
      </section>

      <section className="journey">
        <div className="wrap">
          <h2 className="sec-title">Journey</h2>
          <div className="route">
            <div className="track" aria-hidden="true"><div className="track-fill" style={{ background: gradient }} /></div>
            {timeline.map((t, i) => (
              <div key={t.title} className="stop">
                <span className={`stop-dot ${i === 0 ? 'now' : ''}`} aria-hidden="true" />
                <div className="stop-meta">
                  <Bullet letter={t.year === 'Now' ? 'N' : t.year.slice(2)} color={t.color} size="sm" />
                  <span>{t.year} · {t.org}</span>
                  {i === 0 && <span className="here">You are here</span>}
                </div>
                <h3 className="journey-title">{t.title}</h3>
                <p className="journey-desc">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="dark-band">
        <div className="wrap">
          <h2 className="sec-title light">Transfer here</h2>
          <div className="board">
            {skills.map(s => (
              <div key={s.cat} className="board-row">
                <Bullet letter={s.letter} color={s.color} size="lg" />
                <span className="board-k">{s.cat}</span>
                <span className="board-v">{s.items}</span>
              </div>
            ))}
          </div>
          <div className="about-actions">
            <Link href="/contact" className="ride">Work with me</Link>
            <Link href="/work" className="ride ghost on-black">See the line map</Link>
          </div>
        </div>
      </section>

      <style>{`
        .about-intro { padding: clamp(56px, 9vh, 104px) 0; }
        .about-grid { display: grid; grid-template-columns: minmax(260px, 380px) 1fr; gap: clamp(32px, 6vw, 96px); align-items: start; }
        .about-big { font: 900 clamp(32px, 3.6vw, 56px)/1.1 var(--sans); letter-spacing: -.04em; margin-bottom: 28px; }
        .about-p { font: 500 18px/1.6 var(--sans); color: #2b2b2b; max-width: 40rem; margin-bottom: 16px; }
        .about-quote { margin-top: 36px; padding-left: 20px; border-left: 10px solid var(--purple); font: 900 clamp(26px, 2.6vw, 38px)/1.1 var(--sans); letter-spacing: -.03em; }
        .journey { padding: clamp(56px, 9vh, 104px) 0; background-image: linear-gradient(rgba(15,15,15,.06) 1px, transparent 1px), linear-gradient(90deg, rgba(15,15,15,.06) 1px, transparent 1px); background-size: 120px 60px; border-top: 3px solid var(--ink); }
        .journey .stop { padding-bottom: clamp(40px, 6vh, 64px); }
        .journey-title { font: 900 clamp(30px, 3.4vw, 52px)/1 var(--sans); letter-spacing: -.04em; margin: 12px 0 10px; }
        .journey-desc { font: 500 17px/1.6 var(--sans); color: #2b2b2b; max-width: 44rem; }
        .about-actions { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 48px; }
        @media (max-width: 860px) {
          .about-grid { grid-template-columns: 1fr; }
          .about-grid .poster { max-width: 360px; }
        }
      `}</style>
    </>
  )
}
