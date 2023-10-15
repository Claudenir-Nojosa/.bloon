import { db } from "@/lib/prismadb";
import React, { FC } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import MaxWidthWrapper from "@/components/shared/MaxWidthWrapper";

interface TransactionDetailPageProps {
  params: {
    id: string;
  };
}

async function getExpense(id: string) {
  const response = await db.expense.findFirst({
    where: {
      id: id,
    },
    select: {
      id: true,
      description: true,
      value: true,
      date: true,
      expenseTagId: true,
    },
  });
  return response;
}

const ExpenseDetailPage: FC<TransactionDetailPageProps> = async ({ params }) => {
  const transaction = await getExpense(params.id);

  return (
    <MaxWidthWrapper>
      <Card className="min-w-full">
        <CardHeader>
          <CardTitle>{transaction?.description}</CardTitle>
          <CardDescription className="text-zinc-400">
            {transaction?.value}
          </CardDescription>
        </CardHeader>
      </Card>
    </MaxWidthWrapper>
  );
};

export default ExpenseDetailPage;
