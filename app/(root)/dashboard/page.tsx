"use client";

import MaxWidthWrapper from "@/components/shared/MaxWidthWrapper";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { FC } from "react";
import { TableOfTransactions } from "@/components/dashboard/TableOfTransactions";

const Dashboard = () => {
  return (
    <MaxWidthWrapper className="max-w-xl mb-12 sm:mt-15 flex flex-col items-center justify-center text-center">
      <div>
        <h1 className="text-3xl mb-10">
          Por favor, selecione o tipo de movimentação
        </h1>
        <div className="mb-20 gap-6 flex justify-center">
          <Button variant="outline">
            <Link href="/dashboard/incomes">Receita</Link>
          </Button>
          <Button variant="outline">
            <Link href="/dashboard/expenses">Despesa</Link>
          </Button>
        </div>
      </div>
      <TableOfTransactions />
    </MaxWidthWrapper>
  );
};

export default Dashboard;
