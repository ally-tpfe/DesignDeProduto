'use client'
import React from 'react'
import { motion } from 'framer-motion'
export default function Backgrounds() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="flex h-full w-full flex-col items-center justify-center gap-16 pl-14"
    >
      <div
        className=" bg-custom-gray shadow-custom-blue flex h-full w-full items-center justify-center
 rounded-xl  bg-white bg-opacity-5 backdrop-blur-md"
      >
        <div className="flex h-full w-full flex-col items-start justify-center gap-[3.92rem] px-[3.38rem] py-[2.09rem]">
          <h1 className="text-2xl font-bold text-white">Temas</h1>
          <div className="grid h-full w-full flex-1 grid-cols-3 gap-[3.4rem]">
            <div className="shadow-custom-gray h-[10rem] w-[14rem] rounded-xl bg-white" />
            <div className="shadow-custom-gray h-[10rem] w-[14rem] rounded-xl bg-white" />
            <div className="shadow-custom-gray h-[10rem] w-[14rem] rounded-xl bg-white" />
          </div>
        </div>
      </div>
    </motion.div>
  )
}
