import { CaretRight } from '@phosphor-icons/react'
import React from 'react'

interface OptionCardProps {
  title: string
  link: string
}

export default function OptionCard({ title, link }: OptionCardProps) {
  return (
    <a
      href={link}
      className="flex h-24 w-full items-center justify-between rounded-2xl bg-customize-signature-form-background pl-[3.38rem] text-white shadow-customize-signature-form-shadow backdrop-blur-[20px]"
    >
      <h1 className="text-xl font-bold">{title}</h1>
      <CaretRight weight="bold" className="mr-[2.59rem]" />
    </a>
  )
}
