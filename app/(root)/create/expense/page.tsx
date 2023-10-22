"use client";

import { useEffect } from "react";
import { ExpenseForm } from "@/components/forms/Expense";
import MaxWidthWrapper from "@/components/shared/MaxWidthWrapper";
import { useSession } from "next-auth/react";
import { FC } from "react";
import { useRouter } from "next/navigation";

interface CreateExpensePageProps {
  params: {
    id: string;
  };
}

const ExpenseCreation: FC<CreateExpensePageProps> = ({ params }) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  });
  return (
    <div className="h-5/6 flex items-center mb-24">
      <MaxWidthWrapper className="max-w-2xl">
        <ExpenseForm params={params} isEditing={false} />
      </MaxWidthWrapper>
    </div>
  );
};

export default ExpenseCreation;
