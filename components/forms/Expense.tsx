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
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Expense, ExpenseTag } from "@prisma/client";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/react";
import Image from "next/image";
import { ExpenseSchema } from "@/lib/validations/expense";
import { FormInputExpense } from "@/types";
import { FC, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";

interface FormExpenseProps {
  initialValue?: FormInputExpense;
  params: {
    id: string;
  };
}

export const ExpenseForm: FC<FormExpenseProps> = ({ initialValue, params }) => {
  const form = useForm<z.infer<typeof ExpenseSchema>>({
    resolver: zodResolver(ExpenseSchema),
    defaultValues: initialValue,
  });
  const { id } = params;
  const router = useRouter();

  useEffect(() => {
    if (initialValue) {
      // Define os valores iniciais no formulário após a montagem do componente
      form.reset(initialValue);
    }
  }, [initialValue]);

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
  const defaultValue =
    initialValue && dataExpenseTags
      ? dataExpenseTags.find((tag) => tag.id === initialValue.expenseTagId)
          ?.name || ""
      : "Selecione";
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
            <FormField
              control={form.control}
              name="expenseTagId"
              render={({ field }) => (
                <FormItem className="mt-4">
                  <FormLabel>Categoria</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={
                        initialValue && dataExpenseTags
                          ? dataExpenseTags.find(
                              (tag) => tag.id === initialValue.expenseTagId
                            )?.name || ""
                          : ""
                      }
                    >
                      <SelectTrigger className="w-full text-zinc-400">
                        <SelectValue placeholder={`${defaultValue}`} />
                      </SelectTrigger>

                      <SelectContent className="bg-black text-zinc-300">
                        {dataExpenseTags?.map((item) => (
                          <SelectItem key={item.id} value={item.id}>
                            {item.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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