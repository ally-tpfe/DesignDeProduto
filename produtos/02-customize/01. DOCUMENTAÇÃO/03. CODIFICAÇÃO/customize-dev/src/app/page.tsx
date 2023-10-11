'use client'
import Image from 'next/image'
import CustomizeLogo from '@/assets/Customize/logo-completa.svg'

import Background3 from '@/assets/Customize/Waves/autenticacao.svg'
import Background3Dark from '@/assets/Customize/Waves/autenticacaoDark.svg'
import { useEffect } from 'react'
import { useTheme } from '@/contexts/Theme/ThemeContext'
export default function Home() {
  const { theme, setTheme } = useTheme()
  useEffect(() => {
    // await 1 second then navigate to route /app
    setTimeout(() => {
      window.location.href = '/app'
    }, 1200)
  }, [])
  return (
    <>
      <div className="absolute -z-10 h-screen w-screen overflow-hidden">
        {theme === 'regular' ? (
          <Image
            src={Background3}
            alt=""
            className="h-screen w-screen object-cover"
            width={1280}
            height={831}
          />
        ) : (
          <Image
            src={Background3Dark}
            alt=""
            className="h-screen w-screen object-cover"
            width={1280}
            height={831}
          />
        )}
      </div>
      <div className="flex h-screen w-screen flex-col items-center justify-center">
        <Image src={CustomizeLogo} alt="" />
      </div>
    </>
  )
}
