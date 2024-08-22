'use client'
import Image from 'next/image'
import React from 'react'

import HomeBackground from '@/assets/homeBackground.svg'
import { useBackground } from '@/contexts/BackgroundContext'

import BackgroundAnimado from '@/assets/animacaoAutenticacao.svg'
import ScreenHeightRenderer from '@/components/modules/ScreenHeightRenderer'

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const { backgroundState } = useBackground()

  return (
    <>
      {backgroundState === 'static' ? (
        <div className="absolute -z-10 h-screen w-screen overflow-hidden">
          <Image
            id="background"
            src={HomeBackground}
            alt=""
            className="h-screen w-screen object-cover"
          />
        </div>
      ) : (
        <div className="absolute -z-10 h-screen w-screen overflow-hidden">
          <Image
            id="background"
            src={BackgroundAnimado}
            alt=""
            className="h-screen w-screen object-cover"
          />
        </div>
      )}

      <div className="flex h-screen w-full items-center justify-center overflow-hidden">
        <ScreenHeightRenderer>{children}</ScreenHeightRenderer>
      </div>
    </>
  )
}
