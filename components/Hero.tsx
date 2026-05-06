'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Exo_2 } from 'next/font/google'

const exo2 = Exo_2({ subsets: ['latin'], weight: ['100', '300', '400', '600', '700', '900'], display: 'swap' })

const roles = ['Web Designer', 'Web Developer', 'Web Designer and Developer']

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [typing, setTyping] = useState(true)

  useEffect(() => {
    const target = roles[roleIndex]
    let timeout: ReturnType<typeof setTimeout>

    if (typing) {
      if (displayed.length < target.length) {
        timeout = setTimeout(() => setDisplayed(target.slice(0, displayed.length + 1)), 80)
      } else {
        timeout = setTimeout(() => setTyping(false), 2000)
      }
    } else {
      if (displayed.length > 0) {
        timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40)
      } else {
        setRoleIndex((i) => (i + 1) % roles.length)
        setTyping(true)
      }
    }
    return () => clearTimeout(timeout)
  }, [displayed, typing, roleIndex])

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-50 dark:bg-[#050a10] text-gray-900 dark:text-white transition-colors duration-300"
    >
      <div id="about" className="absolute top-0" />

      <div className="relative z-10 w-full max-w-3xl mx-auto px-4 sm:px-6 pt-20 pb-10 flex flex-col items-center text-center gap-6 sm:gap-8">

        {/* Profile Photo — top */}
        <div className="relative w-28 h-28 sm:w-40 sm:h-40 rounded-full overflow-hidden border-2 border-emerald-500/60 shadow-[0_0_50px_rgba(16,185,129,0.3)] flex-shrink-0 bg-slate-100 dark:bg-gray-800">
          <Image
            src="/profil.jpg"
            alt="Mohammed Amouzoun"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Text — bottom */}
        <div className="flex flex-col items-center gap-3 sm:gap-4">
          <p className={`${exo2.className} text-emerald-400/90 text-lg sm:text-xl font-medium tracking-wider flex items-center gap-2`}>
            <span className="wave-emoji">👋</span> Hello, I am
          </p>

          <h1 className={`${exo2.className} text-4xl sm:text-6xl md:text-7xl font-bold text-gray-900 dark:text-white tracking-tight leading-tight transition-colors duration-300`}>
            Mohammed
          </h1>

          {/* Subtitle badge */}
          <p className={`${exo2.className} text-sm sm:text-base font-semibold text-gray-600 dark:text-gray-300 tracking-wide`}>
            <span className="text-emerald-500 dark:text-emerald-400">Full-Stack Web Developer</span>
            <span className="mx-2 text-gray-400 dark:text-gray-600">|</span>
            Building AI Workflows &amp; Automations
          </p>

          {/* Typing animation */}
          <div className="h-8 sm:h-10 flex items-center justify-center">
            <span className={`${exo2.className} text-lg sm:text-2xl font-semibold text-emerald-400 tracking-wide`}>
              {displayed}
              <span className="inline-block w-0.5 h-5 sm:h-6 bg-emerald-400 ml-0.5 animate-pulse align-middle" />
            </span>
          </div>

          <p className={`${exo2.className} text-gray-600 dark:text-gray-400/90 text-sm sm:text-base md:text-lg leading-relaxed font-light max-w-xl transition-colors duration-300`}>
            From strategy and UI/UX design to development and launch, we deliver websites that combine{' '}
            <span className="text-gray-900 dark:text-white font-medium">premium visuals</span> with{' '}
            <span className="text-emerald-500 dark:text-emerald-400 font-medium">real business results</span>.
          </p>

          {/* CTA */}
          <div className="flex items-center justify-center gap-3 sm:gap-4 mt-2 w-full">
            <a
              href="#projects"
              className="group w-full sm:w-auto px-7 py-3.5 bg-emerald-500/90 hover:bg-emerald-400 text-[#050a10] text-sm sm:text-base font-semibold rounded-xl transition-all duration-300 hover:shadow-[0_0_25px_rgba(16,185,129,0.4)] flex items-center justify-center gap-2 hover:-translate-y-0.5"
            >
              View My Work
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>

      </div>
    </section>
  )
}
