'use client'
import { useState, useEffect } from 'react'
import { projectsContent } from '@/data/content'

export default function Projects() {
  const { featured, projects } = projectsContent
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [previewIndex, setPreviewIndex] = useState<number>(0)
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('Web Development')

  const filteredProjects = featured.filter((p: any) => p.category === activeTab || (!p.category && activeTab === 'Web Development'))

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (previewUrl) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [previewUrl])

  // Keyboard navigation
  useEffect(() => {
    if (!previewUrl) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') navigatePreview(1)
      if (e.key === 'ArrowLeft') navigatePreview(-1)
      if (e.key === 'Escape') closePreview()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [previewUrl, previewIndex, filteredProjects])

  const openPreview = (index: number) => {
    setPreviewIndex(index)
    setPreviewUrl(filteredProjects[index]?.live)
    setIsLoading(true)
  }

  const navigatePreview = (dir: number) => {
    const next = (previewIndex + dir + filteredProjects.length) % filteredProjects.length
    setPreviewIndex(next)
    setPreviewUrl(filteredProjects[next]?.live)
    setIsLoading(true)
  }

  const closePreview = () => {
    setPreviewUrl(null)
  }

  return (
    <section id="projects" className="py-12 sm:py-24 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <p className="text-emerald-600 dark:text-emerald-400 text-xs font-bold tracking-[0.2em] uppercase mb-2">
            {projectsContent.subtitle}
          </p>
          <h2 className="text-2xl sm:text-4xl font-black text-gray-900 dark:text-white tracking-tighter">
            {projectsContent.title}
          </h2>
          <div className="w-10 h-1 bg-emerald-500 mx-auto mt-4 rounded-full" />
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 p-1.5 bg-gray-100 dark:bg-white/5 rounded-2xl border border-gray-200 dark:border-white/10">
            {['Web Development', 'AI Automation'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2.5 sm:px-7 sm:py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                  activeTab === tab
                    ? 'bg-white dark:bg-[#1A1A1A] text-emerald-600 dark:text-emerald-400 shadow-sm border border-gray-200/50 dark:border-white/5'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                {tab === 'AI Automation' && (
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 mr-2 animate-pulse align-middle" />
                )}
                {tab}
              </button>
            ))}
          </div>
        </div>
        {/* AI Automation Coming Soon */}
        {activeTab === 'AI Automation' && (
          <div className="text-center py-16 px-6 glass-card rounded-[2rem] border border-dashed border-emerald-500/30 dark:border-emerald-500/20 mb-16">
            <div className="relative w-20 h-20 mx-auto mb-6">
              <div className="absolute inset-0 rounded-full bg-emerald-500/20 animate-ping" />
              <div className="relative w-20 h-20 rounded-full bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                <svg className="w-9 h-9 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1 1 .3 2.7-1.1 2.7H3.9c-1.4 0-2.1-1.7-1.1-2.7L4.2 15.3" />
                </svg>
              </div>
            </div>
            <span className="inline-block px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-black uppercase tracking-widest border border-emerald-500/20 mb-4">Coming Soon</span>
            <h3 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white mb-3">AI Automation Projects</h3>
            <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto leading-relaxed">
              I&apos;m currently finalizing my <span className="text-emerald-500 font-semibold">n8n workflows</span>, chatbot automations and Make.com integrations. Check back soon!
            </p>
          </div>
        )}

        {activeTab === 'Web Development' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 mb-16">
            {filteredProjects.length === 0 ? (
              <div className="col-span-2 text-center py-20 px-6 glass-card rounded-2xl border border-dashed border-emerald-500/20 dark:border-white/10">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Projects Cooking...</h3>
                <p className="text-gray-600 dark:text-gray-400 text-lg max-w-lg mx-auto leading-relaxed">
                  I am currently finalizing my Web Development case studies. Check back soon!
                </p>
              </div>
            ) : (
              filteredProjects.map((item) => (
                <div
                  key={item.title}
                  className="glass-card rounded-2xl overflow-hidden border border-emerald-500/10 dark:border-emerald-500/20 group transition-all duration-500 hover:shadow-[0_0_40px_rgba(16,185,129,0.12)] hover:-translate-y-1 flex flex-col"
                >
                  {/* Image Top */}
                  <div
                    className="relative h-[180px] sm:h-[220px] overflow-hidden bg-gray-100 dark:bg-gray-950 cursor-pointer group/image flex-shrink-0"
                    onClick={() => openPreview(filteredProjects.indexOf(item))}
                  >
                    {item.image ? (
                      <div className="w-full h-full relative overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-auto absolute top-0 left-0 animate-[pageScroll_8s_ease-in-out_infinite_alternate]"
                          style={{ animationDelay: `${filteredProjects.indexOf(item) * 1.5}s` }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                        <div className="absolute inset-0 hidden sm:flex items-center justify-center opacity-0 group-hover/image:opacity-100 transition-opacity duration-300 z-20">
                          <div className="px-5 py-2.5 bg-black/70 backdrop-blur-xl text-white rounded-xl text-xs font-black border border-white/20">
                            OPEN PREVIEW
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="text-5xl opacity-20">🌐</div>
                      </div>
                    )}
                  </div>

                  {/* Content Bottom */}
                  <div className="p-5 sm:p-6 flex flex-col flex-1">
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-black uppercase tracking-wider border border-emerald-500/20 w-fit mb-3">
                      {item.subtitle || item.badge}
                    </span>

                    <h3 className="text-lg sm:text-xl font-black text-gray-900 dark:text-white mb-2 leading-tight">
                      {item.title}
                    </h3>

                    <p className="text-gray-600 dark:text-gray-400 text-sm font-light leading-relaxed mb-4 flex-1">
                      {item.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {item.tech.map((tag: string) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-500/5 text-emerald-700 dark:text-emerald-400 text-[10px] font-bold border border-emerald-200/50 dark:border-emerald-500/10"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => openPreview(filteredProjects.indexOf(item))}
                        className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2 bg-emerald-50 dark:bg-emerald-500/10 hover:bg-emerald-100 dark:hover:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-xs font-bold rounded-lg transition-all border border-emerald-200 dark:border-emerald-500/20"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        Preview
                      </button>
                      <a
                        href={item.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-bold rounded-lg transition-all"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        Live Site
                      </a>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Other Projects (Hidden if empty) */}
        {(projects as any[]).length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {(projects as any[]).map((project) => (
              <div key={project.title} className="glass-card rounded-2xl sm:rounded-3xl overflow-hidden transition-all duration-500 hover:-translate-y-2 group">
                <div className="h-48 sm:h-56 relative overflow-hidden cursor-pointer" onClick={() => project.live && openPreview(project.live)}>
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                </div>
                <div className="p-6 sm:p-8">
                  <span className="px-3 py-1 rounded-lg bg-gray-100 dark:bg-white/5 text-[10px] font-black uppercase tracking-widest text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-white/5 mb-4 block w-fit">{project.badge}</span>
                  <h3 className="text-gray-900 dark:text-white font-black text-lg sm:text-xl mb-3">{project.title}</h3>
                  <p className="text-gray-600 dark:text-gray-500 text-sm leading-relaxed mb-6 line-clamp-2">{project.description}</p>
                  {project.live && (
                    <button onClick={() => openPreview(project.live!)} className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-black text-[10px] font-black uppercase tracking-widest rounded-xl transition-all">Preview</button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {previewUrl && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center sm:p-6 md:p-10">
          <div className="absolute inset-0 bg-black/95 backdrop-blur-xl" onClick={closePreview} />

          <div className="relative w-full h-full sm:max-w-7xl sm:h-full bg-[#050a10] sm:rounded-[2.5rem] overflow-hidden flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 sm:px-8 sm:py-4 bg-[#0d1520] border-b border-white/5">
              <div className="flex items-center gap-3 sm:gap-6">
                <div className="hidden sm:flex gap-2.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/40" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/40" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/40" />
                </div>
                <div className="text-[10px] sm:text-xs text-gray-400 font-mono bg-black/40 px-3 py-1 rounded-lg border border-white/5 max-w-[150px] sm:max-w-xs truncate">
                  {previewUrl}
                </div>
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                {/* Prev / Counter / Next */}
                {filteredProjects.length > 1 && (
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => navigatePreview(-1)}
                      className="p-1.5 sm:p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all"
                      title="Previous project (←)"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <span className="text-[10px] sm:text-xs text-gray-400 font-mono px-2">
                      {previewIndex + 1} / {filteredProjects.length}
                    </span>
                    <button
                      onClick={() => navigatePreview(1)}
                      className="p-1.5 sm:p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all"
                      title="Next project (→)"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                )}
                <a href={previewUrl} target="_blank" rel="noopener noreferrer" className="p-2 rounded-xl bg-white/5 text-gray-400 hover:text-white transition-all">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                </a>
                <button onClick={closePreview} className="p-2 rounded-xl bg-white/5 text-gray-400 hover:text-red-400 transition-all">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
            </div>

            {/* Iframe */}
            <div className="relative flex-1 bg-white">
              {isLoading && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#050a10] z-10">
                  <div className="w-10 h-10 border-4 border-emerald-500/10 border-t-emerald-500 rounded-full animate-spin mb-3" />
                  <p className="text-gray-500 text-xs">Loading preview...</p>
                </div>
              )}
              <iframe src={previewUrl} className="w-full h-full border-none" onLoad={() => setIsLoading(false)} title="Project Live Preview" />
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
