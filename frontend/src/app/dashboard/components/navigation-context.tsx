'use client'

import { createContext, useContext, useState } from 'react'
import { data } from '@/app/dashboard/data-dashboard'

interface NavigationContextType {
  activeItem: string
  setActiveItem: (item: string) => void
  navigationData: typeof data
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined)

export function NavigationProvider({ children }: { children: React.ReactNode }) {
  const [activeItem, setActiveItem] = useState<string>('/dashboard')

  const value = {
    activeItem,
    setActiveItem,
    navigationData: data
  }

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  )
}

export function useNavigation() {
  const context = useContext(NavigationContext)
  if (context === undefined) {
    throw new Error('useNavigation doit être utilisé dans un NavigationProvider')
  }
  return context
}