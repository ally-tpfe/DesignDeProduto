/* eslint-disable camelcase */
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'

import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'

import dotenv from 'dotenv'

dotenv.config()

const access_key = 'AKIAVDH6WIRPE5L4Y2FC'
const secret_access_key = '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'

const s3 = new S3Client({
  credentials: {
    accessKeyId: access_key || '',
    secretAccessKey: secret_access_key || '',
  },
  region: 'sa-east-1',
})

export async function getUserPhoto(accessToken: string) {
  try {
    const response = await axios.get(
      'https://graph.microsoft.com/v1.0/me/photo/$value',
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        responseType: 'arraybuffer',
      },
    )

    const blob = new Blob([response.data])
    const url = URL.createObjectURL(blob)

    const img = new Image()
    img.src = url

    await new Promise((resolve) => (img.onload = resolve))

    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    const aspectRatio = img.width / img.height

    canvas.width = img.width
    canvas.height = img.height

    ctx?.drawImage(img, 0, 0, canvas.width, canvas.height)

    return canvas.toDataURL()
  } catch (error) {
    console.error(`Failed to get user photo: ${error}`)
    return null
  }
}

export async function uploadUserPhotoToS3(accessToken: string) {
  try {
    const response = await axios.get(
      'https://graph.microsoft.com/v1.0/me/photo/$value',
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        responseType: 'arraybuffer',
      },
    )

    const buffer = Buffer.from(response.data)

    // Arredondar a imagem
    const roundedBuffer = await roundImage(buffer)

    const randomID = uuidv4()

    const params = {
      Bucket: 'customize-photo',
      Key: `user-${randomID}.jpg`,
      Body: roundedBuffer, // Usar o buffer arredondado
      ContentType: 'image/jpeg',
    }

    const command = new PutObjectCommand(params)
    await s3.send(command)

    const photoUrl = `https://customize-photo.s3.sa-east-1.amazonaws.com/user-${randomID}.jpg`
    return photoUrl
  } catch (error) {
    console.error(`Failed to get user photo: ${error}`)
    return null
  }
}

// Função para arredondar a imagem
async function roundImage(buffer: Buffer) {
  return new Promise<Buffer>((resolve, reject) => {
    const img = new Image()
    img.src = `data:image/jpeg;base64,${buffer.toString('base64')}`

    img.onload = () => {
      const size = Math.min(img.width, img.height)
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')

      canvas.width = size
      canvas.height = size

      if (ctx) {
        ctx.fillStyle = 'white'
      }
      ctx?.fillRect(0, 0, size, size)

      ctx?.save()
      // Criar um círculo de recorte
      ctx?.beginPath()
      ctx?.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2)
      ctx?.clip()

      // Desenhar a imagem
      ctx?.drawImage(img, 0, 0, size, size)

      ctx?.restore()

      canvas.toBlob(
        (blob) => {
          const reader = new FileReader()
          reader.readAsArrayBuffer(blob as Blob)
          reader.onloadend = () => {
            const roundedBuffer = Buffer.from(reader.result as ArrayBuffer)
            resolve(roundedBuffer)
          }
        },
        'image/jpeg',
        0.3,
      )
    }

    img.onerror = (error) => {
      reject(error)
    }
  })
}
