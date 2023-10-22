"use client";

import { useEffect } from "react";
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
import { title } from "@/components/shared/primitives";
import numeral from "numeral";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

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
      IncomeTag: true,
    },
  });
  return response;
}

const IncomeDetailPage: FC<TransactionDetailPageProps> = async ({ params }) => {
  const transaction = await getIncome(params.id);
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  });
  return (
    <MaxWidthWrapper className="flex flex-col justify-center items-center mt-20">
      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle className="flex">
            <h2 className={title({ color: "violet", size: "sm" })}>
              Descrição da Receita:{" "}
              <span className="text-foreground">
                {transaction?.description}
              </span>
            </h2>
          </CardTitle>
          <CardDescription className="flex text-lg">
            <div className="flex-col flex gap-6 mt-4">
              <h4 className="text-zinc-500 ">
                Categoria: {transaction?.IncomeTag.name}
              </h4>
            </div>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <h4>
            Valor da Receita: R$ {numeral(transaction?.value).format("0,0.00")}
          </h4>
        </CardContent>
        <CardFooter className="justify-end">
          <ButtonAction isIncome={true} id={params.id} />
        </CardFooter>
      </Card>
    </MaxWidthWrapper>
  );
};

export default IncomeDetailPage;
