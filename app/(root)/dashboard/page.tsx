import MaxWidthWrapper from "@/components/shared/MaxWidthWrapper";
import Link from "next/link";
import React from "react";

const Dashboard = () => {
  return (
    <MaxWidthWrapper className="max-w-xl mb-12 sm:mt-15 flex flex-col items-center justify-center text-center">
      <h1>Por favor, selecione o tipo de movimentação</h1>
      <div>
        <Link href="/dashboard/incomes">Receita</Link>
        <Link href="/dashboard/expenses">Despesa</Link>
      </div>
    </MaxWidthWrapper>
  );
};

export default Dashboard;
