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
      router.push('/')
    }
  })

  return (
    <div className="flex h-full w-full items-center justify-center">
      <App />
    </div>
  )
}
