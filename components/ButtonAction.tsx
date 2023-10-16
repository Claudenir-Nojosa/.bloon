"use client";

import React, { FC, useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";
import Loading from "./Loading";
import { Button } from "./ui/button";
import { Edit, Pen, Trash } from "lucide-react";

interface ButtonActionProps {
  isIncome: boolean;
  id: string;
}

const ButtonAction: FC<ButtonActionProps> = ({ isIncome, id }) => {
  const router = useRouter();
  const { mutate: deleteExpense, isLoading: isLoadingExpenseDelete } =
    useMutation({
      mutationFn: async () => {
        return axios.delete(`/api/expenses/${id}`);
      },
      onSuccess: (data) => {
        // Faça o redirecionamento após o delete bem-sucedido
        toast.success("Despesa deletada com sucesso!");
        router.push("/dashboard");
        router.refresh();
      },
      onError: (data) => {
        toast.error("Aconteceu um erro ao deletar a despesa, tente novamente");
      },
    });
  const { mutate: deleteIncome, isLoading: isLoadingIncomeDelete } =
    useMutation({
      mutationFn: async () => {
        return axios.delete(`/api/incomes/${id}`);
      },
      onSuccess: (data) => {
        // Faça o redirecionamento após o delete bem-sucedido
        toast.success("Receita deletada com sucesso!");
        router.push("/dashboard");
        router.refresh();
      },
      onError: (data) => {
        toast.error("Aconteceu um erro ao deletar a receita, tente novamente");
      },
    });
  return (
    <div className="flex gap-2">
      <Button
        size="icon"
        variant="outline"
        className="cursor-pointer hover:text-[#9633d9]"
      >
        {isIncome ? (
          <Link href={`/incomes/edit/${id}`}>
            <Edit />
          </Link>
        ) : (
          <Link href={`/expenses/edit/${id}`}>
            <Edit />
          </Link>
        )}
      </Button>
      {isIncome ? (
        <Button
          size="icon"
          variant="outline"
          className="cursor-pointer hover:text-[#9633d9]"
          onClick={() => deleteIncome()}
        >
          {isLoadingIncomeDelete ? <Loading /> : <Trash />}
        </Button>
      ) : (
        <Button
          size="icon"
          variant="outline"
          className="cursor-pointer hover:text-[#9633d9]"
          onClick={() => deleteExpense()}
        >
          {isLoadingExpenseDelete ? <Loading /> : <Trash />}
        </Button>
      )}
    </div>
  );
};

export default ButtonAction;
