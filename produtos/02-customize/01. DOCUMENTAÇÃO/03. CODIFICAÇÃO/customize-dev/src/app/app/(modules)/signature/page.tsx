'use client'
import Image from 'next/image'
import React from 'react'
import Signature from '@/assets/Customize/Signatures/template.svg'

import { motion } from 'framer-motion'
import Form from '../../components/Form'
export default function Sign() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="flex h-full w-full flex-col gap-16 pl-14"
    >
      <div className="h-[19.31619rem] w-full rounded-[1.25rem] bg-white bg-opacity-5 shadow-2xl backdrop-blur-md">
        <Form />
      </div>
      <div className="flex h-[14.125rem] w-full flex-shrink-0 items-center justify-center rounded-2xl bg-transparent">
        <Image
          src={Signature}
          alt=""
          className="h-full w-full rounded-[1.25rem] object-cover"
        />
      </div>
    </motion.div>
  )
}
