'use client'
import React, { ReactNode, useEffect } from 'react'
import AppHeader from './AppHeader'

import LogoInterna from '@/assets/logoReduzidaCustomize.svg'
import Image from 'next/image'
import Nav from './Nav'
import SidebarFooter from './SidebarFooter'

import { motion, useAnimation } from 'framer-motion'
import { Question, User } from '@phosphor-icons/react'
import { useUserContext } from '@/contexts/UserContext'
import { useMsal } from '@azure/msal-react'
import { usePathname } from 'next/navigation'

interface SidebarProps {
  children: ReactNode
}
export default function Sidebar({ children }: SidebarProps) {
  const { user } = useUserContext()
  const { accounts } = useMsal()
  const path = usePathname()
  const userName = accounts[0]
    ? (accounts[0].name?.split(' ')[0] as string)
    : ''

  const controls = useAnimation()

  useEffect(() => {
    const handleClick = async () => {
      await controls.start({
        opacity: 0,
        translateX: '-200%',
        translateY: '-150%',
        transition: { duration: 1.5 },
      })
    }
    const handleClickReverse = async () => {
      await controls.start({
        opacity: 1,
        translateX: '0%',
        translateY: '0%',
        transition: { duration: 1.5 },
      })
    }

    const sidebarElement = document.getElementById('sidebar')
    const formElement = document.getElementById('form')
    const trigger = document.getElementById('concluir')
    const reverseTrigger = document.getElementById('voltar')

    if (sidebarElement && formElement) {
      trigger?.addEventListener('click', handleClick)
      reverseTrigger?.addEventListener('click', handleClickReverse)
    }

    return () => {
      if (sidebarElement && formElement) {
        sidebarElement.removeEventListener('click', handleClick)
        formElement.removeEventListener('click', handleClick)
      }
    }
  }, [controls])

  if (path.endsWith('/support')) {
    return (
      <div id="sidebar" className="flex max-h-[90vh] flex-col">
        <AppHeader />
        <div className="flex h-app-frame-height max-h-[580px] w-app-frame-width max-w-[1280px] gap-16">
          <motion.div
            animate={controls}
            className="flex w-[11.5rem] min-w-[11.5rem] flex-col items-center  rounded-s-2xl"
          >
            <div className="h-[99rem] w-full rounded-t-2xl rounded-br-2xl bg-customize-sidebar-background shadow-customize-sidebar-finish-shadow">
              <div className="flex h-[14rem] w-full flex-col items-center justify-center gap-4">
                {user.userPhoto ? (
                  <div className="flex h-28 w-28 items-center justify-center rounded-full bg-zinc-300 text-[3.5rem] text-[#0067FF]">
                    <Image
                      src={user.userPhoto}
                      alt=""
                      width={112}
                      height={112}
                      className="rounded-full"
                    />
                  </div>
                ) : (
                  <div className="flex h-28 w-28 items-center justify-center rounded-full bg-zinc-300 text-[3.5rem] text-[#0067FF]">
                    <User />
                  </div>
                )}
                <h1 className="flex gap-1 text-xl font-bold text-[#002F62]">
                  Olá,
                  <span className="text-[#0067FF]">{userName}!</span>
                </h1>
              </div>
              <div className="m-auto h-[1px] w-[70%] bg-slate-300" />
              <Nav />
            </div>
            <div className="mt-auto flex h-12 w-full flex-col items-center justify-end py-1">
              <span className="flex h-10 w-[60%] items-center gap-2 text-white">
                <Question /> Ajuda
              </span>
            </div>
            <div className="mt-auto flex h-[3rem] w-full items-center justify-center  rounded-b-2xl rounded-tr-2xl bg-customize-sidebar-background shadow-customize-sidebar-finish-shadow">
              <SidebarFooter />
            </div>
          </motion.div>
          <div className="mt-4 flex h-[100%] max-w-[100%-30rem] flex-1 items-center justify-center">
            {children}
          </div>
        </div>
        <div>
          <footer className="mt-5">
            <Image src={LogoInterna} alt="" className="h-12 w-12" />
          </footer>
        </div>
      </div>
    )
  } else {
    return (
      <div id="sidebar" className="flex max-h-[90vh] flex-col">
        <AppHeader />
        <div className="flex h-app-frame-height max-h-[580px] w-app-frame-width max-w-[1280px] gap-16">
          <motion.div
            animate={controls}
            className="flex w-[11.5rem] min-w-[11.5rem] flex-col items-center  rounded-s-2xl"
          >
            <div className="h-2/5 w-full  rounded-t-2xl rounded-br-2xl bg-customize-sidebar-background shadow-customize-sidebar-finish-shadow">
              <div className="flex h-[14rem] w-full flex-col items-center justify-center gap-4">
                {user.userPhoto ? (
                  <div className="flex h-28 w-28 items-center justify-center rounded-full bg-zinc-300 text-[3.5rem] text-[#0067FF]">
                    <Image
                      src={user.userPhoto}
                      alt=""
                      width={112}
                      height={112}
                      className="rounded-full"
                    />
                  </div>
                ) : (
                  <div className="flex h-28 w-28 items-center justify-center rounded-full bg-zinc-300 text-[3.5rem] text-[#0067FF]">
                    <User />
                  </div>
                )}
                <h1 className="flex gap-1 text-xl font-bold text-[#002F62]">
                  Olá,
                  <span className="text-[#0067FF]">{userName}!</span>
                </h1>
              </div>
            </div>
            <Nav />
            <div className="mt-auto flex h-2/3 w-full flex-col items-center justify-end  rounded-b-2xl rounded-tr-2xl bg-customize-sidebar-background shadow-customize-sidebar-finish-shadow">
              <div className="flex h-full w-[60%]  items-end">
                <a
                  href="/start/support"
                  className="mt-auto flex h-10 w-[60%] items-center gap-2 text-[#002f62]"
                >
                  <Question /> Ajuda
                </a>
              </div>
              <SidebarFooter />
            </div>
          </motion.div>
          <div className="max-w-[100%-30rem] flex-1">{children}</div>
        </div>
        <div>
          <footer className="mt-5">
            <Image src={LogoInterna} alt="" className="h-12 w-12" />
          </footer>
        </div>
      </div>
    )
  }
}
