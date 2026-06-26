import { DM_Serif_Display, Inter } from 'next/font/google'
import './globals.css'
import Nav from '../components/Nav'
import CustomCursor from '../components/CustomCursor'
import Footer from '../components/Footer'

const dmSerif = DM_Serif_Display({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-dm-serif',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata = {
  title: 'Sherina Zheng — Product Designer',
  description: 'I design user experiences that feel inevitable.',
  openGraph: {
    title: 'Sherina Zheng — Product Designer',
    description: 'I design user experiences that feel inevitable.',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${dmSerif.variable} ${inter.variable}`}>
      <body>
        <CustomCursor />
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
