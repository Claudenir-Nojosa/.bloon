"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loading from "./Loading";
import Image from "next/image";
import { Badge } from "./ui/badge";

const ContasFuturas = () => {
  //Fetch Expenses values
  const { data: dataExpense, isLoading: isLoadingExpense } = useQuery({
    queryKey: ["expenses"],
    queryFn: async () => {
      const response = await axios.get("/api/expenses/");
      return response.data;
    },
  });
  console.log(dataExpense);

  const unpaidExpenses = dataExpense?.expenses?.filter(
    (expense: any) => !expense.paid
  );
  const topExpensesSliced = unpaidExpenses ? unpaidExpenses.slice(0, 2) : [];
  
  function formatCurrency(value: any) {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  }
  return (
    <Card className="min-h-fit">
      <CardHeader>
        <CardTitle>Contas a pagar</CardTitle>
        <CardDescription>Suas despesas ainda não pagas</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoadingExpense ? (
          <div className="flex justify-center items-center">
            <Loading />
          </div>
        ) : topExpensesSliced && topExpensesSliced.length > 0 ? (
          topExpensesSliced.map((expense: any) => (
            <div key={expense.id} className="flex flex-col w-full mb-5">
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
          "Nenhuma despesa não paga encontrada."
        )}
      </CardContent>
    </Card>
  );
};

export default ContasFuturas;
