'use client'
import { CaretLeft, CaretRight } from '@phosphor-icons/react'
import React from 'react'

export default function NavigationToggle() {
  return (
    <div className="mb-2 flex h-8 w-20 items-center justify-between gap-3">
      <span className="flex h-full w-full items-center justify-center rounded-full bg-customize-nav-button-transparent-white text-xl font-bold text-white  shadow-customize-title-card-shadow">
        <CaretLeft weight="bold" />
      </span>
      <span className="flex h-full w-full items-center justify-center rounded-full bg-customize-nav-button-transparent-white text-xl font-bold text-white  shadow-customize-title-card-shadow">
        <CaretRight weight="bold" />
      </span>
    </div>
  )
}
