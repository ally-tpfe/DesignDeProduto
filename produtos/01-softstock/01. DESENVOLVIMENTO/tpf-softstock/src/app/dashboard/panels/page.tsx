'use client'
import { api } from "@/lib/axios";
import { Table, TableContentToolbar, TableContentToolbarButtons, TableToolbarButton, TableToolbarButtonIcon, Tbody, Thead } from "@/styles/table";
import { Input } from "@fluentui/react-components";
import { Delete24Filled, Delete24Regular, Search24Regular, Status24Filled, Status24Regular } from "@fluentui/react-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import * as Dialog from '@radix-ui/react-dialog';
import { SoftStyledContainer, SoftStyledContent, StyledOverlay } from "@/styles/modal";
import { Form, FormContainer, StyledFormField } from "../softwares/components/form/styledForm";
import Card from "../softwares/components/form/FormCard";
import Image from "next/image";
import Check from '@/assets/utils/check.svg'
import { useEffect, useState } from "react";
import TableIsLoading from "@/utils/TableIsLoading";
import { useSession } from "next-auth/react";
import { v4 as uuidv4, v5 as uuidv5 } from 'uuid';


const columns = [
    'SOFTWARE',
    'FORNECEDOR',
    'PLATAFORMA',
    'USUÁRIO',
    'SENHA',
]

const panelsFormSchema = z.object({
    id: z.string().optional(),
    software: z.string().min(1,{ message: 'Campo obrigatório' }),
    fornecedor: z.string().min(1,{ message: 'Campo obrigatório' }),
    plataforma: z.string().min(1,{ message: 'Campo obrigatório' }),
    usuario: z.string().min(1,{ message: 'Campo obrigatório' }),
    senha: z.string().min(1,{ message: 'Campo obrigatório' }),
})

type PanelFormData = z.infer<typeof panelsFormSchema>



export default function TableContent(){
    const [isLoading, setIsLoading] = useState(false)
    const [panels, setPanels] = useState<PanelFormData[]>([])

    const [software, setSoftware] = useState('');
    const [isSoftwareOutro, setIsSoftwareOutro] = useState(false);
    
    const [filteredPanels, setFilteredPanels] = useState<PanelFormData[]>([])
    const [selectedItems, setSelectedItems] = useState<string[]>([])
    const {data: session, status} = useSession()
    const accessToken = (session?.user as { accessToken?: string })?.accessToken;

    const [formState, setFormState] = useState({
        software: 'Selecione uma opção',
        fornecedor: '',
        plataforma: '',
        usuario: '',
        senha: '',
    })

    const { 
        register,
        handleSubmit,
        formState: { errors, isValid, isSubmitSuccessful },
        watch
    } = useForm<PanelFormData>({
        resolver: zodResolver(panelsFormSchema)
    })

    useEffect(() => {
        setIsLoading(true)
        getPanels();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    async function getPanels(){
        try{
            const panels = await api.get('database/panels',{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                }
            }
            )
            setPanels(panels.data.data)
            setFilteredPanels(panels.data.data)
            setIsLoading(false)

        } catch(error){
            console.error('Error fetching users:', error);
            setIsLoading(false);
        }
    }

    function handleSearchPanel(query: string) {
        setFilteredPanels(
          panels.filter((panel: any) =>
            Object.values(panel).some((value: any) =>
              String(value).toLowerCase().includes(query.toLowerCase())
            )
          )
        );
    }
      


    async function handleFormData(data: PanelFormData){
        const id = uuidv4()
        const response = await api.post('database/panels', {...data, id: id}, {
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        }).catch(error => console.error(error))
        fetch('/api/database/logs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`

            },
            body: JSON.stringify({
                user: session?.user?.name,
                table: 'painel',
                action: 'create',
                localizator: id,
                item: data.plataforma
            })
        })
        console.log('enviado')
        getPanels();
        
    }

    // Select

    const handleSelectItem = (panelId: string) => {
        setSelectedItems((prevSelectedItems) => {
            if (prevSelectedItems.includes(panelId)) {
                // Deselect the currently selected item
                return prevSelectedItems.filter((id) => id !== panelId);
            } else {
                // Select the new item and deselect the currently selected item
                return [panelId];
            }
        });
    };
    const selectedItemID: string | undefined = selectedItems[0];
    const selectedItem: PanelFormData | undefined = panels.find((item) => item.id === selectedItemID);  

    // Updating item

    function updatePanel(newData: any){
        fetch('/api/database/panels', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify({
                ...newData,
                id: selectedItemID 
            })
        })
        .then(response => response.text()) 
        .then(text => console.log(text)) 
        .catch(error => console.error(error))
        fetch('/api/database/logs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify({
                user: session?.user?.name,
                table: 'painel',
                action: 'update',
                localizator: selectedItemID, 
                item: newData.plataforma
            })
        })
        getPanels();
    }

    // create a delete function for selectedItems
    function deletePanel(id: string){
        fetch('/api/database/panels', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify({
                id: selectedItemID 
            })
        })
        .then(response => response.text()) 
        .then(text => console.log(text)) 
        .catch(error => console.error(error))
        
        fetch('/api/database/logs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify({
                user: session?.user?.name,
                table: 'painel',
                action: 'delete',
                localizator: selectedItemID,
                item: selectedItem?.plataforma
            })
        })

        getPanels();

        
    }

    // const handleSoftwareChange = (value: string) => {
    //     setFormState((prevForm) => ({
    //       ...prevForm,
    //       [software]: value,
    //     }))
    //     setIsSoftwareOutro(value === 'outro');
    // };
    // const handleOutroSoftwareChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     setFormState((prevForm) => ({
    //         ...prevForm,
    //         software: event.target.value,
    //       }))
    //     setSoftware(event.target.value);
    //  };

    //  const handleFornecedorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     setFormState((prevForm) => ({
    //         ...prevForm,
    //         fornecedor: event.target.value,
    //       }))
    //     setSoftware(event.target.value);
    //  };

     const handleChange = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
       console.log('Event:', event);
       console.log('Form state before:', formState);
     
       setFormState((prevForm) => ({
         ...prevForm,
         [event.target.name]: event.target.value,
       }));
     
       console.log('Form state after:', formState);
     }
     



    const softwaresUnicos = [...new Set(panels.map((panel) => panel.software))];
    const fornecedoresUnicos = [...new Set(panels.map((panel) => panel.fornecedor))];

    if(isLoading){
        return <TableIsLoading />
    }else {
        return (
            <>
                <>
                    <TableContentToolbar>
                        <TableContentToolbarButtons>
                            <Dialog.Root>
                            <Dialog.Trigger asChild>
                                <TableToolbarButton disabled style={{backgroundColor:'#d40404c8', width:'20rem', cursor:'not-allowed'}}>Módulo em manudenção</TableToolbarButton>
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
                                <SoftStyledContainer style={{width: '50%'}}>
                                    <SoftStyledContent>
                                        <Dialog.Close asChild>
                                            <button>X</button>
                                        </Dialog.Close>
                                        <Form onSubmit={handleSubmit(handleFormData)} >
                                            <header>
                                                <p>Novo painel</p>
                                                <button type="submit" disabled={!isValid}>Enviar</button>
                                            </header>
                                            <FormContainer style={{paddingTop: '3rem'}}>
                                            <Card titulo="Credenciais do painel">
                                                    <StyledFormField>
                                                        <label htmlFor='software'>Software</label>
                                                        <select {...register('software')} onChange={(e) => {
                                                            handleChange(e)
                                                            setIsSoftwareOutro(true)
                                                            }} value={formState.software}>
                                                            {softwaresUnicos.map((software, index) => (
                                                                <option key={index}>{software}</option>
                                                                ))}
                                                            <option value="outro">Outro</option>
                                                            </select>
                                                            {isSoftwareOutro && (
                                                             <input type="text" {...register('software')} placeholder="Software" onChange={(e) => handleChange(e)} value={formState.software}/>
                                                            )}
                                                        {errors.software ? <span>{errors.software.message}</span> : <span style={{color: "transparent"}}>.</span>}
                                                    </StyledFormField>
                                                    <StyledFormField>
                                                        <label htmlFor='fornecedor'>Fornecedor</label>
                                                        <input type='text' {...register('fornecedor')} onChange={(e) => handleChange(e)} />
                                                        {errors.fornecedor ? <span>{errors.fornecedor.message}</span> : <span style={{color: "transparent"}}>.</span>}
                                                    </StyledFormField>
                                                    <StyledFormField>
                                                        <label htmlFor='plataforma'>Plataforma</label>
                                                        <input type='text' {...register('plataforma')} value={formState.plataforma} onChange={(e) => handleChange(e)}/>
                                                        {errors.plataforma ? <span>{errors.plataforma.message}</span> : <span style={{color: "transparent"}}>.</span>}
                                                    </StyledFormField>
                                                    <StyledFormField>
                                                        <label htmlFor='usuario'>Usuário</label>
                                                        <input type='text' {...register('usuario')} value={formState.usuario} onChange={(e) => handleChange(e)}/>
                                                        {errors.usuario ? <span>{errors.usuario.message}</span> : <span style={{color: "transparent"}}>.</span>}
                                                    </StyledFormField>
                                                    <StyledFormField>
                                                        <label htmlFor='senha'>Senha</label>
                                                        <input type='text' {...register('senha')}  value={formState.senha}  onChange={(e) => handleChange(e)}/>
                                                    </StyledFormField>
                                            </Card>
                                            </FormContainer>
                                        </Form>
                                    </SoftStyledContent>
                                </SoftStyledContainer>
                                )}
                            </Dialog.Portal>
                        </Dialog.Root>
                        <TableToolbarButtonIcon className={selectedItems.length === 1 ? 'active' : ''}>
                        {selectedItems.length === 1 
                            ? (
                                <>
                                <Dialog.Root>
                                    <Dialog.Portal>
                                            <StyledOverlay />
                                            <SoftStyledContainer>
                                    <SoftStyledContent>
                                    <Dialog.Close asChild>
                                        <button>X </button>
                                    </Dialog.Close>
                                    <Form onSubmit={handleSubmit(updatePanel)}>
                                        <header>
                                            <p>Editar registro</p>
                                            <button type="submit" disabled={!isValid}>Enviar</button>
                                        </header>
                                        <FormContainer>
                                        <Card titulo="Credenciais do painel">
                                        <StyledFormField>
                                                        <label htmlFor='software'>Software</label>
                                                        <select {...register('software')} onChange={(e) => {
                                                            if(!isSoftwareOutro){
                                                                handleChange(e)
                                                                setIsSoftwareOutro(true)
                                                            }
                                                            
                                                            }} value={selectedItem?.software}>
                                                            {softwaresUnicos.map((software, index) => (
                                                                <option key={index}>{software}</option>
                                                                ))}
                                                            <option value="outro">Outro</option>
                                                            </select>
                                                            {isSoftwareOutro && (
                                                            
                                                            <input type="text" {...register('software')} placeholder="Software" onChange={(e) => {handleChange(e); setIsSoftwareOutro(true)} } value={selectedItem?.software}/>
                                                            )}
                                                        {errors.software ? <span>{errors.software.message}</span> : <span style={{color: "transparent"}}>.</span>}
                                                    </StyledFormField>
                                                    <StyledFormField>
                                                        <label htmlFor='fornecedor'>Fornecedor</label>
                                                        <input type='text' {...register('fornecedor')} onChange={(e) => handleChange(e)} value={selectedItem?.fornecedor}/>
                                                        {errors.fornecedor ? <span>{errors.fornecedor.message}</span> : <span style={{color: "transparent"}}>.</span>}
                                                    </StyledFormField>
                                                    <StyledFormField>
                                                        <label htmlFor='plataforma'>Plataforma</label>
                                                        <input type='text' {...register('plataforma')} value={formState.plataforma} onChange={(e) => handleChange(e)}/>
                                                        {errors.plataforma ? <span>{errors.plataforma.message}</span> : <span style={{color: "transparent"}}>.</span>}
                                                    </StyledFormField>
                                                    <StyledFormField>
                                                        <label htmlFor='usuario'>Usuário</label>
                                                        <input type='text' {...register('usuario')} value={formState.usuario} onChange={(e) => handleChange(e)}/>
                                                        {errors.usuario ? <span>{errors.usuario.message}</span> : <span style={{color: "transparent"}}>.</span>}
                                                    </StyledFormField>
                                                    <StyledFormField>
                                                        <label htmlFor='senha'>Senha</label>
                                                        <input type='text' {...register('senha')}  value={formState.senha}  onChange={(e) => handleChange(e)}/>
                                                    </StyledFormField>
                                            </Card>
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
                            <TableToolbarButtonIcon className={selectedItems.length === 1 ? 'active' : ''}>
                                {selectedItems.length === 1 
                                    ? (
                                    
                                        <></>
                                        
                                        ) : (
                                            <Delete24Regular />
                                    ) }
                            </TableToolbarButtonIcon>
                        </TableContentToolbarButtons>
                        <div style={{display:'flex', alignItems:'center', gap:'1rem'}}>
                            <p style={{color:'#002f62', fontWeight:'500', padding:'.3rem', borderRadius:'6px', display:'flex', alignItems:'center', gap:'.2rem'}}>
                                <strong>{filteredPanels.length}</strong> 
                                {filteredPanels.length === 1 ? 'registro' : 'registros'} 
                            </p>
                            <Input contentBefore={
                                <Search24Regular color="#B8B8B8"/>
                            } placeholder="Pesquisar" className="input" onChange={(e) => handleSearchPanel(e.target.value) }/>
                        </div>
                    </TableContentToolbar>
                    <Table style={{minWidth:'100%'}}>
                        <Thead>
                            <tr>
                                {columns.map((column) => (
                                    <th key={column}>{column}</th>
                                ))
                                }
                            </tr>
                        </Thead>
                        <Tbody>
                            {filteredPanels.map((panel: any) => (
                                <tr key={panel.id} onClick={() => handleSelectItem(panel.id)} className={selectedItemID === panel.id ? 'selected' : ''}>
                                    <td>{panel.software}</td>
                                    <td>{panel.fornecedor}</td>
                                    <td>{panel.plataforma}</td>
                                    <td>{panel.usuario}</td>
                                    <td>{panel.senha}</td>
                                </tr>
                            ))}
                        </Tbody>
                    </Table>
                </>
            </>
        )
    }
    
    

    
}