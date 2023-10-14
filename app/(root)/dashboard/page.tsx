"use client";

import MaxWidthWrapper from "@/components/shared/MaxWidthWrapper";
import { Button } from "@/components/ui/button";
import { Expense, Income } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import React, { FC } from "react";

export interface Transactions {
  id: string;
  description: string;
  value: number;
  userId: string;
  updatedAt: string;
  Income: Income;
  Expense: Expense;
}

const Dashboard: FC<Transactions> = () => {
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

  return (
    <MaxWidthWrapper className="max-w-xl mb-12 sm:mt-15 flex flex-col items-center justify-center text-center">
      <div>
        <h1 className="text-3xl mb-10">
          Por favor, selecione o tipo de movimentação
        </h1>
        <div className="mb-20 gap-6 flex justify-center">
          <Button variant="outline">
            <Link href="/dashboard/incomes">Receita</Link>
          </Button>
          <Button variant="outline">
            <Link href="/dashboard/expenses">Despesa</Link>
          </Button>
        </div>
      </div>
      <ul>
        {dataTransactions && dataTransactions.length > 0 ? (
          <ul>
            {dataTransactions.map((item: Transactions) => (
              <li key={item.id}>
                {item.description} - {item.value} - {item.updatedAt}
              </li>
            ))}
          </ul>
        ) : (
          <p>Nenhum dado disponível ainda.</p>
        )}
      </ul>
    </MaxWidthWrapper>
  );
};

export default Dashboard;
