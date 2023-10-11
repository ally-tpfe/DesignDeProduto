'use client'

import React from 'react'
import NavItem from './NavItem'
import { PencilSimpleLine, UserRectangle } from '@phosphor-icons/react'
import { usePathname } from 'next/navigation'

export default function Nav() {
  const activeTab = usePathname()

  return (
    <div className="text-md mt-1 flex w-[100%] flex-1 flex-col items-center">
      <div className="h-[1px] w-[80%] bg-zinc-300 " />
      <NavItem
        icon={PencilSimpleLine}
        title="Assinaturas"
        href="/start/signature"
        active={activeTab.endsWith('/signature')}
      />
      <NavItem
        icon={UserRectangle}
        title="Plan. de fundo"
        href="/start/backgrounds"
        active={activeTab.endsWith('/backgrounds')}
      />
    </div>
  )
}
