import React from 'react'
import Nav from './Nav'
import NavItem from './NavItem'
import {
  PencilSimpleLine,
  Question,
  SignOut,
  UserRectangle,
} from '@phosphor-icons/react'
import Image from 'next/image'
import { motion } from 'framer-motion'

interface SidebarProps {
  isStaged?: boolean
}
export default function Sidebar({ isStaged }: SidebarProps) {
  return (
    <motion.div
      initial={isStaged ? { translateX: '-100rem' } : { translateX: 0 }}
      animate={isStaged ? { translateX: 0 } : { translateX: '-100rem' }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      className="h-full w-[11.5rem]  rounded-3xl bg-white bg-opacity-90 shadow-md backdrop-blur"
    >
      <div className="flex h-full w-full flex-col items-center justify-center">
        <header className="flex flex-col items-center justify-center gap-5 py-[2.27rem]">
          {/* eslint-disable-next-line */}
          <Image
            src="https://github.com/ally-tpfe.png"
            alt=""
            width={111.79}
            height={112.754}
            className="rounded-full"
          />
          <h1 className="text-xl font-bold text-azul-escuro">
            Olá, <span className="text-azul-claro">Allyson!</span>
          </h1>
        </header>
        <main className="w-full">
          <Nav>
            <NavItem
              href="/app/signature"
              icon={PencilSimpleLine}
              title="Assinaturas"
            />
            <NavItem
              href="/app/backgrounds"
              icon={UserRectangle}
              title="Plan. de fundo"
            />
          </Nav>
        </main>
        <footer className="mt-auto">
          <Nav>
            <NavItem href="/help" icon={Question} title="Ajuda" />
            <NavItem href="/logout" icon={SignOut} title="Sair" />
          </Nav>
        </footer>
      </div>
    </motion.div>
  )
}
