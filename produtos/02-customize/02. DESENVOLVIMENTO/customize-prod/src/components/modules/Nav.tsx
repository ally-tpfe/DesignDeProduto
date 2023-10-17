'use client'

import React from 'react'
import NavItem from './NavItem'
import { PencilSimpleLine, UserRectangle } from '@phosphor-icons/react'
import { usePathname } from 'next/navigation'

export default function Nav() {
  const activeTab = usePathname()

  return (
    <div className="text-md mt-1 flex w-[100%] flex-1 flex-col items-center">
      <NavItem
        icon={PencilSimpleLine}
        title="Assinaturas"
        href="/start/signature"
        active={activeTab.endsWith('/signature')}
      />
    </div>
  )
}
