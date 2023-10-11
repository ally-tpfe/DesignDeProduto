import React, { ReactNode, useState } from 'react'
import { FormCard } from './styledForm'
import { ArrowDown20Filled, ArrowUp20Filled } from '@fluentui/react-icons'
import { useForm } from 'react-hook-form'
import * as Checkbox from '@radix-ui/react-checkbox'
import Check from '@/assets/utils/check.svg'
import Image from 'next/image'

interface FormProps {
  children: ReactNode
  titulo: string
}

export default function Card({children, titulo}: FormProps) {
  const [open, setOpen] = useState(false)
  const [values, setValues] = useState({})
  const [isChecked, setIsChecked] = useState(false)
  
  

  return (
    <FormCard className={open ? 'open' : ''}>
      <header>
        <p>{titulo}</p>
        {isChecked && (
          <Image src={Check} alt='' />
        )}
        {!open && (
          <span onClick={() => setOpen(!open)}>
            <i className="fa-solid fa-chevron-down" style={{color:'#FFFFFF', cursor:'pointer'}} ></i>
          </span>
        )}
        {open && (
          <Checkbox.Root asChild className="CheckboxRoot" onCheckedChange={() => setIsChecked(!isChecked)}>
              <button id='check'>Salvar</button>
          </Checkbox.Root>
        )

        }
      </header>

      <main>
          {children}
      </main>
     
        {open && (
          <footer>
            <span>
                <i className="fa-solid fa-chevron-up" style={{color:'#FFFFFF', cursor:'pointer'}} onClick={() => setOpen(!open)}></i>
            </span>
          </footer>
        )
      }
      
    </FormCard>
  )
}
