import React from 'react'
import { StyledFormField } from './styledForm'
import { useForm } from 'react-hook-form'

export default function FormField(props: any) {
  const { register } = useForm()

  return (
    <StyledFormField>
        <label htmlFor={props.name}>{props.displayName}</label>
        <input type={props.type} {...props.register} />
    </StyledFormField>
  )
}
