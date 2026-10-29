import type { Metadata } from 'next'
import { publicContent } from '@/lib/admin-server'
import { PortfolioProvider } from '@/components/PortfolioProvider'
import { Reveal, ScrollProgress } from '@/components/PortfolioMotion'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Toolkit from '@/components/Toolkit'
import About from '@/components/About'
import Projects from '@/components/Projects'
import Services from '@/components/Services'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'
import SocialSidebar from '@/components/SocialSidebar'

export const dynamic = 'force-dynamic'
export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await publicContent()
  return { title: { absolute: seo.title }, description: seo.description, openGraph: { title: seo.title, description: seo.description, images: seo.image ? [seo.image] : [] }, twitter: { title: seo.title, description: seo.description, images: seo.image ? [seo.image] : [] } }
}
export default async function Home() {
  const data = await publicContent()
  const jsonLd = { '@context': 'https://schema.org', '@type': 'Person', name: data.profile.name, jobTitle: data.profile.title, email: data.profile.email, url: 'https://amouzoun.dev', sameAs: [data.profile.github, data.profile.linkedin].filter(Boolean) }
  return (
    <PortfolioProvider value={data}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
    <main className="min-h-screen transition-colors duration-300">
      <ScrollProgress />
      <Navbar />
      <Reveal><Hero /></Reveal>
      {data.sections.toolkit && <Reveal><Toolkit /></Reveal>}
      {data.sections.about && <Reveal><About /></Reveal>}
      {data.sections.projects && <Projects />}
      {data.sections.services && <Reveal><Services /></Reveal>}
      {data.sections.contact && <Reveal><Contact /></Reveal>}
      <Footer />
      <SocialSidebar />
      <WhatsAppButton />
    </main>
    </PortfolioProvider>
  )
}
