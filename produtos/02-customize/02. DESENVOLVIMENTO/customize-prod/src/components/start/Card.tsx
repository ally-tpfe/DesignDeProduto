'use client'
import React, { ElementType } from 'react'

interface CardProps {
  icon: ElementType
  title: string
  description: string
  action: () => void
}

export default function Card({
  icon: Icon,
  title,
  description,
  action,
}: CardProps) {
  const desativado = title === 'Plano de fundo para chamadas'

  return (
    <div className="flex flex-col items-center">
      <div className="flex h-60 w-[30rem] flex-col items-center justify-center rounded-3xl bg-white px-6 shadow-customize-card-shadow backdrop-blur-md">
        <Icon className="h-12 w-12 text-customize-text-azul" />
        <h1 className="px-8 text-center text-2xl font-semibold text-gray-800">
          {title}
        </h1>
        <h1 className="px-20 text-center text-lg text-gray-700 ">
          {description}
        </h1>
      </div>
      <button
        disabled={desativado}
        onClick={action}
        className="relative -top-2 h-8 w-32 rounded-md bg-customize-button-azul-claro font-semibold text-white shadow-customize-button-shadow transition-all duration-200 hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-zinc-200 disabled:shadow-customize-card-shadow"
      >
        Começar
      </button>
    </div>
  )
}
