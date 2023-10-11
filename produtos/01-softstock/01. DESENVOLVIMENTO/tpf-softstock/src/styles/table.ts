import { styled } from "styled-components";

export const TableContainer = styled.div`
    width: 100%;
    height: 100vh;
    overflow: auto;
`

export const TableContainerHeader = styled.div`
    width: 100%;
    height: 4rem;
    display: flex;
    align-items: center;
    padding-left: 2rem;

    h1 {
        color: #434343;
        font-family: Segoe UI;
        font-size: 1.375rem;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
    }
`

export const TableContent = styled.div`
    width: auto;
    height: calc(100vh - 4rem);

    
    overflow: auto;

    background: #bce4fe;

    padding-left: 2rem;
    padding-top: 1rem;
`

export const TableContentToolbar = styled.div`
    width: 100%;
    height: 4rem;

    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-right: 2rem;

    button{
        cursor: pointer;
    }

    .input{
        display: flex;
        width: 16.6875rem;
        height: 1.8125rem;
        padding: 0.1875rem 0.625rem;
        align-items: center;
        gap: 0.25rem;
        flex-shrink: 0;

        border-radius: 0.4375rem;
        border: 1px solid #B8B8B8;
        background: #FFF;

        ::placeholder{
           color: #B8B8B8
        }

    }
` 
export const TableContentToolbarButtons = styled.div`
    display: flex;
    align-items: center;
    gap: 1.25rem;
`

export const TableToolbarButton = styled.button`
    display: flex;
    width: 8.75rem;
    height: 1.8125rem;
    padding: 0rem 0.625rem 0rem 0.375rem;
    justify-content: center;
    align-items: center;
    gap: 0.1875rem;

    border-radius: 0.4375rem;
    background: #0067FF;

    color: #FFFFFF;
    font-weight: 600;
    border: none;
    opacity: 0.85;

    transition: all 0.1s ease-in-out;

    &:hover{
        opacity: 1;
        cursor: pointer;
    }
`

export const TableSplitButton = styled.div`
    display: flex;

    button{
        cursor: pointer;
        transition: all 0.1s ease-in-out;

        &:hover{
            background-color: #f6f6f6;
        }
    }

    .primary-btn{
        width: 5.625rem;
        height: 1.8125rem;
        padding: 0.3125rem 0.75rem;

        border-radius: 0.4375rem 0rem 0rem 0.4375rem;
        border: 1px solid #B8B8B8;
        background: #FFF;
        z-index: 1;
    }

    .secondary-btn{
        display: flex;
        justify-content: center;
        align-items: center;

        width: 1.25rem;
        height: 1.8125rem;
        padding: 0.3125rem 0.75rem;

        border-radius: 0rem 0.4375rem 0.4375rem 0rem;
        border: 1px solid #B8B8B8;
        background: #FFF;
        z-index: 1;
    }

    .dropdown-container{
        position: relative;
        z-index: 0;
    }

    .dropdown-container:hover .dropdown-content{
        opacity: 1;
        pointer-events: all;

    }

    .dropdown-content{
        background: #FFF;
        position: absolute;
        
        left: -5.7rem;
        top: 0.39rem;
        width: 7.25rem;

        opacity: 0;
        pointer-events: none;

        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        gap:1rem;

        
        border-radius: 0.4375rem;
        border: 1px solid #B8B8B8;

        transition: all 0.1s ease-in-out;
        z-index: -1;

        a{
            text-decoration: none;
            color: black;
            width: 100%;
            transition: transform 0.3s ease-in-out;

            &:hover{
                transform: translateX(0.25rem);
            }
        }

        form{
            display: flex;
            flex-direction: column;

            /* Target every second input element (even index) */
            input:nth-child(even) {
                width: 100%;
                height: 2rem;
                flex-shrink: 0;
                background: #f8f8f8;
                border: 1px solid white;
                padding: 0.5rem;
            }

            input:nth-child(odd) {
                width: 100%;
                height: 2rem;
                flex-shrink: 0;
                background: #ffffff; /* Change the background color for odd inputs */
                border: 1px solid white;
                padding: 0.5rem;
            }

            input:last-child{
                border-bottom-left-radius:0.4375rem;
                border-bottom-right-radius:0.4375rem;
            }
        }

    }
`

export const TableToolbarButtonIcon = styled.div`
    opacity: 0.25;
    cursor: not-allowed;

    &.active{
        opacity: 1;
        cursor: pointer;
    }
`

export const Table = styled.table`
    border-collapse: collapse;

    min-width: 3600px;

    th:first-child, td:first-child {
        text-align: center;
    }

    th, td {
        font-size: .9rem;
        max-width: 50px;
    }
`;

export const Thead = styled.thead`
  background-color: #002f62;
  color: #FFFFFF;
  height:3rem;

  th:first-child {
    border-top-left-radius: 6px;
  }
  th:last-child {
    border-top-right-radius: 6px;
  }

  th, td {
    text-align: left;
    width:auto;
    padding: 0 .5rem;

  }

  

  th {
    border-bottom: 10px solid #bce4fe;
  }
`;

export const Tbody = styled.tbody`
    overflow: auto;

    th, td {
        text-align: left;
        height: 3.5rem;
        color: black;
        width:auto;
        padding: .5rem;
        border-left: .5px solid #bce4fe;
        border-bottom: .5px solid #bce4fe;
    }






  tr:nth-child(odd) {
    background-color: #f2f2f2;
    &.selected {
        background-color: #0067ff;

        th,td{
            font-weight: 600;
            color: #FFFFFF;
        }

        &:hover {
            background-color: #0067ff;
            opacity: 0.95;

        }
    }

    &:hover {
        background-color: #dadae9;
        cursor: pointer;
    }
    
  }

  tr:nth-child(even) {
    background-color: #FFFFFF;

    &:hover {
        background-color: #dadae9;
        cursor: pointer;

    }
    &.selected {
        background-color: #0053ae;

        th,td{
            font-weight: 600;
            color: #FFFFFF;
        }

        &:hover {
            background-color: #0053ae;
            opacity: 0.95;

        }
    }
  }

  padding-top: 1rem;
`;