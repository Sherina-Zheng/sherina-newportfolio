import localFont from 'next/font/local'
import './globals.css'
import './queens.css'
import Nav from '../components/Nav'
import Footer from '../components/Footer'

// Queens Line type: one grotesque, like MTA station signage (Helvetica). Inter Tight is the closest free cut.
// Bundled in app/fonts so builds never depend on reaching Google Fonts. (SIL Open Font License, see app/fonts.)
// The old --font-dm-serif / --font-anton variables are pointed at it in queens.css.
const inter = localFont({
  src: [
    { path: './fonts/inter-tight-latin-400-normal.woff2', weight: '400', style: 'normal' },
    { path: './fonts/inter-tight-latin-500-normal.woff2', weight: '500', style: 'normal' },
    { path: './fonts/inter-tight-latin-800-normal.woff2', weight: '800', style: 'normal' },
    { path: './fonts/inter-tight-latin-900-normal.woff2', weight: '900', style: 'normal' },
  ],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata = {
  title: 'Sherina Zheng — Product Owner',
  description: 'Product Owner in New York. Currently owning CognitMES at Ranial Systems.',
  openGraph: {
    title: 'Sherina Zheng — Product Owner',
    description: 'Product Owner in New York. Currently owning CognitMES at Ranial Systems.',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
