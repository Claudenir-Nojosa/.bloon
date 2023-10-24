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
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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

  if (!dataTransactions) {
    return (
      <div className="flex justify-center items-center">
        <Loading />
      </div>
    );
  }

  const incomeData = dataTransactions.filter((income) => income.incomeTagId);
  const expenseData = dataTransactions.filter((income) => income.expenseTagId);

  const incomeTotal = incomeData.reduce((acc, income) => acc + income.value, 0);
  const expenseTotal = expenseData.reduce(
    (acc, expense) => acc + expense.value,
    0
  );
  const difference = incomeTotal - expenseTotal;
  const formattedDifference = formatCurrency(difference);

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
  
  function formatCurrency(value: any) {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  }
  return (
    <Card>
      <CardContent>
        <div className="flex flex-col items-center text-start mt-5 justify-center">
          {isLoadingTransactions && !dataTransactions ? (
            <div>
              <Loading />
            </div>
          ) : (
            <>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => showDataHandler()}
              >
                {showData ? <Eye /> : <EyeOff />}
              </Button>
              <div className="flex flex-col text-start mt-5 text-lg font-semibold">
                <p className={`${colorClass}`}>
                  Saldo Geral{" "}
                  {showData ? <span>R$ {formattedDifference}</span> : "--"}
                </p>
                <p>
                  Total de Receitas:{" "}
                  {showData ? (
                    <span>R$ {formatCurrency(incomeTotal)}</span>
                  ) : (
                    "--"
                  )}
                </p>
                <p>
                  Total de Despesas:{" "}
                  {showData ? (
                    <span>R$ {formatCurrency(expenseTotal)}</span>
                  ) : (
                    "--"
                  )}
                </p>
              </div>
              <div className="lg:w-2/3 w-[50%]  mt-10 md:mt-24">
                <Doughnut data={data} options={options} />
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default Budget;
