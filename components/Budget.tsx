"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import numeral from "numeral";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

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

  const colorClass = difference > 0 ? "text-green-700" : "text-red-700";

  const data = {
    labels: ["Receita", "Despesa"],
    datasets: [
      {
        label: "R$",
        data: [incomeTotal, expenseTotal],
        backgroundColor: ["rgb(9, 121, 105)", "rgb(199, 0, 57)"],
        borderColor: ["rgb(9, 121, 105)", "rgb(199, 0, 57)"],
      },
    ],
    hoverOffset: 40,
  };
  const options = {};
  return (
    <div className="font-semibold text-lg">
      <p>
        Saldo Atual:{" "}
        <span className={colorClass}>R$ {formattedDifference}</span>
      </p>
      <p>
        Total de Receitas:{" "}
        <span className="dark:text-green-200 text-green-500 font-normal">
          R$ {numeral(incomeTotal).format("0,0.00")}
        </span>
      </p>
      <p>
        Total de Despesas:{" "}
        <span className="dark:text-red-200 text-red-700 ">
          R$ {numeral(expenseTotal).format("0,0.00")}
        </span>
      </p>
      <div className="mt-4 mb-20">
        <Doughnut data={data} options={options} />
      </div>
    </div>
  );
};

export default Budget;
