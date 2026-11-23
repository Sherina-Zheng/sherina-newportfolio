'use client'
import { usePathname } from 'next/navigation'

export default function Footer() {
  const pathname = usePathname()
  if (pathname === '/') return null // the homepage ends on its own contact sign
  const year = new Date().getFullYear()
  return (
    <footer className="px-8 md:px-14 py-8 border-t border-[#D5CFC0]">
      <div className="flex justify-end">
        <p className="text-[11px] text-[#0C0C0A]/60 tracking-widest uppercase" style={{ fontFamily: 'var(--font-inter)' }}>
          © {year} Sherina Zheng — Built with intention
        </p>
      </div>
    </footer>
  )
}
