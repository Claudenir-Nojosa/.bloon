"use client";

import MaxWidthWrapper from "@/components/shared/MaxWidthWrapper";
import { Button } from "@/components/ui/button";
import {
  Expense as PrismaExpense,
  ExpenseTag,
  Income,
  IncomeTag,
  User,
} from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import React, { FC } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ExpenseLimitForm } from "@/components/forms/expenseLimit";
import numeral from "numeral";
import { Progress } from "@/components/ui/progress";

type Expense = PrismaExpense & {
  ExpenseTag: ExpenseTag;
};

const Goals = () => {
  // fetch expense tags
  const { data: dataExpenseTags, isLoading: isLoadingExpenseTags } = useQuery<
    ExpenseTag[]
  >({
    queryKey: ["expenseTags"],
    queryFn: async () => {
      const response = await axios.get("/api/expenses/tags");
      return response.data;
    },
  });
  console.log(dataExpenseTags);
  //Fetch Expenses values
  const { data: dataExpense, isLoading: isLoadingExpense } = useQuery<
    Expense[]
  >({
    queryKey: ["expenses"],
    queryFn: async () => {
      const response = await axios.get("/api/expenses/");
      return response.data;
    },
  });
  console.log(dataExpense);
  const calculateProgressValue = (tagId: string, expenses: Expense[]) => {
    const expensesWithSameTag = expenses.filter(
      (expense) => expense.expenseTagId === tagId
    );
    if (expensesWithSameTag.length === 0) {
      return 0;
    }
    const totalExpenseValue = expensesWithSameTag.reduce(
      (total, expense) => total + expense.value,
      0
    );

    const tag = expensesWithSameTag[0].ExpenseTag;
    const monthlyLimit = tag.monthlyLimit || 0;
    const progressValue = monthlyLimit - totalExpenseValue;

    return progressValue;
  };

  return (
    <MaxWidthWrapper className="flex flex-col gap-7 mt-14 mb-14 justify-start text-start items-start">
      <h1 className="text-5xl font-bold">Limites de despesas</h1>
      <p className="text-zinc-400 mb-14">
        Para editar os limites, basta clicar no ícone da categoria
      </p>
      {dataExpenseTags?.map((tag) => {
        const tagId = tag.id; // ID da tag específica
        const progressValue = dataExpense
          ? calculateProgressValue(tagId, dataExpense.expenses)
          : 0;

        return (
          <div className="flex flex-col mb-10 w-full" key={tag.id}>
            <div className="flex items-center font-semibold text-xl">
              <Button variant="ghost">
                <Dialog>
                  <DialogTrigger asChild>
                    <Image
                      src={tag.icon}
                      alt={tag.name}
                      height={60}
                      width={60}
                    />
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <ExpenseLimitForm
                      data={{
                        id: tag.id,
                        name: tag.name,
                        icon: tag.icon,
                        monthlyLimit: tag.monthlyLimit,
                      }}
                    />
                  </DialogContent>
                </Dialog>
              </Button>
              <div className="flex flex-col w-full">
                <Progress value={progressValue} />
                <span className="mt-2"> {tag.name}</span>
                <span className="text-zinc-400 text-lg">
                  Limite atual: R$ {numeral(tag.monthlyLimit).format("0.00")}
                </span>
                <span className="text-zinc-400 text-lg">
                  Falta: R$ {numeral(progressValue).format("0.00")}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </MaxWidthWrapper>
  );
};

export default Goals;
