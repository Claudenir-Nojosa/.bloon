"use client";

import MaxWidthWrapper from "@/components/shared/MaxWidthWrapper";
import { Transactions, columns } from "./columns";
import { DataTable } from "@/components/dashboard/data-table";
import React, { FC, useEffect, useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";

const Dashboard = () => {
  const { data: dataTransactions, isLoading: isLoadingTransactions } = useQuery(
    {
      queryKey: ["combinedData"],
      queryFn: async () => {
        const { data } = await axios.get("/api/transactions");
        return data.combinedData as Transactions[];
      },
    }
  );
  const combinedData = dataTransactions?.map((item) => ({
    ...item,
    date: dayjs(item.date).format("DD/MM/YYYY"),
  }));

  return (
    <MaxWidthWrapper className="max-w-2xl mt-20 sm:mb-12 mb-40 sm:mt-15 flex flex-col items-center justify-center text-center">
      <h1 className="text-5xl mb-5 font-bold">Todas as transações</h1>
      <DataTable columns={columns} data={combinedData || []} />
    </MaxWidthWrapper>
  );
};

export default Dashboard;
