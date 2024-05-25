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
  
  return (
    <GlobalContext.Provider
      value={{
        addIncome,
        getIncome,
        incomes,
        deleteIncome,
        totalIncome
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
