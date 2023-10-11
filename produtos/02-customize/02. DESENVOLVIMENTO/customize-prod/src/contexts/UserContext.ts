import { createContext, useContext } from 'react'

export interface User {
  firstName: string
  fullName: string
  email: string
  userPhoto: string
  usePhoto: boolean
  accessToken: string
  workPhone: string
  workPhoneExtension: string
  personalPhone: string
}
interface UserContext {
  user: User
  addUser: (user: User) => void
}

export const UserContext = createContext<UserContext>({
  user: {
    firstName: '',
    fullName: '',
    email: '',
    userPhoto: '',
    usePhoto: false,
    accessToken: '',
    workPhone: '',
    workPhoneExtension: '',
    personalPhone: '',
  },
  addUser(user) {
    return user
  },
})

export const useUserContext = () => useContext(UserContext)
