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
  return (
    <div className="flex flex-col items-center">
      <div className="flex h-60 w-[30rem] flex-col items-center justify-center rounded-3xl bg-white px-6 shadow-xl backdrop-blur-md">
        <Icon className="h-12 w-12 text-icon-blue" />
        <h1 className="px-8 text-center text-2xl font-semibold text-title-color">
          {title}
        </h1>
        <h1 className="px-20 text-center text-lg text-title-color">
          {description}
        </h1>
      </div>
      <button
        onClick={action}
        className="relative -top-2  h-8 w-28 rounded-md bg-button-blue font-semibold text-white hover:bg-button-hover"
      >
        Começar
      </button>
    </div>
  )
}
