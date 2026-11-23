import Link from 'next/link'
import { notFound } from 'next/navigation'
import { projects } from '../../../lib/projects'
import { SignHeader, Bullet } from '../../../components/Station'

export function generateStaticParams() {
  return projects.map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const p = projects.find(x => x.slug === slug)
  return { title: p ? `${p.title} — Sherina Zheng` : 'Sherina Zheng' }
}

export default async function CasePage({ params }) {
  const { slug } = await params
  const i = projects.findIndex(p => p.slug === slug)
  if (i === -1) notFound()
  const p = projects[i]
  const prev = projects[i - 1]
  const next = projects[i + 1]

  return (
    <article style={{ '--line': p.line }}>
      <SignHeader
        where={['Stop ' + String(i + 1).padStart(2, '0'), p.org, p.year].filter(Boolean).join(' · ')}
        title={p.title}
        bullet={p.bullet}
        color={p.line}
        lede={p.subtitle}
        tags={[
          { letter: 'R', color: p.line, label: p.role },
          ...(p.status ? [{ letter: '→', color: '#0039A6', label: p.status }] : []),
        ]}
      />

      <section className="case-body">
        <div className="wrap case-grid">
          <div>
            <span className="label">Overview</span>
            <p className="case-lede">{p.summary}</p>
            <div className="case-tags">{p.tags.map(t => <span key={t}>{t}</span>)}</div>
          </div>
          <div>
            <span className="label">What I owned</span>
            <ol className="owned">
              {p.owned.map((o, n) => (
                <li key={o}><span className="owned-n">{n + 1}</span><span>{o}</span></li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {p.brochure && (
        <section id="brochure" className="brochure">
          <div className="wrap">
            <div className="brochure-head">
              <div>
                <span className="label light">Artifact</span>
                <h2 className="sec-title light">{p.brochure.title}</h2>
                <p className="brochure-note">{p.brochure.note}</p>
              </div>
              <a href={p.brochure.pdf} className="ride" target="_blank" rel="noreferrer">Open the PDF ↗</a>
            </div>
            <ol className="brochure-pages">
              {p.brochure.pages.map((src, n) => (
                <li key={src}>
                  <a href={src} target="_blank" rel="noreferrer" aria-label={`Open brochure page ${n + 1} full size`}>
                    <img src={src} alt={`${p.brochure.title}, page ${n + 1} of ${p.brochure.pages.length}`} loading="lazy" width="1275" height="1650" />
                  </a>
                  <span className="page-n"><span className="bul bul-sm" style={{ background: p.line }}>{n + 1}</span>Page {n + 1}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      <nav className="case-nav" aria-label="Other stops">
        <div className="wrap case-nav-grid">
          {prev ? (
            <Link href={`/work/${prev.slug}`} className="case-nav-link" style={{ '--c': prev.line }}>
              <span className="label light">← Previous stop</span>
              <span className="case-nav-title"><Bullet letter={prev.bullet} color={prev.line} size="md" />{prev.title}</span>
            </Link>
          ) : <Link href="/work" className="case-nav-link" style={{ '--c': '#FCCC0A' }}><span className="label light">← Back to</span><span className="case-nav-title">Line map</span></Link>}
          {next ? (
            <Link href={`/work/${next.slug}`} className="case-nav-link right" style={{ '--c': next.line }}>
              <span className="label light">Next stop →</span>
              <span className="case-nav-title">{next.title}<Bullet letter={next.bullet} color={next.line} size="md" /></span>
            </Link>
          ) : <Link href="/work" className="case-nav-link right" style={{ '--c': '#FCCC0A' }}><span className="label light">End of the line →</span><span className="case-nav-title">Line map</span></Link>}
        </div>
      </nav>

      <style>{`
        .case-body { padding: clamp(56px, 9vh, 104px) 0; }
        .case-grid { display: grid; grid-template-columns: 1.1fr 1fr; gap: clamp(32px, 6vw, 96px); align-items: start; }
        .case-lede { font: 500 clamp(22px, 2.2vw, 30px)/1.4 var(--sans); letter-spacing: -.015em; }
        .case-tags { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 28px; }
        .case-tags span { font: 800 13px var(--sans); letter-spacing: .06em; text-transform: uppercase; border: 2px solid var(--ink); padding: 6px 10px; }
        .owned { list-style: none; border-top: 2px solid var(--ink); }
        .owned li { display: grid; grid-template-columns: 44px 1fr; gap: 16px; align-items: center; padding: 18px 0; border-bottom: 1px solid rgba(15,15,15,.2); font: 800 clamp(18px, 1.6vw, 22px)/1.35 var(--sans); letter-spacing: -.01em; }
        .owned-n { width: 44px; height: 44px; display: grid; place-items: center; background: var(--line); color: #fff; font: 900 20px var(--sans); }
        .brochure { background: var(--black); color: #fff; padding: clamp(64px, 10vh, 112px) 0 clamp(48px, 8vh, 88px); border-bottom: 2px solid rgba(255,255,255,.2); }
        .brochure-head { display: flex; flex-wrap: wrap; align-items: flex-end; justify-content: space-between; gap: 24px; margin-bottom: 40px; }
        .brochure-head .sec-title { margin-bottom: 14px; }
        .brochure-note { font: 500 18px/1.55 var(--sans); color: #ddd; max-width: 40rem; }
        .brochure-pages { list-style: none; display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 20px; }
        .brochure-pages a { display: block; background: #fff; padding: 6px; transition: transform .25s cubic-bezier(.3,1.6,.5,1); }
        .brochure-pages a:hover { transform: translateY(-6px); }
        .brochure-pages img { display: block; width: 100%; height: auto; }
        .page-n { display: inline-flex; align-items: center; gap: 10px; margin-top: 14px; font: 800 14px var(--sans); letter-spacing: .06em; text-transform: uppercase; }
        .case-nav { background: var(--black); color: #fff; }
        .case-nav-grid { display: grid; grid-template-columns: 1fr 1fr; }
        .case-nav-link { display: block; padding: 36px 0; color: #fff; text-decoration: none; border-top: 8px solid var(--c); }
        .case-nav-link.right { text-align: right; }
        .case-nav-title { display: inline-flex; align-items: center; gap: 14px; font: 900 clamp(28px, 3.4vw, 52px)/1 var(--sans); letter-spacing: -.04em; }
        .case-nav-link:hover .case-nav-title { color: var(--yellow); }
        @media (max-width: 900px) {
          .case-grid { grid-template-columns: 1fr; }
          .case-nav-grid { grid-template-columns: 1fr; }
          .brochure-pages { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          .case-nav-link.right { text-align: left; }
        }
      `}</style>
    </article>
  )
}
