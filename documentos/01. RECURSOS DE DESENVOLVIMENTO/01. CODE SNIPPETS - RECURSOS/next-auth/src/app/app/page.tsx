import SignOutButton from '@/components/signOutButtons'
import { authConfig } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import {redirect} from 'next/navigation'
import React from 'react'

export default async function HomePage() {
  const session = await getServerSession(authConfig)
  console.log(session)
  if(!session) return redirect("/")
  return (
    <div>
      Bem vindo!
      <p>{session?.user?.email}</p>
      <SignOutButton />
    </div>
  )
}
