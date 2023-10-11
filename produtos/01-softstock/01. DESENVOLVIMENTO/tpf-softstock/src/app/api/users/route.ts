import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { NextApiRequest } from 'next';

const prisma = new PrismaClient()

export async function GET(req: Request){
    const authHeader = req.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return NextResponse.json({ error: 'Unauthorized' });
    }

    const users = await prisma.user.findMany();

    return NextResponse.json({
        data: users ? users : []
    })
}

export async function POST(req: Request){
    const authHeader = req.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return NextResponse.json({ error: 'Unauthorized' });
    }
    const data = await req.json();

    await prisma.user.create({
        data:{
            name: data.name,
            email: data.email
        }
    })

    return new Response('User created successfully')

}

// create PUT function
export async function PUT(req: Request){
    const authHeader = req.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return NextResponse.json({ error: 'Unauthorized' });
    }
    const data = await req.json();

    await prisma.user.update({
        where:{
            email: data.email
        },
        data:{
            name: data.nome,
        }
    })

    return new Response('License updated successfully')
}

// DELETE function

export async function DELETE(req: Request){
    const authHeader = req.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return NextResponse.json({ error: 'Unauthorized' });
    }
    const { id } = await req.json();

    await prisma.user.delete({
        where:{
            id: id
        }
    })
}
