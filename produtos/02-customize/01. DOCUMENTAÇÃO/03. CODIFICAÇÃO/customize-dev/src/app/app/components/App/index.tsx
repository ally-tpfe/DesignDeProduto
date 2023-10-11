'use client'
import React, { ReactNode, useState } from 'react'
import Header from '../Header'
import Sidebar from '../Sidebar'
import LogoInterna from '@/assets/Customize/logo-simples-interno.svg'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

import { motion } from 'framer-motion'

interface AppProps {
  children: ReactNode
}
function App({ children }: AppProps) {
  const [isStaged, stage] = useState(true)
  const path = usePathname()
  if (path.endsWith('finish')) {
    return (
      <div className="flex h-[45.45675rem] w-[80rem] flex-col gap-4">
        <Header />
        <main className="flex h-full flex-col gap-4">
          <div className="flex h-full">
            <Sidebar />
            {children}
          </div>
          <motion.footer
            initial={isStaged ? { opacity: 1 } : { opacity: 0 }}
            animate={isStaged ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <Image src={LogoInterna} alt="" className="h-12 w-12" />
          </motion.footer>
        </main>
      </div>
    )
  } else {
    return (
      <div className="flex h-[45.45675rem] w-[80rem] flex-col gap-4">
        <Header isStaged />
        <main className="flex h-full flex-col gap-4">
          <div className="flex h-full">
            <Sidebar isStaged />
            {children}
          </div>
          <footer>
            <Image src={LogoInterna} alt="" className="h-12 w-12" />
          </footer>
        </main>
      </div>
    )
  }
}

export default App
