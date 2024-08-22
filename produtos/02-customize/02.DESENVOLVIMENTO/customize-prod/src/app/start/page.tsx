'use client'
import App from '@/components/start'
import { useMsal } from '@azure/msal-react'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

export default function StartApp() {
  const router = useRouter()
  const { accounts } = useMsal()

  useEffect(() => {
    if (!accounts[0]) {
      router.push('/')
    }
  })

  return (
    <div className="h-[(100vh - 10rem)] flex w-full items-center justify-center">
      <App />
    </div>
  )
}
