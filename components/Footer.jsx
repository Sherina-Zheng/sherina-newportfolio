import Link from 'next/link'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="px-8 md:px-14 py-10 border-t border-[#E8F0E9]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <p className="text-xs text-[#0C0C0A]/40 tracking-wider uppercase" style={{ fontFamily: 'var(--font-inter)' }}>
          © {year} Sherina Zheng — Designed & built with intention
        </p>
        <div className="flex items-center gap-8">
          <a
            href="mailto:zhengsherina@gmail.com"
            className="text-xs text-[#0C0C0A]/50 hover:text-[#7A9E7E] transition-colors duration-200 hover-line tracking-wide"
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            Email
          </a>
          <a
            href="https://www.linkedin.com/in/sherina-zheng-48b287224/"
            target="_blank"
            rel="noreferrer"
            className="text-xs text-[#0C0C0A]/50 hover:text-[#7A9E7E] transition-colors duration-200 hover-line tracking-wide"
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            LinkedIn ↗
          </a>
        </div>
      </div>
    </footer>
  )
}
