'use client'
import React, { ReactNode } from 'react'

interface NavProps {
  children: ReactNode
}
export default function Nav({ children }: NavProps) {
  return (
    <nav className="flex w-full flex-col gap-0">
      <ul className="w-full">{children}</ul>
    </nav>
  )
}
