'use client'
import React from 'react'
import Card from './Card'
import { PencilSimpleLine, UserRectangle } from '@phosphor-icons/react'
import { useRouter } from 'next/navigation'

export default function Hub() {
  const router = useRouter()
  return (
    <div className="flex h-full w-full items-center justify-center gap-16">
      <Card
        action={() => {
          router.push('start/signature')
        }}
        title="Assinatura de e-mail"
        icon={PencilSimpleLine}
        description="Torne seu e-mail mais confiável de forma rápida e simples"
      />
      <Card
        action={() => {
          router.push('start/backgrounds')
        }}
        title="Plano de fundo para chamadas"
        icon={UserRectangle}
        description="Personalize um plano de fundo com a cara da TPF"
      />
    </div>
  )
}
