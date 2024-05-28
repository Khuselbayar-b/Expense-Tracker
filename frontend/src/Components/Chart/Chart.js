import React from "react";
import {styled} from 'styled-components';
import {useGlobalContext} from "/Users/khuselbayar/Documents/Expense Tracker/Expense-Tracker/frontend/src/context/globalContext.js";
import {dateFormat} from "/Users/khuselbayar/Documents/Expense Tracker/Expense-Tracker/frontend/src/Components/utils/dateFormat.js";
import {Chart as ChartJs, 
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from "chart.js"
import {Line} from "react-chartjs-2"

ChartJs.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
)


function Chart() {
    const {incomes, expenses} = useGlobalContext()

    const formatData = (items) => items.map(item => ({
            date: dateFormat(item.date),
            amount: item.amount
        }));

    const formattedIncomes = formatData(incomes);
    const formattedExpenses = formatData(expenses);
    const labels = Array.from(new Set([
        ...formattedIncomes.map(item => item.date),
        ...formattedExpenses.map(item => item.date)
    ])).sort();

    const incomeData = labels.map(label => {
        const incomeItem = formattedIncomes.find(item => item.date === label);
        return incomeItem ? incomeItem.amount : 0;
    });

    const expenseData = labels.map(label => {
        const expenseItem = formattedExpenses.find(item => item.date === label);
        return expenseItem ? expenseItem.amount : 0;
    });


    const computeCumulativeBalance = (incomes, expenses) => {
        let balance = 0;
        return labels.map(label => {
            const incomeItem = formattedIncomes.find(item => item.date === label);
            const expenseItem = formattedExpenses.find(item => item.date === label);
            if (incomeItem) balance += incomeItem.amount;
            if (expenseItem) balance -= expenseItem.amount;
            return balance;
        });
    };

    const balanceData = computeCumulativeBalance(incomes, expenses);

    const data = {
        labels,
        datasets: [
            {
                label: "Incomes",
                data: incomeData,
                backgroundColor: '#42AD00',
                fill: true,
                tension: 0.2
            },
            {
                label: "Expenses",
                data: expenseData,
                backgroundColor: 'red',
                fill: true,
                tension: 0.2
            },
            {
                label: "Total Balance",
                data: balanceData,
                backgroundColor: '#18181A',
                fill: true,
                tension: 0.2
            }
        ]
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Income and Expense Trends',
            },
            tooltip: {
                callbacks: {
                    label: (context) => `${context.dataset.label}: $${context.parsed.y}`
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true
            }
        }
    };

    return (
        <ChartStyled>
            <Line data={data} options={options} />
        </ChartStyled>
    )
}

const ChartStyled = styled.div`
    background: #FCF6F9;
    border: 2px solid #FFFFFF;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    padding: 1rem;
    border-radius: 20px;
    height: 100%;
`;

export default Chart