'use client'
import { useState, useEffect, useRef } from 'react'
import { projectsContent } from '@/data/content'

export default function Projects() {
  const { featured, projects } = projectsContent
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [previewIndex, setPreviewIndex] = useState<number>(0)
  const [isLoading, setIsLoading] = useState(true)

  const filteredProjects = featured.filter((p: any) => p.category === 'Web Development' || !p.category)

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

  const iframeRef = useRef<HTMLIFrameElement>(null)

  const iframeBack    = () => iframeRef.current?.contentWindow?.history.back()
  const iframeForward = () => iframeRef.current?.contentWindow?.history.forward()
  const iframeRefresh = () => {
    if (iframeRef.current) iframeRef.current.src = iframeRef.current.src
  }
  const iframeHome = () => {
    if (iframeRef.current && previewUrl) iframeRef.current.src = previewUrl
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

        {/* AI Automation Coming Soon — always visible */}
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
              <div className="flex items-center gap-3 sm:gap-4 flex-1">
                {/* Traffic lights */}
                <div className="hidden sm:flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/40" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/40" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/40" />
                </div>
                {/* Browser nav buttons */}
                <div className="flex items-center gap-1">
                  <button onClick={iframeBack} className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all" title="Back">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                  </button>
                  <button onClick={iframeForward} className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all" title="Forward">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  </button>
                  <button onClick={iframeRefresh} className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all" title="Refresh">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                  </button>
                  <button onClick={iframeHome} className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all" title="Home">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                  </button>
                </div>
                {/* URL bar */}
                <div className="flex-1 text-[10px] sm:text-xs text-gray-400 font-mono bg-black/40 px-3 py-1.5 rounded-lg border border-white/5 truncate hidden sm:block">
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
              <iframe
                ref={iframeRef}
                src={previewUrl}
                className="w-full h-full border-none"
                onLoad={() => setIsLoading(false)}
                title="Project Live Preview"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
