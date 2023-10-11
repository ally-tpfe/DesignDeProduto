'use client'
import Image from 'next/image'

// Imagens
import topFigure from '@/assets/login/softstock-logo-1.svg'
import bottomFigure from '@/assets/login/softstock-logo-2.svg'
import tpfLogoCompleta from '@/assets/tpf/logo-completa.svg'
import logoSoftstockCompleta from '@/assets/softstock/logo-softstock-completa.svg'
import logoMicrosoft from '@/assets/softstock/logo-microsoft.svg'
import { Login, LoginButton, LoginContainer, LoginContent } from '@/styles/login'

// Auth

import { signIn, signOut, useSession } from "next-auth/react"
import { useEffect, useState } from 'react'
import LoginLoading from './LoginLoading'
import { redirect } from 'next/navigation'



export default function Home() {
  const [isLoading, setIsLoading] = useState(false)
  const [mobileDevice, setMobileDevice] = useState(false)
  const session = useSession()
  const status = session.status
  
  


  useEffect(() => {
    function isMobileDevice(){
      if(typeof window !== "undefined"){ {
        setMobileDevice(window.innerWidth <= 1023)
        // reload after 2 seconds 
        setTimeout(() => {
          window.location.reload()
        }, 7000)
      }
    }}
    isMobileDevice()
  })

  
  async function handleLogin(){
    
    setIsLoading(true)
    signIn('azure-ad', {
      callbackUrl: 'https://softstock.tpfe.com.br/dashboard/softwares',
    })
  }
  
  useEffect(() => {
    window.addEventListener('load', () => setIsLoading(false));
    if(status === 'authenticated'){
      return redirect('/dashboard/softwares')
    }
  }, [status]);


  if (isLoading){
    return <LoginLoading />
  } else {
    return (
      <LoginContainer>
        {mobileDevice && (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '70%',
            height: '100%',
            padding: '0 1rem',
            gap: '4rem',
            color:'white',
            textAlign: 'center',
          }}>

            <Image 
            src={logoSoftstockCompleta}
            alt=""
            width={180}
            height={45}
            />
            <p>Desculpe-nos, ainda estamos trabalhando para que o app também suporte o uso mobile. De preferência acesse ao app através de um computador.</p>
            <p>Por favor, contatar equipe do TI para mais informações.</p>

            <Image 
              src={tpfLogoCompleta}
              alt=""
              width={120}
              height={40}
            />
          </div>
        )}
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
            <LoginButton onClick={handleLogin} className={session.status === 'loading' ? 'loading' : ''}>
              <Image 
              src={logoMicrosoft}
              alt=""
              width={25}
              height={25}
             />
             <span>
              {session.status === 'loading'  ? 'Carregando...' : 'Entrar com a Microsoft'}
             </span>
            </LoginButton>
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
}
