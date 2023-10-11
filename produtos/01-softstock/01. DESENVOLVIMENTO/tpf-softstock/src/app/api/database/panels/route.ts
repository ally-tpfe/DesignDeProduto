import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import {  getSession } from 'next-auth/react';

const prisma = new PrismaClient()

export async function GET(req: Request) {
    const authHeader = req.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return NextResponse.json({ error: 'Missing or invalid access token' });
    }
    const panels = await prisma.panels.findMany();
    return NextResponse.json({ data: panels });
}





export async function POST(req: Request){
    const authHeader = req.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return NextResponse.json({ error: 'Missing or invalid access token' });
    }

    const data = await req.json();

    await prisma.panels.create({
        data:{
            software: data.software,
            fornecedor: data.fornecedor,
            plataforma: data.plataforma,
            usuario: data.usuario,
            senha: data.senha,
        }
    })

    return new Response('Panel credentials added successfully')

}

export async function DELETE(req: Request){
    const authHeader = req.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return NextResponse.json({ error: 'Missing or invalid access token' });
    }
    
    const { id } = await req.json();

    await prisma.panels.delete({
        where:{
            id: id
        }
    })

    return new Response('Panel credentials deleted successfully')
}

export async function PUT(req: Request){
    const data = await req.json();

    await prisma.panels.update({
        where:{
            id: data.id
        },
        data:{
            fornecedor: data.fornecedor,
            plataforma: data.plataforma,
            usuario: data.usuario,
            senha: data.senha,
        }
    })

    return new Response('Panel credentials updated successfully')
}