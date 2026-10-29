'use client'
import ProjectMedia from './ProjectMedia'
import { motion, useReducedMotion } from 'framer-motion'
import { usePortfolio } from './PortfolioProvider'

export default function Projects() {
  const { projects, appearance } = usePortfolio()
  const reduce = useReducedMotion()
  const published = projects.items.filter(project => project.published)
  return (
    <section id="projects" className="py-12 sm:py-24 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-12">
          <p className="text-emerald-600 dark:text-emerald-400 text-xs font-bold tracking-[0.2em] uppercase mb-2">
            {projects.subtitle}
          </p>
          <h2 className="text-2xl sm:text-4xl font-black text-gray-900 dark:text-white tracking-tighter">
            {projects.title}
          </h2>
          <div className="w-10 h-1 bg-emerald-500 mx-auto mt-4 rounded-full" />
        </div>
        {published.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2">
            {published.map((project, index) => (
              <motion.article key={project.id} initial={false} whileInView={appearance.animations && !reduce ? { opacity: [0.4, 1], y: [28, 0] } : { opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.55, delay: Math.min(index * 0.08, 0.3) }} whileHover={appearance.animations && !reduce ? { y: -6 } : {}} className="group overflow-hidden rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#0D0D0D] flex flex-col">
                <ProjectMedia project={project} />
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-xl font-bold mb-3">{project.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 whitespace-pre-line mb-5">{project.description}</p>
                  <p className="text-sm text-emerald-700 dark:text-emerald-400 mb-6">{project.technologies}</p>
                  {project.url && <a href={project.url} target="_blank" rel="noopener noreferrer" className="mt-auto underline underline-offset-4 font-semibold text-emerald-700 dark:text-emerald-400">Visit website <span aria-hidden="true">↗</span></a>}
                </div>
              </motion.article>
            ))}
          </div>
        ) : <div className="flex justify-center mb-16">
          <div className="w-full max-w-2xl text-center py-16 px-6 glass-card rounded-[2rem] border border-dashed border-emerald-500/30 dark:border-emerald-500/20">
            <div className="relative w-20 h-20 mx-auto mb-6">
              <div className="absolute inset-0 rounded-full bg-emerald-500/20 motion-safe:animate-ping" />
              <div className="relative w-20 h-20 rounded-full bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                <svg aria-hidden="true" className="w-9 h-9 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
            </div>
            <span className="inline-block px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-black uppercase tracking-widest border border-emerald-500/20 mb-4">Coming Soon</span>
            <h3 className="text-2xl lg:text-3xl font-black text-gray-900 dark:text-white mb-3">{projects.emptyTitle}</h3>
            <p className="text-gray-500 dark:text-gray-400 max-w-sm mx-auto leading-relaxed text-sm sm:text-base">
              {projects.emptyDescription}
            </p>
          </div>
        </div>}
      </div>
    </section>
  )
}
