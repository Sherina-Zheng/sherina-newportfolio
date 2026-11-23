'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform, useReducedMotion, useMotionValueEvent } from 'framer-motion'
import { projects } from '../lib/projects'
import { Bullet, Poster } from '../components/Station'
import Weather from '../components/Weather'

const EMAIL = 'zhengsherina@gmail.com'
const LINKEDIN = 'https://www.linkedin.com/in/sherina-zheng-48b287224/'
const stops = projects.slice(0, 3)
const earlier = projects.slice(3)
const BAR = 64 // height of the sign bar the name docks into

/* ── the station sign: full-width name that docks into the top bar as you scroll ── */
function StationSign() {
  const reduce = useReducedMotion()
  const { scrollY } = useScroll()
  const [vh, setVh] = useState(900)
  const [vw, setVw] = useState(1440)
  useEffect(() => {
    const on = () => { setVh(window.innerHeight); setVw(window.innerWidth) }
    on(); window.addEventListener('resize', on)
    return () => window.removeEventListener('resize', on)
  }, [])
  const mobile = vw < 720
  const signH = Math.round(vh * 0.5)
  const travel = Math.max(1, signH - BAR)
  const p = useTransform(scrollY, v => reduce ? 0 : Math.min(1, Math.max(0, v / travel)))

  const pad = mobile ? 20 : Math.min(44, Math.max(20, vw * 0.031))
  const bulStart = mobile ? 64 : 150
  const bulEnd = 32
  const nameSize = mobile ? Math.min(vw * 0.215, 104) : Math.min(vw * 0.118, 176)
  const nameEnd = 22
  const nameTop = mobile ? 100 : 100
  const nameLeft = mobile ? pad : pad + bulStart + 30
  const bulTop = mobile ? nameTop - bulStart - 14 : nameTop + nameSize * 0.02

  const bulScale = useTransform(p, [0, 1], [1, bulEnd / bulStart])
  const bulY = useTransform(p, [0, 1], [0, (BAR - bulEnd) / 2 - bulTop])
  const nameScale = useTransform(p, [0, 1], [1, nameEnd / nameSize])
  const nameX = useTransform(p, [0, 1], [0, pad + bulEnd + 12 - nameLeft])
  const nameY = useTransform(p, [0, 1], [0, (BAR - nameEnd * (mobile ? 1.72 : 0.86)) / 2 - nameTop])
  const panelY = useTransform(p, v => -v * travel)
  const fade = useTransform(p, [0, 0.45], [1, 0])

  return (
    <div className={`sign-layer ${reduce ? 'static' : ''}`}>
      <motion.div className="sign-panel" style={{ height: signH, y: panelY }} />
      <div className="sign-rule" />
      <nav className="sign-nav" aria-label="Main">
        <motion.span className="sign-where" style={{ opacity: fade }}>Long Island City · Queens · NYC</motion.span>
        <div className="sign-right">
          <Weather className="weather-bar" />
          <div className="sign-links">
            <Link href="/work">Work</Link><Link href="/about">About</Link><Link href="/contact">Contact</Link>
          </div>
        </div>
      </nav>
      <motion.span className="sign-bullet" style={{ top: bulTop, left: pad, width: bulStart, height: bulStart, fontSize: bulStart * 0.62, scale: bulScale, y: bulY }}>S</motion.span>
      <motion.h1 className="sign-name" style={{ top: nameTop, left: nameLeft, fontSize: nameSize, scale: nameScale, x: nameX, y: nameY }}>
        <a href="#top" aria-label="Sherina Zheng, back to top">Sherina{mobile ? <br /> : ' '}Zheng</a>
      </motion.h1>
      <motion.div className="sign-tags" style={{ top: signH - (mobile ? 128 : 88), left: pad, opacity: fade, y: panelY }}>
        <span><Bullet letter="P" color="#EE352E" />Product Owner</span>
        <span><Bullet letter="D" color="#00933C" />Data</span>
        <span><Bullet letter="3" color="#0039A6" />EN · 中文 · 粵語</span>
        <Weather className="weather-tag" />
      </motion.div>
    </div>
  )
}

const rise = { hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 260, damping: 30 } } }

function Stop({ p, i }) {
  const now = i === 0
  return (
    <motion.article id={p.slug} className="stop" style={{ '--line': p.line }}
      initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}>
      <motion.span className={`stop-dot ${now ? 'now' : ''}`}
        variants={{ hidden: { scale: 0.2, y: -24, opacity: 0 }, show: { scale: 1, y: 0, opacity: 1, transition: { type: 'spring', stiffness: 520, damping: 18 } } }} />
      <motion.div className="stop-meta" variants={rise}>
        <Bullet letter={p.bullet} color={p.line} size="sm" />
        <span>{[p.org, p.year].filter(Boolean).join(' · ')}</span>
        {now && <span className="here">You are here</span>}
      </motion.div>
      <motion.h3 className="stop-title" variants={rise}>
        <Link href={`/work/${p.slug}`}>{p.title}</Link>
      </motion.h3>
      <motion.p className="stop-sub" variants={rise}>{p.subtitle}</motion.p>
      <motion.div className="stop-body" variants={rise}>
        <p>{p.summary}</p>
        <div>
          <span className="label">What I owned</span>
          <ul>{p.owned.map(o => <li key={o}>{o}</li>)}</ul>
          <div className="stop-links">
            <Link className="stop-link" href={`/work/${p.slug}`}>Go to this stop →</Link>
            {p.brochure && <Link className="stop-link" href={`/work/${p.slug}#brochure`}>See the brochure →</Link>}
          </div>
        </div>
      </motion.div>
    </motion.article>
  )
}

export default function Home() {
  const reduce = useReducedMotion()

  /* route line draws itself and the train rides it */
  const routeRef = useRef(null)
  const { scrollYProgress: routeP } = useScroll({ target: routeRef, offset: ['start 75%', 'end 70%'] })
  const lineClip = useTransform(routeP, v => `inset(0 0 ${(reduce ? 0 : 1 - v) * 100}% 0 round 8px)`)
  const trainTop = useTransform(routeP, v => `${(reduce ? 0 : v) * 100}%`)

  const { scrollY } = useScroll()
  const [deep, setDeep] = useState(false)
  useMotionValueEvent(scrollY, 'change', v => setDeep(v > 1200))

  /* notes wall (kept from the original site) */
  const [noteOpen, setNoteOpen] = useState(false)
  const [noteMsg, setNoteMsg] = useState('')
  const [noteState, setNoteState] = useState('idle')
  const [pastNotes, setPastNotes] = useState([])
  useEffect(() => { fetch('/api/notes').then(r => r.json()).then(d => Array.isArray(d) && setPastNotes(d)).catch(() => {}) }, [])
  useEffect(() => {
    if (!noteOpen) return
    const k = e => { if (e.key === 'Escape') setNoteOpen(false) }
    window.addEventListener('keydown', k); return () => window.removeEventListener('keydown', k)
  }, [noteOpen])
  async function submitNote(e) {
    e.preventDefault()
    const text = noteMsg.trim(); if (!text) return
    setNoteState('sending')
    try {
      const r = await fetch('/api/notes', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ text }) })
      if (!r.ok) throw new Error()
      setNoteMsg(''); setNoteState('sent')
      fetch('/api/notes').then(r => r.json()).then(d => Array.isArray(d) && setPastNotes(d)).catch(() => {})
    } catch { setNoteState('error') }
  }

  const trackGradient = `linear-gradient(${stops.map((p, i) => `${p.line} ${Math.round(i / stops.length * 100)}% ${Math.round((i + 1) / stops.length * 100)}%`).join(',')})`

  return (
    <div className="home" id="top">
      <StationSign />

      {/* ── NEXT STOP ── */}
      <section className="next">
        <div className="wrap next-grid">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 28 }}>
            <p className="kicker">Next stop</p>
            <p className="next-dest">A full-time product role</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.32, type: 'spring', stiffness: 200, damping: 28 }}>
            <p className="next-copy">I&rsquo;m the person between the business and the dev team who keeps the train on schedule. Currently owning <b>CognitMES</b> at Ranial Systems.</p>
            <a href="#line" className="ride">Ride the line <span aria-hidden="true">↓</span></a>
          </motion.div>
        </div>
      </section>

      {/* ── THE LINE + PLATFORM POSTER ── */}
      <section id="line" className="line-sec">
        <div className="wrap">
          <motion.h2 className="sec-title" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
            The line so far
          </motion.h2>
          <div className="line-grid">
            <div className="route" ref={routeRef}>
              <div className="track" aria-hidden="true">
                <div className="track-ghost" />
                <motion.div className="track-fill" style={{ clipPath: lineClip, background: trackGradient }} />
                <motion.span className="train" style={{ top: trainTop }}>S</motion.span>
              </div>
              {stops.map((p, i) => <Stop key={p.slug} p={p} i={i} />)}
            </div>
            <aside className="poster-rail">
              <motion.div initial={{ opacity: 0, y: 40, rotate: -1.5 }} whileInView={{ opacity: 1, y: 0, rotate: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ type: 'spring', stiffness: 160, damping: 22 }}>
                <Poster />
              </motion.div>
            </aside>
          </div>
          <div className="earlier">
            <span className="label">Earlier stops</span>
            {earlier.map(p => <Link key={p.slug} href={`/work/${p.slug}`}><Bullet letter={p.bullet} color={p.line} size="sm" />{p.title}</Link>)}
            <Link href="/work" className="all">Full line map →</Link>
          </div>
        </div>
      </section>

      {/* ── TRANSFER BOARD ── */}
      <section className="dark-band">
        <div className="wrap">
          <motion.h2 className="sec-title light" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>Transfer here</motion.h2>
          <div className="board">
            {[
              ['L', '#A7A9AC', 'Languages', 'English · 中文 · 粵語'],
              ['T', '#00933C', 'Toolkit', 'Notion · Jira · Figma · SQL · React'],
              ['F', '#FF6319', 'Focus', 'B2B products · FinTech & payments · Manufacturing software'],
              ['E', '#0039A6', 'Education', 'BBA, Computer Information Systems & Data Analytics — Baruch College'],
            ].map(([l, c, k, v], i) => (
              <motion.div key={k} className="board-row" initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ delay: i * 0.06, type: 'spring', stiffness: 420, damping: 32 }}>
                <Bullet letter={l} color={c} size="lg" /><span className="board-k">{k}</span><span className="board-v">{v}</span>
              </motion.div>
            ))}
          </div>
          <blockquote className="motto">&ldquo;Progress begins with bare bones.&rdquo;</blockquote>
          <Link href="/about" className="motto-link">Read my story →</Link>
        </div>
      </section>

      {/* ── TERMINAL: the contact sign ── */}
      <section className="terminal">
        <motion.div className="tablet" initial={{ opacity: 0, scale: 0.96 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, amount: 0.4 }} transition={{ type: 'spring', stiffness: 220, damping: 26 }}>
          <div className="tablet-face">
            <p className="kicker dark">Hiring a Product Owner?</p>
            <p className="tablet-name">Let&rsquo;s talk.</p>
            <div className="tablet-actions">
              <a href={`mailto:${EMAIL}`} className="ride">{EMAIL}</a>
              <a href={LINKEDIN} target="_blank" rel="noreferrer" className="ride ghost">LinkedIn ↗</a>
            </div>
            <button className="note-link" onClick={() => { setNoteState('idle'); setNoteOpen(true) }}>Or leave a note at the station</button>
          </div>
        </motion.div>
        <p className="colophon">© {new Date().getFullYear()} Sherina Zheng · All rights reserved</p>
      </section>

      {noteOpen && (
        <div className="modal" role="dialog" aria-modal="true" aria-labelledby="note-title" onClick={e => { if (e.target === e.currentTarget) setNoteOpen(false) }}>
          <div className="modal-card">
            <button className="modal-x" onClick={() => setNoteOpen(false)} aria-label="Close">×</button>
            <p id="note-title" className="modal-title">Leave a note</p>
            <p className="modal-sub">Everyone who passes through can read it. 160 characters max.</p>
            <form onSubmit={submitNote}>
              <label className="field"><span>Your note</span>
                <textarea autoFocus rows={4} value={noteMsg} maxLength={160} placeholder="Say hi…"
                  onChange={e => { setNoteMsg(e.target.value); if (noteState !== 'sending') setNoteState('idle') }} />
              </label>
              <div className="modal-row">
                <button type="submit" className="ride" disabled={!noteMsg.trim() || noteState === 'sending'}>{noteState === 'sending' ? 'Posting…' : 'Post note'}</button>
                <span className="modal-status">{noteState === 'sent' && 'Posted. Thank you!'}{noteState === 'error' && 'Could not post. Try again.'}</span>
              </div>
            </form>
            {pastNotes.length > 0 && <div className="notes"><span className="label">On the wall</span>{pastNotes.map((n, i) => <p key={i}>{n.text}</p>)}</div>}
          </div>
        </div>
      )}

      <button className="to-top" aria-label="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        style={{ opacity: deep ? 1 : 0, pointerEvents: deep ? 'auto' : 'none' }}>↑</button>

      <style>{`
        .home { overflow-x: clip; }

        /* sign */
        .sign-layer { position:fixed; inset:0 0 auto 0; height:0; z-index:40; pointer-events:none; }
        .sign-layer.static { position:absolute; }
        .sign-layer a { pointer-events:auto; }
        .sign-panel { position:absolute; left:0; right:0; top:0; background:var(--black); box-shadow:0 10px 30px rgba(0,0,0,.18); }
        .sign-rule { position:absolute; left:0; right:0; top:10px; height:2px; background:#fff; opacity:.9; }
        .sign-nav { position:absolute; left:var(--pad); right:var(--pad); top:0; height:${BAR}px; display:flex; align-items:center; justify-content:space-between; color:#fff; z-index:2; }
        .sign-where { font: 500 14px var(--sans); color:#cfcfcf; padding-left:44px; }
        .sign-right { display:flex; align-items:center; gap:28px; }
        .weather-bar { padding-right:28px; border-right:1px solid rgba(255,255,255,.3); }
        .sign-tags .weather-tag { display:none; }
        .sign-links { display:flex; gap:26px; }
        .sign-links a { color:#fff; text-decoration:none; font:800 15px var(--sans); padding:10px 0; }
        .sign-links a:hover { color:var(--yellow); }
        .sign-bullet { position:absolute; display:grid; place-items:center; border-radius:50%; background:var(--purple); color:#fff; font-family:var(--sans); font-weight:800; transform-origin:0 0; line-height:1; }
        .sign-name { position:absolute; margin:0; font-family:var(--sans); font-weight:900; line-height:.86; letter-spacing:-.035em; color:#fff; transform-origin:0 0; white-space:nowrap; }
        .sign-name a { color:inherit; text-decoration:none; }
        .sign-tags { position:absolute; display:flex; flex-wrap:wrap; gap:14px 30px; color:#fff; font:800 clamp(17px,1.7vw,24px) var(--sans); }
        .sign-tags > span { display:inline-flex; align-items:center; gap:12px; }
        .sign-tags .bul { width:42px; height:42px; font-size:24px; }

        /* next stop */
        .next { padding-top: 50svh; min-height: 100svh; display:flex; align-items:center; }
        .next-grid { display:grid; grid-template-columns: 1.15fr 1fr; gap: clamp(24px,5vw,80px); align-items:end; padding-top: clamp(28px,5vh,56px); padding-bottom: clamp(36px,6vh,64px); }
        .kicker { font: 800 clamp(20px,1.8vw,26px)/1 var(--sans); letter-spacing:-.01em; color: var(--purple); margin-bottom: 12px; }
        .kicker.dark { color: var(--ink); }
        .next-dest { font: 900 clamp(52px,6.6vw,104px)/.92 var(--sans); letter-spacing:-.045em; max-width: 9.5em; }
        .next-copy { font: 500 clamp(18px,1.5vw,21px)/1.5 var(--sans); max-width: 34rem; margin-bottom: 24px; }
        .next-copy b { font-weight: 800; }

        /* the line */
        .line-sec { padding: clamp(64px,10vh,120px) 0 clamp(56px,8vh,96px); background-color: var(--tile);
          background-image: linear-gradient(rgba(15,15,15,.06) 1px, transparent 1px), linear-gradient(90deg, rgba(15,15,15,.06) 1px, transparent 1px); background-size: 120px 60px; }
        .line-grid { display:grid; grid-template-columns: minmax(0,1fr) clamp(280px,24vw,360px); gap: clamp(32px,4vw,72px); align-items:start; }
        .poster-rail { position: sticky; top: 112px; }
        .train { position:absolute; left:50%; width: 44px; height: 30px; margin: -15px 0 0 -22px; border-radius: 10px; background: var(--ink); color:#fff; display:grid; place-items:center; font:800 15px var(--sans); box-shadow: 0 0 0 4px var(--tile); }
        .stop-title a { color: inherit; text-decoration: none; }
        .stop-title a:hover { text-decoration: underline; text-decoration-thickness: 6px; text-underline-offset: 8px; text-decoration-color: var(--line); }
        .stop-body { display:grid; grid-template-columns: 1fr 1fr; gap: clamp(24px,3vw,48px); margin-top: 26px; }
        .stop-body > p { font: 500 17px/1.6 var(--sans); color:#2b2b2b; }
        .stop-body ul { list-style:none; display:grid; gap: 8px; margin-bottom: 16px; }
        .stop-body li { font: 500 16px/1.45 var(--sans); padding-left: 18px; position:relative; }
        .stop-body li::before { content:''; position:absolute; left:0; top:.5em; width:8px; height:8px; border-radius:50%; background: var(--line); }
        .stop-links { display:flex; flex-wrap:wrap; gap: 10px 22px; }
        .stop-link { font: 800 15px var(--sans); color: var(--ink); text-decoration: none; border-bottom: 3px solid var(--line); padding-bottom: 2px; }
        .earlier { display:flex; flex-wrap:wrap; align-items:center; gap: 12px 24px; padding: 28px 0 0 clamp(64px,8vw,120px); border-top: 3px solid var(--ink); margin-top: 8px; }
        .earlier .label { margin:0; }
        .earlier a { display:inline-flex; align-items:center; gap:10px; color: var(--ink); text-decoration:none; font: 800 18px var(--sans); min-height:44px; }
        .earlier a:hover { text-decoration: underline; }
        .earlier .all { margin-left:auto; }

        /* transfer */
        .motto { margin-top: clamp(56px,9vh,96px); font: 900 clamp(40px,5.4vw,80px)/1 var(--sans); letter-spacing:-.045em; max-width: 13em; }
        .motto-link { display:inline-block; margin-top: 22px; color: var(--yellow); font: 800 17px var(--sans); text-decoration:none; border-bottom: 2px solid currentColor; padding-bottom: 3px; }

        /* terminal */
        .terminal { padding: clamp(72px,11vh,128px) var(--pad) 40px; background-color:#E9E6DC;
          background-image: linear-gradient(#d6d2c5 2px, transparent 2px), linear-gradient(90deg, #d6d2c5 2px, transparent 2px); background-size: 96px 48px; }
        .tablet { max-width: 980px; margin: 0 auto; background:var(--black); padding: 14px; box-shadow: 0 24px 60px rgba(0,0,0,.18); }
        .tablet-face { background: var(--tile); margin: 0; padding: clamp(40px,7vh,72px) clamp(24px,5vw,64px); text-align:center; }
        .tablet-name { font: 900 clamp(64px,9vw,140px)/.9 var(--sans); letter-spacing:-.05em; margin: 6px 0 30px; }
        .tablet-actions { display:flex; flex-wrap:wrap; justify-content:center; gap: 12px; }
        .note-link { margin-top: 22px; background:none; border:none; font: 800 15px var(--sans); color: var(--ink); text-decoration: underline; text-underline-offset: 5px; cursor:pointer; min-height:44px; }
        .colophon { text-align:center; margin-top: 40px; font: 500 14px var(--sans); color:#444; }

        /* modal */
        .modal { position:fixed; inset:0; z-index:100; display:flex; align-items:center; justify-content:center; padding:16px; background:rgba(15,15,15,.6); }
        .modal-card { position:relative; width:min(520px,100%); max-height:85vh; overflow-y:auto; background: var(--tile); padding: clamp(24px,5vw,40px); border-top: 10px solid var(--purple); }
        .modal-x { position:absolute; top:8px; right:8px; width:44px; height:44px; background:none; border:none; font-size:26px; cursor:pointer; }
        .modal-title { font: 900 34px/1 var(--sans); letter-spacing:-.03em; }
        .modal-sub { font: 500 15px var(--sans); color:#444; margin: 8px 0 18px; }
        .modal-row { margin-top: 14px; display:flex; align-items:center; gap:14px; }
        .modal-status { font: 800 14px var(--sans); }
        .notes { margin-top: 24px; padding-top: 16px; border-top: 2px solid var(--ink); display:grid; gap:8px; }
        .notes p { background:#fff; padding:10px 12px; font: 500 15px/1.45 var(--sans); }

        .to-top { position:fixed; right:20px; bottom:20px; z-index:50; width:52px; height:52px; border-radius:50%; background: var(--ink); color:#fff; border:none; font: 800 22px var(--sans); cursor:pointer; transition: opacity .3s; }

        @media (max-width: 1100px) {
          .line-grid { grid-template-columns: 1fr; }
          .poster-rail { position: static; max-width: 420px; order: -1; margin: 0 0 56px clamp(64px,8vw,120px); }
        }
        @media (max-width: 900px) {
          .next-grid { grid-template-columns: 1fr; align-items:start; }
          .stop-body { grid-template-columns: 1fr; }
        }
        @media (max-width: 720px) {
          .next { min-height: auto; }
          .sign-where { display:none; }
          .sign-links { margin-left:auto; gap: 18px; }
          .sign-right { margin-left:auto; }
          .weather-bar { display:none !important; }
          .sign-tags .weather-tag { display:inline-flex; font-size:15px; }
          .sign-links a { font-size: 14px; }
          .sign-tags { gap: 10px 18px; }
          .sign-tags .bul { width:30px; height:30px; font-size:17px; }
          .earlier .all { margin-left: 0; }
          .tablet { padding: 10px; }
          .terminal { padding-bottom: 96px; }
          .poster-rail { margin-left: 0; }
        }
      `}</style>
    </div>
  )
}
