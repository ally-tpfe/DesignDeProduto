import { styled } from "styled-components";

export const SidebarContainer = styled.div`
    min-width: 15.125rem;
    height: 100vh;
    
    background-color: #002F62;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    color: #FFF;

    transition: all .2s ease-in-out;

    &.closed{
        width: 4.33725rem;
        min-width: 4.33725rem;
        transition: all .2s ease-in-out;
        span,p,h1,h2,h3,a{
            transition: all .2s ease-in-out;

            font-size: 0;
        }

    }
    
`

export const SidebarContent = styled.div`
    width: 100%;
    height: 35rem;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    
    transition: all .2s ease-in-out;


    gap: 1rem;

    .close-sidebar{
        position: relative;
        left: 52%;
        background: transparent;

        display: flex;
        align-items: center;
        justify-content: flex-start;

        .right{
            position: relative;
            left: 30%;
            top:55%;
        }
    }
`
export const SidebarHeader = styled.header`
    width: 100%;
    height: auto;

    margin-top: 5rem;
    margin-bottom: 3rem;


    display: flex;
    align-items: center;
    justify-content: center;

    transition: all 1s ease-in-out;


    
`

export const SidebarUserDetails = styled.div`
    width: 70%;
    height: auto;
    padding: .5rem;
    border-radius: 10px;

    margin-bottom: 1rem;
    gap:.2rem;


    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content:flex-start;

    
    transition: all 1s ease-in-out;

    div{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }


    h1{
        color: #bce4fe;
        text-align: center;
        font-family: Segoe UI;
        font-size: 0.725rem;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
        transition: all .5s ease-in-out;

    }

    p{
        transition: all .5s ease-in-out;

        color: #bce4fe;
        text-align: center;
        font-family: Segoe UI;
        font-size: 0.625rem;
        font-style: normal;
        font-weight: 500;
        line-height: normal;

        opacity: 0.6000000238418579;
    }

    .closed{
        width: 70%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        transition: all .5s ease-in-out;
        
    }
`

export const SidebarNav = styled.nav`
    width: 100%;


    &.closed{
        li {
            .artefato-top{
                position: relative;
                left: 76%;
                top: -70%;
            }

            .artefato-bottom{
                position: relative;
                left: -3%;
                top: 73%;
            }
            p{
                justify-content: center;
            }
        }
    }


    ul{
        width: 100%;

        display: flex;
        align-items: flex-start;
        justify-content: center;
        flex-direction: column;

        list-style: none;



        li{
            width: 100%;
            height: 40px;

            background: transparent;

            display: flex;
            align-items: center;
            justify-content: center;
            padding-left: .5rem;

            
            p{
                width: 50%;
                display: flex;
                align-items: center;
                text-align: center;
                gap: .4rem;

            }

            &:hover {
                background: #134172;
                cursor: pointer;

            }

            &.active{
                background: #bce4fe;
                color:#002f62;
            }

            .artefato-top{
                position: relative;
                left: 75.5%;
                top: -70%;
            }

            .artefato-bottom{
                position: relative;
                left: 17%;
                top: 73%
            }
        }
    }

   
`

export const SidebarFooter = styled.footer`
    width: auto;
    height: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-bottom: 3.73rem;

    transition: all .5s ease-in-out;
    
    img{
        width: 95%;
        height: 95%;
    }

`

export const SidebarAvatar = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    object-fit: cover;
    object-position: center;

    transition: all .5s ease-in-out;

    .avatar{
        width:80px;
        height:80px;
        background-color:#dadae9;
        border-radius:50%;
        border: 2px solid #0067FF;
    }

    

    img{
        width: 100%;
        height: 100%;
        border-radius: 50%;
        transition: all .5s ease-in-out;
        object-fit: cover;
        object-position: center;
        border:1px solid #bce4fe;
        padding: .1rem;
    }
    
    
    &.closed{
        transition: all .5s ease-in-out;

        width: 2.94769rem;
        height: 2.96631rem;

        img{
            width: 100%;
            height: 100%;
        }

        .avatar{
            padding:1rem;
            width: 2.94769rem;
            height: 2.96631rem;

            svg{
                width: 50%;
                height: 50%;
            }
        }
    }
`