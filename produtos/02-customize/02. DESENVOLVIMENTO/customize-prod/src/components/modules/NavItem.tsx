import React, { ElementType } from 'react'

interface NavItemProps {
  icon: ElementType
  title: string
  href: string
  active: boolean
}
export default function NavItem({
  icon: Icon,
  title,
  href,
  active,
}: NavItemProps) {
  return (
    <a
      href={href}
      className={
        active
          ? `flex h-10 w-full items-center justify-center gap-2 bg-[#003270] text-center text-white`
          : `flex h-10 w-full cursor-pointer items-center justify-center gap-2 text-center text-[#01397E]`
      }
    >
      <Icon className="h-5 w-5" />
      {title}
    </a>
  )
}
