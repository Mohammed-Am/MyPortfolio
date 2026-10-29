'use client'
import { useState } from 'react'
import { usePortfolio } from './PortfolioProvider'

export default function Contact() {
  const { contact: contactContent, profile } = usePortfolio()
  const [formData, setFormData] = useState({ name: '', email: '', message: '', website: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMessage('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData),
      })
      const result = await response.json()
      if (response.ok && result.success) {
        setStatus('success')
        setFormData({ name: '', email: '', message: '', website: '' }) // Clear form
        setTimeout(() => setStatus('idle'), 5000) // Reset after 5s
      } else {
        setErrorMessage(result.error || 'Could not send your message.')
        setStatus('error')
        setTimeout(() => setStatus('idle'), 5000) // Reset after 5s
      }
    } catch (error) {
      setErrorMessage('Connection failed. Please try again or email me directly.')
      setStatus('error')
      setTimeout(() => setStatus('idle'), 5000) // Reset after 5s
    }
  }

  return (
    <section id="contact" className="py-16 sm:py-24 bg-slate-50 dark:bg-[#0D0D0D] transition-colors duration-300 relative">
      <div className="absolute inset-0 dark-dot-grid opacity-20 pointer-events-none" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-16">
          <p className="text-emerald-600 dark:text-emerald-400 text-sm font-semibold tracking-widest uppercase mb-3 transition-colors duration-300">
            {contactContent.subtitle}
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 dark:text-white transition-colors duration-300">{contactContent.title}</h2>
          <div className="w-16 h-1 bg-emerald-500 mx-auto mt-4 rounded-full" />
          <p className="text-gray-600 dark:text-gray-400 mt-4 max-w-xl mx-auto transition-colors duration-300">{contactContent.description}</p>
        </div>

        <div className="max-w-2xl mx-auto">
          {/* Form */}
          <form onSubmit={handleSubmit} className="glass-card rounded-xl p-6 sm:p-8 space-y-5">
            <div className="hidden" aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off" value={formData.website} onChange={e => setFormData(p => ({ ...p, website: e.target.value }))} /></label></div>
            <div>
              <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1.5 transition-colors duration-300" htmlFor="contact-name">Your Name</label>
              <input
                id="contact-name"
                maxLength={120}
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                placeholder="John Doe"
                className="w-full px-4 py-3 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1.5 transition-colors duration-300" htmlFor="contact-email">Email</label>
              <input
                id="contact-email"
                maxLength={254}
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                placeholder="you@example.com"
                className="w-full px-4 py-3 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1.5 transition-colors duration-300" htmlFor="contact-message">Message</label>
              <textarea
                id="contact-message"
                minLength={10}
                maxLength={5000}
                required
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))}
                placeholder="Hi Mohammed, I'm reaching out about..."
                className="w-full px-4 py-3 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50 transition-all resize-none"
              />
            </div>
            <button
              type="submit"
              disabled={status === 'loading' || status === 'success'}
              className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 disabled:bg-emerald-500/50 text-black font-bold rounded-lg transition-all hover:shadow-[0_0_20px_rgba(16,185,129,0.3)] flex items-center justify-center gap-2"
            >
              {status === 'loading' ? (
                <span>Sending...</span>
              ) : status === 'success' ? (
                <span>✓ Message Sent!</span>
              ) : status === 'error' ? (
                <span>Failed. Try again?</span>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                  {contactContent.button}
                </>
              )}
            </button>
            {errorMessage && <p role="alert" className="text-sm text-red-600 dark:text-red-400">{errorMessage}</p>}
          </form>
          <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">Prefer email? <a className="underline" href={`mailto:${profile.email}`}>{profile.email}</a></p>
        </div>
      </div>

      {/* Floating Pop-up Notification (Toast) */}
      {(status === 'success' || status === 'error') && (
        <div className="fixed bottom-6 right-6 sm:bottom-10 sm:right-10 z-[100] animate-bounce shadow-2xl">
          <div 
            className={`p-4 sm:p-5 rounded-2xl border backdrop-blur-xl flex items-center gap-3 sm:gap-4 shadow-2xl ${
              status === 'success' 
                ? 'bg-emerald-500/95 border-emerald-400/50 text-white shadow-emerald-500/20'
                : 'bg-red-500/95 border-red-400/50 text-white shadow-red-500/20'
            }`}
          >
            {status === 'success' ? (
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            ) : (
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
            )}
            <div>
              <h4 className="font-black text-sm sm:text-base tracking-wide">
                {status === 'success' ? 'Success!' : 'Error!'}
              </h4>
              <p className="text-xs sm:text-sm font-medium text-white/90">
                {status === 'success' 
                  ? "Thanks for reaching out! I'll get back to you as soon as possible." 
                  : 'Failed to send message. Please try again.'}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
