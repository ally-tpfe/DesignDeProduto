import React from 'react'

interface LabelProps {
  title: string
  id: string
}
export default function Label({ title, id, ...props }: LabelProps) {
  return (
    <label htmlFor={id} className="font text-base text-white" {...props}>
      {title}
    </label>
  )
}
