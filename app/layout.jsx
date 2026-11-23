import { Inter_Tight } from 'next/font/google'
import './globals.css'
import './queens.css'
import Nav from '../components/Nav'
import Footer from '../components/Footer'

// Queens Line type: one grotesque, like MTA station signage (Helvetica). Inter Tight is the closest free cut.
// The old --font-dm-serif / --font-anton variables are pointed at it in queens.css.
const inter = Inter_Tight({
  weight: ['400', '500', '800', '900'],
  subsets: ['latin'],
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
