'use client'
import Image from 'next/image'
import React from 'react'
import Background2 from '@/assets/Customize/Waves/background2.svg'
import Background2Dark from '@/assets/Customize/Waves/autenticacaoDark.svg'
import { useTheme } from '@/contexts/Theme/ThemeContext'
export interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const { theme } = useTheme()
  return (
    <div className="flex h-screen w-screen items-center  justify-center md:overflow-hidden">
      <div className="absolute -z-10 h-full w-full md:overflow-hidden">
        {theme === 'regular' ? (
          <Image
            src={Background2}
            alt=""
            className="h-full w-full object-cover"
            width={1280}
            height={831}
          />
        ) : (
          <Image
            src={Background2Dark}
            alt=""
            className="h-full w-full object-cover"
            width={1280}
            height={831}
          />
        )}
      </div>
      {children}
    </div>
  )
}
