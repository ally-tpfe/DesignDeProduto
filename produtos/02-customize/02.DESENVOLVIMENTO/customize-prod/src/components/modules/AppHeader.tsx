'use client'
import React, { useEffect } from 'react'
import NavigationToggle from './NavigationToggle'
import { motion, useAnimation } from 'framer-motion'

export default function AppHeader() {
  const controls = useAnimation()
  useEffect(() => {
    const handleClick = async () => {
      await controls.start({
        opacity: 0,
        transition: { duration: 0.5 },
      })
    }
    const handleClickReverse = async () => {
      await controls.start({
        opacity: 1,
        transition: { duration: 3.7 },
      })
    }

    const sidebarElement = document.getElementById('sidebar')
    const formElement = document.getElementById('form')
    const trigger = document.getElementById('concluir')
    const reverseTrigger = document.getElementById('voltar')

    if (sidebarElement && formElement) {
      trigger?.addEventListener('click', handleClick)
      reverseTrigger?.addEventListener('click', handleClickReverse)
    }

    return () => {
      if (sidebarElement && formElement) {
        sidebarElement.removeEventListener('click', handleClick)
        formElement.removeEventListener('click', handleClick)
      }
    }
  }, [controls])
  return (
    <motion.div
      id="header"
      className="mb-2 flex h-8 w-full items-center justify-between gap-3"
      animate={controls}
    >
      <NavigationToggle />
    </motion.div>
  )
}
