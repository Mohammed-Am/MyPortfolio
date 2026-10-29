export default function Projects() {
  return (
    <section id="projects" className="py-12 sm:py-24 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-12">
          <p className="text-emerald-600 dark:text-emerald-400 text-xs font-bold tracking-[0.2em] uppercase mb-2">
            Web Design & Development
          </p>
          <h2 className="text-2xl sm:text-4xl font-black text-gray-900 dark:text-white tracking-tighter">
            Website Projects
          </h2>
          <div className="w-10 h-1 bg-emerald-500 mx-auto mt-4 rounded-full" />
        </div>
        <div className="flex justify-center mb-16">
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
            <h3 className="text-2xl lg:text-3xl font-black text-gray-900 dark:text-white mb-3">Websites Built with Purpose</h3>
            <p className="text-gray-500 dark:text-gray-400 max-w-sm mx-auto leading-relaxed text-sm sm:text-base">
              Website projects and case studies will be shared here, with a focus on design, responsive layouts, and SEO foundations.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
