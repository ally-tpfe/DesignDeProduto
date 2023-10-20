import React, { useState, useEffect, ReactNode } from 'react'
import Image from 'next/image'
import LogoCompletaCustomize from '@/assets/logoCompleta.svg'

const ScreenHeightRenderer = ({ children }: { children: ReactNode }) => {
  const [viewportHeight, setViewportHeight] = useState<null | number>(null)
  const [width, setWidth] = useState<null | number>(null)

  useEffect(() => {
    function handleResize() {
      setViewportHeight(window.innerHeight)
      setWidth(window.innerWidth)
    }
    handleResize()

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div>
      {(viewportHeight && viewportHeight < 640) || (width && width < 1240) ? (
        <div className="flex h-full w-full flex-col items-center justify-center gap-4 pt-[10%]">
          <Image
            src={LogoCompletaCustomize}
            alt=""
            width={96}
            height={96}
            className="mb-8"
          />
          <h1 className="w-[80%] text-center text-2xl font-bold text-white">
            As proporções da tela não é compatível para o uso da aplicação.
          </h1>
          <p className="w-[60%] text-center text-xl text-white">
            Tente acessar a aplicação do seu computador. <br />
          </p>
          <p className="w-[60%] text-center text-sm text-white">
            Já está no computador? Por favor, tente acessando através de outro
            navegador.
          </p>
        </div>
      ) : (
        <div className="flex h-full w-full flex-col items-center">
          {children}
        </div>
      )}
    </div>
  )
}

export default ScreenHeightRenderer
