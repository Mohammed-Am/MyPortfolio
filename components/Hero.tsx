'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Exo_2 } from 'next/font/google'


const exo2 = Exo_2({ subsets: ['latin'], weight: ['100', '300', '400', '600', '700', '900'], display: 'swap' })

const roles = ['Front-End Developer', 'WordPress Expert', 'Web Developer']

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
        timeout = setTimeout(() => setTyping(false), 1800)
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
    <section id="hero" className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-slate-50 dark:bg-[#050a10] text-gray-900 dark:text-white transition-colors duration-300">
      <div id="about" className="absolute top-0" />

      <div className="relative z-10 w-full px-4 sm:px-6 pt-16 sm:pt-28 pb-8 sm:pb-24">
        {/* Main Layout: Split Screen */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 sm:gap-12 lg:gap-8 w-full max-w-6xl mx-auto">
            
            {/* Left: Profile & Orbiting Tech Stack */}
            <div className="w-full lg:w-1/2 flex justify-center lg:justify-start">
              <div className="relative flex items-center justify-center w-[220px] h-[220px] sm:w-[450px] sm:h-[450px] mx-auto lg:mx-0">
                {/* Profile image */}
                <div className="relative w-28 h-28 sm:w-56 sm:h-56 rounded-full overflow-hidden border-2 border-emerald-500/50 shadow-[0_0_50px_rgba(16,185,129,0.3)] z-10 bg-slate-100 dark:bg-gray-800">
                  <Image
                    src="/profil.jpg"
                    alt="Mohammed Amouzoun"
                    fill
                    className="object-cover"
                    priority
                  />
              </div>
            </div>

            {/* Right: Text Content */}
            <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left gap-y-4">
              <p className={`${exo2.className} text-emerald-400/90 text-xl sm:text-2xl font-medium tracking-wider flex items-center justify-center lg:justify-start gap-2`}>
                <span className="text-lg sm:text-xl wave-emoji">👋</span> Hello, I am
              </p>

              <h1 className={`${exo2.className} text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white drop-shadow-sm tracking-tight sm:tracking-widest leading-tight sm:leading-none transition-colors duration-300`}>
                Mohammed
              </h1>

              <div className={`${exo2.className} text-base sm:text-xl font-light text-gray-700 dark:text-gray-300 h-8 flex items-center justify-center lg:justify-start transition-colors duration-300`}>
                <span className="text-emerald-400 font-medium tracking-wide">{displayed}</span>
              </div>

              <p className={`${exo2.className} text-gray-600 dark:text-gray-400/90 w-full text-sm sm:text-lg leading-relaxed font-light px-6 sm:px-0 transition-colors duration-300`}>
                From strategy and UI/UX design to development and launch, we deliver websites that combine <span className="text-gray-900 dark:text-white font-medium">premium visuals</span> with <span className="text-emerald-500 dark:text-emerald-400 font-medium">real business results</span>.
              </p>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mt-6 w-full z-20 relative px-4 sm:px-0">
                <a
                  href="#projects"
                  className="group px-7 sm:px-8 py-3.5 sm:py-4 bg-emerald-500/90 hover:bg-emerald-400 text-[#050a10] text-sm sm:text-base font-semibold rounded-xl transition-all duration-300 hover:shadow-[0_0_25px_rgba(16,185,129,0.4)] flex items-center gap-2 hover:-translate-y-0.5"
                >
                  View My Work
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>
  )
}
