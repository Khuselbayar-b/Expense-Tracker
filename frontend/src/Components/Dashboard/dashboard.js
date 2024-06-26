import React, { useEffect } from 'react';
import styled from 'styled-components';
import Chart from '/Users/khuselbayar/Documents/Expense Tracker/Expense-Tracker/frontend/src/Components/Chart/Chart.js';
import { InnerLayout } from '../../styles/Layouts';
import { dollar } from '../utils/icons';
import { useGlobalContext } from '../../context/globalContext';
import History from "/Users/khuselbayar/Documents/Expense Tracker/Expense-Tracker/frontend/src/Components/History/History.js"

function Dashboard() {
    const {incomes, expenses, totalBalance, totalExpenses, totalIncome, getIncome, getExpenses} = useGlobalContext()

    useEffect(()=> {
        getIncome()
        getExpenses()
    }, [])
    return (
        <DashboardStyled>
            <InnerLayout>
                <h1>All Transactions</h1>
                <div className='stats'>
                    <div className='chart'>
                        <Chart />
                        <div className='amount'>
                            <div className='income'>
                                <h2>Total Income</h2>
                                <p style={{ color: '#42AD00' }}>
                                    {dollar} {totalIncome()}
                                </p>
                            </div>
                            <div className='expense'>
                                <h2>Total Expense</h2>
                                <p style={{ color: 'red' }}>
                                    {dollar} {totalExpenses()}
                                </p>
                            </div>
                            <div className='balance'>
                                <h2>Total Balance</h2>
                                <p style={{ color: totalBalance() < 0 ? 'red' : 'var(--color-green)' }}>
                                    {dollar} {totalBalance()}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className='history'>
                        <h2>Recent</h2>
                        <History limit={5}/>
                        <h2 className='salary-title'>Min <span>Income </span>Max</h2>
                        <div className='salary-item'>
                            <p>
                                {incomes.length > 0 ? Math.min(...incomes.map(item => item.amount)) : 0}
                            </p>
                            <p>
                                {incomes.length > 0 ? Math.max(...incomes.map(item => item.amount)) : 0}
                            </p>
                        </div>
                        <h2 className='salary-title'>Min <span>Expense </span>Max</h2>
                        <div className='salary-item'>
                            <p>
                                {expenses.length > 0 ? Math.min(...expenses.map(item => item.amount)) : 0}
                            </p>
                            <p>
                                {expenses.length > 0 ? Math.max(...expenses.map(item => item.amount)) : 0}
                            </p>
                        </div>
                    </div>
                </div>
            </InnerLayout>
        </DashboardStyled>
    )
}

const DashboardStyled = styled.div`
 .stats{
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        gap: 2rem;
        .chart{
            grid-column: 1 / 4;
            height: 400px;
            .amount{
                display: grid;
                grid-template-columns: repeat(4, 1fr);
                gap: 2rem;
                margin-top: 2rem;
                .income, .expense{
                    grid-column: span 2;
                }
                .income, .expense, .balance{
                    background: #FCF6F9;
                    border: 2px solid #FFFFFF;
                    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
                    border-radius: 20px;
                    padding: 1rem;
                    p{
                        font-size: 3.5rem;
                        font-weight: 700;
                    }
                }

                .balance{
                    grid-column: 2 / 4;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    p{
                        opacity: 0.6;
                        font-size: 4.5rem;
                    }
                }
            }
        }

        .history{
            grid-column: 4 / -1;
            h2{
                margin: 1rem 0;
                display: flex;
                align-items: center;
                justify-content: space-between;
            }
            .salary-title{
                font-size: 1.2rem;
                span{
                    font-size: 1.8rem;
                }
            }
            .salary-item{
                background: #FCF6F9;
                border: 2px solid #FFFFFF;
                box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
                padding: 1rem;
                border-radius: 20px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                p{
                    font-weight: 600;
                    font-size: 1.6rem;
                }
            }
        }
    }
`;

export default Dashboard