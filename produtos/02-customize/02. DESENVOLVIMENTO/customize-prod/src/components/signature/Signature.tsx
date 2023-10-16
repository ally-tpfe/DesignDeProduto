'use client'
import { useUserContext } from '@/contexts/UserContext'
import Image from 'next/image'
import React from 'react'
import { Poppins } from 'next/font/google'
import InstagramLogo from '@/assets/IgIcon.svg'
import LinkedinLogo from '@/assets/InIcon.svg'
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
})
export default function Signature() {
  const { user } = useUserContext()

  return (
    <>
      {user.usePhoto && user.userPhoto ? (
        <div className="flex h-36 w-36 items-center justify-center ">
          <Image
            className="flex-1 rounded-full"
            src={user.userPhoto || ''}
            alt=""
            width={340}
            height={340}
          />
        </div>
      ) : (
        ''
      )}
      <div className="flex h-full w-[16rem] flex-1 flex-col justify-center gap-2 p-2 ">
        <h1
          className={`${poppins.variable} mt-2 text-base font-bold text-[#0067FF]`}
        >
          {user.fullName.toUpperCase()}
        </h1>
        <div className={`${poppins.variable} flex flex-col`}>
          <span className={`${poppins.variable} text-sm text-[#003B75]`}>
            {user.email}
          </span>
          <span className={`${poppins.variable} text-sm text-[#003B75]`}>
            {user.workPhone}{' '}
            {user.workPhoneExtension
              ? '- ramal ' + user.workPhoneExtension
              : ''}{' '}
            <br />
            {user.personalPhone ? ` ${user.personalPhone}` : ''}
          </span>
          <div className={`${poppins.variable} flex gap-2`}>
            <a
              href="https://www.instagram.com/tpfengenharia/"
              className="text-sm text-[#003B75]"
            >
              <Image src={InstagramLogo} alt="" width={16} height={16} />
            </a>
            <a
              href="https://www.linkedin.com/company/tpfengenharia/mycompany/"
              className="text-sm text-[#003B75]"
            >
              <Image src={LinkedinLogo} alt="" width={15} height={15} />
            </a>
          </div>
          <span className={`${poppins.variable} text-sm text-[#003B75]`}>
            www.tpfengenharia.com
          </span>
        </div>
        <h1 className={`${poppins.variable} text-md text-[#0067FF]`}>
          Building the world, better.
        </h1>
      </div>
    </>
  )
}
