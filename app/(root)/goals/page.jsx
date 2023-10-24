"use client";

import MaxWidthWrapper from "@/components/shared/MaxWidthWrapper";
import { useSession } from "next-auth/react";
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
import React, { FC, useEffect, useState } from "react";
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
import { Progress } from "@nextui-org/react";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { title } from "@/components/shared/primitives";

const Goals = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  });
  const currentMonth = dayjs().locale("pt-br").format("MMMM");
  const capitalizedMonth =
    currentMonth.charAt(0).toUpperCase() + currentMonth.slice(1);
  const [selectedMonth, setSelectedMonth] = useState(capitalizedMonth);

  // fetch expense tags
  const { data: dataExpenseTags, isLoading: isLoadingExpenseTags } = useQuery({
    queryKey: ["expenseTags"],
    queryFn: async () => {
      const response = await axios.get("/api/expenses/tags");
      return response.data;
    },
  });
  console.log(dataExpenseTags);

  const {
    data: dataExpenseTagsMonthlyLimit,
    isLoading: isLoadingExpenseTagsMonthlyLimit,
  } = useQuery({
    queryKey: ["expenseTagsLimits"],
    queryFn: async () => {
      const response = await axios.get("/api/expenses/tags/monthlyLimit");
      return response.data;
    },
  });
  console.log(dataExpenseTagsMonthlyLimit);

  //Fetch Expenses values
  const { data: dataExpense, isLoading: isLoadingExpense } = useQuery({
    queryKey: ["expenses"],
    queryFn: async () => {
      const response = await axios.get("/api/expenses/");
      return response.data;
    },
  });
  console.log(dataExpense);

  const combinedData = dataExpense?.expenses?.map((item) => {
    const dateMonth = dayjs(item.date, "DD/MM/YYYY")
      .locale("pt-br")
      .format("MMMM");
    const capitalizedMonth =
      dateMonth.charAt(0).toUpperCase() + dateMonth.slice(1);
    return {
      ...item,
      month: capitalizedMonth,
    };
  });
  console.log(combinedData);

  const filterExpensesByMonth = (expenses, month) => {
    if (expenses) {
      return expenses.filter((expense) => {
        const expenseMonth = expense.month;
        return expenseMonth === month;
      });
    } else {
      // Handle the case where expenses are undefined
      return [];
    }
  };

  
  const months = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];
  // Funções para navegar entre os meses
  const goToPreviousMonth = () => {
    const currentMonthIndex = months.indexOf(selectedMonth || "");
    if (currentMonthIndex > 0) {
      setSelectedMonth(months[currentMonthIndex - 1]);
    } else {
      // Se estiver em janeiro, volte para dezembro
      setSelectedMonth(months[months.length - 1]);
    }
  };

  const goToNextMonth = () => {
    const currentMonthIndex = months.indexOf(selectedMonth || "");
    if (currentMonthIndex < months.length - 1) {
      setSelectedMonth(months[currentMonthIndex + 1]);
    } else {
      // Se estiver em dezembro, volte para janeiro
      setSelectedMonth(months[0]);
    }
  };
  const combinedTags = dataExpenseTags?.map((generalTag) => {
    const userTag = dataExpenseTagsMonthlyLimit
      ? dataExpenseTagsMonthlyLimit.find(
          (userTag) => userTag.ExpenseTag.id === generalTag.id
        )
      : null;
    const monthlyLimit = userTag ? userTag.monthlyLimit : 0;
    return {
      ...generalTag,
      monthlyLimit,
    };
  });
  console.log(combinedTags);

  const calculateProgressValue = (tagId, expenses) => {
    const paidExpenses = expenses.filter((expense) => expense.paid);

    const expensesWithSameTag = paidExpenses.filter(
      (expense) => expense.expenseTagId === tagId
    );
    if (expensesWithSameTag.length === 0) {
      return 0;
    }
    const totalExpenseValue = expensesWithSameTag.reduce(
      (total, expense) => total + expense.value,
      0
    );
    const tag = combinedTags[0];
    const monthlyLimit = tag.monthlyLimit || 0;
    const progressValue = (totalExpenseValue / monthlyLimit) * 100;
    return progressValue;
  };
  return (
    <MaxWidthWrapper className="flex flex-col gap-7 mt-14 mb-14 justify-start text-start items-start">
      <h1
        className={`text-5xl font-bold cursor-pointer ${title({
          color: "green",
        })}`}
      >
        Limites de despesas
      </h1>
      <p className="text-zinc-400 mb-14">
        Para editar os limites, basta clicar no ícone da categoria
      </p>
      <div className="justify-start w-full mb-8 flex text-center items-center">
        <button className="mr-3 text-5xl" onClick={goToPreviousMonth}>
          <ChevronLeft />
        </button>
        {selectedMonth && (
          <span className="text-lg text-zinc-400">{selectedMonth}</span>
        )}
        <button className="ml-3 text-5xl" onClick={goToNextMonth}>
          <ChevronRight />
        </button>
      </div>
      {combinedTags?.map((tag) => {
        const tagId = tag.id;

        // Filtrar as despesas do mês selecionado
        const expensesForMonth = filterExpensesByMonth(
          combinedData,
          selectedMonth
        );

        // Calcular progresso e falta com base no mês selecionado
        const progressValue =
          expensesForMonth.length > 0 && tag.monthlyLimit > 0
            ? calculateProgressValue(tagId, expensesForMonth)
            : 0;

        const monthlyLimit = tag.monthlyLimit || 0;
        const totalExpenseValue = (progressValue / 100) * monthlyLimit;
        const amountToExpend = monthlyLimit - totalExpenseValue;
        console.log(monthlyLimit);
        console.log(amountToExpend);

        const faltaTexto =
          progressValue >= 100
            ? `Você já atingiu o limite e passou por R$ ${numeral(
                -amountToExpend
              ).format("0.00")} reais`
            : `Falta: R$ ${numeral(amountToExpend).format("0.00")}`;
        return (
          <div className="flex flex-col mb-10 w-full" key={tag.id}>
            {/* Renderização do componente com os valores atualizados */}
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
                <Progress
                  value={progressValue}
                  color={`${progressValue >= 100 ? "danger" : "success"}`}
                  showValueLabel={true}
                />
                <span className="mt-2"> {tag.name}</span>
                <span className="text-zinc-400 text-lg">
                  Limite atual: R$ {numeral(tag.monthlyLimit).format("0.00")}
                </span>
                <span className="text-zinc-400 text-lg">{faltaTexto}</span>
              </div>
            </div>
          </div>
        );
      })}
    </MaxWidthWrapper>
  );
};

export default Goals;
