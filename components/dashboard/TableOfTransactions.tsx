import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Expense, Income } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import dayjs from "dayjs";
import { Pen, Trash } from "lucide-react";
import { FC, useState } from "react";
import { Button } from "../ui/button";
import Link from "next/link";

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

export const TableOfTransactions = () => {
  const [showIncomes, setShowIncomes] = useState(false);
  const [showExpenses, setShowExpenses] = useState(false);
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

  const combinedData = dataTransactions?.map((item) => ({
    ...item,
    date: dayjs(item.date).format("DD/MM/YYYY"),
  }));
  // Filtrar as receitas
  const incomeData = combinedData?.filter(
    (transaction) => transaction.incomeTagId
  );

  // Filtrar as despesas
  const expenseData = combinedData?.filter(
    (transaction) => transaction.expenseTagId
  );
  return (
    <>
      <div>
        <h1 className="text-3xl mb-10">
          Por favor, selecione o tipo de movimentação
        </h1>
        <div className="mb-20 gap-6 flex justify-center">
          <Button
            variant="outline"
            onClick={() => {
              setShowIncomes(false);
              setShowExpenses(false);
            }}
          >
            Todos
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              setShowIncomes(true);
              setShowExpenses(false);
            }}
          >
            Receita
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              setShowIncomes(false);
              setShowExpenses(true);
            }}
          >
            Despesa
          </Button>
        </div>
      </div>
      {isLoadingTransactions ? (
        <p>Carregando...</p>
      ) : showIncomes && incomeData && incomeData.length > 0 ? (
        <Table>
          <TableCaption>Lista de todas as suas movimentações.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center font-semibold">Tipo</TableHead>
              <TableHead className="text-center font-semibold">
                Descrição
              </TableHead>
              <TableHead className="text-center font-semibold">Data</TableHead>
              <TableHead className="text-center font-semibold">Valor</TableHead>
              <TableHead className="text-center font-semibold">
                Alterar
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {incomeData.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>
                  {transaction.incomeTagId ? "Receita" : "Despesa"}
                </TableCell>
                <TableCell>{transaction.description}</TableCell>
                <TableCell>{transaction.date}</TableCell>
                <TableCell>{transaction.value}</TableCell>
                <TableCell className="flex gap-5 justify-center">
                  <Pen className="hover:text-[#9633d9] cursor-pointer" />
                  <Trash className="hover:text-[#9633d9] cursor-pointer" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : showExpenses && expenseData && expenseData.length > 0 ? (
        <Table>
          <TableCaption>Lista de todas as suas movimentações.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center font-semibold">Tipo</TableHead>
              <TableHead className="text-center font-semibold">
                Descrição
              </TableHead>
              <TableHead className="text-center font-semibold">Data</TableHead>
              <TableHead className="text-center font-semibold">Valor</TableHead>
              <TableHead className="text-center font-semibold">
                Alterar
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {expenseData.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>
                  {transaction.incomeTagId ? "Receita" : "Despesa"}
                </TableCell>
                <TableCell>{transaction.description}</TableCell>
                <TableCell>{transaction.date}</TableCell>
                <TableCell>{transaction.value}</TableCell>
                <TableCell className="flex gap-5 justify-center">
                  <Pen className="hover:text-[#9633d9] cursor-pointer" />
                  <Trash className="hover:text-[#9633d9] cursor-pointer" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : !showExpenses &&
        !showIncomes &&
        combinedData &&
        combinedData.length > 0 ? (
        <Table>
          <TableCaption>Lista de todas as suas movimentações.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center font-semibold">Tipo</TableHead>
              <TableHead className="text-center font-semibold">
                Descrição
              </TableHead>
              <TableHead className="text-center font-semibold">Data</TableHead>
              <TableHead className="text-center font-semibold">Valor</TableHead>
              <TableHead className="text-center font-semibold">
                Alterar
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {combinedData.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>
                  {transaction.incomeTagId ? "Receita" : "Despesa"}
                </TableCell>
                <TableCell>{transaction.description}</TableCell>
                <TableCell>{transaction.date}</TableCell>
                <TableCell>{transaction.value}</TableCell>
                <TableCell className="flex gap-5 justify-center">
                  <Pen className="hover:text-[#9633d9] cursor-pointer" />
                  <Trash className="hover:text-[#9633d9] cursor-pointer" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <p>Nenhum dado disponível ainda.</p>
      )}
    </>
  );
};
