import { z } from "zod";

export const IncomeSchema = z.object({
  description: z
    .string({ required_error: "Insira a descrição da receita." })
    .min(2, { message: "Insira a descrição da receita." }),
  value: z
    .number({
      required_error: "Insira o valor da receita",
      invalid_type_error: "Valor tem que ser um número",
    })
    .gte(0.1, { message: "Valor tem que ser positivo" }),
  incomeTagId: z.string({ required_error: "Selecione uma opção." }),
  date: z.date({
    required_error: "Selecione uma data",
    invalid_type_error: "Isso não é uma data!",
  }),
  paid: z.boolean(),
});
