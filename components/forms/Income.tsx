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
import { IncomeSchema } from "@/lib/validations/income";
import Link from "next/link";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Income, IncomeTag } from "@prisma/client";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/react";
import Image from "next/image";
import { FC, useEffect, useState } from "react";
import { FormInputIncome } from "@/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";
import Loading from "../Loading";
import { Switch } from "../ui/switch";
import { Checkbox } from "../ui/checkbox";
import { ScrollArea } from "../ui/scroll-area";
import { title } from "../shared/primitives";

interface FormIncomeProps {
  isEditing: boolean;
  initialValue?: FormInputIncome;
  params: {
    id: string;
  };
}

export const IncomeForm: FC<FormIncomeProps> = ({
  initialValue,
  params,
  isEditing,
}) => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const form = useForm<z.infer<typeof IncomeSchema>>({
    resolver: zodResolver(IncomeSchema),
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

  // fetch income tags
  const { data: dataIncomeTags, isLoading: isLoadingIncomeTags } = useQuery<
    IncomeTag[]
  >({
    queryKey: ["incomeTags"],
    queryFn: async () => {
      const response = await axios.get("/api/incomes/tags");
      return response.data;
    },
  });
  const { mutate: createIncome, isLoading: isLoadingCreation } = useMutation<
    Income,
    unknown,
    z.infer<typeof IncomeSchema>
  >({
    mutationFn: async (newIncomeData) => {
      const response = await axios.post("/api/incomes/create", newIncomeData);
      return response.data;
    },
    onSuccess: (data) => {
      toast.success("Receita criada com sucesso!");
      router.push("/dashboard");
      router.refresh();
    },
    onError: (data) => {
      toast.error("Aconteceu um erro ao criar a Receita, tente novamente");
    },
  });
  const { mutate: editIncome, isLoading: isLoadingEdit } = useMutation<
    Income,
    unknown,
    z.infer<typeof IncomeSchema>
  >({
    mutationFn: async (newIncomeEditData) => {
      const response = await axios.patch(
        `/api/incomes/${id}`,
        newIncomeEditData
      );
      return response.data;
    },
    onSuccess: (data) => {
      toast.success("Receita editada com sucesso!");
      router.push("/dashboard");
      router.refresh();
    },
    onError: (data) => {
      toast.error("Aconteceu um erro ao editar a Receita, tente novamente");
    },
  });
  function onSubmit(data: z.infer<typeof IncomeSchema>) {
    {
      isEditing ? editIncome(data) : createIncome(data);
    }
  }
  const defaultValue =
    initialValue && dataIncomeTags
      ? dataIncomeTags.find((tag) => tag.id === initialValue.incomeTagId)
          ?.name || ""
      : "Selecione";
  return (
    <>
      <div className="flex items-center justify-center">
        <h1
          className={`text-5xl font-bold cursor-pointer ${title({
            color: "green",
            size: "sm",
          })}`}
        >
          Incluir Receita
        </h1>
      </div>
      <Card className="border rounded-2xl p-2 pb-2 mt-6 min-w-[20rem] dark:border-[#2b926e8d] dark:bg-[#21362e39]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardHeader className="flex flex-col text-lg dark:text-zinc-300 justify-center items-center text-center">
              <Image
                src="https://github.com/Claudenir-Nojosa/servidor_estaticos/blob/main/receita.png?raw=true"
                alt="Receita"
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
                        placeholder="Insira aqui a descrição da receita"
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
                        placeholder="Insira aqui o valor da receita"
                        type="number"
                        {...field}
                        onChange={(event) =>
                          field.onChange(+event.target.value)
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="incomeTagId"
                render={({ field }) => (
                  <FormItem className="mt-4">
                    <FormLabel>Categoria</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={
                          initialValue && dataIncomeTags
                            ? dataIncomeTags.find(
                                (tag) => tag.id === initialValue.incomeTagId
                              )?.name || ""
                            : ""
                        }
                      >
                        <SelectTrigger className="w-full text-zinc-400">
                          <SelectValue placeholder={`${defaultValue}`} />
                        </SelectTrigger>
                        <SelectContent className="bg-black text-zinc-300">
                          <ScrollArea>
                            {dataIncomeTags?.map((item) => (
                              <SelectItem
                                className=""
                                key={item.id}
                                value={item.id}
                              >
                                <div className="flex justify-between items-center gap-3">
                                  <Image
                                    alt={item.name}
                                    src={item.icon}
                                    height={30}
                                    width={30}
                                  />

                                  {item.name}
                                </div>
                              </SelectItem>
                            ))}
                          </ScrollArea>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex gap-2 justify-start items-end">
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col w-full">
                      <FormLabel className="mt-5">Data da receita</FormLabel>
                      <Popover
                        open={isCalendarOpen}
                        onOpenChange={setIsCalendarOpen}
                      >
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value instanceof Date &&
                              !isNaN(field.value.getTime()) ? (
                                format(field.value, "PPP", { locale: ptBR })
                              ) : (
                                <span className="text-zinc-400">
                                  Selecione uma data
                                </span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            disabled={(date) => date < new Date("1900-01-01")}
                            initialFocus
                            onSelect={(e) => {
                              field.onChange(e);
                              setIsCalendarOpen(false);
                            }}
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mt-10 gap-4 justify-end flex">
                <FormField
                  control={form.control}
                  name="paid"
                  render={({ field }) => (
                    <FormItem className="flex items-center text-end w-2/3 space-x-1 flex-row space-y-0 rounded-md justify-start">
                      <FormLabel className="text-xs sm:text-small font-medium text-zinc-300 sm:px-2">
                        Está pago ?
                      </FormLabel>

                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button variant="outline">
                  <Link href="/">Cancelar</Link>
                </Button>
                <Button variant="outline" type="submit">
                  {isLoadingCreation ? (
                    <Loading />
                  ) : isEditing && isLoadingEdit ? (
                    <Loading />
                  ) : isEditing ? (
                    "Atualizar"
                  ) : (
                    "Criar"
                  )}
                </Button>
              </div>
            </CardBody>
          </form>
        </Form>
      </Card>
    </>
  );
};
