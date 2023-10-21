"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import Link from "next/link";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Expense, ExpenseTag } from "@prisma/client";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/react";
import Image from "next/image";
import { ExpenseTagSchema } from "@/lib/validations/tags";
import { FC } from "react";

interface ExpenseLimitFormProps {
  data: {
    id: string;
    name: string;
    icon: string;
    monthlyLimit?: number | null | undefined;
  };
}

export const ExpenseLimitForm: FC<ExpenseLimitFormProps> = ({ data }) => {
  const form = useForm<z.infer<typeof ExpenseTagSchema>>({
    resolver: zodResolver(ExpenseTagSchema),
  });
  const router = useRouter();

  const {
    mutate: editExpenseTagLimit,
    isLoading: isLoadingEditExpenseTagLimit,
  } = useMutation<ExpenseTag, unknown, z.infer<typeof ExpenseTagSchema>>({
    mutationFn: async (newExpenseEditData) => {
      const response = await axios.patch(
        `/api/expenses/tags/${data.id}`,
        newExpenseEditData
      );
      return response.data;
    },
    onSuccess: (data) => {
      toast.success("Limite editado com sucesso!");
      router.push("/dashboard");
      router.refresh();
    },
    onError: (data) => {
      toast.error("Aconteceu um erro ao editar o limite, tente novamente");
    },
  });
  function onSubmit(data: z.infer<typeof ExpenseTagSchema>) {
    editExpenseTagLimit(data);
  }

  return (
    <Card className="border rounded-2xl p-2 pb-2 mt-6 min-w-[20rem]">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardHeader className="flex flex-col text-lg  dark:text-zinc-300 justify-center items-center text-center">
            <Image src={data.icon} alt={data.name} width={60} height={60} />
          </CardHeader>
          <CardBody>
            <FormField
              control={form.control}
              name="monthlyLimit"
              render={({ field }) => (
                <FormItem className="mt-4">
                  <FormLabel>Limite de Gasto</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Insira aqui o limite da despesa"
                      type="number"
                      {...field}
                      onChange={(event) => field.onChange(+event.target.value)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="mt-10 gap-4 justify-end flex">
              <Button variant="outline">
                <Link href="/">Cancelar</Link>
              </Button>
              <Button variant="outline" type="submit">
                Salvar Limite
              </Button>
            </div>
          </CardBody>
        </form>
      </Form>
    </Card>
  );
};
