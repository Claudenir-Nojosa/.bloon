"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import dayjs from "dayjs";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import { Badge } from "./ui/badge";
import Loading from "./Loading";

const MaioresGastos = () => {
  const currentMonth = dayjs().format("MMMM");
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);

  //Fetch Expenses values
  const { data: dataExpense, isLoading: isLoadingExpense } = useQuery({
    queryKey: ["expenses"],
    queryFn: async () => {
      const response = await axios.get("/api/expenses/");
      return response.data;
    },
  });
  console.log(dataExpense);

  const combinedData = dataExpense?.expenses?.map((item: any) => {
    const dateMonth = dayjs(item.date, "DD/MM/YYYY").format("MMMM");
    const capitalizedMonth =
      dateMonth.charAt(0).toUpperCase() + dateMonth.slice(1);
    return {
      ...item,
      month: capitalizedMonth,
    };
  });
  console.log(combinedData);
  const filterExpensesByMonth = (expenses: any, month: any) => {
    if (expenses) {
      return expenses.filter((expense: any) => {
        const expenseMonth = expense.month;
        return expenseMonth === month;
      });
    } else {
      return [];
    }
  };

  const filteredExpenses = filterExpensesByMonth(combinedData, selectedMonth);

  console.log(filteredExpenses);
  const sortedExpenses = [...filteredExpenses].sort(
    (a, b) => b.value - a.value
  );

  const topExpenses = sortedExpenses.slice(0, 2);
  console.log(topExpenses);
  function formatCurrency(value: any) {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  }
  return (
    <Card className="min-h-fit">
      <CardHeader>
        <CardTitle>Maiores Gastos do mês atual</CardTitle>
        <CardDescription>Onde você gastou mais durante o mês</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoadingExpense ? (
          <div className="flex justify-center items-center">
            <Loading />
          </div>
        ) : topExpenses.length > 0 ? (
          topExpenses.map((expense, index) => (
            <div key={index} className="flex flex-col w-full mb-5">
              <Badge
                variant="outline"
                className="flex gap-5 text-center items-center justify-between p-4"
              >
                <div className="flex gap-2 text-center justify-start items-center">
                  <Image
                    src={expense.ExpenseTag.icon}
                    alt={expense.ExpenseTag.name}
                    height={50}
                    width={50}
                  />
                  <span className="text-md font-semibold">
                    Descrição: {expense.description}
                  </span>
                </div>
                <p className="text-red-500 font-semibold">
                  Valor: R$ {formatCurrency(expense.value)}
                </p>
              </Badge>
            </div>
          ))
        ) : (
          "Sem despesas durante o mês."
        )}
      </CardContent>
    </Card>
  );
};

export default MaioresGastos;
