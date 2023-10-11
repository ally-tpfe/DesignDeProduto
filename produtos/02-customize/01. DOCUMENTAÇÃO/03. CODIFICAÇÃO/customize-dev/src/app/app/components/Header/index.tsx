'use client'
import { CaretLeft, CaretRight } from '@phosphor-icons/react'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'
import { motion } from 'framer-motion'

export interface HeaderProps {
  isStaged?: boolean
}
export default function Header({ isStaged }: HeaderProps) {
  const route = useRouter()
  const from = usePathname()
  function Navigate(to?: string) {
    if (from.endsWith('/sign')) {
      return route.push('/app')
    }
    route.push(to || '/app')
  }
  return (
    <motion.header
      initial={isStaged ? { translateX: '-100%' } : { translateX: 0 }}
      animate={isStaged ? { translateX: 0 } : { translateX: '-100%' }}
      transition={{ duration: 0.1, ease: 'easeInOut' }}
      className="align-center flex  justify-between"
    >
      <div className="flex h-[1.90394rem] w-[5.04356rem] gap-4">
        <span className="flex  h-full w-full items-center justify-center rounded-full bg-nav-item-color hover:cursor-pointer">
          <CaretLeft
            size={22}
            weight="bold"
            color="white"
            className="opacity-100 "
            onClick={() => Navigate()}
          />
        </span>
        <span className="flex h-full w-full items-center justify-center rounded-full bg-nav-item-color">
          <CaretRight
            size={22}
            weight="bold"
            color="white"
            className="opacity-100"
          />
        </span>
      </div>
    </motion.header>
  )
}
