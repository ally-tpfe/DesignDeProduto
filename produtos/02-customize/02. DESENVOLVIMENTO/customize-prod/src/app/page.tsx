'use client'
import Image from 'next/image'
// Images and Icons //
import LogoCompleta from '@/assets/logoCompleta.svg'
import AnimacaoAutenticacao from '@/assets/animacaoAutenticacao.svg'
import { useMsal } from '@azure/msal-react'
import { useRouter } from 'next/navigation'
import { useUserContext } from '@/contexts/UserContext'
import { useEffect } from 'react'
import { getUserPhoto } from '@/utils/getPhoto'

export default function Home() {
  const { addUser } = useUserContext()
  const router = useRouter()
  const { instance, accounts } = useMsal()

  const request = {
    scopes: ['User.ReadBasic.All'],
    account: accounts[0],
  }

  useEffect(() => {
    async function handleLogin() {
      let photo = ''
      if (!accounts[0]) {
        instance.initialize().catch(() => {
          instance.acquireTokenPopup(request).then(async (response) => {
            photo = (await getUserPhoto(response.accessToken)) as string
            addUser({
              accessToken: response.accessToken as string,
              email: accounts[0].username as string,
              firstName: accounts[0].name?.split(' ')[0] as string,
              fullName: accounts[0].name as string,
              usePhoto: true,
              userPhoto: photo as string,
              personalPhone: '',
              workPhone: '',
              workPhoneExtension: '',
            })
          })
        })
        router.push('/start')
      } else {
        instance.initialize().catch(() => {
          instance.acquireTokenSilent(request).then(async (response) => {
            photo = (await getUserPhoto(response.accessToken)) as string
            addUser({
              accessToken: response.accessToken as string,
              email: accounts[0].username as string,
              firstName: accounts[0].name?.split(' ')[0] as string,
              fullName: accounts[0].name as string,
              usePhoto: true,
              userPhoto: photo as string,
              personalPhone: '',
              workPhone: '',
              workPhoneExtension: '',
            })
          })
        })
      }
      router.push('/start')
    }
    if (!accounts[0]) {
      handleLogin()
    }
    handleLogin()
  }, [accounts])

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
