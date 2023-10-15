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
import { FC } from "react";

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

  const incomes = dataTransactions?.filter(
    (transaction) => transaction.incomeTagId
  );
  const expenses = dataTransactions?.filter(
    (transaction) => transaction.expenseTagId
  );

  const combinedData = dataTransactions?.map((item) => ({
    ...item,
    date: dayjs(item.date).format("DD/MM/YYYY"),
  }));

  return (
    <>
      {isLoadingTransactions ? (
        <p>Carregando...</p>
      ) : combinedData && combinedData.length > 0 ? (
        <Table>
          <TableCaption>Lista de todas as suas movimentações.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Tipo</TableHead>
              <TableHead className="w-[100px]">Descrição</TableHead>
              <TableHead>Data</TableHead>
              <TableHead className="text-right">Valor</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {combinedData.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>
                  {transaction.incomeTagId ? "Receita" : "Despesa"}
                </TableCell>
                <TableCell className="font-medium">
                  {transaction.description}
                </TableCell>
                <TableCell>{transaction.date}</TableCell>
                <TableCell className="text-right">
                  {transaction.value}
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
