'use client'
import App from '@/components/start'
import { useUserContext } from '@/contexts/UserContext'
import { msalConfig } from '@/services/msal'
import { getUserPhoto } from '@/utils/getPhoto'
import { useMsal } from '@azure/msal-react'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

export default function StartApp() {
  const { user, addUser } = useUserContext()
  const router = useRouter()
  const { instance, accounts } = useMsal()

  const request = {
    scopes: ['User.ReadBasic.All'],
    account: accounts[0],
  }

  useEffect(() => {
    if (!accounts[0]) {
      handleLogin()
    }
  })

  const handleLogin = async () => {
    instance
      .initialize()
      .catch((e) => {
        console.log(e)
      })
      .then(() => {
        instance
          .loginRedirect(msalConfig.auth)
          .catch((e) => {
            console.log(e)
          })
          .finally(() => {
            instance.acquireTokenSilent(request).then(async (response) => {
              const accessToken = response.accessToken as string
              await fetch(
                `/api/users?email=${accounts[0].username}&apiKey=eba33af7-acac-4207-b4f5-b0ea78be9c2b`,
                { method: 'GET' },
              )
                .then((res) => res.json())
                .then((data) => {
                  console.log(data)
                  if (!data.email) {
                    getUserPhoto(accessToken).then((photo) => {
                      addUser({
                        firstName: accounts[0].name?.split(' ')[0] as string,
                        email: accounts[0].username as string,
                        fullName: accounts[0].name as string,
                        usePhoto: true,
                        userPhoto: photo as string,
                        accessToken,
                        personalPhone: '',
                        workPhone: '',
                        workPhoneExtension: '',
                      })
                    })
                  }
                })
            })
            console.log(user)
            router.push('/start')
          })
      })
  }

  return (
    <div className="flex h-full w-full items-center justify-center">
      <App />
    </div>
  )
}
