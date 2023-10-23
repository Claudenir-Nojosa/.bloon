"use client";

import React, { FC } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";
import Loading from "./Loading";
import { Button } from "./ui/button";
import { Edit, Pen, Trash } from "lucide-react";
import { Transactions } from "@/app/(root)/dashboard/columns";
import Image from "next/image";

interface ButtonActionProps {
  isIncome: boolean;
  id: string;
}

const ButtonAction: FC<ButtonActionProps> = ({ isIncome, id }) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { mutate: deleteExpense, isLoading: isLoadingExpenseDelete } =
    useMutation({
      mutationFn: async () => {
        const response = await axios.delete(`/api/expenses/${id}`);
        return response.data;
      },
      onSuccess: (data) => {
        // Faça o redirecionamento após o delete bem-sucedido
        queryClient.invalidateQueries(["combinedData"]);
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
        queryClient.invalidateQueries(["combinedData"]);
        toast.success("Receita deletada com sucesso!");
        router.push("/dashboard");
        router.refresh();
      },
      onError: (data) => {
        toast.error("Aconteceu um erro ao deletar a receita, tente novamente");
      },
    });
  const { data: dataExpense, isLoading: isLoadingExpense } = useQuery({
    queryKey: ["expenses", id],
    queryFn: async () => {
      const response = await axios.get(`/api/expenses/${id}`);
      return response.data.paid;
    },
  });
  console.log(dataExpense);
  const { data: dataIncome, isLoading: isLoadingIncome } = useQuery({
    queryKey: ["incomes", id],
    queryFn: async () => {
      const response = await axios.get(`/api/incomes/${id}`);
      return response.data.paid;
    },
  });
  console.log(dataIncome);

  const { mutate: toggleExpensePaid, isLoading: isLoadingExpenseEdit } =
    useMutation({
      mutationFn: async () => {
        const response = await axios.get(`/api/expenses/${id}`);
        const currentPaidState = response.data.paid;
        const updatedPaidState = !currentPaidState;
        await axios.patch(`/api/expenses/${id}`, { paid: updatedPaidState });
        return updatedPaidState;
      },
      onMutate: (newPaidState) => {
        return newPaidState;
      },
      onSuccess: (data) => {
        queryClient.invalidateQueries(["combinedData"]);
        toast.success("Despesa com situação de pagamento atualizada!");
        router.push("/dashboard");
        router.refresh();
      },
      onError: (data) => {
        toast.error(
          "Aconteceu um erro ao atualizar a despesa, tente novamente"
        );
      },
    });
  const { mutate: toggleIncomePaid, isLoading: isLoadingIncomeEdit } =
    useMutation({
      mutationFn: async () => {
        const response = await axios.get(`/api/incomes/${id}`);
        const currentPaidState = response.data.paid;
        const updatedPaidState = !currentPaidState;
        await axios.patch(`/api/incomes/${id}`, { paid: updatedPaidState });
        return updatedPaidState;
      },
      onMutate: (newPaidState) => {
        return newPaidState;
      },
      onSuccess: (data) => {
        queryClient.invalidateQueries(["combinedData"]);
        toast.success("Receita com situação de pagamento atualizada!");
        router.push("/dashboard");
        router.refresh();
      },
      onError: (data) => {
        toast.error(
          "Aconteceu um erro ao atualizar o pagamento da receita, tente novamente"
        );
      },
    });

  return (
    <div className="flex gap-2">
      <Button
        size="icon"
        variant="outline"
        className="cursor-pointer hover:text-[#0d825993]"
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
          className="cursor-pointer hover:text-[#0d825993]"
          onClick={() => deleteIncome()}
        >
          {isLoadingIncomeDelete ? <Loading /> : <Trash />}
        </Button>
      ) : (
        <Button
          size="icon"
          variant="outline"
          className="cursor-pointer hover:text-[#0d825993]"
          onClick={() => deleteExpense()}
        >
          {isLoadingExpenseDelete ? <Loading /> : <Trash />}
        </Button>
      )}
      {!isIncome ? (
        <Button variant="link" size="icon" onClick={() => toggleExpensePaid()}>
          {isLoadingExpenseEdit ? (
            "Carregando..."
          ) : dataExpense ? (
            <Image
              alt="Pago"
              src="https://github.com/Claudenir-Nojosa/servidor_estaticos/blob/main/paid.png?raw=true"
              height={30}
              width={30}
            />
          ) : (
            <Image
              alt="Não pago"
              src="https://github.com/Claudenir-Nojosa/servidor_estaticos/blob/main/unpaid.png?raw=true"
              height={30}
              width={30}
            />
          )}
        </Button>
      ) : (
        <Button variant="link" size="icon" onClick={() => toggleIncomePaid()}>
          {isLoadingIncomeEdit ? (
            "Carregando..."
          ) : dataIncome ? (
            <Image
              alt="Pago"
              src="https://github.com/Claudenir-Nojosa/servidor_estaticos/blob/main/paid.png?raw=true"
              height={30}
              width={30}
            />
          ) : (
            <Image
              alt="Não pago"
              src="https://github.com/Claudenir-Nojosa/servidor_estaticos/blob/main/unpaid.png?raw=true"
              height={30}
              width={30}
            />
          )}
        </Button>
      )}
    </div>
  );
};

export default ButtonAction;
