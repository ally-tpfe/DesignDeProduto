import { styled } from "styled-components";


export const StyledFormField = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.3rem;


    label{
        display: flex;
        width: 100%;
        flex-direction: column;
        flex-shrink: 0;

        color: #FFF;
        font-family: Segoe UI;
        font-size: 0.75rem;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
    }

    input{
        width: 100%;
        height: 1.625rem;
        flex-shrink: 0;

        border-radius: 4px;
        background: #FFF;

        border: none;
    }

    span{
        font-size: .62rem;
        color: #F7A2A2;
        font-weight: 600;
    }

    select{
        width: 100%;
        height: 1.625rem;
        flex-shrink: 0;

        border-radius: 4px;
        background: #FFF;

        border: none;

        option{
            width: 100%;
            height: 1.625rem;
            flex-shrink: 0;

            border-radius: 4px;
            background: #FFF;

            border: none;
        }
    }
`

export const Form = styled.form`
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    margin: auto;
    overflow-y: auto;

    > header{
        width: 63%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: #434343;
        font-family: Segoe UI;
        font-size: 1.375rem;
        font-style: normal;
        font-weight: 700;
        line-height: normal;

        button{
            display: flex;
            width: 6.5rem;
            height: 2.625rem;
            padding: 0.375rem 0.9375rem;
            justify-content: center;
            align-items: center;
            gap: 0.625rem;
            flex-shrink: 0;

            border-radius: 0.625rem;
            background: #A6E887;

            color: #0067FF;
            text-align: center;
            font-size: 1.375rem;
            font-style: normal;
            font-weight: 700;
            line-height: normal;

            cursor: pointer;

            border: none;

            &:disabled{
                color: #969696;
                background: #D4D4D4;
            }

            &:hover{
                opacity: 0.9;
            }
        }
    }
`

export const FormContainer = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: center;
    flex-wrap: wrap;
    margin: auto;
    gap: 1rem;
`

export const FormCard = styled.div`
    width: 34.4375rem;
    height: 3.125rem;

    display: flex;
    align-items: center;
    justify-content: center;

    transition: all 0.1s ease-in-out;



    border-radius: 0.25rem;
    background: #0067FF;

    header{
        display: flex;
        width: 100%;
        justify-content: space-between;
        align-items: center;
        padding-right: 0;
        padding-left: 1rem;

        color: white;
        font-weight: 500;

        span{
            display: flex;
            align-items: center;
            justify-content: center;

            width: 47px;

            height: 3.125rem;
            border-left: 1px solid white;

            cursor: pointer;
        }

        p{
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 1.37rem;
        }
    }

    main{
        display: none;
    }

    &.open{
        transition: all 0.3s ease-in-out;

        width: 34.4375rem;
        height: auto;

        flex-direction: column;
        padding: 1rem 0;

        header{
            display: flex;
            flex-direction: row;
            align-items: flex-start;
            justify-content: space-between;
            padding: 0 1.98rem;
            padding-bottom: 1.83rem;

            button{
                display: inline-flex;
                padding: 6px 12px;
                justify-content: center;
                align-items: center;
                gap: 10px;

                border-radius: 4px;
                background: #F1F1F1;

                color: #0067FF;
                text-align: center;
                font-family: Segoe UI;
                font-size: 0.875rem;
                font-style: normal;
                font-weight: 600;
                line-height: normal;

                border: none;
                cursor: pointer;

                &:hover{
                    opacity: 0.9;
                }
            }

        }


        main{
            width: 100%;
            height: 100%;
            padding: 0 1.98rem;
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: .5rem;
            align-items: center;
            justify-content: center;
        }

        footer{

            width: 100%;
            height: .8rem;
            display: flex;
            justify-content: flex-end;
            padding: 0 1rem;

            span{
                display: flex;
                align-items: center;
                justify-content: flex-end;
    
                width: 47px;
                height: 1.2rem;
                
                color: white;
                cursor: pointer;
            }
        }
    }

`

export const FormContainerRight = styled.div`
    width: 50%;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    margin-bottom: 0;
    flex:1;
    gap:1rem;

    @media(max-width: 1501px){
        width: 100%;
        margin: 0 auto;
        align-items: center;
        justify-content: center;
    }

`

export const FormContainerLeft = styled.div`
    width: 50%;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: center;
    margin-bottom: 0;
    flex:1;
    gap:1rem;

    @media(max-width: 1501px){
        width: 100%;
        margin: 0 auto;
        align-items: center;
        justify-content: center;
    }



`