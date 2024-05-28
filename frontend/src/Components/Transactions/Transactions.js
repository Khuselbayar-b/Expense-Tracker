import React, { useEffect } from 'react';
import {styled} from 'styled-components';
import History from "/Users/khuselbayar/Documents/Expense Tracker/Expense-Tracker/frontend/src/Components/History/History.js";
import {useGlobalContext} from "/Users/khuselbayar/Documents/Expense Tracker/Expense-Tracker/frontend/src/context/globalContext.js";

function Transactions() {
    const { transactionHist, getIncome, getExpenses} = useGlobalContext()
    const [...history] = transactionHist()
    useEffect(()=> {
        getIncome()
        getExpenses()
    }, [])
    return (
      <TransactionsStyled>
        <h1>Transactions</h1>
        <History />
       </TransactionsStyled>
    
    )
}

const TransactionsStyled = styled.div`
    background: #F4F3F2;
    border: 2px solid #FFFFFF;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    padding: 1rem;
    border-radius: 20px;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    }
`;

export default Transactions