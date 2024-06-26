import React from "react";
import {styled} from 'styled-components';
import {useGlobalContext} from "/Users/khuselbayar/Documents/Expense Tracker/Expense-Tracker/frontend/src/context/globalContext.js";

function History({ limit }) {
    const { transactionHist} = useGlobalContext()

    const [...history] = transactionHist()

    const displayedHistory = limit ? history.slice(0, limit) : history;
    return (
        <HistoryStyled>
        
            {displayedHistory.map((item)=> {
                const {_id, title, amount, type} = item
                return (
        
                    <div key = {_id} className="history-item">
                        <p style={{
                            color: type === 'expense' ? 'red' : 'var(--color-green)'
                        }}>
                            {title}
                        </p>

                         <p style={{
                            color: type === 'expense' ? 'red' : 'var(--color-green)'
                        }}>
                            {
                            type === 'expense' ? `-${amount}` : `${amount}`
                            }
                        </p>
                    </div>
                )
            })}
        </HistoryStyled>
    )
}

const HistoryStyled = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    .history-item{
        background: #FCF6F9;
        border: 2px solid #FFFFFF;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        padding: 1rem;
        border-radius: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
`;

export default History