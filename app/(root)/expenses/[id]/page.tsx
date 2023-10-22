"use client";

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
import ButtonAction from "@/components/ButtonAction";
import numeral from "numeral";
import { title } from "@/components/shared/primitives";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
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
      ExpenseTag: true,
    },
  });
  return response;
}

const ExpenseDetail: FC<TransactionDetailPageProps> = async ({ params }) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  });
  const transaction = await getExpense(params.id);

  return (
    <MaxWidthWrapper className="flex flex-col justify-center items-center mt-20">
      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle className="flex">
            <h2 className={title({ color: "violet", size: "sm" })}>
              Descrição da Despesa:{" "}
              <span className="text-foreground">
                {transaction?.description}
              </span>
            </h2>
          </CardTitle>
          <CardDescription className="flex text-lg">
            <div className="flex-col flex gap-6 mt-4">
              <h4 className="text-zinc-500 ">
                Categoria: {transaction?.ExpenseTag.name}
              </h4>
            </div>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <h4>
            Valor da Despesa: R$ {numeral(transaction?.value).format("0,0.00")}
          </h4>
        </CardContent>
        <CardFooter className="justify-end">
          <ButtonAction isIncome={false} id={params.id} />
        </CardFooter>
      </Card>
    </MaxWidthWrapper>
  );
};

export default ExpenseDetail;
