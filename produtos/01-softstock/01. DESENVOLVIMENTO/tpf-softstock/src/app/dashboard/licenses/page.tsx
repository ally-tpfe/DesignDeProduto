'use client'
import { api } from "@/lib/axios";
import { Table, TableContentToolbar, TableContentToolbarButtons, TableSplitButton, TableToolbarButton, TableToolbarButtonIcon, Tbody, Thead } from "@/styles/table";
import { Input } from "@fluentui/react-components";
import { ArrowExportLtr16Filled, ArrowExportLtr24Filled, Delete24Filled, Delete24Regular, Search24Regular, Status24Filled, Status24Regular } from "@fluentui/react-icons";
import Link from "next/link";
import { useParams, useSelectedLayoutSegment } from "next/navigation";
import * as Dialog from '@radix-ui/react-dialog';
import { SoftStyledContainer, SoftStyledContent, StyledOverlay } from "@/styles/modal";
import { Form, FormContainer, StyledFormField } from "../softwares/components/form/styledForm";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { string, z } from "zod";
import { useRouter } from "next/navigation";
import Card from "../softwares/components/form/FormCard";
import { useEffect, useState } from "react";
import TableIsLoading from "@/utils/TableIsLoading";
import { useSession } from "next-auth/react";
import { v4 as uuidv4, v5 as uuidv5 } from 'uuid';
import { get } from "http";

import Plus from '@/assets/icons/mais.svg'
import Export from '@/assets/icons/export.svg'
import Image from "next/image";

const columns = [
    'SOFTWARE',
    'CATEGORIA',
    'CHAVE',
    'USUÁRIO',
    'GERENTE',
    'PRODUTO/EQUIPE',
    'OBSERVAÇÕES'
]


const licenseFormSchema = z.object({
    id: z.string().optional(),
    software: z.string().nonempty({ message: 'Campo obrigatório' }),
    categoria: z.string().nonempty({ message: 'Campo obrigatório' }),
    chave: z.string().nonempty({ message: 'Campo obrigatório' }),
    usuario: z.string().nonempty({ message: 'Campo obrigatório' }),
    gerente: z.string().nonempty({ message: 'Campo obrigatório' }),
    produto: z.string().nonempty({ message: 'Campo obrigatório' }),
    observacoes: z.string().optional(),
})

type LicenseFormData = z.infer<typeof licenseFormSchema>

interface FieldState {
  isOutro: boolean;
  outroValue: string;
}

interface FieldStates {
  software: FieldState;
  categoria: FieldState;
  usuario: FieldState;
  gerente: FieldState;
  produto: FieldState;

}

export default function TableContent(){
    const [isLoading, setIsLoading] = useState(false)
    const [licenses, setLicenses] = useState<LicenseFormData[]>([])
    const [filteredLicenses, setFilteredLicenses] = useState<LicenseFormData[]>([])
    const [selectedItems, setSelectedItems] = useState<string[]>([])
    const [isModalOpen, setIsModalOpen] = useState(false);

    const {data: session, status} = useSession()
    const accessToken = (session?.user as { accessToken?: string })?.accessToken;

    let selectedItemID = selectedItems[0];
    let selectedItem = licenses.find((item) => item.id === selectedItemID);

    const [formData, setFormData] = useState({
        software: "",
        categoria:"",
        usuario:"Não atribuído",
        gerente:"Não atribuído",
        produto:"Não atribuído",
        chave: "",
        observacoes: "",
    });

    useEffect(() => {
        selectedItemID = selectedItems[0];
        selectedItem = licenses.find((item) => item.id === selectedItemID);
        if(isModalOpen){
            setFormData({
                software: selectedItem ? selectedItem.software : "",
                categoria: selectedItem ? selectedItem.categoria : "",
                usuario: selectedItem ? selectedItem.usuario : "Não atribuído",
                gerente: selectedItem ? selectedItem.gerente : "Não atribuído",
                produto: selectedItem ? selectedItem.produto : "Não atribuído",
                chave: selectedItem ? selectedItem.chave : "",
                observacoes: selectedItem ? selectedItem.observacoes! : "",
            })
        }
    }, [isModalOpen, selectedItems])
    

    const router = useRouter()

    const [fieldStates, setFieldStates] = useState<FieldStates>({
        software: {
          isOutro: false,
          outroValue:'',
        },
        categoria: {
          isOutro: false,
          outroValue:'',

        },
        usuario: {
          isOutro: false,
          outroValue:'',

        },
        gerente: {
          isOutro: false,
          outroValue:'',

        },
        produto: {
          isOutro: false,
          outroValue:'',

        }
    });


   

    const handleInputChange = (fieldName: keyof FieldStates, value: string) => {
        setFormData((prevFormData) => ({
          ...prevFormData,
          [fieldName]: value,
        }));
    
        setFieldStates((prevStates) => ({
          ...prevStates,
          [fieldName]: {
            ...prevStates[fieldName],
            isOutro: value === 'outro',
          },
        }));
    };
    
    const handleOutroChange = (fieldName: keyof FieldStates, value: string) => {
        setFieldStates((prevStates) => ({
          ...prevStates,
          [fieldName]: {
            ...prevStates[fieldName],
            outroValue: value,
          },
        }));
    };

    const handleChaveChange = (value: string) => {
        setFormData((prevFormData) => ({
          ...prevFormData,
          chave: value,
        }))
    }

    const handleObservacoesChange = (value: string) => {
        setFormData((prevFormData) => ({
          ...prevFormData,
          observacoes: value,
        }))
    }

    const softwaresUnicos = [...new Set(licenses.map((license) => license.software))];
    const categoriasUnicas = [...new Set(licenses.map((license) => license.categoria))];
    const usuariosUnicos = [...new Set(licenses.map((license) => license.usuario))];
    const gerentesUnicos = [...new Set(licenses.map((license) => license.gerente))];
    const produtosUnicos = [...new Set(licenses.map((license) => license.produto))];


    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<LicenseFormData>({
        defaultValues: {
            software:  formData.software,
            categoria: formData.categoria,
            usuario: formData.usuario,
            gerente: formData.gerente,
            produto: formData.produto,
            observacoes: formData.observacoes
        },
        resolver: zodResolver(licenseFormSchema)
    });
    
    useEffect(() => {
        setIsLoading(true)
        getLicenses();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    async function getLicenses(){
        try{
            const licenses = await api.get('database/licenses', {
                headers:{
                    Authorization: `Bearer ${accessToken}`
                }
            })
            setLicenses(licenses.data.data)
            setFilteredLicenses(licenses.data.data)
            setIsLoading(false)

        }catch (error){
            console.error('Error fetching users:', error);
            setIsLoading(false);
        }
    }


    async function handleFormData(data: LicenseFormData){
        const id = uuidv4()
        const response = await api.post('database/licenses', {
            id: selectedItemID,
            software: fieldStates.software.isOutro ? fieldStates.software.outroValue : data.software,
            categoria: fieldStates.categoria.isOutro ? fieldStates.categoria.outroValue : data.categoria,
            chave: data.chave,
            usuario: fieldStates.usuario.isOutro ? fieldStates.usuario.outroValue : data.usuario,
            gerente: fieldStates.gerente.isOutro? fieldStates.gerente.outroValue : data.gerente,
            produto: fieldStates.produto.isOutro ? fieldStates.produto.outroValue : data.produto,
            observacoes: data.observacoes
        }, {
            headers:{
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
                table: 'licenças',
                action: 'create',
                localizator: id,
                item: data.usuario
            })
        })
        console.log('enviado')
        setFormData({
            software: "",
            categoria:"",
            usuario:"Não atribuído",
            gerente:"Não atribuído",
            produto:"Não atribuído",
            chave: "",
            observacoes: "",
        })
        getLicenses();
        window.location.reload()
    }

    // Search

    function handleSearchLicenses(query:string){
        const trimmedQuery = query.trim().toLowerCase();
        if (licenses) {
          const filteredData = licenses.filter((license) => {
            const values = Object.values(license).map((value) => String(value).toLowerCase());
            return values.some((value) => value.includes(trimmedQuery));
          });
          setFilteredLicenses(filteredData);
        }
    }

    // Select

    const handleSelectItem = (panelId: string) => {
        setSelectedItems((prevSelectedItems) => {
          if (prevSelectedItems.includes(panelId)) {
            return prevSelectedItems.filter((id) => id !== panelId);
          } else {
            return [...prevSelectedItems, panelId];
          }
        });
      
      };
      
      
      
    // // selectedItemIndex é o índice do item selecionado no array
    // const selectedItemID = selectedItems[0]
    // // retrieve data from the selected item using selectedItemID
    // const selectedItem = licenses.find((item) => item.id === selectedItemID)

    // Updating item

    function updateLicense(newData: any){
        fetch('/api/database/licenses', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify({
                id: selectedItemID,
                software: fieldStates.software.isOutro ? fieldStates.software.outroValue :  formData.software,
                categoria: fieldStates.categoria.isOutro ? fieldStates.categoria.outroValue : formData.categoria,
                chave: formData.chave,
                usuario: fieldStates.usuario.isOutro ? fieldStates.usuario.outroValue : formData.usuario,
                gerente: fieldStates.gerente.isOutro? fieldStates.gerente.outroValue : formData.gerente,
                produto: fieldStates.produto.isOutro ? fieldStates.produto.outroValue : formData.produto ,
                observacoes: formData.observacoes
            })
        })
        .then(response => response.text()) 
        .then(text => console.log(text)) 
        .catch(error => console.error(error)) 
        fetch('/api/database/logs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: session?.user?.name,
                table: 'licenças',
                action: 'update',
                localizator: selectedItemID,
                item: selectedItem?.usuario
            })
        })
        window.location.reload()

    }

    // DELETE
    function deleteLicense(id: string){
        fetch('/api/database/licenses', {
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
                table: 'licenças',
                action: 'delete',
                localizator: selectedItemID,
                item: selectedItem?.usuario
            })
        })
        

        getLicenses();
        setSelectedItems([]);
        window.location.reload()

        
    }
    
    
    const handleClickExport = () => {
        const csvData = Object.keys(filteredLicenses[0]).join(';') + '\n' +
            filteredLicenses.map(row => Object.values(row).join(';')).join('\n');
    
        const blob = new Blob([`\uFEFF${csvData}`], { type: 'text/csv;charset=utf-8' });
        const url = window.URL.createObjectURL(blob);
    
        const link = document.createElement('a');
        link.href = url;
        link.download = 'softstock-licenças.csv';
        link.click();
    
        window.URL.revokeObjectURL(url);
    };
    
    return (
        <>
            {isLoading ?
             <TableIsLoading />
              : 
            
              <>
              <TableContentToolbar>
                  <TableContentToolbarButtons>
                  <Dialog.Root>
                      <Dialog.Trigger asChild>
                          <TableToolbarButton onClick={() => 
                          {
                            setFormData({
                                software: "",
                                categoria:"",
                                usuario:"Não atribuído",
                                gerente:"Não atribuído",
                                produto:"Não atribuído",
                                chave: "",
                                observacoes: "",
                            })
                            
                            }
                            
                        }><Image src={Plus} alt='' /> Adicionar novo</TableToolbarButton>
                      </Dialog.Trigger>
                      <Dialog.Portal>
                          <StyledOverlay />
                          <SoftStyledContainer style={{width: '50%'}}>
                              <SoftStyledContent>
                                  <Dialog.Close asChild>
                                      <button onClick={() => 
                                        setFormData({
                                            software: "",
                                            categoria:"",
                                            usuario:"Não atribuído",
                                            gerente:"Não atribuído",
                                            produto:"Não atribuído",
                                            chave: "",
                                            observacoes: "",
                                        })
                                    }>X</button>
                                  </Dialog.Close>
                                  <Form onSubmit={handleSubmit(handleFormData)}>
                                      <header>
                                          <p>Nova Licença</p>
                                          <button type="submit" disabled={!isValid}>Enviar</button>
                                      </header>
                                      <FormContainer style={{paddingTop: '3rem'}}>
                                      <Card titulo="Informações da licença">
                                      <StyledFormField>
                                        <label htmlFor='software'>Software</label>
                                                <select
                                                    {...register('software')}
                                                    onChange={(e) => handleInputChange('software', e.target.value)}
                                                    value={formData.software}
                                                >
                                                    <option value="outro">Outro</option>
                                                    {softwaresUnicos.map((software, index) => (
                                                        <option key={index}>{software}</option>
                                                        ))}
                                                </select>
                                                {fieldStates.software.isOutro && (
                                                    <input
                                                    type='text'
                                                    placeholder='Software'
                                                    value={fieldStates.software.outroValue}
                                                    onChange={(e) => handleOutroChange('software', e.target.value)}
                                                    />
                                                )}
                                                {errors.software && <span>{errors.software.message}</span>}
                                        </StyledFormField>

                                              <StyledFormField>
                                                  <label htmlFor='categoria'>Categoria</label>
                                                  <select {...register('categoria')} onChange={(e) => handleInputChange('categoria',e.target.value)} value={formData.categoria}>
                                                      <option value="outro">Outro</option>
                                                        {categoriasUnicas.map((categoria, index) => (
                                                            <option key={index}>{categoria}</option>
                                                            ))}
                                                        </select>
                                                        {fieldStates.categoria.isOutro && (
                                                            <input
                                                            type='text'
                                                            placeholder='Categoria'
                                                            value={fieldStates.categoria.outroValue}
                                                            onChange={(e) => handleOutroChange('categoria', e.target.value)}
                                                            />
                                                        )}
                                                  {errors.categoria && <span>{errors.categoria.message}</span>}
                                              </StyledFormField>
                                              <StyledFormField>
                                                  <label htmlFor='chave'>Chave</label>
                                                  <input type='text' {...register('chave')} onChange={(e) => handleChaveChange(e.target.value)}  value={formData.chave}/>
                                                  {errors.chave && <span>{errors.chave.message}</span>}
                                              </StyledFormField>
                                              <StyledFormField>
                                                  <label htmlFor='usuario'>Usuario</label>
                                                  <select {...register('usuario')} onChange={(e) => handleInputChange('usuario',e.target.value)} value={formData.usuario}>
                                                      <option value="outro">Outro</option>
                                                      <option value="Não atribuído">Não atribuído</option>
                                                        {usuariosUnicos.map((usuario, index) => (
                                                            <option key={index}>{usuario}</option>
                                                            ))}
                                                        </select>
                                                        {fieldStates.usuario.isOutro && (
                                                            <input
                                                            type='text'
                                                            placeholder='Usuário'
                                                            value={fieldStates.usuario.outroValue}
                                                            onChange={(e) => handleOutroChange('usuario', e.target.value)}
                                                            />
                                                        )}
                                                  {errors.usuario && <span>{errors.usuario.message}</span>}
                                              </StyledFormField>
                                              <StyledFormField>
                                                  <label htmlFor='gerente'>Líder</label>
                                                  <select {...register('gerente')} onChange={(e) => handleInputChange('gerente',e.target.value)} value={formData.gerente}>
                                                        <option value="outro">Outro</option>
                                                        <option value="Não atribuído">Não atribuído</option>
                                                        {gerentesUnicos.map((gerente, index) => (
                                                            <option key={index}>{gerente}</option>
                                                            ))}
                                                        </select>
                                                        {fieldStates.gerente.isOutro && (
                                                            <input
                                                            type='text'
                                                            placeholder='Líder'
                                                            value={fieldStates.gerente.outroValue}
                                                            onChange={(e) => handleOutroChange('gerente', e.target.value)}
                                                            />
                                                        )}
                                                  {errors.gerente && <span>{errors.gerente.message}</span>}
                                              </StyledFormField>
                                              <StyledFormField>
                                                  <label htmlFor='produto'>Produto</label>
                                                  <select {...register('produto')} onChange={(e) => handleInputChange('produto',e.target.value)} value={formData.produto}>
                                                        <option value="outro">Outro</option>
                                                        <option value="Não atribuído">Não atribuído</option>
                                                        {produtosUnicos.map((produto, index) => (
                                                            <option key={index}>{produto}</option>
                                                            ))}
                                                        </select>
                                                        {fieldStates.produto.isOutro && (
                                                            <input
                                                            type='text'
                                                            placeholder='Produto'
                                                            value={fieldStates.produto.outroValue}
                                                            onChange={(e) => handleOutroChange('produto', e.target.value)}
                                                            />
                                                        )}
                                                  {errors.produto && <span>{errors.produto.message}</span>}
                                              </StyledFormField>
                                              <StyledFormField>
                                                        <label htmlFor='observacoes'>Observações</label>
                                                        <textarea  {...register('observacoes')} onChange={(e) => handleObservacoesChange(e.target.value)} value={formData.observacoes}/>
                                                </StyledFormField>
                                          </Card>
                                      </FormContainer>
                                  </Form>
                              </SoftStyledContent>
                          </SoftStyledContainer>
                      </Dialog.Portal>
                  </Dialog.Root>
                  <TableToolbarButton onClick={handleClickExport} style={{backgroundColor:'#f6f6f6', color: '#000', border:'0.5px solid #B8B8B8'}}>
                        <strong style={{fontWeight: 'lighter', display:'flex', alignItems:'center', justifyContent:'center', gap:'.25rem'}}> <Image src={Export} alt='' width={16} height={16} /> Exportar</strong>
                    </TableToolbarButton>      
                  <TableToolbarButtonIcon className={selectedItems.length === 1 ? 'active' : ''}>
                        {selectedItems.length === 1 
                            ? (
                                <>
                                <Dialog.Root>
                                    <Dialog.Trigger asChild>
                                        <Status24Filled onClick={()=> {
                                            setIsModalOpen(true)
                                            }}/>
                                    </Dialog.Trigger>
                                    <Dialog.Portal>
                                            <StyledOverlay />
                                            <SoftStyledContainer>
                                    <SoftStyledContent>
                                        <Dialog.Close asChild>
                                            <button 
                                                onClick={() => {
                                                    setIsModalOpen(false)
                                                    setSelectedItems([])
                                                    setFormData({
                                                        software: "",
                                                        categoria:"",
                                                        usuario:"Não atribuído",
                                                        gerente:"Não atribuído",
                                                        produto:"Não atribuído",
                                                        chave: "",
                                                        observacoes: "",
                                                    })
                                                    }}
                                                >
                                                X
                                            </button>
                                        </Dialog.Close>

                                    <Form onSubmit={handleSubmit(updateLicense)}>
                                        <header>
                                            <p>Editar registro</p>
                                            <button type="submit" disabled={!isValid}>Enviar</button>
                                        </header>
                                        <FormContainer>
                                            <Card titulo="Informações da licença">
                                            <StyledFormField>
                                        <label htmlFor='software'>Software</label>
                                                <select
                                                    {...register('software')}
                                                    onChange={(e) => handleInputChange('software', e.target.value)}
                                                    value={formData.software}
                                                >
                                                    <option value="outro">Outro</option>
                                                    <option value="Não atribuído">Não atribuído</option>
                                                    {softwaresUnicos.map((software, index) => (
                                                    <option key={index}>{software}</option>
                                                    ))}
                                                </select>
                                                {fieldStates.software.isOutro && (
                                                    <input
                                                    type='text'
                                                    placeholder='Software'
                                                    value={fieldStates.software.outroValue}
                                                    onChange={(e) => handleOutroChange('software', e.target.value)}
                                                    />
                                                )}
                                                {errors.software && <span>{errors.software.message}</span>}
                                        </StyledFormField>

                                              <StyledFormField>
                                                  <label htmlFor='categoria'>Categoria</label>
                                                  <select {...register('categoria')} onChange={(e) => handleInputChange('categoria',e.target.value)} value={formData.categoria}>
                                                        <option value="outro">Outro</option>
                                                        <option value="Não atribuído">Não atribuído</option>
                                                        {categoriasUnicas.map((categoria, index) => (
                                                            <option key={index}>{categoria}</option>
                                                            ))}
                                                        </select>
                                                        {fieldStates.categoria.isOutro && (
                                                            <input
                                                            type='text'
                                                            placeholder='Categoria'
                                                            value={fieldStates.categoria.outroValue}
                                                            onChange={(e) => handleOutroChange('categoria', e.target.value)}
                                                            />
                                                        )}
                                                  {errors.categoria && <span>{errors.categoria.message}</span>}
                                              </StyledFormField>
                                              <StyledFormField>
                                                  <label htmlFor='chave'>Chave</label>
                                                  <input type='text' {...register('chave')} onChange={(e) => handleChaveChange(e.target.value)} value={formData.chave}/>
                                                  {errors.chave && <span>{errors.chave.message}</span>}
                                              </StyledFormField>
                                              <StyledFormField>
                                                  <label htmlFor='usuario'>Usuario</label>
                                                  <select {...register('usuario')} onChange={(e) => handleInputChange('usuario',e.target.value)} value={formData.usuario}>
                                                        <option value="outro">Outro</option>
                                                        <option value="Não atribuído">Não atribuído</option>
                                                        {usuariosUnicos.map((usuario, index) => (
                                                            <option key={index}>{usuario}</option>
                                                            ))}
                                                        </select>
                                                        {fieldStates.usuario.isOutro && (
                                                            <input
                                                            type='text'
                                                            placeholder='Usuário'
                                                            value={fieldStates.usuario.outroValue}
                                                            onChange={(e) => handleOutroChange('usuario', e.target.value)}
                                                            />
                                                        )}
                                                  {errors.usuario && <span>{errors.usuario.message}</span>}
                                              </StyledFormField>
                                              <StyledFormField>
                                                  <label htmlFor='gerente'>Líder</label>
                                                  <select {...register('gerente')} onChange={(e) => handleInputChange('gerente',e.target.value)} value={formData.gerente}>
                                                        <option value="outro">Outro</option>
                                                        {gerentesUnicos.map((gerente, index) => (
                                                            <option key={index}>{gerente}</option>
                                                            ))}
                                                        </select>
                                                        {fieldStates.gerente.isOutro && (
                                                            <input
                                                            type='text'
                                                            placeholder='Líder'
                                                            value={fieldStates.gerente.outroValue}
                                                            onChange={(e) => handleOutroChange('gerente', e.target.value)}
                                                            />
                                                        )}
                                                  {errors.gerente && <span>{errors.gerente.message}</span>}
                                              </StyledFormField>
                                              <StyledFormField>
                                                  <label htmlFor='produto'>Produto</label>
                                                  <select {...register('produto')} onChange={(e) => handleInputChange('produto',e.target.value)} value={formData.produto}>
                                                        <option value="outro">Outro</option>
                                                        {produtosUnicos.map((produto, index) => (
                                                            <option key={index}>{produto}</option>
                                                            ))}
                                                        </select>
                                                        {fieldStates.produto.isOutro && (
                                                            <input
                                                            type='text'
                                                            placeholder='Produto'
                                                            value={fieldStates.produto.outroValue}
                                                            onChange={(e) => handleOutroChange('produto', e.target.value)}
                                                            />
                                                        )}
                                                  {errors.produto && <span>{errors.produto.message}</span>}
                                              </StyledFormField>
                                              <StyledFormField>
                                                        <label htmlFor='observacoes'>Observações</label>
                                                        <textarea  {...register('observacoes')} onChange={(e) => handleObservacoesChange(e.target.value)} value={formData.observacoes}/>
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
                                    
                                        <Delete24Filled onClick={() => deleteLicense(selectedItemID)} />

                                        ) : (
                                        <Delete24Regular />
                                    ) }
                    </TableToolbarButtonIcon>
                  </TableContentToolbarButtons>
                  
                  <div style={{display:'flex', alignItems:'center', gap:'1rem'}}>
                    <p style={{color:'#002f62',fontSize:'.9rem', fontWeight:'500', padding:'.3rem', borderRadius:'6px', display:'flex', alignItems:'center', gap:'.2rem'}}>
                        <strong style={{fontSize:'.9rem'}}>{filteredLicenses.length}</strong> 
                        de
                        <strong style={{fontSize:'.9rem'}}>{licenses.length}</strong> 
                    </p>
                    <Input contentBefore={
                        <Search24Regular color="#B8B8B8"/>
                    } placeholder="Pesquisar" className="input" onChange={(e) => handleSearchLicenses(e.target.value)}/>
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
                      {filteredLicenses.map((license:any) => (
                  <tr key={license.id} onClick={() => handleSelectItem(license.id)} className={selectedItems.includes(license.id) ? 'selected' : '' } >
                      <td>{license.software}</td>
                      <td>{license.categoria}</td>
                      <td>{license.chave}</td>
                      <td>{license.usuario}</td>
                      <td>{license.gerente}</td>
                      <td>{license.produto}</td>
                      <td>{license.observacoes}</td>
                  </tr>
                  ))}
                  </Tbody>
              </Table>
            </>
            
            }
            
        </>
    )
    
}