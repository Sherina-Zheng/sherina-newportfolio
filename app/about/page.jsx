import { FadeUp, RevealText } from '../../components/ScrollReveal'
import Link from 'next/link'

const skills = [
  { cat: 'Design', items: ['UX Research', 'UI Design', 'Prototyping', 'Interaction Design', 'Design Systems'] },
  { cat: 'Product', items: ['Product Strategy', 'Roadmapping', 'User Stories', 'Sprint Planning', 'Stakeholder Mgmt'] },
  { cat: 'Tools', items: ['Figma', 'FigJam', 'Notion', 'Jira', 'Supabase'] },
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
      {/* Header */}
      <section className="px-8 md:px-14 pt-40 pb-16">
        <div className="max-w-7xl mx-auto">
          <FadeUp>
            <span className="text-[11px] tracking-[0.22em] uppercase mb-4 block font-sans" style={{ color: '#7A9E7E' }}>About</span>
          </FadeUp>
          <h1 style={{ fontFamily: 'var(--font-dm-serif)', fontSize: 'clamp(3rem, 7vw, 6.5rem)', lineHeight: 1.05, color: '#0C0C0A' }}>
            <RevealText>The person</RevealText>
            <br /><RevealText delay={100}>behind the work.</RevealText>
          </h1>
        </div>
      </section>

      {/* Intro split */}
      <section className="px-8 md:px-14 py-16">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16 items-start">
          {/* Photo placeholder */}
          <FadeUp className="md:w-80 lg:w-96 flex-shrink-0">
            <div className="w-full aspect-[3/4] rounded-3xl relative overflow-hidden"
              style={{ background: 'linear-gradient(160deg, #C8DEC9 0%, #A8C9AA 50%, #7A9E7E 100%)' }}>
              <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at 70% 20%, #E8E3D530 0%, transparent 55%)' }} />
              <div className="absolute top-6 left-6 w-24 h-24 rounded-full border border-white/20" />
              <div className="absolute bottom-0 left-0 right-0 p-8" style={{ background: 'linear-gradient(to top, #0C0C0A60, transparent)' }}>
                <p className="text-white/80 text-sm font-sans tracking-wide">Sherina Zheng</p>
                <p className="text-white/40 text-xs font-sans mt-0.5">Designer · Builder · Thinker</p>
              </div>
            </div>
          </FadeUp>

          {/* Bio */}
          <div className="flex-1 pt-4">
            <FadeUp>
              <p className="text-2xl md:text-3xl text-[#0C0C0A] leading-snug mb-8" style={{ fontFamily: 'var(--font-dm-serif)' }}>
                Sherina began her professional journey stepping into the world of fintech — officially entering adulthood one product sprint at a time.
              </p>
            </FadeUp>
            <FadeUp delay={100}>
              <p className="text-base text-[#0C0C0A]/55 leading-relaxed mb-6 font-sans font-light">
                Within her company, she collaborates with the Product Team on an innovative online booking system for beauty salons — a platform that connects merchants, staff, and customers through rapid, efficient solutions that redefine convenience and accessibility.
              </p>
            </FadeUp>
            <FadeUp delay={200}>
              <p className="text-base text-[#0C0C0A]/55 leading-relaxed mb-10 font-sans font-light">
                But this is just the beginning. With a background in Data Analytics, she's driven to explore new horizons in Web Development and Product Management. The satisfaction of building systems from the ground up inspires her — a reminder that progress often begins with bare bones, and every step forward fuels her passion for crafting impactful solutions.
              </p>
            </FadeUp>
            <FadeUp delay={280}>
              <div className="flex flex-wrap gap-3">
                {['Curious by default', 'Systems thinker', 'Data-informed', 'Empathy-first'].map(trait => (
                  <span key={trait} className="px-4 py-2 rounded-full border border-[#E8F0E9] text-xs text-[#6B7B6C] font-sans bg-[#E8F0E9]/40">
                    {trait}
                  </span>
                ))}
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="px-8 md:px-14 py-24 bg-[#F0F5F0]">
        <div className="max-w-7xl mx-auto">
          <FadeUp>
            <span className="text-[11px] tracking-[0.22em] uppercase mb-8 block font-sans" style={{ color: '#7A9E7E' }}>Journey</span>
          </FadeUp>
          <div className="flex flex-col gap-0">
            {timeline.map(({ year, title, org, desc }, i) => (
              <FadeUp key={i} delay={i * 100}>
                <div className="flex gap-10 py-10 border-b border-[#D8E8D8] last:border-0">
                  <div className="w-16 flex-shrink-0 pt-1">
                    <span className="text-xs text-[#7A9E7E] font-sans tracking-widest uppercase">{year}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl text-[#0C0C0A] mb-1" style={{ fontFamily: 'var(--font-dm-serif)' }}>{title}</h3>
                    <p className="text-xs text-[#7A9E7E] mb-3 font-sans tracking-wide">{org}</p>
                    <p className="text-sm text-[#0C0C0A]/50 leading-relaxed font-sans font-light">{desc}</p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="px-8 md:px-14 py-24">
        <div className="max-w-7xl mx-auto">
          <FadeUp>
            <span className="text-[11px] tracking-[0.22em] uppercase mb-8 block font-sans" style={{ color: '#7A9E7E' }}>Capabilities</span>
          </FadeUp>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {skills.map(({ cat, items }, i) => (
              <FadeUp key={cat} delay={i * 80}>
                <div>
                  <h4 className="text-xs tracking-[0.2em] text-[#0C0C0A]/40 uppercase mb-5 font-sans">{cat}</h4>
                  <ul className="flex flex-col gap-3">
                    {items.map(item => (
                      <li key={item} className="flex items-center gap-2.5">
                        <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ backgroundColor: '#7A9E7E' }} />
                        <span className="text-sm text-[#0C0C0A]/70 font-sans">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-8 md:px-14 py-28 bg-[#0C0C0A] text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl md:text-6xl text-[#E8E3D5] mb-10" style={{ fontFamily: 'var(--font-dm-serif)' }}>
            <RevealText>Let's make</RevealText>
            <br /><RevealText delay={100}>something great.</RevealText>
          </h2>
          <FadeUp delay={200}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact"
                className="group inline-flex items-center gap-3 px-7 py-3.5 bg-[#E8E3D5] text-[#0C0C0A] rounded-full text-sm tracking-wide hover:bg-[#7A9E7E] hover:text-[#E8E3D5] transition-all duration-300 font-sans">
                Work with me <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
              <Link href="/work"
                className="inline-flex items-center gap-3 px-7 py-3.5 border border-[#E8E3D5]/20 text-[#E8E3D5]/60 rounded-full text-sm tracking-wide hover:border-[#E8E3D5]/40 hover:text-[#E8E3D5]/80 transition-all duration-300 font-sans">
                See my work
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  )
}
