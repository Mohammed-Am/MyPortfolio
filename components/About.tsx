'use client'
import { Exo_2 } from 'next/font/google'
import { aboutContent } from '@/data/content'

const exo2 = Exo_2({ subsets: ['latin'], weight: ['300', '400', '600', '700'], display: 'swap' })

export default function About() {
  return (
    <section
      id="about"
      className="relative pb-16 sm:pb-24 bg-slate-50 dark:bg-[#050a10] text-gray-900 dark:text-white transition-colors duration-300"
    >
      {/* same subtle radial overlay as hero */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#f8fafc_90%)] dark:bg-[radial-gradient(ellipse_at_center,transparent_0%,#050a10_100%)] pointer-events-none transition-colors duration-300" />

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 text-center">


        <div className="space-y-5">
          {aboutContent.bio.map((para, i) => (
            <p
              key={i}
              className={`${exo2.className} text-gray-600 dark:text-gray-400 leading-relaxed text-base sm:text-lg font-light transition-colors duration-300`}
            >
              {para}
            </p>
          ))}
        </div>

      </div>
    </section>
  )
}
