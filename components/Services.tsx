'use client'
import { usePortfolio } from './PortfolioProvider'

export default function Services() {
  const data = usePortfolio(); const servicesContent = { ...data.services, services: data.services.items }
  return (
    <section id="services" className="py-16 sm:py-24 bg-slate-50 dark:bg-[#0D0D0D] transition-colors duration-300 relative">
      <div className="absolute inset-0 dark-dot-grid opacity-20 pointer-events-none" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 sm:mb-16">
          <p className="text-emerald-600 dark:text-emerald-400 text-sm font-semibold tracking-widest uppercase mb-3 transition-colors duration-300">
            {servicesContent.subtitle}
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 dark:text-white transition-colors duration-300">{servicesContent.title}</h2>
          <p className="max-w-2xl mx-auto mt-5 text-gray-600 dark:text-gray-400 leading-relaxed">{servicesContent.description}</p>
          <div className="w-16 h-1 bg-emerald-500 mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {servicesContent.services.map((service) => (
            <div
              key={service.title}
              className="group relative h-full"
            >
              {/* Back offset card */}
              <div className="absolute inset-0 bg-transparent border-2 border-emerald-500/20 dark:border-emerald-500/30 rounded-2xl transform translate-x-2 translate-y-2 transition-transform duration-300 group-hover:translate-x-3 group-hover:translate-y-3" />

              {/* Front card */}
              <div className="relative h-full bg-white dark:bg-[#0A0A0A] border-2 border-slate-100 dark:border-white/10 rounded-2xl p-6 sm:p-8 transition-transform duration-300 group-hover:-translate-x-1 group-hover:-translate-y-1">
                <h3 className="text-gray-900 dark:text-white font-bold text-lg mb-3 transition-colors duration-300">{service.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed transition-colors duration-300">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
