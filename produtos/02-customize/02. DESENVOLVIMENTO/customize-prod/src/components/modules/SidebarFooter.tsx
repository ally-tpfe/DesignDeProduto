'use client'
import { useMsal } from '@azure/msal-react'
import { Question, SignOut } from '@phosphor-icons/react'
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
        router.push('/start')
      })
  }
  return (
    <footer className="w-[73%]">
      <div className="flex flex-col items-start py-2 text-[#002f62]">
        <span className="flex h-10 items-center gap-2">
          <Question /> Ajuda
        </span>
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
