'use client'
import React from 'react'
import CustomizeLogo from '@/assets/Customize/logo-completa.svg'
import TPFLogoReduzida from '@/assets/Customize/TPF/logo-reduzida.svg'
import Image from 'next/image'

import { PencilSimpleLine, UserRectangle } from '@phosphor-icons/react'
import Card from './components/Card'
import { useRouter } from 'next/navigation'

import { motion } from 'framer-motion'
export default function Home() {
  const router = useRouter()
  function Navigate(route: string) {
    router.push(route)
  }
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className=" flex h-screen w-screen flex-col items-center justify-center gap-20 overflow-auto"
      >
        <Image
          src={CustomizeLogo}
          alt=""
          className="mt-52 h-24 w-24 md:mt-0 "
        />
        <div className="rounded-2xl bg-white bg-opacity-5 pb-[13.85px] pl-[37.25px] pr-[38.15px] pt-[9.38px] shadow-md backdrop-blur">
          <h1 className="text-2xl font-bold text-white">O que deseja criar?</h1>
        </div>

        <div className="flex flex-col items-center gap-16 sm:flex-row">
          <Card
            action={() => {
              Navigate('app/signature')
            }}
            title="Assinatura de e-mail"
            icon={PencilSimpleLine}
            description="Torne seu e-mail mais confiável de forma rápida e simples"
          />
          <Card
            action={() => {
              Navigate('/')
            }}
            title="Plano de fundo para chamadas"
            icon={UserRectangle}
            description="Personalize um plano de fundo com a cara da TPF"
          />
        </div>
        <Image
          src={TPFLogoReduzida}
          alt=""
          className="mb-10 h-12 w-12 md:mb-0"
        />
      </motion.div>
    </>
  )
}
