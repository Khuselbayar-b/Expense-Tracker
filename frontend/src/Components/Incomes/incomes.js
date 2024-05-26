import React, { useEffect } from "react";
import { styled } from "styled-components";
import { useGlobalContext } from "../../context/globalContext";
import { InnerLayout } from "../../styles/Layouts";
import Form from "../Form/Form";
import IncomeItem from "../incomeItem/incomeItem";
import { dateFormat } from "../utils/dateFormat";

function Income() {
  const { addIncome, incomes, getIncome, deleteIncome, totalIncome} = useGlobalContext();

  useEffect(() => {
    getIncome();
  }, []);

  return (
    <IncomeStyled>
      <InnerLayout>
        <h1>Incomes</h1>
        <h2 className="total-income">Total Income: <span>${totalIncome()}</span></h2>
        <div className="income-content">
          <div className="form-container">
            <Form />
          </div>
          <div className="incomes">
            {incomes.map((income) => {
              const { _id, title, amount, date, category, description, type } =
                income;
              return (
                <IncomeItem
                  key={_id}
                  id={_id}
                  title={title}
                  description={description}
                  type={type}
                  amount={amount}
                  date={dateFormat(date)}
                  category={category}
                  indicatorColor="var(--color-green)"
                  deleteItem={deleteIncome}
                />
              );
            })}
          </div>
        </div>
      </InnerLayout>
    </IncomeStyled>
  );
}
//background: #FCF6F9;
const IncomeStyled = styled.div`
  display: flex;
  overflow: auto;
  .total-income{
    display: flex;
    justify-content: center;
    align_items: center;
    background: #FCF6F9;
    border: 2px solid #FFFFFF;
    box-shadow: "0px 1px 15px rgba(0,0,0,0.06)";
    font-size: 2rem;
    padding: 1rem;
    border-radius: 20px;
    margin: 1rem 0;
    gap: .5rem;
    span{
      font-size: 2.5rem;
      font-weight: 800;
      color: var(--color-green);
    }
  }
  .income-content {
    display: flex;
    gap: 2rem;
    .incomes {
      flex: 1;
    }
  }
`;

export default Income;
