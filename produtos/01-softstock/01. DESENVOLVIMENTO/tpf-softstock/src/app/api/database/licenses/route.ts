import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()




export async function GET(req: Request){
    const authHeader = req.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return NextResponse.json({ error: 'Unauthorized' });
    }

   const licenses = await prisma.licenses.findMany();
  
    return NextResponse.json({
      data: licenses,
    });
}

  

export async function POST(req: Request){
    const authHeader = req.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return NextResponse.json({ error: 'Unauthorized' });
    }
    const data = await req.json();

    await prisma.licenses.create({
        data:{
            software: data.software,
            categoria: data.categoria,
            chave: data.chave,
            usuario: data.usuario,
            gerente: data.gerente,
            produto: data.produto,
            observacoes: data.observacoes,
        }
    })

    return new Response('License added successfully')

}

export async function DELETE(req: Request){
    const authHeader = req.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return NextResponse.json({ error: 'Unauthorized' });
    }
    const { id } = await req.json();

    await prisma.licenses.delete({
        where:{
            id: id
        }
    })

    return new Response('License - Registro deletado com sucesso.')
}

export async function PUT(req: Request){
    const data = await req.json();

    await prisma.licenses.update({
        where:{
            id: data.id
        },
        data:{
            software: data.software,
            categoria: data.categoria,
            chave: data.chave,
            usuario: data.usuario,
            gerente: data.gerente,
            produto: data.produto,
            observacoes: data.observacoes,
        }
    })

    return new Response('Licenses - Registro atualizado com sucesso.')
}

