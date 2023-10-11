'use client'
import React, { ReactNode } from 'react'
import { useTheme } from '@/contexts/Theme/ThemeContext'
interface BodyProps {
  children: ReactNode
}
export default function Body({ children }: BodyProps) {
  const { theme, setTheme } = useTheme()

  if (theme === 'regular') {
    return (
      <body className="bg  m-0 h-screen w-screen bg-customize-bg p-0">
        {children}
      </body>
    )
  } else if (theme === 'alternative') {
    return (
      <body className="bg  m-0 h-screen w-screen bg-alternative-customize-bg-alternative p-0">
        {children}
      </body>
    )
  }
  return (
    <body className="bg m-0 h-screen w-screen bg-customize-bg p-0 dark:bg-dark-customize-bg-dark">
      {children}
    </body>
  )
}
