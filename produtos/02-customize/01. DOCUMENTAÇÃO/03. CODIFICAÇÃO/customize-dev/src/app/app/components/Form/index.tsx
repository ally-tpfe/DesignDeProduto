'use client'
import React from 'react'
import * as Input from '@/app/app/components/Form/Input'
import Label from './Label'
import { Share } from '@phosphor-icons/react'

export default function Form() {
  return (
    <form className="h-full w-full px-14 pb-14 pt-6">
      <h1 className="text-xl font-semibold text-white">Painel de edição</h1>
      <div className="grid h-full w-full grid-cols-2 gap-16 pt-10">
        <div className=" h-full w-full">
          <div className="mb-9 space-y-3">
            <Label
              title="Usar foto de perfil do teams na assinatura?"
              id="allowPhoto"
            />
            <div className=" flex items-center gap-7">
              <div className="flex items-center gap-2">
                <Input.CheckBox id="allowPhoto" />
                <Label title="Sim" id="allowPhoto" />
              </div>
              <div className="flex items-center gap-2">
                <Input.CheckBox id="DontAllowPhoto" />
                <Label title="Não" id="DontAllowPhoto" />
              </div>
            </div>
          </div>
          <div className="mt-8 flex flex-col gap-2">
            <Label title="E-mail*" id="email" />
            <Input.Text id="email" placeholder="meu.usuario@tpfe.com.br" />
          </div>
        </div>
        <div className="h-full w-full ">
          <div className=" flex flex-col gap-2">
            <Label title="Nome*" id="nome" />
            <Input.Text id="nome" placeholder="Meu nome" />
          </div>
          <div className="mt-[2.70rem] flex gap-2">
            <div>
              <Label title="Fone escritório*" id="fone" />
              <div className="flex gap-1">
                <Input.Text id="fone" placeholder="Telefone escritório" />
              </div>
            </div>
            <div>
              <Label title="Fone pessoal*" id="fone" />
              <Input.Text id="nome" placeholder="Meu nome" />
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <a
          href="/app/signature/finish"
          className="mt-3 flex items-center justify-center gap-1 rounded-lg bg-[#0067FF] px-3 py-1 font-bold text-zinc-50 hover:opacity-90"
        >
          <Share weight="bold" />
          Concluir
        </a>
      </div>
    </form>
  )
}
