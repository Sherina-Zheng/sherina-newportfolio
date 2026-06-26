export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="px-8 md:px-14 py-8 border-t border-[#D5CFC0]">
      <div className="max-w-7xl mx-auto flex justify-end">
        <p className="text-xs text-[#0C0C0A]/35 tracking-wider uppercase" style={{ fontFamily: 'var(--font-inter)' }}>
          © {year} Sherina Zheng — Designed & built with intention
        </p>
      </div>
    </footer>
  )
}
