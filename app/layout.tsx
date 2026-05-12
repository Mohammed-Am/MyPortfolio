import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: {
    default: 'Mohammed Amouzoun — WordPress Developer & AI Automation Specialist',
    template: '%s | Mohammed Amouzoun',
  },
  description:
    'Portfolio of Mohammed Amouzoun (also known as Mohamed Amozon), a WordPress Developer and AI Automation specialist from Morocco. Building premium websites with React, Next.js and WooCommerce.',
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
    title: 'Mohammed Amouzoun — WordPress Developer & AI Automation Specialist',
    description:
      'Portfolio of Mohammed Amouzoun — WordPress Developer & AI Automation specialist from Morocco.',
    url: 'https://amouzoun.dev',
    siteName: 'Mohammed Amouzoun Portfolio',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/logo.png',
        width: 512,
        height: 512,
        alt: 'Mohammed Amouzoun',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mohammed Amouzoun — WordPress Developer & AI Automation Specialist',
    description:
      'Portfolio of Mohammed Amouzoun — WordPress Developer & AI Automation specialist from Morocco.',
    images: ['/logo.png'],
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Mohammed Amouzoun',
  alternateName: ['Mohamed Amozon', 'Amouzoun'],
  url: 'https://amouzoun.dev',
  image: 'https://amouzoun.dev/logo.png',
  jobTitle: 'WordPress Developer & AI Automation Specialist',
  description:
    'WordPress Developer and AI Automation specialist from Morocco. Building premium websites with React, Next.js and WooCommerce.',
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
    'Web Design',
    'Front-End Development',
    'WordPress',
    'WooCommerce',
    'React',
    'Next.js',
    'TypeScript',
    'AI Automation',
    'n8n',
    'Chatbots',
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
