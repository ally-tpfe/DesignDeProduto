'use client'
import React from 'react'

import Image from 'next/image'
import LogoCompletaCustomize from '@/assets/logoCompleta.svg'
import LogoReduzidaTPF from '@/assets/logoReduzidaTpf.svg'
import Hub from '@/components/start/Hub'

import { motion } from 'framer-motion'
export default function App() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.1 }}
      className="flex h-full w-full flex-col items-center justify-center gap-12 px-32 py-16 "
    >
      <Image src={LogoCompletaCustomize} alt="" width={96} height={96} />
      <div className="flex h-16 w-96 items-center justify-center rounded-2xl bg-white bg-opacity-0 p-2 shadow-customize-title-card-shadow backdrop-blur-md">
        <h1 className="text-[1.85rem] font-bold text-white">
          O que deseja criar?
        </h1>
      </div>
      <Hub />
      <Image src={LogoReduzidaTPF} alt="" className="h-18 w-18 mb-10 md:mb-0" />
    </motion.div>
  )
}
