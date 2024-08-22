'use client'
import { useMsal } from '@azure/msal-react'
import { SignOut } from '@phosphor-icons/react'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function SidebarFooter() {
  const { instance } = useMsal()
  const router = useRouter()
  const handleLogout = async () => {
    instance
      .initialize()
      .catch((e) => {
        console.log(e)
      })
      .then(() => {
        localStorage.removeItem('tpf-customize@user')
        instance.logoutRedirect()
        router.push('/')
      })
  }
  return (
    <footer className="mt-auto flex w-[60%] items-center justify-center">
      <div className="flex w-full flex-col items-start py-2 text-[#002f62] ">
        <span
          className="flex h-10 cursor-pointer items-center gap-2"
          onClick={() => handleLogout()}
        >
          <SignOut />
          Sair
        </span>
      </div>
    </footer>
  )
}
