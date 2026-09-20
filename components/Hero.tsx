'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Exo_2 } from 'next/font/google'
import { SiGithub } from 'react-icons/si'
import { FaLinkedin } from 'react-icons/fa'

const exo2 = Exo_2({ subsets: ['latin'], weight: ['100', '300', '400', '600', '700', '900'], display: 'swap' })

export default function Hero() {
  const [displayText, setDisplayText] = useState('')
  const fullText = "Software AI Engineer & AI Automation Specialist"

  useEffect(() => {
    let index = 0
    // Small delay before typing starts
    const startDelay = setTimeout(() => {
      const timer = setInterval(() => {
        setDisplayText(fullText.substring(0, index + 1))
        index++
        if (index === fullText.length) clearInterval(timer)
      }, 50)
      return () => clearInterval(timer)
    }, 500)
    return () => clearTimeout(startDelay)
  }, [])

  return (
    <section
      id="hero"
      className="relative min-h-[100dvh] w-full flex items-center justify-center overflow-hidden bg-slate-50 dark:bg-[#050a10] text-gray-900 dark:text-white transition-colors duration-300"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-100/40 via-slate-50 to-slate-50 dark:bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] dark:from-emerald-900/20 dark:via-[#050a10] dark:to-[#050a10] pointer-events-none" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-24 sm:py-28 lg:py-0 lg:h-screen flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-16">

        {/* Mobile: Profile photo on top */}
        <div className="flex lg:hidden items-center justify-center">
          <div className="relative w-36 h-36 sm:w-48 sm:h-48 rounded-full overflow-hidden border-4 border-emerald-500/80 shadow-[0_0_50px_rgba(16,185,129,0.4)] bg-slate-200 dark:bg-slate-800">
            <Image
              src="/profil.jpg"
              alt="Mohammed Amouzoun"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Left Column - Text */}
        <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left gap-4 sm:gap-5 w-full">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-slate-200/80 dark:bg-slate-800/60 border border-slate-300 dark:border-slate-700 backdrop-blur-sm">
            <span className="wave-emoji text-sm sm:text-base">👋</span>
            <span className="text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-200">Available for work</span>
          </div>

          {/* Name */}
          <h1 className={`${exo2.className} text-gray-900 dark:text-white text-5xl sm:text-6xl md:text-7xl lg:text-[6rem] font-bold tracking-tight leading-[1.1]`}>
            Mohammed
          </h1>

          {/* Typewriter role & Description */}
          <div className="relative w-full flex flex-col items-center lg:items-start text-center lg:text-left mb-6 sm:mb-8">
            <div className="flex flex-col items-center justify-center lg:justify-start lg:items-start mb-4 sm:mb-5">
              <span className={`${exo2.className} text-sm sm:text-lg lg:text-xl font-medium text-gray-500 dark:text-gray-300 tracking-wide mb-1 sm:mb-2`}>
                I am a
              </span>
              <span className={`${exo2.className} text-[clamp(11px,3.2vw,24px)] md:text-[clamp(14px,2vw,30px)] lg:text-3xl font-semibold text-emerald-500 dark:text-emerald-400 tracking-wide whitespace-nowrap min-h-[20px] sm:min-h-[30px] lg:min-h-[36px]`}>
                {displayText}<span className="animate-pulse">|</span>
              </span>
            </div>
            <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base lg:text-lg leading-relaxed max-w-xl">
              I build robust, full-stack applications powered by state-of-the-art Large Language Models. From backend Node.js APIs to dynamic Next.js frontends, I create AI solutions that truly perform.
            </p>
          </div>
          {/* CTA Button */}
          <div className="flex items-center justify-center lg:justify-start gap-4 w-full">
            <a
              href="#projects"
              onClick={(e) => { e.preventDefault(); document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }) }}
              className="group px-6 py-3 sm:px-7 sm:py-3.5 bg-emerald-500 hover:bg-emerald-400 text-white text-sm sm:text-base font-semibold rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(16,185,129,0.3)] flex items-center justify-center gap-2"
            >
              View My Projects
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>

          {/* Social icons — mobile only (sidebar handles desktop) */}
          <div className="flex lg:hidden items-center gap-3">
            <a
              href="https://github.com/Mohammed-Am"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="p-2.5 rounded-full bg-slate-200 dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-emerald-500 hover:text-white dark:hover:bg-emerald-500 dark:hover:text-white transition-all duration-200"
            >
              <SiGithub className="w-5 h-5" />
            </a>
            <a
              href="https://linkedin.com/in/mohammed-amouzoun"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="p-2.5 rounded-full bg-slate-200 dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-emerald-500 hover:text-white dark:hover:bg-emerald-500 dark:hover:text-white transition-all duration-200"
            >
              <FaLinkedin className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Right Column — Desktop profile photo */}
        <div className="hidden lg:flex items-center justify-center lg:flex-1">
          <div className="relative w-72 h-72 xl:w-80 xl:h-80 rounded-full overflow-hidden border-4 border-emerald-500/80 shadow-[0_0_60px_rgba(16,185,129,0.35)] bg-slate-200 dark:bg-slate-800">
            <Image
              src="/profil.jpg"
              alt="Mohammed Amouzoun"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

      </div>
    </section>
  )
}
