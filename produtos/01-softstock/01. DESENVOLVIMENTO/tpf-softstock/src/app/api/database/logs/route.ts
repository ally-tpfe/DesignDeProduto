import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()




export async function GET(req: Request){
    const authHeader = req.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return NextResponse.json({ error: 'Missing or invalid access token' });
    }
    
   const logs = await prisma.logs.findMany();
  
    return NextResponse.json({
      data: logs,
    });
}

export async function POST(req: Request){
    const authHeader = req.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return NextResponse.json({ error: 'Missing or invalid access token' });
    }
    const data = await req.json();
    
    await prisma.logs.create({
        data:{
            user: data.user,
            table: data.table,
            action: data.action,
            localizator: data.localizator,
            item: data.item
        }
    })
    
    return new Response('log created sucessfully')
}


export async function PUT(req: Request){
    const data = await req.json();

    await prisma.logs.updateMany({
        where:{
            localizator: data.localizator
        },
        data: {
            localizator: undefined
        }
    })

    return new Response('Logs updated successfully')
}
