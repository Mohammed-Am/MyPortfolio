import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'Mohammed Amouzoun — Web Design & Development & AI Automation',
  description:
    'Portfolio of Mohammed Amouzoun, a Front-End WordPress Developer from Morocco. Seeking WordPress internship at IZEMX.',
  keywords: [
    'Front-End Developer',
    'WordPress Developer',
    'PHP Developer',
    'Web Developer Morocco',
    'WordPress Internship',
    'IZEMX',
  ],
  authors: [{ name: 'Mohammed Amouzoun' }],
  icons: {
    icon: '/logo.png',
  },
  openGraph: {
    title: 'Mohammed Amouzoun — Web Design & Development & AI Automation',
    description: 'Custom Front-End and WordPress development expertise. Seeking WordPress internship.',
    url: 'https://amouzoun.dev',
    siteName: 'Mohammed Amouzoun Portfolio',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mohammed Amouzoun — Web Design & Development & AI Automation',
    description: 'Custom Front-End and WordPress development expertise.',
  },
}

import { ThemeProvider } from '@/components/ThemeProvider'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body className={`${inter.variable} font-sans bg-slate-50 dark:bg-[#0A0A0A] text-gray-900 dark:text-gray-100 antialiased transition-colors duration-300`}>
        <ThemeProvider attribute="class" defaultTheme="dark" disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
