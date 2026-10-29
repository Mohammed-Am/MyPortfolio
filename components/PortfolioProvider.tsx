'use client'
import { createContext, useContext } from 'react'
import { defaultPortfolio, type Portfolio } from '@/lib/portfolio'

const PortfolioContext = createContext<Portfolio>(defaultPortfolio)
export function PortfolioProvider({ value, children }: { value: Portfolio; children: React.ReactNode }) {
  return <PortfolioContext.Provider value={value}><div data-portfolio-motion={value.appearance.animations ? "on" : "off"}>{children}</div></PortfolioContext.Provider>
}
export const usePortfolio = () => useContext(PortfolioContext)
