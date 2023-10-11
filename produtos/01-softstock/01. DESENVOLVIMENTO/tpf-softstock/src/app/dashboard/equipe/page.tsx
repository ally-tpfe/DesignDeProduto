'use client'
import { api } from "@/lib/axios";
import { SoftStyledContainer, SoftStyledContent, StyledOverlay } from "@/styles/modal";
import { Table, TableContentToolbar, TableContentToolbarButtons, TableToolbarButton, TableToolbarButtonIcon, Tbody, Thead } from "@/styles/table";
import { Input } from "@fluentui/react-components";
import { Delete24Filled, Delete24Regular, Search24Regular } from "@fluentui/react-icons";
import * as Dialog from '@radix-ui/react-dialog';
import { useForm } from "react-hook-form";
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { HashLoader } from "react-spinners";
import { Form, FormContainer, StyledFormField } from "../softwares/components/form/styledForm";
import Card from "../softwares/components/form/FormCard";
import { useSession } from "next-auth/react";
import { v4 as uuidv4, v5 as uuidv5 } from 'uuid';


const userFormSchema = z.object({
    id: z.string().optional(),
    name: z.string().min(3, 'O nome deve ter no mínimo 3 caracteres'),
    email: z.string().email('Insira um e-mail válido'),
})
type UserFormSchema = z.infer<typeof userFormSchema>

interface User{
    id: number;
    name: string;
    email: string;
}





export default function TableContent(){
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [users, setUsers] = useState<User[]>([])
    const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
    const [selectedItems, setSelectedItems] = useState<string[]>([])
    const {data: session} = useSession()
    
    

    const router = useRouter()
    const { register, handleSubmit, formState : {isValid} } = useForm<UserFormSchema>({
        resolver: zodResolver(userFormSchema)
    })

    async function handleCreate(data: UserFormSchema){
        const id = uuidv4();
        await api.post('/users', {
            name: data.name,
            email: data.email,
            id: id,
        }, {
            headers:{
                Authorization: `Bearer ${(session?.user as { accessToken?: string })?.accessToken}`
            }
        })

        fetch('/api/database/logs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: session?.user?.name,
                table: 'users',
                action: 'create',
                localizator: id,
                item: data.email
            })
        })
    
        getUsers()
    }

    useEffect(() => {
        setIsLoading(true);
        getUsers();
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);
      

    async function getUsers() {
        try {
          const response = await api.get('/users', {
            headers:{
                Authorization: `Bearer ${(session?.user as { accessToken?: string })?.accessToken}`
            }
          });
          setUsers(response.data.data);
          setFilteredUsers(response.data.data);
          setIsLoading(false);
        } catch (error) {
          console.error('Error fetching users:', error);
          setIsLoading(false);
        }
    }

    function HandleSearchUsers(query: string) {
        const trimmedQuery = query.trim().toLowerCase();
        if (users) {
          const filteredData = users.filter((user) => {
            const values = Object.values(user).map((value) => String(value).toLowerCase());
            return values.some((value) => value.includes(trimmedQuery));
          });
          setFilteredUsers(filteredData);
        }
    }
    
    // SELECT

    const handleSelectItem = (panelId: string) => {
        setSelectedItems((prevSelectedItems) => {
          if (prevSelectedItems.includes(panelId)) {
            return prevSelectedItems.filter((id) => id !== panelId);
          } else {
            return [...prevSelectedItems, panelId];
          }
        });
    };

    // selectedItemIndex é o índice do item selecionado no array
    const selectedItemID = selectedItems[0]
    const selectedItem : any = users.find((item) => item.id.toString() === selectedItemID)

    
    // DELETE
    function deleteUser(id: string){
        fetch('/api/users', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${(session?.user as { accessToken?: string })?.accessToken}`
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
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: session?.user?.name,
                table: 'users',
                action: 'delete',
                localizator: selectedItemID,
                item: selectedItem?.email
            })
        })

        getUsers()
        
    }


    return(
        <>
            {isLoading? 
                <TableContentToolbar>
                    <div style={{display:'flex', alignItems:'center', justifyContent:'center', fontWeight:'700',fontSize:'1.3rem' ,color:'#002f62', gap:'1rem'}}>
                        <HashLoader size={35} color="#002f62" loading/>
                    </div>
                </TableContentToolbar>    
            : 
            <TableContentToolbar>
                <TableContentToolbarButtons>

                    <Dialog.Root>
                        <Dialog.Trigger asChild>
                            <TableToolbarButton>+ Adicionar novo</TableToolbarButton>
                        </Dialog.Trigger>
                        <Dialog.Portal>
                            <StyledOverlay />
                            <SoftStyledContainer style={{width:'50%'}}>
                            <SoftStyledContent>
                                    <Form action="" onSubmit={handleSubmit(handleCreate)}>
                                        <header>
                                            <p>Novo usuário</p>
                                            <button type="submit" disabled={!isValid}>Enviar</button>
                                        </header>
                                        <FormContainer>
                                        <Card titulo="Informações do usuário">
                                            <StyledFormField>
                                                <label htmlFor="name">Nome</label>
                                                <input 
                                                    type="text"
                                                    placeholder="Nome do usuário" 
                                                    {...register('name')}
                                                    required />
                                            </StyledFormField>
                                            
                                            <StyledFormField>
                                                <label htmlFor="email">E-mail</label>
                                                <input 
                                                    type="email" 
                                                    placeholder="E-mail do usuário" 
                                                    {...register('email')} 
                                                    required />
                                            </StyledFormField>
                                        </Card>
                                    </FormContainer>
                                    </Form>
                            </SoftStyledContent>
                            </SoftStyledContainer>
                        </Dialog.Portal>
                    </Dialog.Root>
                    <TableToolbarButtonIcon className={selectedItems.length === 1 ? 'active' : ''}>
                        {selectedItems.length === 1 
                            ? (
                            
                                <Delete24Filled onClick={() => deleteUser(selectedItemID)} />

                                ) : (
                                <Delete24Regular />
                            ) }
                    </TableToolbarButtonIcon>
                </TableContentToolbarButtons>
                <form>
                    <Input contentBefore={
                        <Search24Regular color="#B8B8B8"/>
                    } placeholder="Pesquisar" className="input" onChange={(e) => HandleSearchUsers(e.target.value)}/>
                </form>
            </TableContentToolbar>
            }
            <Table style={{minWidth:'800px'}}>
                <Thead>
                    {isLoading ? 
                        <tr>
                            <th></th>
                            <th></th>
                        </tr>
                    : 
                        <tr>
                            <th>Nome</th>
                            <th>Email</th>
                        </tr>
                    }
                    
                </Thead>
                <Tbody>
                {isLoading ? (
                        <tr>
                            <th></th>
                            <th></th>
                        </tr>
                        ) : (
                        filteredUsers.map((user: any) => (
                            <tr key={user.id} onClick={() => handleSelectItem(user.id)} className={selectedItems.includes(user.id) ? 'selected' : ''}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            </tr>
                        ))
                        )}
                </Tbody>
            </Table>
        </>
    )
}