import { siteConfig, heroContent, aboutContent, servicesContent, contactContent } from '@/data/content'

export type Project = {
  id: string; title: string; description: string; image: string; url: string;
  technologies: string; published: boolean; video: string; gallery: string[];
}

export const defaultPortfolio = {
  profile: {
    name: siteConfig.name, brand: 'Mohammed', title: siteConfig.title,
    email: siteConfig.email, github: siteConfig.github, linkedin: siteConfig.linkedin,
    location: siteConfig.location, photo: '/profil.jpg', whatsapp: '212676426450',
  },
  hero: { title: heroContent.title, description: heroContent.description, badge: heroContent.badge, button: 'View My Projects' },
  about: { title: aboutContent.title, bio: aboutContent.bio.join('\n\n') },
  toolkit: ['Framer', 'WordPress', 'Next.js', 'On-page SEO', 'Content Strategy', 'Responsive Design'],
  services: { title: servicesContent.title, subtitle: servicesContent.subtitle, description: servicesContent.description, items: servicesContent.services.map(({ title, description }) => ({ title, description })) },
  projects: { title: 'Website Projects', subtitle: 'Web Design & Development', emptyTitle: 'Websites Built with Purpose', emptyDescription: 'Website projects and case studies will be shared here, with a focus on design, responsive layouts, and SEO foundations.', items: [] as Project[] },
  contact: { title: contactContent.title, subtitle: contactContent.subtitle, description: contactContent.description, button: 'Send Message' },
  seo: { title: `${siteConfig.name} — ${siteConfig.title}`, description: siteConfig.description, image: 'https://amouzoun.dev/og-image.png' },
  sections: { about: true, toolkit: true, projects: true, services: true, contact: true },
  appearance: { animations: true },
}
export type Portfolio = typeof defaultPortfolio
export type Inquiry = { id: string; name: string; email: string; message: string; status: 'unread' | 'read' | 'archived'; created_at: string }

export function safeUrl(value: string, local = false) {
  if (!value) return true
  if (local && /^\/(?!\/)/.test(value) && !/[\\\s]/.test(value)) return true
  try { const url = new URL(value); return url.protocol === 'https:' && !url.username && !url.password } catch { return false }
}

// Validate the complete document; never merge untrusted keys into runtime objects.
export function validatePortfolio(input: unknown): Portfolio {
  const clone = JSON.parse(JSON.stringify(input))
  if (clone && typeof clone === 'object') {
    clone.appearance ??= { animations: true }
    if (Array.isArray(clone.projects?.items)) for (const item of clone.projects.items) {
      if (item && typeof item === 'object') { item.video ??= ''; item.gallery ??= [] }
    }
  }
  function check(value: unknown, template: unknown, path: string) {
    if (typeof template === 'string') {
      if (typeof value !== 'string' || value.length > 10000) throw new Error(`Invalid ${path}`)
    } else if (typeof template === 'boolean') {
      if (typeof value !== 'boolean') throw new Error(`Invalid ${path}`)
    } else if (Array.isArray(template)) {
      if (!Array.isArray(value) || value.length > 100) throw new Error(`Invalid ${path}`)
      const sample = path === 'portfolio.projects.items' ? { id: '', title: '', description: '', image: '', url: '', technologies: '', published: false, video: '', gallery: [''] } : template[0]
      value.forEach((entry, i) => check(entry, sample, `${path}.${i}`))
    } else {
      if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error(`Invalid ${path}`)
      const keys = Object.keys(template as object)
      if (Object.keys(value).some(key => !keys.includes(key))) throw new Error(`Unexpected field in ${path}`)
      for (const key of keys) check((value as Record<string, unknown>)[key], (template as Record<string, unknown>)[key], `${path}.${key}`)
    }
  }
  check(clone, defaultPortfolio, 'portfolio')
  const data = clone as Portfolio
  for (const url of [data.profile.github, data.profile.linkedin, data.seo.image]) if (!safeUrl(url)) throw new Error('Links must use HTTPS.')
  if (!safeUrl(data.profile.photo, true)) throw new Error('Use a local image path or HTTPS image URL.')
  if (!data.profile.name.trim() || !data.seo.title.trim()) throw new Error('Name and SEO title are required.')
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.profile.email)) throw new Error('Enter a valid contact email.')
  if (data.profile.whatsapp && !/^\d{7,15}$/.test(data.profile.whatsapp)) throw new Error('WhatsApp must contain 7–15 digits, including the country code.')
  const ids = new Set<string>()
  for (const project of data.projects.items) {
    if (!project.id || ids.has(project.id) || !project.title.trim()) throw new Error('Every project needs a unique ID and a title.')
    ids.add(project.id)
    if (!safeUrl(project.url) || !safeUrl(project.image, true) || !safeUrl(project.video, true) || project.gallery.some(url => !safeUrl(url, true))) throw new Error('Project links must use HTTPS; media may also use local paths.')
  }
  return data
}
