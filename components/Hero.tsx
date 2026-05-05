'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Exo_2 } from 'next/font/google'
import { SiTypescript, SiNextdotjs, SiPhp, SiReact, SiWordpress, SiTailwindcss, SiJavascript, SiGit, SiN8N, SiFigma, SiWebflow, SiGreensock } from 'react-icons/si'

const exo2 = Exo_2({ subsets: ['latin'], weight: ['100', '300', '400', '600', '700', '900'], display: 'swap' })

const roles = ['Front-End Developer', 'WordPress Expert', 'Web Designer', 'AI Automation']

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
    <section id="hero" className="relative min-h-[90vh] sm:min-h-screen flex flex-col justify-center overflow-hidden bg-slate-50 dark:bg-[#050a10] text-gray-900 dark:text-white transition-colors duration-300">
      <div id="about" className="absolute top-0" />

      <div className="relative z-10 w-full px-4 sm:px-6 pt-20 sm:pt-28 pb-14 sm:pb-24">
        {/* Main Layout: Split Screen */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8 w-full max-w-6xl mx-auto">
            
            {/* Left: Profile & Orbiting Tech Stack */}
            <div className="w-full lg:w-1/2 flex justify-center lg:justify-start">
              <div className="relative flex items-center justify-center w-[300px] h-[300px] sm:w-[450px] sm:h-[450px] mx-auto lg:mx-0">
                
                {/* Outer Orbit Track */}
                <div className="absolute w-[280px] h-[280px] sm:w-[420px] sm:h-[420px] rounded-full border border-dashed border-emerald-500/30 dark:border-white/10 opacity-60 animate-[spin_40s_linear_infinite]" />
                {/* Inner Orbit Track */}
                <div className="absolute w-[180px] h-[180px] sm:w-[280px] sm:h-[280px] rounded-full border border-dashed border-emerald-500/30 dark:border-white/10 opacity-60 animate-[spin_30s_linear_infinite_reverse]" />

                {/* Profile image */}
                <div className="relative w-32 h-32 sm:w-44 sm:h-44 rounded-full overflow-hidden border-2 border-emerald-500/50 shadow-[0_0_50px_rgba(16,185,129,0.3)] z-10 bg-slate-100 dark:bg-gray-800">
                  <Image
                    src="/profil.jpg"
                    alt="Mohammed Amouzoun"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>

                {/* Orbiting Tech Icons (Real SVGs) */}
                
                {/* Outer Ring Icons */}
                <div className="orbit-item outer-orbit w-10 h-10 sm:w-12 sm:h-12 -ml-5 -mt-5 sm:-ml-6 sm:-mt-6 flex items-center justify-center rounded-full bg-[#3178C6] shadow-xl border border-white/20 cursor-default group z-20 hover:z-50" style={{ '--duration': '30s', '--delay': '0s' } as any}>
                  <SiTypescript className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  <span className="absolute -top-12 opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-3 py-1.5 bg-[#050a10]/90 backdrop-blur-md text-white text-[10px] sm:text-xs font-bold rounded-lg pointer-events-none whitespace-nowrap border border-white/10 shadow-2xl z-50">TypeScript</span>
                </div>
                <div className="orbit-item outer-orbit w-10 h-10 sm:w-12 sm:h-12 -ml-5 -mt-5 sm:-ml-6 sm:-mt-6 flex items-center justify-center rounded-full bg-black shadow-xl border border-white/20 cursor-default group z-20 hover:z-50" style={{ '--duration': '30s', '--delay': '-5s' } as any}>
                  <SiNextdotjs className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                  <span className="absolute -top-12 opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-3 py-1.5 bg-[#050a10]/90 backdrop-blur-md text-white text-[10px] sm:text-xs font-bold rounded-lg pointer-events-none whitespace-nowrap border border-white/10 shadow-2xl z-50">Next.js</span>
                </div>
                <div className="orbit-item outer-orbit w-10 h-10 sm:w-12 sm:h-12 -ml-5 -mt-5 sm:-ml-6 sm:-mt-6 flex items-center justify-center rounded-full bg-[#777BB4] shadow-xl border border-white/20 cursor-default group z-20 hover:z-50" style={{ '--duration': '30s', '--delay': '-10s' } as any}>
                  <SiPhp className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                  <span className="absolute -top-12 opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-3 py-1.5 bg-[#050a10]/90 backdrop-blur-md text-white text-[10px] sm:text-xs font-bold rounded-lg pointer-events-none whitespace-nowrap border border-white/10 shadow-2xl z-50">PHP</span>
                </div>
                <div className="orbit-item outer-orbit w-10 h-10 sm:w-12 sm:h-12 -ml-5 -mt-5 sm:-ml-6 sm:-mt-6 flex items-center justify-center rounded-full bg-[#F05032] shadow-xl border border-white/20 cursor-default group z-20 hover:z-50" style={{ '--duration': '30s', '--delay': '-15s' } as any}>
                  <SiGit className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                  <span className="absolute -top-12 opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-3 py-1.5 bg-[#050a10]/90 backdrop-blur-md text-white text-[10px] sm:text-xs font-bold rounded-lg pointer-events-none whitespace-nowrap border border-white/10 shadow-2xl z-50">Git</span>
                </div>
                <div className="orbit-item outer-orbit w-10 h-10 sm:w-12 sm:h-12 -ml-5 -mt-5 sm:-ml-6 sm:-mt-6 flex items-center justify-center rounded-full bg-[#FF6D5A] shadow-xl border border-white/20 cursor-default group z-20 hover:z-50" style={{ '--duration': '30s', '--delay': '-20s' } as any}>
                  <SiN8N className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                  <span className="absolute -top-12 opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-3 py-1.5 bg-[#050a10]/90 backdrop-blur-md text-white text-[10px] sm:text-xs font-bold rounded-lg pointer-events-none whitespace-nowrap border border-white/10 shadow-2xl z-50">n8n</span>
                </div>
                <div className="orbit-item outer-orbit w-10 h-10 sm:w-12 sm:h-12 -ml-5 -mt-5 sm:-ml-6 sm:-mt-6 flex items-center justify-center rounded-full bg-[#4353FF] shadow-xl border border-white/20 cursor-default group z-20 hover:z-50" style={{ '--duration': '30s', '--delay': '-25s' } as any}>
                  <SiWebflow className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  <span className="absolute -top-12 opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-3 py-1.5 bg-[#050a10]/90 backdrop-blur-md text-white text-[10px] sm:text-xs font-bold rounded-lg pointer-events-none whitespace-nowrap border border-white/10 shadow-2xl z-50">Webflow</span>
                </div>

                {/* Inner Ring Icons */}
                <div className="orbit-item inner-orbit w-10 h-10 sm:w-12 sm:h-12 -ml-5 -mt-5 sm:-ml-6 sm:-mt-6 flex items-center justify-center rounded-full bg-[#20232A] shadow-xl border border-[#61DAFB]/40 cursor-default group z-20 hover:z-50" style={{ '--duration': '18s', '--delay': '0s' } as any}>
                  <SiReact className="w-6 h-6 sm:w-7 sm:h-7 text-[#61DAFB]" />
                  <span className="absolute -top-12 opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-3 py-1.5 bg-[#050a10]/90 backdrop-blur-md text-white text-[10px] sm:text-xs font-bold rounded-lg pointer-events-none whitespace-nowrap border border-white/10 shadow-2xl z-50">React</span>
                </div>
                <div className="orbit-item inner-orbit w-10 h-10 sm:w-12 sm:h-12 -ml-5 -mt-5 sm:-ml-6 sm:-mt-6 flex items-center justify-center rounded-full bg-[#21759B] shadow-xl border border-white/20 cursor-default group z-20 hover:z-50" style={{ '--duration': '18s', '--delay': '-3s' } as any}>
                  <SiWordpress className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                  <span className="absolute -top-12 opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-3 py-1.5 bg-[#050a10]/90 backdrop-blur-md text-white text-[10px] sm:text-xs font-bold rounded-lg pointer-events-none whitespace-nowrap border border-white/10 shadow-2xl z-50">WordPress</span>
                </div>
                <div className="orbit-item inner-orbit w-10 h-10 sm:w-12 sm:h-12 -ml-5 -mt-5 sm:-ml-6 sm:-mt-6 flex items-center justify-center rounded-full bg-[#0F172A] shadow-xl border border-white/20 cursor-default group z-20 hover:z-50" style={{ '--duration': '18s', '--delay': '-6s' } as any}>
                  <SiTailwindcss className="w-5 h-5 sm:w-6 sm:h-6 text-[#38BDF8]" />
                  <span className="absolute -top-12 opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-3 py-1.5 bg-[#050a10]/90 backdrop-blur-md text-white text-[10px] sm:text-xs font-bold rounded-lg pointer-events-none whitespace-nowrap border border-white/10 shadow-2xl z-50">Tailwind CSS</span>
                </div>
                <div className="orbit-item inner-orbit w-10 h-10 sm:w-12 sm:h-12 -ml-5 -mt-5 sm:-ml-6 sm:-mt-6 flex items-center justify-center rounded-full bg-[#323330] shadow-xl border border-white/10 cursor-default group z-20 hover:z-50" style={{ '--duration': '18s', '--delay': '-9s' } as any}>
                  <span className="text-[#F7DF1E] font-bold text-sm sm:text-base tracking-tighter">JS</span>
                  <span className="absolute -top-12 opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-3 py-1.5 bg-[#050a10]/90 backdrop-blur-md text-white text-[10px] sm:text-xs font-bold rounded-lg pointer-events-none whitespace-nowrap border border-white/10 shadow-2xl z-50">JavaScript</span>
                </div>
                <div className="orbit-item inner-orbit w-10 h-10 sm:w-12 sm:h-12 -ml-5 -mt-5 sm:-ml-6 sm:-mt-6 flex items-center justify-center rounded-full bg-[#111] shadow-xl border border-white/10 cursor-default group z-20 hover:z-50" style={{ '--duration': '18s', '--delay': '-12s' } as any}>
                  <SiGreensock className="w-6 h-6 sm:w-7 sm:h-7 text-[#88CE02]" />
                  <span className="absolute -top-12 opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-3 py-1.5 bg-[#050a10]/90 backdrop-blur-md text-white text-[10px] sm:text-xs font-bold rounded-lg pointer-events-none whitespace-nowrap border border-white/10 shadow-2xl z-50">GSAP</span>
                </div>
                <div className="orbit-item inner-orbit w-10 h-10 sm:w-12 sm:h-12 -ml-5 -mt-5 sm:-ml-6 sm:-mt-6 flex items-center justify-center rounded-full bg-white shadow-xl border border-gray-200 cursor-default group z-20 hover:z-50" style={{ '--duration': '18s', '--delay': '-15s' } as any}>
                  <svg viewBox="0 0 38 57" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 sm:w-5 sm:h-5">
                    <path fill="#F24E1E" d="M0 9.5A9.5 9.5 0 0 1 9.5 0H19v19H9.5A9.5 9.5 0 0 1 0 9.5z"/>
                    <path fill="#FF7262" d="M19 9.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z"/>
                    <path fill="#A259FF" d="M0 28.5A9.5 9.5 0 0 1 9.5 19H19v19H9.5A9.5 9.5 0 0 1 0 28.5z"/>
                    <path fill="#1ABCFE" d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z"/>
                    <path fill="#0ACF83" d="M0 47.5A9.5 9.5 0 0 0 9.5 57 9.5 9.5 0 0 0 19 47.5V38H9.5A9.5 9.5 0 0 0 0 47.5z"/>
                  </svg>
                  <span className="absolute -top-12 opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-3 py-1.5 bg-[#050a10]/90 backdrop-blur-md text-white text-[10px] sm:text-xs font-bold rounded-lg pointer-events-none whitespace-nowrap border border-white/10 shadow-2xl z-50">Figma</span>
                </div>
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

              <div className="flex items-center justify-center lg:justify-start w-full px-4 sm:px-0">
                <span className={`${exo2.className} text-lg sm:text-2xl md:text-3xl lg:text-4xl leading-snug sm:leading-none text-gray-900 dark:text-white tracking-normal sm:tracking-wider transition-colors duration-300`}>
                  Web Design & Development
                </span>
              </div>

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
