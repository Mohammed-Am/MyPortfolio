'use client'

import { SiGithub } from 'react-icons/si'
import { FaLinkedin } from 'react-icons/fa'

export default function SocialSidebar() {
  return (
    <div className="fixed left-4 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col items-center gap-4">
      {/* Vertical line top */}
      <div className="w-px h-16 bg-gradient-to-b from-transparent to-slate-400 dark:to-slate-600" />

      <a
        href="https://github.com/Mohammed-Am"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub"
        className="p-2 rounded-full text-slate-500 dark:text-slate-400 hover:text-emerald-500 dark:hover:text-emerald-400 hover:scale-110 transition-all duration-200"
      >
        <SiGithub className="w-5 h-5" />
      </a>

      <a
        href="https://linkedin.com/in/mohammed-amouzoun"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn"
        className="p-2 rounded-full text-slate-500 dark:text-slate-400 hover:text-emerald-500 dark:hover:text-emerald-400 hover:scale-110 transition-all duration-200"
      >
        <FaLinkedin className="w-5 h-5" />
      </a>

      {/* Vertical line bottom */}
      <div className="w-px h-16 bg-gradient-to-t from-transparent to-slate-400 dark:to-slate-600" />
    </div>
  )
}
