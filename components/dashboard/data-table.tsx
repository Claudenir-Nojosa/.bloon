"use client";

import { Button } from "@/components/ui/button";
import {
  ColumnDef,
  flexRender,
  ColumnFiltersState,
  getFilteredRowModel,
  getCoreRowModel,
  SortingState,
  getSortedRowModel,
  useReactTable,
  getPaginationRowModel,
  VisibilityState,
} from "@tanstack/react-table";
import { MixerHorizontalIcon } from "@radix-ui/react-icons";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Transactions } from "@/app/(root)/dashboard/columns";
import { DataTablePagination } from "./data-table-pagination";
import React, { useEffect, useState } from "react";
import { format, parse } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useQuery } from "@tanstack/react-query";
import { ExpenseTag, IncomeTag } from "@prisma/client";
import axios from "axios";
import Image from "next/image";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const table = useReactTable({
    data,
    columns,
    columnResizeMode: "onChange",
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
  });

  const formatDate = (date: Date | string) => {
    if (date) {
      if (typeof date === "string") {
        // Analisar a data no formato "dd/MM/yyyy"
        date = parse(date, "dd/MM/yyyy", new Date(), { locale: ptBR });
      }

      return format(date, "dd/MM/yyyy", { locale: ptBR });
    } else {
      return "Data inválida";
    }
  };
  // fetch income tags
  const { data: dataIncomeTags, isLoading: isLoadingIncomeTags } = useQuery<
    IncomeTag[]
  >({
    queryKey: ["incomeTags"],
    queryFn: async () => {
      const response = await axios.get("/api/incomes/tags");
      return response.data;
    },
  });
  console.log(dataIncomeTags);

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

  // Função para mapear os ícones com base no incomeTagId
  const mapIncomeTagIcon = (incomeTagId: any, dataIncomeTags: any) => {
    if (dataIncomeTags) {
      const incomeTag = dataIncomeTags.find(
        (tag: any) => tag.id === incomeTagId
      );
      return incomeTag ? (
        <div className="flex gap-2 justify-start items-center text-start">
          <Image
            src={incomeTag.icon}
            alt={incomeTag.name}
            width={40}
            height={40}
          />
          <span>{incomeTag.name}</span>
        </div>
      ) : null;
    }
    return null;
  };
  // Função para mapear os ícones com base no incomeTagId
  const mapExpenseTagIcon = (expenseTagId: any, dataExpenseTags: any) => {
    if (dataExpenseTags) {
      const expenseTag = dataExpenseTags.find(
        (tag: any) => tag.id === expenseTagId
      );
      return expenseTag ? (
        <div className="flex gap-2 justify-start items-center text-start">
          <Image
            src={expenseTag.icon}
            alt={expenseTag.name}
            width={40}
            height={40}
          />
          <span>{expenseTag.name}</span>
        </div>
      ) : null;
    }
    return null;
  };

  return (
    <div>
      {/* Tabela */}
      <div className="flex items-center  py-4">
        <Input
          placeholder="Filtrar transações..."
          value={
            (table.getColumn("description")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("description")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="ml-auto hidden h-8 lg:flex"
            >
              <MixerHorizontalIcon className="mr-2 h-4 w-4" />
              Visualização
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id === "description" ? "Descrição" : column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border mb-4">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="px-10">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className={
                    (data[row.index] as Transactions).incomeTagId
                      ? "text-green-400"
                      : "text-red-400"
                  }
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="px-10">
                      {flexRender(
                        cell.column.id === "tipo" ? (
                          (data[row.index] as Transactions).incomeTagId ? (
                            "Receita"
                          ) : (
                            "Despesa"
                          )
                        ) : cell.column.id === "descrição" ? (
                          (data[row.index] as Transactions).description
                        ) : cell.column.id === "categoria" ? (
                          (data[row.index] as Transactions).incomeTagId ? (
                            mapIncomeTagIcon(
                              (data[row.index] as Transactions).incomeTagId,
                              dataIncomeTags
                            )
                          ) : (data[row.index] as Transactions).expenseTagId ? (
                            mapExpenseTagIcon(
                              (data[row.index] as Transactions).expenseTagId,
                              dataExpenseTags
                            )
                          ) : null
                        ) : cell.column.id === "data" ? (
                          formatDate((data[row.index] as Transactions).date)
                        ) : cell.column.id === "valor" ? (
                          (
                            data[row.index] as Transactions
                          ).value.toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          })
                        ) : cell.column.id === "situação" ? (
                          (data[row.index] as Transactions).paid ? (
                            <div className="flex justify-center">
                              <Image
                                alt="Pago"
                                src="https://github.com/Claudenir-Nojosa/servidor_estaticos/blob/main/paid.png?raw=true"
                                width={40}
                                height={40}
                              />
                            </div>
                          ) : (
                            <div className="flex justify-center">
                              <Image
                                alt="Pago"
                                src="https://github.com/Claudenir-Nojosa/servidor_estaticos/blob/main/unpaid.png?raw=true"
                                width={40}
                                height={40}
                              />
                            </div>
                          )
                        ) : (
                          cell.column.columnDef.cell
                        ),
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Sem dados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {/* Paginação */}
      <DataTablePagination table={table} />
    </div>
  );
}
