'use client'
import React from 'react'
import Signature from '@/assets/Customize/Signatures/template.svg'
import Image from 'next/image'
import { ArrowBendUpLeft, Share } from '@phosphor-icons/react'

export default function FinishSignature() {
  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 top-0 flex h-full w-full flex-col items-center justify-center gap-[2.28rem]">
        <span className="shadow-inner-custom relative flex h-[3rem] w-[42rem] items-center justify-center rounded-xl bg-opacity-5 text-lg text-white backdrop-blur">
          Confira mais uma vez sua assinatura antes de anexá-la ao seu email
        </span>
        <div className="flex h-[17.00194rem] w-[67.93263rem] flex-shrink-0 items-center justify-center rounded-2xl bg-transparent">
          <Image
            src={Signature}
            alt=""
            className="h-full w-full rounded-[1.25rem] object-cover"
          />
        </div>
        <div className="flex w-full items-center justify-center gap-[3rem]">
          <button className="mt-3 flex items-center justify-center gap-2 rounded-lg bg-[#FF7A00] px-6 py-1 font-bold text-zinc-50 hover:opacity-90">
            <ArrowBendUpLeft weight="bold" />
            Voltar
          </button>
          <button className="mt-3 flex items-center justify-center gap-2 rounded-lg bg-[#0067FF] px-6 py-1 font-bold text-zinc-50 hover:opacity-90">
            <Share weight="bold" />
            Enviar
          </button>
        </div>
      </div>
    </>
  )
}
