"use client";
import React from 'react'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation';

export default function SignOutButton() {
    const router = useRouter()
    function handleClick(){
        signOut()
        router.push('/')
    }
  return (
    <button onClick={handleClick}>
        Sair
    </button>
  )
}
