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
    .gte(1, { message: "Insira o valor da receita" }),
  incomeTagId: z.string({ required_error: "Selecione uma opção." }),
});
