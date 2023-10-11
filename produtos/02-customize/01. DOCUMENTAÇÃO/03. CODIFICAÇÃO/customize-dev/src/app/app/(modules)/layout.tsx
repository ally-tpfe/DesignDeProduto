import React from 'react'
import Background2 from '@/assets/Customize/Waves/background2.svg'
import Image from 'next/image'
import App from '../components/App'

export interface LayoutProps {
  children: React.ReactNode
}
export default function layout({ children }: LayoutProps) {
  return (
    <div className="bg-app-background h-full w-full overflow-hidden">
      <div className="flex h-full w-full flex-col items-center justify-center">
        <div className="absolute -z-10 h-full w-full  overflow-hidden">
          <Image
            src={Background2}
            alt=""
            className="h-full w-full object-cover"
            width={1280}
            height={831}
          />
        </div>
        <App>{children}</App>
      </div>
    </div>
  )
}
