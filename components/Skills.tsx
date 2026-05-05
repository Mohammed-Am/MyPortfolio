'use client'
import { skillsContent } from '@/data/content'

export default function Skills() {
  return (
    <section id="skills" className="py-16 sm:py-24 bg-slate-50 dark:bg-[#0D0D0D] transition-colors duration-300 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-16">
          <p className="text-emerald-600 dark:text-emerald-400 text-sm font-semibold tracking-widest uppercase mb-3 transition-colors duration-300">
            {skillsContent.subtitle}
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 dark:text-white transition-colors duration-300">{skillsContent.title}</h2>
          <div className="w-16 h-1 bg-emerald-500 mx-auto mt-4 rounded-full" />
        </div>

        {/* Skills grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 lg:gap-6">
          {skillsContent.skills.map((skill) => (
            <div 
              key={skill.name} 
              className="bg-white dark:bg-[#121212] border border-gray-100 dark:border-white/5 rounded-2xl p-3 sm:p-5 lg:p-6 flex flex-col items-center justify-center gap-2 sm:gap-4 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl dark:shadow-none hover:border-gray-200 dark:hover:border-white/10"
            >
              <div className="flex gap-2">
                {/* Single Icon from simple-icons */}
                {skill.icon && !skill.icons && !(skill as any).customImage && (
                  <img
                    src={`https://cdn.simpleicons.org/${skill.icon}/${skill.color}`}
                    alt={`${skill.name} logo`}
                    className={`w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 object-contain ${skill.name === 'Next.js' ? 'dark:invert' : ''}`}
                    title={skill.name}
                  />
                )}
                {/* Multiple Icons (e.g. HTML / CSS) */}
                {skill.icons && (
                  <div className="flex -space-x-3 sm:-space-x-4">
                    {skill.icons.map((subIcon, idx) => (
                      <img
                        key={subIcon.slug}
                        src={`https://cdn.simpleicons.org/${subIcon.slug}/${subIcon.color}`}
                        alt={`${skill.name} part`}
                        className={`w-9 h-9 sm:w-11 sm:h-11 object-contain drop-shadow-md z-[${10 - idx}]`}
                      />
                    ))}
                  </div>
                )}
                {/* Custom Image (e.g. AI Agents) */}
                {(skill as any).customImage && (
                  <img
                    src={(skill as any).customImage}
                    alt={`${skill.name} custom logo`}
                    className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 object-contain rounded-xl drop-shadow-md"
                  />
                )}
              </div>
              <span className="text-[10px] sm:text-xs lg:text-sm font-bold text-gray-800 dark:text-gray-200 uppercase tracking-wide text-center leading-tight">
                {skill.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
