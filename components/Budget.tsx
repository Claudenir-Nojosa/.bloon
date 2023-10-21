"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import numeral from "numeral";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import Loading from "./Loading";
import { useState } from "react";
import { Button } from "./ui/button";
import { Eye, EyeOff } from "lucide-react";

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
  const [showData, setShowData] = useState(false);

  const showDataHandler = () => {
    setShowData(!showData);
  };
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
    return (
      <div className="mt-4">
        <Loading />
      </div>
    );
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
  const formattedDifference = numeral(difference).format("0.00");

  const colorClass =
    difference > 0 && showData
      ? "text-green-700"
      : difference === 0 || !showData
      ? "text-foreground"
      : "text-red-700";

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
    <div className="font-semibold text-lg  gap-3 flex flex-col">
      <Button variant="ghost" size="icon" onClick={() => showDataHandler()}>
        {showData ? <Eye /> : <EyeOff />}
      </Button>
      <p className={`text-2xl ${colorClass} flex-col flex`}>
        Saldo Geral {showData ? <span>R$ {formattedDifference}</span> : "--"}
      </p>
      <p>
        Total de Receitas:{" "}
        {showData ? (
          <span>R$ {numeral(incomeTotal).format("0,0.00")}</span>
        ) : (
          "--"
        )}
      </p>
      <p>
        Total de Despesas:{" "}
        {showData ? (
          <span>R$ {numeral(expenseTotal).format("0,0.00")}</span>
        ) : (
          "--"
        )}
      </p>
      <div className="mt-4 mb-20">
        {showData ? <Doughnut data={data} options={options} /> : ""}
      </div>
    </div>
  );
};

export default Budget;
