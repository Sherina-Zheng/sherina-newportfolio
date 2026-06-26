'use client'
import { useState } from 'react'
import { FadeUp, RevealText } from '../../components/ScrollReveal'

const socials = [
  { label: 'Email', value: 'zhengsherina@gmail.com', href: 'mailto:zhengsherina@gmail.com' },
  { label: 'LinkedIn', value: '/in/sherina-zheng', href: 'https://www.linkedin.com/in/sherina-zheng-48b287224/' },
]

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

  const inputClass = (field) => `
    w-full bg-transparent border-b text-[#0C0C0A] text-sm py-4 outline-none font-sans font-light
    transition-all duration-300 placeholder:text-[#0C0C0A]/25
    ${focused === field ? 'border-[#7A9E7E]' : 'border-[#E8F0E9]'}
  `

  return (
    <>
      {/* Header */}
      <section className="pt-52 pb-20" style={{ paddingLeft: "clamp(2rem,5vw,3.5rem)", paddingRight: "clamp(2rem,5vw,3.5rem)" }}>
        <div className="max-w-7xl mx-auto">
          <FadeUp>
            <span className="text-[11px] tracking-[0.22em] uppercase mb-4 block font-sans" style={{ color: '#7A9E7E' }}>Contact</span>
          </FadeUp>
          <h1 style={{ fontFamily: 'var(--font-dm-serif)', fontSize: 'clamp(3rem, 7vw, 6.5rem)', lineHeight: 1.05, color: '#0C0C0A' }}>
            <RevealText>Let's talk.</RevealText>
          </h1>
          <FadeUp delay={180}>
            <p className="mt-6 text-base md:text-lg text-[#0C0C0A]/45 max-w-md font-sans font-light leading-relaxed">
              Whether you have a project in mind, want to collaborate, or just want to say hi — my inbox is always open.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Two column layout */}
      <section className="px-8 md:px-14 pb-32">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-20">

          {/* Left: form */}
          <div className="flex-1">
            <FadeUp>
              <span className="text-[11px] tracking-[0.2em] text-[#0C0C0A]/35 uppercase mb-8 block font-sans">Send a message</span>
            </FadeUp>

            {sent ? (
              <FadeUp>
                <div className="py-16 text-center">
                  <div className="w-14 h-14 rounded-full bg-[#E8F0E9] flex items-center justify-center mx-auto mb-6">
                    <span className="text-2xl">✓</span>
                  </div>
                  <h3 className="text-2xl text-[#0C0C0A] mb-3" style={{ fontFamily: 'var(--font-dm-serif)' }}>Message sent!</h3>
                  <p className="text-sm text-[#0C0C0A]/45 font-sans font-light">Your email client should have opened. I'll get back to you soon.</p>
                  <button onClick={() => setSent(false)} className="mt-8 text-xs text-[#7A9E7E] hover-line font-sans">
                    Send another →
                  </button>
                </div>
              </FadeUp>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                <FadeUp delay={100}>
                  <div>
                    <label className="text-[10px] tracking-[0.2em] text-[#0C0C0A]/35 uppercase font-sans block mb-1">Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Your name"
                      value={form.name}
                      onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                      onFocus={() => setFocused('name')}
                      onBlur={() => setFocused(null)}
                      className={inputClass('name')}
                    />
                  </div>
                </FadeUp>
                <FadeUp delay={160}>
                  <div className="mt-6">
                    <label className="text-[10px] tracking-[0.2em] text-[#0C0C0A]/35 uppercase font-sans block mb-1">Email</label>
                    <input
                      type="email"
                      required
                      placeholder="your@email.com"
                      value={form.email}
                      onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                      onFocus={() => setFocused('email')}
                      onBlur={() => setFocused(null)}
                      className={inputClass('email')}
                    />
                  </div>
                </FadeUp>
                <FadeUp delay={220}>
                  <div className="mt-6">
                    <label className="text-[10px] tracking-[0.2em] text-[#0C0C0A]/35 uppercase font-sans block mb-1">Message</label>
                    <textarea
                      required
                      rows={5}
                      placeholder="Tell me about your project..."
                      value={form.message}
                      onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                      onFocus={() => setFocused('message')}
                      onBlur={() => setFocused(null)}
                      className={inputClass('message') + ' resize-none'}
                      style={{ borderBottom: `1px solid ${focused === 'message' ? '#7A9E7E' : '#E8F0E9'}` }}
                    />
                  </div>
                </FadeUp>
                <FadeUp delay={280}>
                  <button
                    type="submit"
                    className="group mt-10 inline-flex items-center gap-3 px-8 py-4 bg-[#0C0C0A] text-[#E8E3D5] rounded-full text-sm tracking-wide hover:bg-[#7A9E7E] transition-all duration-300 font-sans self-start"
                  >
                    Send message
                    <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </button>
                </FadeUp>
              </form>
            )}
          </div>

          {/* Right: socials + info */}
          <div className="lg:w-80 flex flex-col gap-12 pt-2">
            <FadeUp delay={150}>
              <div>
                <span className="text-[10px] tracking-[0.2em] text-[#0C0C0A]/35 uppercase font-sans block mb-6">Find me here</span>
                <div className="flex flex-col gap-6">
                  {socials.map(({ label, value, href }) => (
                    <a key={label} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer"
                      className="group flex flex-col gap-1">
                      <span className="text-[10px] tracking-[0.2em] text-[#7A9E7E] uppercase font-sans">{label}</span>
                      <span className="text-sm text-[#0C0C0A]/60 group-hover:text-[#0C0C0A] transition-colors duration-200 font-sans hover-line">
                        {value} ↗
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </FadeUp>

            <FadeUp delay={250}>
              <div className="p-8 rounded-3xl" style={{ backgroundColor: '#E8F0E9' }}>
                <p className="text-xs text-[#6B7B6C] font-sans leading-relaxed mb-4">
                  Currently open to freelance projects, full-time design roles, and interesting collaborations.
                </p>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#7A9E7E]" style={{ animation: 'pulse 2s infinite' }} />
                  <span className="text-xs text-[#7A9E7E] font-sans">Available for work</span>
                </div>
              </div>
            </FadeUp>

            <FadeUp delay={320}>
              <div>
                <span className="text-[10px] tracking-[0.2em] text-[#0C0C0A]/35 uppercase font-sans block mb-3">Response time</span>
                <p className="text-sm text-[#0C0C0A]/50 font-sans font-light">Usually within 24–48 hours.</p>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </>
  )
}
