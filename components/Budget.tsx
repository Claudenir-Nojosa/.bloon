"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import numeral from "numeral";

export interface Transactions {
  id: string;
  description: string;
  value: number;
  date: Date;
  userId: string;
  updatedAt: string;
  incomeTagId: string;
  expenseTagId: string;
}
const Budget = () => {
  const { data: dataTransactions, isLoading: isLoadingTransactions } = useQuery(
    {
      queryKey: ["combinedData"],
      queryFn: async () => {
        const { data } = await axios.get("/api/transactions");
        return data.combinedData as Transactions[];
      },
    }
  );
  console.log(dataTransactions);

  if (isLoadingTransactions) {
    return <div>Carregando...</div>;
  }

  if (!dataTransactions) {
    return <div>Dados não disponíveis.</div>;
  }

  const incomeData = dataTransactions.filter((income) => income.incomeTagId);
  const expenseData = dataTransactions.filter((income) => income.expenseTagId);

  const incomeTotal = incomeData.reduce((acc, income) => acc + income.value, 0);
  const expenseTotal = expenseData.reduce(
    (acc, expense) => acc + expense.value,
    0
  );
  const difference = incomeTotal - expenseTotal;
  const formattedDifference = numeral(difference).format("0,0.00");
  return (
    <div>
      <p>Saldo Atual: R$ {formattedDifference}</p>
      <p>Total de Receitas: R$ {numeral(incomeTotal).format("0,0.00")}</p>
      <p>Total de Despesas: R$ {numeral(expenseTotal).format("0,0.00")}</p>
    </div>
  );
};

export default Budget;
