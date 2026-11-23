'use client'
import { useState } from 'react'
import { SignHeader, Bullet } from '../../components/Station'

const socials = [
  { letter: 'E', color: '#0039A6', label: 'Email',    value: 'zhengsherina@gmail.com', href: 'mailto:zhengsherina@gmail.com' },
  { letter: 'L', color: '#A7A9AC', label: 'LinkedIn', value: '/in/sherina-zheng',      href: 'https://www.linkedin.com/in/sherina-zheng-48b287224/' },
  { letter: 'T', color: '#00933C', label: 'Phone',    value: '+1 (347) 506-7548',      href: 'tel:+13475067548' },
]

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSending(true)
    setError('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('send failed')
      setSent(true)
      setForm({ name: '', email: '', message: '' })
    } catch {
      setError('That didn’t go through. Please email me directly at zhengsherina@gmail.com.')
    } finally {
      setSending(false)
    }
  }

  return (
    <>
      <SignHeader
        where="Contact · Long Island City, Queens"
        title="Let’s talk."
        bullet="S"
        lede="Hiring a Product Owner, want to collaborate, or just want to say hi? My inbox is open."
      />

      <section className="contact-sec">
        <div className="wrap contact-grid">
          <div>
            <h2 className="contact-h">Send a message</h2>
            {sent ? (
              <div className="sent" role="status">
                <span className="bul bul-lg" style={{ background: '#00933C' }}>✓</span>
                <div>
                  <p className="sent-t">Message sent.</p>
                  <p className="sent-p">Thanks! I&rsquo;ll get back to you within a day or two.</p>
                  <button className="ride ghost" onClick={() => setSent(false)}>Send another</button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form">
                <label className="field"><span>Name</span>
                  <input type="text" required autoComplete="name" placeholder="Your name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
                </label>
                <label className="field"><span>Email</span>
                  <input type="email" required autoComplete="email" placeholder="you@company.com" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
                </label>
                <label className="field"><span>Message</span>
                  <textarea required rows={6} placeholder="What are you hiring for or working on?" value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} />
                </label>
                <div className="form-row">
                  <button type="submit" className="ride" disabled={sending}>{sending ? 'Sending…' : 'Send message'}</button>
                  {error && <p className="form-error" role="alert">{error}</p>}
                </div>
              </form>
            )}
          </div>

          <aside>
            <h2 className="contact-h">Find me here</h2>
            <div className="board">
              {socials.map(s => (
                <a key={s.label} href={s.href} target={s.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" className="board-row contact-row">
                  <Bullet letter={s.letter} color={s.color} size="lg" />
                  <span className="board-k">{s.label}</span>
                  <span className="contact-v">{s.value}{s.href.startsWith('http') ? ' ↗' : ''}</span>
                </a>
              ))}
            </div>
            <div className="status-card">
              <span className="here">Now boarding</span>
              <p>Open to full-time product roles and interesting collaborations. I usually reply within 24–48 hours.</p>
            </div>
          </aside>
        </div>
      </section>

      <style>{`
        .contact-sec { padding: clamp(56px, 9vh, 104px) 0; }
        .contact-grid { display: grid; grid-template-columns: 1.2fr 1fr; gap: clamp(36px, 6vw, 96px); align-items: start; }
        .contact-h { font: 900 clamp(28px, 2.6vw, 40px)/1 var(--sans); letter-spacing: -.04em; margin-bottom: 24px; }
        .contact-form { display: grid; gap: 20px; }
        .form-row { display: flex; flex-wrap: wrap; align-items: center; gap: 16px; }
        .form-error { font: 800 15px/1.4 var(--sans); color: #B3261E; }
        .contact-row { grid-template-columns: 52px 110px 1fr; color: var(--ink); text-decoration: none; }
        .contact-row:hover .contact-v { text-decoration: underline; text-underline-offset: 5px; }
        .contact-v { font: 800 clamp(17px, 1.5vw, 21px)/1.3 var(--sans); overflow-wrap: anywhere; }
        .status-card { margin-top: 28px; background: var(--black); color: #fff; padding: 22px 24px; }
        .status-card p { margin-top: 12px; font: 500 17px/1.55 var(--sans); }
        .sent { display: flex; gap: 18px; align-items: flex-start; border: 2px solid var(--ink); background: #fff; padding: 24px; }
        .sent-t { font: 900 30px/1 var(--sans); letter-spacing: -.03em; }
        .sent-p { font: 500 17px/1.5 var(--sans); margin: 8px 0 18px; }
        @media (max-width: 900px) { .contact-grid { grid-template-columns: 1fr; } .contact-row { grid-template-columns: 52px 1fr; } }
      `}</style>
    </>
  )
}
