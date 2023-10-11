'use client'
import React from 'react'
import * as CheckBoxPrimitive from '@radix-ui/react-checkbox'
interface InputProps {
  id: string
  placeholder?: string
}

export function CheckBox({ id, ...props }: InputProps) {
  return (
    <CheckBoxPrimitive.Root
      className="m-0 flex h-7 w-7 items-center justify-center  rounded-md border-[3px] border-solid border-[#002D68] p-0 hover:bg-blue-600"
      id={id}
      {...props}
    >
      <CheckBoxPrimitive.CheckboxIndicator className="h-full w-full rounded-md bg-blue-600" />
    </CheckBoxPrimitive.Root>
  )
}

export function Text(props: InputProps) {
  return (
    <div>
      <input
        type="text"
        {...props}
        className="h-8 w-full rounded-lg bg-regular-azul-escuro px-4 py-2 text-sm text-white placeholder:text-sm"
        placeholder={props.placeholder}
      />
    </div>
  )
}
