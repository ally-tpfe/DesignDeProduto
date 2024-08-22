import Sidebar from '@/components/modules/Sidebar'
import React, { ReactNode } from 'react'

interface LayoutProps {
  children: ReactNode
}
export default function layout({ children }: LayoutProps) {
  return (
    <div>
      <Sidebar>{children}</Sidebar>
    </div>
  )
}
