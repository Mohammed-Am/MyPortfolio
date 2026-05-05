import { timelineContent } from '@/data/content'

export default function Timeline() {
  return (
    <section id="timeline" className="py-16 sm:py-24 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 sm:mb-16">
          <p className="text-emerald-600 dark:text-emerald-400 text-sm font-semibold tracking-widest uppercase mb-3 transition-colors duration-300">
            {timelineContent.subtitle}
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 dark:text-white transition-colors duration-300">{timelineContent.title}</h2>
          <div className="w-16 h-1 bg-emerald-500 mx-auto mt-4 rounded-full" />
        </div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-emerald-500/50 via-gray-300 dark:via-white/10 to-transparent sm:-translate-x-1/2 transition-colors duration-300" />
          <div className="space-y-8">
            {timelineContent.items.map((item, i) => {
              const isEven = i % 2 === 0
              const isWork = item.type === 'work'
              return (
                <div
                  key={i}
                  className={`relative flex items-start gap-6 sm:gap-0 ${isEven ? 'sm:flex-row' : 'sm:flex-row-reverse'}`}
                >
                  {/* Dot */}
                  <div
                    className="absolute left-4 sm:left-1/2 sm:-translate-x-1/2 w-3 h-3 rounded-full border-2 border-slate-50 dark:border-[#0A0A0A] z-10 mt-5 transition-colors duration-300"
                    style={{ backgroundColor: isWork ? '#10B981' : '#3B82F6' }}
                  />

                  {/* Content */}
                  <div className={`ml-10 sm:ml-0 sm:w-[calc(50%-2rem)] ${isEven ? 'sm:pr-8' : 'sm:pl-8'}`}>
                    <div className="glass-card rounded-xl p-5 hover:border-emerald-500/20 transition-all">
                      <div className="flex items-center gap-2 mb-2">
                        <span
                          className={`text-xs font-bold px-2 py-0.5 rounded transition-colors duration-300 ${
                            isWork ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400' : 'bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400'
                          }`}
                        >
                          {item.type === 'work' ? '💼 Work' : '🎓 Education'}
                        </span>
                        <span className="text-gray-500 dark:text-gray-600 text-xs transition-colors duration-300">{item.year}</span>
                      </div>
                      <h3 className="text-gray-900 dark:text-white font-bold text-sm mb-1 transition-colors duration-300">{item.title}</h3>
                      <p className="text-emerald-600 dark:text-emerald-400 text-xs font-medium mb-2 transition-colors duration-300">{item.org}</p>
                      <p className="text-gray-600 dark:text-gray-500 text-xs leading-relaxed transition-colors duration-300">{item.description}</p>
                    </div>
                  </div>

                  {/* Spacer for opposite side */}
                  <div className="hidden sm:block sm:w-[calc(50%-2rem)]" />
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
