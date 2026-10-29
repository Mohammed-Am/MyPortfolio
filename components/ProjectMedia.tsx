'use client'
import { useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import type { Project } from '@/lib/portfolio'

export default function ProjectMedia({ project }: { project: Project }) {
  const [selected, setSelected] = useState(0)
  const [playGif, setPlayGif] = useState(false)
  const reduce = useReducedMotion()
  const media = [...[project.image, ...project.gallery].filter(Boolean).map(url => ({ url, video: false })), ...(project.video ? [{ url: project.video, video: true }] : [])]
  const current = media[selected] || media[0]
  if (!current) return <div className="aspect-video flex items-center justify-center bg-gradient-to-br from-emerald-100 to-slate-100 dark:from-emerald-950 dark:to-slate-900"><span className="text-5xl font-bold text-emerald-700/30 dark:text-emerald-400/30">{project.title.slice(0, 2).toUpperCase()}</span></div>
  const isGif = /\.gif(?:\?|$)/i.test(current.url)
  return <div><div className="aspect-video overflow-hidden bg-slate-100 dark:bg-slate-900 relative">{current.video ? <video key={current.url} src={current.url} poster={project.image || undefined} controls playsInline preload="metadata" aria-label={`${project.title} video walkthrough`} className="w-full h-full object-contain" /> : reduce && isGif && !playGif ? <button className="w-full h-full text-sm font-semibold text-emerald-700 dark:text-emerald-400" onClick={() => setPlayGif(true)}>Play animated GIF</button> : <img key={current.url} src={current.url} alt={`${project.title} — preview ${selected + 1}`} loading="lazy" className="w-full h-full object-cover motion-safe:transition-transform motion-safe:duration-700 group-hover:scale-[1.03]" />}</div>{media.length > 1 && <div className="flex flex-wrap gap-2 p-3 border-b border-slate-100 dark:border-white/5" aria-label={`${project.title} media`}>{media.map((item, i) => <button key={`${item.url}-${i}`} aria-pressed={selected === i} onClick={() => { setSelected(i); setPlayGif(false) }} className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${selected === i ? 'bg-emerald-600 text-white' : 'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300'}`}>{item.video ? '▶ Video' : `Image ${i + 1}`}</button>)}</div>}</div>
}
