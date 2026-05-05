import { servicesContent } from '@/data/content'

export default function Services() {
  return (
    <section id="services" className="py-16 sm:py-24 bg-slate-50 dark:bg-[#0D0D0D] transition-colors duration-300 relative">
      <div className="absolute inset-0 dark-dot-grid opacity-20 pointer-events-none" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 sm:mb-16">
          <p className="text-emerald-600 dark:text-emerald-400 text-sm font-semibold tracking-widest uppercase mb-3 transition-colors duration-300">
            {servicesContent.subtitle}
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 dark:text-white transition-colors duration-300">{servicesContent.title}</h2>
          <div className="w-16 h-1 bg-emerald-500 mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {servicesContent.services.map((service) => (
            <div
              key={service.title}
              className="glass-card rounded-xl p-4 sm:p-6 transition-all hover:scale-[1.02] hover:-translate-y-1 group cursor-default"
            >
              <h3 className="text-gray-900 dark:text-white font-bold text-base mb-2 transition-colors duration-300">{service.title}</h3>
              <p className="text-gray-600 dark:text-gray-500 text-sm leading-relaxed transition-colors duration-300">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
