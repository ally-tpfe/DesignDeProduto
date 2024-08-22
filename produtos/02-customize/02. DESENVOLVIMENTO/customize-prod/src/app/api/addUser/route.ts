import { PrismaClient } from '@prisma/client'
import { NextRequest } from 'next/server'

const prisma = new PrismaClient()

export async function POST(req: NextRequest) {
  const data = await req.json()

  const user = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  })
  try {
    if (!user) {
      await prisma.user.create({
        data: {
          email: data.email,
          name: data.name,
          user_photo: data.user_photo ? data.user_photo : 'null',
          personal_phone: data.personal_phone ? data.personal_phone : 'null',
          work_phone: data.work_phone ? data.work_phone : 'null',
          work_phone_extension: data.work_phone_extension
            ? data.work_phone_extension
            : 'null',
        },
      })
    } else {
      await prisma.user.update({
        where: {
          email: data.email,
        },
        data: {
          name: data.name,
          user_photo: data.user_photo ? data.user_photo : 'null',
          personal_phone: data.personal_phone ? data.personal_phone : 'null',
          work_phone: data.work_phone ? data.work_phone : 'null',
          work_phone_extension: data.work_phone_extension
            ? data.work_phone_extension
            : 'null',
        },
      })
    }
  } catch (error) {
    console.log(error)
    return new Response(JSON.stringify(error), {
      status: 500,
    })
  }
  return new Response(JSON.stringify(data), {
    status: 201,
  })
}
