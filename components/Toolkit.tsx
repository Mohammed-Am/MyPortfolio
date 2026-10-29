'use client'
import { usePortfolio } from './PortfolioProvider'
import { SiFramer, SiNextdotjs, SiWordpress } from 'react-icons/si'
import { Search, FileText, LayoutTemplate } from 'lucide-react'

const iconTools = [
    { name: 'Framer', icon: SiFramer },
    { name: 'WordPress', icon: SiWordpress },
    { name: 'Next.js', icon: SiNextdotjs },
    { name: 'On-page SEO', icon: Search },
    { name: 'Content Strategy', icon: FileText },
    { name: 'Responsive Design', icon: LayoutTemplate },
]

export default function Toolkit() {
    const { toolkit } = usePortfolio()
    const tools = toolkit.map(name => ({ name, icon: iconTools.find(tool => tool.name === name)?.icon || LayoutTemplate }))
    return (
        <section className="w-full py-8 sm:py-12 bg-slate-50 dark:bg-[#050a10] border-t border-b border-gray-200/50 dark:border-white/5 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
                {/* Soft fading edges for the marquee effect */}
                <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-r from-slate-50 dark:from-[#050a10] to-transparent z-10" />
                <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-l from-slate-50 dark:from-[#050a10] to-transparent z-10" />

                <div className="flex items-center overflow-hidden w-full opacity-80">
                    <div className="flex w-max items-center gap-8 sm:gap-12 animate-scroll hover:[animation-play-state:paused] pr-8 sm:pr-12">
                        {tools.map((tool, i) => (
                            <div key={i} className="flex flex-col items-center justify-center gap-2 group p-2 hover:scale-110 transition-transform duration-300">
                                <tool.icon className="w-8 h-8 sm:w-10 sm:h-10 text-gray-500 group-hover:text-emerald-500 transition-colors duration-300" />
                                <span className="whitespace-nowrap text-[10px] sm:text-xs font-semibold tracking-wider uppercase text-gray-500 group-hover:text-emerald-500 transition-colors duration-300">
                                    {tool.name}
                                </span>
                            </div>
                        ))}

                        {/* Duplicated list for seamless scrolling on desktop */}
                        {tools.map((tool, i) => (
                            <div key={'dup-' + i} className="flex flex-col items-center justify-center gap-2 group p-2 hover:scale-110 transition-transform duration-300">
                                <tool.icon className="w-8 h-8 sm:w-10 sm:h-10 text-gray-500 group-hover:text-emerald-500 transition-colors duration-300" />
                                <span className="whitespace-nowrap text-[10px] sm:text-xs font-semibold tracking-wider uppercase text-gray-500 group-hover:text-emerald-500 transition-colors duration-300">
                                    {tool.name}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
