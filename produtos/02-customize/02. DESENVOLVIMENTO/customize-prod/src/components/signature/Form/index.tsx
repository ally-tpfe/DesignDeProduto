'use client'
import React from 'react'
import * as RadioGroup from '@radix-ui/react-radio-group'
import { Check, Share } from '@phosphor-icons/react'
import { useUserContext } from '@/contexts/UserContext'
export default function SignatureForm() {
  const { user, addUser } = useUserContext()

  function handleUsePhoto() {
    // get usePhoto radio input value
    const usePhotoElement = document.querySelector(
      'button[role="radio"][aria-checked="true"]',
    ) as HTMLButtonElement

    if (usePhotoElement) {
      const usePhotoValue = usePhotoElement.value
      addUser({
        ...user,
        usePhoto: usePhotoValue === 'sim',
      })
    } else {
      console.error('Nenhum botão de opção selecionado')
    }
  }

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    addUser({
      ...user,
      [event.target.name]: event.target.value,
    })
    sessionStorage.setItem('tpf-customize@user', JSON.stringify(user))
  }
  return (
    <>
      <form
        action=""
        className="m-auto flex h-full w-full flex-col gap-4 px-20 pb-16 pt-5"
      >
        <h1 className="pt-6 text-xl font-semibold text-white">
          Painel de edição
        </h1>
        <div className="flex h-full w-full">
          <div className="flex w-1/2 flex-col">
            <div className="mt-4 flex flex-col gap-2">
              <label htmlFor="foto" className="text-base text-white">
                Usar foto de perfil do teams na assinatura?
              </label>
              <RadioGroup.Root
                className="flex h-auto w-auto items-center gap-4 "
                name="foto"
                id="usePhoto"
                defaultValue="sim"
                onChange={handleUsePhoto}
              >
                <div className="flex items-center gap-2">
                  <RadioGroup.Item
                    value="sim"
                    id="radio1"
                    className="h-[1.79rem] w-[1.79rem] rounded-md  border-[3px] border-[#002D68] "
                  >
                    <RadioGroup.Indicator
                      className="h-full w-full text-white "
                      asChild
                    >
                      <Check />
                    </RadioGroup.Indicator>
                  </RadioGroup.Item>
                  <label htmlFor="radio1" className="text-white">
                    Sim
                  </label>
                </div>

                <div className="flex items-center gap-2">
                  <RadioGroup.Item
                    value="nao"
                    id="radio2"
                    className="h-[1.79rem] w-[1.79rem]  rounded-md border-[3px] border-[#002D68] "
                  >
                    <RadioGroup.Indicator
                      className="h-full w-full text-white "
                      asChild
                    >
                      <Check />
                    </RadioGroup.Indicator>
                  </RadioGroup.Item>
                  <label htmlFor="radio2" className="text-white">
                    Não
                  </label>
                </div>
              </RadioGroup.Root>
            </div>

            <div className="mt-auto flex flex-col">
              <label htmlFor="foto" className="text-base text-white">
                E-mail*
              </label>
              <input
                type="text"
                className="h-[2rem] w-[20rem] rounded-md bg-[#002F62] pl-3 text-sm text-white"
                defaultValue={user.email || 'seu.email@tpfe.com.br'}
                name="email"
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="flex w-1/2 flex-col">
            <div className="mt-4 flex flex-col">
              <label htmlFor="foto" className="text-base text-white">
                Nome*
              </label>
              <input
                type="text"
                className="h-[2rem] w-[20rem] rounded-md bg-[#002F62] pl-3 text-sm text-white"
                defaultValue={user.fullName || 'Seu nome'}
                name="fullName"
                onChange={handleInputChange}
              />
            </div>
            <div className="mt-auto flex gap-4">
              <div className=" flex gap-1">
                <div className="flex flex-col">
                  <label htmlFor="foto" className="text-base text-white">
                    Fone escritório*
                  </label>
                  <input
                    type="telephone"
                    className="h-[2rem] rounded-l-md bg-[#002F62] pl-3 text-sm text-white"
                    defaultValue={'(81) 3316-0700'}
                    name="workPhone"
                    onChange={handleInputChange}
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="foto" className="text-base text-white">
                    Ramal
                  </label>
                  <input
                    type="number"
                    className="h-[2rem] w-[3.6rem] rounded-r-md bg-[#002F62] pl-3 text-sm text-white"
                    placeholder="0000"
                    name="workPhoneExtension"
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="mt-auto flex flex-col">
                <label htmlFor="foto" className="text-base text-white">
                  Fone pessoal
                </label>
                <input
                  type="telephone"
                  className="h-[2rem] w-[10rem] rounded-md bg-[#002F62] pl-3 text-sm text-white"
                  defaultValue={''}
                  placeholder="(XX) XXXX-XXXX"
                  name="personalPhone"
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
        </div>
        <button
          id="concluir"
          className="fixed bottom-0 left-[40%] top-72 flex h-8 w-28 items-center justify-center gap-1 rounded-lg bg-[#0067FF] px-3 py-1 font-bold text-zinc-50 hover:opacity-90"
          type="button"
          onClick={(e) => e.preventDefault()}
        >
          <Share weight="bold" />
          Concluir
        </button>
      </form>
    </>
  )
}
