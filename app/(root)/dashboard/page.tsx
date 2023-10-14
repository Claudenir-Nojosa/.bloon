"use client";

import ExpenseCard from "@/components/ExpenseCard";
import { ExpenseTag, User } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import React from "react";

export interface Expenses {
  id: string;
  description: string;
  value: number;
  userId: string;
  expenseTagId: string;
  ExpenseTag: ExpenseTag;
  User: User;
}

const Dashboard = () => {
  const {
    data: dataExpenses,
    isLoading: isLoadingExpenses,
    isError: isErrorExpenses,
  } = useQuery({
    queryKey: ["expenses"],
    queryFn: async () => {
      const { data } = await axios.get("/api/expenses");
      return data.expenses as Expenses[];
    },
  });
  console.log(dataExpenses);
  return (
    <div className="flex flex-col justify-center items-center text-center">
      <h1>Dashboard</h1>

      {dataExpenses ? (
        <div className="mt-6">
          <div className="grid xl:grid-cols-3 grid-cols-1 sm:grid-cols-1  lg:grid-cols-2 gap-7 ">
            {dataExpenses.map((expense: Expenses) => (
              <ExpenseCard key={expense.id} expense={expense} />
            ))}
          </div>
        </div>
      ) : (
        <div>
          <p className="mt-6">
            <Link className="underline text-slate-400 mx-2" href="/login">
              Faça login
            </Link>
            para visualizar os dados da conta.
          </p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
