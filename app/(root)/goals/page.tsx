"use client";

import MaxWidthWrapper from "@/components/shared/MaxWidthWrapper";
import { Button } from "@/components/ui/button";
import { Expense, ExpenseTag, Income, IncomeTag, User } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import React, { FC } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ExpenseLimitForm } from "@/components/forms/expenseLimit";

const Goals = () => {
  // fetch expense tags
  const { data: dataExpenseTags, isLoading: isLoadingExpenseTags } = useQuery<
    ExpenseTag[]
  >({
    queryKey: ["expenseTags"],
    queryFn: async () => {
      const response = await axios.get("/api/expenses/tags");
      return response.data;
    },
  });
  console.log(dataExpenseTags);
  return (
    <h1 className="text-2xl mt-10 flex gap-1">
      {dataExpenseTags?.map((tag) => (
        <Button variant="ghost">
          <Dialog>
            <DialogTrigger asChild>
              <Image
                key={tag.id}
                src={tag.icon}
                alt={tag.name}
                height={60}
                width={60}
              />
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <ExpenseLimitForm
                data={{
                  id: tag.id,
                  name: tag.name,
                  icon: tag.icon,
                  monthlyLimit: tag.monthlyLimit,
                }}
              />
            </DialogContent>
          </Dialog>
        </Button>
      ))}
    </h1>
  );
};

export default Goals;
