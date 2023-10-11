import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(req: Request){
    const authHeader = req.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return NextResponse.json({ error: 'Missing or invalid access token' });
    }
    const softwares = await prisma.softwares.findMany();

    return NextResponse.json({
        data: softwares
    })
}

export async function POST(req: Request){
    const authHeader = req.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return NextResponse.json({ error: 'Missing or invalid access token' });
    }
    const data = await req.json();

    await prisma.softwares.create({
        data:{
            id_sgp: data.id_sgp,
            nf: data.nf,
            tipo_de_registro: data.tipo_de_registro,
            tipo_de_licenca: data.tipo_de_licenca,
            pacote: data.pacote,
            software: data.software,
            responsavel: data.responsavel,
            fornecedor: data.fornecedor,
            contato_do_fornecedor: data.contato_do_fornecedor,
            centro_de_custo: data.centro_de_custo,
            forma_de_pagamento: data.forma_de_pagamento,
            moeda_de_pagamento: data.moeda_de_pagamento,
            valor_moeda_original: data.valor_moeda_original,
            valor_reais: data.valor_reais,
            quantidade: data.quantidade,
            data_de_inicio: data.data_de_inicio,
            data_de_termino: data.data_de_termino,
            observacoes: data.observacoes,
            categoria: data.categoria
        }
    })

    return new Response('Registro de software adicionado com sucesso.')

}

export async function DELETE(req: Request){
    const authHeader = req.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return NextResponse.json({ error: 'Missing or invalid access token' });
    }
    const { id } = await req.json();

    
    await prisma.softwares.delete({
        where:{
            id: id
        }
    }).catch(e => {
        console.log(e)
    })

    return new Response('Registro de software removido com sucesso.')
}

export async function PUT(req: Request){
    const authHeader = req.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return NextResponse.json({ error: 'Missing or invalid access token' });
    }
    const { id, ...data } = await req.json();


    await prisma.softwares.update({
        where: {
            id: id
        },
        data: { ...data }
    });

    return new Response('Registro de software atualizado com sucesso.');
}

