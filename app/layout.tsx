import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: {
    default: 'Mohammed Amouzoun — Website Solutions Builder + SEO & Content Marketer',
    template: '%s | Mohammed Amouzoun',
  },
  description:
    'Mohammed Amouzoun builds business websites with SEO foundations and clear content. Based in Morocco, available for remote website projects.',
  keywords: ['Mohammed Amouzoun', 'Website Solutions Builder', 'SEO', 'Content Marketing', 'Web Design Morocco', 'Framer', 'WordPress'],
  authors: [{ name: 'Mohammed Amouzoun', url: 'https://amouzoun.dev' }],
  creator: 'Mohammed Amouzoun',
  publisher: 'Mohammed Amouzoun',
  alternates: {
    canonical: 'https://amouzoun.dev',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
  openGraph: {
    title: 'Mohammed Amouzoun — Website Solutions Builder + SEO & Content Marketer',
    description:
      'Business websites, SEO foundations, and content that helps visitors understand your offer. Based in Morocco, working remotely.',
    url: 'https://amouzoun.dev',
    siteName: 'Mohammed Amouzoun Portfolio',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://amouzoun.dev/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Mohammed Amouzoun - Website Solutions Builder + SEO & Content Marketer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mohammed Amouzoun — Website Solutions Builder + SEO & Content Marketer',
    description:
      'Business websites, SEO foundations, and content marketing. Based in Morocco.',
    images: ['https://amouzoun.dev/og-image.png'],
    creator: '@MohammedAmouzoun',
  },
  category: 'technology',
}


import { ThemeProvider } from '@/components/ThemeProvider'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body className={`${inter.variable} font-sans bg-slate-50 dark:bg-[#0A0A0A] text-gray-900 dark:text-gray-100 antialiased transition-colors duration-300`}>
        <ThemeProvider attribute="class" defaultTheme="light" disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
