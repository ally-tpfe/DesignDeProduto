'use client'
import { api } from "@/lib/axios";
import { Table, TableContentToolbar, TableContentToolbarButtons, TableSplitButton, TableToolbarButton, TableToolbarButtonIcon, Tbody, Thead } from "@/styles/table";
import { Input } from "@fluentui/react-components";
import { Delete24Filled, Delete24Regular, Search24Regular, Status24Filled, Status24Regular } from "@fluentui/react-icons";
import * as Dialog from '@radix-ui/react-dialog';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from "react-hook-form";
import { z } from "zod";
import { SoftStyledContainer, SoftStyledContent, StyledOverlay } from "@/styles/modal";
import { Form, FormContainer, FormContainerLeft, FormContainerRight, StyledFormField } from "./components/form/styledForm";
import { useEffect, useState } from "react";
import Card from "./components/form/FormCard";
import Check from '@/assets/utils/check.svg'
import Image from "next/image";
import TableIsLoading from "@/utils/TableIsLoading";
import { formatDate, formatDateForInput, formatMoney } from "@/utils/formatText";
import { useSession } from "next-auth/react";
import { v4 as uuidv4, v5 as uuidv5 } from 'uuid';
import Plus from '@/assets/icons/mais.svg'
import Export from '@/assets/icons/export.svg'


const columns = [
    'ID SGP',
    'NF',
    'TIPO DE REGISTRO',
    'TIPO DE LICENÇA',
    'PACOTE',
    'SOFTWARE',
    'CATEGORIA',
    'RESPONSÁVEL',
    'FORNECEDOR',
    'CONTATO DO FORNECEDOR',
    'CENTRO DE CUSTO',
    'FORMA DE PAGAMENTO',
    'MOEDA DE PAGAMENTO',
    'VALOR NA MOEDA ORIGINAL',
    'VALOR EM REAIS',
    'QUANTIDADE',
    'DATA DE INÍCIO',
    'DATA DE TÉRMINO',
    'OBSERVAÇÕES',
]



const userFormSchema = z.object({
    id:z.string().optional(),
    id_sgp: z.string().min(4, 'O valor deve ter no mínimo 4 caracteres'),
    nf: z.string().min(1, 'Este campo deve ser preenchido.'),
    tipo_de_registro: z.string().min(1, 'Este campo deve ser preenchido.'),
    tipo_de_licenca: z.string().min(1, 'Este campo deve ser preenchido.'),
    pacote: z.string().min(1, 'Este campo deve ser preenchido.'),
    software: z.string().min(1, 'Este campo deve ser preenchido.'),
    responsavel: z.string().min(1, 'Este campo deve ser preenchido.'),
    fornecedor: z.string().min(1, 'Este campo deve ser preenchido.'),
    contato_do_fornecedor: z.string().min(1, 'Este campo deve ser preenchido.'),
    centro_de_custo: z.string().min(1, 'Este campo deve ser preenchido.'),

    forma_de_pagamento: z.string().min(1, 'Este campo deve ser preenchido.'),
    moeda_de_pagamento: z.string().min(1, 'Este campo deve ser preenchido.'),
    valor_moeda_original: z.preprocess(
        (args) => (args === '' ? undefined : args),
        z.coerce
        .number({
            required_error: 'Este campo é obrigatório',
            invalid_type_error: 'Este campo deve ser um número'})
        .min(0, 'O valor deve ser maior que 0')
        .positive('O valor deve ser positivo')
    ),
    valor_reais: z.preprocess(
        (args) => (args === '' ? undefined : args),
        z.coerce
        .number({
            required_error: 'Este campo é obrigatório',
            invalid_type_error: 'Este campo deve ser um número'})
        .min(0, 'O valor deve ser maior que 0')
        .positive('O valor deve ser positivo')
    ),

    quantidade: z.preprocess(
        (args) => (args === '' ? undefined : args),
        z.coerce
        .number({
            required_error: 'Este campo é obrigatório',
            invalid_type_error: 'Este campo deve ser um número'})
        .min(0, 'O valor deve ser maior que 0')
        .positive('O valor deve ser positivo')
    ),
    data_de_inicio: z.preprocess(
        (args) => (args === '' ? undefined : args),
        z.coerce
        .date({
            required_error: 'Este campo é obrigatório',
            invalid_type_error: 'Este campo deve ser uma data válida'})
    ),
    data_de_termino: z.preprocess(
        (args) => (args === '' ? undefined : args),
        z.coerce
        .date({
            required_error: 'Este campo é obrigatório',
            invalid_type_error: 'Este campo deve ser uma data válida',

        })
    ),
    observacoes: z.string(),
    categoria: z.string().min(1, 'Este campo deve ser preenchido.'),
})

export type UserFormSchema = z.infer<typeof userFormSchema>

interface FieldState {
    isOutro: boolean;
    outroValue: string;
  }
  
  interface FieldStates {
    software: FieldState;
    pacote: FieldState;
    responsavel: FieldState;
    fornecedor: FieldState;
    centro_de_custo: FieldState;
    categoria: FieldState;
    tipo_de_licenca: FieldState;
    tipo_de_registro: FieldState;
    forma_de_pagamento: FieldState;
    moeda_de_pagamento: FieldState;
    id_sgp: string;
    nf:string;
    observacoes: string;
    contato_do_fornecedor: string;
    valor_moeda_original: number;
    valor_reais: number;
    quantidade: number;
    data_de_inicio: Date;
    data_de_termino: Date;
  
  }


export default function TableContent(){

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [softwares, setSoftwares] = useState<UserFormSchema[]>([])

    const [filteredSoftwares, setFilteredSoftwares] = useState<UserFormSchema[]>(softwares)

    const [selectedItems, setSelectedItems] = useState<string[]>([])
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const {data: session, status} = useSession()
    const accessToken = (session?.user as { accessToken?: string })?.accessToken;

    const selectedItemID = selectedItems[0]
    const selectedItem = softwares.find((item) => item.id === selectedItemID)

    useEffect(() => {
        setIsLoading(true);
        getSoftwares();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if(isModalOpen){
            const dataTerminoFormatada = formatDateForInput(new Date(selectedItem!.data_de_termino));
            const dataInicioFormatada = formatDateForInput(new Date(selectedItem!.data_de_inicio));
            setFormData({
                id_sgp: selectedItem ? selectedItem.id_sgp : '',
                nf: selectedItem ? selectedItem.nf : '',
                tipo_de_registro: selectedItem ? selectedItem.tipo_de_registro : '',
                tipo_de_licenca: selectedItem ? selectedItem.tipo_de_licenca : '',
                pacote:selectedItem ? selectedItem.pacote : '',
                software:selectedItem ? selectedItem.software : '',
                responsavel:selectedItem ? selectedItem.responsavel : '',
                fornecedor:selectedItem ? selectedItem.fornecedor : '',
                contato_do_fornecedor:selectedItem ? selectedItem.contato_do_fornecedor : '',
                centro_de_custo:selectedItem ? selectedItem.centro_de_custo : '',
                forma_de_pagamento:selectedItem ?  selectedItem.forma_de_pagamento : '',
                moeda_de_pagamento:selectedItem ?  selectedItem.moeda_de_pagamento : '',
                valor_moeda_original:selectedItem ?  selectedItem.valor_moeda_original : 0,
                valor_reais:selectedItem ? selectedItem.valor_reais : 0,
                quantidade:selectedItem ? selectedItem.quantidade : 0,
                data_de_inicio:selectedItem ? dataInicioFormatada : '',
                data_de_termino:selectedItem ? dataTerminoFormatada : '',
                observacoes:selectedItem ? selectedItem.observacoes : '',
                categoria:selectedItem ? selectedItem.categoria : ''
            })
        }
    }, [isModalOpen, selectedItems])




    const [formData, setFormData] = useState({
        id_sgp: '',
        nf: '',
        tipo_de_registro: '',
        tipo_de_licenca: '',
        pacote: '',
        software: '',
        responsavel: '',
        fornecedor: '',
        contato_do_fornecedor: '',
        centro_de_custo: '',
        forma_de_pagamento:'',
        moeda_de_pagamento:'',
        valor_moeda_original: 0,
        valor_reais: 0,
        quantidade: 0,
        data_de_inicio: '',
        data_de_termino: '',
        observacoes: '',
        categoria: ''
    })

    const [fieldStates, setFieldStates] = useState<FieldStates>({
        software: {
          isOutro: false,
          outroValue:'',
        },
        categoria: {
          isOutro: false,
          outroValue:'',

        },
        pacote: {
          isOutro: false,
          outroValue:'',

        },
        responsavel: {
          isOutro: false,
          outroValue:'',

        },
        fornecedor: {
          isOutro: false,
          outroValue:'',

        },
        centro_de_custo: {
            isOutro: false,
            outroValue:'',
  
        },
        tipo_de_licenca: {
            isOutro: false,
            outroValue:'',
  
        },
        tipo_de_registro: {
            isOutro: false,
            outroValue:'',
  
        },
        forma_de_pagamento: {
            isOutro: false,
            outroValue:'',
  
        },
        moeda_de_pagamento: {
            isOutro: false,
            outroValue:'',
  
        },
        id_sgp: '',
        nf: '',
        observacoes:'',
        contato_do_fornecedor: '',
        valor_moeda_original: 0,
        valor_reais: 0,
        quantidade: 0,
        data_de_inicio: new Date(),
        data_de_termino: new Date(),
    });

    const handleInputChange = (fieldName: keyof FieldStates, value: string) => {
        setFormData((prevFormData) => ({
          ...prevFormData,
          [fieldName]: value,
        }));


        if (fieldName !== 'id_sgp' && fieldName !== 'nf' && fieldName !== 'observacoes' && fieldName !== 'contato_do_fornecedor' && 
            fieldName !== 'valor_moeda_original' && fieldName !== 'valor_reais' && fieldName !== 'quantidade') {
            setFieldStates((prevStates) => ({
              ...prevStates,
              [fieldName]: {
                ...prevStates[fieldName],
                isOutro: value === 'outro',
              },
            }));
        }
    };
    const handleOutroChange = (fieldName: keyof FieldStates, value: string) => {
        if (fieldName !== 'id_sgp' && fieldName !== 'nf' && fieldName !== 'observacoes' && fieldName !== 'contato_do_fornecedor' && 
            fieldName !== 'valor_moeda_original' && fieldName !== 'valor_reais' && fieldName !== 'quantidade') {
            setFieldStates((prevStates) => ({
                ...prevStates,
                [fieldName]: {
                    ...prevStates[fieldName],
                    outroValue: value,
                },
                }));
        }
    };




    const { 
        register,
        handleSubmit,
        formState: { errors, isSubmitSuccessful, isValid },
        reset,
    } = useForm<UserFormSchema>({
        resolver: zodResolver(userFormSchema),
        mode: 'onChange',
        defaultValues: {
            software: formData.software,
            fornecedor: formData.fornecedor,
            centro_de_custo: formData.centro_de_custo,
            forma_de_pagamento: formData.forma_de_pagamento,
            moeda_de_pagamento: formData.moeda_de_pagamento,
            tipo_de_licenca: formData.tipo_de_licenca,
            tipo_de_registro: formData.tipo_de_registro,
            pacote: formData.pacote,
            responsavel: formData.responsavel,
            categoria:formData.categoria,
            id_sgp: formData.id_sgp,
            nf: formData.nf,
            data_de_inicio: new Date(formData.data_de_inicio),
            data_de_termino: new Date(formData.data_de_termino),
            quantidade: formData.quantidade,
            valor_moeda_original: formData.valor_moeda_original,
            valor_reais: formData.valor_reais,
            observacoes: formData.observacoes,
        }
    })

    async function handleFormData(data: UserFormSchema){
        console.log(data)
        const id = uuidv4();
        await api.post('database/softwares', {
            id: id,
            id_sgp: data.id_sgp,
            nf: data.nf,
            tipo_de_registro: fieldStates.tipo_de_registro.isOutro ? fieldStates.tipo_de_registro.outroValue : data.tipo_de_registro,
            tipo_de_licenca: fieldStates.tipo_de_licenca.isOutro ? fieldStates.tipo_de_licenca.outroValue :  data.tipo_de_licenca,
            pacote: fieldStates.pacote.isOutro ? fieldStates.pacote.outroValue : data.pacote,
            software: fieldStates.software.isOutro ? fieldStates.software.outroValue : data.software,
            responsavel: fieldStates.responsavel.isOutro ? fieldStates.responsavel.outroValue : data.responsavel,
            fornecedor: fieldStates.fornecedor.isOutro ? fieldStates.fornecedor.outroValue :  data.fornecedor,
            contato_do_fornecedor: data.contato_do_fornecedor,
            centro_de_custo: fieldStates.centro_de_custo.isOutro ? fieldStates.centro_de_custo.outroValue : data.centro_de_custo,
            forma_de_pagamento: fieldStates.forma_de_pagamento.isOutro ? fieldStates.forma_de_pagamento.outroValue : data.forma_de_pagamento,
            moeda_de_pagamento: fieldStates.moeda_de_pagamento.isOutro ? fieldStates.moeda_de_pagamento.outroValue : data.moeda_de_pagamento,
            valor_moeda_original: data.valor_moeda_original,
            valor_reais: data.valor_reais,
            quantidade: data.quantidade,
            data_de_inicio: data.data_de_inicio,
            data_de_termino: data.data_de_termino,
            observacoes: data.observacoes,
            categoria: fieldStates.categoria.isOutro ? fieldStates.categoria.outroValue : data.categoria,

        }, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`
            }
        })
        fetch('/api/database/logs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`
            },
            body: JSON.stringify({
                user: session?.user?.name,
                table: 'softwares',
                action: 'create',
                localizator: id,
                item: fieldStates.software.isOutro ? fieldStates.software.outroValue : data.software
            })
        })
        
        getSoftwares();
    }
    
    useEffect(() => {
        if(isSubmitSuccessful){
            reset()
        }
    }, [isSubmitSuccessful, reset]);
    

    
    async function getSoftwares(){
        try {
            const softwares = await api.get('database/softwares',{
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`
                    
                }
            })
            setSoftwares(softwares.data.data)
            setFilteredSoftwares(softwares.data.data)
            setIsLoading(false)
            
        }catch (error){
            console.error('Error fetching data:', error);
            setIsLoading(false);
        }
        
    }

    // Pesquisa e filtragem

    function handleSearchSoftware(query: string) {
        const trimmedQuery = query.trim().toLowerCase();
        if (softwares) {
            const filteredData = softwares.filter((software) => {
                const values = Object.values(software).map((value) => String(value).toLowerCase());
                return values.some((value) => value.includes(trimmedQuery));
            });
            setFilteredSoftwares(filteredData);
        }
    }
    
    function handleSearchIdSGP(query: string) {
        const trimmedQuery = query.trim().toLowerCase();
        if (softwares) {
            const filteredData = softwares.filter((software) => {
                const id_sgp = String(software.id_sgp).toLowerCase();
                return id_sgp.includes(trimmedQuery);
            });
            setFilteredSoftwares(filteredData);
        }
    }

    function handleSearchPacote(query: string) {
        const trimmedQuery = query.trim().toLowerCase();
        if (softwares) {
            const filteredData = softwares.filter((software) => {
                const pacote = String(software.pacote).toLowerCase();
                return pacote.includes(trimmedQuery);
            });
            setFilteredSoftwares(filteredData);
        }
    }
    
    function handleSearchSoftwareUnique(query: string) {
        const trimmedQuery = query.trim().toLowerCase();
        if (softwares) {
            const filteredData = softwares.filter((item) => {
                const software = String(item.software).toLowerCase();
                return software.includes(trimmedQuery);
            });
            setFilteredSoftwares(filteredData);
        }
    }

    function handleSearchResponsavel(query: string) {
        const trimmedQuery = query.trim().toLowerCase();
        if (softwares) {
            const filteredData = softwares.filter((software) => {
                const responsavel = String(software.responsavel).toLowerCase();
                return responsavel.includes(trimmedQuery);
            });
            setFilteredSoftwares(filteredData);
        }
    }
    
    function handleSearchFornecedor(query: string) {
        const trimmedQuery = query.trim().toLowerCase();
        if (softwares) {
            const filteredData = softwares.filter((software) => {
                const fornecedor = String(software.fornecedor).toLowerCase();
                return fornecedor.includes(trimmedQuery);
            });
            setFilteredSoftwares(filteredData);
        }
    }

    function handleSearchNF(query: string) {
        const trimmedQuery = query.trim().toLowerCase();
        if (softwares) {
            const filteredData = softwares.filter((software) => {
                const nf = String(software.nf).toLowerCase();
                return nf.includes(trimmedQuery);
            });
            setFilteredSoftwares(filteredData);
        }
    }

    // Select item

    const handleSelectItem = (panelId: string) => {
        setSelectedItems((prevSelectedItems) => {
            if (prevSelectedItems.includes(panelId)) {
                return prevSelectedItems.filter((id) => id !== panelId);
            } else {
            return [...prevSelectedItems, panelId];
          }
        });
    };
    

    // DELETE, UPDATE

    async function deleteSoftware(id: string) {
        // Create a new log entry
        await fetch('/api/database/logs', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
          },
          body: JSON.stringify({
            user: session?.user?.name,
            table: 'softwares',
            action: 'delete',
            localizator: selectedItemID,
            item: selectedItem?.software
          })
        })
      
        // Delete the software record
        await fetch('/api/database/softwares', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
          },
          body: JSON.stringify({
            id: id
          })
        })
        .then(response => response.text()) 
        .then(text => console.log(text)) 
        .catch(error => console.error(error))
        
        setSelectedItems([]);
        getSoftwares()
    }
      
      
      

    function updateSoftware(newData: any){
        if (!newData || !selectedItemID) {
            console.error('Invalid data or id');
            return;
        }
    
        fetch('/api/database/softwares', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify({
                id: selectedItemID,
                id_sgp: newData.id_sgp,
                nf: newData.nf,
                tipo_de_registro: fieldStates.tipo_de_registro.isOutro ? fieldStates.tipo_de_registro.outroValue : newData.tipo_de_registro,
                tipo_de_licenca: fieldStates.tipo_de_licenca.isOutro ? fieldStates.tipo_de_licenca.outroValue :  newData.tipo_de_licenca,
                pacote: fieldStates.pacote.isOutro ? fieldStates.pacote.outroValue : newData.pacote,
                software: fieldStates.software.isOutro ? fieldStates.software.outroValue : newData.software,
                responsavel: fieldStates.responsavel.isOutro ? fieldStates.responsavel.outroValue : newData.responsavel,
                fornecedor: fieldStates.fornecedor.isOutro ? fieldStates.fornecedor.outroValue :  newData.fornecedor,
                contato_do_fornecedor: newData.contato_do_fornecedor,
                centro_de_custo: fieldStates.centro_de_custo.isOutro ? fieldStates.centro_de_custo.outroValue : newData.centro_de_custo,
                forma_de_pagamento: fieldStates.forma_de_pagamento.isOutro ? fieldStates.forma_de_pagamento.outroValue : newData.forma_de_pagamento,
                moeda_de_pagamento: fieldStates.moeda_de_pagamento.isOutro ? fieldStates.moeda_de_pagamento.outroValue : newData.moeda_de_pagamento,
                valor_moeda_original: newData.valor_moeda_original,
                valor_reais: newData.valor_reais,
                quantidade: newData.quantidade,
                data_de_inicio: newData.data_de_inicio,
                data_de_termino: newData.data_de_termino,
                observacoes: newData.observacoes,
                categoria: fieldStates.categoria.isOutro ? fieldStates.categoria.outroValue : newData.categoria,
            })
        })
        .then(response => response.text()) 
        .then(text => {
            console.log(text);
            // Update UI with the response text
            const responseElement = document.getElementById('response');
            if (responseElement) {
                responseElement.textContent = text;
                setTimeout(() => {
                    responseElement.textContent = '';
                    getSoftwares();
                }, 3000); // Hide the response after 3 seconds
            }
        }) 
        .catch(error => console.error(error))
        fetch('/api/database/logs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify({
                user: session?.user?.name,
                table: 'softwares',
                action: 'update',
                localizator: selectedItemID,
                item: selectedItem?.software
            })
        })
    }
    
    
    // Utils 

    // Card 1 - Informações do Software
    const categoriasUnicas = [...new Set(softwares.map((software) => software.categoria))];
    const pacotesUnicos = [...new Set(softwares.map((software) => software.pacote))];
    const softwaresUnicos = [...new Set(softwares.map((software) => software.software))];
    const responsaveisUnicos = [...new Set(softwares.map((software) => software.responsavel))];
    const fornecedoresUnicos = [...new Set(softwares.map((software) => software.fornecedor))];
    const centrosDeCustoUnicos = [...new Set(softwares.map((software) => software.centro_de_custo))];

    // Card 2 - Informações Financeiras
    const formasDePagamentoUnicas = [...new Set(softwares.map((software) => software.forma_de_pagamento))];
    const moedaDePagamentoUnica = [...new Set(softwares.map((software) => software.moeda_de_pagamento))];

    // Card 3 - Periodicidade

    const tipoDeLicencaUnica = [...new Set(softwares.map((software) => software.tipo_de_licenca))];
    const tipoDeRegistroUnica = [...new Set(softwares.map((software) => software.tipo_de_registro))];

    



    const handleClickExport = () => {
        const csvData = Object.keys(filteredSoftwares[0]).join(';') + '\n' +
            filteredSoftwares.map(row => Object.values(row).join(';')).join('\n');
    
        const blob = new Blob([`\uFEFF${csvData}`], { type: 'text/csv;charset=utf-8' });
        const url = window.URL.createObjectURL(blob);
    
        const link = document.createElement('a');
        link.href = url;
        link.download = 'softstock-softwares.csv';
        link.click();
    
        window.URL.revokeObjectURL(url);
    };
    
    
    return (
        <>
        {isLoading ? (
            <TableIsLoading />
        ) : (
            <>
            <TableContentToolbar>
                <TableContentToolbarButtons>
                    <Dialog.Root>
                        <Dialog.Trigger asChild>
                            <TableToolbarButton> <Image src={Plus} alt=""/> Adicionar novo</TableToolbarButton>
                        </Dialog.Trigger>
                        <Dialog.Portal>
                            <StyledOverlay />
                            {isSubmitSuccessful ? (
                                <SoftStyledContainer style={{width:"20rem", padding: '1.5625rem 1.25rem', gap: '0.625rem', display:'flex', alignItems:'center', justifyContent:'center', borderRadius:25 }}>
                                    <SoftStyledContent style={{display: 'flex', alignItems:'center', justifyContent:'center', gap:'.3rem' }}>
                                            <Image src={Check} alt='' width={56.03} height={56.03} />
                                            <p style={{fontSize:'22px'}}>Salvo com sucesso</p>
                                    </SoftStyledContent>
                                </SoftStyledContainer>
                            ) : (
                                <>
                                    <>
                                        <SoftStyledContainer>
                                    <SoftStyledContent>
                                    <Dialog.Close asChild>
                                        <button onClick={() => reset()}>X </button>
                                    </Dialog.Close>
                                    <Form onSubmit={handleSubmit(handleFormData)}>
                                        <header>
                                            <p>Novo Software</p>
                                            <button type="submit" disabled={!isValid}>Enviar</button>
                                        </header>
                                        <FormContainer>
                                                <FormContainerLeft>
                                                    <Card titulo="1º Informações do software">
                                                        <StyledFormField>
                                                            <label htmlFor='id_sgp'>ID SGP</label>
                                                            <input type='text' {...register('id_sgp')} onChange={(e) => handleInputChange('id_sgp',e.target.value)}/>
                                                            {errors.id_sgp ? <span>{errors.id_sgp.message}</span> : <span style={{color: "transparent"}}>.</span>}
                                                        </StyledFormField>
                                                        <StyledFormField>
                                                            <label htmlFor='nf'>NF</label>
                                                            <input type='text' {...register('nf')} onChange={(e) => handleInputChange('nf',e.target.value)}/>
                                                            {errors.nf ? <span>{errors.nf.message}</span> : <span style={{color: "transparent"}}>.</span>}
                                                        </StyledFormField>
                                                        <StyledFormField>
                                                            <label htmlFor='nf'>Pacote</label>
                                                            <select {...register('pacote')} onChange={(e) => handleInputChange('pacote',e.target.value)}>
                                                                <option>Selecione uma opção</option>
                                                                {pacotesUnicos.map((pacote, index) => (
                                                                    <option key={index}>{pacote}</option>
                                                                    ))}
                                                                <option value="outro">Outro</option>
                                                                </select>
                                                                {fieldStates.pacote.isOutro && (
                                                                    <input
                                                                    type='text'
                                                                    placeholder='Pacote'
                                                                    value={fieldStates.pacote.outroValue}
                                                                    onChange={(e) => handleOutroChange('pacote', e.target.value)}
                                                                    />
                                                                )}
                                                            {errors.pacote ? <span>{errors.pacote.message}</span> : <span style={{color: "transparent"}}>.</span>}
                                                        </StyledFormField>
                                                        <StyledFormField>
                                                            <label htmlFor='software'>Software</label>
                                                            <select {...register('software')} onChange={(e) => handleInputChange('software',e.target.value)}>
                                                                <option>Selecione uma opção</option>
                                                                {softwaresUnicos.map((software, index) => (
                                                                    <option key={index}>{software}</option>
                                                                    ))}
                                                                <option value="outro">Outro</option>
                                                                </select>
                                                                {fieldStates.software.isOutro && (
                                                                    <input
                                                                    type='text'
                                                                    placeholder='Software'
                                                                    value={fieldStates.software.outroValue}
                                                                    onChange={(e) => handleOutroChange('software', e.target.value)}
                                                                    />
                                                                )}
                                                            {errors.software ? <span>{errors.software.message}</span> : <span style={{color: "transparent"}}>.</span>}

                                                        </StyledFormField>
                                                        <StyledFormField>
                                                            <label htmlFor='responsavel'>Responsável</label>
                                                            <select {...register('responsavel')} onChange={(e) => handleInputChange('responsavel',e.target.value)}>
                                                                <option>Selecione uma opção</option>
                                                                {responsaveisUnicos.map((responsavel, index) => (
                                                                    <option key={index}>{responsavel}</option>
                                                                    ))}
                                                                <option value="outro">Outro</option>
                                                                </select>
                                                                {fieldStates.responsavel.isOutro && (
                                                                    <input
                                                                    type='text'
                                                                    placeholder='Responsável'
                                                                    value={fieldStates.responsavel.outroValue}
                                                                    onChange={(e) => handleOutroChange('responsavel', e.target.value)}
                                                                    />
                                                                )}
                                                            {errors.responsavel ? <span>{errors.responsavel.message}</span> : <span style={{color: "transparent"}}>.</span>}

                                                        </StyledFormField>
                                                        <StyledFormField>
                                                            <label htmlFor='fornecedor'>Fornecedor</label>
                                                            <select {...register('fornecedor')} onChange={(e) => handleInputChange('fornecedor',e.target.value)}>
                                                                <option>Selecione uma opção</option>
                                                                {fornecedoresUnicos.map((fornecedor, index) => (
                                                                    <option key={index}>{fornecedor}</option>
                                                                    ))}
                                                                <option value="outro">Outro</option>
                                                                </select>
                                                                {fieldStates.fornecedor.isOutro && (
                                                                    <input
                                                                    type='text'
                                                                    placeholder='Fornecedor'
                                                                    value={fieldStates.fornecedor.outroValue}
                                                                    onChange={(e) => handleOutroChange('fornecedor', e.target.value)}
                                                                    />
                                                                )}
                                                            {errors.fornecedor ? <span>{errors.fornecedor.message}</span> : <span style={{color: "transparent"}}>.</span>}

                                                        </StyledFormField>
                                                        <StyledFormField>
                                                            <label htmlFor='contato_do_fornecedor'>Contato do fornecedor</label>
                                                            <input type='text' {...register('contato_do_fornecedor')} onChange={(e) => handleInputChange('contato_do_fornecedor',e.target.value)}/>
                                                            {errors.contato_do_fornecedor ? <span>{errors.contato_do_fornecedor.message}</span> : <span style={{color: "transparent"}}>.</span>}

                                                        </StyledFormField>
                                                        <StyledFormField>
                                                            <label htmlFor='centro_de_custo'>Centro de custo</label>
                                                            <select {...register('centro_de_custo')} onChange={(e) => handleInputChange('centro_de_custo',e.target.value)}>
                                                                <option>Selecione uma opção</option>
                                                                {centrosDeCustoUnicos.map((centro_de_custo, index) => (
                                                                    <option key={index}>{centro_de_custo}</option>
                                                                    ))}
                                                                <option value="outro">Outro</option>
                                                                </select>
                                                                {fieldStates.centro_de_custo.isOutro && (
                                                                    <input
                                                                    type='text'
                                                                    placeholder='Centro de custo'
                                                                    value={fieldStates.centro_de_custo.outroValue}
                                                                    onChange={(e) => handleOutroChange('centro_de_custo', e.target.value)}
                                                                    />
                                                                )}
                                                            {errors.centro_de_custo ? <span>{errors.centro_de_custo.message}</span> : <span style={{color: "transparent"}}>.</span>}

                                                        </StyledFormField>
                                                        <StyledFormField>
                                                            <label htmlFor='categoria'>Categoria</label>
                                                            <select {...register('categoria')} onChange={(e) => handleInputChange('categoria',e.target.value)}>
                                                                <option>Selecione uma opção</option>
                                                                {categoriasUnicas.map((categoria, index) => (
                                                                    <option key={index}>{categoria}</option>
                                                                ))}
                                                                <option value="outro">Outro</option>
                                                                </select>
                                                                {fieldStates.categoria.isOutro && (
                                                                    <input
                                                                    type='text'
                                                                    placeholder='Categoria'
                                                                    value={fieldStates.categoria.outroValue}
                                                                    onChange={(e) => handleOutroChange('categoria', e.target.value)}
                                                                    />
                                                                )}
                                                            {errors.categoria ? <span>{errors.categoria.message}</span> : <span style={{color: "transparent"}}>.</span>}

                                                        </StyledFormField>
                                                    </Card>
                                                    <Card titulo="3º Periodicidade">
                                                        <StyledFormField>
                                                            <label htmlFor='tipo_de_licenca'>Tipo de licença</label>
                                                            <select {...register('tipo_de_licenca')} onChange={(e) => handleInputChange('tipo_de_licenca',e.target.value)}>
                                                                <option>Selecione uma opção</option>
                                                                {tipoDeLicencaUnica.map((tipo_de_licenca, index) => (
                                                                    <option key={index}>{tipo_de_licenca}</option>
                                                                ))}
                                                                <option value="outro">Outro</option>
                                                                </select>
                                                                {fieldStates.tipo_de_licenca.isOutro && (
                                                                    <input
                                                                    type='text'
                                                                    placeholder='Tipo de licença'
                                                                    value={fieldStates.tipo_de_licenca.outroValue}
                                                                    onChange={(e) => handleOutroChange('tipo_de_licenca', e.target.value)}
                                                                    />
                                                                )}
                                                            {errors.tipo_de_licenca ? <span>{errors.tipo_de_licenca.message}</span> : <span style={{color: "transparent"}}>.</span>}

                                                        </StyledFormField>
                                                        <StyledFormField>
                                                            <label htmlFor='tipo_de_registro'>Tipo de registro</label>
                                                            <select {...register('tipo_de_registro')} onChange={(e) => handleInputChange('tipo_de_registro',e.target.value)}>
                                                                <option>Selecione uma opção</option>
                                                                {tipoDeRegistroUnica.map((tipo_de_registro, index) => (
                                                                    <option key={index}>{tipo_de_registro}</option>
                                                                ))}
                                                                <option value="outro">Outro</option>
                                                                </select>
                                                                {fieldStates.tipo_de_registro.isOutro && (
                                                                    <input
                                                                    type='text'
                                                                    placeholder='Tipo de registro'
                                                                    value={fieldStates.tipo_de_registro.outroValue}
                                                                    onChange={(e) => handleOutroChange('tipo_de_registro', e.target.value)}
                                                                    />
                                                                )}
                                                            {errors.tipo_de_registro ? <span>{errors.tipo_de_registro.message}</span> : <span style={{color: "transparent"}}>.</span>}

                                                        </StyledFormField>
                                                        <StyledFormField>
                                                            <label htmlFor='data_de_inicio'>Data de início</label>
                                                            <input type='date' {...register('data_de_inicio')} />
                                                            {errors.data_de_inicio ? <span>{errors.data_de_inicio.message}</span> : <span style={{color: "transparent"}}>.</span>}

                                                        </StyledFormField>
                                                        <StyledFormField>
                                                            <label htmlFor='data_de_termino'>Data de termino</label>
                                                            <input type='date' {...register('data_de_termino')} />
                                                            {errors.data_de_termino ? <span>{errors.data_de_termino.message}</span> : <span style={{color: "transparent"}}>.</span>}
                                                        </StyledFormField>
                                                </Card>
                                                    
                                                </FormContainerLeft>
                                                <FormContainerRight>
                                                <Card titulo="2º Informações financeiras">
                                                    <StyledFormField>
                                                        <label htmlFor='forma_de_pagamento'>Forma de pagamento</label>
                                                        <select {...register('forma_de_pagamento')} onChange={(e) => handleInputChange('forma_de_pagamento',e.target.value)}>
                                                                <option>Selecione uma opção</option>
                                                                {formasDePagamentoUnicas.map((forma_de_pagamento, index) => (
                                                                    <option key={index}>{forma_de_pagamento}</option>
                                                                ))}
                                                                <option value="outro">Outro</option>
                                                                </select>
                                                                {fieldStates.forma_de_pagamento.isOutro && (
                                                                    <input
                                                                    type='text'
                                                                    placeholder='Forma de pagamento'
                                                                    value={fieldStates.forma_de_pagamento.outroValue}
                                                                    onChange={(e) => handleOutroChange('forma_de_pagamento', e.target.value)}
                                                                    />
                                                                )}
                                                        {errors.forma_de_pagamento ? <span>{errors.forma_de_pagamento.message}</span> : <span style={{color: "transparent"}}>.</span>}

                                                    </StyledFormField>
                                                    <StyledFormField>
                                                        <label htmlFor='moeda_de_pagamento'>Moeda de Pagamento</label>
                                                        <select {...register('moeda_de_pagamento')} onChange={(e) => handleInputChange('moeda_de_pagamento',e.target.value)} defaultValue="R$">
                                                                <option>R$</option>
                                                                {moedaDePagamentoUnica.map((moeda_de_pagamento, index) => (
                                                                    <option key={index}>{moeda_de_pagamento}</option>
                                                                ))}
                                                                <option value="outro">Outro</option>
                                                                </select>
                                                                {fieldStates.moeda_de_pagamento.isOutro && (
                                                                    <input
                                                                    type='text'
                                                                    placeholder='Moeda de pagamento'
                                                                    value={fieldStates.moeda_de_pagamento.outroValue}
                                                                    onChange={(e) => handleOutroChange('moeda_de_pagamento', e.target.value)}
                                                                    />
                                                                )}
                                                        {errors.moeda_de_pagamento ? <span>{errors.moeda_de_pagamento.message}</span> : <span style={{color: "transparent"}}>.</span>}

                                                    </StyledFormField>
                                                    <StyledFormField>
                                                        <label htmlFor='valor_moeda_original'>Valor na moeda original</label>
                                                        <input type='number' {...register('valor_moeda_original')} onChange={(e) => handleInputChange('valor_moeda_original',e.target.value)}/>
                                                        {errors.valor_moeda_original ? <span>{errors.valor_moeda_original.message}</span> : <span style={{color: "transparent"}}>.</span>}

                                                    </StyledFormField>
                                                    <StyledFormField>
                                                        <label htmlFor='valor_reais'>Valor em reais</label>
                                                        <input type='number' {...register('valor_reais')} onChange={(e) => handleInputChange('valor_reais',e.target.value)}/>
                                                        {errors.valor_reais ? <span>{errors.valor_reais.message}</span> : <span style={{color: "transparent"}}>.</span>}

                                                    </StyledFormField>
                                                    <StyledFormField>
                                                        <label htmlFor='quantidade'>Quantidade</label>
                                                        <input type='number' {...register('quantidade')} onChange={(e) => handleInputChange('quantidade',e.target.value)}/>
                                                        {errors.quantidade ? <span>{errors.quantidade.message}</span> : <span style={{color: "transparent"}}>.</span>}
                                                    </StyledFormField>
                                                </Card>
                                                    <Card titulo="4º Informações adicionais">
                                                    <StyledFormField>
                                                        <label htmlFor='observacoes'>Observações</label>
                                                        <textarea  {...register('observacoes')} onChange={(e) => handleInputChange('observacoes',e.target.value)}/>
                                                    </StyledFormField>
                                                    </Card>
                                                </FormContainerRight>
                                        </FormContainer>
                                        </Form>
                                    </SoftStyledContent>
                                </SoftStyledContainer>
                                    
                                    </>
                            </>
                        )}
                        </Dialog.Portal>

                    </Dialog.Root>
                    <TableToolbarButton onClick={handleClickExport} style={{backgroundColor:'#ffffff', color: '#000', border:'0.5px solid #B8B8B8'}}>
                        <strong style={{fontWeight: 'lighter', display:'flex', alignItems:'center', justifyContent:'center', gap:'.25rem'}}> <Image src={Export} alt='' width={16} height={16} /> Exportar</strong>
                    </TableToolbarButton>      
                    <TableSplitButton>
                        <button className="primary-btn">
                            Filtrar por
                        </button>
                        <div className="dropdown-container">
                            <button className="secondary-btn">
                                <i className="fa-sharp fa-solid fa-chevron-down"></i>
                            </button>
                            <div className="dropdown-content">
                                <form>
                                    <label>content</label>
                                    <input type="text" placeholder="NF" onChange={(e) => handleSearchNF(e.target.value)}/>
                                    <input type="text" placeholder="ID SGP" onChange={(e) => handleSearchIdSGP(e.target.value)}/>
                                    <input type="text" placeholder="Pacote" onChange={(e) => handleSearchPacote(e.target.value)}/>
                                    <input type="text" placeholder="Software" onChange={(e) => handleSearchSoftwareUnique(e.target.value)}/>
                                    <input type="text" placeholder="Responsável" onChange={(e) => handleSearchResponsavel(e.target.value)}/>
                                    <input type="text" placeholder="Fornecedor" onChange={(e) => handleSearchFornecedor(e.target.value)}/>
                                </form>
                            </div>
                        </div>
                    </TableSplitButton>
                    <TableToolbarButtonIcon className={selectedItems.length === 1 ? 'active' : ''}>
                        {selectedItems.length === 1 
                            ? (
                                <>
                                <Dialog.Root>
                                    <Dialog.Trigger asChild>
                                        <Status24Filled onClick={() => setIsModalOpen(true)}/>
                                    </Dialog.Trigger>
                                    <Dialog.Portal>
                                            <StyledOverlay />
                                            <SoftStyledContainer>
                                    <SoftStyledContent>
                                    <Dialog.Close asChild>
                                        <button onClick={() => {
                                            setIsModalOpen(false)
                                            setSelectedItems([])
                                            reset()
                                            }
                                        }>X </button>
                                    </Dialog.Close>
                                    <Form onSubmit={handleSubmit(updateSoftware)}>
                                        <header>
                                            <p>Editar registro</p>
                                            <button type="submit" disabled={!isValid}>Enviar</button>
                                        </header>
                                        <FormContainer>
                                                <FormContainerLeft>
                                                    <Card titulo="1º Informações do software">
                                                        <StyledFormField>
                                                            <label htmlFor='id_sgp'>ID SGP</label>
                                                            <input type='text' {...register('id_sgp')} onChange={(e) => handleInputChange('id_sgp',e.target.value)} value={formData.id_sgp} />
                                                            {errors.id_sgp ? <span>{errors.id_sgp.message}</span> : <span style={{color: "transparent"}}>.</span>}
                                                        </StyledFormField>
                                                        <StyledFormField>
                                                            <label htmlFor='nf'>NF</label>
                                                            <input type='text' {...register('nf')} onChange={(e) => handleInputChange('nf',e.target.value)}  value={formData.nf}/>
                                                            {errors.nf ? <span>{errors.nf.message}</span> : <span style={{color: "transparent"}}>.</span>}
                                                        </StyledFormField>
                                                        <StyledFormField>
                                                            <label htmlFor='pacote'>Pacote</label>
                                                            <select {...register('pacote')} onChange={(e) => handleInputChange('pacote',e.target.value)} value={formData.pacote}>
                                                                <option>Selecione uma opção</option>
                                                                {pacotesUnicos.map((pacote, index) => (
                                                                    <option key={index}>{pacote}</option>
                                                                    ))}
                                                                <option value="outro">Outro</option>
                                                                </select>
                                                                {fieldStates.pacote.isOutro && (
                                                                    <input
                                                                    type='text'
                                                                    placeholder='Pacote'
                                                                    value={fieldStates.pacote.outroValue}
                                                                    onChange={(e) => handleOutroChange('pacote', e.target.value)}
                                                                    />
                                                                )}
                                                            {errors.pacote ? <span>{errors.pacote.message}</span> : <span style={{color: "transparent"}}>.</span>}
                                                        </StyledFormField>
                                                        <StyledFormField>
                                                            <label htmlFor='software'>Software</label>
                                                            <select {...register('software')} onChange={(e) => handleInputChange('software',e.target.value)} value={formData.software}>
                                                                <option>Selecione uma opção</option>
                                                                {softwaresUnicos.map((software, index) => (
                                                                    <option key={index}>{software}</option>
                                                                    ))}
                                                                <option value="outro">Outro</option>
                                                                </select>
                                                                {fieldStates.software.isOutro && (
                                                                    <input
                                                                    type='text'
                                                                    placeholder='Software'
                                                                    value={fieldStates.software.outroValue}
                                                                    onChange={(e) => handleOutroChange('software', e.target.value)}
                                                                    />
                                                                )}
                                                            {errors.software ? <span>{errors.software.message}</span> : <span style={{color: "transparent"}}>.</span>}

                                                        </StyledFormField>
                                                        <StyledFormField>
                                                            <label htmlFor='responsavel'>Responsável</label>
                                                            <select {...register('responsavel')} onChange={(e) => handleInputChange('responsavel',e.target.value)} value={formData.responsavel}>
                                                                <option>Selecione uma opção</option>
                                                                {responsaveisUnicos.map((responsavel, index) => (
                                                                    <option key={index}>{responsavel}</option>
                                                                    ))}
                                                                <option value="outro">Outro</option>
                                                                </select>
                                                                {fieldStates.responsavel.isOutro && (
                                                                    <input
                                                                    type='text'
                                                                    placeholder='Responsavel'
                                                                    value={fieldStates.responsavel.outroValue}
                                                                    onChange={(e) => handleOutroChange('responsavel', e.target.value)}
                                                                    />
                                                                )}
                                                            {errors.responsavel ? <span>{errors.responsavel.message}</span> : <span style={{color: "transparent"}}>.</span>}

                                                        </StyledFormField>
                                                        <StyledFormField>
                                                            <label htmlFor='fornecedor'>Fornecedor</label>
                                                            <input type='text' {...register('fornecedor')} onChange={(e) => handleInputChange('fornecedor',e.target.value)} value={formData.fornecedor}/>
                                                            {errors.fornecedor ? <span>{errors.fornecedor.message}</span> : <span style={{color: "transparent"}}>.</span>}

                                                        </StyledFormField>
                                                        <StyledFormField>
                                                            <label htmlFor='contato_do_fornecedor'>Contato do fornecedor</label>
                                                            <input type='text' {...register('contato_do_fornecedor')} onChange={(e) => handleInputChange('contato_do_fornecedor',e.target.value)} value={formData.contato_do_fornecedor} />
                                                            {errors.contato_do_fornecedor ? <span>{errors.contato_do_fornecedor.message}</span> : <span style={{color: "transparent"}}>.</span>}

                                                        </StyledFormField>
                                                        <StyledFormField>
                                                            <label htmlFor='centro_de_custo'>Centro de custo</label>
                                                            <input type='text' {...register('centro_de_custo')} onChange={(e) => handleInputChange('centro_de_custo',e.target.value)}  value={formData.centro_de_custo}/>
                                                            {errors.centro_de_custo ? <span>{errors.centro_de_custo.message}</span> : <span style={{color: "transparent"}}>.</span>}

                                                        </StyledFormField>
                                                        <StyledFormField>
                                                            <label htmlFor='categoria'>Categoria</label>
                                                            <select {...register('categoria')} onChange={(e) => handleInputChange('categoria',e.target.value)} value={formData.categoria}>
                                                                <option>Selecione uma opção</option>
                                                                {softwares.map((software: any) => (
                                                                    <option key={software.id}>{software.categoria}</option>
                                                                ))}
                                                                <option value="outro">Outro</option>
                                                                </select>
                                                                {fieldStates.categoria.isOutro && (
                                                                    <input
                                                                    type='text'
                                                                    placeholder='Categoria'
                                                                    value={fieldStates.categoria.outroValue}
                                                                    onChange={(e) => handleOutroChange('categoria', e.target.value)}
                                                                    />
                                                                )}
                                                            {errors.categoria ? <span>{errors.categoria.message}</span> : <span style={{color: "transparent"}}>.</span>}

                                                        </StyledFormField>
                                                    </Card>
                                                    <Card titulo="3º Periodicidade">
                                                        <StyledFormField>
                                                            <label htmlFor='tipo_de_licenca'>Tipo de licença</label>
                                                            <select {...register('tipo_de_licenca')} onChange={(e) => handleInputChange('tipo_de_licenca',e.target.value)} value={formData.tipo_de_licenca}>
                                                                <option>Selecione uma opção</option>
                                                                {tipoDeLicencaUnica.map((tipo_de_licenca, index) => (
                                                                    <option key={index}>{tipo_de_licenca}</option>
                                                                ))}
                                                                <option value="outro">Outro</option>
                                                                </select>
                                                                {fieldStates.tipo_de_licenca.isOutro && (
                                                                    <input
                                                                    type='text'
                                                                    placeholder='Tipo de licença'
                                                                    value={fieldStates.tipo_de_licenca.outroValue}
                                                                    onChange={(e) => handleOutroChange('tipo_de_licenca', e.target.value)}
                                                                    />
                                                                )}
                                                            {errors.tipo_de_licenca ? <span>{errors.tipo_de_licenca.message}</span> : <span style={{color: "transparent"}}>.</span>}

                                                        </StyledFormField>
                                                        <StyledFormField>
                                                            <label htmlFor='tipo_de_registro'>Tipo de registro</label>
                                                            <select {...register('tipo_de_registro')} onChange={(e) => handleInputChange('tipo_de_registro',e.target.value)} value={formData.tipo_de_registro}>
                                                                <option>Selecione uma opção</option>
                                                                {tipoDeRegistroUnica.map((tipo_de_registro, index) => (
                                                                    <option key={index}>{tipo_de_registro}</option>
                                                                ))}
                                                                <option value="outro">Outro</option>
                                                                </select>
                                                                {fieldStates.tipo_de_registro.isOutro && (
                                                                    <input
                                                                    type='text'
                                                                    placeholder='Tipo de registro'
                                                                    value={fieldStates.tipo_de_registro.outroValue}
                                                                    onChange={(e) => handleOutroChange('tipo_de_registro', e.target.value)}
                                                                    />
                                                                )}
                                                            {errors.tipo_de_registro ? <span>{errors.tipo_de_registro.message}</span> : <span style={{color: "transparent"}}>.</span>}

                                                        </StyledFormField>
                                                        <StyledFormField>
                                                            <label htmlFor='data_de_inicio'>Data de início</label>
                                                            <input type='date' {...register('data_de_inicio')} onChange={(e) => handleInputChange('data_de_inicio',e.target.value)} value={formData.data_de_inicio}/>
                                                            {errors.data_de_inicio ? <span>{errors.data_de_inicio.message}</span> : <span style={{color: "transparent"}}>.</span>}

                                                        </StyledFormField>
                                                        <StyledFormField>
                                                            <label htmlFor='data_de_termino'>Data de término</label>
                                                            <input type='date' {...register('data_de_termino')} onChange={(e) => handleInputChange('data_de_termino',e.target.value)} value={formData.data_de_termino}/>
                                                            {errors.data_de_termino ? <span>{errors.data_de_termino.message}</span> : <span style={{color: "transparent"}}>.</span>}
                                                        </StyledFormField>
                                                </Card>
                                                    
                                                </FormContainerLeft>
                                                <FormContainerRight>
                                                <Card titulo="2º Informações financeiras">
                                                    <StyledFormField>
                                                        <label htmlFor='forma_de_pagamento'>Forma de pagamento</label>
                                                        <select {...register('forma_de_pagamento')} onChange={(e) => handleInputChange('forma_de_pagamento',e.target.value)} value={formData.forma_de_pagamento}>
                                                                <option>Selecione uma opção</option>
                                                                {formasDePagamentoUnicas.map((forma_de_pagamento, index) => (
                                                                    <option key={index}>{forma_de_pagamento}</option>
                                                                ))}
                                                                <option value="outro">Outro</option>
                                                                </select>
                                                                {fieldStates.forma_de_pagamento.isOutro && (
                                                                    <input
                                                                    type='text'
                                                                    placeholder='Forma de pagamento'
                                                                    value={fieldStates.forma_de_pagamento.outroValue}
                                                                    onChange={(e) => handleOutroChange('forma_de_pagamento', e.target.value)}
                                                                    />
                                                                )}
                                                        {errors.forma_de_pagamento ? <span>{errors.forma_de_pagamento.message}</span> : <span style={{color: "transparent"}}>.</span>}

                                                    </StyledFormField>
                                                    <StyledFormField>
                                                        <label htmlFor='moeda_de_pagamento'>Moeda de Pagamento</label>
                                                        <select {...register('moeda_de_pagamento')} onChange={(e) => handleInputChange('moeda_de_pagamento',e.target.value)} value={formData.moeda_de_pagamento}>
                                                                <option>Selecione uma opção</option>
                                                                {moedaDePagamentoUnica.map((moeda_de_pagamento, index) => (
                                                                    <option key={index}>{moeda_de_pagamento}</option>
                                                                ))}
                                                                <option value="outro">Outro</option>
                                                                </select>
                                                                {fieldStates.moeda_de_pagamento.isOutro && (
                                                                    <input
                                                                    type='text'
                                                                    placeholder='Moeda de pagamento'
                                                                    value={fieldStates.moeda_de_pagamento.outroValue}
                                                                    onChange={(e) => handleOutroChange('moeda_de_pagamento', e.target.value)}
                                                                    />
                                                                )}
                                                        {errors.moeda_de_pagamento ? <span>{errors.moeda_de_pagamento.message}</span> : <span style={{color: "transparent"}}>.</span>}

                                                    </StyledFormField>
                                                    <StyledFormField>
                                                        <label htmlFor='valor_moeda_original'>Valor na moeda original</label>
                                                        <input type='number' {...register('valor_moeda_original')} onChange={(e) => handleInputChange('valor_moeda_original',e.target.value)} value={formData.valor_moeda_original}/>
                                                        {errors.valor_moeda_original ? <span>{errors.valor_moeda_original.message}</span> : <span style={{color: "transparent"}}>.</span>}

                                                    </StyledFormField>
                                                    <StyledFormField>
                                                        <label htmlFor='valor_reais'>Valor em reais</label>
                                                        <input type='number' {...register('valor_reais')} onChange={(e) => handleInputChange('valor_reais',e.target.value)} value={formData.valor_reais}/>
                                                        {errors.valor_reais ? <span>{errors.valor_reais.message}</span> : <span style={{color: "transparent"}}>.</span>}

                                                    </StyledFormField>
                                                    <StyledFormField>
                                                        <label htmlFor='quantidade'>Quantidade</label>
                                                        <input type='number' {...register('quantidade')} onChange={(e) => handleInputChange('quantidade',e.target.value)} value={formData.quantidade}/>
                                                        {errors.quantidade ? <span>{errors.quantidade.message}</span> : <span style={{color: "transparent"}}>.</span>}
                                                    </StyledFormField>
                                                </Card>
                                                    <Card titulo="4º Informações adicionais">
                                                    <StyledFormField>
                                                        <label htmlFor='observacoes'>Observações</label>
                                                        <textarea  {...register('observacoes')} onChange={(e) => handleInputChange('observacoes',e.target.value)}  value={formData.observacoes}/>
                                                    </StyledFormField>
                                                    </Card>
                                                </FormContainerRight>
                                        </FormContainer>
                                        </Form>
                                    </SoftStyledContent>
                                </SoftStyledContainer>
                                        </Dialog.Portal>
                                </Dialog.Root>
                                </>

                            ) : (
                                <Status24Regular />
                            ) }
                    </TableToolbarButtonIcon>
                    <TableToolbarButtonIcon className={selectedItems.length === 1 ? 'active' : ''}   >
                         {selectedItems.length === 1 
                            ? (
                               
                                <Delete24Filled  onClick={() => deleteSoftware(selectedItemID)}/>

                                ) : (
                                <Delete24Regular />
                            ) }
                    </TableToolbarButtonIcon>
                    
                </TableContentToolbarButtons>
                <div style={{display:'flex', alignItems:'center', gap:'1rem'}}>
                    <p id="response" style={{color:'#075c39', fontWeight:'500', padding:'.25rem', borderRadius:'6px', display:'flex', alignItems:'center', gap:'.2rem'}}></p>
                    <p style={{color:'#002f62',fontSize:'.9rem', fontWeight:'500', padding:'.25rem', borderRadius:'6px', display:'flex', alignItems:'center', gap:'.2rem'}}>
                        <strong style={{fontSize:'.9rem'}}>{filteredSoftwares.length}</strong>
                        {filteredSoftwares.length === 1 ? 'de' : 'de'}
                        <strong style={{fontSize:'.9rem'}}>{softwares.length}</strong>
                     </p>
                    <Input contentBefore={
                        <Search24Regular color="#B8B8B8"/>
                    } placeholder="Pesquisar" className="input" onChange={(e) => handleSearchSoftware(e.target.value)}/>
                </div>
            </TableContentToolbar>
            <Table>
                <Thead>
                    <tr>
                        {columns.map((column) => (
                            <th key={column}>{column}</th>
                        ))
                        }
                    </tr>
                </Thead>
                <Tbody>
                    {filteredSoftwares.map((software:any) => (
                                <tr key={software.id} onClick={() => handleSelectItem(software.id)} className={selectedItems.includes(software.id) ? 'selected' : ''}>
                                    <td>{software.id_sgp}</td>
                                    <td>{software.nf}</td>
                                    <td>{software.tipo_de_registro}</td>
                                    <td>{software.tipo_de_licenca}</td>
                                    <td>{software.pacote}</td>
                                    <td>{software.software}</td>
                                    <td>{software.categoria}</td>
                                    <td>{software.responsavel}</td>
                                    <td>{software.fornecedor}</td>
                                    <td>{software.contato_do_fornecedor}</td>
                                    <td>{software.centro_de_custo}</td>
                                    <td>{software.forma_de_pagamento}</td>
                                    <td>{software.moeda_de_pagamento}</td>
                                    <td>{software.moeda_de_pagamento === 'R$' ? formatMoney(software.valor_moeda_original) :  software.valor_moeda_original}</td>
                                    <td>{formatMoney(software.valor_reais)}</td>
                                    <td>{software.quantidade}</td>
                                    <td>{formatDate(software.data_de_inicio)}</td>
                                    <td>{formatDate(software.data_de_termino)}</td>
                                    <td>{software.observacoes}</td>
                                </tr>
                    ))}
                    
                </Tbody>
            </Table>
        </>
        )}
        </>
    )
}