"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";
import ButtonAction from "@/components/ButtonAction";

// This type is used to define the shape of our data.
export interface Transactions {
  id: string;
  description: string;
  value: number;
  date: Date | string;
  userId: string;
  updatedAt: string;
  incomeTagId: string;
  expenseTagId: string;
  paid: boolean;
}

export const columns: ColumnDef<Transactions>[] = [
  {
    accessorKey: "tipo",
    header: "Tipo",
  },
  {
    accessorKey: "description",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="text-md"
          onClick={() => {
            column.toggleSorting(column.getIsSorted() === "asc");
          }}
        >
          Descrição
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "categoria",
    header: "Categoria",
  },
  {
    accessorKey: "data",
    header: "Data",
  },
  {
    accessorKey: "valor",
    header: "Valor",
  },
  {
    accessorKey: "situação",
    header: "Situação",
  },
  {
    id: "ações",
    cell: ({ row }) => {
      const transactions = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Abrir Menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Ações</DropdownMenuLabel>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() =>
                navigator.clipboard.writeText(transactions.description)
              }
            >
              Copiar descrição
            </DropdownMenuItem>
            <DropdownMenuItem>
              {transactions.incomeTagId ? (
                <Link href={`/incomes/${transactions.id}`}>Ver detalhes</Link>
              ) : (
                <Link href={`/expenses/${transactions.id}`}>Ver detalhes</Link>
              )}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              {transactions.incomeTagId ? (
                <ButtonAction id={transactions.id} isIncome={true} />
              ) : (
                <ButtonAction id={transactions.id} isIncome={false} />
              )}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
