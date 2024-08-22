'use client'
import { CaretLeft } from '@phosphor-icons/react'
import React from 'react'

export default function NavigationToggle() {
  return (
    <div className="mb-2 flex h-8 w-20 items-center justify-between gap-3">
      <a
        title="Voltar"
        href="/start"
        className="flex h-full w-full items-center justify-center rounded-full bg-customize-nav-button-transparent-white text-xl font-bold text-white shadow-customize-title-card-shadow  hover:cursor-pointer"
      >
        <CaretLeft weight="bold" />
      </a>
    </div>
  )
}
