'use client'
import React, { ReactNode, useEffect, useState } from 'react'
import { User, UserContext } from './UserContext'
import { useMsal } from '@azure/msal-react'
import { getUserPhoto } from '@/utils/getPhoto'

interface UserContextProps {
  children: ReactNode
}

export const UserContextProvider = ({ children }: UserContextProps) => {
  const [user, setUser] = useState<User>(() => {
    if (typeof window !== 'undefined') {
      // Agora estamos no lado do cliente
      const savedUser = localStorage.getItem('tpf-customize@user')
      return savedUser
        ? JSON.parse(savedUser)
        : {
            firstName: '',
            fullName: '',
            email: '',
            userPhoto: '',
            usePhoto: false,
          }
    } else {
      return {
        firstName: '',
        fullName: '',
        email: '',
        userPhoto: '',
        usePhoto: false,
      }
    }
  })

  const { instance } = useMsal()

  useEffect(() => {
    const getUser = async () => {
      try {
        const account = instance.getActiveAccount()
        if (!account) {
          throw Error('No active account!')
        }
        const response = await instance.acquireTokenSilent({
          scopes: ['User.Read, User.ReadWrite.All'],
          account,
        })
        // Assuming the response contains the user data you need

        const newUser = {
          email: response.account.username as string,
          firstName: response.account.name?.split(' ')[0] as string,
          fullName: response.account.name as string,
          usePhoto: true,
          userPhoto: (await getUserPhoto(response.accessToken)) as string,
          accessToken: response.accessToken,
          workPhone: '',
          workPhoneExtension: '',
          personalPhone: '',
        }

        setUser(newUser)
        // Save the user data to localStorage
        localStorage.setItem('tpf-customize@user', JSON.stringify(newUser))
      } catch (e) {
        console.error(e)
      }
    }
    getUser()
  }, [instance])

  const addUser = (user: User) => {
    setUser(user)
    // Save the user data to localStorage
    localStorage.setItem('tpf-customize@user', JSON.stringify(user))
  }

  return (
    <UserContext.Provider value={{ user, addUser }}>
      {children}
    </UserContext.Provider>
  )
}
