'use client'
import Image from 'next/image'
// Images and Icons //
import LogoCompleta from '@/assets/logoCompleta.svg'
import AnimacaoAutenticacao from '@/assets/animacaoAutenticacao.svg'
import BackgroundLogin from '@/assets/fundo-login.png'
import MicrosoftLogo from '@/assets/microsoft.png'
import { useMsal } from '@azure/msal-react'
import { useRouter } from 'next/navigation'
import { useUserContext } from '@/contexts/UserContext'
import { useEffect } from 'react'
import { getUserPhoto } from '@/utils/getPhoto'
import { WindowsLogo } from '@phosphor-icons/react'
import { set } from 'zod'

export default function Home() {
  const { user, addUser } = useUserContext()
  const router = useRouter()
  const { instance, accounts } = useMsal()

  const request = {
    scopes: ['User.ReadBasic.All'],
    account: accounts[0],
  }

  useEffect(() => {
    if (accounts[0]) {
      setTimeout(() => {
        addUser({
          ...user,
          email: accounts[0].username as string,
          firstName: accounts[0].name?.split(' ')[0] as string,
          fullName: accounts[0].name as string,
          usePhoto: true,
          userPhoto: '',
          personalPhone: '',
          workPhone: '',
          workPhoneExtension: '',
        })
        router.push('/start')
      }, 2000)
    }
  })

  const initializeSignIn = () => {
    instance.loginPopup().then((res) => {
      addUser({
        accessToken: res.accessToken as string,
        email: accounts[0].username as string,
        firstName: accounts[0].name?.split(' ')[0] as string,
        fullName: accounts[0].name as string,
        usePhoto: true,
        userPhoto: '',
        personalPhone: '',
        workPhone: '',
        workPhoneExtension: '',
      })
    })
  }

  if (!accounts[0]) {
    return (
      <>
        <div className="absolute -z-10 h-screen w-screen overflow-hidden bg-[#00326f]">
          <Image
            src={BackgroundLogin}
            alt=""
            className="h-screen w-screen object-fill"
          />
        </div>
        <div className="flex h-full w-full flex-col items-center justify-center gap-8">
          <Image src={LogoCompleta} alt="" />
          <div className="flex h-44 w-96 flex-col items-center justify-center gap-6 rounded-[1.25rem] bg-customize-signature-form-background shadow-customize-signature-form-shadow">
            <h1 className="text-2xl font-bold text-white">Seja bem vindo!</h1>
            <button
              type="button"
              onClick={initializeSignIn}
              className="flex h-10 w-64 items-center justify-center gap-4 rounded-md bg-white text-sm font-bold opacity-90 hover:opacity-100"
            >
              <Image
                src={MicrosoftLogo}
                alt="Logo da Microsoft"
                width={24}
                height={24}
              />
              Entrar com a Microsoft
            </button>
          </div>
        </div>
      </>
    )
  } else {
    return (
      <>
        <div className="absolute -z-10 h-screen w-screen overflow-hidden">
          <Image
            src={AnimacaoAutenticacao}
            alt=""
            className="h-screen w-screen object-cover"
          />
        </div>
        <div className="flex h-full w-full items-center justify-center">
          <Image src={LogoCompleta} alt="" />
        </div>
      </>
    )
  }
}
