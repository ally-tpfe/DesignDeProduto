import { PrismaClient } from '@prisma/client'
import { NextRequest } from 'next/server'

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const email = searchParams.get('email')
  const apiKey = searchParams.get('apiKey')

  if (!isValidApiKey(apiKey as string)) {
    return new Response(JSON.stringify('API key inválida'), {
      status: 401, // Código de status não autorizado
      headers: {
        'Access-Control-Allow-Origin': 'https://ally-tpfe.github.io',
      },
    })
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email as string,
      },
    })

    if (user) {
      return new Response(JSON.stringify(user), {
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': 'https://ally-tpfe.github.io',
          'Access-Control-Allow-Methods': 'GET',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
      })
    } else {
      return new Response(JSON.stringify('Usuário não encontrado'), {
        status: 404, // Código de status de não encontrado
        headers: {
          'Access-Control-Allow-Origin': 'https://ally-tpfe.github.io',
        },
      })
    }
  } catch (error) {
    console.log(error)
    return new Response(JSON.stringify('Erro interno do servidor'), {
      status: 500, // Código de status de erro interno do servidor
      headers: {
        'Access-Control-Allow-Origin': 'https://ally-tpfe.github.io',
      },
    })
  }
}

function isValidApiKey(apiKey: string) {
  return apiKey === process.env.API_KEY
}
