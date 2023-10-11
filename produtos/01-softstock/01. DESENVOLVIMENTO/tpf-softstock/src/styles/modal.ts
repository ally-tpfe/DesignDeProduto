import styled from 'styled-components';
import * as Dialog from '@radix-ui/react-dialog';

export const StyledOverlay = styled(Dialog.Overlay)`
    position:fixed;
    width:100vw; 
    height:100vh; 
    inset:0; 
    background:rgba(0,0,0,0.25);
    z-index: 9999;
`

export const StyledContent = styled(Dialog.Content)`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 6px;
    background-color: #fff;
    padding: 2.5rem 3rem;

    form {
        margin-top: 2rem;
        background-color: #0067ff;
        border-radius: 6px;

        padding:4rem;

        display: flex;
        flex-direction: column;
        gap: 1rem;

        div{
            display: flex;
            flex-direction: column;

            label {
                font-size: .9rem;
                margin-bottom: .3rem;
                color: #fefefe;
            }

            input {
                width: 100%;
                padding: .5rem;
                border-radius: 5px;
                border: 0;
                background-color: #fefefe;
            }
        }
        
        >button{
            margin-left: auto;
        }

        
        


    }
`

export const SoftStyledContainer = styled(Dialog.Content)`
    width: calc(100% - 20rem);
    height: auto;

    display: flex;
    flex-direction: column;
    gap: 1rem;

    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius:4px;
    background-color: #fff;
    padding: 2rem 2rem;
    z-index: 9999;

    @media(max-width: 1501px){
        max-height: 90vh;
    }


`

export const SoftStyledContent = styled.div`
    width: 100%;
    height: auto;

    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
   

    gap:2rem;

    overflow-y: auto;

    >button{
        display: flex;
        align-items: center;
        justify-content: center;

        border: none;
        background-color: transparent;
        position: absolute;
        right: 1rem;
        top:1rem;

        cursor: pointer;
    }

    @media(max-width: 1501px){
        max-height: 90vh;
        overflow-y: auto;
    }


`