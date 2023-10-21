import { z } from "zod";

export const ExpenseTagSchema = z.object({
  monthlyLimit: z
    .number({
      required_error: "Insira o valor do limite",
      invalid_type_error: "Valor tem que ser um número",
    })
    .gte(0.1, { message: "Valor tem que ser positivo" }),
});
