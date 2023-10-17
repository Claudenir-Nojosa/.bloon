"use client";

import Loading from "@/components/Loading";
import { ExpenseForm } from "@/components/forms/Expense";
import MaxWidthWrapper from "@/components/shared/MaxWidthWrapper";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { FC } from "react";

interface EditExpensePageProps {
  params: {
    id: string;
  };
}

const EditExpensePage: FC<EditExpensePageProps> = ({ params }) => {
  const { id } = params;
  const { data: dataExpense, isLoading: isLoadingExpense } = useQuery({
    queryKey: ["expenses", id],
    queryFn: async () => {
      const response = await axios.get(`/api/expenses/${id}`);
      return response.data;
    },
  });
  console.log(dataExpense);

  if (isLoadingExpense) {
    return (
      <MaxWidthWrapper className="flex flex-col justify-center items-center text-center min-h-full">
        <Loading />
      </MaxWidthWrapper>
    );
  }
  return (
    <div className="h-5/6 flex items-center">
      <MaxWidthWrapper className="max-w-2xl">
        <ExpenseForm
          isEditing={true}
          params={params}
          initialValue={{ ...dataExpense, date: new Date(dataExpense.date) }}
        />
      </MaxWidthWrapper>
    </div>
  );
};

export default EditExpensePage;
