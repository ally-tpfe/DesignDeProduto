'use client'
import React from 'react'
import { Login, LoginContainer, LoginContent } from '@/styles/login'

// Imagens
import Image from 'next/image'
import topFigure from '@/assets/login/softstock-logo-1.svg'
import bottomFigure from '@/assets/login/softstock-logo-2.svg'
import tpfLogoCompleta from '@/assets/tpf/logo-completa.svg'
import logoSoftstockCompleta from '@/assets/softstock/logo-softstock-completa.svg'
import { ChaoticOrbit } from '@uiball/loaders'

export default function LoginLoading() {
  return (
    <LoginContainer>
      <LoginContent>
       <Image src={bottomFigure} alt="" width={500} height={400} className='bottom'/>
       <Image src={topFigure} alt="" width={600} height={458} className='top'/>
        <Login>
          <Image 
            src={logoSoftstockCompleta}
            alt=""
            width={237}
            height={75}
           />
           <h2>Seja bem-vindo</h2>
           <ChaoticOrbit size={28} color="white" />
        </Login>
          <footer>
              <Image 
                src={tpfLogoCompleta}
                alt=""
                width={150}
                height={40}
              />
          </footer>
      </LoginContent>
            
    </LoginContainer>
  )
}
