'use client'
import { Login, LoginButton, LoginContainer, LoginContent } from '@/styles/login'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import topFigure from '@/assets/login/softstock-logo-1.svg'
import bottomFigure from '@/assets/login/softstock-logo-2.svg'
import logoSoftstockCompleta from '@/assets/softstock/logo-softstock-completa.svg'
import { useRouter } from 'next/navigation'
import { getSession, signOut, useSession } from 'next-auth/react'
import { api } from '@/lib/axios'
import { ChaoticOrbit } from '@uiball/loaders'


interface UserData {
  name: string;
  email: string;
  image: string | undefined;
}

interface Users {
  data: {
    data: UserData[];
  }
    
}

export default function Auth() {
  const [isLoading, setIsLoading] = useState(true)
  const [authorized, setAuthorized] = useState(false)
  const session = useSession()
  const authenticatedUser = session.data?.user
  const router = useRouter()

  useEffect(() => {
    async function handleAuthorization(){
      const users: Users = await api.get('/users', {
        headers:{
          Authorization: `Bearer ${(authenticatedUser as { accessToken?: string })?.accessToken}`
        }
      })
      const user = users.data.data.find((user: { email: string | null | undefined }) => user.email === authenticatedUser?.email)
      if (user){
        setAuthorized(true)
        setIsLoading(false)
      }else{
        setAuthorized(false)
        setIsLoading(false)
      }
    }
    if (authenticatedUser !== undefined) {
      handleAuthorization();
    }
  }, [authenticatedUser, router]);
  
  

  
  if(isLoading && !authorized){
    return (
      <>
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
               <ChaoticOrbit size={28} color="white" />
            </Login>
          </LoginContent>
        </LoginContainer>
        </>
    )
  }else if(!isLoading && !authorized){
    
    return (
      <>
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
              <h4>{authenticatedUser?.name}</h4>
              <p style={{textAlign:'center'}}>Verifique sua permissão de acesso ao Softstock. <br /> Para mais informações entre em contato com o TI, obrigado!</p>
              <a onClick={() => signOut({
                callbackUrl: 'https://softstock.tpfe.com.br/',
              })} style={{color:'white', cursor:'pointer', textDecoration:'underline'}}>Voltar</a>
          </Login>
        </LoginContent>
              
      </LoginContainer>
      </>

    )}
  }
    

