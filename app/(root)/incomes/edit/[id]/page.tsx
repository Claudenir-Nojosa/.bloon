"use client";

import { useEffect } from "react";
import Loading from "@/components/Loading";
import { IncomeForm } from "@/components/forms/Income";
import MaxWidthWrapper from "@/components/shared/MaxWidthWrapper";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { FC } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface EditIncomePageProps {
  params: {
    id: string;
  };
}

const EditIncomePage: FC<EditIncomePageProps> = ({ params }) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  });
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
    return (
      <MaxWidthWrapper className="flex flex-col justify-center items-center text-center min-h-full">
        <Loading />
      </MaxWidthWrapper>
    );
  }

  return (
    <div className="h-5/6 flex items-center mb-24">
      <MaxWidthWrapper className="max-w-2xl">
        <IncomeForm
          isEditing={true}
          params={params}
          initialValue={{ ...dataIncome, date: new Date(dataIncome.date) }}
        />
      </MaxWidthWrapper>
    </div>
  );
};

export default EditIncomePage;
