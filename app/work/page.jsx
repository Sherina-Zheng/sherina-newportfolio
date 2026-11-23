import Link from 'next/link'
import { projects } from '../../lib/projects'
import { SignHeader, Bullet } from '../../components/Station'

export const metadata = { title: 'Line map — Sherina Zheng' }

// A strip map, like the ones above subway doors: every project is a stop on one line.
export default function WorkPage() {
  const gradient = `linear-gradient(90deg, ${projects.map((p, i) => `${p.line} ${(i / projects.length) * 100}% ${((i + 1) / projects.length) * 100}%`).join(', ')})`
  const vGradient = gradient.replace('90deg', '180deg')

  return (
    <>
      <SignHeader
        where="Work · every stop so far"
        title="Line map"
        bullet="S"
        lede="Products I’ve owned, operated and designed, from manufacturing software to payments. Pick a stop to get off and look around."
        tags={projects.map(p => ({ letter: p.bullet, color: p.line, label: p.title }))}
      />

      <section className="strip-sec">
        <div className="wrap">
          <div className="strip" style={{ '--n': projects.length }}>
            <div className="strip-track" style={{ '--g': gradient, '--vg': vGradient }} aria-hidden="true" />
            <ol className="strip-stops">
              {projects.map((p, i) => (
                <li key={p.slug} className="strip-stop" style={{ '--line': p.line }}>
                  <span className={`strip-dot ${i === 0 ? 'now' : ''}`} aria-hidden="true" />
                  <Link href={`/work/${p.slug}`} className="strip-card">
                    <span className="strip-meta"><Bullet letter={p.bullet} color={p.line} size="sm" />{p.year}</span>
                    <span className="strip-title">{p.title}</span>
                    <span className="strip-sub">{p.subtitle}</span>
                    <span className="strip-role">{p.role}</span>
                    {i === 0 && <span className="here">You are here</span>}
                    <span className="strip-go">Get off here →</span>
                  </Link>
                </li>
              ))}
            </ol>
          </div>
          <p className="strip-note">Direction of travel: newest stop first. CognitMES is in progress; the others have shipped.</p>
        </div>
      </section>

      <section className="dark-band">
        <div className="wrap work-cta">
          <h2 className="sec-title light">Hiring a Product Owner?</h2>
          <div className="work-cta-actions">
            <Link href="/contact" className="ride">Get in touch</Link>
            <Link href="/about" className="ride ghost on-black">About me</Link>
          </div>
        </div>
      </section>

      <style>{`
        .strip-sec { padding: clamp(64px, 10vh, 112px) 0; background-image: linear-gradient(rgba(15,15,15,.06) 1px, transparent 1px), linear-gradient(90deg, rgba(15,15,15,.06) 1px, transparent 1px); background-size: 120px 60px; }
        .strip { position: relative; }
        .strip-track { position: absolute; left: 0; right: 0; top: 13px; height: 16px; border-radius: 8px; background: var(--g); }
        .strip-stops { list-style: none; display: grid; grid-template-columns: repeat(var(--n), minmax(0, 1fr)); gap: 20px; position: relative; }
        .strip-dot { display: block; width: 42px; height: 42px; border-radius: 50%; background: #fff; border: 8px solid var(--ink); margin-bottom: 22px; }
        .strip-dot.now { background: var(--yellow); }
        .strip-card { display: flex; flex-direction: column; align-items: flex-start; gap: 10px; color: var(--ink); text-decoration: none; padding-right: 8px; }
        .strip-meta { display: inline-flex; align-items: center; gap: 10px; font: 800 14px var(--sans); letter-spacing: .06em; }
        .strip-title { font: 900 clamp(28px, 2.6vw, 40px)/.95 var(--sans); letter-spacing: -.04em; }
        .strip-sub { font: 500 16px/1.45 var(--sans); color: #333; }
        .strip-role { font: 800 14px var(--sans); color: var(--ink); border-left: 4px solid var(--line); padding-left: 8px; }
        .strip-go { margin-top: 6px; font: 800 15px var(--sans); border-bottom: 3px solid var(--line); padding-bottom: 2px; }
        .strip-card:hover .strip-title { text-decoration: underline; text-decoration-thickness: 5px; text-underline-offset: 6px; text-decoration-color: var(--line); }
        .strip-note { margin-top: 48px; font: 500 15px/1.5 var(--sans); color: #444; }
        .work-cta { display: flex; flex-wrap: wrap; align-items: flex-end; justify-content: space-between; gap: 24px; }
        .work-cta .sec-title { margin: 0; }
        .work-cta-actions { display: flex; flex-wrap: wrap; gap: 12px; }
        @media (max-width: 900px) {
          .strip-track { left: 13px; right: auto; top: 0; bottom: 0; width: 16px; height: auto; background: var(--vg); }
          .strip-stops { grid-template-columns: 1fr; gap: 44px; }
          .strip-stop { display: grid; grid-template-columns: 42px 1fr; gap: 20px; }
          .strip-dot { margin: 0; }
        }
      `}</style>
    </>
  )
}
