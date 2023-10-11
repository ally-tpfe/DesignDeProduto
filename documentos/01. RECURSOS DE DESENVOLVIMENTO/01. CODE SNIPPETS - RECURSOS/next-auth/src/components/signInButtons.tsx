"use client";
import React from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation';

export default function SignInButton() {
    const router = useRouter()
    function handleClick(){
        signIn('azure-ad')
        router.push('/app')
    }
  return (
    <button onClick={handleClick}>
        Entrar com Microsoft
    </button>
  )
}
