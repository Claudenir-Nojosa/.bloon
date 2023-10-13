import { z } from "zod";

export const ExpenseSchema = z.object({
  description: z
    .string({ required_error: "Insira a descrição da despesa." })
    .min(2, { message: "Insira a descrição da despesa." }),
  value: z
    .number({
      required_error: "Insira o valor da despesa",
      invalid_type_error: "Valor tem que ser um número",
    })
    .gte(1, { message: "Insira o valor da despesa" }),
});
