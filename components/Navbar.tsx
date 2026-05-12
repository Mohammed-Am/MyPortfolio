'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { ThemeToggle } from './ThemeToggle'

const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
  e.preventDefault()
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

const navLinks = [
  { href: 'hero', label: 'About' },
  { href: 'projects', label: 'Projects' },
  { href: 'services', label: 'Services' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
        ? 'bg-white/90 dark:bg-[#0A0A0A]/95 backdrop-blur-md border-b border-gray-200/80 dark:border-white/[0.04] shadow-[0_2px_20px_rgba(0,0,0,0.08)] dark:shadow-[0_2px_20px_rgba(0,0,0,0.6)]'
        : 'bg-transparent'
        }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center group transition-transform">
          <Image src="/logo.png" alt="Amouzoun Dev Logo" width={400} height={150} className="h-8 sm:h-10 w-auto object-contain scale-[1.5] sm:scale-[2.5] origin-left dark:invert" />
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={`#${link.href}`}
              onClick={(e) => scrollTo(e, link.href)}
              className="px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 rounded-lg transition-all"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA - Desktop */}
        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />
          <a
            href="#contact"
            onClick={(e) => scrollTo(e, 'contact')}
            className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-black text-sm font-semibold rounded-lg transition-all hover:shadow-[0_0_20px_rgba(16,185,129,0.4)]"
          >
            Contact Me
          </a>
        </div>

        {/* Mobile: Contact Me button + hamburger */}
        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />
          <a
            href="#contact"
            onClick={(e) => scrollTo(e, 'contact')}
            className="flex items-center gap-1.5 px-3 py-2 bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-bold rounded-lg transition-all"
          >
            Contact
          </a>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-slate-50 dark:bg-[#0D0D0D] border-t border-gray-200 dark:border-white/5 px-4 py-4 flex flex-col gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={`#${link.href}`}
              onClick={(e) => { scrollTo(e, link.href); setMobileOpen(false) }}
              className="px-3 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 rounded-lg transition-all"
            >
              {link.label}
            </a>
          ))}
          <div className="mt-2 flex items-center justify-between">
            <a
              href="#contact"
              onClick={(e) => { scrollTo(e, 'contact'); setMobileOpen(false) }}
              className="flex-1 px-4 py-2.5 bg-emerald-500 text-black text-sm font-semibold rounded-lg text-center"
            >
              Contact Me
            </a>
            <div className="ml-4">
              <ThemeToggle />
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
