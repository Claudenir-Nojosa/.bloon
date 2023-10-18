"use client";

import MaxWidthWrapper from "@/components/shared/MaxWidthWrapper";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Transactions, columns } from "./columns";
import { DataTable } from "@/components/dashboard/data-table";
import React, { FC } from "react";
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
  console.log(combinedData);
  return (
    <MaxWidthWrapper className="max-w-2xl mt-20 sm:mb-12 mb-40 sm:mt-15 flex flex-col items-center justify-center text-center">
      <DataTable columns={columns} data={combinedData || []} />
    </MaxWidthWrapper>
  );
};

export default Dashboard;
