'use client'
import { useUserContext } from '@/contexts/UserContext'
import Image from 'next/image'
import React from 'react'

export default function Signature() {
  const user = useUserContext()

  return (
    <>
      {user.user.usePhoto && user.user.userPhoto ? (
        <div className="h-40 w-40 rounded-full bg-zinc-600">
          <Image
            className="w-ll h-full rounded-full"
            src={user.user.userPhoto || ''}
            alt=""
            width={160}
            height={160}
          />
        </div>
      ) : (
        <div className="h-20 w-20 rounded-full bg-transparent" />
      )}
      <div className="flex h-full flex-1 flex-col justify-center gap-4 ">
        <h1 className="text-xl font-bold text-[#0067FF]">
          {user.user.fullName}
        </h1>
        <div className="flex flex-col">
          <span className="text-sm text-[#003B75]">{user.user.email}</span>
          <span className="text-sm text-[#003B75]">
            +55 81 3316.0700 - ramal 1000 | +55 85 93316.0700
          </span>
          <div className="flex gap-1">
            <span className="text-sm text-[#003B75]">tpfengenharia</span>
            <span className="text-sm text-[#003B75]">TPF Engenharia</span>
          </div>
          <span className="text-sm text-[#003B75]">www.tpfengenharia.com</span>
        </div>
        <h1 className="text-lg text-[#0067FF]">Building the world, better.</h1>
      </div>
    </>
  )
}
