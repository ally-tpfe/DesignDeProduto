import styled from 'styled-components'

export const LoginContainer = styled.div`
    width: 100%;
    height: 100vh;
    background-color: #00439c;

    overflow: hidden;

    @media(max-width: 1023px){
        background-color: #002f62 ;
        display:flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
        gap:1rem;

    }

`
export const LoginContent = styled.div`
    width: calc(100% - 1.6rem);
    height: 100%;
    margin-right:auto;
    background-color: #002f62;
    
    border-top-right-radius: 69px;
    
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    @media(max-width: 1023px){
        display:none;
    }
    
    

    .top{
        position: absolute;
        left: -8rem;
        top: 0;

        transition: all 0.8s ease-in-out;

        @media(max-width: 1200px){
            left: -8rem;
            top: 0;            
            position:fixed;
        }

        @media(max-width: 1130px){
            left: -16rem;
            top: -3;
            position:fixed;
        }

        @media(max-width: 1024px){
            left: -24rem;
            top: -6rem;
            position:fixed;
        }

        @media(max-width: 956px){
            display:none;
            position: fixed ;
        }

    }
    .bottom{
        position: absolute;
        bottom:0;
        right: 0;
        transition: all 0.8s ease-in-out;
        
        @media(max-width: 1200px){
            bottom: -3rem;
            right: -3rem;
            position:fixed;
        }

        @media(max-width: 1130px){
            bottom: -10rem;
            right: -10rem;
            position:fixed;
        }

        @media(max-width: 1024px){
            bottom: -15rem;
            right: -15rem;
            position:fixed;
        }

        @media(max-width: 956px){
            display:none;
            position: fixed ;
        }
    }

    footer{
        img{
            position: absolute;
            bottom: 0;
            left: 45%;
            margin-bottom: 3rem;

            @media(max-width: 1024px){
                left:43%
            }
        }
    }

    

`

export const Login = styled.div`
    width: 31.38463rem;
    height: 31.7515rem;
    flex-shrink: 0;

    border-radius: 35px;
    background: linear-gradient(180deg, #003F93 0%, rgba(0, 54, 119, 0.00) 100%);

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2rem;

    color: #FFF;

    footer {
        img{
            position: relative;
            top: 4rem;
        }
    }




`

export const LoginButton = styled.button`
    display: flex;
    width: 20.75rem;
    height: 2.9375rem;
    padding: 0.1875rem 0.625rem 0.1875rem 1.375rem;
    justify-content: center;
    align-items: center;
    gap: 0.25rem;
    flex-shrink: 0;

    border-radius: 0.4375rem;
    border: 1px solid #B8B8B8;
    background: #FFF;

    font-weight: bold;


    img{
        margin-right:auto;
    }
    span{
        margin-right:auto;
    }

    &:hover{
        cursor: pointer;
        opacity: 0.9;
    }

    &.loading{
        cursor: not-allowed;
        opacity: 0.7;

        span{
            display: flex;
            justify-content: center;
            align-items: center;
            color: #b8b8b8;
        }
    }
`