'use client'
import OptionCard from '@/components/optionCard'
import React from 'react'

export default function page() {
  return (
    <div className="flex h-full w-full flex-col">
      <OptionCard
        title="Suporte técnico"
        link="mailto:allyson.rodrigues@tpfe.com.br?subject=Suporte Técnico | Customize&body=Ol%C3%A1,%0D%0A%0D%0AGostaria de obter suporte t%C3%A9cnico do Customize:%0D%0A%0D%0A[descreva aqui]%0D%0A"
      />
    </div>
  )
}
