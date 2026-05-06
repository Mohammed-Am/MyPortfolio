import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'Mohammed Amouzoun — Web Designer, Developer & AI Automation Expert',
  description:
    'Portfolio of Mohammed Amouzoun (also known as Mohamed Amozon), a Web Designer, Front-End Developer and AI Automation specialist from Morocco. Building premium websites and intelligent workflows.',
  keywords: [
    'Mohammed Amouzoun',
    'Mohamed Amozon',
    'Amouzoun',
    'Mohammed Amouzoun Portfolio',
    'Web Designer Morocco',
    'Web Developer Morocco',
    'Front-End Developer Morocco',
    'AI Automation Developer',
    'WordPress Developer Morocco',
    'amouzoun.dev',
    'Next.js Developer',
    'React Developer',
    'n8n automation',
    'chatbot developer',
  ],
  authors: [{ name: 'Mohammed Amouzoun', url: 'https://amouzoun.dev' }],
  creator: 'Mohammed Amouzoun',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  icons: {
    icon: '/logo.png',
  },
  openGraph: {
    title: 'Mohammed Amouzoun — Web Designer, Developer & AI Automation',
    description:
      'Portfolio of Mohammed Amouzoun — Web Designer, Front-End Developer & AI Automation specialist from Morocco.',
    url: 'https://amouzoun.dev',
    siteName: 'Mohammed Amouzoun Portfolio',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mohammed Amouzoun — Web Designer, Developer & AI Automation',
    description:
      'Portfolio of Mohammed Amouzoun — Web Designer, Front-End Developer & AI Automation specialist from Morocco.',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Mohammed Amouzoun',
  alternateName: ['Mohamed Amozon', 'Amouzoun'],
  url: 'https://amouzoun.dev',
  jobTitle: 'Web Designer & Front-End Developer',
  description:
    'Web Designer, Front-End Developer and AI Automation specialist from Morocco.',
  email: 'mh.amouzoun@gmail.com',
  sameAs: [
    'https://github.com/Mohammed-Am',
    'https://linkedin.com/in/mohammed-amouzoun',
  ],
  knowsAbout: [
    'Web Design',
    'Front-End Development',
    'WordPress',
    'React',
    'Next.js',
    'AI Automation',
    'n8n',
    'Chatbots',
  ],
}

import { ThemeProvider } from '@/components/ThemeProvider'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} font-sans bg-slate-50 dark:bg-[#0A0A0A] text-gray-900 dark:text-gray-100 antialiased transition-colors duration-300`}>
        <ThemeProvider attribute="class" defaultTheme="dark" disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
