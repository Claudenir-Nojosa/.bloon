"use client";
// Importações padrões
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
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Expense } from "@prisma/client";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/react";
import Image from "next/image";
import { ExpenseSchema } from "@/lib/validations/expense";

export const ExpenseForm = () => {
  const form = useForm<z.infer<typeof ExpenseSchema>>({
    resolver: zodResolver(ExpenseSchema),
  });
  const router = useRouter();

  const { mutate: createExpense, isLoading } = useMutation<
    Expense,
    unknown,
    z.infer<typeof ExpenseSchema>
  >({
    mutationFn: async (newExpenseData) => {
      const response = await axios.post("/api/expenses/create", newExpenseData);
      return response.data;
    },
    onSuccess: (data) => {
      toast.success("Despesa criada com sucesso!");
      router.push("/");
      router.refresh();
    },
    onError: (data) => {
      toast.error("Aconteceu um erro ao criar a Receita, tente novamente");
    },
  });
  function onSubmit(data: z.infer<typeof ExpenseSchema>) {
    createExpense(data);
    console.log(data);
  }

  return (
    <Card className="border rounded-2xl p-2 pb-2 mt-6 min-w-[20rem]">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardHeader className="flex flex-col text-lg  dark:text-zinc-300 justify-center items-center text-center">
            <Image
              src="/assets/expense.svg"
              alt="Expense Image"
              height={60}
              width={60}
              className="m-6"
            />
          </CardHeader>
          <CardBody>
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Insira aqui a descrição da despesa"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem className="mt-4">
                  <FormLabel>Valor</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Insira aqui o valor da despesa"
                      type="number"
                      {...field}
                      onChange={(event) => field.onChange(+event.target.value)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardBody>
          <CardFooter className="flex text-center items-center justify-end">
            <div className="flex justify-end gap-2">
              <Button variant="outline">
                <Link href="/">Cancelar</Link>
              </Button>
              <Button variant="outline" type="submit">
                Criar
              </Button>
            </div>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};
