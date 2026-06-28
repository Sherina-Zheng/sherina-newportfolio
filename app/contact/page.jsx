'use client'
import { useState } from 'react'
import { FadeUp, RevealText } from '../../components/ScrollReveal'

const socials = [
  { label: 'Email', value: 'zhengsherina@gmail.com', href: 'mailto:zhengsherina@gmail.com' },
  { label: 'LinkedIn', value: '/in/sherina-zheng', href: 'https://www.linkedin.com/in/sherina-zheng-48b287224/' },
]

const px = { paddingLeft: 'clamp(2rem,5vw,3.5rem)', paddingRight: 'clamp(2rem,5vw,3.5rem)' }

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)
  const [focused, setFocused] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    const { name, email, message } = form
    const body = encodeURIComponent(`Hi Sherina,\n\nFrom: ${name} (${email})\n\n${message}`)
    window.location.href = `mailto:zhengsherina@gmail.com?subject=Portfolio Inquiry from ${encodeURIComponent(name)}&body=${body}`
    setSent(true)
  }

  const borderColor = (field) => focused === field ? '#7A9E7E' : 'rgba(12,12,10,0.12)'

  return (
    <>
      {/* ── Page wrapper ── */}
      <div className="max-w-7xl mx-auto" style={{ ...px, paddingTop: '8rem', paddingBottom: '6rem' }}>

        {/* ── Header ── */}
        <div className="mb-16">
          <FadeUp>
            <span style={{ fontFamily: 'var(--font-inter)', fontSize: 11, letterSpacing: '0.2em', color: 'rgba(12,12,10,0.35)', textTransform: 'uppercase' }}>
              Contact
            </span>
          </FadeUp>
          <h1 style={{ fontFamily: 'var(--font-dm-serif)', fontSize: 'clamp(3rem,7vw,6rem)', lineHeight: 1.05, color: '#0C0C0A', marginTop: '0.5rem' }}>
            <RevealText>Let's talk.</RevealText>
          </h1>
          <FadeUp delay={160}>
            <p style={{ marginTop: '1.25rem', fontFamily: 'var(--font-inter)', fontSize: '1rem', color: 'rgba(12,12,10,0.45)', maxWidth: 440, lineHeight: 1.7, fontWeight: 300 }}>
              Whether you have a project in mind, want to collaborate, or just want to say hi — my inbox is always open.
            </p>
          </FadeUp>
        </div>

        {/* ── Two columns ── */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '5rem', alignItems: 'start' }}
          className="flex flex-col lg:grid">

          {/* Left: form */}
          <div>
            <FadeUp>
              <span style={{ fontFamily: 'var(--font-inter)', fontSize: 10, letterSpacing: '0.2em', color: 'rgba(12,12,10,0.35)', textTransform: 'uppercase', display: 'block', marginBottom: '2rem' }}>
                Send a message
              </span>
            </FadeUp>

            {sent ? (
              <FadeUp>
                <div style={{ padding: '4rem 0', textAlign: 'center' }}>
                  <div style={{ width: 52, height: 52, borderRadius: '50%', background: '#E8F0E9', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem', fontSize: 20 }}>✓</div>
                  <h3 style={{ fontFamily: 'var(--font-dm-serif)', fontSize: '1.5rem', color: '#0C0C0A', marginBottom: '0.5rem' }}>Message sent!</h3>
                  <p style={{ fontFamily: 'var(--font-inter)', fontSize: 13, color: 'rgba(12,12,10,0.45)', fontWeight: 300 }}>Your email client should have opened. I'll get back to you soon.</p>
                  <button onClick={() => setSent(false)} style={{ marginTop: '1.5rem', fontFamily: 'var(--font-inter)', fontSize: 12, color: '#7A9E7E', background: 'none', border: 'none', cursor: 'pointer' }}>
                    Send another →
                  </button>
                </div>
              </FadeUp>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                {[
                  { key: 'name',    label: 'Name',    type: 'text',  placeholder: 'Your name' },
                  { key: 'email',   label: 'Email',   type: 'email', placeholder: 'your@email.com' },
                ].map(({ key, label, type, placeholder }, i) => (
                  <FadeUp key={key} delay={80 + i * 60}>
                    <div>
                      <label style={{ fontFamily: 'var(--font-inter)', fontSize: 10, letterSpacing: '0.2em', color: 'rgba(12,12,10,0.35)', textTransform: 'uppercase', display: 'block', marginBottom: '0.5rem' }}>{label}</label>
                      <input
                        type={type}
                        required
                        placeholder={placeholder}
                        value={form[key]}
                        onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                        onFocus={() => setFocused(key)}
                        onBlur={() => setFocused(null)}
                        style={{ width: '100%', background: 'transparent', border: 'none', borderBottom: `1px solid ${borderColor(key)}`, padding: '0.75rem 0', fontFamily: 'var(--font-inter)', fontSize: 14, color: '#0C0C0A', outline: 'none', fontWeight: 300, transition: 'border-color 0.25s' }}
                        className="placeholder:text-[#0C0C0A]/25"
                      />
                    </div>
                  </FadeUp>
                ))}

                <FadeUp delay={200}>
                  <div>
                    <label style={{ fontFamily: 'var(--font-inter)', fontSize: 10, letterSpacing: '0.2em', color: 'rgba(12,12,10,0.35)', textTransform: 'uppercase', display: 'block', marginBottom: '0.5rem' }}>Message</label>
                    <textarea
                      required
                      rows={6}
                      placeholder="Tell me about your project..."
                      value={form.message}
                      onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                      onFocus={() => setFocused('message')}
                      onBlur={() => setFocused(null)}
                      style={{ width: '100%', background: 'transparent', border: 'none', borderBottom: `1px solid ${borderColor('message')}`, padding: '0.75rem 0', fontFamily: 'var(--font-inter)', fontSize: 14, color: '#0C0C0A', outline: 'none', fontWeight: 300, resize: 'none', transition: 'border-color 0.25s' }}
                      className="placeholder:text-[#0C0C0A]/25"
                    />
                  </div>
                </FadeUp>

                <FadeUp delay={260}>
                  <button
                    type="submit"
                    className="group"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '13px 28px', background: '#0C0C0A', color: '#E8E3D5', borderRadius: 9999, fontFamily: 'var(--font-inter)', fontSize: 13, letterSpacing: '0.04em', border: 'none', cursor: 'pointer', transition: 'background 0.3s', alignSelf: 'flex-start' }}
                    onMouseEnter={e => e.currentTarget.style.background = '#7A9E7E'}
                    onMouseLeave={e => e.currentTarget.style.background = '#0C0C0A'}
                  >
                    Send message <span style={{ transition: 'transform 0.2s' }}>→</span>
                  </button>
                </FadeUp>
              </form>
            )}
          </div>

          {/* Right: info sidebar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem', paddingTop: '3rem' }}>

            {/* Social links */}
            <FadeUp delay={120}>
              <div>
                <span style={{ fontFamily: 'var(--font-inter)', fontSize: 10, letterSpacing: '0.2em', color: 'rgba(12,12,10,0.35)', textTransform: 'uppercase', display: 'block', marginBottom: '1.25rem' }}>Find me here</span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  {socials.map(({ label, value, href }) => (
                    <a key={label} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer"
                      style={{ display: 'flex', flexDirection: 'column', gap: 3, textDecoration: 'none' }}
                      className="group">
                      <span style={{ fontFamily: 'var(--font-inter)', fontSize: 10, letterSpacing: '0.18em', color: '#7A9E7E', textTransform: 'uppercase' }}>{label}</span>
                      <span className="hover-line" style={{ fontFamily: 'var(--font-inter)', fontSize: 13, color: 'rgba(12,12,10,0.55)', transition: 'color 0.2s' }}
                        onMouseEnter={e => e.currentTarget.style.color = '#0C0C0A'}
                        onMouseLeave={e => e.currentTarget.style.color = 'rgba(12,12,10,0.55)'}>
                        {value} ↗
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </FadeUp>

            {/* Divider */}
            <div style={{ height: 1, background: 'rgba(12,12,10,0.08)' }} />

            {/* Availability card */}
            <FadeUp delay={200}>
              <div style={{ background: '#E8F0E9', borderRadius: 20, padding: '1.5rem' }}>
                <p style={{ fontFamily: 'var(--font-inter)', fontSize: 13, color: '#6B7B6C', lineHeight: 1.65, fontWeight: 300, marginBottom: '0.75rem' }}>
                  Currently open to freelance projects, full-time design roles, and interesting collaborations.
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#7A9E7E', flexShrink: 0, animation: 'pulse 2s infinite' }} />
                  <span style={{ fontFamily: 'var(--font-inter)', fontSize: 12, color: '#7A9E7E' }}>Available for work</span>
                </div>
              </div>
            </FadeUp>

            {/* Response time */}
            <FadeUp delay={270}>
              <div>
                <span style={{ fontFamily: 'var(--font-inter)', fontSize: 10, letterSpacing: '0.2em', color: 'rgba(12,12,10,0.35)', textTransform: 'uppercase', display: 'block', marginBottom: '0.5rem' }}>Response time</span>
                <p style={{ fontFamily: 'var(--font-inter)', fontSize: 13, color: 'rgba(12,12,10,0.5)', fontWeight: 300 }}>Usually within 24–48 hours.</p>
              </div>
            </FadeUp>

          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
        .flex.flex-col.lg\\:grid { display: flex; flex-direction: column; }
        @media (min-width: 1024px) { .flex.flex-col.lg\\:grid { display: grid; } }
      `}</style>
    </>
  )
}
