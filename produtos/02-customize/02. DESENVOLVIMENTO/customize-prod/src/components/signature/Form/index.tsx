'use client'
/* eslint-disable no-use-before-define */

import React, { useEffect } from 'react'
import * as RadioGroup from '@radix-ui/react-radio-group'
import { CaretDown, Check, Share } from '@phosphor-icons/react'
import { useUserContext } from '@/contexts/UserContext'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { useMsal } from '@azure/msal-react'
import { zodResolver } from '@hookform/resolvers/zod'
import InputMask from 'react-input-mask'

const userSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'Por favor, insira no mínimo 3 caracteres.' }),
  email: z
    .string()
    .email({ message: 'Por favor, insira um email válido.' })
    .regex(/^[a-zA-Z]+\.[a-zA-Z]+@tpf$/, {
      message:
        'Por favor,/^^[a-zA-Z]+\\.[a-zA-Z]+@tpf$/ insira um email válido.',
    }),
  personal_phone: z
    .string()
    .max(15, { message: 'Por favor, insira um telefone válido.' }),
  work_phone: z.string().max(15),
  work_phone_extension: z
    .string()
    .min(4, { message: 'Por favor, insira 4 caracteres.' })
    .max(4, { message: 'Por favor, insira 4 caracteres.' })
    .optional(),
  usePhoto: z.boolean().default(true),
})

type userSchema = z.infer<typeof userSchema>

export default function SignatureForm() {
  const { register, watch, handleSubmit, formState } = useForm<userSchema>({
    resolver: zodResolver(userSchema),
  })
  const { user, addUser } = useUserContext()
  const { accounts } = useMsal()

  return (
    <form className="-z-50 flex h-full w-[100%-15rem] flex-col px-12 pt-6">
      <h1 className="font-sans text-xl font-bold text-white">
        Painel de edição
      </h1>
      <div className="grid h-full w-full grid-cols-2 pt-7">
        {/* LADO A */}

        <div className="flex flex-col gap-9">
          <div className="flex flex-col items-start ">
            <label className="text-white">
              Usar foto de perfil do teams na assinatura?
            </label>
            <RadioGroup.Root
              defaultValue="sim"
              className="flex items-center justify-center gap-6"
              {...register('usePhoto', {
                onChange: (e) => {
                  addUser({
                    ...user,
                    usePhoto: e.target.value === 'sim',
                  })
                },
              })}
            >
              <div className="mt-3 flex gap-2 text-white">
                <RadioGroup.Item
                  value={'sim'}
                  id="true"
                  className="flex h-6 w-6 items-center justify-center rounded-md border-[3px] border-[#002F62]  text-white"
                >
                  <RadioGroup.Indicator asChild>
                    <Check weight="bold" fontSize={14} />
                  </RadioGroup.Indicator>
                </RadioGroup.Item>
                <p>Sim</p>
              </div>
              <div className="mt-3 flex gap-2 text-white">
                <RadioGroup.Item
                  value="nao"
                  id="false"
                  className="flex h-6 w-6 items-center justify-center rounded-md border-[3px] border-[#002F62]  text-white"
                >
                  <RadioGroup.Indicator asChild>
                    <Check weight="bold" fontSize={14} />
                  </RadioGroup.Indicator>
                </RadioGroup.Item>
                <p>Não</p>
              </div>
            </RadioGroup.Root>
          </div>

          <div className="flex flex-col">
            <label className="text-white">E-mail*</label>
            <input
              className="mt-2 h-[2rem] w-[19.625rem] rounded-lg  bg-[#002F62] px-3 text-sm text-white placeholder-gray-500 shadow-sm outline-none"
              type="text"
              maxLength={40}
              defaultValue={
                user.email
                  ? user.email
                  : accounts[0]?.username
                  ? accounts[0].username
                  : ''
              }
              placeholder="nome.sobrenome@tpfe.com.br"
              {...register('email', {
                onChange: (e) => {
                  addUser({ ...user, email: e.target.value })
                },
              })}
            />
            {!user.email && (
              <p className="mt-1 text-[0.6875rem] font-bold text-[#FF8328]">
                campo obrigatório*
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-9">
          {/* LADO B */}
          <div className="flex flex-col">
            <label className="text-white">Nome*</label>
            <input
              id="name"
              className="mt-2 h-[2rem] w-[19.625rem] rounded-lg  bg-[#002F62] px-3 text-sm text-white placeholder-gray-500 shadow-sm outline-none"
              type="text"
              maxLength={25}
              required
              defaultValue={
                user.fullName
                  ? user.fullName
                  : accounts[0]?.name
                  ? accounts[0].name
                  : ''
              }
              placeholder="Nome"
              {...register('name', {
                onChange: (e) => {
                  addUser({ ...user, fullName: e.target.value })
                },
              })}
            />
            {!user.fullName && (
              <p className="mt-1 text-[0.6875rem] font-bold text-[#FF8328]">
                campo obrigatório*
              </p>
            )}
          </div>
          <div className="flex flex-col">
            <div className="flex gap-4">
              <p className="text-[0.925rem] text-white">Telefone Escritório*</p>
              <p className="ml-6 text-[0.925rem] text-white">Ramal</p>
              <p className="ml-[4.5rem] text-[0.925rem] text-white">
                Telefone Pessoal
              </p>
            </div>
            <div className="mt-1 flex h-auto w-[20rem] items-start gap-[0.0625rem] text-white">
              <div>
                <DropdownMenu.Root>
                  <DropdownMenu.Trigger
                    asChild
                    className="z-[999] flex h-[2rem] w-[10rem] items-center justify-between gap-[0.0625rem] text-sm  outline-none"
                  >
                    <div>
                      <button
                        type="button"
                        className="flex h-8  w-full items-center rounded-s-lg bg-[#002f62] pl-4 opacity-95 hover:opacity-100"
                      >
                        <p id="workPhoneSelect" className="text-sm">
                          {user.workPhone ? user.workPhone : 'Selecionar'}
                        </p>
                      </button>
                      <div className="flex h-full w-[3rem] items-center justify-center border-transparent bg-[#002f62] opacity-95  hover:cursor-pointer hover:opacity-100">
                        <CaretDown />
                      </div>
                    </div>
                  </DropdownMenu.Trigger>
                  <DropdownMenu.Content className="z-50 mt-1 flex w-[10rem] flex-col items-start justify-center  rounded-md bg-[#002f62]">
                    <DropdownMenu.Item
                      onClick={() => {
                        addUser({
                          ...user,
                          workPhone: '(81) 3316.0700',
                        })
                        localStorage.setItem(
                          'tpf-customize@user',
                          JSON.stringify(user),
                        )
                      }}
                      className="flex h-10 w-full items-center justify-start rounded-t-md border-b-[0.15px] border-[#126bd5] bg-[#002f62] pl-4 outline-none transition-all hover:cursor-pointer hover:bg-[#003d7e] hover:text-[0.925rem] hover:text-[#499bff]"
                    >
                      Recife
                    </DropdownMenu.Item>
                    <DropdownMenu.Item
                      onClick={() => {
                        addUser({
                          ...user,
                          workPhone: '(85) 3133.4900',
                        })
                        localStorage.setItem(
                          'tpf-customize@user',
                          JSON.stringify(user),
                        )
                      }}
                      className="flex h-10 w-full items-center justify-start rounded-t-md border-b-[0.15px] border-[#126bd5] bg-[#002f62] pl-4 outline-none transition-all hover:cursor-pointer hover:bg-[#003d7e] hover:text-[0.925rem] hover:text-[#499bff]"
                    >
                      Fortaleza
                    </DropdownMenu.Item>
                    <DropdownMenu.Item
                      onClick={() => {
                        addUser({
                          ...user,
                          workPhone: '(11) 3237.2580',
                        })
                        localStorage.setItem(
                          'tpf-customize@user',
                          JSON.stringify(user),
                        )
                      }}
                      className="flex h-10 w-full items-center justify-start rounded-b-md border-b-[0.15px] border-[#126ad2] bg-[#002f62] pl-4 outline-none transition-all hover:cursor-pointer hover:bg-[#003d7e] hover:text-[0.925rem] hover:text-[#499bff]"
                    >
                      São Paulo
                    </DropdownMenu.Item>
                  </DropdownMenu.Content>
                </DropdownMenu.Root>
                {!user.workPhone && (
                  <p className="mt-1 text-[0.6875rem] font-bold text-[#FF8328]">
                    campo obrigatório*
                  </p>
                )}
              </div>
              <div className="">
                <div className=" flex flex-col">
                  <input
                    className="flex h-[2rem] w-[3.875rem] items-center rounded-e-md bg-[#002F62] px-2 text-sm text-white placeholder-[#126ad2]  shadow-sm outline-none placeholder:text-[0.8rem] placeholder:font-semibold"
                    type="text"
                    placeholder="Ex:.1010"
                    maxLength={4}
                    pattern="\d{4}"
                    defaultValue={
                      user.workPhoneExtension ? user.workPhoneExtension : ''
                    }
                    {...register('work_phone_extension', {
                      onChange: (e) => {
                        if (e.target.value.length > 4) {
                          e.target.value = e.target.value.slice(0, 4)
                        }
                        addUser({ ...user, workPhoneExtension: e.target.value })
                      },
                    })}
                  />
                </div>
              </div>
              <div className="">
                <div className=" flex flex-col">
                  <InputMask
                    mask="(99) 99999.9999"
                    defaultValue={user.personalPhone}
                    onChange={(e) => {
                      addUser({ ...user, personalPhone: e.target.value })
                    }}
                  >
                    <input
                      className="ml-16 flex h-[2rem] w-[8rem] items-center rounded-md bg-[#002F62] px-2 text-sm text-white placeholder-[#126ad2]  shadow-sm outline-none placeholder:text-[0.8rem] placeholder:font-semibold"
                      type="text"
                      placeholder="(81) 98972.9005"
                    />
                  </InputMask>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="relative top-4 flex w-full items-center justify-center">
        <button
          onClick={(e) => {
            e.preventDefault()
            localStorage.setItem('tpf-customize@user', JSON.stringify(user))
          }}
          id="concluir"
          className=" flex h-[2rem] w-[7.21894rem] items-center justify-center gap-2 rounded-md bg-[#0067FF] font-bold text-white opacity-90 hover:opacity-100"
        >
          <Share /> Concluir
        </button>
      </div>
    </form>
  )
}
