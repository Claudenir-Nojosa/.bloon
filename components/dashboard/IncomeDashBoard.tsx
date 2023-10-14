"use client";

import ExpenseCard from "@/components/ExpenseCard";
import { IncomeTag, User } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import IncomeCard from "../IncomeCard";

export interface Incomes {
  id: string;
  description: string;
  value: number;
  userId: string;
  incomeTagId: string;
  IncomeTag: IncomeTag;
  User: User;
}

const IncomeDashBoardComponent = () => {
  const {
    data: dataIncomes,
    isLoading: isLoadingIncomes,
    isError: isErrorIncomes,
  } = useQuery({
    queryKey: ["incomes"],
    queryFn: async () => {
      const { data } = await axios.get("/api/incomes");
      return data.incomes as Incomes[];
    },
  });
  console.log(dataIncomes);
  return (
    <div className="flex flex-col justify-center items-center text-center">
      {dataIncomes ? (
        <div className="mt-6">
          <div className="grid xl:grid-cols-3 grid-cols-1 sm:grid-cols-1  lg:grid-cols-2 gap-7 ">
            {dataIncomes.map((income: Incomes) => (
              <IncomeCard key={income.id} income={income} />
            ))}
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default IncomeDashBoardComponent;
