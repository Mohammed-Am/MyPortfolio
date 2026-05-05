'use client'
import { useState, useEffect } from 'react'
import { projectsContent } from '@/data/content'

export default function Projects() {
  const { featured, projects } = projectsContent
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
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

  const openPreview = (url: string) => {
    setPreviewUrl(url)
    setIsLoading(true)
  }

  const closePreview = () => {
    setPreviewUrl(null)
  }

  return (
    <section id="projects" className="py-12 sm:py-24 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-20">
          <p className="text-emerald-600 dark:text-emerald-400 text-xs sm:text-sm font-bold tracking-[0.2em] uppercase mb-3">
            {projectsContent.subtitle}
          </p>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-gray-900 dark:text-white tracking-tighter">
            {projectsContent.title}
          </h2>
          <div className="w-12 sm:w-20 h-1.5 bg-emerald-500 mx-auto mt-6 rounded-full" />
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-12 sm:mb-16">
          <div className="inline-flex items-center flex-wrap justify-center gap-2 p-1.5 bg-gray-100 dark:bg-white/5 rounded-2xl border border-gray-200 dark:border-white/10">
            {['Web Design', 'Web Development', 'AI Automation'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 sm:px-8 sm:py-3.5 rounded-xl text-sm sm:text-base font-semibold transition-all duration-300 ${
                  activeTab === tab 
                    ? 'bg-white dark:bg-[#1A1A1A] text-emerald-600 dark:text-emerald-400 shadow-sm border border-gray-200/50 dark:border-white/5' 
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Projects Section */}
        <div className="flex flex-col gap-10 sm:gap-24 mb-16 sm:mb-32">
          {filteredProjects.length === 0 ? (
            <div className="text-center py-20 px-6 glass-card rounded-[2rem] sm:rounded-[3rem] border border-dashed border-emerald-500/20 dark:border-white/10 transition-all duration-500 hover:border-emerald-500/40">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center">
                <svg className="w-8 h-8 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">Projects Cooking...</h3>
              <p className="text-gray-600 dark:text-gray-400 text-lg max-w-lg mx-auto leading-relaxed">
                {activeTab === 'AI Automation' 
                  ? 'I am currently finalizing my n8n, Make, and chatbot automation workflows. Check back soon!'
                  : `I am currently finalizing my ${activeTab} case studies and polishing the pixels. Check back soon!`}
              </p>
            </div>
          ) : (
            filteredProjects.map((item, index) => (
            <div 
              key={item.title}
              className="glass-card rounded-[2rem] sm:rounded-[3rem] overflow-hidden border border-emerald-500/10 dark:border-emerald-500/20 group transition-all duration-700 hover:shadow-[0_0_100px_rgba(16,185,129,0.1)]"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                {/* Content Side */}
                <div className={`p-6 sm:p-12 lg:p-20 flex flex-col justify-center ${index % 2 === 1 ? 'lg:order-last border-t lg:border-t-0 lg:border-l border-gray-200 dark:border-white/5' : 'border-b lg:border-b-0 lg:border-r border-gray-200 dark:border-white/5'}`}>
                  <div className="flex items-center gap-3 mb-4 sm:mb-6">
                    <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] sm:text-xs font-black uppercase tracking-wider border border-emerald-500/20">
                      {item.subtitle || item.badge}
                    </span>
                  </div>
                  
                  <h3 className="text-2xl sm:text-4xl lg:text-5xl font-black text-gray-900 dark:text-white mb-4 sm:mb-6 leading-tight tracking-tight">
                    {item.title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6 sm:mb-10 text-sm sm:text-lg lg:text-xl font-light">
                    {item.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-8 sm:mb-12">
                    {item.tech.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-500/5 text-emerald-700 dark:text-emerald-400 text-[10px] sm:text-xs font-bold border border-emerald-200/50 dark:border-emerald-500/10"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                    <button
                      onClick={() => openPreview(item.live)}
                      className="w-full sm:w-auto flex items-center justify-center gap-3 px-6 py-3 sm:px-8 sm:py-4 bg-emerald-50 dark:bg-emerald-500/10 hover:bg-emerald-100 dark:hover:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-sm sm:text-base font-bold rounded-xl sm:rounded-2xl transition-all border border-emerald-200 dark:border-emerald-500/20"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      Preview
                    </button>
                    <a
                      href={item.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto flex items-center justify-center gap-3 px-6 py-3 sm:px-8 sm:py-4 bg-emerald-500 hover:bg-emerald-400 text-black text-sm sm:text-base font-bold rounded-xl sm:rounded-2xl transition-all shadow-lg shadow-emerald-500/20"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      Live Site
                    </a>
                  </div>
                </div>

                {/* Image Side */}
                <div 
                  className={`relative h-[280px] sm:h-[450px] lg:h-auto overflow-hidden bg-gray-100 dark:bg-gray-950 cursor-pointer group/image`}
                  onClick={() => openPreview(item.live)}
                >
                  {item.image ? (
                    <div className="w-full h-full relative overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-auto absolute top-0 left-0 transition-transform duration-[6000ms] ease-linear group-hover/image:-translate-y-[calc(100%-280px)] sm:group-hover/image:-translate-y-[calc(100%-450px)] lg:group-hover/image:-translate-y-[calc(100%-600px)]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none group-hover/image:opacity-0 transition-opacity duration-500" />
                      
                      {/* Interactive Hint for Mobile */}
                      <div className="absolute top-4 right-4 sm:hidden bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 text-[10px] font-bold text-white flex items-center gap-2">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                        TAP TO PREVIEW
                      </div>

                      {/* Desktop Hover Hint */}
                      <div className="absolute inset-0 hidden sm:flex items-center justify-center opacity-0 group-hover/image:opacity-100 transition-opacity duration-300 z-20">
                        <div className="px-8 py-4 bg-black/70 backdrop-blur-2xl text-white rounded-2xl text-base font-black border border-white/20 shadow-2xl">
                          OPEN INTERACTIVE PREVIEW
                        </div>
                      </div>
                      
                      {/* Scroll hint */}
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 group-hover/image:opacity-0 transition-opacity duration-300">
                        <span className="text-[8px] sm:text-[10px] font-black uppercase tracking-widest text-white/80">Hover to Scroll</span>
                        <div className="w-4 h-6 sm:w-5 sm:h-8 border-2 border-white/30 rounded-full flex justify-center p-1">
                          <div className="w-0.5 h-1 sm:w-1 sm:h-1.5 bg-emerald-400 rounded-full animate-bounce" />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-900">
                      <div className="text-center p-8">
                        <div className="text-6xl mb-4 opacity-20">🌐</div>
                        <p className="text-emerald-600 dark:text-emerald-400 font-black text-xl">{item.title}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
          )}
        </div>

        {/* Other Projects (Hidden if empty) */}
        {projects.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {projects.map((project) => (
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

      {/* Live Preview Modal - MOBILE OPTIMIZED */}
      {previewUrl && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center sm:p-6 md:p-10">
          <div className="absolute inset-0 bg-black/95 backdrop-blur-xl animate-in fade-in duration-500" onClick={closePreview} />
          
          <div className="relative w-full h-full sm:max-w-7xl sm:h-full bg-[#050a10] sm:rounded-[2.5rem] overflow-hidden flex flex-col animate-in zoom-in-95 duration-500">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 sm:px-8 sm:py-5 bg-[#0d1520] border-b border-white/5">
              <div className="flex items-center gap-4 sm:gap-6">
                <div className="hidden sm:flex gap-2.5">
                  <div className="w-3.5 h-3.5 rounded-full bg-red-500/40" />
                  <div className="w-3.5 h-3.5 rounded-full bg-amber-500/40" />
                  <div className="w-3.5 h-3.5 rounded-full bg-emerald-500/40" />
                </div>
                <div className="text-[10px] sm:text-xs text-gray-400 font-mono tracking-tight bg-black/40 px-3 py-1 rounded-lg border border-white/5 max-w-[150px] sm:max-w-none truncate">
                  {previewUrl}
                </div>
              </div>
              <div className="flex items-center gap-2 sm:gap-4">
                <a href={previewUrl} target="_blank" rel="noopener noreferrer" className="p-2 sm:p-3 rounded-xl bg-white/5 text-gray-400">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                </a>
                <button onClick={closePreview} className="p-2 sm:p-3 rounded-xl bg-white/5 text-gray-400 hover:text-red-400">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
            </div>

            {/* Iframe */}
            <div className="relative flex-1 bg-white">
              {isLoading && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#050a10] z-10">
                  <div className="w-12 h-12 border-4 border-emerald-500/10 border-t-emerald-500 rounded-full animate-spin" />
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
