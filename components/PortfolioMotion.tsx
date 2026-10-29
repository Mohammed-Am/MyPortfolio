'use client'
import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion'
import { usePortfolio } from './PortfolioProvider'

export function Reveal({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion()
  const { appearance } = usePortfolio()
  const enabled = appearance.animations && !reduce
  return <motion.div initial={false} whileInView={enabled ? { opacity: [0.35, 1], y: [24, 0] } : { opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.08 }} transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}>{children}</motion.div>
}

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 25 })
  const reduce = useReducedMotion()
  const { appearance } = usePortfolio()
  if (reduce || !appearance.animations) return null
  return <motion.div aria-hidden="true" className="fixed left-0 right-0 top-0 z-[60] h-0.5 origin-left bg-emerald-500" style={{ scaleX }} />
}
