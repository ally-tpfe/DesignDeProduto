import axios from 'axios'

// Função para definir a assinatura do e-mail
export async function setMailSignature(accessToken: string, userId: string) {
  const url = `https://graph.microsoft.com/v1.0/users/${userId}/settings`
  const signature = `
    Atenciosamente,
    [Seu Nome]
    [Seu Cargo]
    [Seu Email]
    [Seu Telefone]
    [Endereço da Sua Empresa]
    `
  const headers = {
    Authorization: `Bearer ${accessToken}`,
    'Content-Type': 'application/json',
  }

  const data = {
    messageFormat: {
      signature: {
        contentType: 'text',
        content: signature,
      },
    },
  }

  try {
    const response = await axios.patch(url, data, { headers })
    return response.data
  } catch (error) {
    console.error(`Erro ao definir a assinatura do e-mail: ${error}`)
  }
}
