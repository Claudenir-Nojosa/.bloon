import MaxWidthWrapper from "@/components/shared/MaxWidthWrapper";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const Dashboard = () => {
  return (
    <MaxWidthWrapper className="max-w-xl mb-12 sm:mt-15 flex flex-col items-center justify-center text-center">
      <h1 className="text-3xl mb-10">
        Por favor, selecione o tipo de movimentação
      </h1>
      <div className="flex gap-5">
        <Button variant="outline">
          <Link href="/dashboard/incomes">Receita</Link>
        </Button>
        <Button variant="outline">
          <Link href="/dashboard/expenses">Despesa</Link>
        </Button>
      </div>
    </MaxWidthWrapper>
  );
};

export default Dashboard;
