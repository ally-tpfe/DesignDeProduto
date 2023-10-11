'use client'
import { usePathname } from 'next/navigation'
import React, { ElementType, useEffect, useState } from 'react'

interface NavItemProps {
  icon: ElementType
  title: string
  href: string
}
export default function NavItem({ icon: Icon, title, href }: NavItemProps) {
  const [active, setActive] = useState(false)
  const path = usePathname()
  useEffect(() => {
    if (path.endsWith('/signature')) {
      setActive(false)
      setActive(true)
    }
  }, [path])
  return (
    <li className="h-8 w-full">
      {(active && title === 'Assinaturas') ||
      (!active && title === 'Plan. de fundo') ? (
        <a
          href={href}
          className="min-h-5 flex h-full w-full min-w-full items-center gap-2 truncate bg-[#003270] px-[2.27rem]  text-sm font-bold text-slate-50"
        >
          <Icon
            size={18}
            color="#FFFF"
            weight="fill"
            className="min-h-[1.125rem] min-w-[1.125rem]"
          />
          {title}
        </a>
      ) : (
        <a
          href={href}
          className="flex h-full w-full items-center gap-2 truncate px-[2.27rem]  text-sm"
        >
          <Icon size={18} />
          {title}
        </a>
      )}
    </li>
  )
}
