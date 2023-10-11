import Image from 'next/image'
import React from 'react'

import Teste from '@/assets/Customize/Loading/anim.svg'
export default function Animacao() {
  return (
    <div>
      <Image src={Teste} alt="" />
    </div>
  )
}
