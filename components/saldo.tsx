"use client";

import { Button } from "./ui/button";
import { Eye, EyeOff, Wallet } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { title as textTitle } from "@/components/shared/primitives";
import { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import dayjs from "dayjs";

const Saldo = () => {
  const currentMonth = dayjs().format("MMMM");
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [showData, setShowData] = useState(false);
  const { data: session, status } = useSession();

  //Fetch Expenses values
  const { data: dataExpense, isLoading: isLoadingExpense } = useQuery({
    queryKey: ["expenses"],
    queryFn: async () => {
      const response = await axios.get("/api/expenses/");
      return response.data;
    },
  });
  console.log(dataExpense);

  //Fetch Incomes values
  const { data: dataIncome, isLoading: isLoadingIncome } = useQuery({
    queryKey: ["incomes"],
    queryFn: async () => {
      const response = await axios.get("/api/incomes/");
      return response.data;
    },
  });
  console.log(dataIncome);

  useEffect(() => {
    console.error(dataExpense);
    console.error(dataIncome);
  }, [dataExpense, dataIncome]);

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

  const combinedDataIncome = dataIncome?.incomes?.map((item: any) => {
    const dateMonth = dayjs(item.date, "DD/MM/YYYY").format("MMMM");
    const capitalizedMonth =
      dateMonth.charAt(0).toUpperCase() + dateMonth.slice(1);
    return {
      ...item,
      month: capitalizedMonth,
    };
  });
  console.log(combinedDataIncome);

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
  const filterIncomesByMonth = (incomes: any, month: any) => {
    if (incomes) {
      return incomes.filter((income: any) => {
        const incomeMonth = income.month;
        return incomeMonth === month;
      });
    } else {
      return [];
    }
  };
  const filteredExpenses = filterExpensesByMonth(combinedData, selectedMonth);
  const totalExpenseValue = filteredExpenses.reduce(
    (total: any, expense: any) => total + expense.value,
    0
  );
  const filteredIncomes = filterIncomesByMonth(
    combinedDataIncome,
    selectedMonth
  );
  const totalIncomeValue = filteredIncomes.reduce(
    (total: any, expense: any) => total + expense.value,
    0
  );
  const showDataHandler = () => {
    setShowData(!showData);
  };

  console.log(filteredExpenses);

  function formatCurrency(value: any) {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center w-full">
          <p className="text-4xl">
            Olá,{" "}
            <span className={textTitle({ color: "green", size: "sm" })}>
              {session?.user?.name}
            </span>
          </p>
        </div>
      </CardHeader>
      <CardContent>
        <div className="w-full flex flex-col justify-end items-start gap-2">
          <div className="mb-4"></div>
          {session?.user?.image === null ? (
            ""
          ) : (
            <div>
              <div className="flex gap-5 items-center">
                <Image
                  className="rounded-full"
                  src={session?.user?.image || ""}
                  height={80}
                  width={80}
                  alt={`${session?.user?.name} profile pic`}
                />

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => showDataHandler()}
                >
                  {showData ? <Eye /> : <EyeOff />}
                </Button>
                <Badge variant="outline">
                  <div>
                    <p>Receita mensal</p>
                    {showData ? (
                      <span className="text-green-500">
                        {showData ? formatCurrency(totalIncomeValue) : "R$ --"}
                      </span>
                    ) : (
                      <span className="text-green-500">R$ --</span>
                    )}
                  </div>
                </Badge>
                <Badge variant="outline">
                  <div>
                    <p>Despesa mensal</p>
                    {showData ? (
                      <span className="text-red-500">
                        {showData ? formatCurrency(totalExpenseValue) : "R$ --"}
                      </span>
                    ) : (
                      <span className="text-red-500">R$ --</span>
                    )}
                  </div>
                </Badge>
              </div>
            </div>
          )}
        </div>
        <div className="flex items-end">
          <Button
            className="mt-10 rounded-md gap-2 border bg-transparent border-[#0d825913]"
            variant="outline"
          >
            <Image
              src="https://github.com/Claudenir-Nojosa/servidor_estaticos/blob/main/carteira.png?raw=true"
              alt="Carteira"
              width={30}
              height={30}
            />
            <Link href="/dashboard">Verificar carteira!</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Saldo;
