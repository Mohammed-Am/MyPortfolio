import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: {
    default: 'Mohammed Amouzoun — AI Automation Specialist',
    template: '%s | Mohammed Amouzoun',
  },
  description:
    'Portfolio of Mohammed Amouzoun (also known as Mohamed Amozon), an AI Automation Specialist from Morocco. Building intelligent automation workflows with n8n, Make.com and AI agents.',

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
    },
  },
  icons: {
    icon: '/logo.png',
  },
  openGraph: {
    title: 'Mohammed Amouzoun — AI Automation Specialist',
    description:
      'Portfolio of Mohammed Amouzoun — AI Automation Specialist from Morocco.',
    url: 'https://amouzoun.dev',
    siteName: 'Mohammed Amouzoun Portfolio',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://amouzoun.dev/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Mohammed Amouzoun - AI Automation Specialist',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mohammed Amouzoun — AI Automation Specialist',
    description:
      'Portfolio of Mohammed Amouzoun — AI Automation Specialist from Morocco.',
    images: ['https://amouzoun.dev/og-image.png'],
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Mohammed Amouzoun',
  alternateName: ['Mohamed Amozon', 'Amouzoun'],
  url: 'https://amouzoun.dev',
  image: 'https://amouzoun.dev/logo.png',
  jobTitle: 'AI Automation Specialist',
  description:
    'AI Automation Specialist from Morocco. Building intelligent automation workflows with n8n, Make.com and AI agents.',
  email: 'mh.amouzoun@gmail.com',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'MA',
  },
  sameAs: [
    'https://github.com/Mohammed-Am',
    'https://linkedin.com/in/mohammed-amouzoun',
  ],
  knowsAbout: [
    'AI Automation',
    'n8n',
    'Make.com',
    'Chatbots',
    'AI Agents',
    'Workflow Automation',
    'SEO',
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
