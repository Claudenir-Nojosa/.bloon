"use client";

import MaxWidthWrapper from "@/components/shared/MaxWidthWrapper";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { FC } from "react";
import { TableOfTransactions } from "@/components/dashboard/TableOfTransactions";

const Dashboard = () => {
  return (
    <MaxWidthWrapper className="max-w-2xl mt-20 sm:mb-12 mb-40 sm:mt-15 flex flex-col items-center justify-center text-center">     
      <TableOfTransactions />
    </MaxWidthWrapper>
  );
};

export default Dashboard;
