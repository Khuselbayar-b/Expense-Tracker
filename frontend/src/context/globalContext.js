import React, { useContext, useState } from "react";
import axios from "axios";
import { clothing } from "../Components/utils/icons";

const BASE_URL = "http://localhost:80/api/v1/";

const GlobalContext = React.createContext();

export const GlobalProvider = ({ children }) => {
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState(null);

  const addIncome = async (income) => {
    const response = await axios
      .post(`${BASE_URL}add-income`, income)
      .catch((err) => {
        setError(err.response.data.message);
      });
    getIncome();
  };

  const getIncome = async () => {
    const response = await axios.get(`${BASE_URL}get-income`);
    setIncomes(response.data);
  };

  const deleteIncome = async (id) => {
    const res = await axios.delete(`${BASE_URL}delete-income/${id}`);
    getIncome();
  };

  const totalIncome = () => {
    let totalIncome = 0;
    incomes.forEach((incomes) => {
      totalIncome += incomes.amount
    })
    return totalIncome;
  };
  
  const addExpense = async (income) => {
    const response = await axios
      .post(`${BASE_URL}add-expense`, income)
      .catch((err) => {
        setError(err.response.data.message);
      });
    getExpenses();
  };

  const getExpenses = async () => {
    const response = await axios.get(`${BASE_URL}get-expense`);
    setExpenses(response.data);
  };

  const deleteExpenses = async (id) => {
    const res = await axios.delete(`${BASE_URL}delete-expense/${id}`);
    getExpenses();
  };

  const totalExpenses = () => {
    let totalExpense = 0;
    expenses.forEach((expenses) => {
      totalExpense += expenses.amount
    })
    return totalExpense;
  };

  const totalBalance = () => {
    return totalIncome() - totalExpenses()
  }

  const transactionHist = () => {
    const hist = [...incomes, ...expenses]
    hist.sort((a,b) => {
      return new Date(b.createdAt) - new Date(a.createdAt)
    })
    return hist.slice(0,5)
  }
  

  return (
    <GlobalContext.Provider
      value={{
        addIncome,
        getIncome,
        incomes,
        deleteIncome,
        totalIncome,
        expenses,
        addExpense,
        getExpenses,
        deleteExpenses,
        totalExpenses,
        totalBalance,
        transactionHist,
        error
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
