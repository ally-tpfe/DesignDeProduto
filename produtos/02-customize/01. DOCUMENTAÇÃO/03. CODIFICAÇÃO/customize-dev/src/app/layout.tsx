'use client'
import './globals.css'
import type { Metadata } from 'next'
import React from 'react'
import Body from './components/Body'
import { ThemeProvider } from '@/contexts/Theme/ThemeContext'

export const metadata: Metadata = {
  title: 'TPF Customize',
  description: 'TPF Engenharia ©️ 2023  |  DevDesign',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className="font-segoeUi m-0 h-screen w-screen p-0 antialiased"
    >
      <ThemeProvider>
        <Body>{children}</Body>
      </ThemeProvider>
    </html>
  )
}
