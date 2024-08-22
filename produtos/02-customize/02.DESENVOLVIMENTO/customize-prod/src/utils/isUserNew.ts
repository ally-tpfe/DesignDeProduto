import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function isUserNew(email: string) {
  const user = await fetch(
    `/api/users?email=${email}&apiKey=${process.env.API_KEY}`,
  )
  if (user) {
    return false
  } else {
    return true
  }
}
