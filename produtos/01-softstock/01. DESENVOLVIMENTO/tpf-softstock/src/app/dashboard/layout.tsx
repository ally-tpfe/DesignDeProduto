'use client'

import React, { useEffect, useState } from "react";

import { 
    SidebarAvatar,
    SidebarContainer, 
    SidebarContent, 
    SidebarFooter, 
    SidebarHeader, 
    SidebarNav, 
    SidebarUserDetails 
} from "@/styles/sidebar";

// Next
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

// Images
import logoSoftstockCompleta from '@/assets/softstock/logo-softstock-completa.svg'
import logoSoftstockReduzida from '@/assets/softstock/logo-softstock-reduzida.svg'
import tpfLogoCompleta from '@/assets/tpf/logo-completa.svg'
import tpfLogoReduzida from '@/assets/tpf/logo-reduzida.svg'
import botaoSidebar from '@/assets/utils/botao-sidebar.svg'
import botaoSidebarRight from '@/assets/utils/botao-sidebar-right.svg'
import artefatoTop from '@/assets/utils/artefato-cima.svg'
import artefatoBottom from '@/assets/utils/artefato-baixo.svg'


// FuentUI 
import {  
    ShieldTask20Regular,  
    List20Regular, 
    SignOut20Regular,  
    People20Regular,
    ChartMultiple20Regular,  
    CommentAdd20Regular
} from "@fluentui/react-icons";

// Utils
import { formatText } from "@/utils/formatText";

// Styles
import { 
    TableContainer,
    TableContainerHeader,
    TableContent,
    TableToolbarButton, 
    } from "@/styles/table";

import { signOut, useSession } from "next-auth/react";
import { api } from "@/lib/axios";
import { Avatar } from "@fluentui/react-components";
import { ChaoticOrbit } from '@uiball/loaders'

interface UserData {
    name: string;
    email: string;
    image: string | undefined;
  }
  
interface Users {
    data: {
        data: UserData[]
    }
}



export default function DashboardLayout(
    { children }: {children: React.ReactNode}
){
    const [isLoading, setIsLoading] = useState(false)
    const [authorized, setAuthorized] = useState(false)
    const [open, setOpen] = useState(true);
    const router = useRouter()
    const tabela = usePathname()
    const abaAtiva = tabela.split('/').pop()
    const {data: session, status} = useSession()
    const imagem = session?.user?.image
    const authenticatedUser = session?.user

    useEffect(() => {
        setIsLoading(true);
      
        const handleAuthorization = async () => {
          const users: Users = await getUsers();
      
          let isUserAuthorized = false;
          if (Array.isArray(users.data)) {
            isUserAuthorized = users.data.some(
              (user: UserData) => user.email === authenticatedUser?.email
            );
          }
      
          setAuthorized(isUserAuthorized);
          setIsLoading(false);
        };
      
        if (authenticatedUser) {
          handleAuthorization();
        }

    }, [authenticatedUser]);

    function handleSideBar(){
        setOpen(!open);
    }


      
      
      
      async function getUsers(): Promise<Users> {
        let cachedUsers: Users | null = null;
      
        if (cachedUsers) {
          return cachedUsers;
        }
      
        const response = await api.get('/users', {
            headers: {
                'Authorization': `Bearer ${process.env.NEXTAUTH}`
            }
        });
        cachedUsers = response.data;
      
        return cachedUsers as Users;
      }
      
      
      
    
    function handleNav(table: string){
        router.push(`/dashboard/${table}`)
    }

    function handleLogout() {
        signOut({ callbackUrl: 'https://softstock.tpfe.com.br/' });
    }
    
    
    if (!isLoading && !authorized || !authorized){ 
        
        return ( 
            <div style={{display:'flex'}}>
            <div style={{
                width: '100vw',
                height: '100vh',
                position: 'fixed',
                backgroundColor: 'transparent',
                display: 'flex',
                zIndex: '9999',
                backdropFilter: 'blur(50px)',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <div style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', gap:'1rem'}}>
                    {status === 'unauthenticated' || status === 'authenticated' && !authorized && !isLoading ? (
                        <>
                            <p>Você não tem autorização de acesso ao Softstock ou não está aunteticado.</p>
                            <p>Entre em contato com o TI para mais informações.</p>
                            <TableToolbarButton onClick={() => handleLogout()}>Voltar</TableToolbarButton>
                        </>
                    ):
                        <ChaoticOrbit size={28} color="#002f62" />
                    }

                </div>
            </div>


            <SidebarContainer className={open ? '' : 'closed'}>
                <SidebarContent>
                    <SidebarHeader>
                        {
                            open ? <Image src={logoSoftstockCompleta} alt="" width={138} height={44}/> : <Image src={logoSoftstockReduzida} alt="" width={45.343} height={43.992}/>
                        }
                        
                    </SidebarHeader>
                    <SidebarUserDetails className={open ? '' : 'closed'} >
                        <SidebarAvatar className={open ? '' : 'closed'}>
                            {session?.user?.image === null ?
                                <Avatar size={72} className="avatar"/>
                                :
                                <Image src={imagem!} alt="" width={100} height={100}/>
                            }
                        </SidebarAvatar>
                        <div>
                            <h1>{session?.user?.name}</h1>
                            <p>{session?.user?.email}</p>
                        </div>
                    </SidebarUserDetails>
                    <SidebarNav className={open ? '' : 'closed'}>
                        <ul>
                            <li className={abaAtiva === 'softwares' ? 'active' : ''} onClick={() => handleNav('softwares')} >
                                {abaAtiva === 'softwares' && <Image src={artefatoTop} alt="" width={20} height={20} className="artefato-top"/>}
                                <p><List20Regular/>  Softwares</p>
                                {abaAtiva === 'softwares' && <Image src={artefatoBottom} alt="" width={20} height={20} className="artefato-bottom"/>}

                            </li>
                            <li className={abaAtiva === 'licenses' ? 'active' : ''} onClick={() => handleNav('licenses')} >
                                {abaAtiva === 'licenses' && <Image src={artefatoTop} alt="" width={20} height={20} className="artefato-top"/>}
                                <p><ShieldTask20Regular/>  Licenças</p>
                                {abaAtiva === 'licenses' && <Image src={artefatoBottom} alt="" width={20} height={20} className="artefato-bottom"/>}
                            </li>
                            <li className={abaAtiva === 'equipe' ? 'active' : ''} onClick={() => handleNav('equipe')}>
                            {abaAtiva === 'equipe' && <Image src={artefatoTop} alt="" width={20} height={20} className="artefato-top"/>}
                                <p><People20Regular /> Equipe</p>
                                {abaAtiva === 'equipe' && <Image src={artefatoBottom} alt="" width={20} height={20} className="artefato-bottom"/>}
                            </li>
                            <li className={abaAtiva === 'feedback' ? 'active' : ''} onClick={() => router.push('/feedback')}>
                            {abaAtiva === 'feedback' && <Image src={artefatoTop} alt="" width={20} height={20} className="artefato-top"/>}
                                <p><CommentAdd20Regular /> Avalie a plataforma </p>
                                {abaAtiva === 'feedback' && <Image src={artefatoBottom} alt="" width={20} height={20} className="artefato-bottom"/>}
                            </li>
                            
                            <li onClick={() => handleLogout()}>

                                <p><SignOut20Regular/> Sair</p>
                            </li>
                        </ul>
                        
                    </SidebarNav>
                    <div onClick={handleSideBar} className="close-sidebar">
                        {
                            open ? <Image src={botaoSidebar} alt=""  /> : <Image src={botaoSidebarRight} alt="" className="right" />
                        }
                            
                    </div>
                </SidebarContent>
                
                <SidebarFooter>
                    {open ?
                        <Image 
                            src={tpfLogoCompleta}
                            alt=""
                            width={200}
                            height={35} 
                        />
                    :
                        <Image 
                            src={tpfLogoReduzida}
                            alt=""
                            width={200}
                            height={35} 
                        />
                    }
                </SidebarFooter>
            </SidebarContainer>
            <TableContainer>
                <TableContainerHeader style={{display:'flex', alignItems:'center', justifyContent:'space-between', paddingRight:'1rem'}}>
                    <h1>{formatText(tabela)}</h1>
                </TableContainerHeader>
                <TableContent>
                    {children}
                </TableContent>
            </TableContainer>
        </div>
        );
    }
    else{
        return(
            <div style={{display:'flex'}}>
                <SidebarContainer className={open ? '' : 'closed'}>
                    <SidebarContent>
                        <SidebarHeader>
                            {
                                open ? <Image src={logoSoftstockCompleta} alt="" width={138} height={44}/> : <Image src={logoSoftstockReduzida} alt="" width={45.343} height={43.992}/>
                            }
                            
                        </SidebarHeader>
                        <SidebarUserDetails className={open ? '' : 'closed'} >
                            <SidebarAvatar className={open ? '' : 'closed'}>
                                {session?.user?.image === null ?
                                    <Avatar size={72} className="avatar"/>
                                    :
                                    <Image src={imagem!} alt="" width={100} height={100}/>
                                }
                            </SidebarAvatar>
                            <div>
                                <h1>{session?.user?.name}</h1>
                                <p>{session?.user?.email}</p>
                            </div>
                        </SidebarUserDetails>
                        <SidebarNav className={open ? '' : 'closed'}>
                            <ul>
                                <li className={abaAtiva === 'softwares' ? 'active' : ''} onClick={() => handleNav('softwares')} >
                                    {abaAtiva === 'softwares' && <Image src={artefatoTop} alt="" width={20} height={20} className="artefato-top"/>}
                                    <p><List20Regular/>  Softwares</p>
                                    {abaAtiva === 'softwares' && <Image src={artefatoBottom} alt="" width={20} height={20} className="artefato-bottom"/>}
    
                                </li>
                                <li className={abaAtiva === 'licenses' ? 'active' : ''} onClick={() => handleNav('licenses')} >
                                    {abaAtiva === 'licenses' && <Image src={artefatoTop} alt="" width={20} height={20} className="artefato-top"/>}
                                    <p><ShieldTask20Regular/>  Licenças</p>
                                    {abaAtiva === 'licenses' && <Image src={artefatoBottom} alt="" width={20} height={20} className="artefato-bottom"/>}
                                </li>
                                {/* <li className={abaAtiva === 'panels' ? 'active' : ''} onClick={() => handleNav('panels')}>
                                    {abaAtiva === 'panels' && <Image src={artefatoTop} alt="" width={20} height={20} className="artefato-top"/>}
                                    <p><ContentView20Regular /> Painéis</p>
                                    {abaAtiva === 'panels' && <Image src={artefatoBottom} alt="" width={20} height={20} className="artefato-bottom"/>}
                                </li> */}
                                <li className={abaAtiva === 'equipe' ? 'active' : ''} onClick={() => handleNav('equipe')}>
                                {abaAtiva === 'equipe' && <Image src={artefatoTop} alt="" width={20} height={20} className="artefato-top"/>}
                                    <p><People20Regular /> Equipe</p>
                                    {abaAtiva === 'equipe' && <Image src={artefatoBottom} alt="" width={20} height={20} className="artefato-bottom"/>}
                                </li>
                                <li className={abaAtiva === 'dashboard' ? 'active' : ''} onClick={() => router.push('/dashboard')}>
                                {abaAtiva === 'dashboard' && <Image src={artefatoTop} alt="" width={20} height={20} className="artefato-top"/>}
                                    <p><ChartMultiple20Regular /> BI</p>
                                    {abaAtiva === 'dashboard' && <Image src={artefatoBottom} alt="" width={20} height={20} className="artefato-bottom"/>}
                                </li>
                                <li onClick={() => handleLogout()}>
    
                                    <p><SignOut20Regular/> Sair</p>
                                </li>
                            </ul>
                            
                        </SidebarNav>
                        <div onClick={handleSideBar} className="close-sidebar">
                            {
                                open ? <Image src={botaoSidebar} alt=""  /> : <Image src={botaoSidebarRight} alt="" className="right" />
                            }
                                
                        </div>
                    </SidebarContent>
                    
                    <SidebarFooter>
                        {open ?
                        <div style={{display:'flex',flexDirection:'column', alignItems:'center', justifyContent:'center', margin:'auto', gap:'3rem'}}>
                            <Image 
                                src={tpfLogoCompleta}
                                alt=""
                                width={200}
                                height={35} 
                            />
                            <p style={{cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:'.5rem'}} onClick={() => router.push('/dashboard/feedback')}><CommentAdd20Regular /><span style={{
                                fontSize:'.9rem', 
                                fontWeight:'semibold', 
                                textAlign:'left',
                                overflow: 'hidden',
                                whiteSpace: 'nowrap',
                                textOverflow: 'ellipsis',
                                }}> Avalie a plataforma </span></p>
                            </div>
                        :
                            <div style={{display:'flex',flexDirection:'column', alignItems:'center', justifyContent:'center', margin:'auto', gap:'3rem'}} >
                            <Image 
                                src={tpfLogoReduzida}
                                alt=""
                                width={200}
                                height={35} 
                            />
                            <p onClick={() => router.push('/dashboard/feedback')}><CommentAdd20Regular /></p>
                            </div>
                        }
                    </SidebarFooter>
                </SidebarContainer>
                <TableContainer>
                    <TableContainerHeader style={{display:'flex', alignItems:'center', justifyContent:'space-between', paddingRight:'1rem'}}>
                        <h1>{formatText(tabela)}</h1>
                    </TableContainerHeader>
                    <TableContent>
                        {children}
                    </TableContent>
                </TableContainer>
            </div>
        )
    }

    
}

  
   
    
    

