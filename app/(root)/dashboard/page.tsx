"use client";

import MaxWidthWrapper from "@/components/shared/MaxWidthWrapper";
import { Transactions, columns } from "./columns";
import { DataTable } from "@/components/dashboard/data-table";
import React, { FC, useEffect, useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { IncomeTag } from "@prisma/client";
import { format, parse } from "date-fns";
import { ptBR } from "date-fns/locale";
import "dayjs/locale/pt-br";
import { Button } from "@/components/ui/button";
import { ScrollShadow } from "@nextui-org/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { title } from "@/components/shared/primitives";

interface IncomeTagData {
  id: string;
  name: string;
  icon: string;
}

const Dashboard = () => {
  const [selectedMonth, setSelectedMonth] = useState<string | null>(
    "Todo o ano"
  );
  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
    console.log(selectedMonth);
  }, [selectedMonth]);

  const { data: dataTransactions, isLoading: isLoadingTransactions } = useQuery(
    {
      queryKey: ["combinedData"],
      queryFn: async () => {
        const { data } = await axios.get("/api/transactions");
        return data.combinedData as Transactions[];
      },
    }
  );
  const combinedData = dataTransactions?.map((item) => {
    const formattedDate = dayjs(item.date, "DD/MM/YYYY")
      .locale("pt-br")
      .format("DD/MM/YYYY");
    const dateMonth = dayjs(item.date, "DD/MM/YYYY")
      .locale("pt-br")
      .format("MMMM");
    const dateYear = dayjs(item.date, "DD/MM/YYYY")
      .locale("pt-br")
      .format("YYYY");
    return {
      ...item,
      date: formattedDate,
      month: dateMonth,
      year: dateYear,
    };
  });
  console.log(combinedData);

  const availableYears = [
    ...new Set(combinedData?.map((item) => item.year) || []),
  ];
  console.log(availableYears);
  const filterTransactionsByMonth = (
    month: string | null,
    year: string | null
  ) => {
    if (!combinedData) return [];

    if (month === "Todo o ano" && year === null) return combinedData; // Retorna todas as transações se nenhum mês ou ano for selecionado.

    const filtered = combinedData.filter((transaction) => {
      const transactionMonth = transaction.month.toLowerCase();
      const transactionYear = transaction.year;

      if (month === "Todo o ano" && year === transactionYear) {
        return true;
      }

      if (
        typeof transactionMonth === "string" &&
        transactionMonth === month?.toLowerCase() &&
        year === transactionYear
      ) {
        return true;
      }

      return false;
    });

    console.log("Filtered Transactions: ", filtered);
    return filtered;
  };

  const filteredTransactions = filterTransactionsByMonth(
    selectedMonth,
    selectedYear
  );

  console.log(filteredTransactions);

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

  const currentMonth = dayjs().format("MMMM");
  return (
    <MaxWidthWrapper className="max-w-2xl mt-20 sm:mb-12 mb-40 sm:mt-15 flex flex-col items-center justify-center text-center">
      <h1
        className={`text-5xl mb-5 font-bold cursor-pointer ${title({ color: "green" })}`}
        onClick={() => {
          setSelectedMonth("Todo o ano");
          setSelectedYear(null);
        }}
      >
        Todas as transações
      </h1>
      <div>
        <h2 className="text-3xl font-semibold">Selecione o ano</h2>
        <div className="gap-2 flex justify-center mt-4">
          {availableYears.map((year) => (
            <Button
              variant="outline"
              key={year}
              onClick={() => {
                setSelectedYear(year);
                setSelectedMonth("Todo o ano");
              }}
              className={
                selectedYear === year
                  ? "bg-[#0d825993] text-white border-black"
                  : ""
              }
            >
              {year}
            </Button>
          ))}
        </div>
      </div>
      <div>
        <h2 className="text-xl font-semibold mt-4 text-zinc-300">
          Navegar pelos meses
        </h2>
        <div className="min-w-[300px] justify-center mt-4 mb-8 flex text-center items-center">
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
      </div>
      <DataTable columns={columns} data={filteredTransactions || []} />
    </MaxWidthWrapper>
  );
};

export default Dashboard;
