import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function isUserNew(email: string) {
  const user = await fetch(
    `/api/users?email=${email}&apiKey=eba33af7-acac-4207-b4f5-b0ea78be9c2b`,
  )
  if (user) {
    return false
  } else {
    return true
  }
}
