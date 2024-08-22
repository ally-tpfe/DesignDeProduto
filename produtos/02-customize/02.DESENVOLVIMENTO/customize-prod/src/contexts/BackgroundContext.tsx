'use client'
// Create a context for background image called reloading, setReloading

import React, { createContext, useState, useContext, ReactNode } from 'react'

type BackgroundState = 'static' | 'loading'
type BackgroundContextProps = {
  backgroundState: BackgroundState
  setBackgroundState: React.Dispatch<React.SetStateAction<BackgroundState>>
}

const BackgroundContext = createContext<BackgroundContextProps | undefined>(
  undefined,
)

interface BackgroundProps {
  children: ReactNode
}

export const BackgroundProvider = ({ children }: BackgroundProps) => {
  const [backgroundState, setBackgroundState] =
    useState<BackgroundState>('static')

  return (
    <BackgroundContext.Provider value={{ backgroundState, setBackgroundState }}>
      {children}
    </BackgroundContext.Provider>
  )
}

export const useBackground = (): BackgroundContextProps => {
  const context = useContext(BackgroundContext)
  if (!context) {
    throw new Error('useBackground must be used within a BackgroundProvider')
  }
  return context
}
