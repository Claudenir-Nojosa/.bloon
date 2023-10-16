"use client";

import Loading from "@/components/Loading";
import { IncomeForm } from "@/components/forms/Income";
import MaxWidthWrapper from "@/components/shared/MaxWidthWrapper";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { FC } from "react";

interface EditExpensePageProps {
  params: {
    id: string;
  };
}

const page: FC<EditExpensePageProps> = ({ params }) => {
  const { id } = params;
  const { data: dataIncome, isLoading: isLoadingIncome } = useQuery({
    queryKey: ["incomes", id],
    queryFn: async () => {
      const response = await axios.get(`/api/incomes/${id}`);
      return response.data;
    },
  });
  console.log(dataIncome);

  if (isLoadingIncome) {
    return <Loading />;
  }

  return (
    <div className="h-5/6 flex items-center">
      <MaxWidthWrapper className="max-w-2xl">
        <IncomeForm params={params} initialValue={dataIncome} />
      </MaxWidthWrapper>
    </div>
  );
};

export default page;
