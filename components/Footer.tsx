'use client'
import { siteConfig } from '@/data/content'
import Image from 'next/image'

const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
  e.preventDefault()
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

const footerLinks = [
  { href: 'about', label: 'About' },
  { href: 'projects', label: 'Projects' },
  { href: 'services', label: 'Services' },
  { href: 'contact', label: 'Contact' },
]

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-white/5 bg-slate-50 dark:bg-[#080808] transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="grid sm:grid-cols-3 gap-6 sm:gap-8 mb-6 sm:mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-8 sm:mb-10 mt-2 sm:mt-6">
              <Image src="/logo.png" alt="Amouzoun Dev Logo" width={400} height={150} className="h-8 sm:h-10 w-auto object-contain scale-[1.5] sm:scale-[2.5] origin-left dark:invert" />
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-xs leading-relaxed transition-colors duration-300">
              {siteConfig.title}
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-gray-900 dark:text-white text-sm font-semibold mb-3 transition-colors duration-300">Navigation</h4>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={`#${link.href}`}
                    onClick={(e) => scrollTo(e, link.href)}
                    className="text-gray-600 dark:text-gray-400 text-xs hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-gray-900 dark:text-white text-sm font-semibold mb-3 transition-colors duration-300">Contact</h4>
            <div className="space-y-2">
              <a
                href={`mailto:${siteConfig.email}`}
                className="block text-gray-600 dark:text-gray-400 text-xs hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors"
              >
                {siteConfig.email}
              </a>
              <a
                href={siteConfig.github}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-gray-600 dark:text-gray-400 text-xs hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors"
              >
                github.com/{siteConfig.github.split('/').pop()}
              </a>
              {siteConfig.linkedin && (
                <a
                  href={siteConfig.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-gray-600 dark:text-gray-400 text-xs hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors"
                >
                  LinkedIn
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-200 dark:border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 transition-colors duration-300">
          <p className="text-gray-500 dark:text-gray-500 text-xs w-full text-center sm:text-left">© {new Date().getFullYear()} {siteConfig.name}.</p>
        </div>
      </div>
    </footer>
  )
}
