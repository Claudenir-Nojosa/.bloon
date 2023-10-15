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

async function getIncome(id: string) {
  const response = await db.income.findFirst({
    where: {
      id: id,
    },
    select: {
      id: true,
      description: true,
      value: true,
      date: true,
      incomeTagId: true,
    },
  });
  return response;
}

const IncomeDetailPage: FC<TransactionDetailPageProps> = async ({ params }) => {
  const transaction = await getIncome(params.id);

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

export default IncomeDetailPage;
